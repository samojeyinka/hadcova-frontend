import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../styles/CreateCategory.css'

const CreateCategoryParts = ({ alertSuccess, alertText, handleFormSubmit, name, setName, description, setDescription }) => {
    return (
        <>
            <section className='create-category'>
                <div className='create-category-center'>
                    {alertSuccess ?
                        <div className={alertText ? 'alert alert-success' : 'hide-alert'}><span className='alert-flex'><FaCheckCircle color='green' /><p>{alertText}</p></span></div>
                        : <div className={alertText ? 'alert alert-error' : 'hide-alert'}><span className='alert-flex'><FaTimesCircle color='red' /><p>{alertText}</p></span></div>
                    }
                    <form onSubmit={handleFormSubmit}>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Category Name"
                        />
                        <br /><br />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Category Description"
                        />
                        <button className='create-category-btn' type="submit">Create category</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CreateCategoryParts