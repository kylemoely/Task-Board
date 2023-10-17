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
        const response = await axiosPrivate.put(`/api/tasks/${taskId}`, JSON.stringify({ status }));
        await axiosPrivate.post(`/api/notifications/`, JSON.stringify({
            type: 'taskMove',
            str2: props.status,
            recipients: [response.data.creator],
            link: `/project/${response.data.projectId}`
        }))
        props.setReload(prev => !prev);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    return(
        <div className='bordered rounded tasklist col-md-3 h-100 d-flex align-items-center flex-column' onDrop={handleOnDrop} onDragOver={handleDragOver} style={{backgroundColor: 'white', boxShadow: '0px 2px 4px 2px rgb(138, 138, 138)'}}>
            <div className='h4 text-center'>{props.status}</div>
            {props.tasks.map((task, i) => <TaskBox key={i} task={task} />)}
        </div>
    )
}