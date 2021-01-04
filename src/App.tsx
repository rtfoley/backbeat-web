import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Columns, RetroItem } from "./types";
import RetroItemGrid from "./Components/RetroItemGrid";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

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

  const testItems: RetroItem[] = [
    {
      text: "Something Tester1 liked",
      column: Columns.LIKE,
      author: "Tester1",
      isPublished: false,
      voters: [],
    },
    {
      text: "Something Tester2 learned",
      column: Columns.LEARNED,
      author: "Tester2",
      isPublished: true,
      voters: [],
    },
    {
      text: "Something Tester3 lacked",
      column: Columns.LACKED,
      author: "Tester3",
      isPublished: true,
      voters: [],
    },
    {
      text: "Something Tester4 longed-for",
      column: Columns.LONGED_FOR,
      author: "Tester4",
      isPublished: false,
      voters: [],
    },
  ];

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
      <Row>
        <Col>
          <h1>
            Liked <Button>Add</Button>
          </h1>
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
        <Col>
          <h4 className="my-2">Unpublished</h4>
        </Col>
      </Row>
      <RetroItemGrid items={testItems} showUnpublished={true} />
      <Row>
        <Col>
          <h4 className="my-2">Everyone's</h4>
        </Col>
      </Row>
      <RetroItemGrid items={testItems} showUnpublished={false} />
    </Container>
  );
}

export default App;
