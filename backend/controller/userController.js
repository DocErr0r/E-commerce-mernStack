import serverhandler from "../middlewares/serverhandler.js";
import { User, validate } from "../models/user.js";
import bcrypt from "bcrypt";
import setCookies from "../utils/setCookies.js";
import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";


export const createUser = serverhandler(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.message })

    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(403).send({ message: "user already exits with this email" });

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
    if (!user) {
        // return res.status(401).send({ message: "Email or Password is incorrect!" });
        res.status(401);
        throw new Error("Email or Password is incorrect!");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ auth: false, token: null, message: "Email or Password is incorrect!" });

    const token = user.generateAuthToken();
    setCookies(res, token)

    res.send({ data: token, message: 'signing in please wait' });
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
    const userEx = await User.findOne({ email: req.body.email });
    if (userEx) {
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
        confirmPass: PasswordComplexity().required()
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
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)
        user.password = hashedPassword;

        await user.save();
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
    const resetUrl = `http://localhost:3000/resetpassword/${user.resetPasswordToken}`;

    try {
        await user.save({ resetPasswordExpireToken: resetToken });
        // send the mail
        // Mailer.sendPasswordReset(email,resetUrl);

        res.status(200).json({ message: 'Email has been sent', url: resetUrl })
    } catch {
        console.log(err);
        res.status(400).json({ message: 'Failed To Send The Email.' })
    }
});

export const resetPassword = serverhandler(async (req, res) => {
    const resetToken = req.params.token;
    const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid or Expired Token' })
    }

    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;

    if (!password || !confirmPassword) {
        return res.status(400).json({ message: "Please Fill All Field" })
    }
    if (password !== confirmPassword) {
        throw new Error("password not match")
    }
    // todo

    res.status(200).send({ message: 'Password updated successfully' });
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
    await User.deleteOne({ _id: user._id })
    res.status(200).send({ message: "Deleted Successfully" });
})

export const getUserById = serverhandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v')
    if (!user) return res.status(400).send({ message: `No user with the id ${req.params.id}` })
    res.status(200).send({ data: user })
});

export const updateUserById = serverhandler(async (req, res) => {
    const userEx = await User.findOne({ email: req.body.email })
    if (userEx) return res.status(403).send({ message: "user already exist with this email" });

    let user = await User.findById(req.params.id)
    if (!user) {
        res.status(404);
        throw new Error("No user with this id");
    }
    const obj = Joi.object({
        name: Joi.string().min(5).max(12),
        email: Joi.string().email(),
        role: Joi.string().valid("user", "vender", "admin")
    })
    const { error } = obj.validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    const object = {}
    Object.assign(object, req.body)

    if (user.role === "admin") { object.role = undefined }

    user = await User.findByIdAndUpdate({ _id: user.id }, { $set: object }, { new: true }).select('-password -__v');
    res.status(200).send({ data: user })
});
