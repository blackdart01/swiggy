import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/login.css'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Login = () => {

    const [getUser, setGetUser] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isBtnPressed, setIsBtnPressed] = useState(false);
    const [isFieldsEmpty, setIsFieldsEmpty] = useState(false);
    const [wrongCredentialsLogged, setIsWrongCredentialsLogged] = useState(false);
    
    // const submit = () => {
    //     setIsBtnPressed(true);
    //     setUserEmail(document.getElementById('form1Example13').value);
    //     setUserPassword(document.getElementById('form1Example23').value);
    //     axios.get("http://localhost:8080/userData").then(res => setGetUser(res));
    // }

    // useEffect(() => {
    //     // let dataFilled = false;
    //     if (userEmail == "" || userPassword == "") {
    //         console.log("empty data");
    //         setIsFieldsEmpty(true);
    //     }
    //     else if (userEmail != "" || userPassword != ""){
    //         setIsFieldsEmpty(false);
    //     }
    //     else if (getUser) {
    //         getUser.data.map(obj => {
    //             if (!isLoggedIn && userEmail === obj.userEmail && userPassword === obj.userPassword) {
    //                 console.log("logged in");
    //                 setIsLoggedIn(true);
    //             } else if (!isLoggedIn && !wrongCredentialsLogged) {
    //                 setIsWrongCredentialsLogged(true);
    //                 console.log("wrong credentials");
    //             }
    //         });
    //     }
    // }, [getUser, userEmail, userPassword]);


    useEffect(() => {
        if (getUser) {
            const checkLoginStatus = () => {
                let loggedIn = false;
                let isWrongCredentialsLogged = false;

                getUser.map(obj => {
                    console.log("-",(obj.userPassword===userPassword),"-");
                    if (!isLoggedIn && userEmail === obj.userEmail && userPassword === obj.userPassword) {
                        // setIsLoggedIn(true);
                        loggedIn = true;
                    } else if (!isLoggedIn && !wrongCredentialsLogged) {
                        // setIsWrongCredentialsLogged(true);
                        isWrongCredentialsLogged = true; //true
                    }
                    else{
                        setIsLoggedIn(false);
                        setIsWrongCredentialsLogged(false);
                    }
                });
                if(loggedIn == true){
                    console.log("logged in");
                    setIsLoggedIn(true);
                    // setIsWrongCredentialsLogged(false);
                }
                else{
                    console.log("wrong credentials");
                    // setIsLoggedIn(false);
                    setIsWrongCredentialsLogged(true);
                }

                // if (!isLoggedIn && !isWrongCredentialsLogged) {
                //     setIsWrongCredentialsLogged(true);
                // }
            };

            if (userEmail === "" || userPassword === "") {
                console.log("empty data");
                setIsFieldsEmpty(true);
            } else {
                setIsFieldsEmpty(false);
                checkLoginStatus();
            }
        }
    }, [getUser, userEmail, userPassword]);

    const submit = () => {
        setIsBtnPressed(true);
        setUserEmail(document.getElementById('form1Example13').value);
        setUserPassword(document.getElementById('form1Example23').value);

        axios.get("http://localhost:8080/userData")
            .then(res => setGetUser(res.data))
            .catch(err => console.error(err));
    }

    return (
        <>
            <Navbar />
            <section className="vh-100">
                <div className="container py-5 h-80">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form>
                                <div className="form-outline mb-4">
                                    <input type="email" id="form1Example13" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="form1Example13">Email address</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="form1Example23" className="form-control form-control-lg" />
                                    <label className="form-label" htmlFor="form1Example23">Password</label>
                                </div>

                                <div className="d-flex justify-content-left align-items-center mb-4">
                                    <button type="button" className="btn btn-primary btn-lg btn-block" id="loginBtn" onClick={() => submit()}>Sign in</button>
                                    <Link to="/signup" style={{marginLeft:'40px'}}>Register</Link>
                                </div>

                                {isLoggedIn && !isFieldsEmpty  &&(
                                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Login Successful</h5>
                                                    <button type="button" className="close close-btn-modal" data-dismiss="modal" aria-label="Close" onClick={() => setIsLoggedIn(false)}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>You have successfully logged in.</p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => setIsLoggedIn(false)}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {wrongCredentialsLogged && !isFieldsEmpty && (
                                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Login Unsuccessful</h5>
                                                    <button type="button" className="close close-btn-modal" data-dismiss="modal" aria-label="Close" onClick={() => setIsWrongCredentialsLogged(false)}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>Your Email or Password is Incorrect. Retry</p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => setIsWrongCredentialsLogged(false)}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {isBtnPressed && isFieldsEmpty &&(
                                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Empty Credentials</h5>
                                                    <button type="button" className="close close-btn-modal" data-dismiss="modal" aria-label="Close" onClick={() => setIsBtnPressed(false)}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>Fields are empty, please fill first to login.</p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => setIsBtnPressed(false)}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login