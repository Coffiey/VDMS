import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import useAuth from "./hooks/useAuth";
import axios from "axios";

const NavBar = () => {
  const navigate = useNavigate();
  const { setAuth, auth } = useAuth();
  //   const location = useLocation();

  const logOut = async () => {
    try {
      await axios("/logout", { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
    setAuth({});
  };
  return (
    <div className='NavBar'>
      <button onClick={() => navigate("/")}>Home</button>
      <button>My games</button>
      <p>Combat Dragon</p>
      <button onClick={() => navigate("/game")}>Combat</button>
      {auth.user ? (
        <p>{auth.user}</p>
      ) : (
        <button onClick={() => navigate("/login")}>login</button>
      )}
      <button onClick={logOut}>logout</button>
    </div>
  );
};

export default NavBar;
