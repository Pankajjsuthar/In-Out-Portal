import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [entryNo, setEntryNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

 
  const navigate = useNavigate('/');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("confirmPassword", confirmPassword);
    newForm.append("entryNo", entryNo);
    newForm.append("hostelName", hostelName);
    newForm.append("roomNo", roomNo);
    newForm.append("phoneNo", phoneNo);
    newForm.append("file", avatar);

    axios
      .post("https://in-out.onrender.com/api/users/register-new-user", newForm, config)
      .then((res) => {
        setName("");
        setEmail("");
        setPassword("");
        setconfirmPassword("");
        setEntryNo("");
        setPhoneNo("");
        setHostelName(""); 
        setRoomNo("");
        setAvatar(null);
        navigate("/")
      })
      .catch((error) => {
        console.log(error.message)
        setErrorMessage("Error signing up");
      });
  };

  return (
    <>
      <div className="signup-container">
        <h2 className="heading">Signup portal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              pattern="^[a-zA-Z0-9._%+-]+@iitrpr\.ac\.in$"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Entry No</label>
            <input
              type="text"
              name="entryNo"
              value={entryNo}
              onChange={(e) => setEntryNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone No</label>
            <input
              type="text"
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Room No</label>
            <input
              type="text"
              name="roomNo"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Hostel Name</label>
            <input
              type="text"
              name="hostelName"
              value={hostelName}
              onChange={(e) => setHostelName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Add Image</label>
            <input
              type="file"
              accept=".jpeg, .jpg, .png"
              name="avatar"
              //value={avatar}
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </>
  );
}

export default Signup;