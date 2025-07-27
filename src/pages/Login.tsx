import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { usePopup } from '../contexts/PopupContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showPopup } = usePopup();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showPopup('Login successful!');
      navigate('/');
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        showPopup('User not registered. Please register first.');
      } else {
        showPopup('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-[#503e28] hover:underline"
      >
        ← Back
      </button>

      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-[#503e28] text-white py-2 rounded"
      >
        Login
      </button>

      {/* Register link */}
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#503e28] font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
