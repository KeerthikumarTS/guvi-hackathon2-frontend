import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../landingPage/landingPage.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { blueGrey } from '@mui/material/colors';

const LandingPage = () => {
    const navigate = useNavigate();

    function goHome(){
        navigate('/home')
    }
    return (
        <div style={{background: 'rgb(0,55,190)radial-gradient(circle, rgba(0,55,190,1) 0%, rgba(0,18,46,1) 100%)', height: "100vh"}}>

            <Row>
                <Col >
                    <div className='headContainer' >
                        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                            <Navbar.Brand href="/" style={{fontSize:'30px'}}> <i className="bi bi-shop"></i> EQUIPMENT RENTAL </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                                <Nav className="me-auto" style={{ color: 'black', fontSize: 'medium' }}>
                                    <Nav.Link  href="/home">  Home <i className="bi bi-house-door-fill"></i></Nav.Link>
                                    <Nav.Link  href="/contact_us">Contact <i className="bi bi-telephone-fill"></i></Nav.Link>
                                    <Nav.Link  href="/login">Login <i className="bi bi-door-open-fill"></i></Nav.Link>
                                    <Nav.Link  href="#">About us <i className="bi bi-question-diamond-fill"></i></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </Col>
            </Row>

            <Row style={{display:'flex', justifyContent:'center'}}>
                <Col lg={6} style={{margin:'15px'}}>
                    <div style={{color: "white"}}>
                    <p style={{fontSize:'40px' , fontWeight:'bold', textAlign:'center', marginTop:"30px"}}>Rent Top-Quality Equipment Today!</p>
                    <p style={{textAlign:'justify',fontSize:'20px',lineHeight:'35px', marginTop:"50px"}}>
                    Step into our rental hub and discover a world of convenience!<span style={{color:'black', fontWeight:'bolder'}}> From premium furniture to state-of-the-art electronics, reliable appliances, and versatile tools</span>, find everything you need for your projects and events. Say goodbye to ownership hassles and rent with ease. With our user-friendly service, elevate your endeavors and achieve success without compromise. Explore our extensive collection and start renting today!
                    </p>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                    <button className='btn btn-dark' style={{ marginTop:'10px'}} onClick={goHome}> Explore <i class="bi bi-search"></i> </button>
                    </div>
                </Col>
            </Row>

          
        </div>
    )
}

export default LandingPage