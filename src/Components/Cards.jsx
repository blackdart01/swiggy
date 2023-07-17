    // import { useEffect, useState } from 'react'
    import React from 'react'
    import '../Styles/cards.css'
    // import Product from './Product'
import { useNavigate } from 'react-router-dom'

    const Cards = (data, isLoaded) => {

        const navigate = useNavigate();
        function getProduct(id) {
            console.log("id =========================> ", id, " data ====================> ",data);
            
            navigate(`/restroMenu/${id}`);
        }
        

        return (
            <div className="grid-container" >
                <div className="grid-item grid-item-css">
                    {data.data.map(obj => {
                            return (
                            <div className="card card-css" key={obj.id} onClick={()=> getProduct(obj.data.id)}>
                                <img className="_2tuBw _12_oN" alt="221b Baker Street" src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${obj.data.cloudinaryImageId}`} />

                                <div className="card-body">
                                    <h5 className="card-title">{obj.data.name}</h5>
                                    <p className="card-text card-desc">{obj.data.cuisines}</p>
                                    <div className="card-footer-div">
                                        <p className="part1"><i className="fa-solid fa-star"></i>{obj.data.avgRating}</p>
                                        <p className="part2">Delivery Time : {obj.data.deliveryTime} mins</p>
                                        <p className="part3">{obj.data.costForTwoString}</p>
                                    </div>
                                </div>
                            </div>
                            )
                    })}
                </div>
            </div>
        )
    }

    export default Cards