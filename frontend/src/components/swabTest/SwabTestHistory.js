// import axios from "axios";
// import React, { useState,useEffect } from "react";
// import { Button,InputGroup,FormControl, Col, Card,ListGroup } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import {format} from "date-fns";


// export default function SwabTestForm() {

//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [data, setData] = useState([]);


//     const handleChange1 = (date) => {
//         setStartDate(date)
//     }

//     const handleChange2 = (date) => {
//         setEndDate(date)
//       }

//     const handleSubmit = ()=> {
        
//         console.log("enter");
//     }

//     const item = (todo) => (
//         <ListGroup.Item key={data.id}>
//           <Card>
//             <Card.Body>
//               <Card.Text>{data.swabResult}</Card.Text>
//               <Card.Subtitle>{data.actaulSwabTestResult}</Card.Subtitle>
//             </Card.Body>
//           </Card>
//         </ListGroup.Item>
//       );

//     function loadData(){
//         axios.get('/swabTest/{startDate}/date/{endDate}').then(response=>{
//             setData(response.data)
//         })
//     }

//     useEffect(()=> {
//         loadData();
//     },[]);

//     return(
//         <div>
//         <div>View employees swab test history</div>
//         <InputGroup className="mb-3">
//             <FormControl
//             placeholder="username"
//             aria-label="swabTesHitory"
//             aria-describedby="basic-addon2"
//             />
//             <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit}>
//                 Enter
//             </Button>
//         </InputGroup>
//             <Col>
//                 <DatePicker wrapperClassName="datePicker" className="startDate" selected={startDate} onChange={handleChange1} />
//             </Col>
//             <Col>
//                 <DatePicker wrapperClassName="datePicker" className="endDate" selected={endDate} onChange={handleChange2} />
//             </Col>
//             <Col>
//             <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit}>
//                 Enter
//             </Button>
//             </Col>
//             <Card className="to-do-well">
//               <Card.Body>
//                 <Card.Title><h2>Swab Results</h2></Card.Title>
//                 <ListGroup>
//                   { data.map(n => item(n)) }
//                 </ListGroup>
//               </Card.Body>
//             </Card>
            
//         </div>
//     );
// }