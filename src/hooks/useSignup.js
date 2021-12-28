import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setLoading(true);

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);
    
      if (!res) {
        throw new Error('Could not complete signup');
      }

      // add display name
      await res.user.updateProfile({ displayName });
      
      // dispatch login
      dispatch({ type: 'LOGIN', payload: res.user });

      // update state
      if (!cancelled) {
        setError(null);
        setLoading(false);
      }
      
    } catch (err) {
      if (!cancelled) {
        setError(err.message);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  })

  return { signup, loading, error };
}
