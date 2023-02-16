import {
  Container,
  Navbar,
  NavDropdown,
  Nav,
  Form,
  Offcanvas,
  Button,
} from "react-bootstrap";
import SideBar from "./SideBar";
import {Grid3x3GapFill } from "react-bootstrap-icons";


export function UnauthenticatedNav({show ,setShow}) {

  return (
    <Navbar
      style={{ zIndex: "1" }}
      fixed="top"
      className="shadow-sm navbar  bg-dark"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="text-muted">
          <strong>SAPIEN SYSTEMS</strong>
        </Navbar.Brand>
        <Nav.Item>
          <Grid3x3GapFill size={20} onClick={()=>{setShow(!show); console.log(show)}}/>
        </Nav.Item>
      </Container>
    </Navbar>
  );
}
