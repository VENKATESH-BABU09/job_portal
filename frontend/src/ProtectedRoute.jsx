import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken";
// import axios from 'axios';

import { api } from "../api/api.js";

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Useeffect");
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    if (!token) {
      navigate("/login");
      setIsLoading(false);
      return;
    }

    // const decodedToken = jwt.decode(token);
    // const userRole = decodedToken.role;

    // console.log(userRole);

    // Validate token on the server
    // const validateTokenUrl = '/'; // Replace with your actual API endpoint
    api
      .get("/", {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        // console.log(response.data.isValid)
        // console.log(allowedRoles[0] === response.data.role);
        if (response.data.isValid && allowedRoles[0] === response.data.role) {
          // console.log("Authorized")
          setIsAuthorized(true);
        } else {
          navigate("/login");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to validate token:", error);
        navigate("/login");
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : isAuthorized ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
