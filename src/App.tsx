import React, { useRef, useState } from "react";
import "./App.css";
import { Button, Col, Container, Form, Modal, Nav, Row } from "react-bootstrap";
import { Columns, RetroItem } from "./types";
import RetroItemGrid from "./Components/RetroItemGrid";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import {
  useFirestore,
  useFirestoreCollectionData,
  useAuth,
  useUser,
} from "reactfire";

function App() {
  const auth = useAuth;
  const { data: user } = useUser();

  const firestore = useFirestore();
  const retroItemsCollection = firestore.collection("retroItems");
  const retroItemsQuery = retroItemsCollection.orderBy("created", "asc");
  const { status, data: retroItems } = useFirestoreCollectionData(
    retroItemsQuery,
    {
      idField: "id",
    }
  );

  const serverTimestamp = useFirestore.FieldValue.serverTimestamp();

  const [showModal, setShowModal] = useState<boolean>(false);
  const currentColumn = useRef<Columns>();

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    signInOptions: [auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  /**
   * Input component for the new retro items
   * @param handleSubmit
   */
  const itemInput = (column: Columns) => {
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={() => {
          currentColumn.current = column;
          setShowModal(true);
        }}
      >
        Add
      </Button>
    );
  };

  /**
   * Handle when a new item is submitted
   * @param column
   * @param text
   */
  const handleNewItem = (column: Columns, text: string) => {
    const userUid: string = user.uid;

    if (userUid !== null && userUid !== undefined) {
      retroItemsCollection.add({
        text: text,
        column: column,
        isPublished: false,
        voters: [],
        createdBy: userUid,
        authorName: user.displayName,
        created: serverTimestamp,
      });
    }
  };

  /**
   * Handle when a new item needs to be published
   * @param item
   */
  const handlePublishItem = (item: RetroItem) => {
    retroItemsCollection.doc(item.id.toString()).update({ isPublished: true });
  };

  const handleModalSave = (event: any) => {
    event.preventDefault();
    handleNewItem(currentColumn.current, event.target[0].value);
    event.target[0].value = "";
    setShowModal(false);
  };

  const handleModalCancel = (event: any) => {
    setShowModal(false);
  };

  // Return the auth page if the user hasn't signed in
  if (!user) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
      </div>
    );
  }

  return (
    <Container fluid>
      <Modal
        show={showModal}
        onHide={handleModalCancel}
        backdrop="static"
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Add Retro Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleModalSave} className="m-2">
          <Form.Group controlId="formBasicItem">
            <Form.Control as="textarea" placeholder="Enter your retro item" />
          </Form.Group>
          <Button variant="primary" type="submit" className="mr-2">
            Add
          </Button>
          <Button variant="secondary" onClick={handleModalCancel}>
            Cancel
          </Button>
        </Form>
      </Modal>
      <Nav className="my-2 justify-content-end">
        <Nav.Item className="mr-4">
          <h3>Welcome {user?.displayName}!</h3>
        </Nav.Item>
        <Nav.Item>
          <Button variant="outline-secondary" onClick={() => auth().signOut()}>
            Sign Out
          </Button>
        </Nav.Item>
      </Nav>
      <Row className="mb-2">
        <Col>
          <h1>Liked {itemInput(Columns.LIKED)}</h1>
        </Col>
        <Col>
          <h1>Learned {itemInput(Columns.LEARNED)}</h1>
        </Col>
        <Col>
          <h1>Lacked {itemInput(Columns.LACKED)}</h1>
        </Col>
        <Col>
          <h1>Longed-For {itemInput(Columns.LONGED_FOR)}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Unpublished</h4>
        </Col>
      </Row>
      <RetroItemGrid
        items={retroItems?.filter(
          (item: any) => item.createdBy === firebase.auth()?.currentUser?.uid
        )}
        showUnpublished={true}
        onPublish={handlePublishItem}
      />
      <Row className="mt-4">
        <Col>
          <h4 className="my-2">Everyone's</h4>
        </Col>
      </Row>
      <RetroItemGrid items={retroItems} showUnpublished={false} />
    </Container>
  );
}

export default App;
