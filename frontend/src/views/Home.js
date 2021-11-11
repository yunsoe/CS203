import React, { Component } from "react";
import { Button } from "react-bootstrap";

import Header from '../components/Home/Header';
import Featuresbox from '../components/Home/Featuresbox';
import newspaper from '../components/Home/images/newspaper.png';
import swabtest from '../components/Home/images/swabtest.png';
import calendar from '../components/Home/images/calendar.png';
import profile from '../components/Home/images/profile.png';
import feedback from '../components/Home/images/feedback.png';
import '../components/Home/home.css';
import { Redirect } from "react-router";
import {useHistory} from "react-router-dom";




export default function Home() {

    const history = useHistory();

    const redirectToEvents = () => {
        history.push("/viewEvents");
    }
    const redirectToNews = () => {
        history.push("/regulations");
    }
    const redirectToFeedback = () => {
        history.push("/feedback");
    }
    const redirectToSwabTests = () => {
        if (localStorage.getItem("authority") !== "ROLE_ADMIN") {
            history.push("/swabTestUserView");
        } else {
            history.push("/swabTestHistory");
        }
    }


    return(
        <div id = "body">
            {/* <div id = "main"> */}
            <Header/>
            {/* </div> */}
         <div id='features'>
         <div className='a-container'>
            <button class="btn btn-default" onClick = {() => {redirectToEvents();}}>
             <Featuresbox image={calendar} title="Company Events" />
             </button>
             <button class="btn btn-default" onClick = {() => {redirectToNews();}}>
             <Featuresbox image={newspaper} title="Latest Industry-Relevant News" />
             </button>
             <button class="btn btn-default" onClick = {() => {redirectToFeedback();}}>
             <Featuresbox image={feedback} title="Submit Feedback" />
             </button>
             <button class="btn btn-default" onClick = {() => {redirectToSwabTests();}}>
             <Featuresbox image={swabtest} title="Upcoming SwabTests" />
             </button>
         </div>
            {/* <Contact/> */}
            </div>
        </div>
    );
}