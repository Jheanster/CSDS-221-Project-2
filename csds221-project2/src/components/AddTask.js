// AddTask.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './AddTask.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AddTask = ({ show, handleClose, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState(''); 
    const [validated, setValidated] = useState(false);

    const handleAddTask = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
          event.stopPropagation();
        }

        setValidated(true);

        if (form.checkValidity() === true) {
            // Call the callback function with the task information
            onAddTask({
                title,
                description,
                date,
                priority
            });

            // Close the modal
            handleClose();
            setTitle('');
            setDescription('');
            setDate('');
            setPriority('');
            setValidated(false)
        }
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Framework</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Update the state when input values change */}
        <Form noValidate validated={validated} onSubmit={handleAddTask}>
          {/* Title input */}
          <Form.Group controlId="title" className='form-group'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Title is Required!
            </Form.Control.Feedback>
          </Form.Group>

          {/* Description input */}
          <Form.Group controlId="description" className='form-group'>
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
            <Form.Group controlId="date" className='form-group'>
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group>

            {/* Priority input */}
            <Form.Group controlId="priority" className='form-group'>
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
          <Container>
            <Row>
              <Col md={{ offset: 7 }}>
                <Button variant="primary" size='lg' type="submit">Add</Button>
                <Button variant="danger" size='lg' onClick={handleClose}>Cancel</Button>
              </Col>
            </Row>
          </Container>
          
          
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTask;
