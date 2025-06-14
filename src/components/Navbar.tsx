import React from "react";
import "../styles/Navbar.css";

interface NavbarProps {
  isControlledMode: boolean;
  onModeChange: (isControlled: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isControlledMode, onModeChange }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="logo">
        <span>WYSIWYG Editor</span>
      </div>
      <div className="mode-toggle">
        <label className="switch" aria-label="Toggle editor mode">
          <input
            type="checkbox"
            checked={isControlledMode}
            onChange={(e) => onModeChange(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <span className="mode-label">
          {isControlledMode ? "Controlled Mode" : "Uncontrolled Mode"}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
