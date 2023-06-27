import React from 'react';
import DeviceList from '../../components/DeviceList';
import './BaddingItems.css';
import { Col, Container, Row } from 'react-bootstrap';
import Pages from '../../components/Pages';

const BaddingItems = () => {
  return (
    <Container>
    <div className="badding-items-container">
      
      
      <Col md={12}>
          <DeviceList />
          <Pages />
        </Col>
    </div>
    </Container>
  );
};

export default BaddingItems;