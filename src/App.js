import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import DropdownItem from './components/DropdownItem';

function App() {
  const [search, setSearch] = useState('')
  const [list, setList] = useState([])
  const [seeList, setSeeList] = useState(true)

  
  useEffect(()=>{
  if (search === '') {
    setList([])
  } else {
    axios.get(`/api/monster?search=${search}`)
    .then((response) => {
      setList(response.data) 
    })
    .catch(function (error) {
      console.log(error);
    });
  }
},[search])



  return (
    <div className="App">
      <input 
       type="text" 
       onChange={(e) => {
        setSearch(e.target.value)
        }}
        onBlur={() =>setSeeList(false)}
        onFocus={() => setSeeList(true)}
        ></input>
      <ul>
        {seeList && (<DropdownItem 
          list={list}
            />)}
      </ul>
    </div>
  );
}

export default App;
