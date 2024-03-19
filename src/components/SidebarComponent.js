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
        <h1>SMART COWORKING</h1>
        <ul>
          <li><button type="button" onClick={() => navigate('/home')}>HOME</button></li>
          <li><button type="button" onClick={() => navigate('/NewReservation')}>RESERVE</button></li>
          <li><button type="button" onClick={() => navigate('#')}>RESERVATIONS</button></li>
          <li><button type="button" onClick={() => navigate('/newSpaceCw')}>ADD</button></li>
          <li><button type="button" onClick={() => navigate('/deleteSpaceCw')}>DELETE</button></li>
          <li><button type="button" onClick={() => navigate('#')}>LOGOUT</button></li>
        </ul>
      </div>
      <button type="button" className={`${styles.icon} ${isActive ? styles.closeIcon : ''}`} onClick={clickHandle} aria-label="Toggle Sidebar" />
    </>
  );
}

export default Sidebar;
