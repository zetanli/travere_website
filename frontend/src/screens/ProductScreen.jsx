import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Image, Button, Card, ListGroup, Form } from 'react-bootstrap';
import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from '../actions/productActions';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import RatingRadio from '../components/RatingRadio';
export default function ProductScreen() {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');



    const navigate = useNavigate();
    const { id } = useParams();
    console.log('id is: ', id)
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate
    console.log("product reviews: ", product.reviews)
    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(id))

    }, [dispatch, successProductReview])

    const addToCartHandler = () => {
        console.log('Add to cart: ', id)
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("Rating is ", rating)
        dispatch(createProductReview(
            id, {
            rating,
            comment
        }
        ))
    }

    return (
        <>
            <div>
                <Link to='/' className="btn btn-info my-3 rounded-0">Go Back</Link>
                {loading ?
                    <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <div>
                                <Row>
                                    <Col md={5}>
                                        <Image src={product.image} alt={product.name} fluid />
                                    </Col>
                                    <Col md={1}>
                                    </Col>
                                    <Col md={5}>
                                        <Row>
                                            <ListGroup variant="flush">
                                                <Button className='rounded-1 mx-5'
                                                    onClick={addToCartHandler}
                                                    type='button'
                                                    variant='danger'>
                                                    Add to Liked
                                                </Button>
                                                <ListGroup.Item>
                                                    <h3>{product.name}</h3>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    <Rating value={product.rating} color='#f5cb42' />
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    price: ${product.price}
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    Location: &#9906;{product.brand}
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    Description: {product.description}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Row>


                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={5}>
                                        <ListGroup variant='flush'>
                                            <h5 className='mt-3 mb-1'>Write a review</h5>
                                            <ListGroup.Item>
                                                {loadingProductReview && <Loader />}
                                                {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                                {userInfo ? (
                                                    <Form onSubmit={submitHandler}>

                                                        <RatingRadio color='#f5cb42' rating={rating} setRating={setRating} />
                                                        <Form.Group controlId='comment' className='mt-3 mb-2'>
                                                            <Form.Control
                                                                className='rounded-0'
                                                                placeholder='Leave a Review'
                                                                as='textarea'
                                                                row='5'
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                            ></Form.Control>
                                                        </Form.Group>
                                                        <div className="d-grid gap-2">
                                                            <Button
                                                                className='mt-2 rounded-0'
                                                                disabled={loadingProductReview}
                                                                type='submit'
                                                                variant='warning'
                                                            >

                                                                Submit
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                ) : (
                                                    <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                )}
                                            </ListGroup.Item>

                                            <h5 className='mb-2 mt-3'>Reviews</h5>
                                            {!product.reviews || product.reviews.length === 0}

                                            {!product.reviews || product.reviews.length === 0 ?
                                                <ListGroup.Item>
                                                    <Message variant='info' className="rounded-0">No Reviews</Message>
                                                </ ListGroup.Item>
                                                :
                                                (
                                                    product.reviews.map((review) => (

                                                        <ListGroup.Item key={review._id}>
                                                            <strong>{review.name}</strong>
                                                            <Rating value={review.rating} color='#f8e825' />
                                                            <p>
                                                                {review.createdAt ? review.createdAt.substring(0, 10) : ''}
                                                            </p>
                                                            <p>{review.comment}</p>
                                                        </ListGroup.Item>
                                                    ))
                                                )}


                                        </ListGroup>
                                    </Col>

                                </Row>
                            </div>
                        )
                }


            </div >
        </>
    )
}