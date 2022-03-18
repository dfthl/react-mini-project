import { faBars, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card,CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import LeftSidebar from "../../component/leftSidebar";


import './style.scss'

export default function Catalog() {
    const thousandSeparator = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
    
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        await axios.get('http://localhost:8080/products')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.error(err));
    }

    return(
        <div className="catalog-body">
            <div className="col navbar">
                <a href="" className="navbar-home">Home</a>
                <div className="navbar-icon"><FontAwesomeIcon icon={faBookOpen}/></div>
                <a href="" className="navbar-aboutus">about us</a>
            </div>
            <div className="col">
                <div className="col catalogue">
                    <div className="col">
                        <a href="/login"><Button className="login-button">Login</Button></a>
                        <div className="row">
                            {data.map((d, idx) => (
                                <div className="col" key={idx}>
                                    <Card className="col card-body">
                                        <CardBody>
                                            <CardImg className="card-img" src={`${d.photo_url}`} alt="Card image cap" />
                                            <CardTitle className="card-title">{d.name}</CardTitle>
                                            <CardText className="card-desc">Rp {thousandSeparator(`${d.price}`)} | Stock {d.stock}</CardText>
                                            <Button size="sm" onClick="">Buy</Button>
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