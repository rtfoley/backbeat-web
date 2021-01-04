import React, { useEffect, useState } from "react";
import "./App.css";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Columns, RetroItem } from "./types";
import RetroItemGrid from "./Components/RetroItemGrid";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import useFirestore from "./firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [retroItems, setRetroItems] = useState<RetroItem[]>([]);
  const [error, setError] = useState<string>("");

  const firestore = useFirestore(firebase);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  // Use an effect hook to subscribe to the grocery list item stream and
  // automatically unsubscribe when the component unmounts.
  useEffect(() => {
    const unsubscribe = firestore.streamRetroItems({
      next: (querySnapshot: any) => {
        const updatedItems = querySnapshot.docs.map((docSnapshot: any) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));

        setRetroItems(updatedItems);
      },
      error: () => setError("Failed to get data, probably exceeded quota"),
    });
    return unsubscribe;
  }, [firestore, setRetroItems, setError]);

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

  const handleNewItem = (column: Columns, text: string) => {
    const userUid: string = firebase.auth()?.currentUser?.uid;

    if (userUid !== null && userUid !== undefined) {
      firestore.createRetroItem(
        text,
        column,
        firebase.auth().currentUser.uid,
        firebase.auth().currentUser.displayName
      );
    }
  };

  const handlePublishItem = (item: RetroItem) => {
    firestore.publishRetroItem(item.id);
  };

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={11}>Welcome {firebase.auth()?.currentUser?.displayName}!</Col>
        <Col>
          <Button className="my-2" onClick={() => firebase.auth().signOut()}>
            Sign Out
          </Button>
        </Col>
      </Row>
      {error.length > 0 ? (
        <Row className="my-2">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      ) : null}
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
        items={retroItems.filter(
          (item: RetroItem) =>
            item.createdBy === firebase.auth()?.currentUser?.uid
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
