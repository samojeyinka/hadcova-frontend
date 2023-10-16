import axios from 'axios'
import React, { useEffect, useState } from 'react';
import CreateCategoryParts from '../components/CreateCategoryParts';

const CreateCategory = () => {

    /***** THE STATES ***************/
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertText, setAlertText] = useState('');


    const apiTasksURL = process.env.REACT_APP_HADCOVA_API_TASKS_URL;
    const apiCategoriesURL = process.env.REACT_APP_HADCOVA_API_CATEGORIES_URL;

    /************FETCH THE CATEGORIES **************/
    const fetchCategories = async () => {
        try {
            const response = await axios.get(apiCategoriesURL);
            const categories = response.data.categories
        } catch (error) {
            console.log(error)
        }
    }


    /************* POST FUNCTION  *************/
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setAlertSuccess(false)
        try {
            await axios.post(apiCategoriesURL, {
                name,
                description

            });

            setName('')
            setDescription('');
            setAlertSuccess(true);
            setAlertText('Category created successfully')
        } catch (error) {
            console.log(error);
            setAlertSuccess(false);
            setAlertText('Unable to create category')
        }

        /**********THE ALERT SHOULD DISAPPEAR AFTER 3 SECS *******/
        setTimeout(() => {
            setAlertText('');
        }, 3000)
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    return (
        <CreateCategoryParts
            alertSuccess={alertSuccess}
            alertText={alertText}
            handleFormSubmit={handleFormSubmit}
            setName={setName}
            description={description}
            setDescription={setDescription}
        />
    )
}

export default CreateCategory