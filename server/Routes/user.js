import express from 'express'
import {addUser,verifyUser,setGoal, deleteGoal, editGoal, addTask, doneTask, resetData} from '../controllers/user.js'

const user = express.Router();

user.get('/:id',resetData)

user.put('/',setGoal)
user.post('/',addUser)
user.patch('/',editGoal)
user.delete('/',deleteGoal)
user.post('/verify',verifyUser)


user.post('/Task',addTask)
user.patch('/Task',doneTask)

export default user