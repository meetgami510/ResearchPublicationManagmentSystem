import "../styles/Login.css";
import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input, message } from "antd";
import { userAll } from "../redux/features/userSlice";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Login = ({ setCookies }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    //console.log(user);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      //console.log(e);
      console.log("fdfd");
      console.log(user);
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        user
      );

      dispatch(hideLoading());

      console.log(res.data.message);

      if (res.data.success) {
        console.log(res.data.token);
        setCookies("token", res.data.token);

        toast.success("" + res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
      } else {
        dispatch(hideLoading());
        toast.error("" + res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Incurrect data", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    // <div className="form-container">
    //   <form layout="vertical" onSubmit={onSubmit} className="register-form">
    //     <h3 className="text-center">Login From</h3>
    //     <Form.Item label="Enter Your Email: " className="form-outline mb-4">
    //       <Input
    //         type="email"
    //         name="email"
    //         value={user.email}
    //         onChange={handleChange}
    //         required
    //       />
    //     </Form.Item>
    //     <Form.Item label="Enter Your Password : ">
    //       <Input
    //         type="password"
    //         name="password"
    //         value={user.password}
    //         onChange={handleChange}  
    //         required
    //       />
    //     </Form.Item>
    //     <Link to="/register" className="m-2">
    //       Not a User Register here
    //     </Link>
    //     <button className="btn btn-primary" type="submit">
    //       Login
    //     </button>
    //   </form>
    // </div>
    <>
    <div className="login-root">
        <div className="box-root flex-flex flex-direction--column" style={{ minHeight: "100vh", flexGrow: 1 }}>
            <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1, zIndex: 9 }}>
                <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                    <h1><a>Login to your account</a></h1>
                </div>
                <div className="formbg-outer">
                    <div className="formbg">
                        <div className="formbg-inner padding-horizontal--48">
                             {/* <span className="padding-bottom--15">Sign in to your account</span>  */}
                            <form id="stripe-login" onSubmit={onSubmit}>
                                <div className="field padding-bottom--24">
                                    <label for="email">Email</label>
                                    <input type="email" name="email"  value={user.email} onChange={handleChange} required/>
                                </div>
                                <div className="field padding-bottom--24">
                                    <div className="grid--50-50">
                                        <label for="password">Password</label>
                                        <div className="reset-pass">
                                            <a href="#">Forgot your password?</a>
                                        </div>
                                    </div>
                                    <input type="password" name="password" value={user.password} onChange={handleChange} required/>
                                </div>
                                <div className="field padding-bottom--24">
                                    <input type="submit" name="submit" value="LOGIN"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="footer-link padding-top--24">
                        <span>Don't have an account? <a href="/register">Sign up</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Login;
