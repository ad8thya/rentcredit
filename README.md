# RentCredit

Welcome to RentCredit - a modern fintech web app for the Indian market, helping tenants build credit through rent payments and enabling landlords to manage rent efficiently. Built with React, Vite, Tailwind CSS, and Firebase.

## Features

- 🎨 Clean, professional UI inspired by leading fintech brands
- 🌗 Light/Dark mode toggle for optimal user experience
- 📱 Fully responsive design (mobile & desktop)
- 🔒 Secure authentication with Firebase Auth
- 🏠 Role-based dashboards for tenants and landlords
- 📊 Interactive charts and analytics (CIBIL score, payment history, rent insights)
- 🧑‍💼 Landlord tools: tenant management, payment confirmation, insights
- 🧑‍💻 Tenant tools: rent streaks, credit-building progress, payment actions
- 🚀 Fast development with Vite and Framer Motion animations
- 🧪 Demo mode for easy preview without authentication

## Tech Stack

- **React 18** – UI framework
- **Tailwind CSS** – Utility-first styling
- **Vite** – Lightning-fast build tool and dev server
- **Firebase** – Authentication and Firestore database
- **Framer Motion** – Animations
- **Inter Font** – Modern typography

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the project
2. Install dependencies:

   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx                # Main app component and routing
├── main.jsx               # React entry point, context providers
├── AuthContext.jsx        # Authentication and user/role context
├── LandlordDashboard.jsx  # Landlord dashboard UI & logic
├── TenantDashboard.jsx    # Tenant dashboard UI & logic
├── components/            # Reusable UI components and modals
├── assets/                # Images and logos
├── index.css              # Global styles and Tailwind imports
└── utils/                 # Utility functions
```

## Design & UX Highlights

- **Header**: Logo, theme toggle, profile dropdown, and smart navigation
- **Sign Up**: Glassmorphism, password strength meter, validation checklist, animated partner logos
- **Dashboards**: Modern cards, charts, tables, and actionable insights
- **Protected Routes**: Role-based access (can be toggled for demo mode)
- **Demo Mode**: Instantly preview dashboards with mock data (no sign-in required)

## Customization

- Easily adjust colors, spacing, and typography via Tailwind classes
- To enable/disable authentication, toggle the relevant logic in `AuthContext` and dashboard components

## License

This project is open source and available under the MIT License.


