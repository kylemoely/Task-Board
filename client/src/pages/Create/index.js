import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Create(){
    return(
        <Container className='full d-flex align-items-center justify-content-center'>
            <Row className=''>
                <div className='acctForm d-flex flex-column align-items-center rounded pb-2'>
                    <div className='h2'>Create Account</div>
                    <label htmlFor='email' className='align-self-start h5'>Email</label>
                    <input type='text' placeholder='someone@somewhere.com' name='email' className='form-control'></input>
                    <label htmlFor='pwd' className='align-self-start mt-1 d-flex'><div className='h5'>Password</div><div className='smalltext'>(8-20 characters)</div></label>
                    <input type='password' placeholder='' name='pwd' className='form-control'></input>
                    <label htmlFor='conf' className='align-self-start h5 mt-1'>Confirm Password</label>
                    <input type='password' placeholder='' name='conf' className='form-control'></input>
                    <div className='button mt-2'>Sign Up</div>
                    <div className='d-flex mt-1'>
                        <div className='button'>Google</div>
                        <div className='button'>Facebook</div>
                    </div>
                    <Link to='/login' className='mt-1'>Already have an account?</Link>
                </div>
            </Row>
        </Container>
    )
}