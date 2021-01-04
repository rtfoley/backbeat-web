import React from 'react';
import './App.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Columns, RetroItem } from './types';
import RetroItemGrid from './Components/RetroItemGrid';

const testItems: RetroItem[] = [
  {
    text: "Something Tester1 liked",
    column: Columns.LIKE,
    author: "Tester1",
    isPublished: false,
    voters: []
  },
  {
    text: "Something Tester2 learned",
    column: Columns.LEARNED,
    author: "Tester2",
    isPublished: true,
    voters: []
  },
  {
    text: "Something Tester3 lacked",
    column: Columns.LACKED,
    author: "Tester3",
    isPublished: true,
    voters: []
  },
  {
    text: "Something Tester4 longed-for",
    column: Columns.LONGED_FOR,
    author: "Tester4",
    isPublished: false,
    voters: []
  },
]

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Liked <Button>Add</Button></h1>
        </Col>
        <Col>
          <h1>Learned</h1>
        </Col>
        <Col>
          <h1>Lacked</h1>
        </Col>
        <Col>
          <h1>Longed-For</h1>
        </Col>
      </Row>
      <Row>
        <Col><h4 className="my-2">Unpublished</h4></Col>
      </Row>
      <RetroItemGrid items={testItems} showUnpublished={true}/>
      <Row>
        <Col><h4 className="my-2">Everyone's</h4></Col>
      </Row>
      <RetroItemGrid items={testItems} showUnpublished={false}/>
    </Container>
  );
}

export default App;
