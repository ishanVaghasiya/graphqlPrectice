import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS_QUOTES } from '../graphql/queries';

const Home = () => {
    // console.log("Home page called..!")
    const { loading, error, data } = useQuery(GET_ALL_USERS_QUOTES)
    if (loading) return <h4>Loading....</h4>
    if (data.userQuotes.x === 0) {
        return <h4>Currently no quotes available</h4>
    }
    if (error) return <h4>{console.log(error.message)}</h4>
    return (
        
        <div className="container my-container" >
            {data.userQuotes.map((value, index) => {
                return (
                    <>
                        <blockquote>
                            <h6>{value.name}</h6>
                            <p className="right-align">~{value.by.firstName}</p>
                        </blockquote>
                    </>
                )
            })}
        </div>
    )
}

export default Home;