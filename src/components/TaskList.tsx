import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function geradorId(){
    let idGerado = Math.floor(Math.random() * 65536) - 32768;

    let isExistId = tasks.some(task => task.id === idGerado)

    if(isExistId){
      geradorId()
    }

    return idGerado
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle.trim() === ''){
      alert('Informe o título')
      return 
    }

    const id = geradorId()
    setTasks([...tasks, {id: id, title: newTaskTitle, isComplete: false}])
    setNewTaskTitle('')

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const auxArrayTasks = [...tasks]
    let indexItem 
    let taskParaAtualizar = auxArrayTasks.find(task => task.id === id)
    if(taskParaAtualizar){
      taskParaAtualizar.isComplete = !taskParaAtualizar.isComplete
      indexItem = auxArrayTasks.indexOf(taskParaAtualizar)
      auxArrayTasks[indexItem] = taskParaAtualizar
    }

    setTasks([...auxArrayTasks])
   
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let newArrayTaksSemItem = tasks.filter(task => task.id !== id)
    setTasks([...newArrayTaksSemItem])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}