import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReadTaskParts from '../components/ReadTaskParts';


const ReadTask = () => {

    /**********THE STATES *************/
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');

    /***********ACCESS THE URL PARAMS ************/
    const params = new URLSearchParams(window.location.search);
    /******** GET THE ONE WITH ID **************/
    const id = params.get('id')
    /******** GET THE ONE WITH CATEGORY **************/
    const categoryChoosed = params.get('category')

    const apiTasksURL = process.env.REACT_APP_HADCOVA_API_TASKS_URL;
    const apiCategoriesURL = process.env.REACT_APP_HADCOVA_API_CATEGORIES_URL;

    /************* GET EACH TASKS CONTENT *************/
    const getTaskInfo = async () => {
        try {
            const response = await axios.get(`${apiTasksURL}/${id}`);
            const task = response.data.task;
            console.log(task);
            setTitle(task.title);
            setNote(task.details);
            setCategory(task.category)
        } catch (error) {
            console.log(error)
        }
    }

    /***********INVOKE INTO USEEFFECT *************/

    useEffect(() => {
        getTaskInfo()
    }, [id])

    return (
        <ReadTaskParts
            title={title}
            note={note}
            categoryChoosed={categoryChoosed}

        />
    )
}

export default ReadTask