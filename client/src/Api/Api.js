import axios from 'axios'

const user = 'http://localhost:5000/user/'

export function addUser(userData){return axios.post(user,userData)}
export function verifyUser(userData){return axios.post(user + 'verify',userData)}
export function setGoal(data){return axios.put(user,data)}
export function deleteGoal(data){return axios.delete(user,data)}
export function editGoal(data){return axios.patch(user,data)}


export function resetData(data){return axios.get(`${user}${data}`)}


export function addTask(data){return axios.post(user + 'Task',data)}
export function doneTask(data){return axios.patch(user + 'Task',data)}
