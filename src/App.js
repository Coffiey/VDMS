import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import DropdownItem from './components/DropdownItem';
import DisplayMonster from './components/DisplayMonster';
import Enemy from './components/Enemy';
import Createplayer from './components/CreatePlayer';

function App() {
  const [list, setList] = useState([])
  const [dropdown, setDropdown] = useState([])
  const [search, setSearch] = useState('')
  const [seeList, setSeeList] = useState(false)
  const [monsterObj, setmonsterObj] = useState(null)
  const [disableInput, setDisableInput] = useState(true)

  useEffect(() =>{
    axios.get(`/api/monster`)
    .then((response) => {
      setList(response.data)
      setDisableInput(false)
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  useEffect(() =>{
    if (search === '') {
          setSeeList(false)
    } else {
          setSeeList(true)
       let monsterSearch = list.filter((object) => {
               return object["name"].toLowerCase().includes(search.toLowerCase())
                })
          setDropdown(monsterSearch)
        }
  },[search])


  return (
    <div className="App">
      <Createplayer />
              <Enemy
        setSearch={setSearch}
        disableInput={disableInput}
        monsterObj={monsterObj}/>
      {seeList && (<ul>
        <DropdownItem 
          dropdown={dropdown}
          setMonsterObj={setmonsterObj}
          setSearch={setSearch}
            />
      </ul>)}

      <DisplayMonster
        monsterObj={monsterObj}
      />
    </div>
  );
}

export default App;
