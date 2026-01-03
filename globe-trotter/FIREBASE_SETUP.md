# Firebase Setup Guide - GlobeTrotter

## Quick Setup (5 minutes)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Enter project name: `globe-trotter` (or your preferred name)
4. Disable Google Analytics (optional, can enable later)
5. Click "Create Project"

### Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get Started"
3. Click on "Google" under Sign-in providers
4. Toggle "Enable"
5. Select a support email (your email)
6. Click "Save"

### Step 3: Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create Database"
3. Select "Start in test mode" (we'll add security rules later)
4. Choose your preferred location (e.g., us-central)
5. Click "Enable"

### Step 4: Get Your Firebase Config

1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project Settings"
3. Scroll down to "Your apps"
4. Click the web icon `</>`
5. Register your app with nickname: "GlobeTrotter Web"
6. Copy the `firebaseConfig` object

### Step 5: Update .env.local

Replace the contents of `.env.local` with your actual values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 6: Add Security Rules

In Firestore Database, click "Rules" tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Trips collection
    match /trips/{tripId} {
      allow read: if request.auth != null && 
                     (resource.data.isPublic == true || 
                      request.auth.uid in resource.data.collaborators);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                               request.auth.uid in resource.data.collaborators;
    }
  }
}
```

Click "Publish"

### Step 7: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 8: Test Authentication

1. Go to http://localhost:3001
2. Click "Start Planning"
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected to the dashboard!

---

## Troubleshooting

### "API key not valid" error
- Double-check your API key in `.env.local`
- Make sure there are no extra spaces
- Restart the dev server after changing `.env.local`

### "Unauthorized domain" error
- In Firebase Console → Authentication → Settings
- Add `localhost` to Authorized domains

### Google Sign-In popup blocked
- Allow popups for localhost in your browser
- Or use redirect mode (see advanced configuration)

---

## Advanced Configuration

### Use Redirect Instead of Popup

In `src/context/AuthContext.tsx`, replace `signInWithPopup` with `signInWithRedirect`:

```typescript
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';

// In signInWithGoogle function:
await signInWithRedirect(auth, provider);

// In useEffect, add:
getRedirectResult(auth).then((result) => {
  if (result) {
    // User signed in
  }
});
```

### Add Email/Password Authentication

1. In Firebase Console → Authentication → Sign-in method
2. Enable "Email/Password"
3. Add functions in AuthContext:

```typescript
const signUpWithEmail = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

const signInWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};
```

---

## Production Deployment

### Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Add Production Domain to Firebase

1. Firebase Console → Authentication → Settings
2. Add your production domain to Authorized domains
3. Update CORS settings if needed

---

## Security Checklist

- ✅ Enable App Check (recommended for production)
- ✅ Update Firestore security rules from test mode
- ✅ Enable reCAPTCHA for auth
- ✅ Set up billing alerts
- ✅ Review authentication logs regularly

---

**Need Help?** Check the [Firebase Documentation](https://firebase.google.com/docs/auth)
