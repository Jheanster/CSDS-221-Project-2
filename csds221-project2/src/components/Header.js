// Header.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './Header.css';
import TaskForm from './TaskForm';

const Header = ({ onAddTask }) => {
  const [showPanel, setShowPanel] = useState(false);

  const handleShow = () => setShowPanel(true);
  const handleClose = () => setShowPanel(false);

  const handleAddTaskLocal = (task) => {
    onAddTask(task);
    handleClose();
  };

  return (
    <div className="header">
      <div className="title">
        <FontAwesomeIcon icon={faBars} className="icon" />
        Frameworks
      </div>
      <Button variant='primary' onClick={handleShow}>
        <FontAwesomeIcon icon={faCirclePlus} /> Add
      </Button>

      <TaskForm show={showPanel} handleClose={handleClose} onSubmit={handleAddTaskLocal} />
    </div>
  );
};

export default Header;
