import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

export default function LoginScreen() {
    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <FormContainer >
            <h2 className='text-center'>Sign In</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username' className='mt-3 mb-2'>
                    <Form.Control
                        className='rounded-0'
                        type='text'
                        placeholder='Enter Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password' className='mt-3 mb-2'>
                    <Form.Control
                        className='rounded-0'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button type='submit' variant='outline-success' className='mt-2 rounded-0'>
                        Sign In
                    </Button>
                </div>

            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}