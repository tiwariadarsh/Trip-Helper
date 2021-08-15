import React, { useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Login({
  currUser,
  setCurruser,
  setshowReg,
  setshowLogin,
  setshowLogout,
  storage,
}) {
  const history = useHistory();
  const emailref = useRef();
  const passref = useRef();
  const usersubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: emailref.current.value,
      password: passref.current.value,
    };
    try {
      const res = await axios.post("/login", user);
      if (res.status === 200) {
        // console.log("successfully registered");
        //console.log(res.data);
        setCurruser(res.data);
        storage.setItem("user", res.data);
        //console.log(currUser);
        setshowReg(false);
        setshowLogin(false);
        setshowLogout(true);
        window.alert("Logged In Successfully");

        history.push("/");
      } else {
        window.alert("Failed");
      }
    } catch (error) {
      window.alert("Failed");
    }
  };
  return (
    <div className="container-sm" style={{ width: "55vh" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          <Form>
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
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
