import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    mobile:String,
    address:String,
    joinDate:String,
    everyday:Array,
    goals:Array,
    todaysTasks: Array,
    pendingTasks: Array
})



const User = mongoose.model('User',userSchema)
export default User