import { useState } from 'react';
import { useModal } from '../../Context/ModalContext';
import { useToken } from '../../Context/TokenContext';
import { useUser } from '../../Context/UserContext';
import Login from '../Login/Login';
import './Register.css';
import logo from '../../img/logo_hab.jpg';
import { Navigate } from 'react-router-dom';

function Register() {
  const [username, setUser] = useUser('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [biography, setBiography] = useState('');
  const [mail, setMail] = useState('');
  const [token, setToken] = useToken();
  const [, setModal] = useModal();
  const [error, setError] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('success');
    try {
      const res = await fetch('http://127.0.0.1:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, mail, biography }),
      });

      if (password !== password2) {
        setError('The password do not match');
        return;
      }
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setStatus('success');
      setToken(data.data);
    } catch (e) {
      setStatus('error');
    }
    setTimeout(() => {
      setModal(null)
  }, 2000);
  }
  if(token){
    return <Navigate to="/"/>
  }

  return (
    <section className='reg-contain'>
      <h2>Register</h2>
      <form id='register' onSubmit={handleSubmit}>
        <img className='logo' src={logo} alt='logo' />
        <label>
          <span className='label'>Username</span>
          <input 
            placeholder='Username'
            required
            value={username || ''}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <label>
          <span className='label'>Password</span>
          <input
            placeholder='Password'
            name='password'
            type='password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span className='label'>Repeat Password</span>
          <input
            placeholder='Repeat Password'
            name='password2'
            type='password'
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>
        <label>
          <span className='label'>Who are you</span>
          <input
            placeholder='Your ocupation'
            name='biography'
            type='text'
            required
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </label>
        <label>
          <span className='label'>Email</span>
          <input
            placeholder='Email'
            name='email'
            type='email'
            required
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </label>

        <button className='btn'>Register</button>
        {error ? <h3 className='error-message'>{error}</h3> : null}
        {status ? (
          <p className='complete-register'>
            Congratulations! Register complete!
          </p>
        ) : null}
        <p className='account-text'>
          Alredy have an account?{' '}
          <span id='register-link' onClick={() => setModal(<Login />)}>
            Login
          </span>
        </p>
      </form>
    </section>
  );
}

export default Register;
