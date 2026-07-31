# NABW - National Association of Business Women

A modern, responsive, and professional website for the National Association of Business Women (NABW), built with **Next.js**, **Express.js**, and **MongoDB** with **Mongoose**.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [API Endpoints](#api-endpoints)
- [Available Scripts](#available-scripts)
- [Security](#security)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

NABW is a comprehensive website for a non-profit organization dedicated to empowering and supporting business women. The website features a clean, elegant, and corporate design with a minimalist layout, high-quality imagery, subtle animations, and a consistent color palette. It is fully responsive, optimized for performance and SEO, and provides an intuitive user experience across desktop, tablet, and mobile devices.

## Features

### Frontend (Next.js)
- **Sticky Header** with logo, navigation menu, and dropdowns
- **Consistent Footer** with organization info, quick links, contact, and newsletter
- **Six Primary Navigation Tabs**: Home, Our Impact, Projects, Events, Take Action, Contact
- **Dropdown Menus**: About Us, Our Strategic Plan, Project listings, Benefits of Membership, Become a Member
- **Home Page** with hero banner, mission/vision/values, call-to-action, featured projects, impact statistics, upcoming events, testimonials, news, and partner logos
- **About Us Page** with history, mission, vision, objectives, leadership, governance, and strategic priorities
- **Strategic Plan Page** with long-term goals, strategic pillars, implementation framework, and downloadable documents
- **Our Impact Page** with key statistics, success stories, annual reports, photo gallery, and partners
- **Projects Section** with attractive project cards and detailed project pages
- **Events Page** with upcoming and past events, registration details, and photo galleries
- **Take Action Section** with benefits of membership and a comprehensive membership application form
- **Contact Page** with contact information, Google Maps integration, interactive contact form, and expandable FAQ section
- **SEO Optimized** with proper meta tags and structured data
- **Responsive Design** for all device sizes
- **Subtle Animations** and smooth scrolling

### Backend (Express.js)
- **RESTful API** for managing all content types
- **MongoDB/Mongoose** for database operations
- **Input Validation** using express-validator
- **Error Handling** with custom error middleware
- **Email Notifications** using Nodemailer (SMTP)
- **Security** with Helmet, CORS, and rate limiting
- **Health Check** endpoint

### Database (MongoDB)
- **Mongoose Models** for all content types
- **Modular Architecture** for easy maintenance and scalability

## Technology Stack

### Frontend
- **Next.js 14** - React framework for production
- **React 18** - JavaScript library for user interfaces
- **Tailwind CSS 3** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library

### Backend
- **Node.js 20** - JavaScript runtime
- **Express.js 4** - Web application framework
- **MongoDB 7** - NoSQL database
- **Mongoose 8** - MongoDB object modeling
- **Nodemailer** - Email sending
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Project Structure

```
NABW/
├── README.md
├── docker-compose.yml
├── .gitignore
├── backend/
│   ├── Dockerfile
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── eventController.js
│   │   ├── membershipController.js
│   │   ├── contactController.js
│   │   ├── faqController.js
│   │   ├── testimonialController.js
│   │   ├── partnerController.js
│   │   ├── impactStatController.js
│   │   ├── newsController.js
│   │   ├── strategicPlanController.js
│   │   └── aboutController.js
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Event.js
│   │   ├── MembershipApplication.js
│   │   ├── ContactMessage.js
│   │   ├── FAQ.js
│   │   ├── Testimonial.js
│   │   ├── Partner.js
│   │   ├── ImpactStat.js
│   │   ├── News.js
│   │   ├── StrategicPlan.js
│   │   └── About.js
│   ├── routes/
│   │   ├── projects.js
│   │   ├── events.js
│   │   ├── memberships.js
│   │   ├── contacts.js
│   │   ├── faqs.js
│   │   ├── testimonials.js
│   │   ├── partners.js
│   │   ├── impactStats.js
│   │   ├── news.js
│   │   ├── strategicPlan.js
│   │   └── about.js
│   └── utils/
│       └── email.js
└── frontend/
    ├── Dockerfile
    ├── .env.local
    ├── .eslintrc.json
    ├── .gitignore
    ├── package.json
    ├── next.config.js
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── next-env.d.ts
    ├── public/
    │   └── favicon.ico
    ├── styles/
    │   └── globals.css
    ├── lib/
    │   └── api.js
    ├── components/
    │   ├── layout/
    │   │   ├── Header.js
    │   │   ├── Footer.js
    │   │   └── Layout.js
    │   ├── ui/
    │   │   ├── Hero.js
    │   │   ├── ProjectCard.js
    │   │   ├── EventCard.js
    │   │   ├── TestimonialCard.js
    │   │   ├── FAQItem.js
    │   │   └── ImpactStat.js
    │   └── forms/
    │       ├── ContactForm.js
    │       └── MembershipForm.js
    └── pages/
        ├── _app.js
        ├── _document.js
        ├── index.js
        ├── about.js
        ├── strategic-plan.js
        ├── impact.js
        ├── events.js
        ├── contact.js
        ├── projects/
        │   ├── index.js
        │   └── [slug].js
        └── take-action/
            ├── benefits.js
            └── become-member.js
```

## Prerequisites

- **Node.js** v20 or higher
- **npm** v10 or higher
- **MongoDB** v7 or higher (or Docker)
- **Docker** and **Docker Compose** (for containerized deployment)

## Installation

### Option 1: Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd NABW
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
   - Copy `backend/.env.example` to `backend/.env` and update the values
   - Copy `frontend/.env.local.example` to `frontend/.env.local` and update the values

5. **Start MongoDB:**
   - If MongoDB is installed locally, start it: `mongod`
   - Or use Docker: `docker run -d -p 27017:27017 --name nabw-mongodb mongo:7`

6. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```

7. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

### Option 2: Docker Deployment

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd NABW
   ```

2. **Set up environment variables:**
   - Copy `backend/.env.example` to `backend/.env` and update the values
   - Copy `frontend/.env.local.example` to `frontend/.env.local` and update the values

3. **Build and start all services:**
   ```bash
   docker-compose up -d --build
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - MongoDB: localhost:27017

## Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/nabw

# JWT Secret (for future authentication)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here
FROM_EMAIL=noreply@nabw.org
FROM_NAME=NABW

# Admin Email (for notifications)
ADMIN_EMAIL=admin@nabw.org

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=NABW - National Association of Business Women
```

## API Endpoints

### Projects
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all published projects | Public |
| GET | `/api/projects/featured` | Get featured projects | Public |
| GET | `/api/projects/:slug` | Get a single project by slug | Public |
| POST | `/api/projects` | Create a new project | Admin |
| PUT | `/api/projects/:id` | Update a project | Admin |
| DELETE | `/api/projects/:id` | Delete a project | Admin |

### Events
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/events` | Get all published events | Public |
| GET | `/api/events/upcoming` | Get upcoming events | Public |
| GET | `/api/events/past` | Get past events | Public |
| GET | `/api/events/:slug` | Get a single event by slug | Public |
| POST | `/api/events` | Create a new event | Admin |
| PUT | `/api/events/:id` | Update an event | Admin |
| DELETE | `/api/events/:id` | Delete an event | Admin |

### Memberships
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/memberships` | Submit a membership application | Public |
| GET | `/api/memberships` | Get all membership applications | Admin |
| GET | `/api/memberships/:id` | Get a single application | Admin |
| PUT | `/api/memberships/:id` | Update an application | Admin |
| DELETE | `/api/memberships/:id` | Delete an application | Admin |

### Contacts
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contacts` | Submit a contact message | Public |
| GET | `/api/contacts` | Get all contact messages | Admin |
| GET | `/api/contacts/:id` | Get a single message | Admin |
| PUT | `/api/contacts/:id` | Update a message | Admin |
| DELETE | `/api/contacts/:id` | Delete a message | Admin |

### FAQs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/faqs` | Get all published FAQs | Public |
| GET | `/api/faqs/:id` | Get a single FAQ | Public |
| POST | `/api/faqs` | Create a new FAQ | Admin |
| PUT | `/api/faqs/:id` | Update a FAQ | Admin |
| DELETE | `/api/faqs/:id` | Delete a FAQ | Admin |

### Testimonials
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/testimonials` | Get all published testimonials | Public |
| GET | `/api/testimonials/:id` | Get a single testimonial | Public |
| POST | `/api/testimonials` | Create a new testimonial | Admin |
| PUT | `/api/testimonials/:id` | Update a testimonial | Admin |
| DELETE | `/api/testimonials/:id` | Delete a testimonial | Admin |

### Partners
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/partners` | Get all published partners | Public |
| GET | `/api/partners/:id` | Get a single partner | Public |
| POST | `/api/partners` | Create a new partner | Admin |
| PUT | `/api/partners/:id` | Update a partner | Admin |
| DELETE | `/api/partners/:id` | Delete a partner | Admin |

### Impact Stats
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/impact-stats` | Get all published impact stats | Public |
| GET | `/api/impact-stats/:id` | Get a single impact stat | Public |
| POST | `/api/impact-stats` | Create a new impact stat | Admin |
| PUT | `/api/impact-stats/:id` | Update an impact stat | Admin |
| DELETE | `/api/impact-stats/:id` | Delete an impact stat | Admin |

### News
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/news` | Get all published news | Public |
| GET | `/api/news/featured` | Get featured news | Public |
| GET | `/api/news/:slug` | Get a single news item by slug | Public |
| POST | `/api/news` | Create a new news item | Admin |
| PUT | `/api/news/:id` | Update a news item | Admin |
| DELETE | `/api/news/:id` | Delete a news item | Admin |

### Strategic Plan
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/strategic-plan` | Get the published strategic plan | Public |
| POST | `/api/strategic-plan` | Create a strategic plan | Admin |
| PUT | `/api/strategic-plan/:id` | Update a strategic plan | Admin |
| DELETE | `/api/strategic-plan/:id` | Delete a strategic plan | Admin |

### About
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/about` | Get the published about info | Public |
| POST | `/api/about` | Create about info | Admin |
| PUT | `/api/about/:id` | Update about info | Admin |
| DELETE | `/api/about/:id` | Delete about info | Admin |

### Health Check
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/health` | Check API health | Public |

## Available Scripts

### Backend
```bash
npm run dev      # Start the server in development mode (with nodemon)
npm start        # Start the server in production mode
npm run lint     # Run ESLint
npm run lint:fix # Run ESLint and fix issues
```

### Frontend
```bash
npm run dev      # Start the development server
npm run build    # Build the production application
npm start        # Start the production server
npm run lint     # Run ESLint
```

## Security

The application implements the following security best practices:

- **Helmet** - Sets various HTTP headers to secure the app
- **CORS** - Configures cross-origin resource sharing
- **Rate Limiting** - Prevents brute-force attacks
- **Input Validation** - Validates all user input using express-validator
- **Error Handling** - Custom error handler prevents information leakage
- **Environment Variables** - Sensitive data stored in environment variables
- **Body Parser Limits** - Limits request body size to prevent DoS attacks

## Future Enhancements

The application is designed to support future enhancements:

- **User Authentication** - JWT-based authentication for admin panel
- **Admin Dashboard** - Content management interface
- **Content Management** - CRUD operations for all content types
- **Online Donations** - Payment integration for donations
- **User Roles** - Different access levels for different user types
- **Blog/Publishations** - Content management for articles and publications
- **Analytics** - Integration with Google Analytics or similar
- **Multi-language Support** - Internationalization (i18n)
- **PWA Support** - Progressive Web App capabilities

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Website**: https://nabw.org
- **Email**: info@nabw.org
- **Phone**: +1 (555) 123-4567

---

**NABW - National Association of Business Women** - Empowering business women across the nation.
