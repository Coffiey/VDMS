import HomePlayer from "../home/HomePlayer";
import TestMonster from "./TestMonster";

import "../../../App.css";
import "../campaign/player.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const AuthDisplay = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <HomePlayer />
      <div className='Outlet'>
        <div className='Enemy'>
          <div className='loginBanner'>
            <button
              id={params["*"].includes("register") ? "loginTab" : null}
              className='notesTabs'
              onClick={() => navigate("/login")}
            >
              <img
                className='buttonImg'
                src='/login.png'
              />
            </button>
            <button
              id={params["*"].includes("register") ? null : "registerTab"}
              className='notesTabs'
              onClick={() => navigate("/login/register")}
            >
              <img
                className='buttonImg'
                src='/sign-up.png'
              />
            </button>
          </div>
          <Outlet />
        </div>
        <div className='DisplayMonster'>
          <div className='loginBanner'></div>
          <TestMonster />
        </div>
      </div>
    </>
  );
};

export default AuthDisplay;
