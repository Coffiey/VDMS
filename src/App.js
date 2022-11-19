import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DisplayMonster from "./components/DisplayMonster";
import Register from "./components/userAuthentication/Register";
import Login from "./components/userAuthentication/Login";
import Enemy from "./components/Enemy";
import Players from "./components/Players";
import CombatArray from "./components/CombatArray";

function App() {

  const [authentication, setAuthentication] = useState(1);

  const [combatState, SetCombatState] = useState(true);
  const [list, setList] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [search, setSearch] = useState("");
  const [seeList, setSeeList] = useState(false);
  const [monsterObj, setmonsterObj] = useState(null);
  const [disableInput, setDisableInput] = useState(true);
  const [display, setDisplay] = useState(true);


  const [register ,setRegister] = useState(true); 

  useEffect(() => {
    axios
      .get(`/api/monster`)
      .then((response) => {
        setList(response.data);
        setDisableInput(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (search === "") {
      setSeeList(false);
    } else {
      setSeeList(true);
      let monsterSearch = list.filter((object) => {
        return object["name"].toLowerCase().includes(search.toLowerCase());
      });
      setDropdown(monsterSearch);
    }
  }, [search]);

  return (
    <div>
      {!authentication ? (<div classname="basic">
        {register ? <Register
        setRegister={setRegister}
        /> : <Login
        setRegister={setRegister}
        setAuthentication={setAuthentication}
        />}
      </div>


      ):(
        <div>
      <div>
        <button
      onClick={()=>{
        SetCombatState(!combatState)
        console.log(combatState)
      }}
      >{combatState ? "BEGIN COMBAT" : "END COMBAT" }</button>
      <button
        onClick={()=>{
          setAuthentication(0)
        }}
        >logOut</button>
        </div>
        {combatState && (<div className="Player">
        <Players
        display={display} 
        combatState={combatState}/>
      </div>)}
      <div className="Enemy">
      {combatState ? (<Enemy
        combatState={combatState}
        display={display}
        setSearch={setSearch}
        disableInput={disableInput}
        monsterObj={monsterObj}
        setmonsterObj={setmonsterObj}
        list={list}
        dropdown={dropdown}
        seeList={seeList}
        />): (
          <CombatArray
          setmonsterObj={setmonsterObj}
          monsterObj={monsterObj}
          />
        )}
      </div>
      
      <div className="DisplayMonster">
      <DisplayMonster
       monsterObj={monsterObj} 
       combatState={combatState}/>
      </div>
      </div>
      )}

    </div>
  );
}

export default App;
