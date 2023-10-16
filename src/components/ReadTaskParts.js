import React from 'react';
import '../styles/ReadTask.css'
import AllTasks from '../routes/AllTasks';

const ReadTaskParts = ({ title, note, categoryChoosed }) => {
    return (
        <>
            <div className='read-task-page'>
                <div className='flex-page'>
                    <div className='task-content'>
                        <h3>{title}</h3>
                        <hr className='hr-line' />
                        <div className='task-details-body' dangerouslySetInnerHTML={{ __html: note }}></div>
                        <hr />
                        <p className='active-category'>{categoryChoosed.charAt(0).toUpperCase() + categoryChoosed.slice(1)}</p>
                    </div>
                    <div className='side-bar'>
                        <AllTasks />
                    </div>

                </div>
            </div>
        </>
    )
}

export default ReadTaskParts