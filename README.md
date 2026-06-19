# Captain Solo - Portfolio & Digital Agency

The official portfolio and digital agency platform for **Captain Solo** (Solomon Olufelo). A full-stack immersive web experience showcasing web development and video production services.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Overview

This project is a high-performance, theme-aware portfolio built with the latest modern web technologies. It features:
- **Immersive 3D Experience**: Interactive planet model using React Three Fiber.
- **Advanced Animations**: Complex scroll triggers and UI transitions powered by GSAP.
- **Theme System**: Dynamic switching between Dark, Light, and "Liquid Glass" themes.
- **Content Management**: Integrated blog system, portfolio showcase, and service packages.
- **Business Integration**: Contact forms (EmailJS), booking system (Calendly), and payment processing (Stripe).

## 🛠️ Tech Stack

- **Frontend Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D & Graphics**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Drei](https://github.com/pmndrs/drei)
- **Animation**: [GSAP](https://gsap.com/) (ScrollTrigger, Observer)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Backend/Services**: 
  - [Supabase](https://supabase.com/) (Database & Auth)
  - [EmailJS](https://www.emailjs.com/) (Transactional Emails)
  - [Stripe](https://stripe.com/) (Payments)

## 📂 Project Structure

The project filesystem is organized for scalability and maintainability:

```
/
├── dist/               # Production build artifacts
├── docs/               # Comprehensive project documentation
│   ├── strategy/       # Business & SEO strategies
│   ├── setup/          # Technical setup guides (Stripe, EmailJS, etc.)
│   ├── content/        # Content plans and package details
│   ├── database/       # SQL schemas and initialization scripts
│   └── changelogs/     # Development history and updates
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── sections/       # Page sections (Hero, About, Works, etc.)
│   ├── pages/          # Route components (Blog, Admin, etc.)
│   ├── context/        # React Context (Theme, etc.)
│   ├── lib/            # Utilities and helper functions
│   ├── data/           # Static data and constants
│   └── assets/         # Source assets
├── .prettierrc         # Code formatting rules
├── eslint.config.js    # Linting configuration
└── vite.config.js      # Build configuration (with @ alias)
```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/solufelo/CPTSOLO2025.git
    cd awwwards-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📚 Documentation

For detailed setup guides and strategy documents, please refer to the `docs/` directory.

- [Setup Guides](docs/setup/)
- [Business Strategy](docs/strategy/)
- [Database Schema](docs/database/)

## 📄 License

This project is licensed under the MIT License.

---
**Captain Solo** - *Where Code Meets Creativity*
