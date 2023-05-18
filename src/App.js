import "./App.css";
import Layout from "./components/views/layout/Layout";
import Register from "./components/views/userAuthentication/Register";
import Login from "./components/views/userAuthentication/Login";
import NavBar from "./components/views/NavBar";
import CampaignDisplay from "./components/views/campaign/CampaignDisplay";
import CombatDisplay from "./components/views/Encounter/Combat/CombatDisplay";
import EncounterDisplay from "./components/views/Encounter/prep/EncounterDisplay";
import ProfileDisplay from "./components/views/profile/ProfileDisplay";
import RequireAuth from "./components/views/userAuthentication/RequireAuth";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./components/views/userAuthentication/PersistLogin";
import EncounterPlayerDisplay from "./components/views/Encounter/EncounterPlayerDisplay";

function App() {
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
                path='/profile/:campaign/:encounter'
                element={<EncounterPlayerDisplay />}
              >
                <Route
                  path='/profile/:campaign/:encounter/prep'
                  element={<EncounterDisplay />}
                />
                <Route
                  path='/profile/:campaign/:encounter/combat'
                  element={<CombatDisplay />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
