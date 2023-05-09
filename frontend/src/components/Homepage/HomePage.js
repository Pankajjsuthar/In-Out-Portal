import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HomePage.css";

function Homepage() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://in-out.onrender.com/api/users/details/${userId}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  
  const makeOut = async (event) => {
    navigate("/outticket");
  };

  const renderDetails = () => {
    return (
      <div className="user-details">
        <h2>{user.name}'s Details:</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Entry No:</strong> {user.entryNo}
        </p>
        <p>
          <strong>Phone No:</strong> {user.phoneNo}
        </p>
        <p>
          <strong>Room No:</strong> {user.roomNo}
        </p>
        <p>
          <strong>Hostel Name:</strong> {user.hostelName}
        </p>
        <button onClick={ handleLogout}> Logout</button>
        {console.log(user)}
        <br></br>
        {user.isin ? (<button onClick={makeOut}>Make ticket for Out </button>): (<button >make ticket for in </button>)}
      </div>

      
    );
  };

  const navigate = useNavigate();

  const renderLoginButton = () => {
    return (
      <div className="login-button">
        <Link to="/">Login</Link>
      </div>
    );
  };
const handleLogout =(e)=> {
    e.preventDefault();
    console.log("hello");
    localStorage.clear(); 
    navigate("/");
  }

  return (
    <div className="homepage-container">
      <h1>Welcome to the Homepage</h1>
      {userId ? (user ? renderDetails() : "Loading...") : renderLoginButton()}
      
    </div>
  );
}

export default Homepage;
