import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [method, setMethod] = useState('email');

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a0b3b] via-[#4B2CBE] to-[#8261FF] relative overflow-hidden font-sans">
      
      {/* Background Emoji Pattern - The "Interesting" part */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none text-3xl flex flex-wrap gap-16 p-10 justify-around content-around">
        {['🥗', '🏃‍♂️', '💊', '🧘', '💧', '🍱', '💤', '🧠', '🏥', '💪', '🏥', '🤖', '🍛', '🩺'].map((emoji, i) => (
          <span key={i} className="animate-bounce" style={{ animationDuration: `${Math.random() * 3 + 2}s` }}>
            {emoji}
          </span>
        ))}
      </div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md p-10 bg-white/10 backdrop-blur-2xl rounded-[2rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] mx-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            {isLogin ? 'Health AI' : 'Create Account'}
          </h2>
          <p className="text-purple-200 font-medium">
            {isLogin ? 'Welcome back, stay healthy! ✨' : 'Start your health journey today! 🚀'}
          </p>
        </div>

        {/* Toggle between Email and Phone */}
        <div className="flex bg-black/30 rounded-2xl p-1.5 mb-8">
          <button 
            onClick={() => setMethod('email')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${method === 'email' ? 'bg-white text-purple-900 shadow-lg' : 'text-purple-100 hover:text-white'}`}
          >
            Email
          </button>
          <button 
            onClick={() => setMethod('phone')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${method === 'phone' ? 'bg-white text-purple-900 shadow-lg' : 'text-purple-100 hover:text-white'}`}
          >
            Phone
          </button>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-white text-xs font-bold uppercase ml-1 opacity-80">
              {method === 'email' ? 'Email ID' : 'Mobile Number'}
            </label>
            <input 
              type={method === 'email' ? 'email' : 'tel'} 
              placeholder={method === 'email' ? 'name@example.com' : '+91 98765 43210'}
              className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white text-xs font-bold uppercase ml-1 opacity-80">Secret Key</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder={method === 'email' ? 'Password' : 'Enter OTP'}
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-white/20 transition-all"
              />
              {method === 'phone' && (
                <button type="button" className="absolute right-4 top-4 text-xs font-bold text-purple-300 hover:text-white transition-colors">
                  GET OTP
                </button>
              )}
            </div>
          </div>

          <button className="w-full py-4 mt-4 bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-black rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest">
            {isLogin ? 'Login Now' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-purple-100 text-sm">
            {isLogin ? "New to the ecosystem?" : "Already have an account?"} 
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-black text-white hover:underline transition-all"
            >
              {isLogin ? 'REGISTER' : 'LOG IN'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;