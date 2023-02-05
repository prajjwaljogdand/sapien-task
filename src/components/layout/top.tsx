import {
  Container,
  Navbar
} from "react-bootstrap";

export function UnauthenticatedNav() {
  return (
    <Navbar fixed="top" bg="light" className="shadow-sm" expand="lg">
      <Container fluid>
        <Navbar.Brand  href="/" className="text-muted">
          <strong>SAPIEN SYSTEMS</strong>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
