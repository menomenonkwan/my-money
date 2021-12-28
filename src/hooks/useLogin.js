import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    
    try {
      // login user
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error('Could not complete login');
      }

      // dispatch login
      dispatch({ type: 'LOGIN', payload: res.user });

      // update state
      if (!cancelled) {
        setLoading(false);
        setError(null);
      }

    } catch (err) {
      if (!cancelled) {
        console.log(err.message);
        setLoading(false);
        setError(err.message);
      }
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  })

  return { login, loading, error };
}
