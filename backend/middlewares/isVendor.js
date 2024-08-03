import Jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const isVendor = (req, res, next) => {
    const token = req.cookies.authToken
    // console.log(req.cookies.authToken)
    if (!token) return res.status(403).send({ message: "access denied token not provided" });

    Jwt.verify(token, process.env.PRIVATEKEY, async (err, validToken) => {
        if (err) return res.status(403).send({ err: err.message, message: "User not valid" });
        const user = await User.findById(validToken);
        if (!(user.role === "vendor" || user.role === 'admin')) return res.status(403).send({ message: "You dont have permission to do this" });
        req.user = user
        next();
    })
}

export default isVendor;