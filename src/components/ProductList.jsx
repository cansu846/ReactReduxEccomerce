import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product';

export default function ProductList() {

    const {products} = useSelector((store)=>(store.product));
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllProducts());
    }, [])

  return (
    <div className='mt-5'>
      <h3>ProductList</h3>
      <div className='row'>
      {
        products.map((product)=>(
           <Product key={product.id} product={product}/>
        ))
      }
      </div>
      
    </div>
  )
}
