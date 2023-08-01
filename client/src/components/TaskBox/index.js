import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

export default function TaskBox() {
    return(
        <div className='bordered rounded w-100 m-1 d-flex flex-column' draggable='true'>
            <div className='assignees d-flex justify-content-end'>
                <div className='assignee bg-danger m-1'>KM</div>
                <div className='assignee bg-danger m-1'>KM</div>
            </div>
            <div className='task m-1'>Write a message to someone about anythign you want</div>
        </div>
    )
}