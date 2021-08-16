import React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { StarFill, PinFill } from "react-bootstrap-icons";
import axios from "axios";
import { format } from "timeago.js";
import { Card, Form, Button } from "react-bootstrap";

export default function Home({ currUser, setCurruser }) {
 
  const REACT_APP_MAPBOX =
    "pk.eyJ1IjoiYWRhcnNoMjE0MSIsImEiOiJja3NicDBqdXEwOHhzMzJwa2w2dnRobTBrIn0.4T4G4pvs4ESbLqJ2YZNH9w";
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 22,
    longitude: 71,
    zoom: 3,
  });
  const [pins, setPins] = useState([]);
  const [clickedid, setClickedid] = useState(null);
  const [newloc, setNewloc] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const allpins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    allpins();
  }, []);

  const locClicked = (e) => {
    setClickedid(e);
  };
  const add_location = (e) => {
    const [long, lat] = e.lngLat;
    setNewloc({
      lat,
      long,
    });
  };
  const userSubmitReview = async (e) => {
    e.preventDefault();
    const newpin = {
      username: currUser,
      title,
      desc,
      rating,
      lat: newloc.lat,
      long: newloc.long,
    };
    try {
      const res = await axios.post("/pins", newpin);
      setPins([...pins, res.data]);
      setNewloc(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onDblClick={add_location}
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-viewport.zoom * 4}
              offsetTop={-viewport.zoom * 8}
            >
              <PinFill
                style={{
                  fontSize:
                    p.username === currUser
                      ? viewport.zoom * 10
                      : viewport.zoom * 8,
                  color: p.username === currUser ? "blue" : "black",
                  cursor: "pointer",
                }}
                onClick={() => locClicked(p._id)}
              />
            </Marker>
            {clickedid === p._id && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setClickedid(null)}
                anchor="left"
              >
                <div className="container-sm" style={{ width: "30vh" }}>
                  <label
                    style={{
                      color: "gold",
                      borderBottom: "0.5px solid gold",
                    }}
                  >
                    Title
                  </label>
                  <h5 style={{ color: "green" }}>{p.title}</h5>
                  <br />
                  <label
                    style={{
                      color: "gold",
                      borderBottom: "0.5px solid gold",
                    }}
                  >
                    Review
                  </label>
                  <p style={{ color: "green" }}>{p.desc}</p> <br />
                  <label
                    style={{
                      color: "gold",
                      borderBottom: "0.5px solid gold",
                    }}
                  >
                    Rating
                  </label>
                  <div>
                    {Array(p.rating)
                      .fill(1)
                      .map((el, i) => (
                        <StarFill key={i} style={{ color: "tomato" }} />
                      ))}
                  </div>{" "}
                  <br />
                  <p style={{ color: "blue", fontSize: "0.75rem" }}>
                    created by {p.username}
                  </p>
                  <p style={{ color: "blue", fontSize: "0.75rem" }}>
                    {format(p.createdAt)}
                  </p>
                </div>
              </Popup>
            )}
          </>
        ))}

        {newloc && (
          <Popup
            latitude={newloc.lat}
            longitude={newloc.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewloc(null)}
            anchor="left"
          >
            <div
              className="container-sm mt-3 bg-dark"
              style={{ width: "45vh" }}
            >
              <Card>
                <Card.Body>
                  <h3 className="text-center mb-4" style={{ color: "tomato" }}>
                    Add Reviews
                  </h3>
                  <Form>
                    <Form.Group>
                      <Form.Label
                        style={{
                          color: "gold",
                          fontSize: "20px",
                          borderBottom: "0.5px solid gold",
                        }}
                      >
                        Title
                      </Form.Label>
                      <Form.Control
                        placeholder="Tajmahal"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label
                        style={{
                          color: "gold",
                          fontSize: "20px",
                          borderBottom: "0.5px solid gold",
                        }}
                      >
                        Review
                      </Form.Label>
                      <Form.Control
                        placeholder="something about this place"
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label
                        style={{
                          color: "gold",
                          fontSize: "20px",
                          borderBottom: "0.5px solid gold",
                        }}
                      >
                        Rating
                      </Form.Label>
                      <select
                        className="ml-4"
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="outline-secondary"
                      className="w-100 my-3"
                      onClick={userSubmitReview}
                    >
                      Add
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
