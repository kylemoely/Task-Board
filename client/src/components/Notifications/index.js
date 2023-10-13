import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Row } from 'react-bootstrap';
import Notification from '../Notification';

export default function Notifications({ notifications }) {



    return(
            <Row style={{backgroundColor: 'white', boxShadow: '0px 2px 4px 2px rgb(138, 138, 138)'}} className='bordered h-50 rounded d-flex flex-column'>
                <div className='h2'>Notifications</div>
                <div className='h-75 overflow-scroll mb-1'>
                    {notifications.map((not, i) => {
                        return <Notification key={i} notification={not}/>
                    })}
                </div>
                <div className='button w-25 align-self-center text-center'>View All</div>
            </Row>
    );
}