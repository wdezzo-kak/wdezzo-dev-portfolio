
# ⚡ WDEZZO_DEV PORTFOLIO GUIDE

Welcome to the **WDEZZO_DEV** project. This is a high-performance, single-page developer portfolio designed with a **Neobrutalist** aesthetic. It prioritizes raw functionality, high contrast, and aggressive typography.

---

## 🎨 DESIGN PHILOSOPHY: NEOBRUTALISM
This project rejects the "soft" aesthetics of modern web design. 
- **HARD SHADOWS**: No blurs. Use `shadow-hard` (solid black offsets).
- **HIGH CONTRAST**: Pure black (#121212) against vibrant neon colors.
- **RAW TYPOGRAPHY**: Space Grotesk for headings and JetBrains Mono for system-level logs.
- **VISUAL HIERARCHY**: Thick 4px borders define all containers.

---

## 🚀 [DEPLOYMENT_PROTOCOLS]

To push this interface live to production, follow these procedures. **Note:** Always run `npm run build` locally first to verify the `dist/` bundle.

### 1. VERCEL (RECOMMENDED)
The fastest path to a live production URL with automatic SSL.
1. Push your code to a GitHub/GitLab repository.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your project.
4. **Vercel auto-detects Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**: Add `GEMINI_API_KEY` if you are using AI features.
6. Click **Deploy**.

### 2. CLOUDFLARE PAGES
Extreme speed via Edge delivery.
1. Connect your repository in the [Cloudflare Pages Dashboard](https://dash.cloudflare.com/).
2. Select **Create a project** > **Connect to Git**.
3. Use these settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Deploy. Cloudflare will provide a `pages.dev` subdomain.

### 3. GITHUB PAGES
Ideal for hosting directly on your GitHub profile.
1. **Config Adjustment**: If your site is at `username.github.io/repo-name/`, you must edit `vite.config.ts` to include `base: '/repo-name/'`.
2. **Automated Action**: Create a file at `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - name: Install and Build
           run: |
             npm install
             npm run build
         - name: Deploy
           uses: JamesIves/github-pages-deploy-action@v4
           with:
             folder: dist
   ```
3. Push to `main` and enable "GitHub Pages" in repository settings (Source: `gh-pages` branch).

---

## 🛠 TECH STACK
- **FRAMEWORK**: React 19 (Functional Components + Hooks)
- **STYLING**: Tailwind CSS (Utility-first)
- **ANIMATION**: Framer Motion (Aggressive Spring Physics)
- **ICONS**: Lucide React
- **BACKEND (TESTIMONIALS)**: Google Sheets + Apps Script
- **BACKEND (CONTACT)**: FormSubmit.io

---

## 🔐 SIMULATION PORTAL (PREVIEW TOOL)
To experiment with your content and preview changes before committing them to the code:
- **Route**: Manually navigate to `/#/admin` OR hover over the "WDEZZO_DEV" text in the **Footer**.
- **Access Key**: Defined in `constants.ts` (Default: `WDEZZO_ADMIN_2025`).

---

## 📊 TESTIMONIAL APPROVAL SYSTEM (GOOGLE SHEETS)
To enable the **Live Visitor Logs** with a manual approval workflow:

1.  **Create a Google Sheet**: 
    - Set headers in Row 1: `timestamp`, `id`, `name`, `role`, `rating`, `opinion`, `origin_section`, `show_in_testimonials`.
    - **Pro Tip**: Select the `show_in_testimonials` column (H) and go to `Insert > Checkbox`.

2.  **Open Apps Script**: Extensions > Apps Script.

3.  **Paste this Filtered code**:
    ```javascript
    function doPost(e) {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var data = JSON.parse(e.postData.contents);
      
      sheet.appendRow([
        new Date(), 
        data.id, 
        data.name, 
        data.role, 
        data.rating, 
        data.opinion, 
        data.origin_section, 
        false // show_in_testimonials starts as FALSE (unapproved)
      ]);
      
      return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
    }

    function doGet(e) {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var rows = sheet.getDataRange().getValues();
      var headers = rows[0];
      var json = [];
      
      for (var i = 1; i < rows.length; i++) {
        var obj = {};
        for (var j = 0; j < headers.length; j++) { obj[headers[j]] = rows[i][j]; }
        
        // ONLY RETURN APPROVED RECORDS
        if (obj.show_in_testimonials === true || obj.show_in_testimonials === 'TRUE') {
          json.push({
            id: obj.id, 
            name: obj.name, 
            role: obj.role, 
            message: obj.opinion,
            rating: parseInt(obj.rating),
            show_in_testimonials: true,
            color: ['bg-brutal-lime', 'bg-brutal-pink-neon', 'bg-brutal-blue-electric', 'bg-brutal-orange-hot', 'bg-brutal-yellow', 'bg-brutal-cyan-deep'][Math.floor(Math.random() * 6)]
          });
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);
    }
    ```
4.  **Deploy**: Deploy > New Deployment > Web App. (Access: Anyone).
5.  **Moderation**: New logs appear in your sheet but **won't show on the site** until you check the `show_in_testimonials` box in Google Sheets.

---

## 📨 CONTACT FORM (FORMSUBMIT.IO)
1.  **Update Email**: In `constants.ts`, change `CONTACT_EMAIL` to your own email.
2.  **Activation**: The first time you send a message, FormSubmit will send you a confirmation email. Click the link to activate.

---

## 📜 LICENSE
**NO RIGHTS RESERVED.** 
Built for those who prefer code over gradients.
