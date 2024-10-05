import mongoose, { Schema } from 'mongoose'; // Erase if already required
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from 'joi';
import PasswordComplexity from "joi-password-complexity";
import crypto from "crypto";



// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
        // unique: true,
        index: true,
    },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    role: { type: String, default: "user", required: true, enum: ['user', 'vendor', 'admin'] },
    // mobile: { type: String, required: true, unique: true, },

    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    resetPasswordToken: { type: String, },
    resetPasswordTokenExpire: { type: Date }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.generateAuthToken = function () {
    const token = Jwt.sign(
        { _id: this._id },
        process.env.PRIVATEKEY,
        { expiresIn: "3d" }
    )
    return token;
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expireTime = Date.now() + (5 * 60 * 1000); // seconds
    this.resetPasswordToken = crypto.createHmac('sha256', "secret").update(resetToken).digest('hex')
    this.resetPasswordTokenExpire = expireTime;
    return resetToken;
}

const validate = (user) => {
    const Schema = Joi.object({
        name: Joi.string().min(5).max(12).required(),
        email: Joi.string().required().email(),
        password: PasswordComplexity().required(),
    })
    return Schema.validate(user)
}
const User = mongoose.model('User', userSchema);
//Export the model
export { User, validate };
