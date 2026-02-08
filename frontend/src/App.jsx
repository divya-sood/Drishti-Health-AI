import React, { useState } from 'react';
import './App.css';

const LeafyTree = ({ height, style }) => (
  <svg className="pine-tree" width="80" height={height} viewBox="0 0 100 200" preserveAspectRatio="none" style={style}>
    <path d="M50,0 L60,35 L50,30 L75,70 L50,60 L90,120 L50,100 L110,200 L50,185 L-10,200 L50,100 L10,120 L50,60 L25,70 L50,30 L40,35 Z" fill="#050614" />
    <rect x="46" y="180" width="8" height="20" fill="#050614" />
  </svg>
);

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [method, setMethod] = useState('email'); 

  // FORM STATE
  const [loginName, setLoginName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    
    // Switch endpoint based on Login or Signup mode
    const endpoint = isLogin ? '/api/login' : '/api/signup';

    try {
      const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          loginName, 
          identifier, 
          password 
          // authType removed to match password-only backend
        }),
      });

      const data = await response.json();
      alert(data.message);
      
      if (response.ok && !isLogin) {
        setIsLogin(true); // Switch to login view after successful signup
      }
    } catch (error) {
      alert("Error: Backend server is not responding.");
    }
  };

  const stars = Array.from({ length: 180 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2}px`,
    dur: `${3 + Math.random() * 4}s`
  }));

  return (
    <div className="drishti-container">
      {/* BACKGROUND ELEMENTS */}
      <div style={{ position: 'absolute', top: '8%', right: '12%', width: '60px', height: '60px', borderRadius: '50%', boxShadow: '-12px 12px 0 0 rgba(255,255,255,0.8)', transform: 'rotate(-20deg)' }}></div>
      {stars.map(s => <div key={s.id} className="star" style={{ top: s.top, left: s.left, width: s.size, height: s.size, '--d': s.dur }} />)}
      <div className="comet" style={{ top: '10%', left: '85%', width: '180px', '--s': '7s' }}></div>

      {/* FORESTS */}
      <div style={{left: '3%', position: 'absolute', bottom: 0, display: 'flex', alignItems: 'flex-end', opacity: 0.8}}>
        {[300, 200, 350].map((h, i) => <LeafyTree key={i} height={h} style={{marginLeft: i === 0 ? 0 : '-40px'}} />)}
      </div>
      <div style={{right: '3%', position: 'absolute', bottom: 0, display: 'flex', alignItems: 'flex-end', opacity: 0.8}}>
        {[350, 200, 300].map((h, i) => <LeafyTree key={i} height={h} style={{marginRight: i === 0 ? 0 : '-40px'}} />)}
      </div>

      {/* AUTH CARD */}
      <div className="auth-card">
        <h1 className="glitter-text">{isLogin ? 'Login' : 'Signup'}</h1>
        <div style={{ height: '1px', width: '50px', background: '#7bd5ff', margin: '15px auto 25px', opacity: 0.5 }}></div>

        <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', marginBottom: '25px', fontSize: '0.85rem' }}>
          <span onClick={() => setMethod('email')} style={{ cursor: 'pointer', color: method === 'email' ? '#7bd5ff' : '#fff', fontWeight: method === 'email' ? 'bold' : 'normal' }}>Email</span>
          <span onClick={() => setMethod('phone')} style={{ cursor: 'pointer', color: method === 'phone' ? '#7bd5ff' : '#fff', fontWeight: method === 'phone' ? 'bold' : 'normal' }}>Phone</span>
        </div>

        <form onSubmit={handleAuth}>
          <div className="input-group">
            <input type="text" placeholder="Login Name" value={loginName} onChange={(e) => setLoginName(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="text" placeholder={method === 'email' ? 'Email Address' : 'Phone Number'} value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {/* OTP Toggle Span removed here */}
          </div>
          <button type="submit" className="login-btn">
            {isLogin ? 'Continue' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '25px', fontSize: '0.8rem', opacity: 0.5 }}>
          {isLogin ? "New here? " : "Already a member? "}
          <span onClick={() => setIsLogin(!isLogin)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{isLogin ? 'Signup' : 'Login'}</span>
        </p>
      </div>

      {/* GROUND */}
      <svg style={{ position: 'absolute', bottom: '-2px', width: '100%', zIndex: 12 }} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,80 L1440,80 L1440,0 C1100,40 400,40 0,0 Z" fill="#050614" />
      </svg>
    </div>
  );
}

export default App;