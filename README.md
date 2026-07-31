# 🏛️ CivicAI — Civic Issue & Municipal Management Platform

> **A Mobile-First, Real-Time Civic Tech & Municipal Dispatch Platform built for Hackathons.**

---

## 🌟 Overview
**CivicAI** bridges the gap between urban residents and municipal public works departments. Citizens can instantly report local infrastructure failures (potholes, streetlights, garbage overflow, water pipe ruptures) with pin-point GPS accuracy, drag-and-drop photo evidence, and community upvoting. Simultaneously, city workers and department managers receive an operational command dashboard to triage tickets, assign repair crews, and track resolution metrics in real time.

---

## ✨ Key Features

### 📱 1. Public Citizen Portal
- **Interactive Leaflet Location Picker:** Click on an interactive dark-themed map to set exact GPS coordinates.
- **Drag-and-Drop Photo Upload:** Upload camera photos or choose pre-loaded evidence presets.
- **Categorized Issue Filing:** Filter & report under *Road & Potholes*, *Waste Management*, *Street Lighting*, and *Water Leakage / Sewage*.
- **Priority Selector:** File reports as *Low*, *Medium*, *High*, or *Emergency*.
- **Live Feed (List vs Map View):** Toggle seamlessly between a card feed and an interactive map showing color-coded priority pins with popups.
- **Community Upvoting:** Citizens upvote existing reports to elevate urgent neighborhood issues.

### 🛡️ 2. Municipal Admin / City Worker Dashboard
- **Real-Time Operational Stats:** Track Total Complaints, Pending Dispatch, Critical Emergencies, and Average Resolution Time (*1.8 Days*).
- **Interactive Management Table:** View category badges, GPS addresses, reporter info, and upvote counters.
- **Live Status Control:** Change ticket lifecycle states in real-time (`Open` → `Assigned` → `In Progress` → `Resolved`).
- **Workforce Assignment:** Dispatch specialized municipal units (*Road Maintenance Dept*, *Water Utilities Rapid Response*, *Sanitation Crew B*, *Electrical Unit*, etc.).
- **Ticket Inspector Modal:** Inspect photos, geolocation links, reporter contacts, and audit controls.

### 🔄 3. Persistent LocalStorage Engine
- **Zero Backend Setup:** Instant persistence across browser refreshes using browser `localStorage`.
- **Pre-Loaded Sample Data:** 6 realistic civic reports pre-loaded out-of-the-box so maps and admin tables populate immediately on demo launch.
- **Role Switcher Header:** Toggle between *Citizen Portal* and *Municipal Admin Dashboard* with 1 click.

---

## 🛠️ Tech Stack

- **Frontend Core:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 + Custom Glassmorphic Dark Tokens
- **GIS Mapping:** Leaflet 1.9 + React-Leaflet
- **Icons:** Lucide React Icons
- **State & Data Persistence:** Browser LocalStorage Engine with Custom Event Emitter

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 2. Installation
```bash
# Clone repository
git clone https://github.com/your-username/civic-AI.git
cd vibe-coding

# Install dependencies
npm install
```

### 3. Running Locally (Development Mode)
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment Guide

### Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project root directory.
3. Select defaults (Build Command: `npm run build`, Output Directory: `dist`).

### Deploying to Netlify / GitHub Pages
1. Push repository to GitHub.
2. Link repository on Netlify or Vercel for instant automated SSL deployment.

---

## 🎤 2-Minute Hackathon Pitch Script

> **Speaker 1 (The Problem):**  
> *"Every single day, thousands of citizens walk past dangerous potholes, overflowing trash dumpsters, and broken streetlights. But reporting them requires navigating broken municipal forms with no feedback loop. Meanwhile, city workers lack real-time visibility into which emergencies pose immediate danger to residents."*

> **Speaker 2 (The Solution - CityPulse Demo):**  
> *"Enter **CivicAI**—the real-time civic tech platform connecting citizens with municipal response teams. With our mobile-first portal, any citizen can drop a pin on our Leaflet map, attach photo proof, and file an emergency report in under 15 seconds."*

> **Speaker 1 (Community Upvoting & Admin Dashboard):**  
> *"Instead of filing duplicate complaints, neighbors can upvote an issue so city hall knows it affects 50+ people. With one click on our App Switcher, municipal dispatchers view the Command Center—filtering by emergency priority, assigning specialized crews like Water Utilities Rapid Response, and updating status from In Progress to Resolved."*

> **Speaker 2 (Impact & Scalability):**  
> *"CivicAI requires zero complex backend deployment to demonstrate live—operating entirely on a resilient client-side event store. It empowers cities to cut average resolution times down to 1.8 days while giving citizens full transparency."*

---

## 🙋 Judge Q&A Guide

### Q1: How does CivicAI handle duplicate issue reporting?
**Answer:** *Citizens can view live reports on the interactive Leaflet Map or List Feed before reporting. They can upvote an existing report instead of creating a duplicate, which boosts the report's priority score on the Municipal Admin Dashboard.*

### Q2: Why build a zero-backend LocalStorage MVP for a hackathon?
**Answer:** *For a 2-hour hackathon, eliminating backend latency and API key authentication ensures 100% demo reliability without database timeouts. Our state engine uses custom browser event emitters (`civicAI_storage_change`), delivering instant real-time UI synchronization between Citizen and Admin roles.*

### Q3: How would CivicAI scale to a full production city deployment?
**Answer:** *In production, the LocalStorage manager maps 1:1 to a PostGIS / PostgreSQL spatial database connected via Supabase or Node.js WebSockets, pushing live SMS notifications to field technicians when assigned.*
