import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Row } from 'react-bootstrap';
import Notification from '../Notification';

export default function Notifications({ notifications }) {



    return(
            <Row style={{backgroundColor: 'white'}} className='bordered h-50 rounded d-flex flex-column'>
                <div className='h2'>Notifications</div>
                {notifications.map((not, i) => {
                    return <Notification key={i} notification={not}/>
                })}
                <div className='button w-25 align-self-center text-center'>View All</div>
            </Row>
    );
}