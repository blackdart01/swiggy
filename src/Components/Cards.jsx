// import { useEffect, useState } from 'react'
import React from 'react'
import '../Styles/cards.css'
// import Product from './Product'
import { useNavigate } from 'react-router-dom'

const Cards = (data, isLoaded) => {

    const navigate = useNavigate();
    function getProduct(id) {
        console.log("id =========================> ", id, " data ====================> ", data);
        navigate(`/restroMenu/${id}`);
    }
    console.log(data);

    let d = data.data.map(object => object.data.cuisines)
    console.log(d);
    let str=[];
    let newD = d.map(object => object.join(', '));
    console.log(newD);

    return (
        <div className="grid-container" >
            <div className="grid-item grid-item-css">
                {data.data.map((obj,index) => {
                    return (
                        <div className="card card-css" key={obj.id} onClick={() => getProduct(obj.data.id)}>
                            <img className="image" alt="221b Baker Street" src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${obj.data.cloudinaryImageId}`} />

                            <div className="card-body">
                                <h5 className="card-title">{obj.data.name}</h5>
                                {/* {newD[index].map(cuisine => {
                                    return ( */}
                                        <p className="card-text card-desc">{newD[index]}</p>
                                        {/* ) */}
                                {/* })} */}
                                <div className="card-footer-div">
                                    {obj.data.avgRating < 4 ? (<p className="part1 mud"><i className="fa-solid fa-star"></i>{obj.data.avgRating}</p>
                                    ) : (obj.data.avgRating < 3 ?
                                        (<p className="part1 yellow"><i className="fa-solid fa-star"></i>{obj.data.avgRating}</p>
                                            ) : (obj.data.avgRating < 2 ?
                                            (<p className="part1 red"><i className="fa-solid fa-star"></i>{obj.data.avgRating}</p>):
                                                (<p className="part1 green"><i className="fa-solid fa-star"></i>{obj.data.avgRating}</p>)
                                        )
                                    )}
                                    <p className="part2">{obj.data.deliveryTime} mins</p>
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