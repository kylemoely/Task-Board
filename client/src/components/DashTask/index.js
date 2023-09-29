import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { useNavigate } from 'react-router-dom';

export default function DashTask(props) {
    const navigate = useNavigate();
    const handleClick = (e) => {
        console.log('click');
        navigate(`/project/${e.target.projectid}`);
    }
    return(
        <div onClick={handleClick} projectid={props.projectId} className='bordered rounded col-md-3 dashTask d-flex flex-column'>
            <div className='projectName text-center h4'>{props.projectTitle}</div>
            <div className='task m-1'>{props.taskTitle}</div>
        </div>
    )
}