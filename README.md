# 🛒 Mini Store - Next.js 15 Professional Showcase

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://mini-store-rust.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge)](https://github.com/mohamedhamdy74/mini-store)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

A high-performance, production-ready e-commerce storefront built with strictly modern Next.js 15 patterns. This project focuses on advanced data-fetching strategies, clean architecture, and premium UI/UX.

---

## 🌟 Key Highlights

### 🚄 Hybrid Data Fetching Architecture
This project demonstrates a sophisticated approach to data fetching by balancing performance and interactivity:
- **SSG (Static Site Generation)**: Used `generateStaticParams` for pre-rendering static product pages to ensure maximum speed and SEO.
- **Hydration/Dehydration Pattern**: Leverages **React Query** to fetch data on the server and "hydrate" it on the client, ensuring a smooth transition and SEO optimization.
- **CSR (Client-Side Rendering)**: Utilized for dynamic parts of the application, ensuring real-time responsiveness.
- **Suspense-Ready**: Implemented `useSuspenseQuery` for modern, declarative loading states.

### 🏗️ Clean & Scalable Architecture
Follows a modular folder structure designed for mid-to-large scale applications:
- **Feature-based directory structure**.
- **Axios Abstraction Layer**: Centralized API management for consistent error handling and interceptors.
- **Logic decoupling**: Clear separation between UI components and business logic.

### 🛣️ Advanced Routing
- **Route Groups**: Organized the codebase using `(shop)` groups to keep the file structure modular without impacting SEO-friendly URLs.
- **Dynamic Routing**: Implementation of `[id]` patterns for flexible product detail rendering.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Data Fetching**: [React Query (TanStack Query)](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Query (Server State)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
├── app/
│   ├── (shop)/         # Route group for store pages
│   │   ├── products/
│   │   │   └── [id]/   # Dynamic product detail page (SSG)
│   │   ├── layout.tsx
│   │   └── page.tsx    # Home page (Hybrid rendering)
├── components/          # Reusable UI components (shadcn)
├── hooks/               # Custom hooks for logic & data fetching
├── lib/
│   ├── api/           # Axios abstraction & API calls
│   ├── types.ts        # Shared TypeScript interfaces
│   └── utils.ts        # Utility functions
└── public/              # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm / pnpm / yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohamedhamdy74/mini-store.git
   cd mini-store
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```


---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---
*Created with ❤️ by [Mohamed Hamdy](https://github.com/mohamedhamdy74)*
