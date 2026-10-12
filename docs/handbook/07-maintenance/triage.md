# Issue triage
*Phase: Maintenance · Handling bugs, ideas and feedback calmly.*

## Labels
| Label | Meaning |
|---|---|
| `bug` | Something doesn't work as the handbook says |
| `calm` | Works, but fails the Calm Audit. Treated like a major bug |
| `idea` | A suggestion. Goes through [change control](../02-requirements/scope.md#how-to-handle-a-new-idea-change-control) |
| `a11y` | Accessibility problem |
| `privacy` | Anything touching data or network. **Highest priority** |
| `docs` | Handbook or README |
| `good first issue` | Small, well-described, safe for new contributors |
| `S1`–`S4` | Severity ([Test strategy](../05-testing/test-strategy.md#bug-severity)) |

## Triage routine (weekly, 15 minutes max)
1. Read new issues. Thank the reporter in one line.
2. Can you reproduce it? If not, ask for steps, browser and device, and **never** for their worry text.
3. Label it: type + severity.
4. S1 → fix now. S2/S4 → next loop. S3 → backlog. Idea → monthly review.
5. Close duplicates kindly, linking the original.

## Feedback without tracking
Pebble has no analytics, so we learn only from what people **choose** to tell us:
- GitHub Issues and Discussions
- Usability test sessions
- A "Send feedback" link in About that opens a GitHub issue form (no data attached automatically)

This is slower than analytics. That's an accepted trade-off for privacy.

## Response templates
**Can't reproduce:**
> Thanks for reporting this. Could you share your browser, device, and the steps that led to it?
> Please don't include any of your pebble text, since we never need it.

**Idea declined:**
> Thank you for this idea. We've decided not to add it because it conflicts with our principle
> "[principle]". Here's the reasoning: [one line]. We really appreciate you thinking about Pebble.

## Done when
No issue is older than 2 weeks without a label and a reply.
