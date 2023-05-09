import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
let backendURL = "https://in-out.onrender.com";

function changeDateFormat(date1) {
  const date = new Date(date1);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

const Dashboard = () => {
  let isUserIn = true;
  const [user, setUser] = useState({});
  // const [isUserIn, setIsUserIn] = useState();
  const [history, setHistory] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  let ind=-1;
  for(let i=0;i<history.length;i++){
    if(history[i].status=="approved"){
      ind=i;
      break;
    }
  }
  if(history.length == 0){
    isUserIn = true;
  }
  else if(history[0].status == "pending"){
    isUserIn=null;
  }
  else if (ind!=-1 && history[ind].entryType == "in") {
    isUserIn = true;
  }
  else if (ind!=-1 && history[ind].entryType == "out") {
    isUserIn = false;
  }

  useEffect(() => {
    // Get userId from LocalStorage
    let userId = localStorage.getItem("userId");
    // Fetch user data from backend API
    axios
      .get("https://in-out.onrender.com/api/users/details/" + userId)
      .then((res) => setUser(res.data));
    // Fetch user's history from backend API
    axios
      .get(`https://in-out.onrender.com/api/users/details/${userId}/history`)
      .then((res) => {
        let his = res.data;
        his.reverse();
        setHistory(his);
      });
  }, []);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("hello");
    localStorage.clear();
    navigate("/");
  };

  const makeIn = async (event) => {
    navigate("/inticket");
  };

  const makeOut = async (event) => {
    navigate("/outticket");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchDate);
    // Filter history based on searchDate
    const filteredHistory = history.filter((entry) => {
      console.log("Entry date: " + entry.date);
      console.log(changeDateFormat(searchDate));
      return entry.date === changeDateFormat(searchDate);
    });
    filteredHistory.reverse();
    setHistory(filteredHistory);
  };
  const picURL = user.avatar;

  return (
    <div className="body-db">
      <div className="dashboard-container">
        <div className="user-container">
          <div className="img-container">
            <img
              className="user-image-container"
              src={backendURL + "/" + user.entryNo + ".png"}
              alt="picture"
              style={{width: "270px"}}
            ></img>
          </div>
          <div className="details" style={{paddingTop:"50px"}}>
            <div className="user-details-container">
              <div className="user-detail-row">
                <label className="user-detail-label">Name :</label>
                <span className="user-detail-value">{user.name}</span>
              </div>
              <div className="user-detail-row">
                <label className="user-detail-label">Entry No :</label>
                <span className="user-detail-value">{user.entryNo}</span>
              </div>
              <div className="user-detail-row">
                <label className="user-detail-label">Contact No :</label>
                <span className="user-detail-value">{user.phoneNo}</span>
              </div>
              <div className="user-detail-row">
                <label className="user-detail-label">Hostel Name :</label>
                <span className="user-detail-value">{user.hostelName}</span>
              </div>
              <div className="user-detail-row">
                <label className="user-detail-label">Room No :</label>
                <span className="user-detail-value">{user.roomNo}</span>
              </div>
              
              <div style={{display:"flex"}}>
              {isUserIn == null ? (
                <h1 class="history-heading">Wait for guard to approve your pending tickets</h1>
              ) : (
                <>
                  {isUserIn ? (
                    <button className="makeOut" onClick={makeOut}>
                      Make ticket for out
                    </button>
                    
                  ) : (
                    <button className="makeOut" onClick={makeIn}>
                      Make ticket for in
                    </button>
                  )}
                </>
              )}
              <button onClick={handleLogout} class="glass-button">
                Logout
              </button>
              </div>
              
            </div>
          </div>
        </div>
        <div className="history-container">
          <div className="wow" style={{width:"100%", display:"inline-block"}}>
          <div className="search-container" style={{float:"right", margin:"10px"}}>
            <input style={{margin:"10px"}}
              type="date"
              value={searchDate}
              onChange={(e) => {
                setSearchDate(e.target.value);
                console.log("Search date: " + changeDateFormat(searchDate));
              }}
            />
            <button className="makeOut" onClick={handleSearch}>Search</button>
          </div>
          </div>
          
          <h2 className="history-heading">In/Out History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Place</th>
                <th>Status</th>
                <th>Entry Type</th>
                <th>Ticket ID</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.place}</td>
                  <td>{entry.status}</td>
                  <td>{entry.entryType}</td>
                  <td>{entry._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./dashboard.css";
// import { useNavigate } from "react-router-dom";
// let backendURL = "https://in-out.onrender.com";

// function changeDateFormat(date1) {
//   const date = new Date(date1);
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   const formattedDate = `${day}/${month}/${year}`;
//   return formattedDate;
// }

// const Dashboard = () => {
//   let isUserIn = true;
//   const [user, setUser] = useState({});
//   // const [isUserIn, setIsUserIn] = useState();
//   const [history, setHistory] = useState([]);
//   const [searchDate, setSearchDate] = useState("");
//   // console.log(history);
//   let ind=-1;
//   for(let i=0;i<history.length;i++){
//     if(history[i].status=="approved"){
//       ind=i;
//       break;
//     }
//   }
//   if(history.length == 0){
//     isUserIn = true;
//   }
//   else if(history[0].status == "pending"){
//     isUserIn=null;
//   }
//   else if (ind!=-1 && history[ind].entryType == "in") {
//     isUserIn = true;
//   }
//   else if (ind!=-1 && history[ind].entryType == "out") {
//     isUserIn = false;
//   }
//   useEffect(() => {
//     // Get userId from LocalStorage
//     let userId = localStorage.getItem("userId");
//     // Fetch user data from backend API
//     axios
//       .get("https://in-out.onrender.com/api/users/details/" + userId)
//       .then((res) => setUser(res.data));
//     // Fetch user's history from backend API
//     axios
//       .get(`https://in-out.onrender.com/api/users/details/${userId}/history`)
//       .then((res) => {
//         let his = res.data;
//         his.reverse();
//         setHistory(his);
//       });
//   }, []);
//   const navigate = useNavigate();

//   const handleLogout = (e) => {
//     e.preventDefault();
//     console.log("hello");
//     localStorage.clear();
//     navigate("/");
//   };

//   const makeIn = async (event) => {
//     navigate("/inticket");
//   };

//   const makeOut = async (event) => {
//     navigate("/outticket");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log(searchDate);
//     // Filter history based on searchDate
//     const filteredHistory = history.filter((entry) => {
//       console.log("Entry date: " + entry.date);
//       console.log(changeDateFormat(searchDate));
//       return entry.date === changeDateFormat(searchDate);
//     });
//     filteredHistory.reverse();
//     setHistory(filteredHistory);
//   };
//   const picURL = user.avatar;

//   return (
//     <div className="body-db">
//       <div className="dashboard-container">
//         <div className="user-container">
//           <div className="img-container">
//             <img
//               className="user-image-container"
//               src={backendURL + "/" + user.entryNo + ".png"}
//               alt="picture"
//             ></img>
//           </div>
//           <div className="details">
//             <div className="user-details-container">
//               <div className="user-detail-row">
//                 <label className="user-detail-label">Name :</label>
//                 <span className="user-detail-value">{user.name}</span>
//               </div>
//               <div className="user-detail-row">
//                 <label className="user-detail-label">Entry No :</label>
//                 <span className="user-detail-value">{user.entryNo}</span>
//               </div>
//               <div className="user-detail-row">
//                 <label className="user-detail-label">Contact No :</label>
//                 <span className="user-detail-value">{user.phoneNo}</span>
//               </div>
//               <div className="user-detail-row">
//                 <label className="user-detail-label">Hostel Name :</label>
//                 <span className="user-detail-value">{user.hostelName}</span>
//               </div>
//               <div className="user-detail-row">
//                 <label className="user-detail-label">Room No :</label>
//                 <span className="user-detail-value">{user.roomNo}</span>
//               </div>
//               <button onClick={handleLogout} class="glass-button">
//                 Logout
//               </button>
//               {isUserIn == null ? (
//                 <h1 class="history-heading">Wait for guard to approve your pending tickets</h1>
//               ) : (
//                 <>
//                   {isUserIn ? (
//                     <button className="makeOut" onClick={makeOut}>
//                       Make ticket for out
//                     </button>
//                   ) : (
//                     <button className="makeIn" onClick={makeIn}>
//                       Make ticket for in
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="history-container">
//           <div className="search-container">
//             <input
//               type="date"
//               value={searchDate}
//               onChange={(e) => {
//                 setSearchDate(e.target.value);
//                 console.log("Search date: " + changeDateFormat(searchDate));
//               }}
//             />
//             <button onClick={handleSearch}>Search</button>
//           </div>
//           <h2 className="history-heading">In/Out History</h2>
//           <table className="history-table">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Place</th>
//                 <th>Status</th>
//                 <th>Entry Type</th>
//                 <th>Ticket ID</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((entry) => (
//                 <tr key={entry._id}>
//                   <td>{entry.date}</td>
//                   <td>{entry.time}</td>
//                   <td>{entry.place}</td>
//                   <td>{entry.status}</td>
//                   <td>{entry.entryType}</td>
//                   <td>{entry._id}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;