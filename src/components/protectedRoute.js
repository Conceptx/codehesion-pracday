import React from "react";
import {Redirect} from "@reach/router";

const ProtectedRoute = ({component: Component, ...others}) => (
	localStorage.getItem('tokens') ? <Component {...others} /> : <Redirect from="" to="/login" noThrow />
);

export default ProtectedRoute;
