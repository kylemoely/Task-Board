import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import Initials from '../Initials';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import trash from '../../assets/trash.png';
import edit from '../../assets/edit-icon.png';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function TaskBox({ task }) {
    const firstUser = task.users[0];
    const axiosPrivate = useAxiosPrivate();

    const [editMode, setEditMode] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    const [taskDesc, setTaskDesc] = useState(task.description)
    const { auth } = useAuth();

    const isCreator = task.creator===auth.userId;

    const handleOnDrag = (e, taskId, status) => {
        e.dataTransfer.setData('taskId', taskId);
        e.dataTransfer.setData('status', status);
    }

    const handleSave = async () => {
        const response = await axiosPrivate.put(`/api/tasks/${task.id}`, JSON.stringify({
            title: taskTitle,
            description: taskDesc
        }));
        console.log(response);
        setEditMode(false);
    }

    return(
        <div style={{backgroundColor: 'white', boxShadow: '0px 2px 2px 1px rgb(138, 138, 138)'}} className='bordered rounded w-100 m-1 d-flex flex-column' draggable={ editMode ? 'false' : 'true'} onDragStart={(e) => handleOnDrag(e, task.id, task.status.toString())}>
            <div className='assignees d-flex justify-content-end'>
                {task.users.length>1 ? 
                <div className='d-flex align-items-center'>
                    <Initials size={14} color={firstUser.color} firstName={firstUser.firstName} lastName={firstUser.lastName}/>
                    <p>+{task.users.length-1}</p>
                </div> : 
                task.users.length===1 ? 
                <Initials size={14} color={firstUser.color} firstName={firstUser.firstName} lastName={firstUser.lastName}/> : <></>}
            </div>
            
            { editMode ? 
            <div>
                <input type='text' className='w-75 m-1 fs-4' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                <input type='text' className='task m-1' value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)}/>
            </div> :
            <div>
                <div className='fw-bold m-1 fs-4'>{taskTitle}</div>
                <div className='task m-1'>{taskDesc}</div>
            </div>}
            { !isCreator ? <></> : 
                          !editMode ? 
                          <div className='d-flex m-1 justify-content-end align-items-center'>
                            <img src={edit} className='hover' onClick={() => setEditMode(true)}/>
                            <img src={trash} className='hover h-75 ms-1' />
                          </div> : 
                          <button onClick={handleSave}>Save</button>}
        </div>
    )
}