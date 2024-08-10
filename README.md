![alt text](https://github.com/vaishakh-v/vegapunk/blob/Fullstack/public/Logo.png?raw=true)

<p style="text-align: center;font-size:40px;">Care2Gather</p>

<p style="text-align: center;" >A place where you can meet with those who may understand you better<p>

## Tech Stack

**Client:** Next.js, shadcn, auth.js, tailwind

**Server:** hono.js

# Steps to run the project

This guide will walk you through the steps to set up and run a Next.js project. We'll also cover the necessary environment variables needed for the project.

## Prerequisites

Before you start, make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (v12.x or later)
-   [npm](https://www.npmjs.com/), [Yarn](https://yarnpkg.com/), or [Bun](https://bun.sh/)

## Steps to Run the Project

### 1. Clone the Repository

First, clone the repository from your version control system (e.g., GitHub):

```bash
git clone https://github.com/vaishakh-v/vegapunk.git
```

### 2. Navigate to the Project Directory

Change into the project directory:

```bash
cd your-repo
```

### 3. Install Dependencies

Install the project dependencies using npm, Yarn, or Bun:

```bash
# Using npm
npm install

# Using Yarn
yarn install

# Using Bun
bun install
```

if you encounter any error while installing, try using

-   --force
-   --legacy-peer-deps

### 4. Set Up Environment Variables

Create a .env.local file in the root of your project and add the following environment variables:

```bash
APP_URL=http://localhost:3000
DATABASE_URL=your-database-url
AUTH_SECRET=your-auth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 5. Run the Development Server

Start the development server:

```bash
# Using npm
npm run dev

# Using Yarn
yarn dev

# Using Bun
bun dev
```

Your Next.js application should now be running on http://localhost:3000.
