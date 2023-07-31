import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Row } from 'react-bootstrap';

export default function Tasks() {
    return(
            <Row className='bordered h-50 rounded'>
                <div className='h2'>Tasks</div>
                <Row className='h-75 d-flex justify-content-start'>
                    <div className='rounded bordered col-3 m-1 h-100'>
                        <div className='h4 projectName text-center'>Project 1</div>
                        <div className='task'>Write a message to someone</div>
                    </div>
                    <div className='rounded bordered col-3 m-1 h-100'>
                        <div className='h4 projectName text-center'>Project 1</div>
                    </div>
                    <div className='rounded bordered col-3 m-1 h-100'>
                        <div className='h4 projectName text-center'>Project 1</div>
                    </div>
                    
                </Row>
            </Row>
    );
}