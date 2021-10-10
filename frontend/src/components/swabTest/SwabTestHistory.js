import React, { useState,useEffect } from "react";
import { Button,InputGroup,FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function SwabTestForm() {

    const [startDate, setStartDate] = useState(new Date());
    const [data, setData] = useState([]);


    const handleChange = (date) => {
        setStartDate(date)
    }

    const handleSubmit = ()=> {
        console.log("enter");
    }

    function loadDate(){

    }

    return(
        <div>
        <div>SwabTest</div>
        <InputGroup className="mb-3">
            <FormControl
            placeholder="SwabTest History"
            aria-label="swabTesHitory"
            aria-describedby="basic-addon2"
            />
            <DatePicker wrapperClassName="datePicker" className="form-control" selected={startDate} onChange={handleChange} />
            <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit}>
            Enter
            </Button>
        </InputGroup>
        </div>
    );
}