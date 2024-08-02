import Jwt from "jsonwebtoken";

const admin = (req, res, next) => {
    const token = req.cookies.authToken
    // console.log(req.cookies.authToken)
    if (!token) return res.status(403).send({ message: "access denied token not provided" });

    Jwt.verify(token, process.env.PRIVATEKEY, (err, validToken) => {
        if (err) return res.status(403).send({ err: err.message, message: "User not valid" });
        if (!(validToken.role === "vender")) return res.status(403).send({ message: "You dont have permission to do this" });
        req.user = validToken;
        next();
    })
}

export default admin;