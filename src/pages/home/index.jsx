import React, {useEffect, useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";

import LeftSidebar from "../../component/leftSidebar";

import './style.scss'

export default function Home() {
    const [pages, setPages] = useState([]) 
    useEffect(() => {
        const listPages = [
            {'page':'Catalogue', 'url':'/catalog'},
            {'page':'Dashboard', 'url':'/dashboard'},
            {'page':'Analytics', 'url':'/analytics'},
            {'page':'Register', 'url':'/register'}
        ];
        setPages(listPages);
    }, [])

    // const handleDashboard = () => {
    //     window.location='/dashboard'
    // }
    
    const [leftSidebar, setLeftSidebar] = useState(false);
    const showLeftSidebar = () => setLeftSidebar(!leftSidebar);

    return(
        <div className="home-body">
            <div className="col navbar">
                <FontAwesomeIcon icon={faBars} className="bars" onClick={showLeftSidebar}/>
                {/* <Button className="add-data-button" color="primary" onClick={() => handleDashboard()}>Add New Data</Button> */}
            
            </div>
            <div className="col">
                <LeftSidebar
                    leftSidebar={leftSidebar}
                    setLeftSidebar={setLeftSidebar}
                    showLeftSidebar={showLeftSidebar}
                />

                <div className="col pages">
                    <div className="col">
                        <div className="row">
                            {pages.map((v, idx) => (
                                <div className="col" key={idx}>
                                    <Card className="col card-body">
                                        <CardBody>
                                            <CardTitle></CardTitle>
                                            <CardText>{v.page}</CardText>
                                            <a href={`${v.url}`}><Button size="sm" onClick={`${v.url}`}>Go to {v.page}</Button></a>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}