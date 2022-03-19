import React, { useEffect, useState } from "react";
import axios from "axios";

import './style.scss'
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

export default function FormDashboard({actionForm, data, setData, setModalVisible, updatedId}) {
    const initialFormValue = {
        name: "",
        price: 0,
        stock: 0,
        category: "",
        photo_url: ""
    };
    const [form, setForm] = useState(initialFormValue);
    const createData = async () => {
        await axios.post('http://localhost:8080/products', form)
            .then((res) => {
                data.push(form)
            })
            .catch((err) => console.error(err));
        setModalVisible(false)
    };
    const updateData = async () => {
        await axios.put(`http://localhost:8080/products/${updatedId}`, form)
            .then(() => {
                const updateDataIndex = data.findIndex((p) => p.id === updatedId);
                data[updateDataIndex] = form;
            })
            .catch((err) => console.error(err));
        setModalVisible(false)
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (actionForm === "create") return createData();
        return updateData();

    };

    useEffect(() => {
        if (actionForm === "edit") {
            const editedData = Object.assign({}, data.find(v => v.id === updatedId));
            delete editedData.id;
            setForm(editedData);
        }
    }, [data, updatedId, actionForm]);
    return(
        <div>
            <form onSubmit={handleSubmit}>
                {Object.keys(form).map((key,idx) => (
                    <div key={idx}>
                        <FormGroup>
                            <Label>
                                {key}
                            </Label>
                            <Input
                            value={form[key]}
                            onChange={(e) => setForm((prev) => ({
                                ...prev,
                                [key]: e.target.value
                            }))}/>
                        </FormGroup>
                    </div>
                ))}
                <div className="col upload-button">
                    <a href="https://postimages.org/" target={"_blank"}><FontAwesomeIcon icon={faCloudUploadAlt}/>Upload here</a>
                </div>
                <br/>
                <Button color="primary" type="submit">Submit</Button>
                <Button className="cancel-button" onClick={() => setModalVisible(false)}>Cancel</Button>
            </form>
        </div>
    )
}