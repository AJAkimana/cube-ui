import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import LoginPage from './pages/login.page';
import HomePage from './pages/home.page';
import { signout } from './actions/login.actions';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-Header">
        <h2>ARI CUBE</h2>
        {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.data.user.fullName} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
      </header>
      <main>
      <Route path="/" component={HomePage} exact />
      <Route path="/login" component={LoginPage} />
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
