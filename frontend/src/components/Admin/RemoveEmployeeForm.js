import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
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
            console.log(state.companyId);

            const response = await fetch(API_BASE_URL + "users/" + companyId);
            const data = await response.json();

            //remove current admin logged in from the array - the first item in the array is always the admin
            data.splice(0, 1);

            console.log(data);

            if (data.length !== 0) {
                state.selectedEmployeeToRemove = data[0].email;
                console.log(state.selectedEmployeeToRemove);
                setEmployees(data);
            } else {
                document.getElementById("submitButton").hidden = true;
                document.getElementById("submitButton").disabled = true;
            }
        }
    }, []);

    //TODO: add feedback, news, events, etc associated with user and make sure it removes all without throwing an error

    const setSelectedEmployee = () => {
        var selectedEmployee = document.getElementById("employeeDropdownButton").value;
        state.selectedEmployeeToRemove = selectedEmployee;
        console.log(selectedEmployee);
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
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
                //need to make sure after rmeoving, the dropdown will update accordingly - if no more employees, show msg, if got more employees, make sure removed employee is not in the dropdown anymore
                //i think can reload the page?
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
                    <Form id="removeEmployeeForm" onSubmit={(e) =>  handleSubmitClick(e)}>
                        {employees ? (
                            <Form.Group className="mb-3">
                                <Form.Label>Choose employee:</Form.Label>
                                <div>
                                    <select name="employeeDD" id="employeeDropdownButton" style={{padding:10, borderRadius: 10}} onChange={setSelectedEmployee}>
                                        {employees.map((employee, i) => (
                                            <option class="employeeOption" key={i} value={employee.email} name={employee.name}>
                                                {employee.email}, {employee.name}
                                            </option>))}
                                    </select>
                                </div>
                            </Form.Group>
                        ) : (
                            <p>The company has no employees yet.</p>
                        )}
                        <Button variant="primary" id="submitButton" type="submit">Submit</Button>
                    </Form>
                </div>
            );
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-12 col-lg-4 login-card mt-2 hv-center" style={{padding:20}}>
                {renderPage()}
            </div>
        </div>
    )
}