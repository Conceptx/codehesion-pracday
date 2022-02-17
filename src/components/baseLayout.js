import React from 'react';
import NavBar from "./navbar";
import {fetchMenus, fetchProfile} from "../repository";

const BaseLayout = ({children}) => {
	
	const [menus, setMenus] = React.useState([]);
	const [profile, setProfile] = React.useState({});
	
	React.useEffect(() => {
		// Get Menus
		fetchMenus()
			.then((data) => setMenus(data))
			.catch(console.error);
		
		// Get Profile
		fetchProfile()
			.then((data) => setProfile(data))
			.catch(console.error);
	}, []);
	
	return (
		<>
			<NavBar menus={menus} profile={profile} />
			<div
				style={{
					background: "#fff",
					padding: 24,
					minHeight: "80vh",
					marginTop: 16,
				}}
			>
				{children}
			</div>
		</>
		
	);
}

export default BaseLayout;
