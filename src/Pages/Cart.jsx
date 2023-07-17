import React from 'react'
import '../Styles/cart.css'
import Navbar from '../Components/Navbar'
import { useContext, useState } from 'react';
import { CartContext } from '../Components/cartContext';
const Cart = () => {

    const [cartArr] = useContext(CartContext);
    const [cartCount, setCartCount] = useState([])
    const [itemCount, setItemCount] = useState({});

    let subtotalAmt = 0;
    let gstAmt = 0;
    let totalAmt = 0;
    cartArr.map(obj => {
        subtotalAmt += obj.foodPriceObj;
    })
    gstAmt = subtotalAmt * 0.03;
    totalAmt = subtotalAmt + gstAmt


    const handleDecrement = (index) => {
        const updatedCart = [...cartArr];
        if (itemCount[index] > 0) {
            updatedCart[index].foodQuantity -= 1;
            setItemCount((prevCount) => ({
                ...prevCount,
                [index]: prevCount[index] - 1,
            }));
        }
        setCartCount(updatedCart);
    };

    const handleIncrement = (index) => {
        setCartCount((prevObj) => {
            const existing = cartCount.find((obj) => obj.index === index);
            if (existing) {
                console.log(prevObj.map((obj) => obj.index === index ? { ...obj, count: obj.count + 1 } : obj));
                return  prevObj.map((obj) => obj.index === index ? { ...obj, count: obj.count + 1 } : obj);
            }
            else{
                const newObj={index:index,count:1};
                console.log(newObj);
                return [...prevObj, newObj];
            }
        })
        console.log(cartCount);
    };

    return (
        <>
            <Navbar />
            <div className="cart">
                {cartArr.map((obj, index) => {
                    return (
                        <div className="cart-card" key={obj.id}>
                            <div className="cart-card-desc">
                                <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${obj.imgIdObj}`} alt="" />
                                <p className="cart-card-text">{obj.foodNameObj}</p>
                            </div>
                            <div className="button">
                                <div className="left-button">
                                    <button onClick={() => handleDecrement(index)}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 11h14v2H5z"></path></svg></button>
                                </div>
                            {cartCount.map((obj, index) => {
                                <div className="text-text">
                                    <p className="text">{index}</p>
                                </div>
                                }
                                )}
                                <div className="right-button">
                                    <button onClick={() => handleIncrement(index)}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></button>
                                </div>
                            </div>
                            <p className="price">₹{obj.foodPriceObj}</p>
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