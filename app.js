const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const path = require('path');

// Path to views folder
const views_path = path.join(__dirname, "../templates");
const body_parser = require("body-parser");

// Middleware setup
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

// Database and Model imports
const mongoose = require("mongoose");
require("/Users/sanskrititandon/WebstormProjects/Node js/src/db/con.js");

//Import the model directly
const register = require("/Users/sanskrititandon/WebstormProjects/Node js/src/model/app.js");

// View engine setup
app.set("view engine", "hbs");
app.set("views", views_path);

// Routes

// Home Route
app.get("/index", (req, res) => {
    res.render("index");
});

// Form Submission Route
app.post("/send", async (req, res) => {
    try {
        const { name, reg, programme } = req.body;
        const save_data = new register({ name, reg, programme });
        await save_data.save();
        console.log("Data Saved to DB!");
        res.send("Data sent to backend!");
    } catch (e) {
        console.error(`Error: ${e}`);
        res.status(500).send("Internal Server Error");
    }
});

// Display All Data
app.get("/display", async (req, res) => {
    try {
        const data = await register.find();
        console.log(data);
        res.render("display", { data });
    } catch (e) {
        console.error(`Error fetching data: ${e}`);
        res.status(500).send("Internal Server Error");
    }
});

// Update/Delete Entry
app.post("/update", async (req, res) => {
    try {
        const { name, id, btn } = req.body;
        let status;

        if (btn === "UPDATE") {
            await register.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { $set: { name } });
            status = 1;
        } else if (btn === "DELETE") {
            await register.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
            status = 2;
        }

        const data = await register.find();
        res.render("display", { data, status });
    } catch (e) {
        console.error(`Error in update/delete: ${e}`);
        res.status(500).send("Internal Server Error");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Running on Port: ${port}`);
});
