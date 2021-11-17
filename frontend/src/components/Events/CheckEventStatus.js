import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { Form, Button } from "react-bootstrap";

import { useHistory} from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function CheckEventStatus() {

    const [status , setStatus] = useState();


    useEffect(() => {
        fetchStatus();
        
        async function fetchStatus() {
            
            const companyId = await (await fetch(API_BASE_URL + "users/" + localStorage.getItem("email") + "/company")).json();
            const response = await fetch(API_BASE_URL + "swabTests/users/" + companyId + "/" + localStorage.getItem("eventId"));
            const data = await response.json();

            console.log(data);

            if (data.length !== 0) {
                setStatus(data);
            }
        }
    

    }, []);


    function renderPage() {
            return(
                <div>
                    <h3>Event Status</h3>
                    <br/>
                    {status ? 
                        <h4 style = {{fontFamily:"Arial"}}> <em style = {{color: "red", fontFamily:"Arial"}}>
                        Number of attendees who tested Covid-positive : {status}.</em>
                        <br></br>
                        <br></br>
                        Hence, it would be advisable for you to <strong> do a swab test<br></br> as soon as possible 
                        and self-quarantine if necessary</strong>. <br></br>As a precaution, please unregister from all upcoming<br></br> events
                        until you've taken a swab test and tested negative.</h4>
                    : <h4 style = {{fontFamily:"Arial"}}> This event took place more than 2 weeks ago/None of the attendees tested Covid-Positive.</h4>}
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
