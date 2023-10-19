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
import handleError from '../../hooks/handleError';

export default function Dashboard() {

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try{
                const response = await axiosPrivate.get(`/api/users/`);
                setUserData({...response.data})
            } catch(err){
                handleError(err, setErrMsg)
            } finally{
                setIsLoading(false);
            }
            
        }
        getData();
    }, [reload])

    return(

        <>{ isLoading ? <p> Loading... </p> : 
        <Container className='full mt-4'>
        <Row className='h-100 d-flex justify-content-between'>
            <Sidebar projects={userData.projects} />
            <section className='col-md-9'>
                <Notifications setReload={setReload} notifications={userData.notifications} />
                <Tasks tasks={userData.tasks} />
            </section>
            
        </Row>
    </Container>
        }
        </>
        
    )
};