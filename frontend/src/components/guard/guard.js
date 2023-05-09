import React, { useState, useEffect } from "react";
import axios from "axios";
import Ticket from "../Ticket/ticket";
import "./guard.css";
import Open from "./Tabs/Open"
import All from "./Tabs/All"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const GuardPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "https://in-out.onrender.com/api/users/get_all_tickets"
        );
        setTickets(response.data);
      } catch (error) {}
    };

    fetchTickets();
  }, [tickets]);

  const handleTicketStatusChange = async (entryNo, newStatus) => {
    try {
      await axios.put(
        `https://in-out.onrender.com/api/users/update_ticket/${entryNo}`,
        { status: newStatus }
      );
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
      <h1 style={{ color: "aliceblue", textAlign: "center" }}>Guard Page</h1>
      <Tabs focusTabOnClick="false">
        <TabList style={{margin: '20px', color: "HighlightText"}}>
          <Tab>Open tickets</Tab> 
          <Tab>All tickets</Tab>
        </TabList>

        <TabPanel>
          <Open/>
        </TabPanel>
        <TabPanel>
          <All/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default GuardPage;
