import React from 'react';
import styles from '../assets/stylesheets/sidebar.module.css';

function Sidebar() {
  const [isActive, setIsActive] = React.useState(false);

  const clickHandle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isActive ? styles.active : ''}`}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
      <button type="button" className={`${styles.icon} ${isActive ? styles.closeIcon : ''}`} onClick={clickHandle} aria-label="Toggle Sidebar" />
    </>
  );
}

export default Sidebar;
