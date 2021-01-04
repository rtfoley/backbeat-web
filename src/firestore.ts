import { RetroItem } from "./types";

const useFirestore = (firebase: any) => {
  const db = firebase.firestore();

  const getRetroItems = (): RetroItem[] => {
    return db.collection("retroItems").get();
  };

  const createRetroItem = (retroItem: RetroItem) => {
    return db.collection("retroItems").add({
      ...retroItem,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const streamRetroItems = (observer: any) => {
    return db.collection("RetroItems").orderBy("created").onSnapshot(observer);
  };

  return {
    getRetroItems,
    createRetroItem,
    streamRetroItems,
  };
};

export default useFirestore;
