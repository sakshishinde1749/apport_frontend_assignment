import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import GroupSelector from '../GroupSelector/GroupSelector';
import SortSelector from '../SortSelector/SortSelector';
import { ReactComponent as DisplayIcon } from '../../assets/Display.svg';
import { ReactComponent as DownArrowIcon } from '../../assets/down.svg';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && 
          dropdownRef.current && 
          buttonRef.current &&
          !dropdownRef.current.contains(event.target) &&
          !buttonRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

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
          ref={buttonRef}
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
            <div ref={dropdownRef} className="dropdown-menu">
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
