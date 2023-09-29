import { Outlet } from 'react-router-dom';
import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import CreateProject from '../CreateProject';
import Initials from '../Initials';

const Layout = () => {

    const { auth } = useAuth();
    const { firstName, lastName, color } = auth;

    return (
        <>
        {auth.accessToken ? 
            <Container>
            <header className='row d-flex justify-content-around align-items-center mt-2'>
                <CreateProject />
                <Link to='/dashboard' className='col-12 col-md-4 notd links text-center'>Notd 📝</Link>
                <div className='d-flex col-12 col-md-4 justify-content-end align-items-center'>
                    <Initials firstName={firstName} lastName={lastName} color={color} size={21}/>
                </div>
                
            </header>
            <Outlet />
        </Container>
        :
        <Container>
            <header className='row d-flex justify-content-around mt-2'>
                <Link to='/' className='col-12 col-md-8 notd links'>Notd 📝</Link>
                <div className='d-flex col-12 col-md-3 justify-content-center align-items-center'>
                    <Link to='/signup' className='signup button links'>Get Started</Link>
                    <Link to='/login' className='login button links'>Login</Link>
                </div>
                
            </header>
            <Outlet />
        </Container>}
        </>
    )
}
export default Layout;