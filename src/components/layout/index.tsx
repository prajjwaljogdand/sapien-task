import React, { useState } from "react";
import Sidebar2 from "./Sidebar2";
import { UnauthenticatedNav } from "./top";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function Layout({ token, children }: any) {
  const [show, setShow] = useState(false);

  return (
    <>
      <header>
        <UnauthenticatedNav show={show} setShow={setShow} />
      </header>
      <main>
        <Container fluid>
          <Row className="justify-content-center">
            {show ? (
              <Col xs={1} id="sidebar-wrapper">
                <Sidebar2 />
              </Col>
            ) : null}
            <Col xs={10} id="page-content-wrapper">
              {children}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
