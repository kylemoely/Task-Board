import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function defaultHeader() {
    return (
        <Container>
            <header className='row d-flex justify-content-around mt-2'>
                <Link to='/' className='col-12 col-md-8 notd links'>Notd 📝</Link>
                <div className='d-flex col-12 col-md-3 justify-content-center align-items-center'>
                    <Link to='/signup' className='signup button links'>Get Started</Link>
                    <Link to='/login' className='login button links'>Login</Link>
                </div>
            </header>
        </Container>
    )
}