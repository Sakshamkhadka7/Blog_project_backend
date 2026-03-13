import jwt from "jsonwebtoken"
import User from "../models/User.js";

export const user_mid = async (req, res, next) => {

    try {
        const token = req.cookies.jwt_cookie;
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Token not found"
            });
        }

        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN);

        console.log(verifyToken);

        let userInfo = await User.findById({ _id: verifyToken.id });
        console.log(userInfo);

        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        req.userMid = userInfo;
        next();
    } catch (error) {
        console.log("Error occured in a user mid", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}