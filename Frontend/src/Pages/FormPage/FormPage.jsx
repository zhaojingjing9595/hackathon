import React, { useState, useMemo } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import Select from "react-select";
import countryList from "react-select-country-list";
import Results from "./Results";
// import trails from "../../data/trails.json";
import { search } from "../../services/api";
// import "./FormPage.css"

function FormPage() {
  const [time, setTime] = useState("");
  const [length, setLength] = useState("");
  const [hiking, setHiking] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [country, setCountry] = useState("");
  const [climb, setClimb] = useState("");
  const [maximumAttitude, setMaximumAttitude] = useState("");
  const [minimumAttitude, setMinimumAttitude] = useState("");
  const [meters, setMeters] = useState("");

  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);

  const options = useMemo(() => countryList().getData(), []);

  const changeCountryHandler = (value) => {
    setCountry(value);
  };

  async function handleSearch() {
    if (!time || !length || !hiking || !difficulty || !country) {
      setEmptyFieldError(true);
    } else {
      setEmptyFieldError(false);
      const userAnswers = {
        moving_time: parseInt(time),
        length_3d: parseInt(length),
        hiking_environment: hiking,
        difficulty: parseInt(difficulty),
        country: country.label,
        uphill: parseInt(climb),
        max_elevation: parseInt(maximumAttitude),
        min_elevation: parseInt(minimumAttitude),
        downhill: parseInt(meters),
      };
      console.log(userAnswers);
      // setIsSearching(true);
      const results = await search(userAnswers);
      console.log(results);
      // setIsSearching(false);
      setResults(results);
    }
  }

  return (
    <Container className="form-page">
      <h1 className="text-center my-3">Find your new hike!</h1>
      <Row className="justify-content-center">
        <Col xs="10" md="8" lg="10">
          {results.length === 0 && (
            <Form className="my-3 ">
              {emptyFieldError && (
                // <Row className="justify-content-center">
                // <Col md="12" lg="8">
                <Alert variant="danger">
                  Error: please complete all fields!
                </Alert>
                // </Col></Row>
              )}
              <Row className="justify-content-center">
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      How many days do you want to hike in total?
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="days"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      How many kilometers do you want to hike in total?
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Km"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Please choose the hiking environment
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={hiking}
                      onChange={(e) => setHiking(e.target.value)}
                    >
                      <option value="">Choose...</option>
                      <option value="Valley">Valley</option>
                      <option value="Mountain">Mountain</option>
                      <option value="Alpine">Alpine</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Please choose the difficulty</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option value={""}>Choose...</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      How many meters do you want to climb down?
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="meter"
                      value={meters}
                      onChange={(e) => setMeters(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      How many meters do you want to climb up?
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="meter"
                      value={climb}
                      onChange={(e) => setClimb(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      What's the maximum attitude are you going to reach?
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Maximum attitude / meter"
                      value={maximumAttitude}
                      onChange={(e) => setMaximumAttitude(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      What's the minimum attitude are you going to start?
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Minimum attitude / meter"
                      value={minimumAttitude}
                      onChange={(e) => setMinimumAttitude(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <Form.Label>Please choose a country</Form.Label>
                    <Select
                      options={options}
                      value={country}
                      onChange={changeCountryHandler}
                    />
                  </Form.Group>
                </Col>
                <Col style={{ textAlign: "end", alignSelf: "center" }}>
                  <Button
                    disabled={isSearching ? true : false}
                    className="p-form-btn"
                    style={{
                      marginLeft: "auto",
                      backgroundColor: "#563d7c",
                      borderColor: "#563d7c",
                    }}
                    type="button"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                  {isSearching && (
                    <Spinner className="mx-1" animation="border" size="sm" />
                  )}
                </Col>
              </Row>
            </Form>
          )}

          {results.length > 0 && (
            <Row className="justify-content-center">
              <Col md="12" lg="10" xl="10">
                {/* <Row>
                  <Col>
                    <Button
                      // disabled={isSearching ? true : false}
                      variant="outline"
                      style={{
                        marginRight: "auto",
                        color: "#563d7c",
                        borderColor: "#563d7c",
                      }}
                      type="button"
                      onClick={() => setResults([])}
                    >
                      Search Again
                    </Button>
                  </Col>
                </Row> */}
                <Row xs={1} sm={2} md={3} className="g-4 py-3">
                  <Results trails={results} />
                </Row>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default FormPage;
