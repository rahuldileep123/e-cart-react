import React, { useEffect, useState } from 'react'
import { Row,Col, Card,Spinner } from 'react-bootstrap'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import  { fetchProducts } from '../Redux/slice/productSlice'

function Home() {
const dispatch = useDispatch()
const {allProducts,error,loading}= useSelector(state=>state.productReducer)
console.log(allProducts,error,loading);
//page nation logic
const [currentpage,setCurrentPage]=useState(1)
const productsPerPage=8
const totalPages= Math.ceil(allProducts?.length/productsPerPage)
const lastProductIndex=currentpage * productsPerPage
const firstProductIndex=lastProductIndex-productsPerPage
const visibleCards=allProducts?.slice(firstProductIndex,lastProductIndex)

const navigateToNext =()=>{
  if(currentpage!=totalPages){
    setCurrentPage(currentpage+1)
    console.log(currentpage);
  }
}
const navigateToPrev=()=>{
  if(currentpage!=1){
    setCurrentPage(currentpage-1)
  }
}
console.log(currentpage);


useEffect(()=>{
  dispatch(fetchProducts())
},[])
  return (
    <>
    <Header insideHome />
   <div className="container" style={{marginTop:"150px"}}> 
  
    {loading? (<div className='mt-5 text-center'><Spinner animation="border" variant="danger" />Loading...</div>)
     :( <Row >
    { allProducts?.length>0? (visibleCards.map(product=>(<Col className='mb-3  mt-5' sm={12} md={6} lg={4} xl={3}>
      <Card className='rounded shadow' style={{ width: '18rem' }}>
      <Card.Img className='rounded' variant="top" style={{height:"180px"}} src={product.thumbnail} />
      <Card.Body className='text-center'>
        <Card.Title>{product.title.slice(0,15)}...</Card.Title>
        <Card.Text>
          <Link to={`/view/${product.id}`}>View More..</Link>
        </Card.Text>
        
      </Card.Body>
    </Card>
      </Col>)))
     :
     <div>Product not found</div> 
    }
    </Row>)}
    <div className="d-flex justify-content-center align-items-center mt-3">
      <span style={{cursor:"pointer"}}>
        <i onClick={navigateToPrev}  className="fa-solid fa-backward me-4"></i>
      </span>
      <span className='fw-bolder' >{currentpage}</span>
      <span style={{cursor:"pointer"}}>
        <i onClick={navigateToNext} className="fa-solid fa-forward ms-4"></i>
      </span>
    </div>
   </div>
   </>
  )
}

export default Home