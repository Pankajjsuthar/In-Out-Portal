import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./inticket.css";

function Inticket() {
  const [user1, setUser1] = useState(null);
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name:"",
    email: "",
    entryNo: "",
    phoneNo: "",
    roomNo: "",
    hostelName: "",
    place: ""
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://in-out.onrender.com/api/users/details/${userId}`)
        .then((res) => {
          setUser1(res.data);
          console.log(user1);
          setUser({
            name: res.data.name,
            email: res.data.email,
            entryNo: res.data.entryNo,
            phoneNo: res.data.phoneNo,
            roomNo: res.data.roomNo,
            hostelName: res.data.hostelName,
            place:""
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);


  // console.log(user1);

  
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(value);
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://in-out.onrender.com/api/users/post_new_in_ticket", user)
      .then((response) => {
        console.log(response);
        localStorage.setItem('ticketId', response.data._id);
        setUser({
            name: "",
            email: "",
            entryNo: "",
            phoneNo: "",
            roomNo: "",
            hostelName: "",
            place: ""
          });
          navigate("/client-dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage("Raising Ticket");
      });
  };

  user.place = "IIT Ropar Campus";

  return (
    <>
    <div className="signup-container">
    <h2 className="heading">In - Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Entry No</label>
          <input
            type="text"
            name="entryNo"
            value={user.entryNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Phone No</label>
          <input
            type="text"
            name="phoneNo"
            value={user.phoneNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Room No</label>
          <input
            type="text"
            name="roomNo"
            value={user.roomNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Hostel Name</label>
          <input
            type="text"
            name="hostelName"
            value={user.hostelName}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Place</label>
          <input
            type="text"
            name="place"
            value={user.place}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Raise ticket</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
    </>
  );
}

export default Inticket;
