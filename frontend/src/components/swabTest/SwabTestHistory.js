import axios from "axios";
import React, { useState,useEffect ,useCallback} from "react";
import { Button,InputGroup,FormControl, Row,Container, Card,ListGroup } from "react-bootstrap";
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


    const item = (datas) => (
        <ListGroup.Item key={datas.id}>
          <Card>
            <Card.Body>
              <Card.Text>{datas.swabResult}</Card.Text>
              <Card.Subtitle>{datas.actaulSwabDate}</Card.Subtitle>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      );

   
    function loadData2(){
      const date = format(startDate ,'yyyy-MM-dd')
        const date2 = format(endDate ,'yyyy-MM-dd')
        axios.get(`http://localhost:8080/swabTests/${date}/date/${date2}`).then(response=>{
          setData(response.data)
          console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    };

    function loadData1(){ 
        axios.get(`http://localhost:8080/swabTests/${userEmail}`).then(response=>{
            setData(response.data)
        }).catch((error) => {
          console.log(error)
          console.log(userEmail)
        })
      };
    

    useEffect(()=> {
        loadData1();
    },[]);

    useEffect(()=> {
      loadData2();
  },[]);

    return(
        <div>
        <div>View employees swab test history</div>
        <InputGroup className="mb-3">
        <InputGroup>
            <InputGroup.Text>Enter User's Email:</InputGroup.Text>
            <FormControl type = "text" placeholder="user Email" value={userEmail} onChange={ (e) => setUserEmail(e.target.value)} />
            <Button variant="primary" onClick={handleSubmit1}>Add</Button>
          </InputGroup>           

            {/* <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit1}>
                Enter
            </Button> */}
        </InputGroup>
        <InputGroup>
        <InputGroup.Text>Enter date range:</InputGroup.Text>

            
                <DatePicker wrapperClassName="datePicker" className="form-control" selected={startDate} onChange={handleChange1} 
                selected={startDate}
                selectsStart // tells this DatePicker that it is part of a range*
                endDate={endDate}
                startDate={startDate}/>
            
                <DatePicker wrapperClassName="datePicker" className="form-control" selected={endDate} onChange={handleChange2} 
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}/>
           
            <Button variant="primary" id="button-addon2" onClick={handleSubmit2}>
                Enter
            </Button>
            </InputGroup>
           
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


