import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from '../../Ticket/ticket';
import '../guard.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Open = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/users/get_all_tickets');
        let res = response.data;
        let updatedRes = [];
        for(let i=0;i<res.length;i++){
            if(res[i].status == "pending" || (res[i].status == "approved" && res[i].entryType == "out")){
                updatedRes.push(res[i]);
            }
        }
        setTickets(updatedRes);
      } catch (error) {
      }
    };

    fetchTickets();
  }, [tickets]);

  const handleTicketStatusChange = async (entryNo, newStatus) => {
    try {
      await axios.put(`http://localhost:8082/api/users/update_ticket/${entryNo}`, { status: newStatus });
      const updatedTickets = tickets.map((ticket) => {
        if (ticket.entryNo === entryNo) {
          return { ...ticket, status: newStatus };
        }
        return ticket;
      });
      setTickets(updatedTickets);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="guard-page">
      <div className="tickets">
        {tickets.map(ticket => (
          <Ticket
            id={ticket._id}
            name={ticket.name}
            entryNo={ticket.entryNo}
            mobileNo={ticket.phoneNo}
            requestType={ticket.entryType}
            status1={ticket.status}
            place={ticket.place}
            onClick={handleTicketStatusChange(ticket.entryNo, ticket.status1)}
          />
        ))}

      </div>
    </div>
  );
};

export default Open;
