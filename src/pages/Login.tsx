import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import BackButton from '../components/BackButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        if (confirm('No user found with this email. Would you like to register instead?')) {
          navigate('/register');
        }
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email format.');
      } else {
        alert(error.message);
      }
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white border shadow-md rounded">
        <BackButton />
      <h2 className="text-2xl font-light mb-6 text-center">Login to Zelie</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-3 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-3 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-[#503e28] text-white py-3 rounded hover:bg-[#3d2f1f] transition"
      >
        Login
      </button>
      <p className="text-center text-sm mt-4">
        Don't have an account? <span onClick={() => navigate('/register')} className="text-[#503e28] cursor-pointer underline">Register</span>
      </p>
    </div>
    
  );
};

export default Login;
