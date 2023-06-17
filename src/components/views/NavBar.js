import { useNavigate } from "react-router-dom";
import "../../App.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { setAuth, auth } = useAuth();

  const logOut = async () => {
    try {
      await axios("/logout", { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
    setAuth({});
    navigate("/");
  };
  return (
    <div className='NavBar'>
      <div className='left'></div>
      <div
        onClick={() => navigate("/")}
        className='ImageDiv'
      >
        <img
          className='NavImg'
          src='/CombatDragon.png'
        />
      </div>
      <div className='ButtonDiv'>
        {auth.user ? (
          <>
            <p
              className='NavUser'
              onClick={() => navigate("/profile")}
            >
              {auth.user}
            </p>
            <button
              className='NavButton NavLogout'
              onClick={logOut}
            >
              logout
            </button>
          </>
        ) : (
          <button
            className='NavButton NavLogout'
            onClick={() => navigate("/login")}
          >
            Sign In / Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
