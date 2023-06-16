import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrendBar = observer(()=> {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex">
            {device && device.brends.map(brend =>
            <Card
                style={{cursor : "pointer" }}
            key={brend.id}
            className="p-2 w-auto"
            onClick={()=>device.setSelectedBrend(brend)}
            border={brend.id === device.selectedBrend.id ? 'danger' : 'light'}
            >
                {brend.name}
            </Card>
            )}
        </Row>
    );
});

export default BrendBar;