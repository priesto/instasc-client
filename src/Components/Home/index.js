import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Icon } from 'antd';

import './index.css';

import Logo from '../../Images/timeitgram-logo.png';
import Mockup from '../../Images/mackbookair-w-reflection-1440.png';

const Home = () => (
    <div className="home">
        <section className="hero-section">
            <div className="hero-section-logo-container">
                <img src={Logo} alt="logo" />
            </div>
            <div className="hero-section-text">
                <h1>Cloud Based Instagram Scheduler</h1>
                <h1>Try it now! 3 days free trial</h1>
            </div>
            <Button size="large" type="danger" className="hero-section-cta">
                <Link to="/app">Get started</Link>
            </Button>
            <Row className="hero-section-mockup" type="flex" justify="center">
                <Col xs={24} sm={18} md={16} lg={14}>
                    <div style={{marginBottom: '-120px'}}><img src={Mockup} alt="mockup" /></div>
                </Col>
            </Row>
        </section>
        <section className="howitworks-section">
            <h1>How it Works</h1>
            <Row>
                <Col xs={24} sm={8}>
                    <Icon style={{fontSize: '38px'}} type="cloud-upload-o" />
                    <h3>Upload your media</h3>
                    <p className="howitworks-section-p">Upload your picture to our servers by using your web browser</p>
                </Col>
                <Col xs={24} sm={8}>
                    <Icon style={{fontSize: '38px'}} type="clock-circle-o" />
                    <h3>Choose a date</h3>
                    <p className="howitworks-section-p">Choose the date and time at which you want to post your media to Instagram</p>
                </Col>
                <Col xs={24} sm={8}>
                    <Icon style={{fontSize: '38px'}} type="smile-o" />
                    <h3>Forget & Enjoy</h3>
                    <p className="howitworks-section-p">Enjoy while our automated system take care of everything. At the given time, we'll post the picture to Instagram for you</p>
                </Col>
            </Row>
        </section>
        <section className="features-section">
            <h1>Features</h1>
            <Row>
                <Col xs={24} sm={8}>
                    <Icon style={{fontSize: '38px'}} type="safety" />
                    <h3>Secure</h3>
                </Col>
                <Col xs={24} sm={8}>
                    <Icon style={{fontSize: '38px'}} type="layout" />
                    <h3>Easy to use</h3>
                </Col>
                <Col xs={24} sm={8}>
                    <Icon style={{fontSize: '38px'}} type="cloud-o" />
                    <h3>Cloud based</h3>
                </Col>
            </Row>
        </section>
        <section className="price-section">
            <h1>Everything's included</h1>
            <p>Unlimited accounts | Unlimited scheduling | Unlimited storage</p>
            <div className="price-section-pricing">
                <span>$</span>
                <span style={{fontSize: '36px'}}>8</span>
                <span>/mo</span>
            </div>
            <Button type="primary" size="large"><Link to="/app">Get started</Link></Button>
        </section>
    </div>
)

export default Home;