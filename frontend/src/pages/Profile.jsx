import React from 'react'
import { GET_MY_PROFILE } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom'
import { GET_ALL_USERS_QUOTES } from '../graphql/queries';

const Profile = () => {
    const { loading, error, data } = useQuery(GET_MY_PROFILE)
    const navigate = useNavigate()
    if (loading) { return <h3>Loading..</h3> }
    if (!localStorage.getItem("token")){
        navigate("/login")
        return "Authorize"
    }
    return (
        <div className="container my-container">
            <div className="center-align p-4">
                <img className="circle" style={{ border: "2px solid", marginTop: "10px" }} src={`https://robohash.org/ram.png?size=200x200`} alt="pic" />
                <h5>{data.user.firstName}</h5>
                <h6 >{data.user.email}</h6>
            </div>
            <h3>Your quotes</h3>
            {data.user.myQuotes.map((value) => {
                return (<>
                    <blockquote>
                        <h6>{value.name}</h6>
                    </blockquote>
                </>)
            })}
        </div>
    )
}

export default Profile;