import React from 'react';
import { Navbar, Nav, Container, Row, Col, NavDropdown, Form, Button, InputGroup } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

export default function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout)
    }

    return (
        <header className='sticky-top'>
            <Navbar expand="lg" className="navbar-light bg-light pt-4 pb-4">
                <Col sm={3} className="mx-5">
                    <LinkContainer to='/'>
                        <Navbar.Brand className="navbar-brand mx-2">
                            <img src="/static/IMG_2132.jpg" alt="TraVere" width="57%" height="12%" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Col>

                <Col sm={4}>

                    <SearchBox />

                </Col>
                <Col sm={2}>
                </Col>
                <Col sm={3} >
                    <div>
                        <Navbar.Collapse id="basic-navbar-nav" >

                            <Nav >
                                <div>
                                    <LinkContainer to="cart">
                                        <Nav.Link>
                                            <span style={{ 'whiteSpace': 'nowrap' }}> <i className='fa fa-heart' style={{ color: "#e33d75" }}></i> Liked</span>
                                        </Nav.Link>
                                    </LinkContainer>
                                </div>

                                {userInfo ? (
                                    <NavDropdown title={(<>
                                        <i className="fas fa-user"></i> {userInfo.username}
                                    </>)} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item > Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>

                                ) : (
                                    <NavDropdown title={(<>
                                        <i className="fas fa-user"></i> LogIn/JoinUs
                                    </>)} id="basic-nav-dropdown">
                                        <LinkContainer to="/login">
                                            <Nav.Link >Login</Nav.Link>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <LinkContainer to="/register">
                                            <Nav.Link >Sign Up</Nav.Link>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}

                                {userInfo && userInfo.isAdmin ? (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                        <LinkContainer to='/admin/users'>
                                            <NavDropdown.Item > Users</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/products'>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>



                                ) : (
                                    <>
                                    </>
                                )}


                            </Nav>
                        </Navbar.Collapse>
                    </div>

                </Col>

            </Navbar>

        </header >


    )
}