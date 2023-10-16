import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateCategoryParts from '../components/UpdateCategoryParts';

const UpdateCategory = () => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription,] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');
  const [alertText, setAlertText] = useState('');

  /********** ACCESS THE URL PARAMS *****************/
  const params = new URLSearchParams(window.location.search);
  /************FIND ONE WITH ID  *************/
  const id = params.get('id');

  const apiTasksURL = process.env.REACT_APP_HADCOVA_API_TASKS_URL;
  const apiCategoriesURL = process.env.REACT_APP_HADCOVA_API_CATEGORIES_URL;

  /************** GET SINGLE CATEGORY USING ITS ID **********/
  const getSingleCategory = async () => {
    try {
      const { data: { category } } = await axios.get(`${apiCategoriesURL}/${id}`)
      const { name, description } = category
      setNewName(name);
      setNewDescription(description);
    } catch (error) {
      console.log(error);
    }
  }

  /*************** THE UPDATE *********************/
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: { category } } = await axios.put(`${apiCategoriesURL}/${id}`, {
        name: newName,
        description: newDescription
      });
      const { name, description } = category
      setNewName(name);
      setNewDescription(description);
      setAlertSuccess(true);
      setAlertText('Update successfull');
    } catch (error) {
      console.log(error);
      setAlertSuccess(false);
      setAlertText('Unable to update category');
    }
    setTimeout(() => {
      setAlertText('');
    }, 3000)
  }
  useEffect(() => {
    getSingleCategory();
  }, [])
  return (
    <UpdateCategoryParts
      alertSuccess={alertSuccess}
      alertText={alertText}
      handleFormSubmit={handleFormSubmit}
      newName={newName}
      setNewName={setNewName}
      newDescription={newDescription}
      setNewDescription={setNewDescription}
    />
  )
}

export default UpdateCategory