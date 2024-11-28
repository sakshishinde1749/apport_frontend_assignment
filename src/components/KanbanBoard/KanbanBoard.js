import React, { useMemo, useEffect, useState } from 'react';
import './KanbanBoard.css';
import TicketCard from '../TicketCard/TicketCard';
import useTickets from '../../hooks/useFetchTickets';
import { useKanban } from '../../context/KanbanContext';
import { ReactComponent as BacklogIcon } from '../../assets/Backlog.svg';
import { ReactComponent as TodoIcon } from '../../assets/To-do.svg';
import { ReactComponent as InProgressIcon } from '../../assets/in-progress.svg';
import { ReactComponent as DoneIcon } from '../../assets/Done.svg';
import { ReactComponent as CancelledIcon } from '../../assets/Cancelled.svg';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as MenuIcon } from '../../assets/3 dot menu.svg';
import { ReactComponent as UrgentIcon } from '../../assets/SVG - Urgent Priority colour.svg';
import { ReactComponent as HighIcon } from '../../assets/Img - High Priority.svg';
import { ReactComponent as MediumIcon } from '../../assets/Img - Medium Priority.svg';
import { ReactComponent as LowIcon } from '../../assets/Img - Low Priority.svg';
import { ReactComponent as NoPriorityIcon } from '../../assets/No-priority.svg';

const UserGroupAvatar = ({ name, available }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="user-group-avatar" title={name}>
      {initials}
      {available !== undefined && (
        <span className={`user-group-availability ${available ? 'available' : 'away'}`}></span>
      )}
    </div>
  );
};

const KanbanBoard = () => {
  const { tickets, loading, error } = useTickets();
  const { groupBy, sortBy } = useKanban();

  // Define all possible values for each grouping type
  const possibleValues = {
    status: ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'],
    priority: [4, 3, 2, 1, 0],
    user: useMemo(() => {
      if (!tickets.length) return [];
      return [...new Set(tickets.map(ticket => ticket.userId))];
    }, [tickets])
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading tickets</div>;

  const groupTickets = (tickets) => {
    // Start with empty groups for all possible values
    const initialGroups = possibleValues[groupBy].reduce((acc, value) => {
      acc[value] = [];
      return acc;
    }, {});

    // Fill in the groups with tickets
    return tickets.reduce((acc, ticket) => {
      let key;
      switch (groupBy) {
        case 'user':
          key = ticket.userId;
          break;
        case 'priority':
          key = ticket.priority;
          break;
        default: // status
          key = ticket.status;
      }
      
      if (acc[key]) {
        acc[key].push(ticket);
      }
      return acc;
    }, initialGroups);
  };

  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  };

  const getGroupTitle = (key) => {
    switch (groupBy) {
      case 'user':
        const userTicket = groupedTickets[key]?.[0];
        return userTicket ? (
          <div className="user-group-header">
            <UserGroupAvatar 
              name={userTicket.user.name} 
              available={userTicket.user.available} 
            />
            <span>{userTicket.user.name}</span>
          </div>
        ) : (
          <div className="user-group-header">
            <UserGroupAvatar name="Unassigned" />
            <span>Unassigned</span>
          </div>
        );
      case 'priority':
        const priorities = {
          4: 'Urgent',
          3: 'High',
          2: 'Medium',
          1: 'Low',
          0: 'No Priority'
        };
        return priorities[key];
      default:
        return key;
    }
  };

  const getGroupIcon = (key) => {
    switch (groupBy) {
      case 'user':
        return null;
      case 'priority':
        const priorityIcons = {
          4: <UrgentIcon className="priority-icon" />,
          3: <HighIcon className="priority-icon" />,
          2: <MediumIcon className="priority-icon" />,
          1: <LowIcon className="priority-icon" />,
          0: <NoPriorityIcon className="priority-icon" />
        };
        return priorityIcons[key];
      default:
        const statusIcons = {
          'Backlog': <BacklogIcon className="status-icon" />,
          'Todo': <TodoIcon className="status-icon" />,
          'In progress': <InProgressIcon className="status-icon" />,
          'Done': <DoneIcon className="status-icon" />,
          'Cancelled': <CancelledIcon className="status-icon" />
        };
        return statusIcons[key];
    }
  };

  const groupedTickets = groupTickets(tickets);
  
  // Sort tickets within each group
  Object.keys(groupedTickets).forEach(key => {
    groupedTickets[key] = sortTickets(groupedTickets[key]);
  });

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([key, tickets]) => (
        <div 
          key={key} 
          className="kanban-column"
        >
          <div className="column-header">
            <div className="header-left">
              <span className="status-icon">{getGroupIcon(key)}</span>
              <span className="column-title">{getGroupTitle(key)}</span>
              <span className="ticket-count">{tickets.length}</span>
            </div>
            <div className="header-actions">
              <button className="icon-button" title="Add new ticket">
                <AddIcon />
              </button>
              <button className="icon-button" title="More options">
                <MenuIcon />
              </button>
            </div>
          </div>
          <div className="tickets-container">
            {tickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
