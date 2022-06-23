import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { USER_LOGIN } from '../graphql/mutation'
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
  const [userInputData, setUserInputData] = useState({
    password: "",
    email: ""
  })

  const navigate = useNavigate()
  const [loginUser, { loading, error, data }] = useMutation(USER_LOGIN, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token)
      toast.success('Successfully Login!')
      navigate("/")
    }
  })
  if (loading) return <h3>Loading</h3>
  const handleUserInputChange = (e) => {
    setUserInputData({
      ...userInputData,
      [e.target.name]: e.target.value
    })
  }

  const handleUserInputDataSubmit = (e) => {
    e.preventDefault()
    console.log(userInputData)
    loginUser({ variables: { userSignin: userInputData } })
  }

  return (
    <>
      {
        error &&
        <div className="red card-panel text-center">{error.message}</div>
      }
      <div className="container my-container d-flex align-items-center">

        <div style={{ width: "500px", margin: "auto", border: "solid 2px #673ab7", padding: "10px" }}>
          <h4>Login!!</h4>
          <form onSubmit={handleUserInputDataSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              // value={userInputData.email}
              onChange={handleUserInputChange}
              required
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              // value={userInputData.password}
              onChange={handleUserInputChange}
              required
            />
            <p>Don't Have account?<Link to="/signup"> Register</Link></p>
            <button className="btn #673ab7 deep-purple" type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;