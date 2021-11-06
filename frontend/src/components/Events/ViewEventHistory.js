import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {Button,Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";


import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


export default function ViewEventHistory() {

    const[state,setState] = useState({
        id:""
    });

    const history = useHistory();

    const checkEventStatus = (id) => {
        localStorage.setItem("eventId",id);
        history.push("/checkEventStatus");
    }

    const[events, setEvents] = useState(null);
    // const[removeEvent,setRemoveEvent] = useState("");
    // const[eventId,setEventId] = useState();

    const checkStatus = (cell, row, rowIndex, formatExtraData) => {
        return (
            <Button
              onClick={() => {
                  checkEventStatus(row.id);
              }}
            >
              Check Status
            </Button>
        );

    }


    useEffect(() => {
        fetchEvents();
        
        async function fetchEvents() {
            
            const companyId = await (await fetch(API_BASE_URL + "users/" + localStorage.getItem("email") + "/company")).json();
            const response = await fetch(API_BASE_URL + "users/" + localStorage.getItem("email") + "/" + companyId + "/events");
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
            dataField: "Status",
            text: "Check Status",
            formatter: checkStatus
        }
    ];

    function renderPage() {
            return(
                <div>
                    <h3>View past events</h3>
                    <br/>
                    {events ? 
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={events}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                        />
                    : <p>No events yet.</p>}
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
