import mongoose , { Model, model,Schema } from "mongoose";
// Connecting to the MongoDB database using a connection string
mongoose.connect("mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/Second_Brain");

// Defining a schema for the 'User' collection
// Each user will have a unique 'username' and a 'password'
const UserSchema = new Schema({
    username:{type:String,unique:true},
    password:{type:String}
});

export const UserModel = mongoose.model('User',UserSchema);