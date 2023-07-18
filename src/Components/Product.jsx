import React, { useContext } from 'react'
import '../Styles/product.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../Components/cartContext'
const Product = (props) => {

    const [toggle, setToggle] = useState(true)
    const { isLoaded, data, restroData,restroCouponData,restroId } = props
    const [cartArr,setCartArr]=useContext(CartContext);

    const handleChangeChecked = (event) => {
        setToggle(toggle => !toggle)
    }
    let category = restroData[0].category;
    const addToCart = (imgid, foodname, foodprice) => {
        let myObj={
            imgIdObj:imgid,
            foodNameObj:foodname,
            foodPriceObj:foodprice
        };
        
        let newArr = 
        setCartArr((prevData) => [...prevData, myObj])
        alert(`${foodname} Added to Cart ,\n ${cartArr.length + 1} items in Cart.`)
    }

  let hasData = false;
    return (
        <>
            {isLoaded ? (
                <div className="productPageContainer flex-grow-1">
                    <div className="restro">
                        <div className="restroLeft">
                            <p className="restro-title">{data.name}</p>
                            <p className="tags">{data.cuisines}</p>
                            <p className="address">{data.areaName}, {data.sla.lastMileTravelString}</p>
                            <p className="address">{data.locality}</p>
                        </div>
                        <div className="restroRight">
                            <p className="rating"><i className="fa-solid fa-star"></i>{data.avgRating || data.avgRatingString}</p>
                            <p className="review">{data.totalRatingsString || "20+ ratings"}</p>
                        </div>
                    </div>
                    <div className="coupon-testimonial">
                        <div className="testimonial-container">
                            {restroCouponData.map(obj=>{
                                return(
                            <div className="testimonial">
                                <div className="couponBenefit">
                                    <i className="fa-solid fa-percent" ></i>
                                    <p className="">{obj.info.header}</p>
                                </div>
                                        <div className="couponDesc">{obj.info.couponCode} | {obj.info.description}</div>
                            </div>
                            )})}
                        </div>
                    </div>
                    <div className="foodCategory">
                        <p className="veg">Veg Only</p>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                defaultChecked={true}
                                onChange={handleChangeChecked}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="menu-list">
                        <div className="menuSection">
                            <span className="menuHeading">{category} ({restroData.length})</span>
                            {restroData.map(obj => {
                                if (toggle) {
                                    hasData = true;
                                    return (
                                        <>
                                        <div className="menu">
                                            <div className="menuCards">
                                                <p className="menu-item-title">{obj.name}</p>
                                                <p className="price">₹{(obj.price || obj.defaultPrice) / 100}</p>
                                                <div className="menu-desc">{obj.description}</div>
                                            </div>
                                                {obj.imageId?(
                                            <div className="menu-card-img">
                                                <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${obj.imageId}`} alt="" />
                                                        <button className="add-to-cart" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() =>
                                                        addToCart(obj.imageId, obj.name, obj.price / 100)
                                                    }>Add</button>
                                            </div>
                                                    ) : (
                                                        <div className="menu-card-img">
                                                            <img alt="No Data"/>
                                                            <button className="add-to-cart" onClick={() =>
                                                                addToCart(obj.imageId, obj.name, obj.price / 100)
                                                            }>Add</button>
                                                        </div>
                                                    )}
                                        </div>
                                            <hr/>
                                            </>
                                    )
                                }
                                return null;
                            }).concat(!hasData ? (<div className='menu'>No Data</div>) : null)
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <div>loading data...</div>
            )}
            {/* <Footer/> */}
        </>
    )
}

export default Product