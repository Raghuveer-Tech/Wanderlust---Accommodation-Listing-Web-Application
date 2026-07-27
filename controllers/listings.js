const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const { data: sampleListings } = require("../init/data");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//index route
module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    if (allListings && allListings.length > 0) {
      return res.render("./listings/index.ejs", { allListings });
    }
  } catch (err) {
    console.log("Falling back to sample listings:", err.message);
  }

  const fallbackListings = sampleListings.map((sample, index) => ({
    ...sample,
    _id: `fallback-${index}`,
    geometry: sample.geometry || { type: "Point", coordinates: [0, 0] },
  }));

  res.render("./listings/index.ejs", { allListings: fallbackListings });
};

//new form render
module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

//show listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

//create listing
module.exports.createListing = async (req, res, next) => {
  if (!req.file) {
    req.flash("error", "Image upload required.");
    return res.redirect("/listings/new");
  }

  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  if (!response.body.features || response.body.features.length === 0) {
    throw new ExpressError(400, "Unable to locate that address.");
  }

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

//edit form render
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalUrl = listing.image?.url
    ? listing.image.url.replace("/upload", "/upload/w_250")
    : "";
  res.render("./listings/edit.ejs", { listing, originalUrl });
};

//update listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  // Update coordinates if location string changed
  if (req.body.listing.location) {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

    if (response.body.features && response.body.features.length > 0) {
      listing.geometry = response.body.features[0].geometry;
    }
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save();

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

//delete route
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
