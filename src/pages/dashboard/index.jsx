import React, {useState, useEffect} from "react";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import FormDashboard from "./form";
import ReviewForm from "./review";
import axios from "axios";

import './style.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LeftSidebar from "../../component/leftSidebar";

export default function Dashboard() {
    const thousandSeparator = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
    
    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [action, setAction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewVisible, setReviewVisible] = useState(false);
    const [updatedId, setUpdatedId] = useState(null);

    const handleCreate = () => {
        setAction("create");
        setModalVisible(true);
    }
    const handleEdit = (id) => {
        setUpdatedId(id);
        setAction("edit");
        setModalVisible("true")
    }
    const handleReview = (id) => {
        setUpdatedId(id);
        setAction("review");
        setReviewVisible("true")
    }
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/products/${id}`)
            .then(() =>{
                const updatedData = data.filter(v => v.id !== id);
                setData(updatedData);
            })
            .catch((err) => console.error(err));
    }
    const getData = async () => {
        await axios.get('http://localhost:8080/products')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.error(err));
    }
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        window.location = '/'
    }
    const handleStore = () => {
        window.location = '/store'
    }

    useEffect(() => {
        const listHeader = ['No', 'Photo', 'Name', 'Price', 'Stock', 'Category', 'Action'];
        setHeader(listHeader);
        getData();
    }, [])

    
    const [leftSidebar, setLeftSidebar] = useState(false);
    const showLeftSidebar = () => setLeftSidebar(!leftSidebar);

    return(
        <div className="body">
            <div className="col navbar">
                <FontAwesomeIcon icon={faBars} className="bars" onClick={showLeftSidebar}/>
                <Button className="add-data-button" color="primary" onClick={() => handleCreate()}>Add New Data</Button>
            
            </div>
            <div className="col">
                <LeftSidebar
                    leftSidebar={leftSidebar}
                    setLeftSidebar={setLeftSidebar}
                    showLeftSidebar={showLeftSidebar}
                />

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
                                    <td>{d.stock}</td>
                                    <td>{d.category}</td>
                                    <td>
                                        <Button className="action-button" onClick={() => handleReview(d.id)}>Review</Button>
                                        <Button className="action-button" onClick={() => handleEdit(d.id)}>Edit</Button>
                                        <Button className="action-button" color="danger" onClick={() => window.confirm("Are you sure?")? handleDelete(d.id) : window.location="/dashboard"}>Delete</Button>
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
                    <Modal className="review-modal" isOpen={reviewVisible} toggle={() => setReviewVisible(!reviewVisible)}>
                        <ModalHeader className="review-header">
                            Product Review
                        </ModalHeader>
                        <ModalBody>
                            <ReviewForm
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