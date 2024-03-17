import React from 'react';
import styles from '../assets/stylesheets/sidebar.module.css';

function Sidebar() {
  const clickHandle = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
  };

  return (
    <>
      <div className={styles.sidebar}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
      <button type="button" className={styles.icon} onClick={clickHandle} aria-label="Toggle Sidebar">
        <i className={styles.menuIcon} />
      </button>
    </>
  );
}

export default Sidebar;
