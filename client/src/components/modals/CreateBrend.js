import React, {useState} from 'react';
import {createBrend} from "../../http/deviceAPI";
import {Button, Form, Modal} from "react-bootstrap";

const CreateBrend = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addBrend = () =>{
        createBrend({name: value}).then(data => {
            setValue('')
            onHide()
            console.log(addBrend)
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addBrend}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrend;