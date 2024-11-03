import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setSelectedProduct } from '../redux/slices/productSlice';
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { addProductToBasket } from '../redux/slices/basketSlice';


export default function ProductDetail() {
    const { products, selectedProduct } = useSelector((store) => (store.product));
    const {price, image, title, description} = selectedProduct;
    const { id } = useParams();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1)
    }
    const decrease = () => {
        setCount(count - 1)
    }

    const addBasket = ()=>{
        const payload={
            id,
            price,
            image,
            title,
            description,
            count
        }
        dispatch(addProductToBasket(payload));
    }

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product))
                console.log(product.title)
            }
        })
    }

    useEffect(() => {
        getProductById();
    }, [])

    return (
        <div style={{ marginTop: "8%" }}>
            <div class="card mb-3 p-5" style={{ maxWidth: "540px000", }}>
                <div class="row">
                    <div class="col-md-4">
                        <img src={selectedProduct.image} class="img-fluid rounded-start" alt="..." style={{ height: "300px" }} />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body m-3">
                            <h5 class="card-title">{selectedProduct.title}</h5>
                            <h6 class="card-title">{selectedProduct.category}</h6>
                            <h6 class="card-text">{selectedProduct.price}</h6>
                            <p class="card-text">{selectedProduct.description}</p>

                            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                            <div className='row justify-content-start'>
                                <div className='col-2 pt-2'><IoMdAdd onClick={() => { increase() }} />
                                    <span className='p-2'>{count}</span>
                                    <IoMdRemove onClick={() => { decrease() }} />
                                </div>
                                <div className='col-2'>
                                        <button className='btn btn-warning' onClick={addBasket}>Add</button>
                                    </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
