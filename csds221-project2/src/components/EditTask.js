// EditTask.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTask = ({ show, handleClose, onEditTask, task }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // Set the form fields with the values of the task to update
    if (task) {
      setDescription(task.description || '');
      setDate(task.date || '');
      setPriority(task.priority || '');
    }
  }, [task]);

  const handleEditTask = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity() === true && task) {
      // Call the callback function with the task information
      onEditTask({
        id: task.id,
        title: task.title,
        description,
        date,
        priority,
        isComplete: task.isComplete,
      });

      // Close the modal
      handleClose();
      setDescription('');
      setDate('');
      setPriority('');
      setValidated(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleEditTask}>
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
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTask;
