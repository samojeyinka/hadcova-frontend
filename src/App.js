import './App.css';
import homePage from './routes/homePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CategorizedTasks from './routes/CategorizedTasks';
import CreateTask from './routes/CreateTask';
import ReadTask from './routes/ReadTask';
import UpdateTask from './routes/UpdateTask';
import AllTasks from './routes/AllTasks';
import Header from './components/Header';
import CreateCategory from './routes/CreateCategory';
import AllCategories from './routes/AllCategories';
import UpdateCategory from './routes/UpdateCategory';


function App() {

  return (
    <Router>
      <Header/>
   <div>
    <Switch>
      
    <Route path="/" exact component={homePage}/>
    <Route path="/categories"  component={CategorizedTasks}/>
    <Route path='/create-task' component={CreateTask}/>
    <Route path='/task' component={ReadTask}/>
    <Route path='/update' component={UpdateTask}/>
    <Route path='/tasks' component={AllTasks}/>
    <Route path='/create-category' component={CreateCategory}/>
    <Route path='/all-categories' component={AllCategories}/>
    <Route path='/update-category' component={UpdateCategory}/>
    </Switch>
   </div>
   </Router>
  );
}

export default App;
