const Listing = require("../models/listing");
const Review = require("../models/review");

//review create
module.exports.createReview = async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

//review delete
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  // Remove the review from Listing references
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete document from separate reviews collection
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
