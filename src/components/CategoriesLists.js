import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/CategoriesLists.css'
import { FaTasks, FaExclamationCircle } from 'react-icons/fa';
import { BiTask, BiImageAdd, BiAddToQueue } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { BarLoader, PropagateLoader } from 'react-spinners';


const CategoriesLists = () => {

    const [categories, setCategories] = useState([]);
    const [taskCounts, setTaskCounts] = useState({}); // Use an object to store task counts for each category
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);//Check possible error from the server or network 

    const apiURL = process.env.REACT_APP_HADCOVA_API_CATEGORIES_URL;

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(apiURL);
            const categoriesData = response.data.categories;
            if (categoriesData.length === 0) {
                setCategories([]);
                setError(false)
            } else {
                setCategories([...categoriesData].reverse());
                console.log(categoriesData)
                setError(false)
            }
           
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(false);
            
        }
    }

   
    const showTasks = async (categoryId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiURL}/${categoryId}/tasks`);
            const tasks = response.data.tasks;
            console.log(tasks);
            setLoading(false)
            setError(false)

            // Store the task count for this category
            setTaskCounts((prevTaskCounts) => ({
                ...prevTaskCounts,
                [categoryId]: tasks.length,

            }));

        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }


    useEffect(() => {
        // Loop through categories and fetch task counts for each
        categories.forEach((category) => {
            showTasks(category._id);
        });
    }, [categories]); // Make sure to re-fetch task counts when categories change

    const allCategories = categories.map(category => ({
        id: category._id,
        name: category.name,
        description: category.description,
        taskCount: taskCounts[category._id] || 0.
        
    }));




    // Initialize an array of booleans to track the display state of each category's description
    const [displayDescriptions, setDisplayDescriptions] = useState(new Array(categories.length).fill(false));

    // Function to toggle the display of a specific category's description
    const toggleDescription = (index) => {
        const newDisplayDescriptions = [...displayDescriptions];
        newDisplayDescriptions[index] = !newDisplayDescriptions[index];
        setDisplayDescriptions(newDisplayDescriptions);
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <section className='category-list-section'>
            <div className='categories'>
                <h1 className='page-heading'>Lists</h1>
                <div className='loading' style={{ visibility: loading ? 'visible' : 'hidden' }}>
                    <i className='loader'><PropagateLoader color='white' /></i>
                    <h4 className='app-name'>HADCOVA</h4>
                </div>
                <div className='categories-container'>
                    {error ? (<div className='sth-wrong-alert'><div className='sth-wrong-alert-flex'><FaExclamationCircle color='#db9005' /><span><b>Something went wrong!</b><br /><small>Please check your network connection.</small></span></div></div>) :
                        
                        
                        allCategories.length === 0 ? (  <div className='empty-categories'>
                            <i className='empty-categories-icon'><BiTask /></i>
                            <div>
                                <h4>No Categories found</h4>
                                <p>You currently don't have any categories. Start planning your tasks now to stay organized and productive.</p>
                            </div>
                            <button className='empty-categories-btn'><Link to='/create-category'><BiAddToQueue color='white' size={25} /> <span>New Category</span></Link></button>
                        </div>  )


                            : (allCategories.map((category, index) => (
                                <div key={category.id} className='category-box' >
                                    <i className='categories-icon' onClick={() => toggleDescription(index)}>
                                        <FaExclamationCircle size={22} />
                                    </i>
                                    {/* category description in absolute position */}
                                    <div className={`description ${displayDescriptions[index] ? 'description-visible' : 'description-hidden'}`}>
                                        <p>{category.description}</p>
                                    </div>


                                    <a className='category-name'
                                        href={`categories?id=${category.id}&name=${category.name}`}><h3 className='category-name'>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</h3>
                                    </a>

                                    <p className='total-tasks-under-category'
                                    >{category.taskCount} {category.taskCount <= 1 ? 'Task' : 'Tasks'}</p>
                                </div>
                            )))}
                </div>
            </div>
        </section>
    )
}

export default CategoriesLists;
