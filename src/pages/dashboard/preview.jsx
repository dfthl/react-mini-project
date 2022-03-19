import React, { useEffect, useState } from "react";

import './style.scss'

export default function PreviewForm({actionForm, data, updatedId}) {
    const thousandSeparator = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
    const [preview, setPreview] = useState({});

    useEffect(() => {
        if (actionForm === "preview") {
            const editedData = Object.assign({}, data.find(v => v.id === updatedId));
            delete editedData.id;
            setPreview(editedData);
        }
    }, [data, updatedId, actionForm]);
    return(
        <div className="preview-form">
            <img className="photo-preview" src={`${preview.photo_url}`} alt="" />
            <p className="category"><i>{preview.category}</i></p>
            <p className="name">{preview.name}</p>
            <p className="price-stock"><b>Rp {thousandSeparator(`${preview.price}`)} | Stock: {preview.stock}</b></p>
        </div>
    )
}