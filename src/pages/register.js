import React from "react";
import axios from "axios";
import {Formik} from "formik"
import * as Yup from "yup";
import {Stack, TextField, Typography, Box, Link} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {baseUrl} from "../constants";
import {useNavigate} from "@reach/router";

// Title
// Email
// First Name
// Surname
// Mobile
// Password Inputs


const Register = (props, {...others}) => {
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
			<Typography variant={"h4"}>Register</Typography>
			<span>Please fill in the form to create your profile</span>
			<Formik
				initialValues={{
					email: "",
					mobile: "",
					password: "",
					first_name: "",
					surname: "",
					accepted_tac: true,
					submit: null
				}}
				
				validationSchema={Yup.object().shape({
					email: Yup.string().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Email is not valid').required('Email is required'),
					password: Yup.string().required('Password is required'),
					mobile: Yup.string().min(10).max(10).required('Mobile number is required'),
					first_name: Yup.string().required('First name is required'),
					surname: Yup.string().required('Surname is required')
				})}
				
				onSubmit={(values) => {
					setLoading(true);
					
					const {email, mobile, password, first_name, surname, accepted_tac} = values;
					
					const data = JSON.stringify({
						profile: {
							email,
							mobile,
							password,
							first_name,
							surname,
							accepted_tac
						}
					});
					
					const config = {
						method: 'post',
						url: `${baseUrl}/profiles/`,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json'
						},
						data : data
					};
					
					axios(config)
						.then((response) => {
							console.log(response.data);
							navigate("/login");
						})
						.catch((error) => {
							console.log(error)
							alert("Failed To Create Your Profile");
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
								mb: 6
							}}
						>
							<Stack mt={4} spacing={4} style={{width: "100%"}}>
								<TextField
									id="first_name"
									label="First Name"
									variant="outlined"
									size={"small"}
									value={values.first_name}
									onChange={handleChange} />
								
								<TextField
									id="surname"
									label="Surname"
									variant="outlined"
									size={"small"}
									value={values.surname}
									onChange={handleChange} />
								
								<TextField
									id="email"
									label="Email"
									variant="outlined"
									size={"small"}
									value={values.email}
									onChange={handleChange} />
								
								<TextField
									id="mobile"
									label="Mobile"
									variant="outlined"
									size={"small"}
									value={values.mobile}
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
								<LoadingButton variant="contained" loading={loading} loadingPosition={"start"} disableElevation type={"submit"}>Sign Up</LoadingButton>
							</Stack>
						</Box>
					</form>
				)}
			</Formik>
			
			<Link href={"/login"}>
				<span>I already have an account</span>
			</Link>
		</div>
	);
}

export default Register;
