import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserModel } from './db';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route 1: user signup
app.post("/api/v1/signup", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username: username,
            password: password
        });
        res.json({ message: "User signed up." });

    } catch (e) {
        res.status(409).json({ message: "User already exists" });
    }

});

//Route 2: user signin
app.post("/api/v1/signin", (req, res) => {

});

//Route 3: Add content
app.post("/api/v1/content", (req, res) => {

});

// Route 4: Get User Content
app.get("/api/v1/content", (req, res) => {

});


// Route 5: Delete User Content
app.delete("/api/v1/content", (req, res) => {

});

// Route 6: Share Content Link
app.post("/api/v1/brain/share", (req, res) => {

});

// Route 7: Get Shared Content
app.get("/api/v1/brain/:shareLink", (req, res) => {

});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
