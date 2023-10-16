import React from 'react';
import { FaAngleLeft, FaEllipsisV, FaEllipsisH, FaHeadphones, FaHeadphonesAlt, FaPencilAlt, FaTrash, FaTasks, FaBook } from 'react-icons/fa'
import { BiTask, BiAddToQueue } from 'react-icons/bi';
import '../styles/CategorizedTasks.css';
import { Link } from 'react-router-dom';
import AddTasksButton from '../components/AddTasksButton'

const CategorizedTasksParts = ({ goBack, handleClick, click, currentCategoryName, taskCount, categorizedTasks, deleteAllTasks, deleteTask, toggleTaskOptions, activeTask }) => {
    return (
        <>
            <div className='categorized-tasks'>
                <section className='cat-tasks-sec'>
                    <nav className='category-nav'>
                        <div className='nav-menu'>
                            <i onClick={goBack}><i className='nav-icon'><FaAngleLeft size={25} /></i></i>
                            <i className='nav-icon' onClick={handleClick}><FaEllipsisV size={20} /></i>
                        </div>
                        {/* ----delete menu----- */}
                        <ul className={click ? 'delete-menu active' : 'delete-menu'}>
                            <FaTrash />
                            <li onClick={deleteAllTasks}>Delete all</li>
                        </ul>
                        <div className='category-details'>
                            <i className='category-icon'><FaBook /></i>
                            <h2 className='category-name'>{currentCategoryName.charAt(0).toUpperCase() + currentCategoryName.slice(1)}</h2>
                            <div><p className='category-total-tasks'>{taskCount} {taskCount <= 1 ? 'Task' : 'Tasks'}</p></div>
                        </div>
                    </nav>
                    <div className='tasks-container'>
                        {categorizedTasks.length === 0 ? (
                            <div className='empty-tasks'>
                                <i className='empty-tasks-icon'><BiTask /></i>
                                <div>
                                    <h4>No tasks found</h4>
                                    <p>You currently don't have any tasks. Start planning your tasks now to stay organized and productive.</p>
                                </div>
                                <button className='empty-tasks-btn'><Link to='/create-task'><BiAddToQueue color='white' size={25} /> <span>New Task</span></Link></button>
                            </div>
                        ) : (
                            categorizedTasks.map((task) => (
                                <div className={`each-task-box ${task.completed && 'task-completed'}`} >
                                    <div key={task._id}>
                                        <Link to={`task?id=${task._id}&category=${currentCategoryName}`}><p className='task-title'>{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</p></Link>
                                    </div>
                                    <span className='task-options-icon'>
                                        <FaEllipsisV size={13} onClick={() => toggleTaskOptions(task._id)} />
                                        {/* Each task update and delete nav */}
                                        {activeTask === task._id && (
                                            <div className='each-task-nav'>
                                                <div className='each-task-options'>
                                                    <Link to={`update?id=${task._id}`} className='flex-options'>
                                                        <FaPencilAlt color='var(--text-gray)' />
                                                        <span>Update</span>
                                                    </Link>

                                                    <p className='flex-options' data-id={task._id} onClick={() => deleteTask(task._id)}>
                                                        <FaTrash color='var(--text-gray)' />
                                                        <span>Delete</span>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </span>

                                </div>
                            ))
                        )}
                    </div>

                    <AddTasksButton />
                </section>
            </div>
        </>
    );
}

export default CategorizedTasksParts