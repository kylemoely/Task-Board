import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function Invite (props) {

    const axiosPrivate = useAxiosPrivate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleClose = () => {
        setEmail('');
        setErrMsg('');
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const putResponse = await axiosPrivate.put(`/api/projects/${props.projectId}/add`, JSON.stringify({ email }));
            await axiosPrivate.post('/api/notifications', JSON.stringify({
                type: 'invitedYou',
                str2: props.project,
                link: `/project/${props.projectId}`,
                recipients: [putResponse.data[1]]
            }));
            handleClose();
        } catch(err){
            if(err.response.status.toString()[0]==='4'){
                setErrMsg('User not found.');
            } else{
                setErrMsg('Something went wrong on our end. Please try again.');
            }
        }
        
        
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
                            <p className='h6 text-danger'>{errMsg}</p>
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