import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

export default function UserEditScreen() {
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = id

    const [username, setUsername] = useState('')
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/users')
        } else {
            if (!user.username || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setUsername(user.username)
                setFirstname(user.first_name)
                setLastname(user.last_name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, username, first_name, last_name, email, isAdmin }))
    }

    return (
        <div>
            <Link to='/admin/users'>
                Go Back
            </Link>

            <FormContainer>
                <h2>Edit User</h2>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='username'>
                                <Form.Label style={{ "fontSize": "14px" }}>Username</Form.Label>
                                <Form.Control
                                    className='rounded-0'
                                    type='text'
                                    placeholder='Enter username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='first_name'>
                                <Form.Label style={{ "fontSize": "14px" }}>First Name</Form.Label>
                                <Form.Control
                                    className='rounded-0'
                                    type='name'
                                    placeholder='Enter first name'
                                    value={first_name}
                                    onChange={(e) => setFirstname(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='last_name'>
                                <Form.Label style={{ "fontSize": "14px" }}>Last Name</Form.Label>
                                <Form.Control
                                    className='rounded-0'
                                    type='name'
                                    placeholder='Enter last name'
                                    value={last_name}
                                    onChange={(e) => setLastname(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label style={{ "fontSize": "14px" }}>Email Address</Form.Label>
                                <Form.Control
                                    className='rounded-0'
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    className='mt-2 rounded-0'
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <div className="d-grid gap-2">
                                <Button type='submit' variant='outline-success' className='mt-3 rounded-0'>
                                    Update
                                </Button>
                            </div>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}