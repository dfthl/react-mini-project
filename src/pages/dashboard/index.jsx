import React, {useState, useEffect} from "react";
import axios from "axios";

import FormDashboard from "./form";
import Navbar from "../../component/navbar";
import PreviewForm from "./preview";

import './style.scss'
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const page = 'Dashboard';
    const thousandSeparator = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [action, setAction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [updatedId, setUpdatedId] = useState(null);
    const handleCreate = () => {
        setAction("create");
        setModalVisible(true);
    };
    const handleEdit = (id) => {
        setUpdatedId(id);
        setAction("edit");
        setModalVisible("true")
    };
    const handleReview = (id) => {
        setUpdatedId(id);
        setAction("preview");
        setPreviewVisible("true")
    };
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/products/${id}`)
            .then(() =>{
                const updatedData = data.filter(v => v.id !== id);
                setData(updatedData);
            })
            .catch((err) => console.error(err));
    };
    const getData = async () => {
        await axios.get('http://localhost:8080/products')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        const listHeader = ['No', 'Photo', 'Name', 'Price', 'Stock', 'Category', 'Action'];
        setHeader(listHeader);
        getData();
    }, []);
    return(
        <div className="dashboard-body">
            <Navbar
                page={page}
            />
            <Button className="add-data-button" onClick={() => handleCreate()}><FontAwesomeIcon icon={faPlus}/></Button>
            <div className="col">
                <div className="col product-list">
                    <Table>
                        <thead>
                            <tr>
                                {header.map((h, idx) => (
                                    <th key={idx}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="body-table">
                            {data.map((d, idx) => (
                                <tr key={idx}>
                                    <th scope = "row">
                                        {idx + 1}
                                    </th>
                                    <td className="col-photo"><img className="dashboard-photo" src={`${d.photo_url}`} alt="Unknown"/></td>
                                    <td>{d.name}</td>
                                    <td>Rp {thousandSeparator(`${d.price}`)}</td>
                                    <td>{thousandSeparator(`${d.stock}`)}</td>
                                    <td>{d.category}</td>
                                    <td>
                                        <Button className="action-button" size="sm" onClick={() => handleReview(d.id)}>Preview</Button>
                                        <Button className="action-button" size="sm" onClick={() => handleEdit(d.id)}>Edit</Button>
                                        <Button className="action-button" size="sm" color="danger" onClick={() => window.confirm("Are you sure?")? handleDelete(d.id) : null}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Modal isOpen={modalVisible} toggle={() => setModalVisible(!modalVisible)}>
                        <ModalHeader>
                            {`Form ${action} Data`}
                        </ModalHeader>
                        <ModalBody>
                            <FormDashboard
                                actionForm={action}
                                data={data}
                                setData={setData}
                                setModalVisible={setModalVisible}
                                updatedId={updatedId}
                            />
                        </ModalBody>
                    </Modal>
                    <Modal className="preview-modal" isOpen={previewVisible} toggle={() => setPreviewVisible(!previewVisible)}>
                        <ModalHeader className="preview-header">
                            Product Preview
                        </ModalHeader>
                        <ModalBody>
                            <PreviewForm
                                    actionForm={action}
                                    data={data}
                                    setData={setData}
                                    setModalVisible={setModalVisible}
                                    updatedId={updatedId}
                                />
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </div>
    )
}