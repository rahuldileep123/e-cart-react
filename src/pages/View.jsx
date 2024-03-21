import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import {  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistitem } from '../Redux/slice/wishlistSlice'
import { addToCart } from '../Redux/slice/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {
  const wishlist=useSelector(state=>state.wishlistReducer)
  const cart =useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
 const [product,setProduct]=useState("")
const {id}=useParams()
  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      // console.log(allProducts);
      setProduct(allProducts.find(product=>product.id==id))
    }
  },[])
 const handleWishlist=(product)=>{
  if(wishlist?.includes(product)){
    toast.info("item already in wishlist")
  }else{
    dispatch(addWishlistitem(product))
  }
 }

const handleCart=(product)=>{
   const existingProduct=cart.find(item=>item.id==product.id)
 if(existingProduct){
  dispatch(addToCart(product))
  toast.success("products added to the cart")
 }else{
  dispatch(addToCart(product))
  toast.success("product added to the cart") 
 }
}

  console.log(product);
  return (
    <>
    <Header/>
    <div className="container" style={{marginTop:"100px"}}>
      <Row>
        <Col sm={12} md={6} lg={6} className="d-flex align-items-center p-4" >
          <img width={"400px"} height={"300px"} src={product.thumbnail} alt="" />
        </Col>
        <Col sm={12} md={6} lg={6} className='p-5' >
          <p>PID:{product.id} </p>
          <h1>{product.title}</h1>
          <h3 className='text-primary'>${product.price}</h3>
          <p style={{textAlign:"justify"}}><b>Description</b>:{product.description}</p>
          <div className='w=-100 d-flex justify-content-between mt-5'>
            <button onClick={()=>handleWishlist(product)} type='button' className='btn btn-secondary'><i className="fa-solid fa-heart text-danger"></i>Add To Wishlist</button>
            <button onClick={()=>handleCart(product)}  type='button' className='btn btn-secondary'><i className="fa-solid fa-cart-shopping"></i>Add To Cart</button>
          </div>
        </Col>
      </Row>
    </div>
    <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </>
  )
}

export default View