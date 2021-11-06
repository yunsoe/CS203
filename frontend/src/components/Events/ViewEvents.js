import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {Button,Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


export default function ViewEvents() {

    const history = useHistory();

    const[state,setState] = useState({
        id:""
    });

    const[events, setEvents] = useState(null);
    // const[removeEvent,setRemoveEvent] = useState("");
    // const[eventId,setEventId] = useState();

    const redirectToUpdate = (id) => {
        localStorage.setItem("eventId",id);
        history.push("/updateEvent");
    }

    const redirectToView = (id) => {
        localStorage.setItem("eventId",id);
        history.push("/viewAttendees");
    }

    const updateInfo = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button
              onClick={() => {
                  redirectToUpdate(row.id);
              }}
            >
              Edit
            </Button>
          );
    }

    const viewAttendees = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button
              onClick={() => {
                  redirectToView(row.id);
              }}
            >
              View Attendees 
            </Button>
          );
    }
    
    const removeEvent = (id) => {
        console.log(id)
        state.id = id;
        sendDetailsToServer();
    }

    const removeUserFromEvent = (id) => {
        console.log(id)
        state.id = id;
        sendRemoveDetailsToServer();
    }

    const linkRemove = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button
              onClick={() => {
                  removeEvent(row.id);
              }}
            >
              Remove
            </Button>
          );
    }

    const leaveEvent = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button
              onClick={() => {
                  removeUserFromEvent(row.id);
              }}
            >
              Leave
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
                    API_BASE_URL + "companies/" + companyId + "/events/" + state.id,
                    {
                    method: "DELETE",
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
                        alert("Event has been deleted successfully.");
                        window.location.reload();
                    } else {
                        console.log(response.json);
                        alert("There was an error on our side, please try again later.");
                    }
                });
            });
        });
    }

    const sendRemoveDetailsToServer = () => {
        fetch(
            API_BASE_URL + "users/" + localStorage.getItem("email") + "/company",
            {
                method: "GET",
            }
        ).then(function (response) {
            response.json().then(function(companyId) {
                fetch(
                    API_BASE_URL + "events/" + companyId + "/" + state.id + "/users/" + localStorage.getItem("email"),
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
                        alert("User has been unregistered from event successfully.");
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
            
            const response = await fetch(API_BASE_URL + "users/" + localStorage.getItem("email") + "/companies/events");
            const data = await response.json();

            console.log(data);

            if (data.length !== 0) {
                setEvents(data);
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
            dataField: "View Attendees",
            text: "View Attendees",
            formatter: viewAttendees
        },
        {
            dataField: "Edit",
            text: "Edit",
            formatter: updateInfo
        },
        {
            dataField: "remove",
            text: "Remove",
            formatter: linkRemove
        },
        {
            dataField: "leave",
            text: "Leave",
            formatter: leaveEvent
        }
    ];

    function renderPage() {
            return(
                <div>
                    <h3>View Events</h3>
                    <br/>
                    {events ? 
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={events}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                        />
                    : <p>You have not signed up for any events yet.</p>}
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


        // async function fetchEvents() {
        //     fetch(
        //         API_BASE_URL + "users/" + localStorage.getItem("email") + "/company",
        //         {
        //             method: "GET",
        //         }
        //     ).then(function (response) {
        //         response.json().then(function(companyId) {
        //             fetch(
        //                 API_BASE_URL + "companies/" + companyId + "/events",
        //                 {
        //                     method: "GET",

        //                 }
        //             ).then(function (response) {
                        
        //                 const data = response.json;
        //                 console.log(data);

        //                 if (data.length !== 0) {
        //                     setEvents(data);
        //                 }
        //             }
        //             );

                   
        //         });
        //     });
        // }
