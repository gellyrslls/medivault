<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]

<br />
<div align="center">
  <h3 align="center">Pharmacy Inventory Management System</h3>

  <p align="center">
    A full-stack application for managing pharmacy inventory and suppliers
    <br />
    <br />
    <a href="https://github.com/your-username/pharmacy-inventory/issues">Report Bug</a>
    ·
    <a href="https://github.com/your-username/pharmacy-inventory/issues">Request Feature</a>
  </p>
</div>

## About

An inventory management system built for small pharmacies. Track medications, manage suppliers, and generate reports with an easy-to-use interface.

### Built With

* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Tailwind][Tailwind-css]][Tailwind-url]

## Getting Started

### Prerequisites

* Node.js (v20.17.0)
* npm
  ```sh
  npm install npm@latest -g
  ```
* MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your-username/pharmacy-inventory.git
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
- Product Management
- Stock Tracking & Alerts
- Supplier Management
- Basic Reporting

## Contributing

1. Fork the Project
2. Create your Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/your-username/pharmacy-inventory.svg?style=for-the-badge
[contributors-url]: https://github.com/your-username/pharmacy-inventory/graphs/contributors
[license-shield]: https://img.shields.io/github/license/your-username/pharmacy-inventory.svg?style=for-the-badge
[license-url]: https://github.com/your-username/pharmacy-inventory/blob/master/LICENSE
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Tailwind-css]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/