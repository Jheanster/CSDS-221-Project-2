import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faBan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import './TaskForm.css'


const TaskForm = ({ show, handleClose, onSubmit, task, existingTitles = [] }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');
  const [validated, setValidated] = useState(false);
  const [isDuplicateTitle, setIsDuplicateTitle] = useState(false);
  


  useEffect(() => {
    // Set the form fields with the values of the task to update
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDate(task.date || '');
      setPriority(task.priority || '');
    }
  
  }, [task]);

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);

    // Check for duplicate titles when the title changes
    if (existingTitles.includes(newTitle)) {
      setIsDuplicateTitle(true);
    } else {
      setIsDuplicateTitle(false);
    }
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || isDuplicateTitle) {
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity() === true && !isDuplicateTitle) {
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
        position: 'bottom-right',
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
        <Modal.Title>{task ? (
            <>
              <FontAwesomeIcon icon={faPenToSquare} /> Edit Task
              
            </>
            ) : (
              <>
              <FontAwesomeIcon icon={faCirclePlus} /> Add Task
                
              </>
              
            )}
          </Modal.Title>
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
                onChange={(e) => handleTitleChange(e.target.value)}
                isInvalid={isDuplicateTitle}
              />
              <Form.Control.Feedback type="invalid">
                {isDuplicateTitle && 'Must have a unique title!'}
                {!isDuplicateTitle && 'Title is required!'}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          {/* Description input */}
          <Form.Group controlId="description" className="form-group">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type='text'
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
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={moment().format('YYYY-MM-DD')}
            />
            <Form.Control.Feedback type='invalid'>
              Date is Required!
            </Form.Control.Feedback>
          </Form.Group>

          {/* Priority input */}
          <Form.Group controlId="priority" className="form-group">
            <Form.Label>Priority</Form.Label>
            <div>
              <Form.Check
                name='priority'
                type="radio"
                label="Low"
                value="Low"
                checked={priority === 'Low'}
                onChange={() => setPriority('Low')}
                inline
                required
              />
              <Form.Check
                name='priority'
                type="radio"
                label="Med"
                value="Med"
                checked={priority === 'Med'}
                onChange={() => setPriority('Med')}
                inline
                required
              />
              <Form.Check
                name='priority'
                type="radio"
                label="High"
                value="High"
                checked={priority === 'High'}
                onChange={() => setPriority('High')}
                inline
                required
              />
              <Form.Control.Feedback type='invalid'>
                Priority is Required!
              </Form.Control.Feedback>
            </div>

           
          </Form.Group>
          

          <Button variant="primary" type="submit" size='lg'>
            <FontAwesomeIcon icon={faCirclePlus} />
            {task ? ' Update' : ' Add'}
          </Button> {' '}
          <Button variant="danger" size='lg' onClick={handleClose}>
            <FontAwesomeIcon icon={faBan} /> Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
