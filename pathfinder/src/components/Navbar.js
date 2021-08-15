import React from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
export default function Navbarx({
  title,
  showreg,
  showlogin,
  showlogout,
  setshowReg,
  setshowLogin,
  setshowLogout,
  setCurruser,
  storage,
}) {
  const handel_logout = (e) => {
    e.preventDefault();
    setshowLogin(true);
    setshowReg(true);
    setshowLogout(false);
    setCurruser(null);
    storage.removeItem("user");
  };
  return (
    <Navbar bg="dark" variant="dark" style={{ width: "100vw" }}>
      <Container>
        <Navbar.Brand href="/">
          <h4>{title}</h4>
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="/about" className="m-auto">
            About
          </Nav.Link>
          {showlogin && (
            <Nav.Link href="/login">
              <Button type="button" className="btn btn-outline-primary">
                Login
              </Button>
            </Nav.Link>
          )}
          {showreg && (
            <Nav.Link href="/signup">
              <Button type="button" className="btn btn-outline-info">
                Register
              </Button>
            </Nav.Link>
          )}
          {showlogout && (
            <Button
              type="button"
              className="btn btn-outline-warning ml-3"
              onClick={handel_logout}
            >
              Log-Out
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
