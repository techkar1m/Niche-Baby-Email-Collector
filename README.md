# 👶 Niche Baby - Astro MPA

A modern, full featured Multi Page Application (MPA) built with React, TypeScript, and Tailwind CSS. This project serves as a high-conversion email collector for market intelligence, leveraging an AI assisted architecture and viral meme aesthetics.

## 🚀 Features

- **Astro Framework** - Modern static site generator with server side rendering for optimal performance
- **React Integration** - Full React support with JSX components
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework with custom components
- **AI-Enhanced** - Architecture and logic optimized via AI generation
- **Modern UI Components** - Radix UI components with custom styling
- **Authentication** - Built-in member authentication and protected routes
- **Client-side Routing** - React Router for seamless navigation
- **Responsive Design** - Mobile first responsive design
- **Testing** - Vitest testing framework setup
- **Development Tools** - ESLint, TypeScript checking, and more

## 🛠️ Tech Stack

- **Framework**: Astro 5.8.0
- **Frontend**: React 18.3.0
- **Styling**: Tailwind CSS 3.4.14
- **Language**: TypeScript 5.8.3
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest
- **Build Tool**: Vite
- **Deployment**: Cloudflare

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
Set up environment variables:

Bash

npm run env
Start development server:

Bash

npm run dev
The development server will start and you can view your site at nichebabyworld.com.

📁 Project Structure
main/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── Head.tsx        # Page head component
│   │   └── Router.tsx      # Routing component
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Astro pages
│   └── styles/             # Global styles
├── integrations/           # External API integrations
│   ├── cms/                # CMS integration
│   └── members/            # Member authentication
├── public/                 # Static assets
└── eslint-rules/           # Custom ESLint rules
🎨 UI Components
This project includes a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

Layout: Accordion, Collapsible, Tabs, Sheet

Forms: Input, Select, Checkbox, Radio Group, Switch

Navigation: Navigation Menu, Menubar, Breadcrumb

Feedback: Alert, Toast, Progress, Skeleton

Overlays: Dialog, Popover, Tooltip, Hover Card

Data Display: Table, Card, Badge, Avatar

Interactive: Button, Toggle, Slider, Command

🔧 Available Scripts
npm run dev - Start development server

npm run build - Build for production

npm run preview - Preview production build

npm run env - Pull environment variables

npm run check - Type check with Astro

npm run test:run - Run tests

🧪 Testing
The project includes Vitest for testing:

Bash

npm run test:run
📱 Responsive Design
The template is built with a mobile first approach and includes:

Responsive breakpoints

Touch-friendly interactions

Optimized images

Flexible layouts

🚀 Deployment
The project is configured for deployment on Cloudflare:

Bash

npm run build
