import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import TaskBox from '../TaskBox';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function Tasklist(props) {

    const axiosPrivate = useAxiosPrivate();

    const handleOnDrop = async (e) => {
        const taskId = e.dataTransfer.getData('taskId');
        let status;
        switch(props.status){
            case 'To Do':
                status = 0;
                break;
            case 'Doing':
                status = 1;
                break;
            case 'Done':
                status = 2;
                break;
        }
        await axiosPrivate.put(`/api/tasks/${taskId}`, JSON.stringify({ status }));
        props.setReload(prev => !prev);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    return(
        <div className='bordered rounded col-md-3 h-100 d-flex align-items-center flex-column' onDrop={handleOnDrop} onDragOver={handleDragOver}>
            <div className='h4 text-center'>{props.status}</div>
            {props.tasks.map((task, i) => <TaskBox key={i} task={task} />)}
        </div>
    )
}