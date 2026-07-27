if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override'); 
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const Listing = require("./models/listing");
const initData = require("./init/data");

const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

//if want local database and local db url
const dbUrl = process.env.ATLASTDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
const secret = process.env.SECRET || "wanderlust-secret";
const port = process.env.PORT || 8080;

main()
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch(err => {
        console.log("DB connection failed. Using sample listings fallback.");
        console.log(err.message);
    });

async function main() {
  await mongoose.connect(dbUrl);
  const count = await Listing.countDocuments();
  if (count === 0) {
      const seededData = initData.data.map((obj) => ({
          ...obj,
          owner: "688a00ebb4f55d4eb72a5c48",
          geometry: {
              type: "Point",
              coordinates: [0, 0],
          },
      }));
      await Listing.insertMany(seededData);
      console.log("Sample listings seeded");
  }
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl  : dbUrl,
    crypto: {
        secret,
    },
    touchAfter : 24 * 60 * 60,
})

store.on("error", (err) => {
    console.log("Error in MONGO SESSION STORE", err);
})

const sessionOptions = {
    store,
    secret,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Tells passport how to store user in session
passport.serializeUser(User.serializeUser());
// Tells passport how to get user from session
passport.deserializeUser(User.deserializeUser());

app.use ((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter)

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("./listings/error.ejs", { err, statusCode, message });
});

app.listen(port, () => {
    console.log(`Server now start..port ${port}`);
});