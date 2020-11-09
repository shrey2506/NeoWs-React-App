import React from 'react';
import {Alert} from 'react-bootstrap';

const NeoWsError = ({ error }) => (
    error && <Alert variant="danger"  >{error.message}</Alert>
);

export default NeoWsError;