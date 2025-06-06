import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ContentModel, LinkModel, UserModel } from './db';
import cors from 'cors';
import { JWT_SECRET } from './config';
import { userMiddleware } from './middleware';
import { random } from './util';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// Route 1: user signup
app.post("/api/v1/signup", async (req, res) => {
    // TOdO: Use zod or a similar library for input validation.
    // TOdO: Hash the password before storing it in the database.
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Create a new user with the provided username and password.
        await UserModel.create({
            username: username,
            password: password
        });
        res.json({ message: "User signed up." });
    }
    // Handle errors like duplicate usernames.
    catch (e) {
        res.status(409).json({ message: "User already exists" });
    }

});

//Route 2: user signin
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Find a user with the provided credentials.
    const existingUser = await UserModel.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        // Generate a JWT token with the user's ID.
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_SECRET);
        res.json({
            token      // send the generated token in response
        });
    } else {
        // Send error response for invalid credentials.
        res.status(403).json({
            message: "Incorrect credential"
        });
    }
});

//Route 3: Add content
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;

    // Create a new content entry linked to the logged-in user.
    await ContentModel.create({
        link: link,
        type: type,
        //@ts-ignore
        userID: req.userID,   // userId is added by the middleware.
        tags: []
    })

    res.json({
        message: "Content Added"
    });
});

// Route 4: Get User Content
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userID = req.userID;
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result, 
    // and other details like password won’t be fetched.

    const content = await ContentModel.find({
        userID: userID
    }).populate("userID", "username");

    res.json({
        content
    })
});


// Route 5: Delete User Content
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentID = req.body.contentID;

    // Delete content based on contentId and userId.
    await ContentModel.deleteMany({
        contentID: contentID,
        //@ts-ignore
        userID: req.userID
    });

    res.json({
        message: "deleted"
    });
});

// Route 6: Share Content Link
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;

    if (share) {

        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userID
        });

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });  // Send existing hash if found
            return;
        }

        // Generate a new hash for the shareable link.
        const hash = random(15);
        await LinkModel.create({
            //@ts-ignore
            userId: req.userID,
            hash: hash
        });
        res.json({ hash });
    } else {
        // Remove the shareable link if share is false.
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({ message: "Removed link" });
    }

});

// Route 7: Get Shared Content
app.get("/api/v1/brain/:shareLink", async (req, res) => {

    const hash = req.params.shareLink;

    // Find the link using the provided hash.
    const link = await LinkModel.findOne({
        hash:hash
    });

    if (!hash) {
        res.status(404).json({
            message:"Invalid Share Link"
        });
        return;
    }

     // Fetch content and user details for the shareable link.
    const content = await ContentModel.find({ userId:link?.userId });
    const user = await UserModel.findOne({ _id: link?.userId });

    if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }

    res.json({
        username:user.username,
        content:content
    });

});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
