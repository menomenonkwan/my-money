import { useEffect, useState } from "react";
import { useAuthContext } from './useAuthContext';
import { projectAuth } from '../firebase/config';

export const useLogout = () => {
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setLoading(true);

    // logout user
    try {
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

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
  }, []);

  return { logout, loading, error };
}
  