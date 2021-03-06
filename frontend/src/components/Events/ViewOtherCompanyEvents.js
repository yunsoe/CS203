import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {Button,Form} from "react-bootstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


export default function ViewOtherCompanyEvents() {

    const[state,setState] = useState({
        id:""
    });

    const[events, setEvents] = useState(null);

    
   
    const addUserToEvent = (id) => {
        console.log(id)
        state.id = id;
        sendDetailsToServer();
    }


    const addEvent = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button
              onClick={() => {
                  addUserToEvent(row.id);
              }}
            >
              Add
            </Button>
        );

    }

    const sendDetailsToServer = () => {
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/company",
            {
                method: "GET",
            }
        ).then(function (response) {
            response.json().then(function(companyId) {
                fetch(
                    API_BASE_URL + "companies/" + companyId + "/events/" + state.id + "/users/" + localStorage.getItem("email"),
                    {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "authorization": localStorage.getItem("accessToken"),
                },
                    }
                ).then(function (response) {
                    if (response.status === 200) {
                        setState((prevState) => ({
                            ...prevState
                        }));
                        alert("You have registered for the event successfully.");
                        window.location.reload();
                    } else {
                        console.log(response.json);
                        alert("There was an error on our side, please try again later.");
                    }
                });
            });
        });
    }

   
    useEffect(() => {
        fetchEvents();
        
        async function fetchEvents() {
            

            const companyId = await (await fetch(API_BASE_URL + "users/" + localStorage.getItem("email") + "/company")).json();
            const response = await fetch(API_BASE_URL + "companies/" + companyId + "/events/" + localStorage.getItem("email"));
            const data = await response.json();

            console.log(data);
            const today = new Date();

            let eventsData = Object.assign([], data);

            if (data.length !== 0) {
                data.forEach((event) => {
                    const splitEventDate = event.eventDate.split("/");
                    const dateOfEvent = new Date(splitEventDate[2], splitEventDate[1]-1, splitEventDate[0]);

                    if (dateOfEvent < today) {
                        var eventIndex = eventsData.findIndex(x => x.id === event.id);

                        eventsData.splice(eventIndex, 1);
                    }
                });
                setEvents(eventsData);
            }
        }
    

    }, []);

    const columns = [
        {
          dataField: "id",
          text: "Event ID",
          sort: true
        },
        {
          dataField: "event",
          text: "Event",
          sort: true
        },
        {
          dataField: "eventDate",
          text: "Event Date",
          sort: true
        },
        {
            dataField: "location",
            text: "Location",
            sort: true
        },
        {
            dataField: "register",
            text: "Register",
            formatter: addEvent
        }
    ];

    function renderPage() {
            return(
                <div>
                    <h3>View Other Company Events</h3>
                    <br/>
                    {events ? 
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={events}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                        />
                    : <p>There are no company events yet.</p>}
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


       