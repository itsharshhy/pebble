//! Storage: reads and writes Pebble's one JSON document on the person's own disk.
//!
//! Why a file and not browser storage? A file in the app's data folder survives "clear browsing
//! data" and is never evicted (risk R2). Writes are atomic: we write a temporary file, flush it,
//! then rename it over the old one, so a crash or power cut can never leave half a file.
//! Validation of the *contents* happens in `ui/js/model.js`; here we only check that the text is
//! JSON and not too big, so nothing unreadable is ever saved.

use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::time::{SystemTime, UNIX_EPOCH};

/// The live document.
pub const DATA_FILE: &str = "pebble.json";
/// The version saved just before the latest one: a one-step safety net.
pub const PREVIOUS_FILE: &str = "pebble.previous.json";
/// Refuse anything bigger: about 15,000 pebbles fit in 5 MB (threat T3).
pub const MAX_BYTES: u64 = 5 * 1024 * 1024;

pub struct Store {
    dir: PathBuf,
}

impl Store {
    pub fn new(dir: PathBuf) -> Self {
        Store { dir }
    }

    fn path(&self, name: &str) -> PathBuf {
        self.dir.join(name)
    }

    /// Returns the saved text, or `None` the very first time Pebble runs.
    pub fn load(&self) -> Result<Option<String>, String> {
        let path = self.path(DATA_FILE);
        if !path.exists() {
            return Ok(None);
        }
        read_limited(&path).map(Some)
    }

    /// Saves the whole document safely. The previous copy is kept as `pebble.previous.json`.
    pub fn save(&self, text: &str) -> Result<(), String> {
        check_json(text)?;
        fs::create_dir_all(&self.dir).map_err(|e| e.to_string())?;
        let live = self.path(DATA_FILE);
        if live.exists() {
            fs::copy(&live, self.path(PREVIOUS_FILE)).map_err(|e| e.to_string())?;
        }
        write_atomic(&live, text)
    }

    /// Keeps an unreadable document under its own name. Never silently delete (Architecture).
    pub fn keep_corrupt_copy(&self, text: &str) -> Result<(), String> {
        fs::create_dir_all(&self.dir).map_err(|e| e.to_string())?;
        let seconds = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|d| d.as_secs())
            .unwrap_or(0);
        write_atomic(&self.path(&format!("pebble.corrupt.{seconds}.json")), text)
    }

    /// Removes every file Pebble wrote, including kept copies (U6: "storage is empty").
    pub fn delete_everything(&self) -> Result<(), String> {
        let entries = match fs::read_dir(&self.dir) {
            Ok(entries) => entries,
            Err(_) => return Ok(()), // nothing saved yet
        };
        for entry in entries.flatten() {
            let name = entry.file_name().to_string_lossy().to_string();
            if name.starts_with("pebble") && (name.ends_with(".json") || name.ends_with(".tmp")) {
                fs::remove_file(entry.path()).map_err(|e| e.to_string())?;
            }
        }
        Ok(())
    }
}

/// Only valid JSON under the size cap may be written.
pub fn check_json(text: &str) -> Result<(), String> {
    if text.len() as u64 > MAX_BYTES {
        return Err("too large".into());
    }
    serde_json::from_str::<serde_json::Value>(text)
        .map(|_| ())
        .map_err(|e| e.to_string())
}

/// Reads a file, refusing anything over the size cap before reading it into memory.
pub fn read_limited(path: &Path) -> Result<String, String> {
    let size = fs::metadata(path).map_err(|e| e.to_string())?.len();
    if size > MAX_BYTES {
        return Err("too large".into());
    }
    fs::read_to_string(path).map_err(|e| e.to_string())
}

/// Write to a temporary file, flush it to disk, then rename it into place.
pub fn write_atomic(path: &Path, text: &str) -> Result<(), String> {
    let tmp = path.with_extension("tmp");
    let mut file = fs::File::create(&tmp).map_err(|e| e.to_string())?;
    file.write_all(text.as_bytes()).map_err(|e| e.to_string())?;
    file.sync_all().map_err(|e| e.to_string())?;
    drop(file);
    fs::rename(&tmp, path).map_err(|e| e.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn store() -> (tempfile::TempDir, Store) {
        let dir = tempfile::tempdir().unwrap();
        let store = Store::new(dir.path().join("data"));
        (dir, store)
    }

    #[test]
    fn first_run_has_nothing_saved() {
        let (_dir, store) = store();
        assert_eq!(store.load().unwrap(), None);
    }

    #[test]
    fn save_then_load_round_trips() {
        let (_dir, store) = store();
        store.save(r#"{"version":1,"worries":[]}"#).unwrap();
        assert_eq!(
            store.load().unwrap().unwrap(),
            r#"{"version":1,"worries":[]}"#
        );
    }

    #[test]
    fn saving_keeps_the_previous_version() {
        let (_dir, store) = store();
        store.save(r#"{"n":1}"#).unwrap();
        store.save(r#"{"n":2}"#).unwrap();
        let previous = fs::read_to_string(store.path(PREVIOUS_FILE)).unwrap();
        assert_eq!(previous, r#"{"n":1}"#);
    }

    #[test]
    fn invalid_json_is_never_written() {
        let (_dir, store) = store();
        store.save(r#"{"n":1}"#).unwrap();
        assert!(store.save("{not json").is_err());
        assert_eq!(store.load().unwrap().unwrap(), r#"{"n":1}"#);
    }

    #[test]
    fn oversized_documents_are_refused() {
        let big = format!("\"{}\"", "x".repeat(MAX_BYTES as usize));
        assert!(check_json(&big).is_err());
    }

    #[test]
    fn delete_everything_removes_all_pebble_files() {
        let (_dir, store) = store();
        store.save(r#"{"n":1}"#).unwrap();
        store.save(r#"{"n":2}"#).unwrap();
        store.keep_corrupt_copy("oops").unwrap();
        store.delete_everything().unwrap();
        assert_eq!(fs::read_dir(&store.dir).unwrap().count(), 0);
        assert_eq!(store.load().unwrap(), None);
    }

    #[test]
    fn delete_everything_before_any_save_is_fine() {
        let (_dir, store) = store();
        assert!(store.delete_everything().is_ok());
    }
}
