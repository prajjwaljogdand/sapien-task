import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LEAD_BY_ID, UPDATE_LEAD } from "../queries";
import { flattenObj } from "../../../components/utils/responseFlatten";
import Form from "@rjsf/bootstrap-4";
import { RJSFSchema } from "@rjsf/utils";
import { useToasts } from "react-toast-notifications";
import { Lead } from "../interface";

const containerStyle = {
  padding: "0 1em",
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

const  EditModal = (props) => {
  const [data, setData] = useState<Lead>(lead);
  const [updateLeadMutation, { loading, error, data: leadData }] = useMutation(UPDATE_LEAD);
  const { refetch } = useQuery(GET_LEAD_BY_ID, {
    variables: { id: props.leadid },
  });
  const { addToast } = useToasts();

  const FetchData = () => {
    useQuery(GET_LEAD_BY_ID, {
      variables: { id: props.leadid },
      onCompleted: (res) => {
        let leadAttributes = flattenObj(res.lead.data);
        console.log(leadAttributes);
        setData(leadAttributes);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  FetchData();

  const schema: RJSFSchema = {
    title: "Lead",
    type: "object",
    required: ["Name", "Email"],
    properties: {
      Name: { type: "string", title: "Name", default: data.Name },
      Email: { type: "string", title: "Email", default: data.email },
      Notes: { type: "string", title: "Notes", default: data.Notes },
      Source: {
        type: "string",
        title: "Source",
        default: data.Source,
        enum: ["website", "google", "my_app", "word_of_mouth"],
      },
      Status: {
        type: "string",
        title: "Status",
        default: data.Status,
        enum: ["New", "Interested", "Follow_up", "Negative", "Enrolled"],
      },
      Time: {
        type: "string",
        format: "time",
        title: "Time",
        default: data.Time,
      },
      Date: {
        type: "string",
        format: "date",
        title: "Date",
        default: data.date,
      },
    },
  };

  const handleSubmit = async (updateData: any) => {
    const formData = updateData.formData;
    const newData = {
      Name: formData.Name,
      email: formData.Email,
      Source: formData.Source,
      Status: formData.Status,
      Time: formData.Time,
      date: formData.Date,
      Notes: formData.Notes,
    };
    console.log(newData);
    // make an API call using the formData to update the lead details
    try {
      await updateLeadMutation({
        variables: {
          id: data.id,
          data: newData,
        },
      });
      // Refetch updated details
      await refetch();
      addToast(`Lead successfully updated ${data.id}`, {
        appearance: "success",
      });
    } catch (err: any) {
      addToast(err.message, { appearance: "error" });
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="show-grid">
        <Container>
          <div style={containerStyle}>
            <Form schema={schema} onSubmit={handleSubmit} />
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
