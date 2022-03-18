import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import './style.scss'

export default function ReviewForm({actionForm, data, updatedId}) {
    const thousandSeparator = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')

    const [review, setReview] = useState({});

    useEffect(() => {
        if (actionForm === "review") {
            // create new object editedData from referal data
            const editedData = Object.assign({}, data.find(v => v.id === updatedId));
            delete editedData.id;
            setReview(editedData);
        }
    }, [data, updatedId, actionForm])

    return(
        <div className="review-form">
            <img className="photo-review" src={`${review.photo_url}`} alt="" />
            <p className="category"><i>{review.category}</i></p>
            <p className="name">{review.name}</p>
            <p className="price-stock"><b>Rp {thousandSeparator(`${review.price}`)} | Stock: {review.stock}</b></p>
        </div>
    )
}