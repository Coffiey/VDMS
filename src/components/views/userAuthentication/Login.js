import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./register.css";
import jwt_decode from "jwt-decode";

import axios from "axios";
const LOGIN_URL = "/auth/user";

const Login = () => {
  const { setAuth, persist, setPersist, auth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const game = () => {
    if (from !== "/register") {
      navigate(from, { replace: true });
    } else {
      navigate("/profile", { replace: true });
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    if (auth?.accessToken) {
      game();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ userName: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const decoded = accessToken
        ? jwt_decode(response?.data?.accessToken)
        : undefined;
      if (decoded) {
        const userName = decoded.info.userName;
        const id = decoded.info.id;
        setAuth({ user: userName, accessToken, id });
        setUser("");
        setPwd("");
        game();
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div class='login'>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      <div className='diceDiv'>
        {/* <img
            className='dice'
            src='./d20.png'
          /> */}
        <div className='loginTitle'>
          <img
            className='titleImg'
            src='/logIn.png'
          />
        </div>
        {/* <img
            className='dice'
            src='./d20.png'
          /> */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='pair'>
          {" "}
          <label
            className='label'
            htmlFor='username'
          >
            Username:
          </label>
          <input
            className='loginInput'
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>

        <div className='pair'>
          {" "}
          <label
            className='label'
            htmlFor='password'
          >
            Password:
          </label>
          <p className='showPassword'>
            <input
              className='showPassword'
              type='checkBox'
              value={showPassword}
              onChange={(e) => setShowPassword(!showPassword)}
            />
            Show Password
          </p>
          <input
            className='loginInput'
            type={showPassword ? "text" : "password"}
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </div>

        <div className='pair'>
          <button className='loginButton'>Sign In</button>
          <div className='persist'>
            <input
              type='checkbox'
              id='persist'
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor='persist'>Keep me Logged in</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
