
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    // Optionally, add token validation here
    return !!token;
  });
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div>
        {showRegister ? (
          <>
            <Register onRegister={() => setShowRegister(false)} />
            <p style={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <button onClick={() => setShowRegister(false)} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <p style={{ textAlign: 'center' }}>
              Don't have an account?{' '}
              <button onClick={() => setShowRegister(true)} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>Register</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <HomePage />
    </>
  );
}

export default App
