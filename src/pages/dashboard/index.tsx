import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { DELETE_LEAD, GET_LEADS, GET_LEADS2 } from "./queries";
import { useQuery, useMutation } from "@apollo/client";
import { flattenObj } from "../../components/utils/responseFlatten";
import "./style.css";
import ViewModal from "./components/ViewModal";
import { Dropdown, Table } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { useToasts } from "react-toast-notifications";
import EditModal from "./components/EditModal";
import { Lead } from "./interface";
import CustomToggle from "./components/CustomeToggle";
import Pagination from "react-bootstrap/Pagination";
import { Row } from "react-bootstrap";
import SideBar from "../../components/layout/SideBar";

const columnName = [
  "Id",
  "Names",
  "Email",
  "Notes",
  "Source",
  "Status",
  "Time",
  "Date",
  "CreatedAt",
  "UpdatedAt",
  "",
];

export default function MainLobby() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deleteLead, { loading, error }] = useMutation(DELETE_LEAD);
  const [metaData, setMetaData] = useState({});
  const { addToast } = useToasts();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [editModalShow, setEditModalShow] = useState<boolean>(false);
  const [leadId, setLeadId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data , refetch} = useQuery(GET_LEADS2, {
    variables: {
      pagination: {
        limit: 10,
        start: (currentPage - 1) * 10,
      },
      sort: [],
    },
    onCompleted: (res) => {
      setTotalPages(res.leads.meta.pagination.pageCount);
      let data = flattenObj(res.leads.data)
        .map((a) => {
          a.id = Number(a.id);
          return a;
        })
        .sort((a, b) => a.id - b.id);
      setLeads(data);
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function handlePageChange(e: any) {
    console.log(e.target.text);
    setCurrentPage(e.target.text);
  }

  //   const FetchData = () => {
  //     useQuery(GET_LEADS, {
  //       onCompleted: (res) => {
  //         let data = flattenObj(res.leads.data)
  //           .map((a) => {
  //             a.id = Number(a.id);
  //             return a;
  //           })
  //           .sort((a, b) => a.id - b.id);
  //         setLeads(data);
  //         let mData = res.leads.meta.pagination;
  //         setMetaData(mData);
  //         console.log(res.leads.meta.pagination);
  //       },
  //     });
  //   };

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

  //   FetchData();

  return (
    <div className="main-container">
      <Container fluid style={{ overflow: "hidden" }}>

        <Table bordered hover striped responsive>
          <thead>
            <tr>
              {columnName.map((col,index) => (
                <th key={index}> {col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead,index) => {
              return (
                <tr key={index} >
                  <td>{lead.id}</td>
                  <td>{lead.Name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.Notes}</td>
                  <td>{lead.Source}</td>
                  <td>{lead.Status}</td>
                  <td>{lead.Time}</td>
                  <td>{lead.date}</td>
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
                        <Dropdown.Item>
                          {" "}
                          <div
                            onClick={() => {
                              setLeadId(lead.id);
                              setEditModalShow(true);
                            }}
                          >
                            Edit
                          </div>
                        </Dropdown.Item>
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
          <ViewModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            leadid={leadId}
          />
        ) : null}
        {editModalShow ? (
          <EditModal
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
            leadid={leadId}
          />
        ) : null}
      </Container>
      <Row className="justify-content-md-center">
        <Pagination>
          {currentPage > 1 ? (
            <>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            </>
          ) : (
            <>
              <Pagination.First />
              <Pagination.Prev />
            </>
          )}
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={handlePageChange}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          {currentPage < totalPages ? (
            <>
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
              />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
            </>
          ) : (
            <>
              <Pagination.Next />
              <Pagination.Last />
            </>
          )}
        </Pagination>
      </Row>
    </div>
  );
}
