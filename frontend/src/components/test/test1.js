import React, { useState, useEffect } from 'react';
import axios from "axios";


const Test1 = (props) => {
  
  useEffect(() =>{
    axios.get('http://localhost:8082/api/users/test')
    .then((res) =>{
      console.log(res.data);
    })
    .catch( err =>{
      console.log(err);
    })
  })

  return (
    <div className='CreateBook'>
      hello ji welcome to testing page of the application 
    </div>
  );
};

export default Test1;