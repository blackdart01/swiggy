import React from 'react'
import axios from "axios";
import '../Styles/cart.css'
import Navbar from '../Components/Navbar'
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../Components/cartContext';
import { useNavigate } from 'react-router-dom';
const Cart = () => {

    const [cartArr] = useContext(CartContext);
    const [cart, setCart] = useState(null)
   
    let subtotalAmt = 0;
    let gstAmt = 0;
    let totalAmt = 0;
    useEffect(() => {
        axios.get("http://localhost:8080/posts").then((response) => {
        });
    }, [])

    const handleIncrement = async(index) => {
        cartArr[index].quantity+=1;
        // if (!cartArr[index].quantity) {
        //     cartArr.splice(index, 1);
        // }
        setCart(cartArr[index].quantity);
    }
    const handleDecrement = async(index) => {
        cartArr[index].quantity-=1;
        if(!cartArr[index].quantity){
            cartArr.splice(index, 1);
        }
        setCart(cartArr[index].quantity);
    }

    const navigate = useNavigate();

    const handleBackClick = (event) => {
        navigate(-1);
    };

    return (
        <>
            <Navbar />
                <button className="back-css" onClick={handleBackClick}>Back</button>
            <div className="cart">
                {cartArr.map((obj, index) => {
                    subtotalAmt+=obj.price * obj.quantity;
                    gstAmt = subtotalAmt * 0.03;
                    totalAmt = subtotalAmt + gstAmt
                    return (
                        <div className="cart-card" key={obj.id}>
                            <div className="cart-card-desc">
                                <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${obj.imageId}`} alt="" />
                                <p className="cart-card-text">{obj.name}</p>
                            </div>
                            <div className="button">
                                <div className="left-button">
                                    <button onClick={() => handleDecrement(index)}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 11h14v2H5z"></path></svg></button>
                                </div>
                                <div className="text-text">
                                    <p className="text">{obj.quantity}</p>
                                </div>
                                <div className="right-button">
                                    <button onClick={() => handleIncrement(index)}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></button>
                                </div>
                            </div>
                            <p className="price">₹{obj.price * obj.quantity}</p>
                        </div>
                    )
                })}
                <div className="receipt">
                    <div className="subtotal">
                        <p className="subtotal-text">Sub Total</p>
                        <p className="subtotal-price">₹{subtotalAmt}</p>
                    </div>
                    <div className="subtotal">
                        <p className="subtotal-text">GST(3%)</p>
                        <p className="subtotal-price">₹{gstAmt}</p>
                    </div>
                    <div className="subtotal">
                        <p className="subtotal-text">Total Amount</p>
                        <p className="subtotal-price">₹{totalAmt}</p>
                    </div>
                </div>

                <div className="order">
                    <button> Order</button>
                </div>
            </div>
        </>
    )
}

export default Cart