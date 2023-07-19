import React, { useContext } from 'react'
import '../Styles/product.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../Components/cartContext'
import { useNavigate } from 'react-router-dom';
const Product = (props) => {

    // const [toggle, setToggle] = useState(true)
    const { isLoaded, data, restroData, restroCouponData } = props
    const [cartArr, setCartArr] = useContext(CartContext);

    // const handleChangeChecked = (event) => {
    //     setToggle(toggle => !toggle)
    // }

    let category = restroData[0].category;

    // const saveObjectToJSON = (object) => {
    //     axios
    //         .post("http://localhost:8080/cartArr", object).then(res => console.log(res))
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // const handleSaveButtonClick = (cartArr) => {
    //     const savePromises = cartArr.map(saveObjectToJSON);

    //     Promise.all(savePromises)
    //         .then((responses) => {
    //             // Handle successful responses if needed
    //             console.log('Objects saved successfully:', responses);
    //         })
    //         .catch((error) => {
    //             console.error('Error saving objects:', error);
    //         });
    // };

    const addToCart = (imgid, foodname, foodprice) => {
        const index = cartArr.findIndex((obj) => obj.imgIdObj === imgid);
        if (index !== -1) {
            let t=1;
            setCartArr((prevArrayState) => {
                const newArray = [...prevArrayState];
                if ((++t)%2){
                    newArray[index].quantity = prevArrayState[index].quantity + 1;
                }
                return newArray;
            });
        } else {
            setCartArr((prevArrayState) => [
                ...prevArrayState,
                { imgIdObj: imgid, quantity: 1, foodPriceObj: foodprice, foodNameObj: foodname},
            ]);
        }
    }


    const handleAddToCart = (item) => {
        const existingCartItemIndex = cartArr.findIndex((cartItem) => cartItem.imageId === item.imageId);
        if (existingCartItemIndex != -1) {
            const updatedCart = [...cartArr];
            updatedCart[existingCartItemIndex].quantity += 1;
            setCartArr(updatedCart);
        } else {
            let { imageId, name, price } = item;
            price/=100;
            setCartArr([...cartArr, { imageId, name, price, quantity: 1 }]);
        }
    };

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };


    // let hasData = false;
    return (
        <>
                    <button className="back-css" onClick={handleBackClick}>Back</button>
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
                            {restroCouponData.map(obj => {
                                return (
                                    <div className="testimonial">
                                        <div className="couponBenefit">
                                            <i className="fa-solid fa-percent" ></i>
                                            <p className="">{obj.info.header}</p>
                                        </div>
                                        <div className="couponDesc">{obj.info.couponCode} | {obj.info.description}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <div className="foodCategory">
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
                    </div> */}
                    <hr />
                    <div className="menu-list">
                        <div className="menuSection">
                            <span className="menuHeading">{category} ({restroData.length})</span>
                            {restroData.map(obj => {
                                // if (toggle) {
                                    // hasData = true;
                                    return (
                                        <>
                                            <div className="menu">
                                                <div className="menuCards">
                                                    <p className="menu-item-title">{obj.name}</p>
                                                    <p className="price">₹{(obj.price || obj.defaultPrice) / 100}</p>
                                                    <div className="menu-desc">{obj.description}</div>
                                                </div>
                                                {obj.imageId ? (
                                                    <div className="menu-card-img">
                                                        <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${obj.imageId}`} alt="" />
                                                        <button className="add-to-cart" onClick={() => handleAddToCart(obj)
                                                        }>Add</button>
                                                    </div>
                                                ) : (
                                                    <div className="menu-card-img">
                                                        <img alt="No Data" />
                                                        <button className="add-to-cart" onClick={() =>
                                                            // addToCart(obj.imageId, obj.name, obj.price / 100)
                                                            handleAddToCart(obj)
                                                        }>Add</button>
                                                    </div>
                                                )}
                                            </div>
                                            <hr />
                                        </>
                                    )
                                // }
                                // return null;
                            })
                            // .concat(!hasData ? (<div className='menu'>No Data</div>) : null)
                            }
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Product