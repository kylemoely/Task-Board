import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Login(){
    return(
        <Container className='full d-flex align-items-center justify-content-center'>
            <Row className=''>
                <div className='acctForm d-flex flex-column align-items-center rounded pb-2'>
                    <div className='h2'>Login</div>
                    <label for='email' className='align-self-start h5'>Email</label>
                    <input type='text' placeholder='someone@somewhere.com' name='email' className='form-control'></input>
                    <label for='pwd' className='align-self-start mt-1 d-flex'><div className='h5'>Password</div></label>
                    <input type='password' placeholder='' name='pwd' className='form-control'></input>
                    <div className='button mt-2'>Login</div>
                    <div className='d-flex mt-1'>
                        <div className='button'>Google</div>
                        <div className='button'>Facebook</div>
                    </div>
                    <Link to='/signup' className='mt-1'>Don't have an account?</Link>
                </div>
            </Row>
        </Container>
    )
}