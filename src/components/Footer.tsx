import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} WYSIWYG Editor. All rights reserved.
        by Hagar Hassan
      </p>
    </footer>
  );
};

export default Footer;
