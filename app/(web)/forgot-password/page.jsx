
"use client";
import Preloader from "../../../components/Preloader";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ResetPassword = ({ params }) => {
    const {id}=params;
    
    const [email, setEmail] = useState("");
    const [mounted, setMounted] = useState(false);
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
    const [isLoading,setIsloading]=useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything until the component is mounted
    if (!mounted) {
        return <div style={{ textAlign: "center", marginTop: "50px", height: "100vh", width: "100vw", padding: "100px" }}>Loading...</div>; // or return a loading spinner
    }

    const handleReset = async () => {
        if (!email) {
            alert("Please enter your email.");
            return;
        }

        try {
            setIsloading(true);
            const response = await axios.post(`${SERVER_URL}/api/auth/password-reset`, {email:email
               
                
            });
                 setEmail("");
               
               Swal.fire({title:response.data.message || "Password reset link sent to your email!",icon:"success"});
            

               


    
              
               
               
            }catch (error) {
           
            Swal.fire({title:error?.response?.data?.message || error.message || "Something went wrong. Please try again.",icon:"error"});
            
        }finally{
            setIsloading(false);

        }
    };


    return (
        <>
       
        {isLoading==true?<Preloader/>:
        
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
                // height: "100vh",
                // marginTop: "100px",
                // background: "linear-gradient(grey)",
                marginTop:"30px",
                marginBottom:"30px"
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    textAlign: "center",
                    width: "500px",
                    border: "3px solid #ff7c5b",
                }}
            >
                <h1 style={{ color: "#333", fontSize: "30px", marginBottom: "10px" }}>
                    Forgot Your Password?
                </h1>
                <p
                    style={{
                        color: "#666",
                        fontSize: "14px",
                        marginBottom: "20px",
                    }}
                >
                    Not to worry, we got you! Let’s get you a new password. Please enter
                    your email address.
                </p>

                <label
                    htmlFor="email"
                    style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "5px",
                        textAlign:"center"
                    }}
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                       
                        padding: "10px",
                        marginBottom: "15px",
                        border: "2px solid #ff7c5b",
                        display:"block",
                        fontSize: "14px",
                        marginTop:"10px",
                        marginBottom:"10px",
                      
                    }}
                />

                <button
                    onClick={handleReset}
                    style={{
                        backgroundColor: "#ff7c5b",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "0.3s",
                        width: "100%",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#b30000")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#ff7c5b")}
                    disabled={isLoading}
                >
                    Reset Password
                </button>
            </div>
        </div>
       
       
    }
      </>
    );
}


export default ResetPassword;
