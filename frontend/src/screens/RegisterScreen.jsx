import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen() {
    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(username, password, email, first_name, last_name))
        }

    }

    return (
        <FormContainer>
            <h2 className='text-center'>Register</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username'>
                    <Form.Control
                        className='rounded-0'
                        required
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId='first_name' className='mt-3 mb-2'>
                            <Form.Control
                                className='rounded-0'
                                required
                                type='text'
                                placeholder='First Name'
                                value={first_name}
                                onChange={(e) => setFirstname(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='last_name' className='mt-3 mb-2'>
                            <Form.Control
                                className='rounded-0'
                                required
                                type='text'
                                placeholder='Last Name'
                                value={last_name}
                                onChange={(e) => setLastname(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId='email' className='mt-3 mb-2'>
                    <Form.Control
                        className='rounded-0'
                        required
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='mt-3 mb-2'>
                    <Form.Control
                        className='rounded-0'
                        required
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm' className='mt-3 mb-2'>
                    <Form.Control
                        className='rounded-0'
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button type='submit' variant='outline-success' className='mt-2 rounded-0'>
                        Register
                    </Button>
                </div>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen