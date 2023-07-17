import React from 'react'
import './index.css'
import './Styles/Navbar.css'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"
                ><img
                        height=""
                        width=""
                        src="https://www.theknowhowlib.com/wp-content/uploads/2020/05/Swiggy-2.png"
                        alt=""
                    /></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item nav-item-css">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <a className="nav-link active" aria-current="page" href="#">Search</a>
                        </li>
                        <li className="nav-item nav-item-css">
                            <i className="fa-regular fa-circle-question"></i
                            ><a className="nav-link active" href="#">Offers</a>
                        </li>
                        <li className="nav-item nav-item-css">
                            <i className="fa-regular fa-user"></i>
                            <Link className="nav-link active" to="/login">Sign In</Link>
                        </li>
                        <li className="nav-item nav-item-css">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <Link className="nav-link active" to="/cart" >Cart</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar