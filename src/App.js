import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setuser] = useState([null])

useEffect(()=>{
   axios.get('/user?email=adam@gmail.com')
   .then((response) => console.log(response.data["id"]))   
  .catch(function (error) {
    console.log(error);
  });
},[])



  return (
    <div className="App">
      <div>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.email}</p>
        </div>
    </div>
  );
}

export default App;
