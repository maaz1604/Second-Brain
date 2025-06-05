import mongoose, { Model, model, Schema } from "mongoose";
// Connecting to the MongoDB database using a connection string
mongoose.connect("mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/Second_Brain");

// Defining a schema for the 'User' collection
// Each user will have a unique 'username' and a 'password'
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String }
});

// Creating a model for the 'User' collection, enabling interactions with the database
export const UserModel = mongoose.model('User', UserSchema);

// Defining a schema for the 'Content' collection
// Each content will have a 'title', a 'Link', an array of 'tags', and a reference to a 'userId'
const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

export const ContentModel = mongoose.model('Content', ContentSchema);