import { useState, useEffect } from 'react';

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        
        // Create a map of users for quick lookup
        const userMap = data.users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});

        // Merge user data into tickets
        const ticketsWithUsers = data.tickets.map(ticket => ({
          ...ticket,
          user: userMap[ticket.userId] || {
            name: 'Unassigned',
            available: false
          }
        }));

        setTickets(ticketsWithUsers);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading, error };
};

export default useTickets;
