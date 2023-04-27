import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./entry_card.css";

function Entry_card(props){

    const handleApprove =() =>{
        console.log("approved"); 
    }
    const handleReject = () =>{
        console.log("rejected"); 
    }
    return(
        <>
        <div className="entry_card">
            Name: {props.name}
            Entry No: {props.entryNo}
            Room No: {props.roomNo}
            Place: {props.place}
            <button onClick={handleApprove}>approve</button>
            <button onClick={handleReject}>Reject</button>
        </div>
        </>
    )

}