import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../components/loading.component";
import Logo from "../assets/ari_cube.png";
import { signin } from "../redux/actions/user";
import { USER_INFO } from "../utils/constants";

const initialState = { email: "", password: "" };
export default function SigninScreen(props) {
  const [logins, setLogins] = useState(initialState);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "dashboard/home";
  const userSignin = useSelector((state) => state.login);
  const { userInfo, loading } = userSignin;
  useEffect(() => {
    if (userInfo.user.fullName) {
      localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
      window.location.href = redirect;
    }
  }, [props.history, redirect, userInfo]);
  const onHandleChange = (e) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    setLogins({ ...logins, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    signin(logins);
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <img src={Logo} alt="#" className="logo" />
        </div>
        <div>
          <h1>Sign In to ARI CUBE</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
            onChange={onHandleChange}
            value={logins.email}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            onChange={onHandleChange}
            value={logins.password}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
