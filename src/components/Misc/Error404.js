import { NavLink } from 'react-router-dom';
import errorImg from '../../img/errorImg.svg';
import './Error.css';

export default function Error404() {
  return (
    <div className='container-error'>
      <div className='container-error-wrapper'>
        <img src={errorImg} className='error-img' alt='error img' />
        <NavLink className='error-text' to='/'>
          Wrong place my friend... Go back home ➜
        </NavLink>
      </div>
    </div>
  );
}
