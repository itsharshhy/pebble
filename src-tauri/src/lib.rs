//! Pebble's Rust side. The interface (ui/) asks for these commands through Tauri's IPC.
//! Everything stays on this computer: there are no network calls anywhere in this file.

mod storage;

use std::path::PathBuf;
use storage::Store;
use tauri::{Manager, State};
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_opener::OpenerExt;

/// The only web addresses Pebble will ever open, in the person's own browser.
/// Fixed here, so the interface can't be tricked into opening anything else.
const HELP_LINKS: [(&str, &str); 2] = [
    ("helpline", "https://findahelpline.com"),
    ("source", "https://github.com/itsharshhy/pebble"),
];

#[tauri::command]
fn load_document(store: State<Store>) -> Result<Option<String>, String> {
    store.load()
}

#[tauri::command]
fn save_document(store: State<Store>, text: String) -> Result<(), String> {
    store.save(&text)
}

#[tauri::command]
fn keep_corrupt_copy(store: State<Store>, text: String) -> Result<(), String> {
    store.keep_corrupt_copy(&text)
}

#[tauri::command]
fn delete_everything(store: State<Store>) -> Result<(), String> {
    store.delete_everything()
}

/// Asks where to save a backup, then writes it. Returns false if the person cancelled.
/// Async so the native dialog doesn't freeze the window.
#[tauri::command]
async fn export_backup(
    app: tauri::AppHandle,
    text: String,
    file_name: String,
) -> Result<bool, String> {
    storage::check_json(&text)?;
    let chosen = app
        .dialog()
        .file()
        .set_file_name(&file_name)
        .add_filter("Pebble backup", &["json"])
        .blocking_save_file();
    match chosen {
        Some(path) => {
            let path: PathBuf = path.into_path().map_err(|e| e.to_string())?;
            storage::write_atomic(&path, &text).map(|_| true)
        }
        None => Ok(false),
    }
}

/// Asks which backup to open and returns its text, or None if the person cancelled.
/// The interface validates every field before anything is replaced.
#[tauri::command]
async fn import_backup(app: tauri::AppHandle) -> Result<Option<String>, String> {
    let chosen = app
        .dialog()
        .file()
        .add_filter("Pebble backup", &["json"])
        .blocking_pick_file();
    match chosen {
        Some(path) => {
            let path: PathBuf = path.into_path().map_err(|e| e.to_string())?;
            storage::read_limited(&path).map(Some)
        }
        None => Ok(None),
    }
}

/// Opens one of the fixed help links in the person's browser.
#[tauri::command]
fn open_link(app: tauri::AppHandle, which: String) -> Result<(), String> {
    let url = HELP_LINKS
        .iter()
        .find(|(name, _)| *name == which)
        .map(|(_, url)| *url)
        .ok_or("unknown link")?;
    app.opener()
        .open_url(url, None::<&str>)
        .map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // e.g. ~/.local/share/app.pebble.desktop, %APPDATA%\app.pebble.desktop,
            // ~/Library/Application Support/app.pebble.desktop
            let dir = app.path().app_data_dir()?;
            app.manage(Store::new(dir));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            load_document,
            save_document,
            keep_corrupt_copy,
            delete_everything,
            export_backup,
            import_backup,
            open_link
        ])
        .run(tauri::generate_context!())
        .expect("Pebble could not start");
}
