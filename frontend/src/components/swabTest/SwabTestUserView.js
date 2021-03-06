import axios from "axios";
import React, { useState,useEffect } from "react";
import { Button,Form} from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiConstants";


export default function SwabTestUserView() {
    const history = useHistory();

    const[state,setState] = useState({});
    const [data, setData] = useState(null);

    const redirectToUpdtae = (index,id) => {
        console.log(data[index-1])
        localStorage.setItem("swabDate",data[index - 1].actualSwabDate);
        localStorage.setItem("swabId",id);        
        history.push("/update");
      };


        const updateInfo = (cell, row, rowIndex, formatExtraData) => {
        return (
          <Button
            onClick={() => {
                redirectToUpdtae(row.index,row.id);
            }}
          >
            Update
          </Button>
        );
      };

    const columns = [
        {
          dataField: "index",
          text: "No.",
          sort: true,
        },
        {
          dataField: "actualSwabDate",
          text: "Date",
          sort: true,

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
        axios.get(`${API_BASE_URL}users/${localStorage.getItem("email")}/swabTests`).then(response=>{
          response.data.forEach((item,i) => {response.data[i].index = i +1 } )
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
            <div className="col-12 col-lg-10 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 40, backgroundColor: 'white', borderRadius: 10}}>
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
                            <p>The user has no Swab Results yet.</p>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}