## T3 E-Commerce Signup and Login Flow

This project implements a simple signup and login flow for an e-commerce website using a modern tech stack. Users can register, login, and mark their interested categories, which are persisted in a database.

### Technologies Used

- **Framework**: [Create.t3.gg](https://create.t3.gg/)
  - Next.js for React components
  - tRPC for APIs
  - Prisma for ORM
  - Tailwind CSS for styling
- **Database**: MySQL or Postgres (recommended: [Neon.tech](https://neon.tech/))
- **VCS**: GitHub
- **App Hosting**: Vercel (recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bhanukushwah/turnover-task.git
   cd turnover-task
   ```

2. Install dependencies using pnpm:

```
pnpm install
```

3. Set up environment variables by creating a .env file in the root directory and configuring the following variables:

```
DATABASE_URL=""
EMAIL=""
PASSWORD=""
JWT_SECRET=""
```

4. Start the development server

```
pnpm dev
```

5. Build and run the application in production mode

```
pnpm build
pnpm start
```
