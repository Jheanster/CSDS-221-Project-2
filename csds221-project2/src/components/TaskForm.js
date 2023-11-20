import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TaskForm.css'

const TaskForm = ({ show, handleClose, onSubmit, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // Set the form fields with the values of the task to update
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDate(task.date || '');
      setPriority(task.priority || '');
    }
  }, [task]);

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity() === true) {
      // Call the callback function with the task information
      onSubmit({
        id: task ? task.id : undefined,
        title,
        description,
        date,
        priority,
        isComplete: task ? task.isComplete : false,
      });

      toast.success(`${task ? 'Task updated' : 'Task added'} successfully!`, {
        position: 'bottom-left',
      });

      // Close the modal
      handleClose();
      setTitle('');
      setDescription('');
      setDate('');
      setPriority('');
      setValidated(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className='task-form-header'>
        <Modal.Title>{task ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleTaskSubmit}>
          {/* Conditionally render the Title input */}
          {!task && (
            <Form.Group controlId="title" className="form-group">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">Title is Required!</Form.Control.Feedback>
            </Form.Group>
          )}

          {/* Description input */}
          <Form.Group controlId="description" className="form-group">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Description is Required!
            </Form.Control.Feedback>
          </Form.Group>

          {/* Date input */}
          <Form.Group controlId="date" className="form-group">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={moment().format('YYYY-MM-DD')}
            />
          </Form.Group>

          {/* Priority input */}
          <Form.Group controlId="priority" className="form-group">
            <Form.Label>Priority</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Low"
                value="Low"
                checked={priority === 'Low'}
                onChange={() => setPriority('Low')}
                inline
                required
              />
              <Form.Check
                type="radio"
                label="Med"
                value="Med"
                checked={priority === 'Med'}
                onChange={() => setPriority('Med')}
                inline
                required
              />
              <Form.Check
                type="radio"
                label="High"
                value="High"
                checked={priority === 'High'}
                onChange={() => setPriority('High')}
                inline
                required
              />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" size='lg'>
            {task ? 'Update' : 'Add'}
          </Button> {' '}
          <Button variant="danger" size='lg' onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
