import React, { MouseEvent, ReactNode, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { DELETE_LEAD, GET_LEADS, GET_LEAD_BY_ID } from "./queries";
import { useQuery, useMutation } from "@apollo/client";
import { flattenObj } from "../../components/utils/responseFlatten";
import "./style.css";
import MydModalWithGrid from "./MydModalWithGrid";
// import arrowDown from '../../assets/down.svg';
// import arrowUp from '../../assets/up.svg';
// import { Link } from 'react-router-dom';
import { Dropdown, Table } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { useToasts } from "react-toast-notifications";

const columnName = [
  "id",
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

const CustomToggle = React.forwardRef<
  HTMLSpanElement,
  { children: ReactNode; onClick: (event: MouseEvent<HTMLSpanElement>) => void }
>(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      onClick(e);
    }}
    className="kebab"
  >
    {children}
  </span>
));

interface Lead {
  id: string;
  Name: string;
  email: string;
  Notes: string;
  Source: string;
  Status: string;
  Time: string;
  Date: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function MainLobby() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deleteLead, { loading, error }] = useMutation(DELETE_LEAD);
  const { refetch } = useQuery(GET_LEADS);
  const { addToast } = useToasts();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [leadId, setLeadId] = useState<string>("");

  const FetchData = () => {
    useQuery(GET_LEADS, {
      onCompleted: (res) => {
        let faqList = flattenObj(res.leads.data)
          .map((a) => {
            a.id = Number(a.id);
            return a;
          })
          .sort((a, b) => a.id - b.id);
        setLeads(faqList);
        console.log(leads);
      },
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLead({ variables: { id } });
      addToast(`Lead successfully deleted ${id}`, { appearance: "success" });
      const t = refetch();
      console.log(await t);
    } catch (err: any) {
      addToast(err.message, { appearance: "error" });
    }
  };

  //   const handleView = async (id : string) => {
  //     try {
  //       await deleteLead({ variables: { id } });
  //       addToast(`Lead successfully deleted ${id}`, { appearance: 'success' });
  //       const t =  refetch();
  //       console.log(await t);

  //     } catch (err : any) {
  //       addToast(err.message, { appearance: 'error' });
  //     }
  //   }

  FetchData();

  return (
    <>
      <Container fluid style={{ overflow: "hidden" }}>
        <Table bordered hover variant="dark" striped responsive>
          <thead>
            <tr>
              {columnName.map((col) => (
                <th> {col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              return (
                <tr>
                  <td>{lead.id}</td>
                  <td>{lead.Name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.Notes}</td>
                  <td>{lead.Source}</td>
                  <td>{lead.Status}</td>
                  <td>{lead.Time}</td>
                  <td>{lead.Date}</td>
                  <td>{lead.createdAt}</td>
                  <td>{lead.updatedAt}</td>
                  <td>
                    <Dropdown className="kebab">
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-custom-components"
                        variant="dark"
                      >
                        <ThreeDotsVertical />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          {" "}
                          <div
                            onClick={() => {
                              setLeadId(lead.id);
                              setModalShow(true);
                            }}
                          >
                           View
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDelete(lead.id)}
                          disabled={loading}
                        >
                          {" "}
                          {loading ? "Deleting..." : "Delete"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {modalShow ? (
          <MydModalWithGrid
            show={modalShow}
            onHide={() => setModalShow(false)}
            leadid={leadId}
          />
        ) : null}
      </Container>
    </>
  );
}
