// TaskList.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskForm from './TaskForm';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const TaskList = ({ tasks, onDelete, onEditTask }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [checkedRows, setCheckedRows] = useState([]);

  const [existingTitles, setExistingTitles] = useState([]);

  useEffect(() => {
    const titles = tasks.map((task) => task.title);
    setExistingTitles(titles);
  }, [tasks]);


  const handleShow = (task) => {
    setSelectedTask(task);
    setShowPanel(true);
  };

  const handleCheckChange = (id) => {
    setCheckedRows((prevCheckedRows) => {
      if (prevCheckedRows.includes(id)) {
        // If the row is already checked, remove it from the checkedRows
        return prevCheckedRows.filter((rowId) => rowId !== id);
      } else {
        // If the row is not checked, add it to the checkedRows
        return [...prevCheckedRows, id];
      }
    });
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
      toast.success('Task removed successfully!');
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
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
                <input
                  type="checkbox"
                  checked={checkedRows.includes(task.id)}
                  onChange={() => handleCheckChange(task.id)}
                />
              </td>
              <td>
                {!checkedRows.includes(task.id) && (
                  <Button variant="primary" onClick={() => handleShow(task)} className='buttons'>
                    <FontAwesomeIcon icon={faPenToSquare} /> Update
                  </Button>
                )}
                {' '}
                <Button onClick={() => removeRow(task.id)} variant="danger" className='buttons'>
                  <FontAwesomeIcon icon={faCircleXmark} /> Delete
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
        existingTitles={existingTitles}
      />
    </div>
  );
};

export default TaskList;