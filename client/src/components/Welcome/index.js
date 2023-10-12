import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Welcome (props) {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [show, setShow] = useState(true);

    const handleClose = async () => {
        setShow(false);
    }

    const handleDeny = async () => {
        await axiosPrivate.put(`/api/projects/${props.projectId}/deny`);
        handleClose();
        navigate('/dashboard');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosPrivate.put(`/api/projects/${props.projectId}/accept`);
        setAuth(prev => {
            return {
                ...prev,
                projects: [...prev.projects, response.data]
            }
        })
        props.setReload(prev => !prev);
        props.setIsInvited(false);
        props.setIsAuthed(true);
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
                    <Button variant="secondary" onClick={handleDeny}>
                        Deny
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Accept</Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
}