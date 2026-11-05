# Assistance application for Disasters
During urgent events, information is often scattered and not updated quickly. This can cause duplicate reports and delays, making it harder for rescue teams to help people who need urgent assistance.
**Assistance application for Disasters**is engineered to bridge this gap by providing a reliable, offline-first emergency assistance system that guarantees data persistence, real-time spatial coordination, and automated priority triage

##  System Architecture & Data Model

### Use-Case Diagram
<img width="1323" height="925" alt="image" src="https://github.com/user-attachments/assets/e84f8cd7-24ab-420e-9f3a-fbf36958f2ca" />
Important use cases include:

Log distress request 
Report accident 
Sync offline data 
Receive notifications 
View and filter the live map 
Calculate priority 
Classify emergency types 
Contact victims 
Allocate rescue resources 
Generate reports 
Respond to emergencies 
<img width="751" height="620" alt="image" src="https://github.com/user-attachments/assets/1def5511-5e76-4bd0-96fe-a654d88b4f3f" />

### Core Entities (Class Diagram)
<img width="1458" height="888" alt="image" src="https://github.com/user-attachments/assets/9736a29d-f12b-48f0-bd9b-d3ae1c571cad" />

* **`VictimRequest`**: Stores critical distress data including GPS coordinates verification status , computed priority scores, and timestamps
* **`CareNeed`**: Manages vulnerable group counts associated with a request (Bedridden, Infant, Elderly)
* **`StatusLog`**: Tracks audit trails of status transitions (`Submitted` → `Verified` → `Dispatched` → `Rescued`) managed by coordinators
## Key Features
- **Victim Request Logging & Offline Sync:** Log distress requests with GPS coordinates and store data locally to automatically sync once the internet connection is restored.
- **Rescue Coordinator Live Map:** Interactive real-time map dashboard for coordinators to visualize and filter emergency incidents.
- **Rule-based Priority Scoring:** Automatically calculate and highlight urgent cases or vulnerable groups (e.g., bedridden patients, infants).
- **Direct Contact Integration:** Enable coordinators to quickly access victim phone numbers for verification before dispatching rescue teams.

## Tech Stack 
- **SDLC:** Agile Methodology
- **Documentation:** Built based on the Project SRS (Software Requirements Specification)

  ## Screenshots / Demo
 ### Victim Distress Logging UI
<img width="576" height="270" alt="image" src="https://github.com/user-attachments/assets/148b4b5a-38c5-4fa1-b769-0f70ada3f47a" />
### Coordinator Distress Logging UI
<img width="571" height="270" alt="image" src="https://github.com/user-attachments/assets/e8e2222b-d420-4d2a-ad64-8645aab9c230" />

