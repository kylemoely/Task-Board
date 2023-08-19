import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function Login(){

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // const from = location.state.from.pathname || '/dashboard';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();// data gives access token and user id
            const accessToken = data.accessToken;
            // const userId = data.user.id;
            // const userEmail = data.user.email;
            console.log(accessToken);
            // setAuth({ userId, accessToken, userEmail });
            // navigate(from, { replace: true }); 
        } catch(err){
            console.log(err)
        }
        
        
        
        
    }

    return(
        <Container className='full d-flex align-items-center justify-content-center'>
            <Row className=''>
                <form className='acctForm d-flex flex-column align-items-center rounded pb-2' onSubmit={handleLogin}>
                    <div className='h2'>Login</div>
                    <label htmlFor='email' className='align-self-start h5'>Email</label>
                    <input type='text' placeholder='someone@somewhere.com' name='email' className='form-control' onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor='pwd' className='align-self-start mt-1 d-flex'><div className='h5'>Password</div></label>
                    <input type='password' placeholder='' onChange={(e) => setPassword(e.target.value)}name='pwd' className='form-control'></input>
                    <button className='button mt-2' disabled={email && password ? false : true} >Login</button>
                    <div className='d-flex mt-1'>
                        <div className='button'>Google</div>
                        <div className='button'>Facebook</div>
                    </div>
                    <Link to='/signup' className='mt-1'>Don't have an account?</Link>
                </form>
            </Row>
        </Container>
    )
}