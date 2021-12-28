import { useRef, useState, useEffect } from "react"
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // use ref to prevent infinite loop caused by array
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    
    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }
    
    const unsub = ref.onSnapshot(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      });

      // update state
      setDocuments(results);
      setError(null);
    }, (error) => {
      setError('Could not get the data');
      console.log(error);
    });

    // unsubscribe on unmount
    return () => unsub();

  }, [collection, query, orderBy]);

  return { documents, error };
}