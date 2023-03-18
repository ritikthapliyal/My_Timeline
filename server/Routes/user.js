import express from 'express'
import {addUser,verifyUser,setGoal, deleteGoal, editGoal, addTask, doneTask, resetData, doneGoal, addSubtask} from '../controllers/user.js'

const user = express.Router();

user.get('/:id',resetData)

user.put('/',setGoal)
user.post('/',addUser)
user.patch('/',editGoal)
user.delete('/',deleteGoal)
user.patch('/done',doneGoal)
user.post('/verify',verifyUser)


user.post('/Task',addTask)
user.patch('/Task',doneTask)
user.patch('/Task/Subtask',addSubtask)

export default user