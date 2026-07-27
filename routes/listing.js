const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require('../models/listing');
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingsController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingsController.index))
    .post(
        isLoggedIn, 
        validateListing,
        upload.single("listing[image]"),
        wrapAsync(listingsController.createListing)
    );

// New form render for listing add
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingsController.showListing))
    .put(
        isLoggedIn,
        isOwner, 
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingsController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingsController.destroyListing)
    );

// Edit route 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm));

module.exports = router;