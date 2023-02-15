import express from 'express'
import {addUser,verifyUser,setGoal} from '../controllers/user.js'

const user = express.Router();

user.post('/',addUser)
user.put('/',setGoal)
user.post('/verify',verifyUser)

export default user