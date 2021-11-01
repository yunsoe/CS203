import axios from "axios";
import React, { useState,useEffect } from "react";
import { Button,Form} from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiConstants";


export default function SwabTestDetail() {
    const history = useHistory();

    const[state,setState] = useState({
        email: "",
        Id: ""
    });
    const[data, setData] = useState();


    const redirectToUpdtae = (id) => {
        localStorage.setItem("swabDetailId",id);        
        history.push("/updateSwabtestDetail");
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

      const removeEmployee = (index,id) => {
        console.log(id)
        
        state.email = data[index -1].user.email;
        //setRemoveSwab(data[id].user.email);
        state.Id = id;
        //setSwabId(id);
        sendDetailsToServer();
    }
    
    const linkRemove = (cell, row, rowIndex, formatExtraData) => {
        return (
          <Button
            onClick={() => {
                removeEmployee(row.index, row.id);
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
            dataField: "message",
            text: "Message",
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
            API_BASE_URL + "users/" + state.email + "/swabTestDetails/" + state.Id,
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
        axios.get(`${API_BASE_URL}swabTestDetails/${localStorage.getItem("email")}`).then(response=>{
            console.log(response.data);
            //setState(state);
  

           //data.forEach((item,i) => setCombo({info : item, index : i +1}))
           //console.log(combo)
           response.data.forEach((item,i) => {response.data[i].index = i +1 } )
           setData(response.data)
           //response.data.forEach((item,i) => {console.log(item.index)} )
           console.log(response.data);
        }).catch((error) => {
          console.log(error)
        })
    }, []);

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 100, marginBottom:100}}> 
            <div className="col-12 col-lg-10 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 50, backgroundColor: 'white', borderRadius: 10}}>
                <div>
                    <h3>Individual Swab Alert Configuration</h3>
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