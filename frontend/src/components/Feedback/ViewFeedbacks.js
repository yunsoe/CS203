// only system admin shld see this
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiConstants";
import { Table } from "react-bootstrap";

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
                        <Table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Title</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map((feedback, i) => (
                                    <tr>
                                        <td class="feedbackIndexCol" value = {i}>
                                            {i}
                                        </td>
                                        <td class="feedbackUserNameCol" value = {feedback.user.name}>
                                            {feedback.user.name}
                                        </td>
                                        <td class="feedbackUserEmailCol" value = {feedback.user.email}>
                                            {feedback.user.email}
                                        </td>
                                        <td class="feedbackTitleCol" value = {feedback.title}>
                                            {feedback.title}
                                        </td>
                                        <td class="feedbackDetailsCol" value = {feedback.details}>
                                            {feedback.details}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    : <p>There are no feedbacks yet.</p>}
                </div>
            );
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
            <div className="card col-12 col-lg-10 login-card mt-2 hv-center" style={{padding:20}}>
                {renderPage()}
            </div>
        </div>
    )
}
