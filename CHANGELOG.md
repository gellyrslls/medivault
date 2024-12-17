# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - v0.4.7

### Added

- Business isolation for products and suppliers
  - Added business relations in database schema
  - Products and suppliers now linked to specific businesses
  - Empty state UI for new businesses with no products

### Changed

- Enhanced authentication persistence
  - Added user data loading on app mount
  - Improved token management
  - Better handling of protected routes
- Updated controllers with business context
  - Products filtered by business
  - Suppliers filtered by business
  - Added business validation in all operations

### Fixed

- Authentication persistence across page refreshes
- Empty state handling in products module
  - Better error messages for new businesses
  - Friendly UI for empty product lists
  - Improved loading states
- API endpoints to verify business ownership
  - Product operations now check business context
  - Supplier operations validate business ownership

## [Unreleased] - v0.4.6

### Added

- Business Profile Implementation
  - Business profile setup page with form
  - Business context and state management
  - Setup flow after authentication
  - Route protection based on business setup status

### Changed

- Refactored authentication system
  - Improved context organization
  - Enhanced API client integration
  - Fixed login/register form handling
- Updated routing system to handle business setup flow

### Fixed

- Authentication state management
- Form submission handling
- Route protection and redirection
- Navigation after business setup completion

### Removed

- License number field from business setup form
- Redundant authentication files and code

## [Unreleased] - v0.4.5

### Added

- Business Profile Implementation
  - Added business profile database schema and migrations
  - Created business profile API endpoints
  - Implemented validation and error handling
  - Added business profile middleware
  - Enhanced authentication flow with business profile checks

### Changed

- Updated server configuration for better module handling
- Enhanced error handling with express-async-handler
- Improved API routing structure

### Fixed

- Server startup configuration
- Module imports in index.js
- Prisma client initialization

## [Unreleased] - v0.4.4

### Fixed

- Dashboard and Reports data synchronization
  - Aligned expiring products calculation with product page logic
  - Fixed incorrect stats display in dashboard and reports
  - Improved data fetching and caching strategy
- Authentication Implementation
  - Corrected auth hooks implementation
  - Fixed type declarations and removed redundant code
  - Improved error handling in auth system
- Query Invalidation
  - Added proper cache invalidation for dashboard stats
  - Enhanced data synchronization between modules

## [Unreleased] - v0.4.3

### Added

- Reports Module Implementation
  - Reports data fetching hook with React Query integration
  - Type-safe tables for low stock and expiring products
  - Integration with existing stats system
  - Reports page with tabbed interface
  - Reuse of StatsCard component for metrics display

### Changed

- Updated routing configuration to include reports page
- Enhanced type safety in data table implementations

### Fixed

- Date picker interaction in product form (now allows selecting dates and changing months)
- Improved z-index handling for calendar popover in dialog

## [Unreleased] - v0.4.2

### Added

- Suppliers Management Module
  - Suppliers data table with CRUD operations
  - Supplier data fetching hooks (useAllSuppliers, useSuppliers)
  - Supplier columns and filtering components
- New UI Components
  - Tabs component
  - Error boundary components
  - Enhanced error handling system
- Product-Supplier Integration
  - Updated product hooks for supplier selection
  - Enhanced supplier selection in product forms

### Changed

- Updated dependencies and configurations
- Enhanced routing configuration
- Updated page layouts for better UX

### Fixed

- Product-supplier relationship handling
- Form validation enhancements

## [Unreleased] - v0.4.1

### Added

- Stock Management Features
  - Stock update dialog for modifying product quantities
  - Low stock alerts component with visual indicators
  - Real-time stock level tracking
- Enhanced Error Handling
  - Detailed error logging for debugging
  - User-friendly error messages
  - Form validation improvements
- New UI Components
  - Alert component for notifications
  - Calendar component improvements
  - Dedicated product components directory

### Changed

- Improved calendar functionality in product form
- Enhanced API hooks with better error handling
- Reorganized product components structure
- Updated routing configuration
- Enhanced form validation

### Fixed

- Calendar functionality in product form
- Stock update endpoint issues
- Form validation in product management
- Component file organization
- API response handling

## [Unreleased] - v0.4.0

### Added

- Products module initial implementation
  - Product form with validation
  - Add/Edit product dialogs
  - Data table setup
- New shadcn/ui components integration
  - Table
  - Calendar
  - Badge
  - Checkbox
  - Popover
  - Textarea
- Quick Actions component on dashboard
  - Quick add product functionality
  - Quick stock update functionality
  - Navigation to supplier and reports
- Products API hooks using React Query
  - useProducts hook for fetching products
  - useAddProduct for adding new products
  - useUpdateStock for updating stock levels

### Changed

- Updated routing configuration
- Extended API client to support React Query operations
- Updated dashboard layout to include Quick Actions
- Modified RecentActivity component to support custom styling

### Fixed

- Login redirect prevention
- API client type definitions and error handling
- Auth compatibility with new API features

## [0.3.0] - 2024-12-14

### Added

- Collapsible sidebar implementation using shadcn-ui
- Font Awesome icons integration
- Mobile-responsive sidebar with Sheet component
- User profile menu in sidebar
- Breadcrumb navigation component
- Real-time data integration for dashboard components
- Loading states for all dashboard widgets
- Empty state handling for activity feed

### Changed

- Updated layout structure to use shadcn-ui patterns
- Improved mobile responsiveness
- Migrated to hook-based authentication from context-based
- Enhanced user experience with collapsible sidebar

### Fixed

- Authentication state persistence through page refreshes
- Token management and error handling
- Sidebar navigation and routing

## [0.2.0] - 2024-12-07

### Added

- Authentication UI implementation
  - Login form with Zod validation
  - Registration form with validation
  - Protected route component
  - Authentication context and state management
- Layout Structure
  - Main layout wrapper component
  - Header component with user menu
  - Sidebar navigation with responsiveness
- Core UI Components Integration
  - shadcn/ui form components
  - Toast notification system
  - Card components
  - Sheet component for mobile navigation

### Changed

- Frontend project structure reorganization
  - Implemented feature-based directory structure
  - Updated TypeScript configuration for path aliases
  - Modified App component to use provider pattern
- Frontend build configuration updates

### Fixed

- Frontend TypeScript path resolution
- Component import/export structures

## [0.1.0] - 2024-12-04

### Added

- Complete Express server setup with middleware configuration
- PostgreSQL database integration with Prisma ORM
- Authentication system with JWT
  - User registration
  - User login
  - Protected routes middleware
- Product Management API
  - CRUD operations for products
  - Stock level tracking
  - Category management
  - Expiry date tracking
- Supplier Management API
  - CRUD operations for suppliers
  - Supplier-product relationships
  - Contact information management
- Reports Module API
  - Low stock alerts
  - Inventory status reports
  - Expiring products reports
- Database Schema Implementation
  - User model
  - Product model
  - Supplier model
  - Category enumeration

### Changed

- Migrated database layer from Mongoose to Prisma
- Updated authentication middleware naming
- Package dependencies resolution

### Fixed

- Authentication middleware import issues
- Package dependency conflicts
- Server configuration issues

## [0.0.1] - 2024-11-30

### Added

- Initial project scaffolding and setup
- Basic directory structure
- Core dependencies installation
- Git initialization and workflow setup
- Basic documentation

[unreleased]: https://github.com/gellyrslls/pharmacy-inventory/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/gellyrslls/pharmacy-inventory/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/gellyrslls/pharmacy-inventory/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/gellyrslls/pharmacy-inventory/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/gellyrslls/pharmacy-inventory/releases/tag/v0.0.1
