import React,{useState,useEffect} from 'react'
import './todo.css'

function Task({task,index,completeTask,removeTask}) {
        return(
        <div
        className="task"
        style={{ textDecoration :task.completed ? "line-through" : ""}} 
        >
          {task.title}
          <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
          <button onClick={() => completeTask(index)}>Complete</button>
        </div>
    )
}


function CreateTask({addTask}){
    const [value,setValue] = useState('')

    const handleSubmit = e =>{
        e.preventDefault();
        if(!value) return;
    
        addTask(value)
        setValue("")

    }
  return(
      <form onSubmit={handleSubmit}>
          <input
             type="text"
             className="input"
             value={value}
             placeholder="add a new task"
             onChange= {e =>setValue(e.target.value)}
          />
      </form>
  )
   
}


function Todo() {
   
    const [tasks,setTasks] = useState([
        {
            title:"grab some pizza",
            completed:true
        },
        {
            title:"do your workout",
            completed:true
        },
        {
            title:"hangout with friends",
            completed:true
        }
    ])
    

    const [tasksRemaining, setTasksRemaining] = useState(0);


    useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) });
    const addTask = title =>{
        const newTasks = [...tasks,{title,completed : false}]
        setTasks(newTasks)
    }
    
    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div className="todo-container">
            <div className="header"> TODO - ITEMS </div>
            <div className="header">pending items  ({tasksRemaining})</div>
            <div className="tasks">
                {tasks.map((task,index) =>(
                    <Task  
                        task={task}
                        index={index}
                        key={index}
                          removeTask={removeTask}
                        completeTask={completeTask}
                     />
                ))
                }
            </div>
            <div className="create-task">
                <CreateTask  addTask={addTask} />
                
            </div>
            
        </div>
            
        
    )
}


export default Todo;