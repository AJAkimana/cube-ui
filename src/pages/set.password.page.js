import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../components/loading.component";
import Logo from "../assets/ari_cube.png";
import { resetPassword, setPassword } from "../redux/actions/user";
import { notifier } from "../utils/notifier";

const initialState = { password: "", confirmPassword: "" };
const SetPassword = ({ history, match }) => {
  const [credentials, setCredentials] = useState(initialState);

  const {
    passwordSet: { loaded, loading },
    pwdReset: { loaded: set, loading: setting },
  } = useSelector((state) => state);

  useEffect(() => {
    if (loaded || set) {
      notifier.success("The password has been set");
      setTimeout(() => {
        history.replace("/");
      }, 3000);
    }
  }, [history, loaded, set]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setCredentials({ ...credentials, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    delete credentials.confirmPassword;
    credentials.token = match.params.token;
    if (match.params.action === "reset") {
      resetPassword(credentials);
    } else {
      setPassword(credentials);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <img src={Logo} alt="#" className="logo" />
        </div>
        <div>
          <h1>Set a new password</h1>
        </div>
        {(loading || setting) && <LoadingBox></LoadingBox>}
        <div>
          <label htmlFor="pasword">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="login-input"
            placeholder="Enter password"
            required
            onChange={onHandleChange}
            value={credentials.password}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="login-input"
            placeholder="Confirm password"
            required
            onChange={onHandleChange}
            value={credentials.confirmPassword}
          ></input>
        </div>
        <div>
          <label />
          <button
            className="login-input btn-login primary"
            type="submit"
            disabled={loading}
          >
            Set password
          </button>
        </div>
      </form>
    </div>
  );
};
export default SetPassword;
