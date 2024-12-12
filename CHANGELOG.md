# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Enhanced authentication UI with shadcn/ui components
- Form validation using react-hook-form and zod
- Global CSS theme setup for shadcn/ui
- TooltipProvider and required providers
- API client utility for centralized request handling
- Enhanced useAuth hook with proper state management
- Custom hooks for dashboard functionality:
  - useDashboardStats for statistics management
  - useRecentActivity for activity feed
- Real-time data integration for dashboard components
- Proper loading and error states for all dashboard widgets
- Empty state handling for activity feed
- Centralized API client for data fetching

### Changed
- Frontend component structure reorganization:
  - Moved auth forms to dedicated forms directory
  - Implemented proper separation of pages and components
  - Updated import paths with explicit file extensions
  - Better organization of auth-related components
  - Consolidated auth forms into single AuthForm component
  - Removed redundant LoginForm and RegisterForm components
- Migrated from context-based to hook-based authentication
- Improved TypeScript configuration and type safety
- Implemented proper error handling and loading states
- Refactored dashboard components to use real API data
- Enhanced loading states with skeleton animations

### Technical Updates
- Implemented React Query for server state management
- Added TypeScript interfaces for API responses
- Centralized API error handling

### Technical Debt / Pending
- Mobile responsiveness improvements
- Frontend layout implementation

## [0.2.0] - 2024-12-07

### Added

#### Frontend

- Authentication UI implementation
  - Login form with validation using Zod
  - Registration form with validation
  - Protected route component for secure routing
  - Authentication context and state management
- Layout Structure
  - Main layout wrapper component
  - Header component with user menu
  - Sidebar navigation with responsiveness
- Core UI Components Integration
  - shadcn/ui form components setup
  - Toast notification system
  - Card components
  - Sheet component for mobile navigation
- Feature-based folder organization
  - Components directory with auth and layout sections
  - Context setup with proper TypeScript types
  - Route configuration with lazy loading

### Changed

- Frontend project structure reorganization:
  - Implemented feature-based directory structure
  - Updated TypeScript configuration for path aliases
  - Modified App component to use provider pattern
- Frontend build configuration updates

### Fixed

- Frontend TypeScript path resolution
- Component import/export structures

## [0.1.0] - 2024-12-04

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

### Changed

- Migrated database layer from Mongoose to Prisma
- Updated authentication middleware naming from 'auth' to 'protect'
- Package dependencies resolution and updates
- Documentation improvements in README

### Fixed

- Authentication middleware import naming issues
- Package dependency conflicts
- Server configuration issues

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
- ✅ Frontend Setup
- 🚧 Frontend Authentication
- ⭕ Frontend Layout
- ⭕ Frontend Features

[unreleased]: https://github.com/gellyrslls/pharmacy-inventory/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/gellyrslls/pharmacy-inventory/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/gellyrslls/pharmacy-inventory/releases/tag/v0.1.0