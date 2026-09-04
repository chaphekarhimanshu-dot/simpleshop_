# Simple Shop

A beginner-friendly e-commerce project: React + Tailwind CSS + Supabase.

This is a **simplified** version of the original plan — no category filters,
no price sorting, no separate CartContext syncing logic beyond localStorage.
Just: browse products, search by name, add to cart, check out, view orders.

## Setup

1. **Backend (Supabase)**
   - Create a project at supabase.com
   - Open the SQL editor and run `backend/supabase/migrations/001_initial_schema.sql`
   - (Optional) run `backend/supabase/seed.sql` to add sample products
   - Copy your Project URL and anon key from Settings → API

2. **Frontend**
   ```
   cd frontend
   npm install
   cp .env.example .env
   ```
   Fill in `.env` with your Supabase URL and anon key, then:
   ```
   npm run dev
   ```

## What's in here

- `frontend/src/context` — Auth (login/signup/logout) and Cart (localStorage) state
- `frontend/src/services` — the only two places that talk to Supabase for data (products, orders)
- `frontend/src/pages` — one file per page, matching the URL routes in `App.jsx`
- `backend/supabase` — the database schema and seed data

## Pages

Home, Shop, Product Details, Cart, Checkout, Login, Sign Up, Account, Orders, Order Details.

No payment integration yet — checkout just records the order ("Place Order" flow).
