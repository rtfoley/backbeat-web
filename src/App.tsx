import React from 'react';
import './App.css';
import { Card, Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Start</h1>
          <Card>
            <Card.Body>Test</Card.Body>
          </Card>
          <Card>
            <Card.Body>Test 2</Card.Body>
          </Card>
          <Card>
            <Card.Body>Test 3</Card.Body>
          </Card>
        </Col>
        <Col>
          <h1>Stop</h1>
          <Card>
            <Card.Body>Test 4</Card.Body>
          </Card>
          <Card>
            <Card.Body>Test 5</Card.Body>
          </Card>
        </Col>
        <Col>
          <h1>Continue</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
