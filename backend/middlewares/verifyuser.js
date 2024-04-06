import Jwt from "jsonwebtoken";
import serverHandler from "./serverhandler";

const verfyuser = serverHandler(async (req, res, next) => {
    const token = res.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: "You are not logged in!" });
    } else {
        try {
            Jwt.verify(token, process.env.PRIVATEKEY, (err, validToken) => {
                if (err) return res.status(403).send({ err, message: "token not valid" });
                req.user = validToken;
                next();
            })
        } catch (error) {
            return res.status(403).send({ auth: false, message: 'Auth failed' })
        }

    }
})

export default verfyuser;