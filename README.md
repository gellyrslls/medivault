# Pharmacy Inventory Management System

A full-stack web application for managing pharmacy inventory, tracking medications, and handling supplier relationships.

### Built With

* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Tailwind][Tailwind-css]][Tailwind-url]

## Project Structure

```
pharmacy-inventory/
├── client/               # Frontend React application
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page components
│       ├── context/      # React context
│       ├── hooks/        # Custom hooks
│       └── utils/        # Utility functions
├── server/              # Backend Express application
│   └── src/
│       ├── controllers/ # Route controllers
│       ├── models/      # Mongoose models
│       ├── routes/      # API routes
│       ├── middleware/  # Custom middleware
│       └── utils/       # Utility functions
└── README.md
```

## Getting Started

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
3. Set environment variables
   ```sh
   # Copy and configure .env files in both client and server directories
   cp .env.example .env
   ```
4. Start development servers
   ```sh
   # Backend
   cd server && npm run dev

   # Frontend
   cd client && npm run dev
   ```

## Features

- Authentication
- Product/Inventory Management
- Stock Level Tracking & Alerts
- Supplier Management
- Basic Reporting

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


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/gellyrslls/pharmacy-inventory.svg?style=for-the-badge
[contributors-url]: https://github.com/gellyrslls/pharmacy-inventory/graphs/contributors
[license-shield]: https://img.shields.io/github/license/gellyrslls/pharmacy-inventory.svg?style=for-the-badge
[license-url]: https://github.com/gellyrslls/pharmacy-inventory/blob/master/LICENSE
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Tailwind-css]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/