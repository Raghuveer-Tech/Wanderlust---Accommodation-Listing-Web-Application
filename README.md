# Wanderlust - Accommodation Listing Web Application

A full-stack accommodation booking app built with Node.js, Express, MongoDB, Passport authentication, Cloudinary image upload, and Mapbox geocoding.

## 🚀 Live Demo

Live link: `https://your-live-app-url.example.com`

> Replace this placeholder with your actual deployment URL.

## ✨ Features

- User signup, login, and logout with Passport Local
- Create, update, and delete accommodation listings
- Cloudinary-based image upload for listings
- Mapbox geocoding and location search
- Reviews per listing with author-only delete access
- Flash alerts for success and error messages
- Session management using MongoDB-backed store
- Seeded demo account and sample listings

## 🧭 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Passport.js + passport-local-mongoose
- EJS templates with ejs-mate
- Cloudinary
- Mapbox
- Multer file upload
- connect-flash, express-session, connect-mongo

## ⚙️ Installation

1. Clone the repository

```bash
git clone <repo-url>
cd "Wanderlust - Accommodation Listing Web Application"
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file with these variables:

```env
ATLASTDB_URL=mongodb://127.0.0.1:27017/wanderlust
SECRET=your-session-secret
MAP_TOKEN=your-mapbox-token
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

4. Seed the database with the demo user and listings

```bash
npm run seed
```

5. Start the app in development mode

```bash
npm run dev
```

6. Open `http://localhost:8080` in your browser

## 🔐 Demo Credentials

- Email: `seed@wanderlust.app`
- Username: `seedhost`
- Password: `SeedPassword123!`

## 🗂️ Scripts

- `npm run dev` — start the server with nodemon
- `npm start` — start the server with Node
- `npm run seed` — seed sample data
- `npm run clear` — clear seeded listings

## 📁 Project Structure

- `app.js` — main Express application file
- `controllers/` — route handlers for listings, reviews, and auth
- `routes/` — application routes
- `models/` — Mongoose schemas
- `views/` — EJS templates and layouts
- `public/` — CSS and client-side JS
- `cloudConfig.js` — Cloudinary storage config
- `middleware.js` — auth and validation middleware
- `schema.js` — Joi validation schemas
- `init/` — seed data and initialization script

## ✅ Notes

- Make sure MongoDB is running locally or provide a valid remote Atlas URL.
- Update the `Live Demo` URL after deployment.
- Add screenshot files to `public/images/` and update the README paths.

## 📌 License

ISC
