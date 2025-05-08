This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Client Routes

### Existing Client Routes

#### Auth Routes

-   `/auth/login` - User login page
-   `/auth/signup` - User registration page
-   `/auth/store-select` - Store selection page

#### App Routes

-   `/app/store` - Store management page
-   `/app/brand` - Brand management page
-   `/app/category` - Category management page
-   `/app/product` - Product management page

### Planned Client Routes

#### Dashboard Routes

-   `/dashboard` - Main dashboard view
-   `/dashboard/sales` - Sales management
-   `/dashboard/inventory` - Inventory management
-   `/dashboard/reports` - Reports and analytics
-   `/dashboard/settings` - System settings

#### POS Routes

-   `/pos` - Point of Sale main interface
-   `/pos/checkout` - Checkout process
-   `/pos/transactions` - Transaction history

## API Routes

### Existing API Routes

#### Authentication

-   `POST /api/auth/login` - User login
-   `POST /api/auth/signup` - User registration
-   `DELETE /api/auth/logout` - User logout
-   `POST /api/auth/store-select` - Select store

#### Store Management

-   `GET /api/store` - Get all stores
-   `POST /api/store` - Create new store

#### Product Management

-   `GET /api/product/active/display` - Get all active products
-   `POST /api/product` - Create new product
-   `GET /api/category` - Get all categories
-   `POST /api/category` - Create new category
-   `GET /api/brand` - Get all brands
-   `POST /api/brand` - Create new brand

### Planned API Routes

#### Sales

-   `GET /api/sales` - Get all sales
-   `POST /api/sales` - Create new sale
-   `GET /api/sales/:id` - Get sale details
-   `PUT /api/sales/:id` - Update sale

#### Inventory

-   `GET /api/inventory` - Get inventory status
-   `POST /api/inventory/update` - Update inventory levels
-   `GET /api/inventory/history` - Get inventory history

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
