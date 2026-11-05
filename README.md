# Assistance application for Disasters
During urgent events, information is often scattered and not updated quickly. This can cause duplicate reports and delays, making it harder for rescue teams to help people who need urgent assistance.

**Assistance application for Disasters**is engineered to bridge this gap by providing a reliable, offline-first emergency assistance system that guarantees data persistence, real-time spatial coordination, and automated priority triage

## Problem Statement
Floods in Myanmar and Thailand isolate victims due to damaged infrastructure and poor communication. Rescue teams receive incomplete or delayed location reports, making it difficult to identify and prioritize urgent cases, especially vulnerable people such as the elderly, infants, and bedridden patients. Meanwhile, disconnected emergency systems cause inconsistent, duplicated, and unreliable data, delaying rescue coordination and mission dispatches.

## Target Stakeholders
This issue impacts stakeholders across the entire response chain- from Incident Command Centers lacking operational visibility and Field Rescuers overburdened by fragmented workflows, to High-Risk Vulnerable Victims who rely on specialized medical equipment, such as bedridden patients requiring oxygen support or hemodialysis patients.

## Risk & Impact
Delays caused by manual coordination result in the loss of the critical "Golden Hour" needed to save lives. Furthermore, it causes severe misallocation of rescue capacity by deploying specialized assets-such as flat-bottom boats or portable power stations-to the wrong locations or to cases that do not match the actual urgency level.





##  System Architecture & Data Model

### Use-Case Diagram
<img width="1323" height="925" alt="image" src="https://github.com/user-attachments/assets/e84f8cd7-24ab-420e-9f3a-fbf36958f2ca" />
Important use cases include:

Log distress request ,
Report accident, 
Sync offline data, 
Receive notifications ,
View and filter the live map, 
Calculate priority ,
Classify emergency types ,
Contact victims ,
Allocate rescue resources ,
Generate reports ,
Respond to emergencies.


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

## Main User
### Flood victims 
submit their location and assistance needs.

### Emergency coordinators 
monitor cases using a live map and allocate resources.

## Functional Requirements (FR Summary)
### FR-1: Victim Request Logging:
Allows flood victims to quickly send distress requests with precise GPS locations, contact details, assistance categories, and special-care flags
### FR-2: Offline Capture & Automatic Sync:
Saves requests directly to the device when offline and automatically synchronizes them within 60 seconds once connectivity is restored
### FR-3: Coordinator Live Map with Filters:
Provides rescue coordinators a real-time spatial map to visualize distress pins and filter cases dynamically by priority, type, and status
### FR-4: Rule-Based Priority Scoring:
Automatically assigns Red, Yellow, or Green priority queues based on fixed safety rules to ensure life-threatening cases sit at the top
### FR-5: Contact Victim & Case Status:
Allows coordinators to call victims directly from the dashboard and manage the case status lifecycle
* **Case Status Flow:**`Submitted` $\rightarrow$ `Verified` $\rightarrow$ `Dispatched` $\rightarrow$ `Rescued` (Side Exits: `Unreachable`, `Canceled`)
  * **System Logic:** One-click dialer integration and real-time status updates within 10 seconds

## Non-Functional Requirements
### Map should load within 5 seconds on standard 4G.
### Status notifications should arrive within 30 seconds.
### A first-time victim should be able to submit a request within 45 seconds.
### Offline data must not be lost if the app crashes or the phone restarts.
### Coordinators can only access requests from their authorized sector.

## System Scope Control & MVP Boundaries
<img width="727" height="297" alt="image" src="https://github.com/user-attachments/assets/71a9c3cf-000c-444c-b20c-b14833782b77" />



## Tech Stack 
- **SDLC:** Agile Methodology
- **Documentation:** Built based on the Project SRS (Software Requirements Specification)

  ## Screenshots / Demo
 ### Victim Distress Logging UI
<img width="576" height="270" alt="image" src="https://github.com/user-attachments/assets/148b4b5a-38c5-4fa1-b769-0f70ada3f47a" />

### Coordinator Distress Logging UI
<img width="571" height="270" alt="image" src="https://github.com/user-attachments/assets/e8e2222b-d420-4d2a-ad64-8645aab9c230" />

## Team 
6931503047 Nattapron Aromoon
6931503016  SHINN SHINN THET
6931503011  LYNN LYNN THET



