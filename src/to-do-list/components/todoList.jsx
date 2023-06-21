import React, { useState, useEffect } from 'react'
import axios from 'axios';

function TodoList() {
  const [todolist, setTodoList] = useState([])
  const [newTask, setNewTask ] = useState("")
  const addTaskUrl = "http://localhost:8080/todolist/addTask"
  const deleteUrl = "http://localhost:8080/todolist/deleteTask/";
  const viewAllTaskUrl = "http://localhost:8080/todolist/viewAllTask"

  
  const getAllTask = () => {
    // console.log("Get all task called")
    axios.get(viewAllTaskUrl)
    .then((response) => 
      setTodoList(response.data)
      )
  }


  const addTask = () => {
    console.log("Add task called")
    const task = {
    id: todolist.length === 0? 1: todolist[todolist.length - 1].id + 1,
    taskName: newTask
  };

    axios
    .post(addTaskUrl,{task: newTask})
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error);
    });
    
  }

  const handleChange = (event) => {
     setNewTask(event.target.value)
  }

  const removeTask = (id) => {
    const deleteTaskUrl = deleteUrl + id;
    axios
    .delete(deleteTaskUrl)
    .then(() => {
      const updatedList = todolist.filter((task) => (task.id !== id))
      setTodoList(updatedList)
    })
    .catch((error) => {
      console.error(error);
    })
  }
  useEffect(()=>{
    getAllTask()
  },[todolist])

 
  return (
    <>
    <input type='text' value={newTask} onChange={handleChange}/>
    <button onClick={addTask}>Add Task</button>
    <div className='listOfTask'> 
      {todolist.map((item) => (
        <ul key={item.id}>
          {item.task}
          <button onClick={() => removeTask(item.id)}>x</button>
        </ul>
      ))}
    </div>
    </>
  )
}

export default TodoList;