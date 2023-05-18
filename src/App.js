import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Layout from "./components/views/layout/Layout";
import Register from "./components/views/userAuthentication/Register";
import Login from "./components/views/userAuthentication/Login";
import NavBar from "./components/views/NavBar";
import CampaignDisplay from "./components/views/campaign/CampaignDisplay";
import CombatDisplay from "./components/views/Combat/CombatDisplay";
import EncounterDisplay from "./components/views/Encounter/EncounterDisplay";
import ProfileDisplay from "./components/views/profile/ProfileDisplay";
import RequireAuth from "./components/views/userAuthentication/RequireAuth";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/views/userAuthentication/PersistLogin";

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
                path='/profile/:campaign'
                element={<CampaignDisplay />}
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
