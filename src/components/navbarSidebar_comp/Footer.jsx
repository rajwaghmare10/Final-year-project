import React, { useContext } from 'react';
import './Footer.css'; // Assuming you will create a CSS file for styling
import { togglecontext } from '../../context/context';

const Footer = () => {
  const isOpen = useContext(togglecontext);

  return (
    <div className={`footer ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="footer-left">
        © 2024 XE Gaming. All rights reserved.
      </div>
      <div className="footer-right">
        <a href="/">Privacy Policy</a>
        <a href="/">Terms of Service</a>
        <a href="/">Communities</a>
        <a href="/">Help</a>
      </div>
    </div>
  );
};

export default Footer;
