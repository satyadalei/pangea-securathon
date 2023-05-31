import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>This is home page</h1>
        <Link to="/login" >Login</Link> <br />
        <Link to="/registration">Registration</Link>
    </div>
  )
}

export default Home