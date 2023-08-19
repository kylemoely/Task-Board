import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

export default function Sidebar() {
    return(
            <div className='bordered h-100 col-12 col-md-2 rounded d-flex flex-column align-items-center'>
                <div className='h2'>Projects</div>
                <div className='project rounded p-1 w-100 text-nowrap m-1'>Project 1</div>
                <div className='project rounded p-1 w-100 text-nowrap m-1'>Project 2</div>
                <div className='project rounded p-1 w-100 text-nowrap m-1'>Project 3</div>
                <div className='project rounded p-1 w-100 text-nowrap m-1'>Project 4</div>
                <div className='project rounded p-1 w-100 text-nowrap m-1'>Project 1</div>
                <div className='project rounded p-1 w-100 text-nowrap m-1'>Project 2</div>
                <div className='project rounded p-1 w-100 text-nowrap m-1'>Project 3</div>
                <div className='project rounded p-1 w-100 text-nowrap m-1'>Project 4</div>
            </div>

    )
}