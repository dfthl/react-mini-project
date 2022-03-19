import React from "react";

import './style.scss'

export default function UnderConstruction() {

    return(
        <>
        <div className="construction-body">
            <h4 className="header">SORRY THIS SITE NOT READY YET.</h4> 
            <form className="clock">
                <h3>{Date()}</h3>
            </form>
        </div>
        </>
    )
}