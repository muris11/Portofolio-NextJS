# Portfolio - Fullstack Developer

A modern, responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Prisma. Features an admin panel for content management and real-time updates.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Prisma ORM
- **Admin Panel**: Secure admin interface for content management
- **Responsive Design**: Mobile-first design with dark theme
- **Real-time Updates**: Socket.IO integration for live features
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Session-based admin authentication
- **File Uploads**: Image upload functionality for projects and profile (using Vercel Blob Storage)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Custom session-based auth
- **Real-time**: Socket.IO
- **Deployment**: Vercel-ready
- **Styling**: Tailwind CSS with custom animations

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"
PRISMA_DATABASE_URL="your-prisma-accelerate-url"

# Admin Authentication
ADMIN_SESSION_TOKEN="your-secure-admin-token"
```

### 4. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── admin/          # Admin panel pages
│   │   ├── api/            # API routes
│   │   └── (site)/         # Public pages
│   ├── components/         # Reusable components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions and configurations
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts           # Database seeding script
├── public/                # Static assets
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🗄️ Database Schema

The application uses the following main models:

- **Profile**: Personal information and social links
- **Project**: Portfolio projects with images and tech stacks
- **Skill**: Technical skills with proficiency levels
- **Education**: Educational background
- **Experience**: Work experience
- **Message**: Contact form submissions

## 🔐 Admin Panel

Access the admin panel at `/admin/login` with your configured admin token.

Features:

- Profile management
- Project CRUD operations
- Skills management
- Education and experience tracking
- Message inbox

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:custom       # Start with custom server (Socket.IO)

# Database
npm run db:push          # Push schema changes to database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:reset         # Reset database
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio

# Production
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. **Enable Vercel Blob Storage**:
   - Go to your Vercel project dashboard
   - Navigate to Storage → Blob
   - Click "Create Database" and follow the setup
   - Copy the `BLOB_READ_WRITE_TOKEN` from the connection details
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (from Vercel Postgres)
   - `ADMIN_SESSION_TOKEN` (generate a secure random string)
   - `BLOB_READ_WRITE_TOKEN` (from Vercel Blob setup)
4. Deploy automatically on push

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🔒 Security Features

- Session-based authentication for admin panel
- CSRF protection
- Input validation and sanitization
- Secure file upload handling
- Environment variable protection

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Customization

### Colors and Themes

Modify `tailwind.config.ts` to customize the color scheme and theme.

### Content

Update content through the admin panel or directly in the database.

### Animations

Custom animations are defined in the Tailwind config and component files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Next.js and modern web technologies.
