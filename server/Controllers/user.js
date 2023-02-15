import User from '../Models/userModel.js'
import bcrypt from 'bcryptjs'


export const addUser = async (req,res) => {

    const email = req.body.username
    const mobile = req.body.mobile
    const address = req.body.address
    const password = req.body.password
    const date = new Date

    try{

        if(await User.findOne({email:email})){
            return res.status(409).json({message:"Email Already Exists"})
        }

        const hashPassword = await bcrypt.hash(password,12)
        
        await User.create({email,mobile,address,password:hashPassword,goals:[{},{},{},{},{},{},{},{},{},{},{},{}],joinDate:date})        
        
        const user = await User.findOne({email:email},{password:0})
        return res.status(201).json({result:user})   

    }
    catch(error){
        return res.status(500).json({message:"Something Went Wrong"})
    }

}


export const verifyUser = async(req,res) => {

    const email = req.body.username
    const password = req.body.password

    console.log(password)

    try{
        
        let user = await User.findOne({email:email})
        if(!user){ return res.status(404).json({message:"User Not Found"})}

        const isValidPassword = bcrypt.compare(password,user.password)
        if(!isValidPassword){ return res.status(404).json({message:"Password Does Not Match"})}

        user = await User.findOne({email:email},{password:0})
        return res.status(200).json({result:user})

    }
    catch{
        return res.status(500).json({message:"Something Went Wrong"})
    }

}


export const setGoal = async (req,res)=>{

        const {_id,year,month,date,goal} = req.body

        console.log(_id,year,month,date,goal)
        
        try{
    
            await User.updateOne({_id},{ "$set": { [`goals.${month}.${year}.${date}`]: goal } })
    
            const updatedInfo = await User.findOne({_id},{password:0})
            res.status(200).json({result:updatedInfo})
        }
        catch(err){
            res.status(400).json({message:err})
        }

}



