import React from 'react'
import { Link } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa'
import '../styles/AddTasksButton.css'

const AddTasksButton = () => {
  return (
    <div className='floating-plus-btn'>
        <button className='add-task-btn'>
            <Link to='/create-task'>
            <i className='add-task-icon'>
             +
            </i>
            </Link>
        </button>
    </div>
  )
}

export default AddTasksButton