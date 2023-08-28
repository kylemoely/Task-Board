import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import Notifications from '../../components/Notifications';
import Tasks from '../../components/Tasks';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

export default function Dashboard() {

    const { auth } = useAuth();

    let userData = {};

    useEffect(() => {

        const getData = async () => {
            const response = await fetch(`/api/users/${auth.userId}`);
            const data = await response.json();
            userData = {...data};
            console.log(userData);
        }
        
        getData();
    }, [])

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