import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './style.css';
import handleError from '../../hooks/handleError';

export default function CreateTask (props) {

    const axiosPrivate = useAxiosPrivate();
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setErrMsg('');
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let assignees = [];
            for (var option of document.getElementById('select').options){
                if(option.selected){
                    assignees.push(option.value);
                }
            }
            await axiosPrivate.post('/api/tasks/', JSON.stringify({
                title: title,
                projectId: props.projectId,
                description: description,
                assignees: assignees
            }))
            await axiosPrivate.post(`/api/notifications`, JSON.stringify({
                type: 'assignedYou',
                link: `/project/${props.projectId}`,
                recipients: assignees
            }))
            props.setReload(prev => !prev);
            handleClose();
        } catch(err){
            handleError(err, setErrMsg);
        }        
        
    }

    return (
        <div className='col-md-4 d-flex justify-content-start'>
            <button className='button modalButton h-100' onClick={handleShow}>
                New Task
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
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                                maxLength={60}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Details:</Form.Label>
                            <Form.Control as='textarea' rows={3} onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Assignees:</Form.Label>
                            <Form.Select multiple className='form-select' id='select'>
                                {props.users.map((user, i) => <option key={i} value={user.id}>{user.firstName} {user.lastName}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <p className='text-danger h6'>{errMsg}</p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" disabled = {title ? false : true} onClick={handleSubmit}>Create</Button>
                </Modal.Footer>
            </Modal>
    </div>
  );
}