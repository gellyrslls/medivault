# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
#### Backend
- Complete Express server setup with middleware configuration
- PostgreSQL database integration with Prisma ORM
- Comprehensive authentication system with JWT
  - User registration
  - User login
  - Protected routes middleware
- Product Management API
  - CRUD operations for products
  - Stock level tracking
  - Category management (OTC/Prescription)
  - Expiry date tracking
- Supplier Management API
  - CRUD operations for suppliers
  - Supplier-product relationships
  - Contact information management
- Reports Module API
  - Low stock alerts
  - Inventory status reports
  - Expiring products reports
- Error handling middleware
- Environment configuration
- Database Models:
  - User model with authentication fields
  - Product model with inventory tracking
  - Supplier model with relationships
  - Category enumeration

#### Database Schema
- Implemented complete Prisma schema with:
  - User model (id, email, password, timestamps)
  - Product model (name, SKU, category, quantity, price, expiry)
  - Supplier model (name, contact, email, phone)
  - Proper relationships and constraints

### In Progress
#### Frontend
- Initial React + Vite setup
- Project structure organization:
  - Components directory setup
  - Pages directory structure
  - Utils and hooks preparation
- Base configuration:
  - Tailwind CSS setup
  - TypeScript configuration
  - shadcn/ui integration preparations

### Changed
- Migrated database layer from Mongoose to Prisma
- Updated authentication middleware naming from 'auth' to 'protect'
- Package dependencies resolution and updates
- Documentation improvements in README

### Fixed
- Authentication middleware import naming issues
- Package dependency conflicts
- Server configuration issues

## [0.1.0] - 2024-12-04

### Added
- Initial project scaffolding
- Basic directory structure:
  ```
  pharmacy-inventory/
  ├── client/
  │   └── src/
  │       ├── components/
  │       ├── pages/
  │       ├── context/
  │       └── utils/
  └── server/
      └── src/
          ├── controllers/
          ├── models/
          ├── routes/
          └── middleware/
  ```
- Core dependencies installation
- Git initialization and workflow setup
- Basic README documentation

### Security
- JWT token configuration
- Password hashing setup
- Protected routes middleware structure

## Project Specifications

### Tech Stack
- Frontend:
  - React 18 with Vite
  - TypeScript
  - Tailwind CSS + shadcn/ui
  - React Router DOM
  - React Hook Form
  - React Query
  - date-fns
  - Zod validation
- Backend:
  - Node.js with Express
  - PostgreSQL
  - Prisma ORM
  - JWT authentication
  - bcrypt password hashing

### Core Features Implementation Status
- ✅ Backend API Structure
- ✅ Database Models
- ✅ Authentication System
- ✅ Product Management
- ✅ Supplier Management
- ✅ Reports Module
- 🚧 Frontend Setup
- ⭕ Frontend Authentication
- ⭕ Frontend Layout
- ⭕ Frontend Features

[unreleased]: https://github.com/yourusername/pharmacy-inventory/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/pharmacy-inventory/releases/tag/v0.1.0