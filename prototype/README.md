# Flood Assist – improved web prototype (aligned with SRS v2)
Open `index.html` in a browser (or `single_file_prototype.html`, the same app in one file).

| File | Feature | Owner |
|---|---|---|
| `js/victim.js` | FR-1 Victim form: care headcount, validation, real GPS or labelled simulated location | Member 1 |
| `js/sync.js` | FR-2 Offline queue, automatic sync, 30 s retry with the same request ID | Member 2 |
| `js/scoring.js` | FR-4 Priority scoring = the SRS rule table | Member 3 |
| `js/coordinator.js` | FR-3 Map, type / status / care / priority filters, empty state | Member 4 |
| `js/cases.js` | FR-5 `tel:` call link, status flow Submitted→Verified→Dispatched→Rescued, exits with reason | Member 5 |
| `js/core.js`, `js/main.js`, `index.html`, `css/style.css` | Shared state, SRS vocabulary, escaping, accessibility | Team lead |

Test switches (header): **Online** and **Server OK / Server error** let you demo the offline and retry scenarios.
