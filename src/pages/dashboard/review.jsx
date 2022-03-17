import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import './style.scss'

export default function ReviewForm({actionForm, data, setData, setModalVisible, updatedId}) {
    const thousandSeparator = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
    
    const initialFormValue = {
        name: "",
        price: 0,
        stock: 0,
        category: ""

    };
    const [review, setReview] = useState({});
    const updateData = async () => {
        await axios.put(`http://localhost:8080/products/${updatedId}`, review)
            .then(() => {
                const updateDataIndex = data.findIndex((p) => p.id === updatedId);
                data[updateDataIndex] = review;
            })
            .catch((err) => console.error(err));
        setModalVisible(false)
    };
    
    const handleSubmit = (e) => {
        e.preventDefault() //ignore cara kerja default html tag
        return updateData();

    };

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