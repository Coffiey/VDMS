import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setuser] = useState([false])

  const clicker = () => {
    setuser(!user)
  }

useEffect(()=>{
   axios.get('/user?email=adam@gmail.com')
   .then((response) => console.log(response.data["first_name"]))   
  .catch(function (error) {
    console.log(error);
  });
},[user])



  return (
    <div className="App">
      <button onClick={clicker}>click me</button>
    </div>
  );
}

export default App;
