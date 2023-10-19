import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import TaskBox from '../TaskBox';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function Tasklist(props) {

    const axiosPrivate = useAxiosPrivate();
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
    const handleOnDrop = async (e) => {
        try{
            const taskId = e.dataTransfer.getData('taskId');
            const oldStatus = e.dataTransfer.getData('status');
            let taskIndex;
            let task;
            switch(oldStatus){
                case '0':
                    taskIndex = await props.toDoTasks.findIndex(task => task.id===taskId);
                    task = props.toDoTasks.splice(taskIndex, 1)[0];
                    props.setToDoTasks(props.toDoTasks);
                    break;
                case '1':
                    taskIndex = await props.doingTasks.findIndex(task => task.id===taskId);
                    task = props.doingTasks.splice(taskIndex, 1)[0];
                    props.setDoingTasks(props.doingTasks);
                    break;
                case '2':
                    taskIndex = await props.doneTasks.findIndex(task => task.id===taskId);
                    task = props.doneTasks.splice(taskIndex, 1)[0];
                    props.setDoneTasks(props.doneTasks);
                    break;
            }
            task.status = status;
            switch(status){
                case 0:
                    props.setToDoTasks(prev => [...prev, task]);
                    break;
                case 1:
                    props.setDoingTasks(prev => [...prev, task]);
                    break;
                case 2:
                    props.setDoneTasks(prev => [...prev, task]);
                    break;
            }
            const response = await axiosPrivate.put(`/api/tasks/${taskId}`, JSON.stringify({ status }));
            await axiosPrivate.post(`/api/notifications/`, JSON.stringify({
                type: 'taskMove',
                str2: props.status,
                recipients: [response.data.creator],
                link: `/project/${response.data.projectId}`
            }))
        } catch(err){
            alert('Something went wrong on our end. Please try again later.');
        }
            
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