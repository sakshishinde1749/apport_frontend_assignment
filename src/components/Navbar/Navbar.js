import React, { useState, useEffect } from 'react';
import './Navbar.css';
import GroupSelector from '../GroupSelector/GroupSelector';
import SortSelector from '../SortSelector/SortSelector';
import { ReactComponent as DisplayIcon } from '../../assets/Display.svg';
import { ReactComponent as DownArrowIcon } from '../../assets/down.svg';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Prevent body scroll when dropdown is open on mobile
  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDropdownOpen]);

  // Handler for when an option is selected
  const handleOptionSelect = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="display-dropdown">
        <button 
          className="display-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <DisplayIcon />
          Display
          <DownArrowIcon />
        </button>

        {isDropdownOpen && (
          <>
            <div className="dropdown-backdrop" onClick={() => setIsDropdownOpen(false)} />
            <div className="dropdown-menu">
              <div className="dropdown-section">
                <span className="dropdown-label">Grouping</span>
                <GroupSelector onSelect={handleOptionSelect} />
              </div>
              <div className="dropdown-section">
                <span className="dropdown-label">Ordering</span>
                <SortSelector onSelect={handleOptionSelect} />
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
