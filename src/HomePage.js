import React, { useState, useEffect } from 'react';
import { Redirect,Navigate } from 'react-router-dom';

const HomePage = () => {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [cookieData, setCookieData] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('loggedIn') === 'true';
    setAuthenticated(isAuthenticated);
  }, []);

  const handleSubmitData = () => {
    document.cookie = `data1=${inputValue1}`;
    setCookieData(document.cookie);
    setInputValue1('');
  };

  const handleSearchData = () => {
    const cookies = document.cookie.split(';');
    const searchedData = cookies.find(cookie => cookie.trim().startsWith('data1='));
    setInputValue2(searchedData ? searchedData.split('=')[1] : '');
  };

  const handleClearCookies = () => {
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    setCookieData('');
    setInputValue1('');
    setInputValue2('');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setAuthenticated(false);
    <Navigate to="/" />;
  };

  // Redirect to login page if not authenticated
  // if (!authenticated) {
  //   return <Navigate to="/" />;
  // }

  // Render Home Page content if authenticated
  return (
    <div>
      <h2>Home Page</h2>
      <div>
        <input type="text" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} />
        <button onClick={handleSubmitData}>Submit Data</button>
      </div>
      <div>
        <input type="text" value={inputValue2} readOnly />
        <button onClick={handleSearchData}>Search Data</button>
      </div>
      <div>
        <button onClick={handleClearCookies}>Clear All Cookies</button>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {cookieData && (
        <div>
          <h3>Cookie Data:</h3>
          <pre>{cookieData}</pre>
        </div>
      )}
    </div>
  );
};

export default HomePage;
