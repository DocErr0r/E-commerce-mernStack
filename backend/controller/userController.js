import {User,validate} from "../models/user.js";
import bcrypt from "bcrypt";


export const createUser=async(req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.message })

    const {name, email, password}=req.body;
    const user=await User.findOne({email})
    if (user) return res.status(403).send({ message: "user already exits" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPass = await bcrypt.hash(req.body.password, salt)
    let newUser = await new User({
        ...req.body,
        password: hashPass,
    }).save();
    newUser.password = undefined;
    newUser.__v = undefined;

    // const token = newUser.generateAuthToken();

    res.status(200).send({ data: newUser, message: "user is created" })
}