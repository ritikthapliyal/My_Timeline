import axios from 'axios'

const user = 'http://localhost:5000/user/'
export function addUser(userData){return axios.post(user,userData)}
export function verifyUser(userData){return axios.post(user + 'verify',userData)}
export function setGoal(data){ console.log(data)  ;return axios.put(user,data)}
