// import { NavLink } from 'react-router-dom';
import './Home.css';
import gitImg from '../../img/githubImg.svg';
function Home() {
  return (
    <div className='home-container'>
      <div className='text-box'>
        <h1>HELLO!</h1>
        <p>
          We are students of bootcamp{' '}
          <span>
            <a
              id='hackABoss'
              className='hackaboss'
              href='https://www.hackaboss.com/'
              target='_blank'
              rel='noreferrer'
            >
              Hack A Boss
            </a>
          </span>
        </p>
        <div className='link-container'>
          <ul className='ul-home'>
            <li className='li-home'>
              <img src={gitImg} alt='gitImg' className='gitImg' />
              <a
                className='a-home'
                href='https://github.com/erick26i'
                target='_blank'
                rel='noreferrer'
              >
                Erick
              </a>
            </li>
            <li className='li-home'>
              <img src={gitImg} alt='gitImg' className='gitImg' />
              <a
                className='a-home'
                href='https://github.com/EvegeniyNekrasov'
                target='_blank'
                rel='noreferrer'
              >
                Yev
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
