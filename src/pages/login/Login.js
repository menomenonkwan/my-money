import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useThemeContext } from '../../hooks/useThemeContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useLogin();
  const { mode } = useThemeContext();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }
  
  return (
    <form onSubmit={handleSubmit} className={mode} >
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>

      {!loading && <button type="submit" className='btn'>Submit</button>}
      {loading && <button className='btn' disabled>loading</button>}
      {error && <p className='error'>{error}</p>}
    </form>
  )
}
