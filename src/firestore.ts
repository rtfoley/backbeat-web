import { Columns, RetroItem } from "./types";

const useFirestore = (firebase: any) => {
  const db = firebase.firestore();

  const getRetroItems = (): RetroItem[] => {
    return db.collection("retroItems").get();
  };

  const createRetroItem = (
    text: string,
    column: Columns,
    userUid: string,
    userDisplayName: string
  ) => {
    return db.collection("retroItems").add({
      text: text,
      column: column,
      isPublished: false,
      voters: [],
      createdBy: userUid,
      authorName: userDisplayName,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const publishRetroItem = (id: number) => {
    return db.collection("retroItems").doc(id).set({
      isPublished: true,
    });
  };

  const streamRetroItems = (observer: any) => {
    return db.collection("retroItems").orderBy("created").onSnapshot(observer);
  };

  return {
    getRetroItems,
    createRetroItem,
    streamRetroItems,
  };
};

export default useFirestore;
