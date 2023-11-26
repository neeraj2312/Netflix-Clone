import React, { memo } from 'react'
import logo from "../../../Netflix-logo-red-black-png.webp";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {ImSearch} from "react-icons/im";

const Header = () => {
  const navigate = useNavigate();

  const homeHandler = () =>{
    navigate('/');
  }
  return (
    <nav className="header">

        <img 
        onClick={homeHandler}
        src={logo} alt="Netflix"/>

        <div>
            <Link to="/tvshows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/recent">Recently Added</Link>
            <Link to="/mylist">My List</Link>
        </div>

        <ImSearch/>
    </nav>
  )
};

export default Header