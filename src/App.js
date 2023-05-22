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
import DisplayMonster from "./components/views/Encounter/prep/DisplayMonster";
import EncounterNotes from "./components/views/campaign/EncounterNotes";
import HomeDisplay from "./components/views/home/HomeDisplay";
import HomePlayer from "./components/views/home/HomePlayer";

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
            path='/'
            element={<HomeDisplay />}
          >
            <Route
              path='/'
              element={<DisplayMonster />}
            />
          </Route>
          <Route
            path='/login'
            element={[
              <HomePlayer />,
              <div className='Outlet'>
                <div className='Enemy'>
                  <Login />
                </div>
                <div className='DisplayMonster'>
                  <Register />
                </div>
              </div>,
            ]}
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
              >
                <Route
                  path='/profile/:campaign/'
                  element={<EncounterNotes />}
                />
              </Route>
              <Route
                path='/profile/:campaign/:encounter'
                element={<EncounterPlayerDisplay />}
              >
                <Route
                  path='/profile/:campaign/:encounter'
                  element={<EncounterDisplay />}
                >
                  <Route
                    path='/profile/:campaign/:encounter/'
                    element={<DisplayMonster />}
                  />
                  <Route
                    path='/profile/:campaign/:encounter/notes'
                    element={<EncounterNotes />}
                  />
                </Route>
                <Route
                  path='/profile/:campaign/:encounter/combat'
                  element={<CombatDisplay />}
                >
                  <Route
                    path='/profile/:campaign/:encounter/combat/'
                    element={<DisplayMonster />}
                  />
                  <Route
                    path='/profile/:campaign/:encounter/combat/notes'
                    element={<EncounterNotes />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
