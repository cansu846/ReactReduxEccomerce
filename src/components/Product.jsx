import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Product(props) {
    const { id, title, price, description, category, image, rating, count } = props.product;

    const navigate = useNavigate();

    const eventHandler = () => {
        navigate('/product-detail/'+id);
    } 

    return (
        <div className="col-2 p-3 m-2 rounded" style={{ maxWidth: "15rem", height: "500px", boxShadow: "1px 2px 2px"}}>
            <img src={image} class="card-img-top border-secondary mb-3" alt="..." style={{ width: "100%", height: "250px"}} />
            <div class="card-body text-center ">
                <h5 class="card-title" style={{ fontSize: "15px", fontFamily: "Arial",height:"100px" }}>{title}</h5>
                <p class="card-text mt-3" >Price: {price} $</p>
            </div>
            <button className='btn btn-primary mt-3 ms-3' onClick={()=>{eventHandler()}}>Product Detail</button>
        </div>

    )
}
