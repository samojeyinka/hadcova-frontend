import React from 'react';
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa'

const UpdateCategoryParts = ({alertSuccess,alertText,handleFormSubmit,newName,newDescription,setNewDescription,setNewName}) => {
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
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Category Name"
        />
        <br/><br/>
        <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Category Description"
        />
        <button className='create-category-btn' type="submit">Update</button>
    </form>
    </div>
</section> 
    </>
  )
}

export default UpdateCategoryParts