import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Create(){

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20})/;

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [conf, setConf] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confFocus, setConfFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [regStep, setRegStep] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const result = emailRegex.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = passwordRegex.test(password);
        setValidPassword(result);
        const match = password === conf;
        setValidMatch(match);
    }, [password, conf]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`/users`);
            const data = await response.json();
            if(data.includes(email)){
                setErrMsg('Email already in use.');
            }else{
                setRegStep(1);
            }
        } catch(err){
            setErrMsg('Something went wrong on our end. Please try again later.');
        }
    }

    const handleSubmitTwo = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password, firstName, lastName }),
                headers: { 'Content-Type': 'application/json' }
            });
            if(!response.ok){
                throw new Error('Network down');
            }
            navigate('/login');
        } catch(err){
            setErrMsg('Something went wrong on our end. Please try again later.');
        }
        
    }


        return(
        <Container className='full d-flex align-items-center justify-content-center'>
            <Row>
                {regStep===0 ?
                <form style={{backgroundColor: 'white', boxShadow: '0px 2px 4px 2px rgb(138, 138, 138)'}} onSubmit={handleSubmit} className='acctForm d-flex flex-column align-items-center rounded pb-2'>
                    <div className='h2'>Create Account</div>
                    <label htmlFor='email' className='align-self-start h5 d-flex'>Email
                        <p className={email && !validEmail ? 'm-1' : 'offscreen'}>❌</p>
                        <p className={validEmail ? 'm-1' : 'offscreen'}>✔️</p>
                    </label>
                    <input 
                        type='text' 
                        autoComplete='off' 
                        placeholder='someone@somewhere.com' 
                        onChange={(e) => setEmail(e.target.value)} 
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        name='email' 
                        className='form-control'>
                    </input>
                    <p className={emailFocus && email && !validEmail ? 'align-self-start p-1 text-danger h6' : 'offscreen'}>Invalid email address</p>
                    <label htmlFor='pwd' className='align-self-start mt-1 d-flex'>
                        <div className='h5'>Password</div>
                        <p className={password && !validPassword ? 'm-1 h5' : 'offscreen'}>❌</p>
                        <p className={validPassword ? 'm-1 h5' : 'offscreen'}>✔️</p>
                    </label>
                    <input 
                        type='password' 
                        placeholder='' 
                        onChange={(e) => setPassword(e.target.value)}  
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        name='pwd' 
                        className='form-control'>
                    </input>
                    <div className={passwordFocus && password && !validPassword ? 'smalltext align-self-start text-danger' : 'offscreen'}>
                        <p>Password must contain:</p>
                        <ul>
                            <li>One lowercase letter</li>
                            <li>One uppercase letter</li>
                            <li>One number</li>
                            <li>One special character (!, @, #, etc.)</li>
                            <li>8-20 characters</li>
                        </ul>
                    </div>
                    <label htmlFor='conf' className='align-self-start h5 mt-1 d-flex'>Confirm Password
                        <p className={conf && !validMatch ? 'm-1' : 'offscreen'}>❌</p>
                        <p className={conf && validMatch ? 'm-1' : 'offscreen'}>✔️</p>
                    </label>
                    <input 
                        type='password' 
                        placeholder='' 
                        onChange={(e) => setConf(e.target.value)} 
                        onFocus={() => setConfFocus(true)}
                        onBlur={() => setConfFocus(false)}
                        name='conf' 
                        className='form-control'>
                    </input>
                    <p className={confFocus && conf && !validMatch ? 'h6 align-self-start text-danger' : 'offscreen'}>Passwords must match</p>
                    { errMsg ? <div className='h6 text-danger mt-1 align-self-start ms-1'>{errMsg}</div> : <></> }
                    <button type='submit' className='button mt-2' disabled={!validEmail || !validPassword || !validMatch ? true : false}>Sign Up</button>
                    <div className='d-flex mt-1'>
                        <div className='button'>Google</div>
                        <div className='button'>Facebook</div>
                    </div>
                    <Link to='/login' className='mt-1'>Already have an account?</Link>
                </form> : 
                <form  style={{backgroundColor: 'white', boxShadow: '0px 2px 4px 2px rgb(138, 138, 138)'}} onSubmit={handleSubmitTwo} className='acctForm d-flex flex-column align-items-center rounded pb-2'>
                    <div className='h2'>Welcome!</div>
                    <div className='h5 mt-3 text-center'>Finish signing up by entering your full name</div>
                    <div className='mt-4 d-flex justify-content-around'>
                        <div>
                            <label htmlFor='firstName' className='h6'>First Name:</label>
                            <input type='text' autoComplete='off' placeholder='Jake' name='firstName' className='form-control' onChange={(e) => setFirstName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor='LastName' className='h6'>Last Name:</label>
                            <input type='text' autoComplete='off' placeholder='Long' name='firstName' className='form-control' onChange={(e) => setLastName(e.target.value)}></input>
                        </div>
                    </div>
                    { errMsg ? <div className='h6 text-danger mt-1 align-self-start ms-1'>{errMsg}</div> : <></> }
                    <button className='button mt-5' disabled={firstName && lastName ? false : true}>Get Started</button>
                    </form>}
                
                
            </Row>
        </Container>
    )
    }