import React, { useEffect, useState } from 'react'
import "../css/Header.css"
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa6";
import { CiShoppingBasket } from "react-icons/ci";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDrawerOpen } from '../redux/slices/basketSlice';
import { listProductsByTitle } from '../redux/slices/productSlice';

export default function Header() {
    const [theme, setTheme] = useState(false);
    const { products } = useSelector((store) => (store.basket));
    const [basketSize, setBasketSize] = useState(0);
    const [titleFromSearch, setTitleFromSearch] = useState("");
    const [searchTriggered, setSearchTriggered] = useState(false);

    const dispatch = useDispatch();

    const handelSearch = ()=>{
        dispatch(listProductsByTitle(titleFromSearch));
    }
    
    useEffect(() => {
        if (searchTriggered) {
            handelSearch();
            setSearchTriggered(false); // Arama tetiklendiğinde bayrağı tekrar false yaparak döngüyü önleriz
        }
    }, [searchTriggered]);

    const sumCountProducts = () => {
        let count=0
        products.map((product) => {
           count += product.count
        })
        setBasketSize(count);
    }

    useEffect(() => {
        sumCountProducts();
    }, [products])

    const changeTheme = () => {
        setTheme(!theme)
        const root = document.getElementById('root');

        if (theme) {
            root.style.backgroundColor = "black"
            root.style.color = "#fff"
        }
        else {
            root.style.backgroundColor = "#fff"
            root.style.color = "black"
        }


    }

    return (
        <div>
            <div className='row'>
                <div className='col-6'>
                    <img className="logo" src="/images/logo2.png" />
                    <span style={{ fontFamily: "-moz-initial", fontSize: "20px" }}>Cansu A.Ş</span>
                </div>
                <div className="col-3 ms-auto">

                    <input className="input mt-2" type="text" placeholder='Search...' 
                    onChange={(e)=>setTitleFromSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setSearchTriggered(true); // Enter basıldığında arama tetiklenir
                        }
                    }}
                    />

                </div>
                <div className='col-auto me-auto pt-3'>
                    {
                        (theme) ?
                            <FaMoon className='m-1' size="1.3em" onClick={() => { changeTheme() }} />
                            :
                            <CiLight className='m-1' size="1.3em" onClick={() => { changeTheme() }} />
                    }
                    <Badge badgeContent={basketSize} color="secondary">
                        <ShoppingCartIcon size="1.3em" onClick={()=>dispatch(setIsDrawerOpen())} />

                    </Badge>
                </div>
            </div>
        </div>
    )
}
