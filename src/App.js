import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Layout from "./components/layout/Layout";
import DisplayMonster from "./components/DisplayMonster";
import Register from "./components/userAuthentication/Register";
import Login from "./components/userAuthentication/Login";
import Enemy from "./components/Enemy";
import Players from "./components/Players";
import CombatArray from "./components/CombatArray";
import { Routes, Route } from "react-router-dom";

function App() {
  const [authentication, setAuthentication] = useState(0);

  const [combatState, SetCombatState] = useState(true);
  const [list, setList] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [search, setSearch] = useState("");
  const [seeList, setSeeList] = useState(false);
  const [monsterObj, setmonsterObj] = useState(null);
  const [disableInput, setDisableInput] = useState(true);
  const [display, setDisplay] = useState(true);

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
    console.log(dropdown);
  }, [search]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>

    // <div>
    //   <div>
    //     <div>
    //       <button
    //         onClick={() => {
    //           SetCombatState(!combatState);
    //           console.log(combatState);
    //         }}
    //       >
    //         {combatState ? "BEGIN COMBAT" : "END COMBAT"}
    //       </button>
    //       <button
    //         onClick={() => {
    //           setAuthentication(0);
    //         }}
    //       >
    //         logOut
    //       </button>
    //     </div>
    //     {combatState && (
    //       <div className="Player">
    //         <Players display={display} combatState={combatState} />
    //       </div>
    //     )}
    //     <div className="Enemy">
    //       {combatState ? (
    //         <Enemy
    //           combatState={combatState}
    //           display={display}
    //           setSearch={setSearch}
    //           disableInput={disableInput}
    //           monsterObj={monsterObj}
    //           setmonsterObj={setmonsterObj}
    //           list={list}
    //           dropdown={dropdown}
    //           seeList={seeList}
    //         />
    //       ) : (
    //         <CombatArray
    //           setmonsterObj={setmonsterObj}
    //           monsterObj={monsterObj}
    //         />
    //       )}
    //     </div>

    //     <div className="DisplayMonster">
    //       <DisplayMonster
    //         setmonsterObj={setmonsterObj}
    //         monsterObj={monsterObj}
    //         combatState={combatState}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
