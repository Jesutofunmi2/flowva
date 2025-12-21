# FlowvaHub — Local setup & Supabase Auth

This document covers local setup, Supabase configuration (Auth / SMTP / OAuth), common troubleshooting, and assumptions/trade‑offs for the project.

## Local setup

1. Install dependencies
   ```bash
   npm install
    ```

2. Create environment file

Create a .env (or .env.local) at project root containing client-safe keys (Vite exposes import.meta.env only for VITE_ keys):

```
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
```


3. Start development server

```bash
npm run dev
```

4. Build & preview production version

```bash
npm run build
npm run preview
```

5. If Vite behaves oddly after config/env changes:

```bash
rm -rf .vite
npm run dev
```

## Supabase setup (Auth / SMTP / OAuth)

1. Project + API keys

- Create a Supabase project and copy Project URL and ANON key into .env as VITE_SUPABASE_URL and  VITE_SUPABASE_ANON_KEY.

2. Redirect URLs (critical)

- In Supabase Dashboard → Authentication → Settings → Redirect URLs add:
    https://<your-project>.supabase.co/auth/v1/callback
    http://localhost:5174/auth/callback (or your dev origin)
    http://localhost:5174/reset-password/callback (if using password reset flow)
- The emailRedirectTo / redirectTo values used in code must match allowed redirect URLs exactly.

3. Magic link / password reset

- Code uses:
   - supabase.auth.signInWithOtp({ email, options: { emailRedirectTo } }) (magic link)
   - supabase.auth.resetPasswordForEmail({ email, options: { emailRedirectTo } }) (reset)
   - supabase.auth.signUp({ email, password, options }) for password signup
   - supabase.auth.signInWithPassword({ email, password }) for password login
- Ensure SMTP is configured (see next).

4. SMTP (email deliverability)

- Recommended transactional providers: SendGrid, Mailgun, Postmark, Amazon SES.
- In Supabase Dashboard → Authentication → Settings → Email (SMTP):
   - Host, port (587), username, password (use API key or app password).
   - From email (verify sender/domain in provider).
   - Configure SPF / DKIM for the sending domain to improve deliverability.
   - For local/dev testing use Mailtrap or provider sandbox mode.

5. Google OAuth (if used)

- Create OAuth credentials in Google Cloud Console.
- In Google OAuth setup, set redirect URI to:
- https://<your-project>.supabase.co/auth/v1/callback
- In Supabase Dashboard → Authentication → Providers → Google: paste Client ID & Secret.
- Ensure your app origin (e.g. http://localhost:5174) is allowed in Supabase redirect settings.

## Post-auth session handling

- The app calls supabase.auth.getSession() on load and subscribes to supabase.auth.onAuthStateChange (see src/main.jsx) to persist the refresh token into localStorage for the app guard logic.
- After OAuth / magic link redirects, use supabase.auth.getSessionFromUrl() (or getSession) on the callback page to complete session setup.

## Common troubleshooting

- Ensure .env variables are correctly set and accessible in the app
- Check browser console & network tabs for Supabase-related errors
- Verify Supabase project settings (Auth, SMTP, OAuth) match app configuration  

## Assumptions & trade-offs

- Uses Supabase JS v2 API (method names like signInWithPassword, signInWithOtp, resetPasswordForEmail, signInWithOAuth).
- Refresh token is persisted to localStorage for a simple app-guard (useAppGuard). Trade-off: localStorage has XSS risk — for production prefer httpOnly secure cookies or server-side sessions.
- SMTP credentials are stored in Supabase (encrypted). Use a transactional provider for production email deliverability.
- App supports both magic-link and password-based authentication. If you prefer simpler UX, choose one flow.
- OAuth client secret is configured in Supabase dashboard — not present in client code.
- No backend required for basic auth since Supabase handles auth flows. For custom OTP/email logic consider an Edge Function or server.
- Focus on core auth flows; advanced features (MFA, social logins) are optional
- Client-side only; no server-side rendering or backend integration
- Supabase free tier assumed for development; production may require paid plan  
- Basic error handling; detailed UX improvements left for future iterations 
- Minimal styling; UI/UX enhancements can be added later   
- Vite chosen for simplicity; other bundlers/frameworks can be used as needed


## Where to look in the repo

- Supabase client: src/hooks/supabaseClient.js
- Auth logic:
  - Signup / Login: src/pages/authPages/Signup/SignupLogic.js, src/pages/authPages/Login/LoginLogic.js
  - Magic-link / reset: src/pages/authPages/ForgetPassword/ForgetPasswordLogic.js, src/pages/authPages/ResetPasswordCallback/
- Auth state / guard:
  - src/hooks/useAuthUser.js
  - src/components/common/AppGuard/useAppGuard.js
- Router entry: src/routes/Routes.jsx
- Main entry that subscribes auth: src/main.jsx
