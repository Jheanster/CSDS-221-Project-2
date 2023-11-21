// App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import TaskList from './components/TaskList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    // Add a unique id to the new task
    const taskWithId = { ...newTask, id: uuidv4() };
    setTasks([...tasks, taskWithId]);
  };
  

  const handleDelete = (data) => {
    setTasks(data);
  };

  const handleUpdate = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };


  return (
    <div>
      <Header tasks={tasks} onAddTask={handleAddTask} />
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      <TaskList tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate} onEditTask={handleUpdate} />
    </div>
  );



}

export default App;
