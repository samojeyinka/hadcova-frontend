import React from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisV, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { BiTask, BiAddToQueue } from 'react-icons/bi';

const AllCategoriesParts = ({ categories, toggleTaskOptions, activeTask, deleteCategory }) => {
    return (
        <>

            <section className='categories-lists-page'>
                <div className='categories-lists-page-center'>
                    {categories.length === 0 ? (
                        <div className='empty-categories'>
                            <i className='empty-categories-icon'><BiTask /></i>
                            <div>
                                <h4>No Categories found</h4>
                                <p>You currently don't have any categories. Start planning your tasks now to stay organized and productive.</p>
                            </div>
                            <button className='empty-categories-btn'><Link to='/create-category'><BiAddToQueue color='white' size={25} /> <span>New Category</span></Link></button>
                        </div>
                    ) : (
                        // DESTRUCTURING THE CATEGORIES

                        categories.map((category) => (
                            <div className={`each-task-box ${category.completed && 'task-completed'}`}>
                                <div key={category._id}>
                                    <p className='task-title'>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</p>
                                </div>
                                <span className='task-options-icon'>
                                    <FaEllipsisV size={13} onClick={() => toggleTaskOptions(category._id)} />

                                    {/* Each TASK UPDATE AND DELETE NAV */}
                                    {activeTask === category._id && (
                                        <div className='each-task-nav'>
                                            <div className='each-task-options'>
                                                <Link to={`update-category?id=${category._id}`} className='flex-options'>
                                                    <FaPencilAlt color='var(--text-gray)' />
                                                    <span>Update</span>
                                                </Link>

                                                <p className='flex-options' data-id={category._id} onClick={() => deleteCategory(category._id)}>
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

            </section>
        </>
    )
}

export default AllCategoriesParts