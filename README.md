# ⚡ WDEZZO_DEV_PORTFOLIO // v1.2.0

![AESTHETIC: NEOBRUTALISM](https://img.shields.io/badge/AESTHETIC-NEOBRUTALISM-ffff00?style=for-the-badge&logoColor=black)
![ENGINE: REACT_19](https://img.shields.io/badge/ENGINE-REACT_19-0066ff?style=for-the-badge&logoColor=white)
![STYLING: TAILWIND_CSS](https://img.shields.io/badge/STYLING-TAILWIND_CSS-00ffcc?style=for-the-badge&logoColor=black)
![BACKEND: GSHEETS_MODERATED](https://img.shields.io/badge/BACKEND-GSHEETS_MODERATED-00ff66?style=for-the-badge&logoColor=black)

> **HIGH-IMPACT. HIGH-CONTRAST. ZERO-COMPROMISE.**
> A neobrutalist developer terminal transformed into a high-performance landing page. Designed for those who treat code as an art form and performance as a requirement.

---

## 🛠 [CORE_SPECIFICATIONS]

- **Frontend**: React 19 (Functional Hooks + Context)
- **Styling**: Tailwind CSS (Utility-first Neobrutalist Config)
- **Motion**: Framer Motion (High-stiffness spring physics)
- **Icons**: Lucide React (Raw stroke-based visuals)
- **Moderation**: Google Apps Script + Google Sheets (Filtered API)
- **Deployment**: Optimized for Vercel / Netlify / Cloudflare Pages

---

## ⚡ [SYSTEM_FEATURES]

### 1. DYNAMIC_PROJECT_MATRIX
- High-contrast grid with raw 4px borders.
- **Iframe Simulation**: Live project previews embedded in a brutalist modal interface.
- Gray-scale to color transitions on hover (Contrast Focus).

### 2. MODERATED_LOGGING_SYSTEM (NEW)
- **Submission**: Visitors can push logs via a hidden feedback FAB.
- **Hidden Filter**: All logs are pushed with `show_in_testimonials: false` by default.
- **Moderation Portal**: Manual approval via Google Sheets (Checkboxes).
- **Infinite Marquee**: Only verified "Transmissions" are rendered in the live feed.

### 3. SIMULATION_PORTAL (ADMIN)
- Access via `/#/admin` or secret footer uplink.
- Real-time UI experimentation (Projects, Stack, Config).
- **Persistent Preview**: Edits stored in `localStorage` for session-wide testing.
- **Source Export**: Generate the final `constants.ts` code block in one click.

### 4. ADAPTIVE_UI
- **Dark Mode**: System-aware with persistent toggle.
- **Responsive Core**: Grid systems designed to survive viewport scaling from mobile to 4K.

---

## 🚀 [INITIALIZATION_PROTOCOL]

### 1. CLONE_AND_INSTALL
```bash
git clone https://github.com/wdezzo-kak/wdezzo-dev.git
cd wdezzo-dev
npm install
```

### 2. BOOT_LOCAL_ENVIRONMENT
```bash
npm run dev
```

### 3. PRODUCTION_BUILD
```bash
npm run build
```

---

## 📊 [BACKEND_MODERATION_LOGIC]

The system utilizes a **Decoupled Moderation Workflow**:

1. **SPREADSHEET_SETUP**: 
   - Create a Google Sheet with headers: `timestamp, id, name, role, rating, opinion, origin_section, show_in_testimonials`.
   - Set column H as a **Checkbox** (Approved/Rejected).

2. **APPS_SCRIPT_ENGINE**: 
   - The script performs **Server-Side Filtering**. 
   - `doGet()` only returns rows where `show_in_testimonials` is `TRUE`.
   - `doPost()` initializes all new entries as `FALSE`.

3. **UPLINK**: 
   - Replace `GOOGLE_SCRIPT_URL` in `src/constants.ts` with your deployed Web App URL.

---

## 📨 [CONTACT_UPLINK]

The contact form is powered by **FormSubmit.io**.
- No server required.
- **Setup**: Change `CONTACT_EMAIL` in `constants.ts`.
- **Activation**: Send a test message and click the verification link in your inbox.

---

## 📜 [LICENSE_LOG]

**NO RIGHTS RESERVED.**
This code is free to be modified, broken, or rebuilt. 
Built with 🖤 by **Abdalla Izzeldin (WDEZZO_DEV)**.
