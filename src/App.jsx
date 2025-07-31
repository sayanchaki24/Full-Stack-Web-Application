
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
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
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome!</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Add your protected app content here */}
    </div>
  );
}

export default App
