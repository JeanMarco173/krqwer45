import React, { useState } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

export default function App () {

  const [ tasks, setTasks ] = useState([
    { id: 1, name: "Sacar la ropa", done: false },
    { id: 2, name: "Hacer la cama", done: true },
    { id: 3, name: "Leer un rato", done: false }
  ])
  const [ newTask, setNewTask ] = useState('')
  const [ isInvalid, setIsInvalid ] = useState(false)

  const handlePressEnter = e => {
    e.preventDefault();
    if(newTask){
      let auxTasks = [...tasks]
      const newTaskObj = {
        id: auxTasks[auxTasks.length - 1].id + 1,
        name: newTask,
        done: false
      }
      auxTasks.push(newTaskObj)
      setTasks(auxTasks)
      setIsInvalid(false)
      setNewTask('')
    }else{
      setIsInvalid(true)
    }
  }

  const handlePressTask = index => {
    let auxTasks = [...tasks]
    auxTasks[index].done = !auxTasks[index].done;
    setTasks(auxTasks)
  }

  return (
    <div className="wrapper">
      <div className="list">
        <h3>Por hacer:</h3>
        <ul className="todo">
          { tasks.map((task, index) => <li key={task.id} onClick={ () => handlePressTask(index)} className={ task.done ? "done" : null }>{task.name}</li>) }
        </ul>
        <form onSubmit={handlePressEnter}>
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