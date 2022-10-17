import { useEffect, useState } from 'react'
import { VscCheck, VscChromeClose, VscAdd } from 'react-icons/vsc'
function App() {
    const API_DIR = 'http://localhost:3002'
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        GetTasks()
    }, [])

    const GetTasks = () => {
        fetch(API_DIR + '/get')
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error('Error: ', err))
    }

    const doneTask = async (id) => {
        const data = await fetch(API_DIR + '/upd/' + id, {
            method: 'PUT',
        }).then((res) => res.json())

        setTasks((tasks) =>
            tasks.map((task) => {
                if (task._id === data._id) {
                    task.done = data.done
                }

                return task
            })
        )
    }

    const deleteTask = async (id) => {
        const data = await fetch(API_DIR + '/del/' + id, {
            method: 'DELETE',
        }).then((res) => res.json())
        setTasks((tasks) => tasks.filter((task) => task._id !== data._id))
    }

    const addNewTask = async () => {
        const data = await fetch(API_DIR + '/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: newTask,
            }),
        }).then((res) => res.json())

        setTasks([...tasks, data])

        setNewTask('')
    }

    return (
        <div className='app'>
            <h1>
                ToDo <VscCheck />
            </h1>
            <div className='add'>
                <input
                    type='text'
                    placeholder='Tarea'
                    onChange={(e) => {
                        setNewTask(e.target.value)
                    }}
                    value={newTask}
                />
                <button type='button' onClick={addNewTask}>
                    <VscAdd />
                </button>
            </div>

            <div className='list'>
                {tasks.length > 0 ? (
                    <ul>
                        {tasks.map((task) => (
                            <li
                                className={task.done ? 'complete' : ''}
                                key={task._id}
                            >
                                <div className='txt'>{task.task}</div>
                                <div className='btns'>
                                    <button
                                        className='res'
                                        disabled={task.done}
                                        onClick={() => doneTask(task._id)}
                                    >
                                        <VscCheck />
                                    </button>{' '}
                                    <button
                                        className='del'
                                        onClick={() => deleteTask(task._id)}
                                    >
                                        <VscChromeClose />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='empty'>No hay tareas</p>
                )}
            </div>
        </div>
    )
}

export default App
