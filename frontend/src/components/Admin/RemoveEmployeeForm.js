import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { API_BASE_URL } from "../../constants/apiConstants";


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

            //remove current admin logged in from the array - the first item in the array is always the admin
            data.splice(0, 1);

            console.log(data);

            if (data.length !== 0) {
                setEmployees(data);
            }
        }
    }, []);

    const removeEmployee = (e) => {
        var i = e.target.id;
        state.selectedEmployeeToRemove = employees[i].email;
        sendDetailsToServer();
    }

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
                location.reload();
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
                            <Form.Group className="mb-3">
                                <div>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {employees.map((employee, i) => (
                                            <tr>
                                                <td key={i} value={employee.name}>
                                                    {employee.name}
                                                </td>
                                                <td key={i} value={employee.email}>
                                                    {employee.email}
                                                </td>
                                                <td key={i} value={employee.role}>
                                                    {employee.role}
                                                </td>
                                                <td>
                                                    <Button variant="primary" id={i} type="button" onClick={(e) => removeEmployee(e)}>Remove</Button>
                                                </td>
                                            </tr>))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Form.Group>
                        ) : (
                            <p>The company has no employees yet.</p>
                        )}
                    </Form>
                </div>
            );
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginLeft: 200, marginRight: 200, marginTop: 100, marginBottom: 100}}>
            <div className="card col-12 col-lg-12 login-card mt-2 hv-center" style={{padding:20}}>
                {renderPage()}
            </div>
        </div>
    )
}