import React from "react";
import Header from "./components/Header";
import Tasks  from "./components/Tasks";
import { useState } from "react";
import AddTask from "./components/AddTask"; 

//function based component
const App = () => {
  const name='Tanay'
  const x= true
  const [showAddTask, setShowAddTask]=useState(false)
  const [tasks, setTasks]=useState([
    {
      id:1,
      text:'Eat',
      day:'Feb 5th at 2:30',
      reminder:true
    },
    {
      id:2,
      text:'Sleep',
      day:'Feb 5th at 2:30',
      reminder:true
    },
    {
      id:3,
      text:'Play Video Games',
      day:'Feb 5th at 2:30',
      reminder:true
    }
  ])

  //add a task
  const addTask = (task) =>{
    console.log(task)
    const id=Math.floor(Math.random()*10000)+1
    console.log(id)
    const newTask={id,...task}
    setTasks([...tasks,newTask])
  }

  //delete a task
  const deleteTask=(id)=>{
    console.log('delete',id)
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder=(id)=>{
    console.log(id) 
    setTasks(tasks.map((task)=>task.id===id ? {...task, reminder: !task.reminder}:task))
  }
  return (
    <div className="container">
      {/* <h1>Hello From React</h1>
      you can write js between {}
      <h2>Hello {name} {x?'Yes':'No'}</h2> */}
      <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length>0? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />): ('No Tasks To Show')}
    </div>
  );
}

//class based component
// class App extends React.Component {
//   render(){
//     return <h1>Hello from a class</h1>
//   }
// }

export default App;
