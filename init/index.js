require('dotenv').config();

const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");
const MONGO_URL = process.env.ATLASTDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
const action = process.argv[2];

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 15000 });
  console.log("✅ DB connected successfully");
}

const initDB = async () => {
    await Listing.deleteMany({});
    const seededData = initData.data.map((obj) => ({
        ...obj,
        owner: "688a00ebb4f55d4eb72a5c48",
        geometry: {
            type: "Point",
            coordinates: [0, 0],
        },
    }));
    await Listing.insertMany(seededData);
    console.log("Data was initialized");
};

const clearDB = async () => {
    await Listing.deleteMany({});
    console.log("All listings were deleted");
};

const run = async () => {
    try {
        await main();
        if (action === "clear") {
            await clearDB();
        } else {
            await initDB();
        }
    } catch (err) {
        console.error("Seed failed:", err);
    } finally {
        await mongoose.disconnect();
    }
};

run();