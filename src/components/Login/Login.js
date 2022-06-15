import { useToken } from '../../Context/TokenContext';
import { useState } from 'react';
import { useModal } from '../../Context/ModalContext';
import { Navigate } from 'react-router-dom';
import Register from '../Home&Register/Register';
import logo from '../../img/logo_hab.jpg';
import './Login.css';

function Login() {
  const [token, setToken] = useToken();
  const [, setModal] = useModal('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setToken(data.data);
      localStorage.setItem('user', JSON.stringify(username));
      setStatus('success');
      setModal(null);
    } catch (e) {
      setStatus('error');
    }
  }
  if (token) {
    return <Navigate to='/' />;
  }

  return (
    <aside className='log-contain'>
      <h2>Login</h2>
      <form id='login' onSubmit={handleSubmit}>
        <img className='logo' src={logo} alt='logo' />
        <label>
          <input
            placeholder='Username'
            name='username'
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <input
            placeholder='Password'
            name='password'
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className='btn' disabled={status === 'loading'}>
          {status === 'loading' ? 'Cargando...' : 'Login'}
        </button>
        <p className='account-text'>
          No account?{' '}
          <span id='login-link' onClick={() => setModal(<Register />)}>
            Register
          </span>
        </p>
        {status === 'error' && (
          <p className='error'>Credenciales no validas. Intentalo de nuevo.</p>
        )}
      </form>
    </aside>
  );
}

export default Login;
