import { useEffect, useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [noMatch, setNoMatch] = useState(true);
    const { signup, loading, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  }

  useEffect(() => {
    setNoMatch(true);
    if (password === passwordCheck && passwordCheck.length > 0) {
      setNoMatch(false);
    }
  }, [password, passwordCheck]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <label>
        <span>username:</span>
        <input 
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          // required
        />
      </label>
      <label>
        <span>email:</span>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          // required
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          // required
        />
      </label>
      <label>
        <span>retype password:</span>
        <input 
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
          value={passwordCheck}
          // required
        />
      </label>

      {!loading && <button type="submit" className='btn' disabled={noMatch}>Submit</button>}
      {loading && <button className='btn' disabled>Loading</button>}
      {error && <p className='error'>{error}</p>}
    </form>
  )
}
