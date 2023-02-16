import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useQuery } from "@apollo/client";
import { GET_LEAD_BY_ID } from "../queries";
import { flattenObj } from "../../../components/utils/responseFlatten";
import { Lead } from "../interface";

const columnName = [
  "Id",
  "Role",
  "Names",
  "Email",
  "Notes",
  "Source",
  "Status",
  "Time",
  "Date",
  "createdAt",
  "updatedAt",
  "",
];

const containerStyle = {
  padding: "0 1em"
};

const lead: Lead = {
  id: "",
  Name: "",
  email: "",
  Notes: "",
  Source: "",
  Status: "",
  Time: "",
  date: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};


const ViewModal = (props) => {
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<Lead>(lead);

  const FetchData = () => {
    console.log(props.leadid);
    useQuery(GET_LEAD_BY_ID, {
      variables: { id: props.leadid },
      onCompleted: (res) => {
        let faqList = flattenObj(res.lead.data);
        // console.log(res.lead.data.id);
        console.log(faqList);
        setData(faqList);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  FetchData();

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">LEAD</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <div style={containerStyle}>
          <Row>
            <Col xs={6} md={6}>
              {columnName.map((item,index) => (
                <Row key={index}><span className="item">{item}</span></Row>
              ))}
            </Col>
            <Col xs={6} md={6}>
             {Object.values(data).map((value,index) =><Row key={index} className="justify-content-md-right"><span className="item">{value || "null"}</span> </Row>)}
            </Col>
          </Row>
          </div>

        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewModal;
