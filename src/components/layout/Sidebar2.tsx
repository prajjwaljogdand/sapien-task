import React, { useState } from "react";
import { Nav, Row } from "react-bootstrap";
import {
  House,
  Chat,
  CalendarEvent,
  Person,
  BoxSeam,
  Gear,
  CashCoin,
  Database,
} from "react-bootstrap-icons";

const Sidebar2 = (props) => {
  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-dark sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Row className="nav-item">
            <House />
            <div className="nav-item-name">HOME</div>
          </Row>
        </Nav.Item>
        <Nav.Item>
          <Row className="nav-item">
            <Chat />
            <div className="nav-item-name">Chat</div>
          </Row>
        </Nav.Item>
        <Nav.Item>
          <Row className="nav-item">
            <CalendarEvent />
            <div className="nav-item-name">Schedule</div>
          </Row>
        </Nav.Item>
        <Nav.Item>
          <Row className="nav-item">
            <Person />
            <div className="nav-item-name">Clients</div>
          </Row>
        </Nav.Item>
        <Nav.Item>
          <Row className="nav-item">
            <BoxSeam />
            <div className="nav-item-name">Packages</div>
          </Row>
        </Nav.Item>
        <Nav.Item>
          <Row className="nav-item">
            <CashCoin />
            <div className="nav-item-name">Finance</div>
          </Row>
        </Nav.Item>
        <Nav.Item>
          <Row className="nav-item">
            <Database />
            <div className="nav-item-name">Resources</div>
          </Row>
        </Nav.Item>
        <Nav.Item>
          <Row className="nav-item">
            <Gear />
            <div className="nav-item-name">Setting</div>
          </Row>
        </Nav.Item>
      </Nav>
    </>
  );
};
export default Sidebar2;
