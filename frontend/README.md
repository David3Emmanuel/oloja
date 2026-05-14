# Oloja

Oloja is a modern, responsive web application designed to connect users with tailored, AI-recommended job opportunities, manage their financial earnings, and build a verifiable trust identity. Built with Next.js 16, the platform focuses on delivering a highly fluid, app-like experience across all devices.

## 🚀 Key Features

### 1. Seamless Onboarding Flow
- Multi-step, animated onboarding sequence using Framer Motion.
- Captures essential user information (Role, Personal Info, Skills, Experience) smoothly.
- Beautiful state-driven transitions between steps without page reloads.

### 2. Smart Dashboard
- **AI Recommended Opportunities:** Personalized job matches based on user skills, distance, and duration.
- **Dynamic Layout:** A responsive grid system that scales beautifully from mobile devices to extra-wide desktop monitors.
- **Trust Score System:** Gamified metric to build user identity and reliability.

### 3. Comprehensive Wallet & Savings
- **Financial Hub:** Track available balance, recent transactions, and total earnings.
- **Savings Progress:** Gamified savings tracker that unlocks benefits (like 8% interest) as users complete more jobs.
- **Interactive UI:** Smooth transitions, hover effects, and beautifully designed metrics.

### 4. Detailed Job Views
- Comprehensive breakdowns of job requirements, company details, and location.
- **Financial Growth Potential:** Predicts weekly, monthly, and 6-month earning potential based on the job.
- **Safety & Trust Metrics:** Highlights verified employers and secure payment protections.

### 5. Premium UX/UI
- **Dark & Light Mode:** Fully integrated theming using `next-themes` and Tailwind CSS v4, respecting system preferences by default.
- **Micro-Animations:** Fluid transitions, staggered list appearances, and spring animations powered by Framer Motion.
- **Adaptive Responsiveness:** Custom CSS grid architectures that adapt the layout from a mobile-first column to a comprehensive desktop multi-column workspace.

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theming:** [Next Themes](https://github.com/pacocoursey/next-themes)
- **Language:** TypeScript

## 📁 Project Structure

```text
oloja/
├── app/
│   ├── globals.css        # Global CSS, Tailwind v4 imports, and theme variables
│   ├── layout.tsx         # Root layout configuring fonts and ThemeProvider
│   └── page.tsx           # Main application orchestrator and view controller
├── components/
│   ├── dashboard/         # Dashboard screens (Wallet, JobDetails, MenuDrawer)
│   ├── onboarding/        # Modular multi-step onboarding components
│   ├── ThemeProvider.tsx  # Next-themes provider wrapper
│   └── ThemeToggle.tsx    # Floating dark/light mode toggle button
```

## 🏁 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 💡 Customization

- **Colors:** The application uses highly customized colors (`#8b5cf6` for primary purple, `#10b981` for emerald accents) built explicitly into the Tailwind utility classes.
- **Theming:** To modify the dark/light mode logic, reference the `@custom-variant dark` definition in `globals.css` and the `ThemeProvider`.

## 📄 License

This project is licensed under the MIT License.
