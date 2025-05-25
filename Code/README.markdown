# Shop Web

A modern e-commerce platform built with Next.js, Prisma, NextAuth, and Stripe.

## Prerequisites
- Node.js >= 18
- PostgreSQL database
- Stripe account (test mode)
- Render account for deployment

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/shop-web.git
   cd shop-web
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your PostgreSQL `DATABASE_URL`, `NEXTAUTH_SECRET`, and Stripe keys.

4. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Run the development server:
   ```bash
   yarn dev
   ```

6. Open `http://localhost:3000` in your browser.

## Deployment on Render
1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Set Root Directory to `.` (or `shop-web` if in a monorepo).
4. Configure:
   - Build Command: `yarn install && npx prisma generate && yarn build`
   - Start Command: `next start`
   - Environment Variables:
     ```
     DATABASE_URL=your-postgresql-url
     NEXTAUTH_SECRET=your-secret-key
     NEXTAUTH_URL=https://your-service-name.onrender.com
     STRIPE_SECRET_KEY=your-stripe-secret-key
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
     ```
5. Deploy and access at `https://your-service-name.onrender.com`.

## Google Search Console
1. Add your site to Google Search Console.
2. Verify ownership with the HTML tag in `app/layout.tsx`.
3. Submit `sitemap.xml` (`https://your-service-name.onrender.com/sitemap.xml`).

## License
MIT