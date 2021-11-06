import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { Form, Button } from "react-bootstrap";

import { useHistory} from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function CheckLocationStatus() {
    
    const history = useHistory();

    const [status , setStatus] = useState();

    // const[users, setUsers] = useState(null);
    // const[removeEvent,setRemoveEvent] = useState("");
    // const[eventId,setEventId] = useState();



    useEffect(() => {
        fetchStatus();
        
        async function fetchStatus() {
            
            const companyId = await (await fetch(API_BASE_URL + "users/" + localStorage.getItem("email") + "/company")).json();
            const response = await fetch(API_BASE_URL + "swabTests/events/" + companyId + "/" + localStorage.getItem("eventId"));
            const data = await response.json();

            console.log(data);

            if (data.length !== 0) {
                setStatus(data);
            }
        }
    

    }, []);
    
    const redirectToView = () => {
        history.push("/viewEvents");
    }

    function renderPage() {
            return(
                <div>
                    <h3>Location Status</h3>
                    <br/>
                    {status ? 
                        <div>
                        <h4> <em style = {{color: "red", fontFamily:"Arial"}}>There have been COVID-19 cases at this location in the last two weeks.</em>
                        <br></br>
                        <br></br>
                            <p style = {{fontFamily:"Arial", textAlign: "center"}}>Hence, it would be advisable for you to change the location of your event.
                            </p>
                        </h4>
                        <br></br>
                        <br></br>
                        </div>
                    : <h4 style = {{fontFamily:"Arial", textAlign: "center"}}>There have been no COVID-19 cases detected at this location as of today.</h4>}
                      <br></br>
                      <br></br>
                    <div style = {{ textAlign: "center"}}>
                    <Button 
                        onClick={() => {
                            redirectToView();
                        }}
                        >
                        View Events 
                    </Button>
                    </div>
                </div>
                
            );
        
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom:100}}>
            <div className="col-12 col-lg-10 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 50, backgroundColor: 'white', borderRadius: 10}}>
                {renderPage()}
            </div>
        </div>
    )
}
