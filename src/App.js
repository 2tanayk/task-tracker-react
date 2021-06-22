import React from "react";
import Header from "./components/Header";
import Tasks  from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask"; 
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router,Route } from "react-router-dom";

//function based component
const App = () => {
  const name='Tanay'
  const x= true
  const [showAddTask, setShowAddTask]=useState(false)
  const [tasks, setTasks]=useState([])
  useEffect(()=>{
    const getTasks= async ()=>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

// Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  console.log(data)
  return data
}

// Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}

//add a task
const addTask = async (task) =>{
  const res=await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task)
  })
  const data = await res.json()
  setTasks([...tasks, data])
  // console.log(task)
  // const id=Math.floor(Math.random()*10000)+1
  // console.log(id)
  // const newTask={id,...task}
  // setTasks([...tasks,newTask])
}

//delete a task
const deleteTask= async (id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE'
  })
  console.log('delete',id)
  setTasks(tasks.filter((task)=> task.id !== id))
}

//Toggle Reminder
const toggleReminder= async (id)=>{
  console.log(id) 
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask),
  })

  const data = await res.json()
  setTasks(tasks.map((task)=>task.id===id ? {...task, reminder: data.reminder}:task))
}
  return (
    <Router>
    <div className="container">
      {/* <h1>Hello From React</h1>
      you can write js between {}
      <h2>Hello {name} {x?'Yes':'No'}</h2> */}
      <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <Route path='/' exact render={(props)=>(
      <>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length>0? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />): ('No Tasks To Show')}
      </>)
    }/>
      <Route path='/about' component={About}/>
      <Footer/>
    </div>
    </Router>
  );
}

//class based component
// class App extends React.Component {
//   render(){
//     return <h1>Hello from a class</h1>
//   }
// }

export default App;
