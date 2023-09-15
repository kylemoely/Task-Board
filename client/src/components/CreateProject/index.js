import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function CreateProject () {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosPrivate.post('/api/projects/', JSON.stringify({ title: name }));
        handleClose();
        setAuth(prev => {
            return {
                ...prev,
                projects: [prev.projects, response.data]
            }
        });
        navigate(`/project/${response.data.id}`);
    }

    return (
        <div className='col-md-4 d-flex justify-content-start'>
            <button className='button modalButton' onClick={handleShow}>
                New Project
            </button>

            <Modal
                show={show}
            onHide={handleClose}
            backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Create</Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
}