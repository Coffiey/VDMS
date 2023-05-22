import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./register.css";
import { useNavigate, useLocation, Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Register = (props) => {
  const { setRegister } = props;

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [res, setRes] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  //   const login = useCallback(
  //     () => navigate("/login", { replace: true }),
  //     [navigate]
  //   );

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password, matchPwd]);

  const postUser = async (object) => {
    try {
      const response = await axios.post("/auth/register", object);
      setRes(response.data.user_name);
      setUser("");
      setPassword("");
      setMatchPwd("");
      setSuccess(true);
    } catch (err) {
      setErrMsg(err?.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    postUser({ userName: user, password });
  };

  return (
    <div class='login'>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live='assertive'
      >
        {errMsg}
      </p>
      {success && <p className='sucessMsg'>You're Good to Go {res}</p>}
      <div className='diceDiv'>
        <img
          className='dice'
          src='/d20.png'
        />
        <div className='loginTitle'>
          <img
            id='account'
            src='/account.png'
          />
        </div>
        <img
          className='dice'
          src='/d20.png'
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='pair'>
          <label
            className='label'
            htmlFor='username'
          >
            Username:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !user ? "hide" : "invalid"}
            />
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
            aria-invalid={validName ? "false" : "true"}
            aria-describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id='uidnote'
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>

        <div className='pair'>
          <label
            className='label'
            htmlFor='password'
          >
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !password ? "hide" : "invalid"}
            />
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id='pwdnote'
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label='exclamation mark'>!</span>{" "}
            <span aria-label='at symbol'>@</span>{" "}
            <span aria-label='hashtag'>#</span>{" "}
            <span aria-label='dollar sign'>$</span>{" "}
            <span aria-label='percent'>%</span>
          </p>
        </div>

        <div className='pair'>
          <label
            className='label'
            htmlFor='confirm_pwd'
          >
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <p className='showPassword'>
            <input
              className='showPassword'
              type='checkBox'
              value={showConfirmPassword}
              onChange={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            Show Password
          </p>
          <input
            className='loginInput'
            type={showConfirmPassword ? "text" : "password"}
            id='confirm_pwd'
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id='confirmnote'
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
        </div>

        <button
          disabled={!validName || !validPwd || !validMatch ? true : false}
          className='loginButton'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
