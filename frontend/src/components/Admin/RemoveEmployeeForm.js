import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { API_BASE_URL } from "../../constants/apiConstants";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


export default function RemoveEmployeeForm() {

    const [state, setState] = useState({
        selectedEmployeeToRemove: "",
        companyId: ""
    });

    const[employees, setEmployees] = useState(null);

    useEffect(() => {
        fetchEmployeesFromCompany();

        async function fetchEmployeesFromCompany() {
            const getCompanyId = await fetch(API_BASE_URL + "users/" + localStorage.getItem("email") + "/company");
            const companyId = await getCompanyId.json();

            state.companyId = companyId;

            const response = await fetch(API_BASE_URL + "users/" + companyId);
            const data = await response.json();

            var adminIndex = data.findIndex(x => x.email === localStorage.getItem("email"));

            // remove admin from list of employees
            data.splice(adminIndex, 1);

            if (data.length !== 0) {
                data.forEach((item, i) => item.id = i);
                data.forEach((item, i) => item.index = i+1);
                setEmployees(data);
            }
        }
    }, []);

    const removeEmployee = (id) => {
        state.selectedEmployeeToRemove = employees[id].email;
        sendDetailsToServer();
    }
    
    const linkRemove = (cell, row, rowIndex, formatExtraData) => {
        return (
          <Button
            onClick={() => {
                removeEmployee(row.id);
            }}
          >
            Remove
          </Button>
        );
      };


    const columns = [
        {
          dataField: "index",
          text: "No.",
          sort: true
        },
        {
          dataField: "name",
          text: "Name",
          sort: true
        },
        {
          dataField: "email",
          text: "Email",
          sort: true
        },
        {
            dataField: "role",
            text: "Role",
            sort: true
        },
        {
            dataField: "remove",
            text: "Remove",
            formatter: linkRemove,
        }
    ];


    const sendDetailsToServer = () => {
        fetch(
            API_BASE_URL + "users/" + state.companyId + "/" + state.selectedEmployeeToRemove,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "authorization": localStorage.getItem("accessToken"),
                },
            }
        ).then(function(response) {
            if (response.status === 200) {
                alert("Employee has been removed successfully.");
                window.location.reload();
            } else {
                console.log(response.json);
                alert("There was an error on our side, please try again later.");
            }
        })
    }
 
    function renderPage() {
        if (localStorage.getItem("authority") !== "ROLE_ADMIN") {
            return(
                <div style={{textAlign: "center"}}>You are not authorized to enter this page.</div>
            );
        } else {
            return(
                <div>
                    <h3>Remove Employee</h3>
                    <br/>
                    <Form id="removeEmployeeForm">
                        {employees ? (
                            <BootstrapTable
                                bootstrap4
                                keyField="id"
                                data={employees}
                                columns={columns}
                                pagination={paginationFactory({ sizePerPage: 5 })}
                            />
                        ) : (
                            <p>The company has no employees yet.</p>
                        )}
                    </Form>
                </div>
            );
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom:100}}>
            <div className="card col-12 col-lg-10 login-card mt-2 hv-center" style={{padding:20}}>
                {renderPage()}
            </div>
        </div>
    )
}