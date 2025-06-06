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

const LinkSchema = new Schema({
    // 'hash' is a string that represents the shortened or hashed version of a link
    hash: String,

    // 'userId' is a reference to the 'User' collection in the database.
    // It uses Mongoose's ObjectId type for relational data.
    // The 'ref' property specifies the referenced collection name ('User').
    // The 'required' property ensures this field must be provided when creating a document.
    // The 'unique' property enforces that each 'userId' in this collection is unique.
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
});

// Exporting the LinkModel based on the LinkSchema
// The model represents the 'Links' collection in the database
export const LinkModel = mongoose.model("Links", LinkSchema);