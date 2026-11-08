# AI-Use Statement (M3)

**Team:** Viounique  **Project:** Assistance application for Disasters (Disaster Assist)
**Milestone:** M3 – clickable prototype + Final Report  **Date:** 8 November 2026
**Repo:** https://github.com/Viounique

This statement covers AI use during M3. Earlier AI use for the M2 SRS is logged in SRS §8 and summarised in section 1 below.

## 1. Where AI helped

| Tool | Used for | Stage |
|---|---|---|
| Gemini | Background research on 2025–2026 flooding in Myanmar and Thailand: bottlenecks for rescue agencies and victims. | M2 – SRS §1.1 |
| Claude | Rewrote SRS v1.0 into v2.0 (MoSCoW, pains P1–P9, 11 NFRs, 37 acceptance criteria, INVEST table, use-case diagram, traceability matrix). | M2 – SRS |
| ChatGPT | Summarising information and reviewing our project. | M2/M3 |
| Claude | Reviewing our prototype (`index.html`) and code and giving suggestions. | M3 |
| Claude | Drafting the Final Report, its Golden Thread table (FR-1 … FR-5) and the manual test-case list; drafting this statement. | M3 |

AI did **not** make our design or scope decisions. The Must set (FR-1 … FR-5), the rule-based (non-AI) priority scoring and the out-of-scope list are team decisions.

## 2. What worked

- **Cross-checking structure:** Claude was good at keeping FR, UC, AC and NFR numbering consistent across SRS sections and the traceability matrix.
- **Turning research into requirements:** Gemini's regional summary gave useful background that we distilled into concrete pains (e.g. no real-time GPS, no live operational visibility).
- **Review feedback:** ChatGPT and Claude reviews of the project and prototype gave us a second set of eyes on gaps and wording. [TEAM: add 1–2 concrete suggestions you actually accepted, e.g. "added landmark field when GPS is unavailable".]
- **Report scaffolding:** Claude produced a first draft of the Golden Thread table and test-case list, which saved time on formatting.

## 3. What did not work

- Gemini's output was too general and contained macro-economic detail that was not useful for software requirements. We removed it.
- Numeric targets in the SRS (45 s submit time, 10 s map update, 95% thresholds, 500 simultaneous submissions) were **AI-proposed**. They are untested guesses until we measure them on a real build.
- FR-6 … FR-9 and the scoring rules were AI-proposed and still need validation with a real stakeholder.
- When Claude drafted the Final Report it only saw `index.html`, not the `js/` files, so its screen names (S-1 … S-4) and some test steps are inferred from the HTML structure and may not match the real behaviour. [TEAM: list any other wrong or unusable AI suggestions here.]

## 4. How we checked AI output

- **Requirements:** every AI-drafted FR was kept only if it traces to a stated pain (P1–P9) and has at least one happy and one edge acceptance criterion.
- **Numbers:** numeric NFR targets are treated as proposals. Each has a "how we will check" method in SRS §4 (timed trials, load test, scans).
- **Prototype:** we run the manual test cases T-1.1 … T-5.3 in the Final Report in a browser against `index.html` and record the result. A test is marked Pass only after we have run it. [TEAM: state how many cases have been run and the results.]
- **Traceability:** we compare the Golden Thread table against the real files and screens in the repo, and replace "planned" artefacts with links.
- **Stakeholder validation:** [TEAM: state whether you checked requirements or priority rules with a real or simulated stakeholder, and when. If not done yet, say so.]
- **Understanding:** every team member must be able to explain each FR and the prototype in the oral exam; we do not submit anything we cannot explain.

## 5. Data and privacy

We did not give AI tools real victim data. The prototype uses made-up names, phone numbers and locations. [TEAM: confirm.]

## 6. Declaration

All AI use is logged here and in SRS §8. Text, code and diagrams drafted by AI were reviewed and edited by the team before submission, and the team takes responsibility for the final content.
