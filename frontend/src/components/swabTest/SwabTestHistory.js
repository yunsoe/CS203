import axios from "axios";
import React, { useState,useEffect } from "react";
import { Button,InputGroup,FormControl, Col, Card,ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";


export default function SwabTestForm() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [userEmail, setUserEmail] = useState("");


    const handleChange1 = (date) => {
        setStartDate(date)
    }

    const handleChange2 = (date) => {
        setEndDate(date)
      }

    const handleSubmit1 = ()=> {
     loadData1();
    }

    const handleSubmit2= ()=> {
        loadData2();
       }


    const item = (todo) => (
        <ListGroup.Item key={data.id}>
          <Card>
            <Card.Body>
              <Card.Text>{data.swabResult}</Card.Text>
              <Card.Subtitle>{data.actaulSwabTestResult}</Card.Subtitle>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      );

    function loadData2(){
        const date = format(startDate ,'yyyy-MM-dd')
        const date2 = format(endDate ,'yyyy-MM-dd')
        axios.get(`/swabTest/${date}/${date2}`)
    }

    function loadData1(){
        axios.get(`/user/${userEmail}/swabTests`).then(response=>{
            setData(response.data)
        })
    }

    // useEffect(()=> {
    //     loadData1();
    // },[]);

    return(
        <div>
        <div>View employees swab test history</div>
        <InputGroup className="mb-3">
        <form onSubmit={handleSubmit1}>
            <label>Enter your name:
                <input type="text" value = {userEmail} onChange={e => setUserEmail(e.target.value)} />
            </label>
            <Button variant="primary" type="submit" style={{marginBottom: 10}}>Enter</Button>
        </form>             

            {/* <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit1}>
                Enter
            </Button> */}
        </InputGroup>
            <Col>
                <DatePicker wrapperClassName="datePicker" className="form-control" selected={startDate} onChange={handleChange1} 
                selected={startDate}
                selectsStart // tells this DatePicker that it is part of a range*
                endDate={endDate}
                startDate={startDate}/>
            </Col>
            <Col>
                <DatePicker wrapperClassName="datePicker" className="form-control" selected={endDate} onChange={handleChange2} 
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}/>
            </Col>
            <Col>
            <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit2}>
                Enter
            </Button>
            </Col>
            <Card className="to-do-well">
              <Card.Body>
                <Card.Title><h2>Swab Results</h2></Card.Title>
                <ListGroup>
                  { data.map(n => item(n)) }
                </ListGroup>
              </Card.Body>
            </Card>
            
        </div>
    );
}


