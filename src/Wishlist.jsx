import React from 'react'
import Header from '../components/Header'
import { Card, Col, Row } from 'react-bootstrap'

function Wishlist() {
  return (
    <>
    <Header/>
    <div className='container' style={{marginTop:"100px"}}>
      <div className="d-flex flex-column justify-content-center align-items-center w-100 ">
        <img className='mb-3' width={"200px"} height={"200px"} src="https://cdn-icons-png.freepik.com/512/4379/4379680.png" alt="" />
        <h1>Your Wish List is Empty!!</h1>
      </div>
    </div>
    <div className="container " style={{marginTop:"100px"}}>
        <Row>
          <Col className='mb-5' sm={12} md={6} lg={4}>
          <Card className='rounded shadow' style={{ width: '18rem' }}>
      <Card.Img className='rounded' variant="top" style={{height:"180px"}} src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg" />
      <Card.Body className='text-center'>
        <Card.Title>Card Title</Card.Title>
       <div className="d-flex justify-content-between">
        <button className='btn'><i className='fa-solid fa-heart-circle-xmark text-danger'></i></button>
        <button className='btn'><i className='fa-solid fa-cart-plus text-dange text-success'></i></button>
       </div>
        
      </Card.Body>
    </Card>
          </Col>
        </Row>
    </div>
    </>
  )
}

export default Wishlist