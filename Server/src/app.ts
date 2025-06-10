import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/pageRoutes";
import dbConnect from "./config/db";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
dotenv.config();
app.use(cors({
  origin: "https://brainly-ysct.onrender.com", 
  credentials: true 
}));
// //   origin: '*', 
//   credentials: true 
app.use(cookieParser());
dbConnect();

app.use("/api/v1",router);

app.listen(process.env.PORT,()=>{
  console.log("Server is runing:- ",process.env.PORT);
})