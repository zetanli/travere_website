import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


export default function ProductEditScreen() {
    const navigate = useNavigate();
    const { id } = useParams();
    const productId = id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/products')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }



    }, [dispatch, product, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/products'>
                Go Back
            </Link>
            <FormContainer>
                <h2>Edit Product</h2>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label style={{ "fontSize": "14px" }}>Name</Form.Label>
                                <Form.Control
                                    className='rounded-0'
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label style={{ "fontSize": "14px" }}>Image</Form.Label>
                                <Form.Control
                                    className='rounded-0'
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.Control
                                    id="image-file"
                                    className='rounded-0'
                                    type="file"
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.Control>
                                {uploading && <Loader />}
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group controlId='price'>
                                        <Form.Label style={{ "fontSize": "14px" }}>Price</Form.Label>
                                        <Form.Control
                                            className='rounded-0'
                                            type='number'
                                            placeholder='Enter price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId='brand'>
                                        <Form.Label style={{ "fontSize": "14px" }}>Brand</Form.Label>
                                        <Form.Control
                                            className='rounded-0'
                                            type='text'
                                            placeholder='Enter brand'
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId='countinstock'>
                                        <Form.Label style={{ "fontSize": "14px" }}>Stock</Form.Label>
                                        <Form.Control
                                            className='rounded-0'
                                            type='number'
                                            placeholder='Enter stock'
                                            value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId='category'>
                                        <Form.Label style={{ "fontSize": "14px" }}>Category</Form.Label>
                                        <Form.Control
                                            className='rounded-0'
                                            type='text'
                                            placeholder='Enter category'
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId='description'>
                                <Form.Label style={{ "fontSize": "14px" }}>Description</Form.Label>
                                <Form.Control
                                    className='rounded-0'
                                    type='text'
                                    as="textarea"
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
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
