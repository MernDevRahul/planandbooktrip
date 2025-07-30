"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    password2: "",
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGoogleSignup = () => {
 
    window.location.href = `${SERVER_URL}/api/auth/google`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data={firstName:formData.fname,lastName:formData.lname,email:formData.email,password:formData.password};

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      
   
    
      if (response.status === 201) {

        Swal.fire({icon:"sucess",text:response.data.message || "User Registerd Successfully"});
        setFormData(  { fname: "",
          lname: "",
          email: "",
          password: "",
          password2: "",
          termsAccepted: false,

         });
        // Handle successful response
      } else if(response.status==200) {
        // Handle error response
 ;
        Swal.fire({icon:"info",text:response.data.message || "User Registerd Successfully"});
      }
    } catch (error) {
      Swal.fire({icon:"error",text:response?.data?.message || "Login failed"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="register-section sec-pad">
        <div className="anim-icon">
          <div
            className="icon anim-icon-1"
            style={{ backgroundImage: "url(assets/images/shape/shape-16.png)" }}
          ></div>
          <div
            className="icon anim-icon-2"
            style={{ backgroundImage: "url(assets/images/shape/shape-17.png)" }}
          ></div>
        </div>
        <div className="auto-container">
          <div className="inner-box">
            <div className="sec-title centred">
              <p>Sign Up</p>
              <h2>Connect with us for Better Tour</h2>
            </div>
            <div className="form-inner">
              <h3>Sign Up with</h3>
              <ul className="social-links clearfix">
                {/* <li>
                  <Link href="signup">
                    <span>Sign In with Facebook</span>
                    <i>
                      <svg
                        version="1.1"
                        fill="#ff0000"
                        id="fi_20837"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 155.139 155.139"
                        style={{ enableBackground: "new 0 0 155.139 155.139" }}
                      >
                        <g>
                          <path
                            id="f_1_"
                            fill="#010002"
                            d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184
         c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452
         v20.341H37.29v27.585h23.814v70.761H89.584z"
                          ></path>
                        </g>
                      </svg>
                    </i>
                  </Link>
                </li> */}
                <li onClick={handleGoogleSignup}>
                  <Link href="">
                    <span>Sign Up with Google</span>

                    <i>
                      <svg
                        version="1.1"
                        id="fi_300221"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style={{ enableBackground: "new 0 0 512 512" }}
                      >
                        <path
                          style={{ fill: "#167EE6" }}
                          d="M492.668,211.489l-208.84-0.01c-9.222,0-16.697,7.474-16.697,16.696v66.715
    c0,9.22,7.475,16.696,16.696,16.696h117.606c-12.878,33.421-36.914,61.41-67.58,79.194L384,477.589
    c80.442-46.523,128-128.152,128-219.53c0-13.011-0.959-22.312-2.877-32.785C507.665,217.317,500.757,211.489,492.668,211.489z"
                        ></path>
                        <path
                          style={{ fill: "#12B347" }}
                          d="M256,411.826c-57.554,0-107.798-31.446-134.783-77.979l-86.806,50.034
    C78.586,460.443,161.34,512,256,512c46.437,0,90.254-12.503,128-34.292v-0.119l-50.147-86.81
    C310.915,404.083,284.371,411.826,256,411.826z"
                        ></path>
                        <path
                          style={{ fill: "#0F993E" }}
                          d="M384,477.708v-0.119l-50.147-86.81c-22.938,13.303-49.48,21.047-77.853,21.047V512
    C302.437,512,346.256,499.497,384,477.708z"
                        ></path>
                        <path
                          style={{ fill: "#FFD500" }}
                          d="M100.174,256c0-28.369,7.742-54.91,21.043-77.847l-86.806-50.034C12.502,165.746,0,209.444,0,256
    s12.502,90.254,34.411,127.881l86.806-50.034C107.916,310.91,100.174,284.369,100.174,256z"
                        ></path>
                        <path
                          style={{ fill: "#FF4B26" }}
                          d="M256,100.174c37.531,0,72.005,13.336,98.932,35.519c6.643,5.472,16.298,5.077,22.383-1.008
    l47.27-47.27c6.904-6.904,6.412-18.205-0.963-24.603C378.507,23.673,319.807,0,256,0C161.34,0,78.586,51.557,34.411,128.119
    l86.806,50.034C148.202,131.62,198.446,100.174,256,100.174z"
                        ></path>
                        <path
                          style={{ fill: "#D93F21" }}
                          d="M354.932,135.693c6.643,5.472,16.299,5.077,22.383-1.008l47.27-47.27
    c6.903-6.904,6.411-18.205-0.963-24.603C378.507,23.672,319.807,0,256,0v100.174C293.53,100.174,328.005,113.51,354.932,135.693z"
                        ></path>
                      </svg>
                    </i>
                  </Link>
                </li>
                {/* <li>
                  <Link href="signup">
                    <span>Sign In with Twitter</span>
                    <i>
                      <svg
                        id="fi_5968958"
                        enableBackground="new 0 0 1226.37 1226.37"
                        viewBox="0 0 1226.37 1226.37"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m727.348 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z"></path>
                      </svg>
                    </i>
                  </Link>
                </li> */}
              </ul>
              <div className="text">
                <span>or</span>
              </div>
              <form onSubmit={handleSubmit} className="register-form">
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 col-sm-12 column">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 column">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group">
                      <div className="custom-check-box">
                        <div className="custom-controls-stacked">
                          <label className="custom-control material-checkbox">
                            <input
                              type="checkbox"
                              className="material-control-input"
                              name="termsAccepted"
                              checked={formData.termsAccepted}
                              onChange={handleChange}
                            />
                            <span className="material-control-indicator"></span>
                            <span className="description">
                              I accept{" "}
                              <Link href="/terms-and-conditions">terms</Link> and{" "}
                              <Link href="privacy-policy">conditions</Link>{" "}
                              and general policy
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 column"
                    style={{ textAlign: "center" }}
                  >
                    <div className="form-group message-btn">
                      <button
                        type="submit"
                        className="theme-btn"
                        disabled={loading}
                      >
                        {loading ? "Signing Up..." : "Sign Up"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="other-text" style={{ textAlign: "center" }}>
                Already have an account? <Link href="/sign-in">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
