import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function SearchBox() {
    const Navigate = useNavigate()
    const location = useLocation();
    const [keyword, setKeyword] = useState()
    let params = useParams()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            Navigate(`/?keyword=${keyword}`)
        } else {
            Navigate(location.pathname)
        }
    }
    return (
        <Form className="d-flex" onSubmit={submitHandler}>
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="success" className='rounded-2' type='submit'>
                Search
            </Button>
        </Form>
    )
}