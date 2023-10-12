import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

export default function Welcome (props) {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [show, setShow] = useState(true);

    const handleClose = async () => {
        await axiosPrivate.put(`/api/projects/${props.projectId}/deny`);
        navigate('/dashboard');
        setShow(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        handleClose();
    }

    return (
        <div className='col-md-4 d-flex justify-content-start'>
            <Modal
                show={show}
            onHide={handleClose}
            backdrop="static"
                keyboard={false}
            >
                <Modal.Header className='d-flex justify-content-center'>
                    <Modal.Title>Welcome!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='h4 text-center'>You have been invited to join this project:</div>
                    <div className='h5 text-center'>{props.project}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Deny
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Accept</Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
}