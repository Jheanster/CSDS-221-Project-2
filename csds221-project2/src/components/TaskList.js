// TaskList.js
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskForm from './TaskForm';
import moment from 'moment';

const TaskList = ({ tasks, onDelete, onAddTask, onEditTask }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleShow = (task) => {
    setSelectedTask(task);
    setShowPanel(true);
  };

  const handleClose = () => {
    setShowPanel(false);
    setSelectedTask(null);
  };

  const handleEditTaskLocal = (task) => {
    onEditTask(task);
    handleClose();
  };



  const removeRow = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      const dataCopy = [...tasks];
      dataCopy.splice(taskIndex, 1);
      onDelete(dataCopy);
      toast.success('Task removed successfully!', { position: 'bottom-left' });
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Is Complete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{moment(task.date).format('MM/DD/YYYY')}</td>
              <td>{task.priority}</td>
              <td>
                <input type="checkbox" checked={task.isComplete} readOnly />
              </td>
              <td>
                <Button variant="info" onClick={() => handleShow(task)}>
                  Update
                </Button>{' '}
                <Button onClick={() => removeRow(task.id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TaskForm
        show={showPanel}
        handleClose={handleClose}
        onSubmit={handleEditTaskLocal}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskList;
