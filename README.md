# SSC Quiz Prep

Offline-first SSC exam prep app (React + Vite + Capacitor) with a self-hosted
login/cloud-sync backend. Every user signs in by email; addresses are verified
with a one-time passcode (OTP).

## Run the app

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm run dev          # web dev
npm run build        # production web build
npm run android:apk  # build APK (needs JAVA_HOME + ANDROID_HOME)
```

## Login / cloud sync (self-hosted, free)

There is no third-party account needed — a tiny backend ships with the app:

```bash
node server/index.mjs          # starts on http://localhost:4000
```

Endpoints: `POST /api/auth/register`, `POST /api/auth/verify-otp`,
`POST /api/auth/resend-otp`, `POST /api/auth/login`,
`GET/PUT /api/progress`, `GET /api/me`. Passwords are hashed with scrypt, auth
uses JWT (30-day session), and progress saves to `server/data/` (JSON files).

### Email OTP

The signup code is emailed via SMTP. Set these env vars to enable real email:

| Var            | Example                              |
| -------------- | ------------------------------------ |
| `SMTP_HOST`    | `smtp.gmail.com`                     |
| `SMTP_PORT`    | `465`                                |
| `SMTP_USER`    | `your@gmail.com`                     |
| `SMTP_PASS`    | Gmail **App Password** (not login pw)|
| `MAIL_FROM`    | `SSC Quiz Prep <your@gmail.com>`     |

Without SMTP, set `DEV_OTP_MODE=true` and the server shows the code in the API
response (the app displays it on the OTP screen) so signup still works while
you test. This fallback is off by default in production.

### Point the app at your server

Edit `src/lib/api.js` → `API_BASE`:

| Where you run it       | API_BASE                    |
| ---------------------- | --------------------------- |
| Web (same PC)          | `http://localhost:4000`     |
| Android emulator       | `http://10.0.2.2:4000`      |
| Real phone, same Wi-Fi | `http://<your-PC-IP>:4000`  |
| Free cloud (Render/Railway) | `https://<your-app>.onrender.com` |

Then rebuild the APK.

### Free hosting (cloud)

1. Push this folder to a GitHub repo.
2. **Render.com** (free) → New Web Service → pick the repo → Build:`npm install`,
   Start: `node server/index.mjs`.
3. Or **Railway.app** (free tier) → Deploy from repo, start command `node server/index.mjs`.
4. Change `API_BASE` to the HTTPS URL Render/Railway gives you, rebuild APK.

## Different login backend?

Firebase Auth / Supabase are drop-in swaps: keep the same
`src/lib/auth.js` / `src/lib/api.js` interface and point them at the new API.