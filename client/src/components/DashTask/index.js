import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

export default function DashTask() {
    return(
        <div className='bordered rounded col-md-3 dashTask d-flex flex-column'>
            <div className='projectName text-center h4'>
                Project 1
            </div>
            <div className='task m-1'>Write a message to someone about anythign you want</div>
        </div>
    )
}