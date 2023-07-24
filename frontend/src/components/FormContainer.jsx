import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
    return (
        <Container className='formcontainer mt-2 p-4'>
            <Row className="justify-content-md-center">
                <Col >
                    {children}
                </Col>
            </Row>
        </Container >
    )
}

export default FormContainer