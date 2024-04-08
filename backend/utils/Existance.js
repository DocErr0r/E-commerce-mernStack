import { User } from "../models/user.js"

export const userExist=async(email,res)=>{
    let user=await User.findOne({email:email})
    if (user) throw new Error("user already exist")
}