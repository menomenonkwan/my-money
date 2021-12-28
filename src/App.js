import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
// components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
// styles
import './App.css';
import background from './assets/background1.jpg';

function App() {
  const { user, authIsReady } = useAuthContext();
  
  return (
    <div 
      className="App" 
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="tint">

      {authIsReady && 
        <BrowserRouter>
          <Navbar />

          <div className="container">
            <Routes>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" /> } />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" /> } />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" /> } />
              <Route path="*" element={user ? <Home /> : <Navigate to="/login" /> } />
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      }
      
      </div>
    </div>
  );
}

export default App;
