import Jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const verifyuser = async (req, res, next) => {
    const token = req.cookies.authToken
    if (!token) {
        return res.status(401).json({ message: "You are not logged in!" });
    } else {
        try {
            Jwt.verify(token, process.env.PRIVATEKEY, async (err, validToken) => {
                if (err) return res.status(403).send({ err, message: "token not valid" });
                req.user = await User.findById(validToken).select('-password');
                next();
            })
        } catch (error) {
            return res.status(403).send({ auth: false, message: 'Auth failed' })
        }
    }
}

export default verifyuser;