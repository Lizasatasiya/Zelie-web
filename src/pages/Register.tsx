import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCred.user.uid), {
        wishlist: [],
        orders: [],
      });
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border shadow-md rounded">
        <BackButton />
      <h2 className="text-2xl font-light mb-6 text-center">Create Account</h2>
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
        onClick={handleRegister}
        className="w-full bg-[#503e28] text-white py-3 rounded hover:bg-[#3d2f1f] transition"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
