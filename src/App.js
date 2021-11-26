import React, { useState, useEffect } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

export default function App () {

  const [ tasks, setTasks ] = useState([])
  const [ newTask, setNewTask ] = useState('')
  const [ isInvalid, setIsInvalid ] = useState(false)

  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTasks(data));
  },[])

  const handleSubmit = e => {
    e.preventDefault();
    if(newTask){
      let auxTasks = [...tasks]
      const newTaskObj = {
        id: auxTasks[auxTasks.length - 1].id + 1,
        title: newTask,
        completed: false
      }
      auxTasks.push(newTaskObj)
      setTasks(auxTasks)
      setIsInvalid(false)
      setNewTask('')
    }else{
      setIsInvalid(true)
    }
  }

  const handleCheckTask = index => {
    let auxTasks = [...tasks]
    auxTasks[index].completed = !auxTasks[index].completed;
    setTasks(auxTasks)
  }

  const handleDeleteTask = (e, id)=> {
    e.stopPropagation();
    setTasks(tasks.filter( item => item.id !== id))
  }

  return (
    <div className="wrapper">
      <div className="list">
        <h3>Por hacer:</h3>
        <ul className="todo">
          { tasks.map((task, index) =>
            <li key={task.id} onClick={() => handleCheckTask(index)} className={ task.completed ? "done" : null }>
              {task.title}
              <a onClick={e => handleDeleteTask(e, task.id)}>x</a>
            </li>
          )}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" id="new-task"
            placeholder="Ingresa una tarea y oprime Enter"
            className={ isInvalid ? "error" : null }
            value={newTask}
            onChange={ e => setNewTask(e.target.value) } />
        </form>
      </div>
    </div>
  )
}