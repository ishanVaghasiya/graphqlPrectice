import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { USER_SIGNUP } from '../graphql/mutation'
import toast, { Toaster } from 'react-hot-toast';


const Signup = () => {
  const [userInputData, setUserInputData] = useState({})

  const [signupUser, { loading, error, data }] = useMutation(USER_SIGNUP);
  if (loading) return <h3>Loading..</h3>
  const handleUserInputChange = (e) => {
    setUserInputData({
      ...userInputData,
      [e.target.name]: e.target.value
    })
  }

  // const navigate = useNavigate()
  const handleUserInputDataSubmit = (e) => {
    e.preventDefault()
    console.log(userInputData)
    signupUser({ variables: { userNew: userInputData } })
  }

  return (
    <>
      {
        error &&
        <div className="red card-panel">{error.message}</div>
      }

      {
        data && data.user &&
        <div className="green card-panel">{data.user.firstName} is SignedUp. You can login now!</div>
      }
      <div className="container my-container d-flex align-items-center">
        <div style={{ width: "500px", margin: "auto", border: "solid 2px #673ab7", padding: "10px" }}>
          <h4 className='text-center'>Sign Up</h4>
          <form onSubmit={handleUserInputDataSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleUserInputChange}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              onChange={handleUserInputChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleUserInputChange}
              required
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleUserInputChange}
              required
            />
            <p>Already Have account? <Link to="/login"> Login </Link></p>

            <button className="btn #673ab7 deep-purple" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup;