import React, {useEffect, useState} from "react";

import Navbar from "../../component/navbar";

import './style.scss'
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";

export default function Home() {
    const page = 'Home';
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const listPages = [
            {'page':'Catalogue', 'url':'/catalog'},
            {'page':'Dashboard', 'url':'/dashboard'},
            {'page':'Analytics', 'url':'/analytics'},
            {'page':'Register', 'url':'/register'}
        ];
        setPages(listPages);
    }, []);
    return(
        <div className="body home-body">
            <Navbar 
                page={page}
            />
            <div className="col">
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