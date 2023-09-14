import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import ToDo from '../../components/ToDo';
import Doing from '../../components/Doing';
import Done from '../../components/Done';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function Project() {

    const params = useParams();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        const getProjectData = async () => {
            const response = await axiosPrivate.get(`/api/projects/${params.projectId}`);
            setIsLoading(false);
            if(response.status===403){
                navigate('/login');
            } else if(response.status===401){
                return;
            } else{
                setProjectData({...response.data})
                setIsAuthed(true);
                console.log(response.data);
                console.log(projectData);
            }
        }

        getProjectData();
    }, [])

    return(
        <>{isLoading ? <p>Loading...</p> : isAuthed ? <Container className='full mt-4'>
            <Row className='h-100 justify-content-between'>
                <Sidebar />
                <section className='col-md-9 d-flex flex-column'>
                    <div className='projectTitle h2 text-center'>{projectData.title}</div>
                    <Row className='h-100 d-flex justify-content-around'>
                        <ToDo tasks={projectData.toDoTasks}/>
                        <Doing tasks={projectData.doingTasks}/>
                        <Done tasks={projectData.doneTasks}/>
                    </Row>
                </section>
            </Row>
        </Container> :
        <p>You are not authorized!</p>    
    }
        </>
    )
}