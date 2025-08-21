<h1>medivault</h1>

A full-stack inventory management system designed for pharmacies to efficiently track products, manage suppliers, and generate vital reports.

## Key Features

- **Secure Authentication**: JWT-based authentication with user registration and login.
- **Business Profile Management**: A dedicated setup flow for users to create and manage their business profile.
- **Product Management**: Full CRUD (Create, Read, Update, Delete) functionality for pharmaceutical products, including stock levels, pricing, and expiry dates.
- **Supplier Management**: A complete module for adding, updating, and viewing supplier information and their associated products.
- **Automated Reports**: A reporting dashboard that automatically generates lists of low-stock and expiring products.
- **Recent Activity Feed**: A live-updating feed on the dashboard showing the latest actions taken within the system.

## Tech Stack

### Frontend (Client)

- **Framework**: [React](https://react.dev/) (with Vite)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)

### Backend (Server)

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)

## Getting Started

To get a local copy up and running, please follow these steps.

### Prerequisites

- **Node.js** (v18 or later)
- **PostgreSQL** database installed and running.
- **npm** (comes with Node.js)

### Installation & Setup

1.  **Clone the Repository**

    ```sh
    git clone https://github.com/gellyrslls/medivault.git
    cd medivault
    ```

2.  **Setup the Backend Server**

    ```sh
    # Navigate to the server directory
    cd server

    # Install dependencies
    npm install

    # Create your environment file from the example
    cp .env.example .env
    ```

    > [!IMPORTANT]
    > Open the new `.env` file and update your `DATABASE_URL` with your PostgreSQL password and `JWT_SECRET` with a strong, random string.

    ```sh
    # Run database migrations to set up the schema
    npx prisma migrate dev
    ```

3.  **Setup the Frontend Client**

    ```sh
    # Navigate to the client directory from the project root
    cd ../client

    # Install dependencies
    npm install
    ```

    > [!NOTE]
    > The client expects the server to be running on `http://localhost:5000/api`. This can be configured in a `.env` file in the `client` directory.

4.  **Run the Application**

    - Start the **backend server** (in one terminal, from the `/server` directory):
      ```sh
      npm run dev
      ```
    - Start the **frontend client** (in a _new_ terminal, from the `/client` directory):
      ```sh
      npm run dev
      ```

    The application will be available at **`http://localhost:5173`**.
