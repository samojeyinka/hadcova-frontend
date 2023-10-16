import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AllCategories.css'
import AllCategoriesParts from '../components/AllCategoriesParts';

/***********CATEGORIES LISTS PAGE***************/

const AllCategories = () => {

  /**************THE STATES **********************/
  const [categories, setCategories] = useState([]);
  const [activeTask, setActiveTask] = useState(null);


  /***********CONSUMING THE APIs********** */

  /********FETCH THE CATEGORIES FROM THE API********/

  const apiTasksURL = process.env.REACT_APP_HADCOVA_API_TASKS_URL;
  const apiCategoriesURL = process.env.REACT_APP_HADCOVA_API_CATEGORIES_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiCategoriesURL);
      const categories = response.data.categories;

      /*******IF NOT CATEGORY AVAILABLE, RETURN EMPTY ARRAY ********/
      if (categories.length === 0) {
        setCategories([]);
      } else {

        /*******INITIALLY NEW CATEGORY ADDED WILL GO THE BOTTOM, USING "reverse()" WILL BRING NEW CATEGORY CREATED TO THE TOP ******/
        setCategories([...categories].reverse());
      }
      console.log(categories)
    } catch (error) {
      console.log(error)
    }
  }


  /********* THE DOTS ICONS FUNCTION TO TOGGLE THE UPADTE & DELETE BUTTONS *******/
  const toggleTaskOptions = (taskId) => {
    setActiveTask(activeTask === taskId ? null : taskId);
    fetchCategories()
  };


  /********** CALLING THE DELETE API ROUTES  ********/
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${apiCategoriesURL}/${id}`);
      fetchCategories();
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  /********INVOKING THE FETCHCATEGORIES IN USEEFFECT ********/
  useEffect(() => {
    fetchCategories()
  }, []);


  return (
    // IMPORTED THE COMPONENT AND PASSING IN THE PROPS
    <AllCategoriesParts
      categories={categories}
      toggleTaskOptions={toggleTaskOptions}
      activeTask={activeTask}
      deleteCategory={deleteCategory}
    />
  )
}

export default AllCategories