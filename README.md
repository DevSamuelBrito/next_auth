# NextAuth Photo and Gallery Application (In Work)

This is a Next.js application that demonstrates a comprehensive authentication system with user profile management and image gallery features.

## Features

- **Authentication System**
  - User registration and login with credentials
  - Session management with NextAuth.js
  - Password encryption with bcrypt

- **User Profile Management**
  - Profile picture upload and management
  - Username editing
  - Password changing
  - Account deletion

- **Photo Gallery**
  - Image upload to Cloudinary
  - Image preview before upload
  - Gallery view of all uploaded images
  - Image deletion

## Tech Stack

- [Next.js 14](https://nextjs.org) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Prisma](https://www.prisma.io/) - Database ORM
- [Cloudinary](https://cloudinary.com/) - Image storage and management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - UI components
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Cloudinary account for image storage
- A database (this project uses PostgreSQL by default)

### Environment Setup

Create a `.env` file in the root directory with the following variables:

### Database
DATABASE_URL="your-database-connection-string"

### NextAuth

```
NEXTAUTH_SECRET="your-nextauth-secret" NEXTAUTH_URL="http://localhost:3000"
```

### Cloudinary
```
CLOUDINARY_CLOUD_NAME="your-cloud-name" CLOUDINARY_API_KEY="your-api-key" CLOUDINARY_API_SECRET="your-api-secret"
```


### Installation

```bash
# Install dependencies
npm install

# Run Prisma migrations
npx prisma migrate dev

# Start the development server
npm run dev

```

Open http://localhost:3000 with your browser to see the application.

### Project Structure
* /src/app - Application routes
* /src/components - Reusable UI components
* /src/lib - Utility functions, auth configuration
* /prisma - Database schema and migrations
### Demo Pages
* / - Home page with login form
* /signup - Registration page
* /dashboard - Main dashboard with user information
* /dashboard/profile - User profile management
* /dashboard/account - Photo gallery management

### Notes
This is a demonstration project showcasing authentication and file management capabilities using the Next.js App Router. It's intended for educational purposes and as a starting point for similar applications.