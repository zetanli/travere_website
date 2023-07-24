import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MyCard from "../components/Card"
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import ReCarousel from '../components/ReCarousel';
import { LinkContainer } from "react-router-bootstrap";

export default function HomeScreen() {
    const location = useLocation();

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);

    const { error, loading, products, page, pages } = productList;
    let keyword = location.search
    console.log("KEYWORD ", keyword)
    useEffect(() => {
        dispatch(listProducts(keyword))
        console.log(productList)
    }, [dispatch, keyword])


    return (
        <div className="mx-2">
            <h4 style={{ 'marginBottom': '2rem' }}>Recommended for you</h4>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : <ReCarousel data={products} />
            }

            <h4>All Places</h4>
            <p className='homepagedes'>Browse all places and <span style={{ color: "#e33d75" }}>Like</span> them</p>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row sm={1} md={2} lg={3} xl={4} xxl={5} xxxl={6}>
                            {products.map((v) => (
                                <Col key={v._id} >
                                    <Link to={`/product/${v._id}`} style={{ textDecoration: 'none' }}>
                                        <MyCard data={v} />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>




            }

        </div>

    )
}