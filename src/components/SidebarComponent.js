import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import styles from '../assets/stylesheets/sidebar.module.css';

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get user from state
  const [isActive, setIsActive] = React.useState(false);

  const navigateTo = (route) => {
    navigate(route);
    setIsActive(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      navigate('/');
    }
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={`${styles.sidebar} ${isActive ? styles.active : ''}`}>
        <h1>SMART COWORKING</h1>
        {user && (
          <ul>
            <li><button type="button" onClick={() => navigateTo('/home')}>HOME</button></li>
            <li><button type="button" onClick={() => navigateTo('/NewReservation')}>RESERVE</button></li>
            <li><button type="button" onClick={() => navigateTo('/MyReservations')}>RESERVATIONS</button></li>
            <li><button type="button" onClick={() => navigateTo('/newSpaceCw')}>ADD</button></li>
            <li><button type="button" onClick={() => navigateTo('/deleteSpaceCw')}>DELETE</button></li>
            <li><button type="button" onClick={handleLogout}>LOGOUT</button></li>
          </ul>
        )}
        {!user && (
          <ul>
            <li><button type="button" onClick={() => navigateTo('/login')}>LOGIN</button></li>
            <li><button type="button" onClick={() => navigateTo('/register')}>REGISTER</button></li>
          </ul>
        )}
      </div>
      <button
        type="button"
        className={`${styles.icon} ${isActive ? styles.closeIcon : ''}`}
        onClick={() => setIsActive(!isActive)}
        aria-label="Toggle Sidebar"
      />
    </>
  );
}

export default Sidebar;
