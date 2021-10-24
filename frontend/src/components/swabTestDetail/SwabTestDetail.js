import axios from "axios";
import React, { useState,useEffect } from "react";
import { Button,Form} from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from "react-router-dom";


export default function SwabTestDetail() {
    const history = useHistory();

    const[state,setState] = useState({});
    const [data, setData] = useState(null);

    const redirectToUpdtae = (id) => {
        localStorage.setItem("swabDate",data[id].actualSwabDate);
        localStorage.setItem("swabId",id);        
        history.push("/update");
      };


        const updateInfo = (cell, row, rowIndex, formatExtraData) => {
        return (
          <Button
            onClick={() => {
                redirectToUpdtae(row.id);
            }}
          >
            Update
          </Button>
        );
      };

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
          dataField: "id",
          text: "No.",
          sort: true
        },
        {
          dataField: "alertDay",
          text: "Day",
          sort: true
        },
        {
          dataField: "alertTime",
          text: "Time",
          sort: true
        },
        {
            dataField: "Update",
            text: "Update",
            formatter: updateInfo,
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


    useEffect(() => {
        axios.get(`http://localhost:8080/swabTestDetails/${localStorage.getItem("email")}`).then(response=>{
            setData(response.data)
            console.log(localStorage.getItem("email"));
            console.log(response.data);
            setState(state);
            console.log(response)
        }).catch((error) => {
          console.log(error)
        })
    }, []);

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom:100}}> 
            <div className="card col-12 col-lg-10 login-card mt-2 hv-center" style={{padding:20}}>
                <div>
                    <h3>Individual Swab Results</h3>
                    <br/>
                    <Form id="swabResult">
                        {data ? (
                            <BootstrapTable
                                bootstrap4
                                keyField="id"
                                data={data}
                                columns={columns}
                                pagination={paginationFactory({ sizePerPage: 5 })}
                            />
                        ) : (
                            <p>The company has no Swab Result yet.</p>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}