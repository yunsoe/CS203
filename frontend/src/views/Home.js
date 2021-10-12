import React, { Component } from "react";
import { Button } from "react-bootstrap";

import Header from '../components/Home/Header';
import Features from '../components/Home/Features';
import About from '../components/Home/About';
import Presentation from '../components/Home/Presentation';
import Contact from '../components/Home/Contact';
import aboutimage from '../components/Home/images/Frame 19.png';
import aboutimage1 from '../components/Home/images/download.png';
import '../components/Home/home.css';



export default function Home() {
    return(
        <div id = "body">
            <div id = "main">
            <Header/>
            {/* <Features/> */}
            {/* <About image={aboutimage} title='News' button='Go to News'/>
            <Presentation/>
            <About image={aboutimage1} title='Profile' button='Go to Profile'/> */}
            <Contact/>
            </div>
        </div>
    );
}