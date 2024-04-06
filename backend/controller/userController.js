import serverhandler from "../middlewares/serverhandler.js";
import { User, validate } from "../models/user.js";
import bcrypt from "bcrypt";
import setCookies from "../utils/setCookies.js";


export const createUser = serverhandler(async (req, res) => {
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
    setCookies(res, token);

    res.status(200).send({ token, data: newUser, message: "user is created" })
})

export const loginUser = serverhandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Email or Password is incorrect!" });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ auth: false, token: null, message: "Email or Password is incorrect!" });

    const token = user.generateAuthToken();
    setCookies(res, token)

    res.send({ date: token, massaege: 'signing in please wait' });
})

export const logoutUser = serverhandler(async (req, res) => {
    res.cookie('authToken', '', {
        httpOnly: true, expires: new Date(0)
    })
    res.send({ message: 'logged out ' });
})

export const getCrUser = serverhandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -__v')
    if (!user) { res.status(404); throw new Error("user with id is not found") }
    res.status(200).send({ data: user })
})

export const updateCrUser = serverhandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true }).select('-password -__v');
    res.status(200).send({ data: user })
})

export const deleteUser = serverhandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404);
        throw new Error("No user with this id");
    }
    if (user.role === "admin") { res.status(400); throw new Error("can not delete admin user") }
    await User.deleteOne({_id:user._id})
    res.status(200).send({ message: "Deleted Successfully" });
})

// admin
export const getAllUser = serverhandler(async (req, res) => {
    const users = await User.find().select("-password -__v")
    if (!users) return res.status(400).send({ message: 'no such user found' });
    res.status(200).send({ data: users })
})
