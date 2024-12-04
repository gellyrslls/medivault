# Pharmacy Inventory Management System

A full-stack web application for managing pharmacy inventory, tracking medications, and handling supplier relationships.

### Built With

- [![React][React.js]][React-url]
- [![Node][Node.js]][Node-url]
- [![Express][Express.js]][Express-url]
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
- [![Prisma][Prisma]][Prisma-url]
- [![Tailwind][Tailwind-css]][Tailwind-url]

## Project Structure

```
pharmacy-inventory/
├── client/               # Frontend React application (In Progress)
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page components
│       ├── context/      # React context
│       ├── hooks/        # Custom hooks
|       └── utils/        # Utility functions
|
├── server/              # Backend Express application (Completed)
│   └── src/
│       ├── controllers/ # Route controllers (Auth, Products, Suppliers, Reports)
│       ├── routes/      # API routes
│       ├── middleware/  # Auth, error handling middleware
│       └── utils/       # Utility functions & Prisma client
│   └── prisma/         # Prisma schema and migrations
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v20.17.0 or higher
- PostgreSQL 16.1 or higher
- Git 2.46.0 or higher

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/gellyrslls/pharmacy-inventory.git
   ```

2. Install packages

   ```sh
   # Frontend
   cd client && npm install

   # Backend
   cd ../server && npm install
   ```

3. Set up PostgreSQL database

4. Set environment variables

   ```sh
   # Backend .env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/pharmacy_inventory"
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

5. Run Prisma migrations

   ```sh
   cd server
   npx prisma migrate dev
   ```

6. Start development servers

   ```sh
   # Backend
   cd server && npm run dev

   # Frontend
   cd client && npm run dev
   ```

## Features

### Implemented Backend Features ✅

- User Authentication (JWT)
- Product Management
  - CRUD operations
  - Stock level tracking
  - Expiry date monitoring
  - Category management (OTC/Prescription)
- Supplier Management
  - CRUD operations
  - Product associations
- Reports Generation
  - Low stock alerts
  - Inventory status
  - Expiring products tracking

### Frontend Features (In Progress) 🚧

- Initial setup completed
- UI components structure planned
- Authentication pages pending
- Dashboard pending
- Product management UI pending
- Supplier management UI pending

## API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- PUT /api/auth/change-password

### Products

- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- GET /api/products/low-stock

### Suppliers

- GET /api/suppliers
- GET /api/suppliers/:id
- POST /api/suppliers
- PUT /api/suppliers/:id
- DELETE /api/suppliers/:id

### Reports

- GET /api/reports/low-stock
- GET /api/reports/inventory-status
- GET /api/reports/expiring-soon

## Contributing

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```sh
feat: add feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc
```

### Branch Strategy

```
main
└── development
    ├── feature/auth
    ├── feature/products
    └── feature/reports
```

1. Create your feature branch (`git checkout -b feature/amazing-feature`)
2. Commit using the convention above
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Create Pull Request to development branch

## Testing

### Backend API Testing Status

- Authentication endpoints (⏳ Pending)
- Product endpoints (⏳ Pending)
- Supplier endpoints (⏳ Pending)
- Reports endpoints (⏳ Pending)

<!-- MARKDOWN LINKS & IMAGES -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Tailwind-css]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
