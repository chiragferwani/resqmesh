# ResQMesh — Emergency SOS & Disaster Response Ecosystem

**Stay Connected. Save Lives. Stronger Together.**

ResQMesh is an Emergency-SOS Ecosystem-as-a-Service for disaster management, combining offline mesh communication, emergency alerting, AI-assisted coordination, incident management, and drone/robotic response simulation.

The platform is designed to remain operational and useful even when conventional cellular connectivity and power infrastructure are degraded or unavailable.

---

## 1. Project Features

- **SOSnap Citizen Access:** An entry point for citizens to send emergency alerts, broadcast locations, and view emergency instructions.
- **Respond Control Room & Command Center:** Unified operational dashboard to track and manage reported incidents, view responders and resources on a live interactive map, and allocate nearby rescue units.
- **Offline Mesh Network Simulation:** Graceful degradation layer showing BLE/Wi-Fi mesh routing, queued offline transmissions, and automatic synchronization on reconnection.
- **Robotics & Drone Integrations:** Telemetry controls to simulate drone status, aerial surveys, and robotic assistance.
- **AI Recommendation Engine:** Simulated algorithms matching available responders and teams to incidents based on specialties, workload, and distance.
- **CAP-Compliant Alert System:** persistent notification center for emergency broadcasts matching Common Alerting Protocol specifications.

---

## 2. Technology Stack

- **Framework:** React + Vite + TypeScript (Strict Mode)
- **Styling:** Tailwind CSS with custom Design Tokens (Primary Navy, Emergency Red, Success Green, Warning Amber, etc.)
- **Typography:** Apple's **SF Pro Display** font loaded from CDN.
- **Routing:** React Router (lazy-loaded pages for faster initial paint)
- **State Management:** Zustand (v5) lightweight global stores
- **Interactive Map:** Leaflet & React Leaflet (using free OpenStreetMap tiles, no API keys or paid services required)
- **Data Visualization:** Recharts for incident frequency, categories breakdown, response times, and resource index.
- **Icons:** Lucide React

---

## 3. Architecture Overview

```text
src/
├── App.tsx                   # Main entry point & React Router config
├── main.tsx                  # StrictMode mounting
├── app/
│   └── providers.tsx         # App contexts (Toast, etc.)
├── layouts/
│   └── AppLayout.tsx         # Main layout with collapsible sidebar and navigation
├── components/
│   ├── Sidebar.tsx           # Role-based sidebar with emergency SOS card
│   ├── TopBar.tsx            # Search bar, connectivity status, alert bell & profile
│   ├── SimulationPanel.tsx   # Floating developer console for real-time scenario tests
│   └── ui/                   # Reusable UI kits (StatCard, StatusBadge, EmptyState, Toast)
├── pages/                    # 15 lazy-loaded views matching spec
├── services/
│   └── eventBus.ts           # Local EventBus for simulating real-time socket events
├── stores/                   # Zustand stores separating app states
├── types/                    # Domain typescript interface definitions
├── data/                     # Seeded Pune deterministic mock datasets
└── styles/
    └── index.css             # Tailwind rules & SF Pro Display CDN import
```

---

## 4. Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone or download the repository directory.
2. Install all dependencies (no paid services/keys needed):
   ```bash
   npm install
   ```
3. Run the development server locally:
   ```bash
   npm run dev
   ```
4. Access the application in your browser at `http://localhost:5173`.

---

## 5. Demonstration & Simulation

To test the complete capabilities of ResQMesh:

1. **Sign In:** Select any of the 4 demo users:
   - **Admin User / Priya Sharma:** Access to full Control Room commands, interactive maps, teams assignment, resources, analytics, and reports.
   - **Rahul Patil:** Access to responder-specific view showing assigned missions, medical resources, and team communication.
   - **Siddhi Pawar:** Citizen interface to broadcast SOS alerts.
2. **Simulation Controls:** Click the floating **Settings Gear** in the bottom-right of the dashboard:
   - **Create High Priority Incident:** Instantly generates a random flash flood or emergency in the Pune area with map markers.
   - **Simulate SOS:** Generates citizen SOS broadcasts.
   - **Toggle Connection Mode:** Cycles between **Online**, **Mesh Mode**, and **Offline**.
   - **Resolve Selected Incident:** Updates selected incident directly to resolved.
3. **Offline SOS Workflow:**
   - Turn connectivity status to **Offline** or **Mesh Mode** in the simulation panel.
   - Click **Send SOS** in the sidebar.
   - Observe the transmission status queue ("Queued Offline" or "Mesh Relay").
   - Switch connectivity back to **Online** and see queued operations sync to the command center automatically.

---

## 6. Competitive Context

Unlike fragmented systems that handle alerting, messaging, and robotics separately (e.g. Bridgefy for messaging, Everbridge for alerting, Skydio for drones), ResQMesh integrates mesh communication, CAP alerts, incident triage, resource allocation, and robotic dispatch into a single disaster lifecycle platform.
