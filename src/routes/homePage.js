import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoriesLists from '../components/CategoriesLists';
import AddTasksButton from '../components/AddTasksButton';

const homePage = () => {
  return (
    <section className='home-page'>
      <CategoriesLists />
      <AddTasksButton />
    </section>
  )
}

export default homePage