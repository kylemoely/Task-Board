import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Row } from 'react-bootstrap';
import DashTask from '../DashTask';


export default function Tasks(props) {
    
    return(
            <Row className='bordered h-50 rounded'>
                <div className='h2'>Tasks</div>
                <Row className='h-75 m-1 d-flex justify-content-start'>
                    {props.tasks.map(task => {
                        return <DashTask projectId={task.projectId} key={task.id} projectTitle={task.project.title} taskTitle={task.title}/>
                    })}
                </Row>
            </Row>
    );
}