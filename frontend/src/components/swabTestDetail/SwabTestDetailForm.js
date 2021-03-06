import React, { Component,useState } from "react";
import { Button,InputGroup,Form,Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import { API_BASE_URL } from "../../constants/apiConstants";
import TimePicker from 'react-time-picker';
import moment from 'moment';
import {useHistory} from "react-router-dom";


export default function SwabTestDetailForm() {

    const history = useHistory();

    const [time,setTime] = useState('12:00');
    const format = 'HH:mm';
     const [date, setDate] = useState("MON");
    //  const [msg,setMessage] = useState("");
    const [state, setState] = useState({
        message : ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
      

    const handleChange2 = (event) =>
    setDate(event);
 
    const redirectToViewSwabTestDetail = () => {
        history.push("/swabTestDetail");
    };
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(date)

        fetch(
            API_BASE_URL + "swabTestDetails/" + localStorage.getItem("email"), 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "authorization": localStorage.getItem("accessToken"),
                },
                body: JSON.stringify({
                    "alertDay": date,
                    "alertTime": time,
                    "message" : state.message,
                }),
            }
        ).then(function (response) {
            if (response.status === 200) {
                alert("Submission successful.");
                redirectToViewSwabTestDetail();
            } else {
                alert("There was an error on our side, please try again later.");
            }
        });
    }
    

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom:100}}>
            <div className="col-5 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 40, backgroundColor: 'white', borderRadius: 10}}>
             <h3>Submit Swab Test Alert Details</h3>

        <br/>
        <Form id="Form" onSubmit = {(e) => handleSubmit(e)}> 
        
            <Col><Form.Label>Date:</Form.Label></Col>
        
            <Col>
                <select value={date} onChange={(e) => handleChange2(e.target.value)}  >
                    <option  value="MON">Mon</option> 
                    <option value="TUE">Tue</option>
                    <option value="WED">Wed</option>
                    <option value="THU">Thurs</option>
                    <option value="FRI">Friday</option>
                    <option value="SAT">Sat</option>
                    <option value="SUN">Sun</option>
                </select>
            </Col>

            <p></p>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

            <Col>
                <Form.Label>Time:</Form.Label>
            </Col>

            <Col>
                <TimePicker onChange={setTime} defaultValue={moment('12:00', format)} type="text" format={format} value={time} />
            </Col>

            <p></p>

            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Details:</Form.Label>
                    <Form.Control required as="textarea" rows={5} minLength={10} maxLength={500} type="text" placeholder="Enter message details" onChange={handleChange} id="message" />
                </Form.Group>
                <Button variant="primary" type="submit" style={{marginBottom: 10}}>Submit</Button></Col>
            </Form.Group>
        </Form>
        </div>
        </div>
    );
}

