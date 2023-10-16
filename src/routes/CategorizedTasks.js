import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CategorizedTasksParts from '../components/CategorizedTasksParts';


const CategorizedTasks = () => {

  /*********************  THE STATES *********/

  const [categorizedTasks, setCategorizedTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0)
  const [activeTask, setActiveTask] = useState(null);
  const [click, setClick] = useState(false);

  /********** ACCESS THE URL PATH***********/
  const params = new URLSearchParams(window.location.search);
  /******** GET THE CHARACTERS  RELATED TO ID  OBJECT**********/
  const id = params.get('id');
  /******** GET THE CHARACTERS  RELATED TO NAME OBJECT **********/
  const currentCategoryName = params.get('name');


  /************FETCH ALL TASKS UNDER A CATEGORY**********/

  const apiCategoriesURL = process.env.REACT_APP_HADCOVA_API_CATEGORIES_URL;

  const showTasks = async () => {
    try {
      const response = await axios.get(`${apiCategoriesURL}/${id}/tasks`);
      const tasks = response.data.tasks;
      console.log(tasks)
      if (tasks.length === 0) {
        setCategorizedTasks([])
      } else {
        // Reverse the order of tasks to display new tasks at the top
        setCategorizedTasks([...tasks].reverse());
      }

      // setCategorizedTasks(tasks);

      setTaskCount(tasks.length);

    } catch (error) {

    }
  }

  /************** EACH TASK UPDATE AND DELETE TOGGLE OPTIIONS ***********/

  const toggleTaskOptions = (taskId) => {
    setActiveTask(activeTask === taskId ? null : taskId);

    showTasks()
  };

  const apiTasksURL = process.env.REACT_APP_HADCOVA_API_TASKS_URL;
  //DELETE
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiTasksURL}/${id}`);
      showTasks();
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }


  //DELETE ALL TASKS IN THE CATEGORY AT ONCE

  const deleteAllTasks = async () => {
    try {
      await axios.delete(`${apiCategoriesURL}/${id}/tasks`)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  /*********** GO BACK TO PREVIOUS PAGE *********/
  const goBack = () => {
    window.history.back()
  }

  /**********THE NAV  ****************/

  const handleClick = () => setClick(!click);



  /**********INVOKE THE SHOWTASKS FUNCTION INTO USEEFFECT */
  useEffect(() => {
    showTasks()
  }, []);





  return (
    <CategorizedTasksParts
      goBack={goBack}
      handleClick={handleClick}
      click={click}
      deleteAllTasks={deleteAllTasks}
      currentCategoryName={currentCategoryName}
      taskCount={taskCount}
      categorizedTasks={categorizedTasks}
      activeTask={activeTask}
      deleteTask={deleteTask}
      toggleTaskOptions={toggleTaskOptions}
    />

  );
};
export default CategorizedTasks