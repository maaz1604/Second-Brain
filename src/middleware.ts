import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decode = jwt.verify(header as string, JWT_SECRET);
    if (decode) {
        //@ts-ignore
        req.userID = decode.id;
        next();
    } else {
        res.status(403).json({
            message: "You are not logged in!"
        });
    }
}