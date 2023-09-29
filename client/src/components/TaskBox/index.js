import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import Initials from '../Initials';

export default function TaskBox({ task }) {
    const firstUser = task.users[0];
    return(
        <div className='bordered rounded w-100 m-1 d-flex flex-column' draggable='true'>
            <div className='assignees d-flex justify-content-end'>
                {task.users.length>1 ? <div><Initials size={14} color={firstUser.color} firstName={firstUser.firstName} lastName={firstUser.lastName}/>+{task.users.length-1}</div> : task.users.length===1 ? <Initials size={14} color={firstUser.color} firstName={firstUser.firstName} lastName={firstUser.lastName}/> : <></>}
            </div>
            <div className='fw-bold m-1 fs-4'>{task.title}</div>
            <div className='task m-1'>{task.description}</div>
        </div>
    )
}