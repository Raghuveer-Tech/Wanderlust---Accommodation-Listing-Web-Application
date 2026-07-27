# Wanderlust - Accommodation Listing Web Application

A full-stack accommodation listing app built with Node.js, Express, MongoDB, Passport authentication, Cloudinary image upload, and Mapbox geocoding.

## 🚀 Live Demo

Live link: `https://your-live-app-url.example.com`

> Replace the placeholder above with your deployed app URL.

## ✨ Features

- User signup, login, and logout with Passport Local
- Create, edit, and delete accommodation listings
- Image upload using Cloudinary
- Mapbox location search and geocoding for listings
- Reviews per listing with author permissions
- Flash notifications for success and error states
- Session management using MongoDB store

## 🧭 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Passport.js + passport-local-mongoose
- EJS templates with ejs-mate layout engine
- Cloudinary image storage
- Mapbox geocoding
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

3. Create a `.env` file with the following variables:

```env
ATLASTDB_URL=mongodb://127.0.0.1:27017/wanderlust
SECRET=your-session-secret
MAP_TOKEN=your-mapbox-token
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

4. Seed the database with a sample user and listings

```bash
npm run seed
```

5. Run the app

```bash
npm run dev
```

6. Open your browser at `http://localhost:8080`

7. Login with the seeded account

- Email: `seed@wanderlust.app`
- Username: `seedhost`
- Password: `SeedPassword123!`

## 🗂️ Available Scripts

- `npm run dev` - start the server with nodemon
- `npm start` - run the server with Node
- `npm run seed` - seed sample data
- `npm run clear` - clear seeded data

## 🖼️ App Screenshots

| Screenshot 1 | Screenshot 2 |
| --- | --- |
| ![App Screenshot 1](path/to/screenshot1.png) | ![App Screenshot 2](path/to/screenshot2.png) |
| Screenshot 3 | Screenshot 4 |
| ![App Screenshot 3](path/to/screenshot3.png) | ![App Screenshot 4](path/to/screenshot4.png) |

> Replace the placeholder image paths with your actual screenshot file paths.

## 📁 Project Structure

- `app.js` — main Express app configuration
- `controllers/` — request handlers for listings, reviews, and users
- `routes/` — route definitions for listings, reviews, and auth
- `models/` — Mongoose schemas for listings, reviews, and users
- `views/` — EJS templates for pages and layouts
- `public/` — static CSS and client JS assets
- `cloudConfig.js` — Cloudinary storage configuration
- `middleware.js` — validation and authorization middleware
- `schema.js` — Joi validation schemas
- `init/data.js` — sample listing seed data

## ✅ Notes

- Ensure MongoDB is running locally or provide a valid remote Atlas URL.
- Update the `Live Demo` link after deployment.
- Add app screenshots to `public/images/` or your preferred folder and update the table paths.

## 📌 License

ISC
