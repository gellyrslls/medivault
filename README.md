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

### API Testing with Thunder Client

#### Setup

1. Install Thunder Client extension in VSCode
2. Create a new Collection named "Pharmacy Inventory API"
3. Set up environment variables:
   - Create new environment
   - Add variable: `baseUrl`: `http://localhost:5000`
   - Add variable: `token`: `<empty>` (Will be filled after login)

#### Authentication Testing

```json
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "test123"
}

POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "test123"
}
```

After successful login, set the token in your environment:
- Copy the JWT token from the response
- Update the `token` environment variable
- Add the following header to all protected requests:
  ```
  Authorization: Bearer {{token}}
  ```

#### Product Testing

```json
GET {{baseUrl}}/api/products
Authorization: Bearer {{token}}

POST {{baseUrl}}/api/products
Authorization: Bearer {{token}}
Content-Type: application/json

{
    "name": "Paracetamol",
    "sku": "PARA001",
    "category": "OTC",
    "quantity": 100,
    "minStockLevel": 20,
    "price": 9.99,
    "expiryDate": "2024-12-31",
    "description": "Pain reliever",
    "supplierId": 1
}

PUT {{baseUrl}}/api/products/:id
Authorization: Bearer {{token}}
Content-Type: application/json

{
    "quantity": 150,
    "price": 10.99
}

DELETE {{baseUrl}}/api/products/:id
Authorization: Bearer {{token}}
```

#### Supplier Testing

```json
GET {{baseUrl}}/api/suppliers
Authorization: Bearer {{token}}

POST {{baseUrl}}/api/suppliers
Authorization: Bearer {{token}}
Content-Type: application/json

{
    "name": "PharmaCare Ltd",
    "contactPerson": "John Doe",
    "email": "john@pharmacare.com",
    "phone": "1234567890"
}

PUT {{baseUrl}}/api/suppliers/:id
DELETE {{baseUrl}}/api/suppliers/:id
```

#### Reports Testing

```json
GET {{baseUrl}}/api/reports/low-stock
GET {{baseUrl}}/api/reports/inventory-status
GET {{baseUrl}}/api/reports/expiring-soon
Authorization: Bearer {{token}}
```

### Testing Status

- Authentication endpoints (✅ Ready for testing)
- Product endpoints (✅ Ready for testing)
- Supplier endpoints (✅ Ready for testing)
- Reports endpoints (✅ Ready for testing)

### Testing Best Practices

1. Test in sequence (auth → products → suppliers → reports)
2. Save successful requests as examples
3. Test both success and error cases:
   - Invalid data
   - Missing fields
   - Authentication errors
   - Authorization errors
4. Verify response status codes and formats
5. Create separate folders for each endpoint group
6. Document any issues found in GitHub Issues

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