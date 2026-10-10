# CLYN Travels — React + TypeScript + Tailwind CSS

A responsive five-page tourism inquiry website concept for Vietnam, Taiwan, and Thailand. The palette uses ocean navy `#123B66`, sunshine yellow `#F4C542`, pale blue `#EAF4FA`, and cream `#FFF9E9`.

## Included

- Home page with hero, destination cards, featured sample tours, value propositions, and inquiry CTA
- Destinations & Tours with destination filters and six sample tour concepts
- Tour detail pages with day-by-day sample itineraries and inquiry links
- Itineraries page with selectable schedules
- Booking inquiry form with validation and all requested fields
- About & Contact page with clearly marked missing business details
- Responsive mobile navigation, accessible labels, focus states, and reduced-motion support
- Google Apps Script + Google Sheets backend starter
- No checkout or fake payment processing

## Important content note

All itineraries are **illustrative templates**, not verified operator itineraries. Prices, inclusions, suppliers, availability, official company details, and contact details are intentionally not invented. Verify all travel, entry, and safety information before selling a package.

## Run locally

Install Node.js LTS (free) from https://nodejs.org/ . In a terminal, inside this project folder:

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

Create a production build:

```bash
npm run build
npm run preview
```

## Booking form modes

### Demo mode (default)

With no `VITE_GOOGLE_SCRIPT_URL`, the form stores a test inquiry in the current browser's localStorage and explicitly says it has **not** been sent. It does not save to a company database or notify anyone.

### Free Google Sheets backend

1. Create a Google Sheet in the Google account that should receive inquiries.
2. Copy the spreadsheet ID from its URL. It is the long value between `/d/` and `/edit`.
3. Open **Extensions → Apps Script** from the Sheet.
4. Paste the contents of `google-apps-script/Code.gs` into the editor.
5. Replace `PASTE_GOOGLE_SHEET_ID_HERE` with the spreadsheet ID. Save.
6. Choose **Deploy → New deployment → Web app**.
7. Set **Execute as** to your account. Set access to **Anyone** if you want public website visitors to submit; this exposes the endpoint publicly, so use it only with a dedicated Sheet and review privacy/spam protections. Authorize the script when prompted.
8. Copy the deployed **Web app URL** (ending in `/exec`).
9. Create a `.env` file in the project root (same level as `package.json`) with:

   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

10. Restart `npm run dev` after changing `.env`. For production, add the same environment variable in the hosting provider's project settings, then redeploy.

The front end uses a URL-encoded POST with `mode: "no-cors"` to avoid browser preflight issues with Apps Script. Browsers return an opaque response in this mode, so the success message means the request was dispatched; it **cannot verify** that the row was saved. Test with a real inquiry and check the Sheet. If you need verifiable delivery/error feedback, use a backend that supports CORS or a provider-specific form integration.

## Deploy for free

### Option A: Netlify (static hosting)

1. Push this project to a GitHub repository.
2. Create a free Netlify account and import the repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add `VITE_GOOGLE_SCRIPT_URL` in the site's environment variables and deploy.
6. Add a redirect so React Router deep links work. Create `public/_redirects` with:

   ```
   /* /index.html 200
   ```

   This project includes a `public/_redirects` file already.

Free-plan limits and provider policies can change. A custom domain is optional and usually costs money; use the free provider subdomain to keep the budget at ₱0.

### Option B: Cloudflare Pages

1. Push to GitHub and import the repository into Cloudflare Pages.
2. Framework preset: Vite.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Add `VITE_GOOGLE_SCRIPT_URL` as an environment variable, then redeploy.
6. Configure SPA fallback if needed; Vite static hosting on many providers can use `public/_redirects`.

## Before publishing

- Replace the placeholder contact information and confirm you have the right to use the brand name.
- Verify and approve each tour route, price, inclusion, cancellation term, supplier, and operating date.
- Add a real privacy notice and state who can access inquiry data.
- Test the inquiry flow from a phone and desktop; check the Google Sheet after each test.
- Confirm images are suitable for commercial use and review their source/licensing terms. The current images use Unsplash image URLs as visual placeholders.
- Add spam protection/rate limiting if the public endpoint starts receiving junk submissions.
- Do not collect passport details or payment card information in this inquiry form.

## Structure

```text
clyn-travels/
├── google-apps-script/
│   └── Code.gs
├── public/
│   └── _redirects
├── src/
│   ├── App.tsx
│   ├── data.ts
│   ├── index.css
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig*.json
└── vite.config.ts
```
