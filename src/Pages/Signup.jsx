import React from 'react'
import Navbar from '../Components/Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Signup = () => {

  const [userCred, setUserCred] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmit, setIsSubmit ] = useState(false)
  const submit = () =>{
    setIsSubmit(true)
    let userEmail = document.getElementById('form3Example3c').value;
    let userPassword = document.getElementById('form3Example4c').value;
    setUserCred({userEmail: userEmail, userPassword:userPassword})
  }

  useEffect(() => {
    console.log(userCred);
    axios.post("http://localhost:8080/userData",userCred).then((response) =>{if(response.status == 201) setIsSuccess(true)});
  }, [userCred])
  
  // useEffect(()=>{
  //   axios.get("http://localhost:8080/userData").then(res=>console.log(res));
  // })

  return (
   <>
   <Navbar/>
      <section className="vh-80" >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center" style={{ margin: "20vh 0 0 0" }}>
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{borderRadius: "25px"}}>
                <div className="card-body p-md-5" style={{ boxShadow: "0 0 10px 5px rgba(0,0,0,0.1)" }}>
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>


                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" onClick={()=> submit()}>Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
                </div>
                {isSuccess && isSubmit &&(
                  <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Registered Successfully</h5>
                          <button type="button" className="close close-btn-modal" data-dismiss="modal" aria-label="Close" onClick={() => setIsSuccess(false)}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <p>Your Credentials are saved with us</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => setIsSuccess(false)}>Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section></>
  )
}

export default Signup