import React from 'react'
import Header from '../components/Header'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../Redux/slice/wishlistSlice' 
import { addToCart } from '../Redux/slice/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Wishlist() {
  const cart=useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
  const wishlist=useSelector(state=>state.wishlistReducer)

  const handleCart=(product)=>{
    const existingProduct=cart.find(item=>item.id==product.id)
  if(existingProduct){
   dispatch(addToCart(product))
   dispatch(removeWishlistItem(product.id))
   toast.success("products added to the cart")
  }else{
   dispatch(addToCart(product))
   dispatch(removeWishlistItem(product.id))
   toast.success("product added to the cart") 
  }
 }
  return (
    <>
    <Header/>
    <div className='container' style={{marginTop:"150px"}}>
      {wishlist?.length>0?
          <Row>
          { wishlist?.map(product=>(
             <Col className='mb-5' sm={12} md={6} lg={4}>
             <Card className='rounded shadow' style={{ width: '18rem' }}>
         <Card.Img className='rounded' variant="top" style={{height:"180px"}} src={product?.thumbnail} />
         <Card.Body className='text-center'>
           <Card.Title>{product?.title.slice(0.15)}..</Card.Title>
          <div className="d-flex justify-content-between">
           <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='btn'><i className='fa-solid fa-heart-circle-xmark text-danger'></i></button>
           <button onClick={()=>handleCart(product)} className='btn'><i className='fa-solid fa-cart-plus text-dange text-success'></i></button>
          </div>
           
         </Card.Body>
       </Card>
             </Col>
          ))
           }
        </Row>
        
        :
        <div className="d-flex flex-column justify-content-center align-items-center w-100 ">
        <img className='mb-3' width={"200px"} height={"200px"} src="https://cdn-icons-png.freepik.com/512/4379/4379680.png" alt="" />
        <h1>Your Wish List is Empty!!</h1>
      </div>
      }
    </div>
    
    <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    
    </>
  )
}

export default Wishlist