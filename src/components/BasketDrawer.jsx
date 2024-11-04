import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { calculateTotalPrice, deleteProductFromDrawer, setIsDrawerOpen } from '../redux/slices/basketSlice';
import { useEffect } from 'react';

export default function BasketDrawer() {
    const { isDrawerOpen, totalPrice } = useSelector((store) => (store.basket));
    //console.log("{isDrawerOpen}: "+ isDrawerOpen)
    //const [open, setOpen] = useState(isDrawerOpen);
    const { products } = useSelector((store) => store.basket);
    const dispatch = useDispatch();

    const onHandleDrawerClose = () => {
        dispatch(setIsDrawerOpen());
    }
    const handleDeleteProductFromDrawer = (payload)=>{
        dispatch(deleteProductFromDrawer(payload))
    }

    useEffect(()=>{
        dispatch(calculateTotalPrice())
    },[dispatch, products.length])

    const DrawerList = (
        <Box sx={{ width: 500 }} role="presentation">
            <List>
                {
                    products.map((product) => (
                        <ListItem key={product.id} style={{ paddingRight: "70px" }}>
                            <ListItemButton>
                                <img src={product.image} style={{
                                    width: "30px",
                                    marginRight: "5px"
                                }} />
                                <span style={{margin:"1px 3px"}}>({product.count})</span>
                                <ListItemText primary={product.title} style={{
                                    textAlign: "center",
                                    width: "100px"
                                }} />
                            </ListItemButton>
                            <div className='row me-auto '>
                                <div className='col'>
                                    <p style={{ fontWeight: "bold", width: "35px" }}>{product.price}$</p>
                                </div>
                                <div className="col" style={{ width: "20px" }}>
                                    <button style={{ border: "none", backgroundColor: "darkred", color: "#fff" }} onClick={()=>handleDeleteProductFromDrawer({id: product.id})} >Delete</button>
                                </div>
                        
                            </div>

                        </ListItem>
                    ))
                }
            </List>

            <Divider />

            <div>
                <p style={{ fontWeight: "bold", textAlign:"center", paddingTop:"2px"}}>Total Price: {totalPrice} $ </p>
            </div>
        </Box>
    )

    return (
        <div>
            <Drawer anchor="right" open={isDrawerOpen} onClose={() => { onHandleDrawerClose() }}>
                {DrawerList}
            </Drawer>
        </div>
    )
}

