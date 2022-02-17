import React from "react";
import axios from "axios";
import {Formik} from "formik"
import * as Yup from "yup";
import {Link, Stack, TextField, Typography, Box} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {baseUrl, clientId, clientSecret} from "../constants";
import {useNavigate} from "@reach/router";

// Title
// Email
// Password Inputs


const Login = (props, {...others}) => {
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();
	
	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				backgroundColor: "#FFFFFF",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column"
			}}
		>
			<Typography variant={"h4"}>Welcome back !</Typography>
			<span>Please fill in the form to gain access</span>
			<Formik
				initialValues={{
					email: "",
					password: "",
					submit: null
				}}
				
				validationSchema={Yup.object().shape({
					email: Yup.string().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Email is not valid').required('Email is required'),
					password: Yup.string().required('Password is required')
				})}
				
				onSubmit={(values) => {
					setLoading(true);
					
					const {email, password} = values;
					
					const data = JSON.stringify({
						"login": email,
						"password": password,
						"grant_type": "password",
						"client_id": clientId,
						"client_secret": clientSecret
					});
					
					var config = {
						method: 'post',
						url: `${baseUrl}/oauth/token`,
						headers: {
							'Content-Type': 'application/json'
						},
						data : data
					};
					
					axios(config)
						.then((response) => {
							localStorage.setItem("tokens", JSON.stringify(response.data));
							navigate("/home");
							
						})
						.catch((e) => {
							const message = e.error === "invalid_grant" ? "Incorrect Email / Password" : "Something Went Wrong Please Try Again"
							alert(message);
						})
						.finally(() => {
							setLoading(false);
						})
					;
				}}
			>
				{({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
					<form noValidate onSubmit={handleSubmit} {...others} >
						<Box
							sx={{
								width: 300,
								height: 300,
							}}
						>
							<Stack mt={8} spacing={4} style={{width: "100%"}}>
								<TextField
									id="email"
									label="Email"
									variant="outlined"
									size={"small"}
									value={values.email}
									onChange={handleChange} />
								<TextField
									id="password"
									label="Password"
									variant="outlined"
									size={"small"}
									type="password"
									value={values.password}
									onChange={handleChange}
								/>
								<LoadingButton variant="contained" loading={loading} loadingPosition={"start"} disableElevation type={"submit"}>Sign In</LoadingButton>
							</Stack>
						</Box>
					</form>
				)}
			</Formik>
			
			<Link href={"/register"}>
				<span>I don't have an account</span>
			</Link>
		</div>
	);
}

export default Login;
