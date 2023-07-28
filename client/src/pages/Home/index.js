import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Row } from 'react-bootstrap';

export default function Home(){
    return(
        <Container className='full d-flex align-items-center'>
            <Row className='d-flex justify-content-around align-items-center'>
                <div className='col-12 col-md-6 display-3 text-center'>Everything you need to do in one place</div>
                <div className='col-12 col-md-5 text-center display-3'>This will be an animated image of office workers</div>'
            </Row>
        </Container>
    );
}