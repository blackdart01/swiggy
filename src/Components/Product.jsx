import React, { useContext } from 'react'
import '../Styles/product.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from './cartContext'
const Product = (props) => {

    const [toggle, setToggle] = useState(true)
    const { isLoaded,data,restroData,restroCouponData,restroId } = props
    const [cartArr,setCartArr]=useContext(CartContext);

    const handleChangeChecked = (event) => {
        setToggle(toggle => !toggle)
    }

    const addToCart = (imgid, foodname, foodprice) => {
        let myObj={
            imgIdObj:imgid,
            foodNameObj:foodname,
            foodPriceObj:foodprice
        };
        let newArr = 
        setCartArr((prevData) => [...prevData, myObj])
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
                        </div>
                        <div className="restroRight">
                            <p className="rating"><i className="fa-solid fa-star"></i>{data.avgRating}</p>
                            <p className="review">{data.totalRatingsString}</p>
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
                            <span className="menuHeading">Recommended ({restroData.length}) </span>
                            {restroData.map(obj => {
                                if (toggle) {
                                    hasData = true;
                                    return (
                                        <>
                                        <div className="menu">
                                            <div className="menuCards">
                                                <p className="menu-item-title">{obj.card.info.name}</p>
                                                <p className="price">₹{obj.card.info.price / 100}</p>
                                                <div className="menu-desc">{obj.card.info.description}</div>
                                            </div>
                                            <div className="menu-card-img">
                                                <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${obj.card.info.imageId}`} alt="" />
                                                    <button className="add-to-cart" onClick={() =>
                                                        addToCart(obj.card.info.imageId, obj.card.info.name, obj.card.info.price / 100)
                                                    }>Add</button>
                                            </div>
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