import React, {useState, useEffect} from "react";
import {Table} from "react-bootstrap"
export default function Users(){
    const [data, setData] = useState([])
    const [mode, setMode] = useState("online")

    useEffect(() => {
        let url = "https://jsonplaceholder.typicode.com/users"
        fetch(url).then(res => {
            res.json().then(result => {
                setData(result);
                localStorage.setItem("users", JSON.stringify(result));
            })
        }).catch(err => {
            setMode("offline")
            let collection = localStorage.getItem("users")
            setData(JSON.parse(collection));
        })
    }, [])
    return (
      <div>
        <div>
          {mode === "offline" ? (
            <div className="alert alert-warning" role="alert">
              You are in offline mode or some issue with connection.
            </div>
          ) : null}
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address.street}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
}