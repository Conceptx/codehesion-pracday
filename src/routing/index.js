import React from "react";
import {Redirect, Router} from "@reach/router";
import Login from "../pages/login";
import ProtectedRoute from "../components/protectedRoute";
import Register from "../pages/register";
import BaseLayout from "../components/baseLayout";
import Home from "../pages/home";
import ItemDetail from "../pages/itemDetail";
import SectionDetail from "../pages/sectionDetail";
import CurrencyDetail from "../pages/currencyDetail";

const Routing = () => {
	return (
		<Router>
			<Login path={"/login"} />
			<Register path={"/register"} />
			<BaseLayout path={"/layout"} />
			<Redirect from="/" to="/login" noThrow />
			<ProtectedRoute component={BaseLayout} path={"/home"}>
				<Home path={"/"} />
				<ItemDetail path={"/:name"} />
				<SectionDetail path={"/:name/section"} />
				<CurrencyDetail path={"/rates"} />
			</ProtectedRoute>
		</Router>
	);
}

export default Routing;
