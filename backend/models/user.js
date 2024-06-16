import mongoose from 'mongoose'; // Erase if already required
import Jwt from "jsonwebtoken";
import Joi from 'joi';
import PasswordComplexity from "joi-password-complexity";


// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
        // unique: true,
        index: true,
    },
    email: { type: String, required: true, unique: true, },
    // mobile: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    role: { type: String, default: "user", require: true },

    resetPasswordToken: { type: String, },
    resetPasswordTokenExpire: { type: Date }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
    const token = Jwt.sign(
        { _id: this._id, name: this.name, role: this.role },
        process.env.PRIVATEKEY,
        { expiresIn: "3d" }
    )
    return token;
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = '123456'
    const expireTime = Date.now() + (60 * 1000); // seconds
    this.resetPasswordToken = resetToken;
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
