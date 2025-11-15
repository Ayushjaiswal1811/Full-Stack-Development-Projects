import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  }

  return (
    <header style={{ display:'flex', gap:20, padding: 12, borderBottom:'1px solid #ddd' }}>
      <Link to="/">Stores</Link>
      {!token && <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>}
      {token && <>
        {role === 'admin' && <Link to="/admin">Admin</Link>}
        <button onClick={logout}>Logout</button>
      </>}
    </header>
  );
}
