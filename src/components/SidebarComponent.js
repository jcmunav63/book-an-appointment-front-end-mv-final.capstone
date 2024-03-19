import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/stylesheets/sidebar.module.css';

function Sidebar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = React.useState(false);

  const clickHandle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isActive ? styles.active : ''}`}>
        <ul>
          <li><button type="button" onClick={() => navigate('/home')}>Home</button></li>
          <li><button type="button" onClick={() => navigate('/NewReservation')}>Reserve</button></li>
          <li><button type="button" onClick={() => navigate('#')}>My Reservations</button></li>
          <li><button type="button" onClick={() => navigate('/newSpaceCw')}>Add coworking</button></li>
          <li><button type="button" onClick={() => navigate('/deleteSpaceCw')}>Delete coworking</button></li>
          <li><button type="button" onClick={() => navigate('#')}>Logout</button></li>
        </ul>
      </div>
      <button type="button" className={`${styles.icon} ${isActive ? styles.closeIcon : ''}`} onClick={clickHandle} aria-label="Toggle Sidebar" />
    </>
  );
}

export default Sidebar;
