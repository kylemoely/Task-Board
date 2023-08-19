import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import ToDo from '../../components/ToDo';
import Doing from '../../components/Doing';
import Done from '../../components/Done';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Project() {

    const params = useParams();
    const { auth } = useAuth();

    return(
        auth.userProjects.includes(params.projectId) ?
        <Container className='full mt-4'>
            <Row className='h-100 justify-content-between'>
                <Sidebar />
                <section className='col-md-9 d-flex flex-column'>
                    <div className='projectTitle h2 text-center'>Project 1</div>
                    <Row className='h-100 d-flex justify-content-around'>
                        <ToDo />
                        <Doing />
                        <Done />
                    </Row>
                </section>
            </Row>
        </Container>
        : <div>You do not have access to this page.</div>
    )
}