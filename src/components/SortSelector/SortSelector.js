import React from 'react';
import './SortSelector.css';
import { useKanban } from '../../context/KanbanContext';
import { ReactComponent as PriorityIcon } from '../../assets/Img - Medium Priority.svg';
import { ReactComponent as TitleIcon } from '../../assets/Img - High Priority.svg';

const SortSelector = ({ onSelect }) => {
  const { sortBy, setSortBy } = useKanban();
  
  const sortOptions = [
    { value: 'priority', label: 'Priority', icon: <PriorityIcon /> },
    { value: 'title', label: 'Title', icon: <TitleIcon /> }
  ];

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSortBy(newValue);
    localStorage.setItem('kanban_sortBy', newValue);
    onSelect?.();
  };

  return (
    <select 
      className="selector-dropdown"
      value={sortBy}
      onChange={handleChange}
    >
      {sortOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortSelector;
