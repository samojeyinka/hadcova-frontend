import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AllTasksParts from '../components/AllTasksParts';


const AllTasks = () => {

  /*************THE STATES **************/
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0)
  const [activeTask, setActiveTask] = useState(null);

  /******************* CONSUMING APIs STARTED ***********/

  const apiTasksURL = process.env.REACT_APP_HADCOVA_API_TASKS_URL;
  const apiCategoriesURL = process.env.REACT_APP_HADCOVA_API_CATEGORIES_URL;

  const showTasks = async () => {
    try {
      const response = await axios.get(apiTasksURL);
      const tasks = response.data.tasks;
      console.log(tasks)
      if (tasks.length === 0) {
        setTasks([])
      } else {
        // Reverse the order of tasks to display new tasks at the top
        setTasks([...tasks].reverse());
      };
      // setCategorizedTasks(tasks);

      setTaskCount(tasks.length);

    } catch (error) {

    };
  };


  /*********** THE TOGGLE FUNCTION FOR THE EACH TASK *********/
  const toggleTaskOptions = (taskId) => {
    setActiveTask(activeTask === taskId ? null : taskId);
    showTasks();
  };

  //DELETE
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiTasksURL}/${id}`);
      showTasks()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    showTasks()
  }, []);



  return (
    //IMPORTING THE ALLTASKSPARTS COMPONENT THEN PASSED IN THE PROPS
    <AllTasksParts
      goBack={goBack}
      taskCount={taskCount}
      tasks={tasks}
      toggleTaskOptions={toggleTaskOptions}
      activeTask={activeTask}
      deleteTask={deleteTask}
    />
  );
};
export default AllTasks