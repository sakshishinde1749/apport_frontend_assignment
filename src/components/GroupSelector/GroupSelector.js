import React from 'react';
import './GroupSelector.css';
import { useKanban } from '../../context/KanbanContext';
import { ReactComponent as StatusIcon } from '../../assets/To-do.svg';
import { ReactComponent as UserIcon } from '../../assets/Img - High Priority.svg';
import { ReactComponent as PriorityIcon } from '../../assets/Img - Medium Priority.svg';

const GroupSelector = ({ onSelect }) => {
  const { groupBy, setGroupBy } = useKanban();
  
  const groupingOptions = [
    { value: 'status', label: 'Status', icon: <StatusIcon /> },
    { value: 'user', label: 'User', icon: <UserIcon /> },
    { value: 'priority', label: 'Priority', icon: <PriorityIcon /> }
  ];

  const handleChange = (e) => {
    const newValue = e.target.value;
    setGroupBy(newValue);
    localStorage.setItem('kanban_groupBy', newValue);
    onSelect?.();
  };

  return (
    <select 
      className="selector-dropdown"
      value={groupBy}
      onChange={handleChange}
    >
      {groupingOptions.map(option => (
        <option key={option.value} value={option.value}>
           {option.label}
        </option>
      ))}
    </select>
  );
};

export default GroupSelector;
