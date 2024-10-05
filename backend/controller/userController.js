import serverhandler from "../middlewares/serverhandler.js";
import { User, validate } from "../models/user.js";
import bcrypt from "bcrypt";
import setCookies from "../utils/setCookies.js";
import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";
import sendmail from "../utils/sendMail.js";
import crypto from "crypto";


export const createUser = serverhandler(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.message })

    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(403).send({ message: "user already exits with this email" });

    let newUser = await new User(req.body).save();
    newUser.password = undefined;
    newUser.__v = undefined;

    const token = newUser.generateAuthToken();
    setCookies(res, token);

    res.status(200).send({ token, data: newUser, message: "user is created" })
})

export const loginUser = serverhandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        // return res.status(401).send({ message: "Email or Password is incorrect!" });
        res.status(401);
        throw new Error("Email or Password is incorrect!");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Email or Password is incorrect!" });

    const token = user.generateAuthToken();
    setCookies(res, token)
    user.password = undefined
    user.__v = undefined;
    res.send({ data: user, token, message: 'signing in please wait' });
})

export const logoutUser = serverhandler(async (req, res) => {
    res.clearCookie('authToken', '', {
        httpOnly: true, secure: false, sameSite: 'strict', expires: new Date(0)
    })
    res.send({ message: 'logged out ' });
})

export const getCrUser = serverhandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -__v')
    if (!user) { res.status(404); throw new Error("user with id is not found") }
    res.status(200).send({ data: user })
})

export const getCrUserWishlist = serverhandler(async (req, res) => {
    const wishlist = await User.findById(req.user._id).select('wishlist').populate('wishlist')
    if (!wishlist) { res.status(404); throw new Error("user with id is not found") }
    res.status(200).send({ data: wishlist })
})

export const updateCrUser = serverhandler(async (req, res) => {
    const userEx = await User.findOne({ email: req.body.email });
    if (userEx && userEx._id.toString() !== req.user._id) {
        res.status(403);
        throw new Error("user already exist with this email");
    }

    const obj = Joi.object({
        name: Joi.string().min(5).max(12),
        email: Joi.string().email()
    })
    const { error } = obj.validate(req.body);
    if (error) return res.status(400).send({ message: error.message });
    const object = {}
    Object.assign(object, req.body)
    const user = await User.findByIdAndUpdate(req.user._id, { $set: object }, { new: true }).select('-password -__v');
    if (!user) {
        res.status(404);
        throw new Error("No user with this id");
    }
    res.status(200).send({ data: user })
})

export const updatePassword = serverhandler(async (req, res) => {
    const obj = Joi.object({
        password: Joi.string().required(),
        newPassword: PasswordComplexity().required(),
        confirmPass: Joi.string().required()
    })
    const { error } = obj.validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    let user = await User.findOne({ _id: req.user._id });
    if (!user) {
        res.status(404);
        throw new Error("No user with this id");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.status(400);
        throw new Error("Invalid password");
    }
    if (req.body.newPassword !== req.body.confirmPass) {
        res.status(400);
        throw new Error('password not match');
    }

    try {
        user.password = req.body.newPassword
        await user.save({ validateBeforeSave: true });
        res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating password' });
    }
});

export const forgotPassword = serverhandler(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("This Email is Not Registered");
    }
    //generate a reset token and save it to the database
    const resetToken = user.getResetPasswordToken();
    //onboard the user with the link
    const resetUrl = process.env.FRONTEND_URL + `/resetpassword/${resetToken}`;

    try {
        await user.save({ validateBeforeSave: false });
        // send the mail
        await sendmail(email, resetUrl);

        res.status(200).json({ message: 'Email has been sent' })
    } catch {
        console.log(err);
        res.status(400).json({ message: 'Failed To Send The Email.' })
    }
});

export const resetPassword = serverhandler(async (req, res) => {
    const resetToken = req.params.token;
    const hashToken = crypto.createHmac('sha256', "secret").update(resetToken).digest('hex')
    const user = await User.findOne({
        resetPasswordToken: hashToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    });
    if (!user) {
        return res.status(400).json({ message: 'Invalid or Expired Token' })
    }

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!password || !confirmPassword) {
        return res.status(400).json({ message: "Please Fill All Field" })
    }
    if (password !== confirmPassword) {
        throw new Error("password not match")
    }
    const obj = Joi.object({
        password: PasswordComplexity().required(),
        confirmPassword: PasswordComplexity().required(),
    })
    const { error } = obj.validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    try {
        user.password = password;

        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: true });

        res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating password' });
    }
})


// admin controls
export const getAllUser = serverhandler(async (req, res) => {
    const users = await User.find().select("-password -__v")
    if (!users) return res.status(400).send({ message: 'no such user found' });
    res.status(200).send({ data: users })
})

export const deleteUserById = serverhandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404);
        throw new Error("No user with this id");
    }
    if (user.role === "admin") { res.status(400); throw new Error("can not delete admin user") }
    const deleteUser = await User.deleteOne({ _id: user._id })
    res.status(200).send({ data: deleteUser, message: "Deleted Successfully" });
})

export const getUserById = serverhandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v')
    if (!user) return res.status(400).send({ message: `No user with the id ${req.params.id}` })
    res.status(200).send({ data: user })
});

export const updateUserById = serverhandler(async (req, res) => {
    const userEx = await User.findOne({ email: req.body.email });
    if (userEx && userEx._id.toString() !== req.params.id) {
        res.status(403);
        throw new Error("user already exist with this email");
    }
    let user = await User.findById(req.params.id)
    if (!user) {
        res.status(404);
        throw new Error("No user with this id");
    }
    const obj = Joi.object({
        name: Joi.string().min(5).max(12),
        email: Joi.string().email(),
        role: Joi.string().valid("user", "vendor", "admin")
    })
    const { error } = obj.validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    const object = {}
    Object.assign(object, req.body)

    if (user.role === "admin") { object.role = undefined }

    user = await User.findByIdAndUpdate({ _id: user.id }, { $set: object }, { new: true }, { validateBeforeSave: false }).select('-password -__v');
    res.status(200).send({ data: user, message: `user with ${req.params.id} has been updated` })
});
