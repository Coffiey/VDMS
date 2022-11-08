import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setuser] = useState([false])

  const clicker = () => {
    setuser(!user)
  }

useEffect(()=>{
   axios.get('/monster')
   .then((response) => console.log(response.data))   
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
