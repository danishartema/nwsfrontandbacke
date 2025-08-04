# Geo-Political News Mapper - Educational Platform

## Overview

The Geo-Political News Mapper is an educational platform designed to help students understand global affairs through AI-powered news analysis and automated study guide generation. The application combines comprehensive geopolitical news data with intelligent categorization, sentiment analysis, and educational insights. Students can explore world events through a streamlined news grid interface, filter events by category and timeline, and access AI-generated study guides specifically tailored for CSS, ISSB, SAT, and general current affairs learning. Each study guide includes summaries, keywords, key figures, discussion questions, quiz questions, vocabulary definitions, and subject linkages. The platform focuses on learning outcomes and analytical insights rather than geographical visualization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript and follows a component-based architecture. The application uses Vite as the build tool and development server, providing fast hot module replacement and optimized builds. The UI is styled with Tailwind CSS and uses shadcn/ui components for consistent design patterns. The frontend implements a single-page application (SPA) architecture with client-side routing using Wouter.

**Key architectural decisions:**
- **React + TypeScript**: Chosen for type safety, component reusability, and developer experience
- **Vite build system**: Selected for fast development builds and modern JavaScript features
- **Tailwind CSS + shadcn/ui**: Provides utility-first styling with pre-built accessible components
- **Component composition**: Modular components for filters, maps, analytics panels, and modals

### Backend Architecture
The backend uses Express.js with TypeScript running on Node.js, implementing a RESTful API design. The server follows a clean separation of concerns with dedicated modules for routing, storage, and server configuration. The application uses an in-memory storage implementation for development with sample data, designed to be easily replaced with a database implementation.

**Key architectural decisions:**
- **Express.js framework**: Lightweight and flexible for building REST APIs
- **TypeScript throughout**: Ensures type consistency between frontend and backend
- **Modular storage interface**: Abstracted storage layer allows easy database integration
- **Middleware-based request handling**: Structured request processing with logging and error handling

### Data Management
The application uses a shared schema definition approach with Zod for runtime validation and Drizzle ORM for database operations. The data model centers around news events with rich metadata including location data, categorization, sentiment analysis, and educational context. The system is designed to support PostgreSQL as the primary database with spatial data capabilities.

**Key architectural decisions:**
- **Shared schema approach**: Single source of truth for data types between frontend and backend
- **Drizzle ORM**: Type-safe database operations with migration support
- **Zod validation**: Runtime type checking and data validation
- **Rich event metadata**: Comprehensive data model supporting educational use cases and study guide generation
- **AI-powered study guides**: Automated generation of educational content including summaries, quizzes, and exam-specific materials

### State Management
The frontend uses TanStack Query (React Query) for server state management, providing caching, background updates, and optimistic updates. Local state is managed through React hooks and context where appropriate. The application implements real-time data fetching with automatic refetch intervals for live news updates.

**Key architectural decisions:**
- **TanStack Query**: Robust server state management with caching and synchronization
- **React hooks for local state**: Simple state management for UI interactions
- **Automatic data refresh**: Keeps news data current with periodic background fetches

### News Grid Interface
The application uses a streamlined news grid layout for displaying events, prioritizing content readability and educational value. The interface presents events as detailed cards with AI insights, learning objectives, and analytical data prominently featured. The design emphasizes educational content and removes geographical complexity to focus on news analysis.

**Key architectural decisions:**
- **Card-based layout**: Clean, scannable news event presentation with integrated study guide access
- **AI insights prominence**: Geopolitical impact, risk levels, and sentiment clearly displayed
- **Educational focus**: Learning objectives and automated study guide generation featured prominently
- **Content-first design**: Prioritizes news analysis and educational content over geographical visualization
- **Study guide integration**: One-click access to comprehensive educational materials for each news event

## External Dependencies

### Database and ORM
- **PostgreSQL**: Primary database with PostGIS extension for spatial data
- **Drizzle ORM**: Type-safe database toolkit with migration support
- **Neon Database**: Serverless PostgreSQL hosting solution

### Frontend Libraries
- **React 18**: Core UI framework with modern hooks and concurrent features
- **TanStack Query**: Server state management and data fetching
- **Wouter**: Lightweight client-side routing
- **React Grid Layout**: News event display system
- **Chart.js**: Data visualization for analytics charts
- **Radix UI**: Headless UI primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind integration

### Validation and Utilities
- **Zod**: Runtime schema validation
- **Date-fns**: Date manipulation and formatting
- **Class Variance Authority**: Type-safe utility for component variants
- **Clsx**: Conditional CSS class composition

### Session and Security
- **Connect-pg-simple**: PostgreSQL session store for Express sessions
- **Express session middleware**: User session management

The application is designed to be deployed on modern cloud platforms with support for both development and production environments. The modular architecture allows for easy scaling and maintenance while providing a robust foundation for educational geopolitical news analysis.