import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
export default function ProfileScreen() {
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


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(() => {
        console.log("userInfo", userDetails)
        if (!userInfo) {
            navigate('/login')
        } else {
            console.log(user)
            if (!user || !user.username || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setUsername(user.username)
                setEmail(user.email)
                setFirstname(user.first_name)
                setLastname(user.last_name)
            }
        }
    }, [dispatch, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'username': username,
                'password': password,
                'email': email,
                'first_name': first_name,
                'last_name': last_name
            }))
        }

    }

    return (
        <FormContainer>
            <h2 className='text-center'>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username'>
                    <Form.Label style={{ "fontSize": "14px" }}>Username</Form.Label>
                    <Form.Control
                        className='rounded-0'
                        required
                        type='text'
                        placeholder='Enter Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='first_name'>
                    <Form.Label style={{ "fontSize": "14px" }}>First Name</Form.Label>
                    <Form.Control
                        className='rounded-0'
                        required
                        type='text'
                        placeholder='Enter First Name'
                        value={first_name}
                        onChange={(e) => setFirstname(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='last_name'>
                    <Form.Label style={{ "fontSize": "14px" }}>Last Name</Form.Label>
                    <Form.Control
                        className='rounded-0'
                        required
                        type='text'
                        placeholder='Enter Last Name'
                        value={last_name}
                        onChange={(e) => setLastname(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label style={{ "fontSize": "14px" }}>Email Address</Form.Label>
                    <Form.Control
                        className='rounded-0'
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label style={{ "fontSize": "14px" }}>Password</Form.Label>
                    <Form.Control
                        className='rounded-0'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label style={{ "fontSize": "14px" }}>Confirm Password</Form.Label>
                    <Form.Control
                        className='rounded-0'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button type='submit' variant='outline-success' className='mt-2 rounded-0'>
                        Update
                    </Button>
                </div>

            </Form>


        </FormContainer>
    )
}

