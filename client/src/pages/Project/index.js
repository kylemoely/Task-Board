import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import TaskList from '../../components/TaskList';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CreateTask from '../../components/CreateTask';
import Invite from '../../components/Invite';
import Welcome from '../../components/Welcome';

export default function Project() {

    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [projectData, setProjectData] = useState({});
    const [toDoTasks, setToDoTasks] = useState([]);
    const [doingTasks, setDoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthed, setIsAuthed] = useState(false);
    const [isInvited, setIsInvited] = useState(false);
    const [reload, setReload] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const getProjectData = async () => {
            try{
                const response = await axiosPrivate.get(`/api/projects/${params.projectId}`);
                switch(response.status){
                    case 200:
                        setIsAuthed(true);
                        break;
                    case 202:
                        setIsInvited(true);
                        break;
                }
                setProjectData({users: response.data.users, title: response.data.title});
                setToDoTasks(response.data.toDoTasks);
                setDoingTasks(response.data.doingTasks);
                setDoneTasks(response.data.doneTasks);
            } catch(err){
                if(err.response.status===401){
                    navigate('/login');
                } else{
                    setErrMsg('Something went wrong on our end. Please try again later.');
                }
            } finally{
                setIsLoading(false);
            }
            
        }
        getProjectData();
    }, [params, reload])

    return(
        <>{isLoading ? <p>Loading...</p> : errMsg ? <p className='h4 text-center mt-2 text-danger'>{errMsg}</p> : isInvited ? <Welcome setReload={setReload} setIsAuthed={setIsAuthed} setIsInvited={setIsInvited} projectId={params.projectId} project={projectData.title}/> : isAuthed ? <Container className='full mt-4'>
            <Row className='h-100 justify-content-between'>
                <Sidebar />
                <section className='col-md-9 d-flex flex-column'>
                    <div style={{backgroundColor: 'white', boxShadow: '0px 2px 4px 2px rgb(138, 138, 138)'}} className='projectTitle h2 align-self-center text-center bordered rounded ps-5 pb-1 pe-5' >{projectData.title}</div>
                    <div className='m-1 d-flex justify-content-between'>
                        <CreateTask setReload={setReload} users={projectData.users || []} projectId={params.projectId}/>
                        <Invite project={projectData.title} projectId={params.projectId}/>
                    </div>
                    <Row className='h-100 d-flex justify-content-around'>
                        <TaskList setReload={setReload} status='To Do' setToDoTasks={setToDoTasks} setDoingTasks={setDoingTasks} setDoneTasks={setDoneTasks} toDoTasks={toDoTasks} doingTasks={doingTasks} doneTasks={doneTasks} tasks={toDoTasks || []}/>
                        <TaskList setReload={setReload} status='Doing' setToDoTasks={setToDoTasks} setDoingTasks={setDoingTasks} setDoneTasks={setDoneTasks} toDoTasks={toDoTasks} doingTasks={doingTasks} doneTasks={doneTasks} tasks={doingTasks || []}/>
                        <TaskList setReload={setReload} status='Done' setToDoTasks={setToDoTasks} setDoingTasks={setDoingTasks} setDoneTasks={setDoneTasks} toDoTasks={toDoTasks} doingTasks={doingTasks} doneTasks={doneTasks} tasks={doneTasks || []}/>
                    </Row>
                </section>
            </Row>
        </Container> :
        <p className='text-center h2 mt-5'>You do not have access to this page.</p>    
    }
        </>
    )
}