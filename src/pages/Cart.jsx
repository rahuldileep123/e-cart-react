import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, emptyCart, incrementQuantitiy, removeCartItem } from '../Redux/slice/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Cart() {
  const navi = useNavigate()
  const cartList=useSelector(state=>state.cartReducer)
  const [totalAmount,setTotalAmount]=useState(0)
const dispatch=useDispatch()
  useEffect(()=>{
   if(cartList?.length>0){
    setTotalAmount(cartList.map(item=>item.totalPrice).reduce((p1,p2)=>p1+p2))
   }else{
    setTotalAmount(0)
   }
  },[cartList])
 
  const handleDecrement=(product)=>{
    if(product.quantity>1){
      dispatch(decrementQuantity(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }

const handleToast=()=>{
  dispatch(emptyCart())
  toast.success("order placed..")
   setTimeout(() => {
    navi("/")
   }, 2000);
}
  return (
    <>
    <Header/>
    {cartList?.length>0?
 (   
       <div className="container" style={{marginTop:"100px"}}>
       <h1>cart summary</h1>
       <Row>
         <Col sm= {12} md={8} lg={8}>
           <table className='table'>
             <thead>
             <tr>
               <th>#</th>
               <th>Image</th>
               <th>Title</th>
               <th>Quantity</th>
               <th>Price</th>
               <th>...</th>
             </tr>
             </thead>
             <tbody>
              {cartList?.map((product,index)=>(
                 <tr>
                 <td>{index+1}</td>
                 <td><img width={"60px"} height={"60px"} src={product.thumbnail} alt="" /></td>
                 <td>{product.title}</td>
                 <td>
                   <div className="d-flex ">
                   <button onClick={()=>handleDecrement(product)}  type="button" className="btn bg-light fw-bolder me-2">-</button>
                     <input style={{width:"50px"}} value={product.quantity} type="text" className='rounded border-0 shadow me-2 ' readOnly placeholder='0' />
                     <button onClick={()=>dispatch(incrementQuantitiy(product.id))} className='btn fw-bolder'>+</button>
                   </div>
             
                 </td>
                 <td>{product.totalPrice}</td>
                 <td><i onClick={()=>dispatch(removeCartItem(product.id))} className='fa-solid fa-trash text-danger'></i></td>
               </tr>
              ))}
             </tbody>
  
           </table>
           <div className="float-end mt-3 d-flex">
             <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-5'>EMPTY CART</button>
             <Link to={"/"} className='btn btn-info'>Shop More</Link>
  
           </div>
         </Col>
         <Col sm= {12} md={4} lg={4}>
           <div className="shadow rounded p-4">
              <h5>Total Product: <b className='text-danger'>{cartList?.length} </b></h5>
              <h4>Total Amount: <b className='text-danger'>${totalAmount}</b></h4>
              <hr />
              <div className='d-grid mt-3'><button onClick={handleToast} className='btn btn-success'>check out</button></div>
           </div>
         </Col>
       </Row>
     </div>
    )
    :
(
  <div className='container' style={{marginTop:"100px"}}>
        <div style={{height:'70vh'}} className="d-flex flex-column justify-content-center align-items-center w-100">
          <img className='mb-3' width={"200px"} height={"200px"} src="https://cdn-icons-png.freepik.com/512/4379/4379680.png" alt="" />
          <h1>Your Cart is Empty!!</h1>
        </div>
      </div>
)
    }

    
<ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Cart