import React from 'react';
import './TicketCard.css';
import { ReactComponent as UrgentIcon } from '../../assets/SVG - Urgent Priority colour.svg';
import { ReactComponent as HighIcon } from '../../assets/Img - High Priority.svg';
import { ReactComponent as MediumIcon } from '../../assets/Img - Medium Priority.svg';
import { ReactComponent as LowIcon } from '../../assets/Img - Low Priority.svg';
import { ReactComponent as NoPriorityIcon } from '../../assets/No-priority.svg';
import { useKanban } from '../../context/KanbanContext';
import { ReactComponent as GrayDotIcon } from '../../assets/graydot.svg';

const PriorityIcon = ({ priority }) => {
  switch (priority) {
    case 4:
      return <UrgentIcon title="Urgent" className="priority-icon" />;
    case 3:
      return <HighIcon title="High" className="priority-icon" />;
    case 2:
      return <MediumIcon title="Medium" className="priority-icon" />;
    case 1:
      return <LowIcon title="Low" className="priority-icon" />;
    default:
      return <NoPriorityIcon title="No Priority" className="priority-icon" />;
  }
};

const UserAvatar = ({ user }) => {
  const initials = user.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="user-avatar" title={user.name}>
      {initials}
      <span className={`availability-indicator ${user.available ? 'available' : 'away'}`}></span>
    </div>
  );
};

const TicketCard = ({ ticket }) => {
  const { groupBy } = useKanban();
  const showPriorityIcon = groupBy !== 'priority';

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id" title={ticket.id}>{ticket.id}</span>
        <div className="header-right">
          <UserAvatar user={ticket.user} />
        </div>
      </div>
      <div className="ticket-title" title={ticket.title}>
        {ticket.title}
      </div>
      <div className="ticket-footer">
        {showPriorityIcon && (
          <div className="priority-tag" title={`Priority: ${ticket.priority}`}>
            <PriorityIcon priority={ticket.priority} />
          </div>
        )}
        <div className="ticket-tag" title={ticket.tag[0]}>
          <GrayDotIcon />
          {ticket.tag[0]}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
