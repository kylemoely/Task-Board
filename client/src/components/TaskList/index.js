import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import TaskBox from '../TaskBox';

export default function Tasklist(props) {
    return(
        <div className='bordered rounded col-md-3 h-100 d-flex align-items-center flex-column'>
            <div className='h4 text-center'>{props.status}</div>
            {props.tasks.map(task => <TaskBox task={task} />)}
        </div>
    )
}