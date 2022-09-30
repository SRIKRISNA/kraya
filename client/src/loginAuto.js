import './App.css';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginAuto = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  // const handleFailure = (result) => {
  //   alert(result);
  // };

  const handleLogin = async (googleData) => {
    const res = await axios('http://localhost:5000/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Google Login App</h1>
        <div>
          {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              //onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
            
          )}
        </div>
       <Link to="/myfiles"> <button style={{ padding: "10px 20px", background: "blue", border: "none", borderRadius: "4px", color: "white" }} >Click to go</button></Link>
      </header>
    </div>
  );
}

export default LoginAuto;