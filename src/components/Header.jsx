import React from 'react'
import {  Navbar,Nav,Container,Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { searchProduct } from '../Redux/slice/productSlice'
function Header({insideHome}) {
  const dispatch=useDispatch()
  const wishlistCount = useSelector(state=>state.wishlistReducer).length
  const cartCount = useSelector(state=>state.cartReducer).length
  // console.log(cartCount);
  
  return (
  
        <Navbar style={{zIndex:"1"}} expand="lg" className="bg-primary position-fixed top-0 w-100 ">
      <Container >
        <Navbar.Brand > <Link to={"/"} className='text-light fw-bolder' style={{textDecoration:'none'}}><i  className="fa-solid fa-truck-fast me-1"></i>
    Ecart</Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
                {insideHome && <Nav.Link >
                 <input onChange={(e)=>dispatch(searchProduct(e.target.value.toLowerCase()))} className='form-control ' style={{width:'400px',height:'50px'}} type="text" placeholder='search products here!!' />
                 
                 </Nav.Link>}
            <Nav.Link> <Link to={"/wishlist"} style={{textDecoration:"none",color:"white"}}><i className="fa-solid fa-heart text-danger"></i>Wishlist<Badge bg="secondary" className='ms-1'>{wishlistCount}</Badge></Link> </Nav.Link>
            <Nav.Link> <Link to={"/cart"} style={{textDecoration:"none",color:"white"}}><i className="fa-solid fa-cart-shopping "></i>Cart<Badge   bg="secondary" className='ms-1'>{cartCount}</Badge></Link> </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

   
  )
}

export default Header