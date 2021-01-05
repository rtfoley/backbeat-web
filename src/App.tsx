import React from "react";
import "./App.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
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
  const itemInput = (handleSubmit: (value: string) => void) => {
    return (
      <Form
        inline
        onSubmit={(event: any) => {
          event.preventDefault();
          handleSubmit(event.target[0].value);
          event.target[0].value = "";
        }}
      >
        <Form.Group controlId="formBasicItem" className="mr-2">
          <Form.Control type="text" placeholder="Enter your retro item" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
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
      <Row>
        <Col xs={11}>Welcome {user?.displayName}!</Col>
        <Col>
          <Button className="my-2" onClick={() => auth().signOut()}>
            Sign Out
          </Button>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h1>Liked</h1>
          {itemInput((value: string) => handleNewItem(Columns.LIKED, value))}
        </Col>
        <Col>
          <h1>Learned</h1>
          {itemInput((value: string) => handleNewItem(Columns.LEARNED, value))}
        </Col>
        <Col>
          <h1>Lacked</h1>
          {itemInput((value: string) => handleNewItem(Columns.LACKED, value))}
        </Col>
        <Col>
          <h1>Longed-For</h1>
          {itemInput((value: string) =>
            handleNewItem(Columns.LONGED_FOR, value)
          )}
        </Col>
      </Row>
      <Row className="mt-4">
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
