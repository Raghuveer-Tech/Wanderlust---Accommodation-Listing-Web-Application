const mongoose = require("mongoose");
const Review = require("./review");

// Define Schema
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

// Mongoose Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async function (doc){
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

// Create Model
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;