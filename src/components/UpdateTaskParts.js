import React from 'react';
import { FaTimes, FaCheckCircle, FaTimesCircle, FaRegClock } from 'react-icons/fa';
import { BiTag } from 'react-icons/bi';
import MyEditor from '../components/MyEditor';
import { taskImage } from '../assets/images';

const UpdateTaskParts = ({ goBack, alertSuccess, alertText, handleEditorChange, handleFormSubmit, newTitle, setNewTitle, newNote, formattedDateTime, newCategories, newCategory, nowCompleted, setNewCategory, setNowCompleted }) => {
    return (
        <>
            <div className='create-task-page'>
                <section className='create-task-section'>
                    <h3>Update task</h3>

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
                                    value={newTitle}
                                    onChange={(e) => { setNewTitle(e.target.value) }}
                                    required
                                />

                                <MyEditor details={newNote} setDetailsCallback={handleEditorChange} />
                                <div className='flex-icon-and-value'>
                                    <i className='icon date-icon'><FaRegClock size={20} /></i>
                                    <p>{formattedDateTime}</p>
                                </div>

                                <div className='flex-icon-and-value'>
                                    <i className='icon category-icon'><BiTag size={21} /></i>

                                    <select className='select-category'
                                        value={newCategory}
                                        onChange={(e) => { setNewCategory(e.target.value) }}
                                    >
                                        <option value=''>Category</option>
                                        {newCategories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='completed-box'>
                                    <label>Completed:</label>
                                    <input type='checkbox'
                                        name='completed'
                                        checked={nowCompleted}
                                        onChange={(e) => { setNowCompleted(e.target.checked) }}

                                    />
                                </div>

                                <button className='create-btn update-btn' type='submit'>Update</button>

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

export default UpdateTaskParts