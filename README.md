**# Expense Tracker

A full-featured **Expense Tracker** web application built with **Next.js**, **TailwindCSS**, **Drizzle ORM**, and **Clerk** for authentication. Track your budgets, expenses, and visualize your spending.

---

## Features

- User authentication with **Clerk**
- Add, update, and delete budgets
- Add and track expenses per budget
- Visual charts for spending overview using **Recharts**
- Emoji support for budgets
- Responsive design with **TailwindCSS**

---

## Tech Stack

- **Next.js 15**
- **React 19**
- **TailwindCSS 4**
- **Drizzle ORM** with Neon database
- **Clerk** for authentication
- **Recharts** for data visualization
- **Moment.js** for date handling
- **Emoji Picker React** for fun icons

---

## Getting Started

### Prerequisites

- Node.js >= 20
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1.**Clone the repository**

```bash
git clone https://github.com/Gurab-004/expense-tracker.git
cd expense-tracker
```
 
2.**Install dependencies**

npm install
# or
yarn install


3.**set up env variables**

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_DATABASE_URL=

4.**push database schema**
npm run db:push
# or
yarn db:push

5.**Run the development server**
npm run dev
# or
yarn dev

Open http://localhost:3000 in your browser to see the app.


Scripts:
npm run dev – Start development server
npm run db:push – Push Drizzle ORM migrations
npm run db:studio – Open Drizzle Studio

