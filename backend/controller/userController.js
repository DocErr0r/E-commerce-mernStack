import { User, validate } from "../models/user.js";
import bcrypt from "bcrypt";


export const createUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.message })

        const user = await User.findOne({ email: req.body.email })
        if (user) return res.status(403).send({ message: "user already exits" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPass = await bcrypt.hash(req.body.password, salt)
        let newUser = await new User({
            ...req.body,
            password: hashPass,
        }).save();
        newUser.password = undefined;
        newUser.__v = undefined;

        const token = newUser.generateAuthToken();

        res.status(200).send({token, data: newUser, message: "user is created" })
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}

export const loginUser = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Email or Password is incorrect!" });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ auth: false, token: null, message: "Email or Password is incorrect!" });

        const token = user.generateAuthToken();

        res.send({ date: token, massaege: 'signing in please wait' });
    } catch (e) {
        res.status(500).send('Internal server error')
    }
}