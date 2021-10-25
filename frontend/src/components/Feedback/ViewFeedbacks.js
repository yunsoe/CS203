// only system admin shld see this
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


export default function ViewFeedbacks() {

    const[feedbacks, setFeedbacks] = useState(null);

    useEffect(() => {
        fetchFeedbacks();

        async function fetchFeedbacks() {
            const response = await fetch(API_BASE_URL + "feedbacks");
            const data = await response.json();

            console.log(data);

            if (data.length !== 0) {
                setFeedbacks(data);
            }
        }
    }, []);

    const columns = [
        {
          dataField: "id",
          text: "Feedback ID",
          sort: true
        },
        {
          dataField: "user.name",
          text: "Name",
          sort: true
        },
        {
          dataField: "user.email",
          text: "Email",
          sort: true
        },
        {
            dataField: "title",
            text: "Title",
            sort: true
        },
        {
            dataField: "details",
            text: "Details",
            sort: true
        }
    ];

    function renderPage() {
        if (localStorage.getItem("authority") !== "ROLE_SYSADMIN") {
            return(
                <div style={{textAlign: "center"}}>You are not authorized to enter this page.</div>
            );
        } else {
            return(
                <div>
                    <h3>View Feedbacks</h3>
                    <br/>
                    {feedbacks ? 
                        <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={feedbacks}
                            columns={columns}
                            pagination={paginationFactory({ sizePerPage: 5 })}
                        />
                    : <p>There are no feedbacks yet.</p>}
                </div>
            );
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom:100}}>
            <div className="col-12 col-lg-10 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 50, backgroundColor: 'white', borderRadius: 10}}>
                {renderPage()}
            </div>
        </div>
    )
}
