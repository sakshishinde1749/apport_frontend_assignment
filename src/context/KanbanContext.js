import React, { createContext, useContext, useState, useEffect } from 'react';

const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [groupBy, setGroupBy] = useState(() => {
    return localStorage.getItem('kanban_groupBy') || 'status';
  });
  
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem('kanban_sortBy') || 'priority';
  });

  useEffect(() => {
    localStorage.setItem('kanban_groupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('kanban_sortBy', sortBy);
  }, [sortBy]);

  return (
    <KanbanContext.Provider value={{ groupBy, setGroupBy, sortBy, setSortBy }}>
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
}; 