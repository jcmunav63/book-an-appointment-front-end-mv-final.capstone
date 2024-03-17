import React from 'react';
import styles from '../assets/stylesheets/sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}

export default Sidebar;
