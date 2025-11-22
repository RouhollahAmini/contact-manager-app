# Deployment Guide

This document explains how to deploy the Contact Manager App to various hosting platforms.

## Environment Variables

Before deploying, make sure to set the following environment variables in your hosting platform:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign up/sign in
3. Click "New Project"
4. Import your GitHub repository
5. In the configuration:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add the environment variables in the "Environment Variables" section
7. Click "Deploy"

## Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com/) and sign up/sign in
3. Click "New site from Git"
4. Connect to your GitHub account and select your repository
5. In the deploy settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add the environment variables in the "Environment Variables" section
7. Click "Deploy site"

## Deploy to GitHub Pages

1. Install the gh-pages package:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Update your [vite.config.js](file:///c:/laragon/www/contact-manager-app/vite.config.js):
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/' // Add this line with your repo name
   })
   ```

3. Add deployment scripts to [package.json](file:///c:/laragon/www/contact-manager-app/package.json):
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "lint": "eslint .",
       "preview": "vite preview",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Security Notes

The Firebase configuration values are not sensitive as they are required for the client-side SDK to connect to Firebase. 
The actual security is handled by Firebase Security Rules in the Firestore dashboard.

Make sure to set up proper Firestore rules in the Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document} {
      allow read, write: if request.auth != null;
    }
    
    match /groups/{document} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

For a fully public app without authentication, you can use:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document} {
      allow read, write: if true;
    }
    
    match /groups/{document} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```