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
  const [authType, setAuthType] = useState('password');

  const stars = Array.from({ length: 180 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 2}px`,
    dur: `${3 + Math.random() * 4}s`
  }));

  return (
    <div className="drishti-container">
      {/* 1. BACKGROUND SKY */}
      <div style={{ position: 'absolute', top: '8%', right: '12%', width: '60px', height: '60px', borderRadius: '50%', boxShadow: '-12px 12px 0 0 rgba(255,255,255,0.8)', transform: 'rotate(-20deg)', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}></div>
      
      {/* STARS */}
      {stars.map(s => <div key={s.id} className="star" style={{ top: s.top, left: s.left, width: s.size, height: s.size, '--d': s.dur }} />)}

      {/* SHOOTING COMETS */}
      <div className="comet" style={{ top: '10%', left: '85%', width: '180px', '--s': '7s' }}></div>
      <div className="comet" style={{ top: '25%', left: '95%', width: '140px', '--s': '11s', animationDelay: '4s' }}></div>

      {/* 2. DENSE SIDE FORESTS */}
      <div style={{left: '3%', position: 'absolute', bottom: 0, display: 'flex', alignItems: 'flex-end', opacity: 0.8}}>
        {[300, 200, 350].map((h, i) => <LeafyTree key={i} height={h} style={{marginLeft: i === 0 ? 0 : '-40px'}} />)}
      </div>
      <div style={{right: '3%', position: 'absolute', bottom: 0, display: 'flex', alignItems: 'flex-end', opacity: 0.8}}>
        {[350, 200, 300].map((h, i) => <LeafyTree key={i} height={h} style={{marginRight: i === 0 ? 0 : '-40px'}} />)}
      </div>

      {/* 3. LIGHTER CENTER LOGIN CARD */}
      <div className="auth-card">
        <h1 className="glitter-text">{isLogin ? 'Login' : 'Signup'}</h1>
        <div style={{ height: '1px', width: '50px', background: '#7bd5ff', margin: '15px auto 25px', opacity: 0.5 }}></div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', marginBottom: '25px', fontSize: '0.85rem' }}>
          <span onClick={() => setMethod('email')} style={{ cursor: 'pointer', color: method === 'email' ? '#7bd5ff' : '#fff', opacity: method === 'email' ? 1 : 0.5 }}>Email</span>
          <span onClick={() => setMethod('phone')} style={{ cursor: 'pointer', color: method === 'phone' ? '#7bd5ff' : '#fff', opacity: method === 'phone' ? 1 : 0.5 }}>Phone</span>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input type="text" placeholder={method === 'email' ? 'Email Address' : 'Phone Number'} />
          </div>

          <div className="input-group">
            <input type={authType === 'password' ? 'password' : 'text'} placeholder={authType === 'password' ? 'Password' : 'Enter OTP'} />
            <span onClick={() => setAuthType(authType === 'password' ? 'otp' : 'password')} style={{ fontSize: '0.7rem', color: '#7bd5ff', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {authType === 'password' ? 'Use OTP' : 'Use Pass'}
            </span>
          </div>

          <button className="login-btn">
            {isLogin ? 'Continue' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '25px', fontSize: '0.8rem', opacity: 0.5 }}>
          {isLogin ? "New here? " : "Already a member? "}
          <span onClick={() => setIsLogin(!isLogin)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{isLogin ? 'Signup' : 'Login'}</span>
        </p>
      </div>

      {/* 4. GROUND LAYER */}
      <svg style={{ position: 'absolute', bottom: '-2px', width: '100%', zIndex: 12 }} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,80 L1440,80 L1440,0 C1100,40 400,40 0,0 Z" fill="#050614" />
      </svg>
    </div>
  );
}

export default App;