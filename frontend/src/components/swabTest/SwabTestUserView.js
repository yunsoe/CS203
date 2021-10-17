import axios from "axios";
import React, { useState,useEffect } from "react";
import { Button,Form} from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from "react-router-dom";


export default function SwabTestUserView() {
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

    const columns = [
        {
          dataField: "id",
          text: "No.",
          sort: true
        },
        {
          dataField: "actualSwabDate",
          text: "Date",
          sort: true
        },
        {
          dataField: "swabResult",
          text: "Result",
          sort: true
        },
        {
            dataField: "Update",
            text: "Update",
            formatter: updateInfo,
        }
    ];


    useEffect(() => {
        axios.get(`http://localhost:8080/users/${localStorage.getItem("email")}/swabTests`).then(response=>{
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