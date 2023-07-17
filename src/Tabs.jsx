import React from 'react'
import './Styles/tabs.css'

const Tabs = (props) => {
return (

    <div className="tabsPart">
            <div className="leftPart">
                <span className="noOfRestro"> {props.data} Restaurants </span>
            </div>
            <div className="rightPart">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a
                            className="nav-link active-active"
                            aria-current="page"
                            href="navbar.html"
                        >Relevance</a
                        >
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">Filter</a>
                        <i className="fa-solid fa-filter" ></i>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Tabs