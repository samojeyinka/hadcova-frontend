import React, { useEffect, useState } from 'react';
import axios, { formToJSON } from 'axios';
import CreateTaskParts from '../components/CreateTaskParts';

const CreateTask = () => {
  // State variables
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [alertText, setAlertText] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formattedDateTime, setFormattedDateTime] = useState('');

  const apiTasksURL = process.env.REACT_APP_HADCOVA_API_TASKS_URL;
  const apiCategoriesURL = process.env.REACT_APP_HADCOVA_API_CATEGORIES_URL;

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(apiTasksURL);
      const tasks = response.data.tasks;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiCategoriesURL);
      const fetchedCategories = response.data.categories;
      setCategories(fetchedCategories); // Set categories in state
    } catch (error) {
      console.log(error);
    }
  }



  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date();
    try {
      await axios.post(apiTasksURL, {
        title,
        details,
        category,
      });
      fetchTasks();
      setTitle('');
      setDetails('');
      setCategory('');
      setAlertText('Task added successfully.');
      setAlertSuccess(true);
    } catch (error) {
      setAlertText('Cannot add task. Please try again later.');
      setError('Oops! Check your network connection');
      setAlertSuccess(false);
      console.log(error);
    }
    setTimeout(() => {
      setAlertText('');
    }, 3000);
  }


  // Use useEffect to update the formatted date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const month = currentDate.toLocaleString('en-US', { month: 'short' });
      const day = currentDate.getDate();
      const time = currentDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      });
      const formattedString = `${month} ${day}, ${time}`;
      setFormattedDateTime(formattedString);
    }, 1000); // Update every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle changes in the 'details' state (for the editor)
  const handleEditorChange = (value) => {
    setDetails(value);
  };


  // Use useEffect to fetch tasks and categories on component mount
  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);
  const goBack = () => {
    window.history.back();
  }

  return (
    <CreateTaskParts
      goBack={goBack}
      details={details}
      alertSuccess={alertSuccess}
      alertText={alertText}
      handleFormSubmit={handleFormSubmit}
      title={title}
      setTitle={setTitle}
      handleEditorChange={handleEditorChange}
      formattedDateTime={formattedDateTime}
      category={category}
      setCategory={setCategory}
      categories={categories}
      setCategories={setCategories}

    />
  )
}

export default CreateTask;

