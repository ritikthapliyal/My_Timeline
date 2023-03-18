import React, { useEffect, useRef, useState, Fragment } from 'react'
import "./Today.css"
import {useDispatch, useSelector} from 'react-redux'
import { addTask, doneTask, addSubtask } from '../../Redux/userSlice'


const color = [  {back:"#e8deee",color:"#412454"},  
                 {back:"#eee0da",color:"#442a1e"},  
                 {back:"#d3e5ef",color:"#183347"},  
                 {back:"#fdecc8",color:"#402c1b"},  
                 {back:"#ffe2dd",color:"#5d1715"},  
                 {back:"#dbeddb",color:"#1c3829"},  
                 {back:"#f5e0e9",color:"#4c2337"},  
                 {back:"#e3e2e0",color:"#32302c"},  
                 {back:"#a8e6cf",color:"#3d3b4f"},    
                 {back:"#dfe7fd",color:"#1b263b"},  
                 {back:"#ffcfdf",color:"#5a001e"},  
            ];


function Today() {

    const dispatch = useDispatch()
    const pendingDiv = useRef()
    const {todaysTasks,userData} = useSelector((state)=> state.userSlice)
    const [showDoneTasks,setShowDoneTasks] = useState(false)
    const [task,setTask] = useState("")
    const [subtask,setSubtask] = useState("")
    const [showLine,setShowLine] = useState(-1)
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
    const [showSubtask,setShowSubtask] = useState(false)

    let lastIndex = 0
    function pickColor(){
        let index = Math.floor(Math.random() * 11);
        while(index === lastIndex){
            index = Math.floor(Math.random() * 11);
        }
        lastIndex = index
        return index
    }

    const handleAddTask = ()=>{
        const newTask = {task,status:false,subtasks:[]}
        dispatch(addTask({_id:userData._id,newTask})).then(setTask(""))
    }
    const handleAddSubtask = (e)=>{
        e.stopPropagation()
        const newSubTask = {subtask,status:false}
        dispatch(addSubtask({_id:userData._id,index:selectedTaskIndex,newSubTask})).then(setSubtask(""))
    }


    const handleDoneTask=(index)=>{
        dispatch(doneTask({_id:userData._id,index}))
    }

    const [movePending,setMovePending] = useState([])
    const handleCheckbox = (index)=>{
        if(movePending.includes(index)){
            const newMovePending = movePending.filter(ind=>index !== ind)
            setMovePending(newMovePending)
        }
        else{
            setMovePending([...movePending,index])
        }
    }
    
    

    function handleClick(index) {
        setShowSubtask(false)
        setSelectedTaskIndex(index)
    }

    const toggleTranslateY = (e) => {

        e.stopPropagation()

        if (pendingDiv.current.style.transform === 'translateY(130%)') {
            pendingDiv.current.style.transform = 'translateY(-10%)';
        } else {
            pendingDiv.current.style.transform = 'translateY(130%)';
        }
    }


    const atleastOneDone = ()=>{
        for (const task of todaysTasks) {
            if (task.status) {
              return true;
            }
          }
          return false
    }
    const atleastOneNotDone = ()=>{
        for (const task of todaysTasks) {
            if(!task.status) {
              return true;
            }
          }
          return false
    }


    useEffect(()=>{},[todaysTasks])

    return (
        <div className='Today' onMouseLeave={()=>{setShowSubtask(false);setSelectedTaskIndex(-1)}}>

            <button className='flip-page' onClick={()=>{setShowDoneTasks(!showDoneTasks)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
            </button>

            
            <div ref={pendingDiv} 
                 onMouseLeave={toggleTranslateY} 
                 className='prev-pending-tasks'
                 style={{transform:"translateY(130%)"}}>
                    <p>Previous Pending Tasks</p>

                    <div className='prev-pending-tasks-inputs'>
                        {
                            userData.pendingTasks.map(({task},index)=>{
                                const checked = movePending.includes(index)
                                return <div key={index} className='prev-pending-tasks-input' 
                                            style={{backgroundColor : checked ? "wheat" : "white"}}>
                                    <input  type="checkbox" 
                                            checked={checked} 
                                            onChange={()=>handleCheckbox(index)}></input>
                                    <label>{task}</label>
                                </div>
                            })
                        }
                    </div>
                    <div className='prev-pending-tasks-buttons'>
                        <button>Add All</button>
                        <button>Add Selected</button>
                        <button>Remove All</button>
                        <button>Remove Selected</button>
                    </div>
            </div>
        

            <div className='tasks-pending' style={{transform: showDoneTasks ? "translateX(-100%)" :"translateX(0%)"}}>
                <div className='tasks-pending-header'>
                    <h2>Today's Goals</h2>
                </div>  

                <div className='TASKS-container' onClick={()=>{setShowSubtask(false);setSelectedTaskIndex(-1)}}>
                    {
                        todaysTasks.length > 0 && atleastOneNotDone()
                        ? todaysTasks.map((todoTasks,index)=>{ 
                            if(!todoTasks.status){
                                const cindex = pickColor()
                                return  <div key={index} 
                                             className='TASKS' 
                                             style={{backgroundColor : color[cindex].back}}>
                                             <p onClick={(e) => {e.stopPropagation();handleClick(index)}} 
                                                style={{color:color[cindex].color}}>{todoTasks.task}</p>

                                                {
                                                    todoTasks.subtasks.length > 0 && <ul className='subtasks-container'>
                                                        {
                                                            todoTasks.subtasks.map(subt=>{
                                                                return <li>
                                                                    <input
                                                                    type="checkbox"
                                                                    >
                                                                    </input>
                                                                    <label>{subt.subtask}</label>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                }
                                                {
                                                selectedTaskIndex === index && !showSubtask ? <ul 
                                                        className='tasks-menu'
                                                        style={{transform : selectedTaskIndex === index ? "scaleY(1)" : "scaleY(0)"}}
                                                        onMouseLeave={()=>{setSelectedTaskIndex(-1);setShowSubtask(false)}}>
                                                    <li>
                                                        <button onClick={(e) => {e.stopPropagation();handleDoneTask(index)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={(e) => {e.stopPropagation();}}>
                                                        <svg width="24" height="24" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.45887 2L1 6.01478L2.33826 7.50107L6.79713 3.48629L5.45887 2Z" fill="currentColor" /><path d="M11 8H13V12H16V14H11V8Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12Z" fill="currentColor" /><path d="M18.5411 2L23 6.01478L21.6617 7.50107L17.2029 3.48629L18.5411 2Z" fill="currentColor" /></svg>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={(e) => {e.stopPropagation();}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={(e) => {e.stopPropagation();setShowSubtask(true)}}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5C3 5.55228 3.44772 6 4 6H20C20.5523 6 21 5.55228 21 5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5Z" fill="currentColor" /><path d="M12 20C12.5523 20 13 19.5523 13 19V16H16C16.5523 16 17 15.5523 17 15C17 14.4477 16.5523 14 16 14H13V11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V14H8C7.44772 14 7 14.4477 7 15C7 15.5523 7.44772 16 8 16H11V19C11 19.5523 11.4477 20 12 20Z" fill="currentColor" /></svg>
                                                        </button>
                                                    </li>
                                                </ul>
                                                :    
                                                selectedTaskIndex === index &&  
                                                                                <Fragment>
                                                                                <input
                                                                                value={subtask}
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                onChange={(e)=>{setSubtask(e.target.value)}}
                                                                                style={{
                                                                                        padding: '.4rem',
                                                                                        width: '90%',
                                                                                        transform: 'translateX(10%)',
                                                                                        outline:"none",
                                                                                        border: "none",
                                                                                        marginBottom: ".2rem"
                                                                                    }}  
                                                                                placeholder='Enter Subtask'></input>
                                                                                <button className='add-subtask'
                                                                                        onClick={(e)=>handleAddSubtask(e)}
                                                                                        style={{backgroundColor:color[cindex].color,
                                                                                                color : color[cindex].back}}
                                                                                >Add</button>
                                                                            </Fragment>
                                            }
                                        </div>
                            }})
                        :
                            todaysTasks.length === 0 ? 
                                <div className='alternate'>
                                    <p>"<span>Your future depends on what you do today.</span>"<br/> ~ Mahatma Gandhi</p>
                                    <p>Start your day off right by adding tasks to your to-do list. Whether it's a big project or a small task, writing it down can help you stay organized and focused.</p>
                                    <p>Take a few minutes now to jot down what you need to accomplish today, and make sure to prioritize your most important tasks. With a clear plan in place, you'll be ready to tackle anything that comes your way!</p>
                                </div>
                            :
                                <div className='alternate'>
                                    <p>"<span>Success is not final, failure is not fatal, it's the courage to continue that counts.</span>"<br/> ~ Winston Churchill</p>
                                    <p>
                                    Congratulations on completing all the tasks you set out to do today! Your determination and perseverance are truly admirable. Remember, success is not just about achieving your goals, but also about the effort and resilience it takes to get there.</p><p> Keep up the great work and stay motivated to continue pursuing your dreams!
                                    </p>
                                </div>
                    }
                </div>

                <div className='input-task' onClick={()=>setSelectedTaskIndex(-1)}>
                    <input placeholder='Enter Task' type="text" onChange={(e)=>{setTask(e.target.value)}} value={task}></input>
                    <button onClick={()=>handleAddTask()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    <button onClick={toggleTranslateY}>
                        <div>{userData.pendingTasks.length}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                    </button>
                </div>
            </div>  

            <div className='tasks-done' style={{transform: showDoneTasks ? "translateX(0%)" :"translateX(100%)"}}>
                <div className='tasks-pending-header'>
                    <h2>Today's Completed Goals</h2>
                </div> 
                <div className='TASKS-container'>
                        {
                            todaysTasks.length > 0 && atleastOneDone()
                            ? todaysTasks.map((todoTasks,index)=>{ 
                                if(todoTasks.status){
                                    const cindex = pickColor()
                                    return  <div key={index} 
                                                className='TASKS' 
                                                onMouseLeave={()=>setShowLine(-1)}
                                                onMouseOver={()=>setShowLine(index)}
                                                style={{backgroundColor : color[cindex].back,position:"relative"}}>
                                                <svg className='tasks-svg' width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 9.71122C0 7.38541 0.941051 5.15487 2.61613 3.51028C4.29122 1.86569 6.56312 0.941772 8.93204 0.941772C11.301 0.941772 13.5729 1.86569 15.2479 3.51028C16.923 5.15487 17.8641 7.38541 17.8641 9.71122C17.8641 12.037 16.923 14.2676 15.2479 15.9121C13.5729 17.5567 11.301 18.4807 8.93204 18.4807C6.56312 18.4807 4.29122 17.5567 2.61613 15.9121C0.941051 14.2676 0 12.037 0 9.71122H0ZM8.42232 13.4645L13.5648 7.15288L12.6359 6.42326L8.25082 11.803L5.14486 9.26222L4.38265 10.1602L8.42232 13.4657V13.4645Z" fill="#51C485"/>
                                                </svg>
                                                <p style={{color:color[cindex].color}}>{todoTasks.task}</p>
                                                {
                                                  showLine !== index && <div className='line'></div>
                                                }
                                            </div>
                                }})
                            :
                                todaysTasks.length === 0 ? 
                                <div className='alternate'>
                                    <p>"<span>If you want to live a happy life, tie it to a goal, not to people or things</span>"<br/> ~ Albert Einstein</p>
                                    <p>"Looks like you haven't added any goals for today yet. Setting goals can help you stay focused and motivated throughout the day. Take a moment to think about what you want to accomplish today, and write down your goals.</p><p> Don't forget to prioritize your most important tasks and break larger goals into smaller, manageable steps. With a clear plan in place, you'll be on your way to a productive and successful day!"</p>
                                </div>
                                :
                                <div className='alternate'>
                                    <p>"Great job on setting goals for today! However, it looks like you haven't completed any of them yet. Don't worry - completing goals is a process, and it takes time to get there. Take a moment to celebrate the fact that you took the first step by setting your goals, and remember that each small step you take brings you one step closer to achieving them. Keep your focus on your goals, and don't forget to celebrate your progress along the way. With your positive attitude and determination, you'll be able to complete your goals in no time!"</p>
                                </div>
                        }
                </div>
            </div>

        </div>
    )
}

export default Today