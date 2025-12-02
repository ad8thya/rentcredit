
# RentCredit — Rent-based Credit Building & Landlord Dashboard

🔗 **Live demo:** https://rentcredit0.netlify.app/  

A modern fintech single-page app that helps tenants build credit history from rent payments while giving landlords simple tools to manage tenants and payments. Built as a product-quality student project to demonstrate full-stack design, role-based UX, realtime feedback, and pragmatic deployment.

---

## Problem we solve
In many rental markets, rent payments do not contribute to tenants' credit histories. Tenants who pay reliably receive little formal credit recognition, and landlords lack streamlined tools to manage rents and tenant relationships. RentCredit is a lightweight product prototype that simulates credit-building via rent history and provides actionable dashboards for both tenants and landlords.

---

## Key features
- ✅ Role-based access: tenant and landlord dashboards  
- ✅ Secure authentication using Firebase (email/password)  
- ✅ Responsive UI with light/dark mode and smooth animations  
- ✅ Tenant features: rent payment actions, rent streaks, simulated credit score, payment history  
- ✅ Landlord features: tenant management, payment confirmations, insights panel  
- ✅ Demo mode with mock data so reviewers can try the app without configuring backend keys  
- ✅ Clean, componentized React codebase for fast iteration

---

## Tech stack
- **Frontend:** React (Vite) + Tailwind CSS  
- **Animations:** Framer Motion  
- **Backend-as-a-Service:** Firebase Auth + Firestore  
- **Hosting / Demo:** Netlify (live demo)  
- **Dev tooling:** Node.js, npm, ESLint, Prettier

---

## Live demo & screenshots
- **Live demo:** https://rentcredit0.netlify.app/  

```md
[Login screen](docs/screenshots/login.png)
[Tenant dashboard](docs/screenshots/tenantdashboard.png)
[Landlord dashboard](docs/screenshots/landlorddashboard.png)
[User Navigation](docs/screenshots/choice.png)
[Landing Page](docs/screenshots/landingpage.png)

````

---

## Architecture (high level)

```
[Browser SPA (React)]
    ↕ Web client (Firestore SDK / REST)
[Firebase Auth]  <- authentication
[Firestore]      <- user profiles, payments, tenant collections, analytics
```

Component flow (simplified):

```
Client
 ├─ AuthContext -> protects routes
 ├─ Pages
 │   ├─ /login
 │   ├─ /tenant-dashboard
 │   └─ /landlord-dashboard
 └─ UI Components (Cards, Charts, Modals)
```

---

## Project structure

```
src/
 ├─ assets/            # images, icons
 ├─ components/        # reusable UI components (cards, forms, modals)
 ├─ context/           # AuthContext, RoleContext
 ├─ pages/             # TenantDashboard.jsx, LandlordDashboard.jsx, Auth pages
 ├─ services/          # firebase.js, api wrappers, data helpers
 ├─ utils/             # helpers, formatters
 └─ index.css           # Tailwind imports and global styles
```

---

## Getting started (development)

**Prerequisites**

* Node.js (v16+)
* npm or yarn
* Optional: a Firebase project for full backend functionality

**Install & run**

```bash
# clone
git clone https://github.com/your-username/rentcredit.git
cd rentcredit

# install
npm install

# development
npm run dev
# open the URL printed by Vite (typically http://localhost:5173)
```

**Build & preview**

```bash
npm run build
npm run preview
```

---

## Environment / production notes

To connect a real Firebase project:

1. Copy `.env.example` → `.env` and fill the Firebase config variables:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
...
```

2. For the public demo, demo mode uses mocked Firestore-like data so reviewers can explore features without keys.

---

## How the demo mode works

Demo mode seeds the UI with representative mock data and disables write operations to external services. This allows anyone to explore the feature set quickly without setup.

---

## What I learned / engineering decisions

* **Role-based UX:** Designing separate user flows for tenants and landlords and enforcing role checks both client-side (for UX) and via backend rules (for security).
* **Firestore cost-awareness:** Schema decisions reduce document reads for common queries; aggregated counters and batched writes lower cost and latency.
* **Progressive UX:** Demo mode + lightweight animations improve perceived polish and testability.
* **Deployment hygiene:** Vite + Netlify serves a fast static SPA while keeping serverless functions for future features.

---

## Measurable trade-offs & known limitations

* The “credit score” is simulated — real integration needs partnerships and privacy workflows.
* Firestore rules need further hardening for multi-tenant production usage.
* No payment gateway integration in demo; payment actions are mocked to prevent accidental transactions.

---

## Roadmap / Next steps

* Integrate a secure payments provider (sandbox) and webhook handling.
* Add Cloud Functions for notifications and server-side credit calculation.
* Improve analytics: track event funnels and retention metrics.
* Mobile PWA support with offline sync for weak-network areas.
* Admin analytics dashboard for landlord cohorts.

---

## Contributing

This project is MIT-licensed and open for contributions. If you want to try changes locally:

1. Fork the repo
2. Create a branch and implement changes
3. Open a PR with a brief description of the impact

---

## Contact & credentials

**Author:** Adithya Sivakumar — B.E. Computer Science, SSN College of Engineering 
**Email:** [adithya2410402@ssn.edu.in](mailto:adithya2410402@ssn.edu.in) 
**LinkedIn:** [https://linkedin.com/in/adithyasivakumar](https://linkedin.com/in/adithyasivakumar) 
**Repo:** [https://github.com/your-username/rentcredit](https://github.com/your-username/rentcredit) 
**Live demo:** [https://rentcredit0.netlify.app/](https://rentcredit0.netlify.app/) 

---

## License

MIT © 2025 Adithya Sivakumar

