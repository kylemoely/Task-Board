import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Row } from 'react-bootstrap';

export default function Notifications() {
    return(
            <Row className='bordered h-50 rounded d-flex flex-column'>
                <div className='h2'>Notifications</div>
                <div className='notification rounded p-1'>You have a new message!</div>
                <div className='notification rounded p-1'>You have a new message!</div>
                <div className='notification rounded p-1'>You have a new message!</div>
                <div className='notification rounded p-1'>You have a new message!</div>
                <div className='notification rounded p-1'>You have a new message!</div>
                <div className='button w-25 align-self-center text-center'>View All</div>
            </Row>
    );
}