import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { Form, Button } from "react-bootstrap";

import { useHistory} from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function ViewAttendees() {

    const history = useHistory();

    const [state , setState] = useState({
        email: "",
        name : "",
    });

    const[users, setUsers] = useState(null);
    // const[removeEvent,setRemoveEvent] = useState("");
    // const[eventId,setEventId] = useState();



    useEffect(() => {
        fetchEvents();
        
        async function fetchEvents() {
            
            const companyId = await (await fetch(API_BASE_URL + "users/" + localStorage.getItem("email") + "/company")).json();
            const response = await fetch(API_BASE_URL + "users/" + companyId + "/" + localStorage.getItem("eventId"));
            const data = await response.json();

            console.log(data);

            if (data.length !== 0) {
                setUsers(data);
            }
        }
    

    }, []);

    const columns = [
        {
          dataField: "email",
          text: "User email",
          sort: true
        },
        {
          dataField: "name",
          text: "Name",
          sort: true
        }
    ];


    const redirectToView = () => {
        history.push("/viewEvents");
    }

    function renderPage() {
            return(
                <div>
                <div>
                    <h3>View Attendees</h3>
                    <br/>
                    {users ? 
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={users}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                        />
                    : <p>No users have signed up yet.</p>}
                </div>
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
