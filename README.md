# ShreeRam Milks website

The public web pages for ShreeRam Milks. It is a separate Next.js project, not part of the phone app or the admin.

| Page | What it is |
|---|---|
| `/` | Short welcome, with links to the pages below |
| `/account-deletion` | Lets a customer erase their account without opening the app (an app-store requirement) |

The privacy policy and terms are served by the backend (`/legal/privacy`, `/legal/terms`); the home page links to them.

## Run it

From the main folder, `.\start-servers.ps1` starts it with the other servers on http://localhost:3001.
On its own: `npm install`, then `npm run dev -- --port 3001`.

Checks: `npm run typecheck`, `npm run lint`, `npm run build`.

## Settings

`NEXT_PUBLIC_API_URL` (in `.env.local`, see `.env.example`) is the backend address. The backend must list this site's address
in its `CORS_ORIGINS` (already done for `http://localhost:3001`; add the real website address when it is deployed).

## How account deletion stays safe

The page uses the same phone code as the app. The customer enters their number, receives a 6-digit code, and only then can
confirm. The temporary sign-in token stays in the page's memory for that minute and is never stored in the browser.
