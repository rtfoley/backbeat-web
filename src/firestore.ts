import { Columns, RetroItem } from "./types";

const useFirestore = (firebase: any) => {
  const db = firebase.firestore();

  const getRetroItems = (): RetroItem[] => {
    return db.collection("retroItems").get();
  };

  const createRetroItem = (text: string, column: Columns, userUid: string) => {
    return db.collection("retroItems").add({
      text: text,
      column: column,
      isPublished: false,
      voters: [],
      createdBy: userUid,
      created: firebase.firestore.FieldValue.serverTimestamp(),
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
