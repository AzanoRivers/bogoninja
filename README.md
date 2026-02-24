# Bogotá · Ninja

![Astro](https://img.shields.io/badge/Astro-5.17-BC52EE?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-Serverless_Postgres-00E699?logo=postgresql&logoColor=white)

Oficial site for bogota.ninja. Urban Ninja Coaching. - 2026

## Tech Stack

- Astro 5
- React 19
- Tailwind CSS v4
- Neon PostgreSQL
- Fontsource (Joti One, Lato)
- Resend (transactional email)
- jose (secure session tokens)

## Commands

```bash
pnpm install  # Install dependencies
pnpm dev      # Start dev server (localhost:4321)
pnpm build    # Build for production
pnpm db:seed  # Create database tables
```

## Environment Variables

```env
DATABASE_URL=       # Neon PostgreSQL connection string
RESEND_API_KEY=     # Resend API key
RESEND_SENDER=      # Verified sender address
RESEND_COPY=        # Internal notification address
JWT_SECRET=         # Random secret string for session signing (min. 32 chars)
```

## Database

- **config.ts** — Connection to Neon PostgreSQL
- **seed.ts** — Creates `ninja_registrations` table (run once on first setup)
- **alter/** — Incremental migration scripts (`YYYY-MM-DD_description.sql`)

## Admin Panel

Private area — not indexed by search engines.

| Route | Description |
|---|---|
| `/login` | Access to the admin panel |
| `/dashboard` | Ninja list and mass session email dispatch |

Sessions expire automatically after **15 minutes** of inactivity.  
Admin credentials are stored in the `ninja_admin` table (see `alter/` for setup).

> These routes are excluded from sitemaps and blocked via `noindex, nofollow` meta tags.

## Author

Created by **AzanoRivers** — [azanorivers.com](https://azanorivers.com)

## License

Private use only. Copyright © 2026 AzanoRivers / bogota.ninja. All rights reserved.

