import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Layout from "./components/layout/Layout";
import CombatPlayers from "./components/CombatPlayer";
import DisplayMonster from "./components/DisplayMonster";
import Register from "./components/userAuthentication/Register";
import Login from "./components/userAuthentication/Login";
import NavBar from "./components/NavBar";
import Enemy from "./components/Enemy";
import Players from "./components/Players";
import RequireAuth from "./components/RequireAuth";
import CombatArray from "./components/CombatArray";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/userAuthentication/PersistLogin";

function App() {
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
      .catch(function (error) {});
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
    <Routes>
      <Route
        path='/'
        element={[<NavBar />, <Layout />]}
      >
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        {/*  protected */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route
              path='/game'
              element={[
                <Players
                  display={display}
                  combatState={combatState}
                />,
                <Enemy
                  combatState={combatState}
                  display={display}
                  setSearch={setSearch}
                  search={search}
                  disableInput={disableInput}
                  monsterObj={monsterObj}
                  setmonsterObj={setmonsterObj}
                  list={list}
                  dropdown={dropdown}
                  seeList={seeList}
                />,
                <div className='DisplayMonster'>
                  <DisplayMonster
                    setmonsterObj={setmonsterObj}
                    monsterObj={monsterObj}
                    combatState={combatState}
                  />
                </div>,
              ]}
            />
            <Route
              path='/combat'
              element={[
                <CombatPlayers
                  display={display}
                  combatState={combatState}
                />,
                <CombatArray
                  setmonsterObj={setmonsterObj}
                  monsterObj={monsterObj}
                />,
                <div className='DisplayMonster'>
                  <DisplayMonster
                    setmonsterObj={setmonsterObj}
                    monsterObj={monsterObj}
                    combatState={combatState}
                  />
                </div>,
              ]}
            />
          </Route>
        </Route>
      </Route>
    </Routes>

    // <div>
    //   <div>
    //     <div>
    //       <button
    //         onClick={() => {
    //           SetCombatState(!combatState);

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
    //
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
    //   </div>
    // </div>
  );
}

export default App;
