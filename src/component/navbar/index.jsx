import React, { useState } from "react";

import LeftSidebar from "./leftSidebar";

import './style.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({page}) {
    const [leftSidebar, setLeftSidebar] = useState(false);
    const showLeftSidebar = () => setLeftSidebar(!leftSidebar);
    return(
        <>
            <nav className="col navbar navbar-light">
            <span className="navbar-brand mb-0 h1 bars"> <FontAwesomeIcon icon={faBars} onClick={showLeftSidebar}/> {page}</span>
            </nav>
            <LeftSidebar
                leftSidebar={leftSidebar}
                setLeftSidebar={setLeftSidebar}
                showLeftSidebar={showLeftSidebar}
            />
        </>

    )
}