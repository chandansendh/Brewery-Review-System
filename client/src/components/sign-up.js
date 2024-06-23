import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function SignUp(){
    const [signUpData, setSignUpData]= useState({
        username:"",
        email:"",
        phone:"",
        password:""
    });
    const naviget = useNavigate()
    const {storeTokenInLS} = useAuth();

    const handleInput=(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setSignUpData({...signUpData,[name]:value});
      // console.log(name)
    }

    const handleSignUp= async(e)=>{
      e.preventDefault();
      console.log(signUpData);
      try {
        const responce = await fetch(
          "https://brewery-server.onrender.com/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpData),
          }
        );
        const r_msg= await responce.json();
        console.log(r_msg);
        if(responce.ok){
          setSignUpData({
            username: "",
            email: "",
            phone: "",
            password: "",
          });
          toast.success(r_msg.message);
          storeTokenInLS(r_msg.token);
          naviget("/home");
        }else{
          toast.error(r_msg.message);
        }
      } catch (error) {
        console.log("register",error)
      }
    }
    return (
      <>
        <div className="contact">
        <section className="container forms">
          <div className="form signup">
            <div className="form-content">
              <header>Signup</header>
              <form onSubmit={handleSignUp}>
                <div className="field input-field">
                  <input
                    type="username"
                    name="username"
                    placeholder="User Name"
                    className="input"
                    onChange={handleInput}
                    value={signUpData.username}
                  />
                </div>
                <div className="field input-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input"
                    onChange={handleInput}
                    value={signUpData.email}
                  />
                </div>

                <div className="field input-field">
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    className="phone"
                    onChange={handleInput}
                    value={signUpData.phone}
                  />
                </div>

                <div className="field input-field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    className="password"
                    onChange={handleInput}
                    value={signUpData.password}
                  />
                  <i className="bx bx-hide eye-icon"></i>
                </div>

                <div className="field button-field">
                  <button type="submit">Signup</button>
                </div>
              </form>

              <div className="form-link">
                <span>
                  Already have an account?{" "}
                  <NavLink to="/" className="link login-link">
                    Login
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </section>
          </div>
      </>
    );
}