import { useRef, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUser } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setMessage] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setMessage("");
  }, [user, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = await login({ user, password }).unwrap();
      dispatch(loginUser({ ...userData, user }));
      setUser("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      if (!err?.originalStatus) {
        errMessage("No Server Response");
      } else if (err.originalStatus === 400) {
        errMessage("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        errMessage("Unauthorized");
      } else {
        errMessage("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  return <div>Login</div>;
};

export default Login;
