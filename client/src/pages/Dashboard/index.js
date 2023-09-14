import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import Notifications from '../../components/Notifications';
import Tasks from '../../components/Tasks';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function Dashboard() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const response = await axiosPrivate.get(`/api/users/`);
            setUserData({...response.data})
            setIsLoading(false);
        }
        getData();
    }, [])

    return(

        <>{ isLoading ? <p> Loading... </p> : 
        <Container className='full mt-4'>
        <Row className='h-100 d-flex justify-content-between'>
            <Sidebar props={userData.projects} />
            <section className='col-md-9'>
                <Notifications notifications={userData.notifications} />
                <Tasks tasks={userData.tasks} />
            </section>
            
        </Row>
    </Container>
        }
        </>
        
    )
};