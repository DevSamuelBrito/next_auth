# Portifol.io

Next.js application that demonstrates a complete authentication system with profile management and an image gallery. Users can upload and remove photos, edit their name, username, password, and profile picture. This study project is designed to practice Next.js (App Router and API Routes), shadcn UI components, and Cloudinary integration for image storage.

![Welcome Page](/public/readme/welcomePage.png)

## Features
- Authentication
  - Registration and login with credentials
  - Session management with NextAuth.js
  - Password encryption with bcrypt

- User profile
  - Upload and manage profile picture
  - Edit name and username
  - Change password
  - Account deletion

- Password recovery
  - Send recovery email (only works for the email registered in the API)
  - Password reset page with token

- Image upload and gallery
  - Upload images to Cloudinary
  - Preview before upload
  - List of user images
  - Delete images
  - Mark images as favorites
  - Set photos as private or public

- Dashboard
  - View all public photos
  - Search for public photos
  - View favorite photos

- Integration and persistence
  - Database via Prisma (PostgreSQL recommended)
  - Migrations included

- UI and experience
  - Styling with Tailwind CSS
  - shadcn UI components
  - Notifications with Sonner

## Tech Stack

- [Next.js 14](https://nextjs.org) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Prisma](https://www.prisma.io/) - Database ORM
- [Cloudinary](https://cloudinary.com/) - Image storage and management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - UI components
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [Resend](https://resend.com/) - Email sending service

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

### Resend
```
RESEND_API_KEY="your_resend_api_key"
PERSONAL_EMAIL="your_email@example.com"
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

---

### Project Structure

* /src/app - Application routes
* /src/components - Reusable UI components
* /src/lib - Utility functions, auth configuration
* /prisma - Database schema and migrations

### Notes

This is a demonstration project showcasing authentication and file management capabilities using the Next.js App Router. It's intended for educational purposes and as a starting point for similar applications.

### Gallery

- Welcome Page

![Welcome Page](/public/readme/welcomePage.png)

- Dashboard

![Dashboard](/public/readme/dashboard.png)

- Photo Details

![Photo Details](/public/readme/modalPhoto.png)

- Profile

![Profile](/public/readme/profile.png)

- Change Profile Picture

![Change Profile Picture](/public/readme/editingProfilePicture.png)


- Search

![Search](/public/readme/searching.png)


- Uploading Image

![Uploading Image](/public/readme/uploadImage.png)

- User Images

![User Images](/public/readme/userGallery.png)