import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import Notifications from '../../components/Notifications';
import Tasks from '../../components/Tasks';

export default function Dashboard() {
    return(
        <Container className='full mt-4'>
            <Row className='h-100 d-flex justify-content-between'>
                <Sidebar />
                <section className='col-md-9'>
                    <Notifications />
                    <Tasks />
                </section>
                
            </Row>
        </Container>
    )
};