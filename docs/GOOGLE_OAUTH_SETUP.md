# Google OAuth Setup Guide

## What's Needed to Implement Google OAuth

### 1. **Google Cloud Console Setup** (YOU need to provide)

You need to:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
    - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
    - Application type: "Web application"
    - Authorized JavaScript origins: `http://localhost:5173` (for dev)
    - Authorized redirect URIs: `http://localhost:5173/auth/callback` (for dev)
5. **Copy the Client ID** and **Client Secret**

### 2. **Environment Variables** (YOU need to add)

Add to `.env`:

```env
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

Add to `server/.env`:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

### 3. **Frontend Changes** (I can do)

Install Google OAuth library:

```bash
cd client && npm install @react-oauth/google
```

Update Signin.tsx to use Google OAuth provider and button.

### 4. **Backend Changes** (I can do)

Add Google OAuth routes to your server:

-   `/auth/google` - initiates OAuth flow
-   `/auth/google/callback` - handles OAuth callback
-   Verify Google token and create/update user in database

### 5. **Database Schema Changes** (I can do)

Update User model to support OAuth users:

-   Add `googleId` field (optional)
-   Make password nullable for OAuth users

## What I Need From You

**To implement Google OAuth, please provide:**

1. **Google Client ID**: From Google Cloud Console
2. **Google Client Secret**: From Google Cloud Console
3. **Confirmation**: Do you want Google users to:
    - Create a new account automatically if they don't exist?
    - Or only sign in if they already have an account?

Once you provide the credentials, I can implement the full OAuth flow!

## Current Status

✅ Frontend is ready with Google button
⚠️ Waiting for your Google OAuth credentials
⏳ Will implement full OAuth flow once credentials are provided

