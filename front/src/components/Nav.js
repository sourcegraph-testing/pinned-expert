import React from 'react'
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa"
import Login from './Login';
import { useAuth } from '../context/AuthContext';


export default function Nav() {

    const { user } = useAuth()

    return (
        <nav>
            <div>
                <Link to="/">home</Link>
                <Link to="/statistics">statistics</Link>
                <Link to="/mylist">My list</Link>
                <Login />
                <Link to="/account">{<img src={user?.photoURL} />}</Link>
            </div>
        </nav>
    )
}
