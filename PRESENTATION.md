---
marp: true
theme: default
class: lead
paginate: true
header: 'Type-GraphQL Demo Project'
footer: 'Fullstack TypeScript with GraphQL & Prisma'
---

# Type-GraphQL Demo Project

**Fullstack TypeScript Movie Review Platform**

A comprehensive demonstration of modern web development with TypeScript, GraphQL, and Prisma

---

## 🎯 Project Overview

- **Movie review platform** built with cutting-edge TypeScript stack
- **Monorepo architecture** managed with pnpm workspaces
- **Backend API** + **Frontend webapp** in a unified codebase
- **Real-time features** with GraphQL subscriptions
- **Type-safe** end-to-end development

---

## 🏗️ Architecture

```
type-graphql/
├── api/           # GraphQL API server
├── webapp/        # Preact frontend
├── my_resources/  # Design assets
└── package.json   # Monorepo root
```

**Tech Stack:**
- **API**: TypeScript + TypeGraphQL + Prisma + GraphQL Yoga
- **Frontend**: Preact + Vite + TailwindCSS + URQL
- **Database**: SQLite with Prisma ORM

---

## 🗄️ Database Schema

**Core Entities:**
- `Movie` - Film information with ratings
- `Figure` - Actors/Directors with roles
- `User` - Platform users
- `UserReview` - Movie reviews and ratings
- `CloudImage` - Optimized image storage

**Key Features:**
- Many-to-many relationships (movies ↔ figures)
- User review constraints (one per movie)
- Image management with aspect ratios

---

## 🔧 Backend Architecture

**GraphQL API with TypeGraphQL:**
```typescript
// Type-safe GraphQL schema generation
@ObjectType()
export class Movie {
  @Field(() => ID)
  publicId!: string;
  
  @Field(() => String)
  name!: string;
  
  @Field(() => Decimal)
  avgScore!: Prisma.Decimal;
}
```

**Organized by domain:**
- Auth, Movie, Figure, User, UserReview modules
- Dedicated resolvers, inputs, and args

---

## 🎨 Frontend Features

**Modern Preact Application:**
- **Component-based** architecture
- **Responsive design** with TailwindCSS
- **Real-time subscriptions** for live updates
- **Type-safe GraphQL** with code generation

**Key Components:**
- Movie listings with posters
- Detailed movie pages
- User review system
- Real-time notifications

---

## 🔐 Authentication & Security

**JWT-based Authentication:**
- Secure sign-in/sign-out flow
- Protected GraphQL operations
- User session management
- Role-based access control

**Features:**
- `@Authorized()` decorators for protected resolvers
- Cookie-based token storage
- Context-aware user identification

---

## 📊 Real-time Features

**GraphQL Subscriptions:**
- Live user review notifications
- Typing indicators
- Real-time UI updates

```typescript
@Subscription(() => UserReviewNotification)
async newReviewNotification() {
  return pubSub.asyncIterator('NEW_REVIEW');
}
```

---

## 🛠️ Development Experience

**Developer-Friendly Setup:**
- **Hot reload** in development
- **ESLint + Prettier** for code quality
- **Type checking** across the stack
- **Prisma Studio** for database management

**Commands:**
```bash
pnpm api dev      # Start GraphQL server
pnpm webapp dev   # Start frontend
pnpm api prisma studio  # Database GUI
```

---

## 🚀 Production Ready

**Deployment Features:**
- **Docker** containerization
- **Fly.io** deployment configuration
- **Build optimization** with Vite
- **Database migrations** with Prisma

**Performance:**
- Code splitting
- Image optimization
- Efficient GraphQL queries
- SQLite for simplicity

---

## 🎉 Key Highlights

✅ **Type Safety** - End-to-end TypeScript
✅ **Modern Stack** - Latest GraphQL ecosystem
✅ **Real-time** - Live updates and subscriptions  
✅ **Scalable** - Clean architecture and patterns
✅ **Developer Experience** - Hot reload, linting, tooling
✅ **Production Ready** - Docker, migrations, optimization

---

## 📈 Technical Achievements

**Impressive Feature Set:**
- Full CRUD operations for movies and reviews
- Image management with CloudImage integration
- Complex many-to-many relationships
- Real-time user interactions
- Responsive design across devices
- Type-safe API consumption

**Modern Patterns:**
- Domain-driven architecture
- Dependency injection
- Code generation
- Workspace management

---

## Thank You! 🎬

**Questions & Discussion**

This project demonstrates professional-grade fullstack TypeScript development with GraphQL at its core.

*Perfect for learning modern web development patterns and building production-ready applications.*