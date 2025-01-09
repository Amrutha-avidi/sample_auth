import React, { useState } from 'react';
import './index.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: ''
  })


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = data
    try {
      const { data } = await axios.post('/login', {
        email, password
      })
      console.log(data)

      if (data.error) {
        console.log(data.error)
      }
      else {
        navigate("/")
        
        setData({ email: '', password: '' });
      }



    } catch (err) {
      console.log(err)
    }

  };

  return (
    <div className='main-con'>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className='login-button'>Login</button>
        <p>Didn't have an Account ? Please <Link to='/signup'>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
