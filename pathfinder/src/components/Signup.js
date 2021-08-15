import axios from "axios";
import React, { useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
export default function Signup() {
  const history = useHistory();
  const usernameref = useRef();
  const emailref = useRef();
  const passref = useRef();
  const usersubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameref.current.value,
      email: emailref.current.value,
      password: passref.current.value,
    };
    try {
      const res = await axios.post("/register", user);
      if (res.status === 200) {
        // console.log("successfully registered");
        window.alert("Registered Successfully");
        history.push("/login");
      } else {
        window.alert("Registion Failed");
      }
    } catch (error) {
      window.alert("Registion Failed");
    }
  };
  return (
    <div className="container-sm" style={{ width: "55vh" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create Account</h2>
          <Form>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control placeholder="alice" ref={usernameref} />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-Mail</Form.Label>
              <Form.Control placeholder="alice@gmail.com" ref={emailref} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="abcd$123"
                ref={passref}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="outline-secondary"
              className="w-100 my-3"
              onClick={usersubmit}
            >
              Sign Up
            </Button>
          </Form>
          <div>
            {" "}
            Already have an account <Link to="/login">Login</Link>{" "}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
