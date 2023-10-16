import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UpdateTaskParts from '../components/UpdateTaskParts';


const UpdateTask = () => {

  /***********THE STATES  *****************/
  const [newTitle, setNewTitle] = useState('');
  const [newNote, setNewNote] = useState('');
  const [nowCompleted, setNowCompleted] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [formattedDateTime, setFormattedDateTime] = useState('');
  const [newCategories, setNewCategories] = useState([]);

  /************ ACCESS THE URL PARAMS ********/
  const params = new URLSearchParams(window.location.search);
  /************ GET THE ID CHARACTERS **************/
  const id = params.get('id');

  const apiTasksURL = process.env.REACT_APP_HADCOVA_API_TASKS_URL;
  const apiCategoriesURL = process.env.REACT_APP_HADCOVA_API_CATEGORIES_URL;

  /******** GET SINGLE TASK **************/
  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const { data: { task } } = await axios.get(`${apiTasksURL}/${id}`)
        const { title, details, completed, category } = task;
        console.log(title, details, completed, category);
        setNewTitle(title);
        setNewNote(details);
        setNowCompleted(completed);
        setNewCategory(category);
      } catch (error) {
        console.log(error)
      }
    }
    getSingleTask()
  }, [id]);


  // Function to fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiCategoriesURL);
      const fetchedCategories = response.data.categories;
      setNewCategories(fetchedCategories); // Set categories in state
      console.log(fetchCategories)
    } catch (error) {
      console.log(error);
    }
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


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updateBTN = document.querySelector('.update-btn');
    updateBTN.textContent = 'Updating...';

    try {
      const { data: { task } } = await axios.patch(`${apiTasksURL}/${id}`, {
        title: newTitle,
        details: newNote,
        category: newCategory,
        completed: nowCompleted,
      });
      const { title, details, category, completed } = task

      setNewTitle(title);
      setNewNote(details);
      setNewCategory(category);
      setNowCompleted(completed);
      setAlertSuccess(true)
      setAlertText('Update sucessfull')
    } catch (error) {
      console.log(error);
      setAlertSuccess(false);
      setAlertText('Unable to update task')

    }
    updateBTN.textContent = 'Update';
    setTimeout(() => {
      setAlertText('');
    }, 3000);

  }

  const handleEditorChange = (value) => {
    setNewNote(value);
  };


  const goBack = () => {
    window.history.back();
  }
  useEffect(() => {
    fetchCategories()
  })
  return (
    <UpdateTaskParts
      goBack={goBack}
      alertSuccess={alertSuccess}
      alertText={alertText}
      handleFormSubmit={handleFormSubmit}
      newTitle={newTitle}
      setNewTitle={setNewTitle}
      newNote={newNote}
      handleEditorChange={handleEditorChange}
      formattedDateTime={formattedDateTime}
      newCategories={newCategories}
      setNewCategories={setNewCategories}
      setNewCategory={setNewCategory}
      newCategory={newCategory}
      nowCompleted={nowCompleted}
      setNowCompleted={setNowCompleted}

    />
  )
}

export default UpdateTask