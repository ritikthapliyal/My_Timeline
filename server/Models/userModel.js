import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    mobile:String,
    address:String,
    goals:Array,
    joinDate:String
})



const User = mongoose.model('User',userSchema)
export default User