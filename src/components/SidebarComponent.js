import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import styles from '../assets/stylesheets/sidebar.module.css';

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = React.useState(false);

  const navigateTo = (route) => {
    navigate(route);
    setIsActive(false);
  };

  const clickHandle = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsActive(false);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={`${styles.sidebar} ${isActive ? styles.active : ''}`}>
        <h1>SMART COWORKING</h1>
        <ul>
          <li><button type="button" onClick={() => navigateTo('/https://jcmunav63.github.io/book-an-appointment-front-end-mv-final-capstone/')}>HOME</button></li>
          <li><button type="button" onClick={() => navigateTo('/NewReservation')}>RESERVE</button></li>
          <li><button type="button" onClick={() => navigateTo('/MyReservations')}>RESERVATIONS</button></li>
          <li><button type="button" onClick={() => navigateTo('/newSpaceCw')}>ADD</button></li>
          <li><button type="button" onClick={() => navigateTo('/deleteSpaceCw')}>DELETE</button></li>
          <li><button type="button" onClick={handleLogout}>LOGOUT</button></li>
        </ul>
      </div>
      <button type="button" className={`${styles.icon} ${isActive ? styles.closeIcon : ''}`} onClick={clickHandle} aria-label="Toggle Sidebar" />
    </>
  );
}

export default Sidebar;
