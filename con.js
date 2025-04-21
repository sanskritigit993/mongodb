const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/register", {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("✅ Connected to MongoDB!");
    })
    .catch((e) => {
        console.error("❌ MongoDB connection error:", e);
    });
