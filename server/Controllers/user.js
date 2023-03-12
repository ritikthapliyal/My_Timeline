import User from '../Models/userModel.js'
import bcrypt from 'bcryptjs'
import cron from 'cron'


// const job = new cron.CronJob('0 0 * * *', () => {
const job = new cron.CronJob('51 16 * * *', () => {

    User.find({ 'todaysTasks.status': false }, async (err, users) => {
        if (err) {
          console.error(err);
        } else {
          await users.forEach((user) => {
            
            if(user.todaysTasks.length > 0){
                
                const pendingTasks = user.pendingTasks.concat(
                    user.todaysTasks.filter((task) => task.status === false)
                );
                
                const completedTasks = user.todaysTasks.filter((task) => task.status === true).length;
                
                let efficiency = (completedTasks / user.todaysTasks.length) * 100
                efficiency = efficiency.toFixed(2)
                
                const now = new Date();
                const currentDate = now.getDate();
                const currentMonth = now.getMonth();

                user.everyday[currentMonth][currentDate] = {
                    efficiency,
                    total_tasks : user.todaysTasks.length,
                    completed_tasks : completedTasks
                }

                user.markModified('everyday');

                user.todaysTasks = [];
                user.pendingTasks = pendingTasks;

                user.save((err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`Tasks moved successfully for user ${user.email}!`);
                    }
                });
            }
          });
        }
    });
});

job.start();



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
        
        await User.create({
                            email,
                            mobile,
                            address,
                            password:hashPassword,
                            everyday:[{},{},{},{},{},{},{},{},{},{},{},{}],
                            goals:[{},{},{},{},{},{},{},{},{},{},{},{}],
                            joinDate:date})        
        
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

        // console.log(_id,year,month,date,goal)
        
        try{
    
            await User.updateOne({_id},{ "$set": { [`goals.${month}.${year}.${date}`]: goal } })
    
            const updatedInfo = await User.findOne({_id},{password:0})
            res.status(200).json({result:updatedInfo})
        }
        catch(err){
            res.status(400).json({message:err})
        }

}


export const deleteGoal = async (req,res)=>{
    
    const {_id,date,month,year} = req.body

    try{
    
        await User.updateOne({ _id },{ $unset: { [`goals.${month}.${year}.${date}`]: "" } });
          
        const updatedInfo = await User.findOne({_id},{password:0})
        res.status(200).json({result:updatedInfo})
    }
    catch(err){
        res.status(400).json({message:err})
    }

}

export const editGoal = async (req,res)=>{

    const {_id,date,month,year,goalTitle,goalMotivation} = req.body

    // console.log(_id,date,month,year,goalTitle,goalMotivation)

    try{
        
        await User.updateOne({ _id }, { 
                                    $set: { 
                                          [`goals.${month}.${year}.${date}.title`]: goalTitle, 
                                          [`goals.${month}.${year}.${date}.motivation`]: goalMotivation,
                                        } 
                                }
                        );
          
        const updatedInfo = await User.findOne({_id},{password:0})
        res.status(200).json({result:updatedInfo})
    }
    catch(err){
        res.status(400).json({message:err})
    }

}

export const addTask = async (req,res)=>{
    
        const {_id,newTask} = req.body

        try{

            const user = await User.findById(_id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.todaysTasks.push(newTask);
            await user.save();

            return res.status(201).json({result : newTask});
        }
        catch(error){
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }

}
export const doneTask = async (req,res)=>{
    
        const {_id,index} = req.body

        // console.log(index)

        try{
            await User.updateOne({ _id },
                { $set: { [`todaysTasks.${index}.status`]: true } });

            res.status(200).json(index);
        }
        catch(error){
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }

}


export const resetData = async(req,res) => {

    const _id = req.params.id

    try{
        let user = await User.findOne({_id})        
        return res.status(200).json({result:user})
    }
    catch{
        return res.status(500).json({message:"Something Went Wrong"})
    }

}



