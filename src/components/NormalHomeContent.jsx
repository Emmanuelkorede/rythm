import { useEffect, useState } from "react";
import '../styles/NormalHomeContent.css' ;
import { NavLink } from "react-router";
import {getRandomMessage} from '../components/getrandommessage' ; 
import { homeMotivation} from '../utils/homemotivation.js'

function NormalHomeContent() {
    const [name , setName] = useState('') ;

    useEffect(() => {
        const userName = localStorage.getItem('userName') ;
        setName(userName)
    }, []) 
    return (
        <>
         <div className="home-content">
          <h1>Welcome back {name} 👋</h1>
          <p>{getRandomMessage(homeMotivation)}.</p>

          <NavLink to="/week">Start Tracking</NavLink>
          <NavLink to="/weekanalytics">View anyaltics</NavLink>
          <NavLink to="/Todolist">Go to ToDo List</NavLink>
        </div>
        </>
    )
}

export default NormalHomeContent;