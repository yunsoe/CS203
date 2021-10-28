import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


export default function ViewEvents() {

    const[events, setEvents] = useState(null);

    useEffect(() => {
        fetchEvents();

        async function fetchEvents() {
            fetch(
                API_BASE_URL + "users/" + localStorage.getItem("email") + "/company",
                {
                    method: "GET",
                }
            ).then(function (response) {
                response.json().then(function(companyId) {
                    fetch(
                        API_BASE_URL + "companies/" + companyId + "/events",
                        {
                            method: "GET",

                        }
                    ).then(function (response) {
                        
                        const data = response.json();
                        console.log(data);

                        if (data.length !== 0) {
                            setEvents(data);
                        }
                    }
                    );
                });
            });
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
          dataField: "event_date",
          text: "Event Date",
          sort: true
        },
        {
            dataField: "location",
            text: "Location",
            sort: true
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
                    : <p>There are no events yet.</p>}
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
