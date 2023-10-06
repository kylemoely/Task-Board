import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function Invite (props) {

    const axiosPrivate = useAxiosPrivate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');

    const handleClose = () => {
        setEmail('');
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        handleClose();
    }

    return (
        <div>
            <button className='button modalButton h-100' onClick={handleShow}>
                Invite
            </button>

            <Modal
                show={show}
            onHide={handleClose}
            backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Invite User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>User Email:</Form.Label>
                            <Form.Control
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" disabled = {email ? false : true} onClick={handleSubmit}>Invite</Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
}