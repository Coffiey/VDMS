import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Layout from "./components/layout/Layout";
import CombatPlayers from "./components/CombatPlayer";
import DisplayMonster from "./components/DisplayMonster";
import Register from "./components/userAuthentication/Register";
import Login from "./components/userAuthentication/Login";
import NavBar from "./components/NavBar";
import CombatDisplay from "./components/appState/CombatDisplay";
import EncounterDisplay from "./components/appState/EncounterDisplay";
import ProfileDisplay from "./components/appState/ProfileDisplay";
import CampaignList from "./components/profile/CampaignList";
import Enemy from "./components/Enemy";
import Players from "./components/Players";
import RequireAuth from "./components/RequireAuth";
import CombatArray from "./components/CombatArray";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/userAuthentication/PersistLogin";

function App() {
  const [list, setList] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [search, setSearch] = useState("");
  const [seeList, setSeeList] = useState(false);
  const [monsterObj, setmonsterObj] = useState(null);
  const [disableInput, setDisableInput] = useState(true);
  const [combatState, useCombatState] = useState(true);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    // axios
    //   .get(`/api/monster`)
    //   .then((response) => {
    //     setList(response.data);
    //     setDisableInput(false);
    //   })
    //   .catch(function (error) {});
  }, []);

  useEffect(() => {
    // if (search === "") {
    //   setSeeList(false);
    // } else {
    //   setSeeList(true);
    //   let monsterSearch = list.filter((object) => {
    //     return object["name"].toLowerCase().includes(search.toLowerCase());
    //   });
    //   setDropdown(monsterSearch);
    // }
  }, [search]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={<Layout />}
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
                path='/profile'
                element={<ProfileDisplay />}
              />
              <Route
                path='/campaign'
                element={<EncounterDisplay />}
              />
              <Route
                path='/encounter'
                element={<EncounterDisplay />}
              />
              <Route
                path='/combat'
                element={<CombatDisplay />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
