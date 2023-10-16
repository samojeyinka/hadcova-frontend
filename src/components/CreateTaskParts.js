import React from 'react';
import { FaRegClock, FaTag, FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { BiTag } from 'react-icons/bi';
import '../styles/CreateTask.css';
import MyEditor from '../components/MyEditor';
import { Link } from 'react-router-dom';
import { taskImage } from '../assets/images'

const CreateTaskParts = ({ goBack, alertSuccess, alertText, title, setTitle, handleEditorChange, handleFormSubmit, details, formattedDateTime, category, setCategory, categories }) => {
    return (
        <>
            <div className='create-task-page'>
                <section className='create-task-section'>
                    <h3>New task</h3>

                    <i onClick={goBack} className='back-icon'><i><FaTimes size={25} color='black' /></i></i>
                    <div className='create-and-display'>
                        <div className='create-area'>
                            {alertSuccess ?
                                <div className={alertText ? 'alert alert-success' : 'hide-alert'}><span className='alert-flex'><FaCheckCircle color='green' /><p>{alertText}</p></span></div>
                                : <div className={alertText ? 'alert alert-error' : 'hide-alert'}><span className='alert-flex'><FaTimesCircle color='red' /><p>{alertText}</p></span></div>
                            }

                            <br />
                            <form onSubmit={handleFormSubmit} className='create-task-form'>
                                <input className='title-input'
                                    placeholder='Title...'
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    required
                                />

                                <MyEditor details={details} setDetailsCallback={handleEditorChange} />
                                <div className='flex-icon-and-value'>
                                    <i className='icon date-icon'><FaRegClock size={20} /></i>
                                    <p>{formattedDateTime}</p>
                                </div>

                                <div className='flex-icon-and-value'>
                                    <i className='icon category-icon'><BiTag size={21} /></i>

                                    <select className='select-category'
                                        value={category}
                                        onChange={(e) => { setCategory(e.target.value) }}
                                    >
                                        <option value=''>Category</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button className='create-btn' type='submit'>Create</button>

                            </form>
                        </div>

                        {/* Display area */}
                        <div className='display-area'>
                            <img src={taskImage} />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CreateTaskParts