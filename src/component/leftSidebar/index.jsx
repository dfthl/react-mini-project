import { faChartLine, faColumns, faHome, faStore, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import React from "react";

import './style.scss'
import profilePict from '../../assets/profile-picture.png'

export default function LeftSidebar({leftSidebar,setLeftSidebar,showLeftSidebar}) {
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location = '/'
    }

    return(
        <div className={leftSidebar? 'left-sidebar active' : 'left-sidebar'}toggle={() => setLeftSidebar(!leftSidebar)}>
            <ul className="sidebar-menu-items">
                <li>
                    <div className="sidebar-header">
                        <h3><img src={profilePict} alt="" className="profile-image" /> Dashboard <FontAwesomeIcon icon={faTimes} className="close-sidebar" onClick={showLeftSidebar}/></h3>
                    </div>
                </li>
            </ul>
            <ul className="navigation">
                <li className="menus">
                    <a href="/home">Home <FontAwesomeIcon icon={faHome} /></a>
                </li>
                <li className="menus">
                    <a href="/catalog" target={"_blank"}>Catalogue <FontAwesomeIcon icon={faStore} /></a>
                </li>
                <li className="menus">
                    <a href="/dashboard">Dashboard <FontAwesomeIcon icon={faColumns} /></a>
                </li>
                <li className="menus">
                    <a href="/analytics">Analytics <FontAwesomeIcon icon={faChartLine} /></a>
                </li>
            </ul>
            <br />
            <br />
            <ul className="logout-item">
                <li>
                    <Button className="logout" size="sm" color="danger" onClick={() => handleLogout()}>Logout</Button>
                </li>
            </ul>
        </div>
    )
}