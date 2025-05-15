# Konduct - Campaign ID Generator

A modern web application for generating and managing marketing campaign IDs with advanced features, dark mode support, and subscription capabilities.

## Features

- Campaign ID Generation
- Multi-platform Support
- Advanced Targeting
- Real-time Analytics
- Team Collaboration
- Dark Mode Support
- Subscription Management

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.example`)
4. Start the development server:
   ```bash
   npm run dev
   ```

## Test Accounts

The application comes with pre-configured test accounts for different user roles:

### Admin User
- Email: `admin@example.com`
- Password: `Admin123!`
- Role: ADMIN

### Manager User
- Email: `manager@example.com`
- Password: `Manager123!`
- Role: MANAGER

### Regular User
- Email: `user@example.com`
- Password: `User123!`
- Role: USER

## Authentication System

The application uses an in-memory authentication system for development and testing purposes. The system includes:

- User registration and login
- Session management
- Email verification
- Password reset functionality
- Role-based access control

### Password Requirements

All passwords must meet the following criteria:
- At least 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Development

### Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/            # Reusable UI components
├── lib/                   # Utility functions and services
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

### Key Technologies

- **Frontend**: Next.js 14+ with App Router
- **UI Components**: Custom components with dark mode support
- **State Management**: React Query + Zustand
- **Form Handling**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **Caching**: Redis

## License

This project is licensed under the MIT License - see the LICENSE file for details.
