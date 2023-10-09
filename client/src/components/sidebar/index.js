import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const { auth } = useAuth();

    return(
            <div style={{backgroundColor: 'white', boxShadow: '0px 2px 4px 2px rgb(138, 138, 138)'}} className='bordered h-100 col-12 col-md-2 rounded d-flex flex-column align-items-center'>
                <div className='h2'>Projects</div>
                {auth.projects.map((project, i) => <Link to={`/project/${project.id}`} className='project links rounded p-1 w-100 text-nowrap text-center m-1' key={i} style={{ boxShadow: '0px 2px 4px 2px rgb(138, 138, 138)'}}>{project.title}</Link>)}
            </div>

    )
}