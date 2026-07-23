# PocketBase + Vue 3 Application

This project is a modern web application built with **Vue 3**, **Vite**, and **PocketBase**. It features user authentication, a dashboard to view personal posts, and a real-time feed powered by PocketBase's real-time subscriptions.

## Features
- **User Authentication:** Sign up, log in, and manage user sessions securely using PocketBase.
- **Real-Time Data:** View updates to the post feed instantly as they occur, using PocketBase real-time connections.
- **State Management:** Powered by Pinia.
- **Styling:** Styled with Tailwind CSS for a modern, responsive design.

## Prerequisites

You'll need a running instance of **PocketBase** for this application to connect to. By default, the application expects the PocketBase backend to be running on `http://localhost:8090`.

### Backend Setup (PocketBase)
1. Install [PocketBase](https://pocketbase.io/).
2. Run your local PocketBase server:
   ```bash
   pocketbase serve
   ```
3. (Optional) Create an admin account if you haven't already:
   ```bash
   pocketbase superuser create your_email@example.com your_secure_password
   ```
4. Open the Admin UI (default: `http://localhost:8090/_/`).
5. Ensure you have the following collections created:
   - `users` (default Auth collection)
   - `posts` (Collection) with the following fields:
     - `title` (Plain text)
     - `content` (Plain text or Editor)
     - `user` (Relation to `users`)
     - `userdata` (Relation to your user profile/data collection if applicable)
6. **IMPORTANT:** Update the **API Rules** (click the lock icon 🔒 on the collection) so the frontend can interact with them:
   - `users`: Set the **Create** rule to blank (so anyone can register).
   - `posts`: Set the **Create** rule to `@request.auth.id != ""` (so only logged-in users can post), and unlock **List/Search** or **View** as needed.

## Project Setup

Install the dependencies:

```sh
npm install
```

### Compile and Hot-Reload for Development

Start the Vite development server:

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with ESLint

```sh
npm run lint
```
