import React, { useState } from 'react';
import axios from 'axios';
import './ticket.css'
let backendURL = "https://in-out.onrender.com";

const Ticket = ({ id, name, entryNo, mobileNo, requestType, imageSrc, status1, place }) => {
  const [status, setStatus] = useState(status1);

  const handleApprove = async () => {
    try {
      const response = await axios.put(`https://in-out.onrender.com/api/users/approve/${id}`, {
        status: 'approved',
      });
      setStatus(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(`https://in-out.onrender.com/api/users/reject/${id}`, {
        status: 'rejected',
      });
      setStatus(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ticket-container">
      <grid>
        <grid item>
          <div className="ticket__image-container" style={{justifyContent:"center"}}>
            <img className='user-image-container' src={backendURL + "/" + entryNo + ".png"} alt="picture"></img>
          </div>
        </grid>
        <grid item>
          <div className="entries">
            <div>Name: {name}</div>
            <div>Entry No: {entryNo}</div>
            <div>Mobile No: {mobileNo}</div>
            <div>Request Type: {requestType}</div>
            <div>Status: {status}</div>
            <div>Place: {place}</div>
          </div>
        </grid>
        <grid item>
          {status === 'pending' && (
            <div className="ticket__actions">
              <button onClick={handleApprove}>Approve</button>
              <button onClick={handleReject}>Reject</button>
            </div>
          )}
        </grid>
      </grid>



    </div>
  );
};

export default Ticket;
