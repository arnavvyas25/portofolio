# Arnav Vyas Portfolio

A modern, production-ready portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡ **Next.js 14** with App Router
- 📝 **TypeScript** with strict mode
- 🎨 **Tailwind CSS** for styling
- 🎭 **Framer Motion** for animations
- 📱 **Fully responsive** design
- 🔍 **SEO optimized** with metadata API
- 📰 **MDX blog** with dynamic routing
- 🧩 **Component-based** architecture
- 🚀 **Vercel-ready** deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/arnavvyas/portfolio.git

# Navigate to the project
cd portfolio-next

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
portfolio-next/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── projects/           # Projects page
│   ├── research/           # Research page
│   ├── blog/               # Blog pages
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/         # Dynamic blog posts
│   ├── contact/            # Contact page
│   └── api/                # API routes
├── components/             # Reusable React components
├── lib/                    # Utilities and data
│   ├── data.ts             # Site data
│   ├── types.ts            # TypeScript types
│   ├── utils.ts            # Utility functions
│   └── blog.ts             # Blog utilities
├── content/                # Content files
│   └── blog/               # MDX blog posts
├── styles/                 # Global styles
│   └── globals.css         # Tailwind configuration
└── public/                 # Static assets
```

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## Adding Content

### Blog Posts

Create new blog posts by adding MDX files to `content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Brief description"
date: "2024-01-01"
author: "Arnav Vyas"
tags: ["Tag1", "Tag2"]
published: true
---

# Your content here

Write your blog post in Markdown with MDX support.
```

### Projects

Edit `lib/data.ts` to add or modify projects:

```typescript
{
  id: 'project-id',
  title: 'Project Title',
  description: 'Description',
  techStack: ['Tech1', 'Tech2'],
  category: 'machine-learning',
  githubUrl: 'https://github.com/...',
  featured: true,
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically

### Manual Deployment

```bash
# Build the project
npm run build

# The output is in the .next folder
# Deploy to your preferred hosting platform
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    // Your custom primary color palette
  },
}
```

### Content

Update the data in `lib/data.ts`:
- Site metadata
- Projects
- Experience
- Skills
- Publications

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Content**: MDX
- **Deployment**: Vercel

## License

MIT License - feel free to use this template for your own portfolio!

## Author

**Arnav Vyas**
- Website: [arnavvyas.com](https://www.arnavvyas.com)
- GitHub: [@arnavvyas](https://github.com/arnavvyas)
- LinkedIn: [arnavvyas](https://linkedin.com/in/arnavvyas)
