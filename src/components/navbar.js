import React from "react";
import {
	Box,
	MenuList,
	MenuItem,
	Drawer,
	ListItemText,
	Divider
} from "@mui/material";
import {useNavigate} from "@reach/router";
import {MenuOpen, Menu, Logout, CurrencyExchange} from "@mui/icons-material";
import {iconSize} from "../constants";

const homeMenuItem = {name: "home", description: ""}

const NavBar = ({menus = [], profile = {}}) => {
	const [visible, setVisible] = React.useState(false);
	const navigate = useNavigate();
	
	React.useEffect(() => {
		console.log(menus, profile);
	}, [menus, profile]);
	
	return (
		<>
			<Box px={4} sx={{
				width: "100vw",
				height: 50,
			}} bgcolor={"#000"}>
				{
					visible ? <MenuOpen fontSize="large" color={"primary"} onClick={() => setVisible(false)} /> : <Menu fontSize="large" color={"primary"} onClick={() => setVisible(true)} />
				}
			</Box>
			<Drawer
				anchor={"right"}
				open={visible}
				onClose={() => setVisible(false)}
			>
				<Box width={300} >
					<MenuList ml={0}>
						{
							menus.map((el, index) => (
								<MenuItem
									key={index}
									onClick={() => {
										setVisible(false);
										
										// Set Section To Storage
										localStorage.setItem("sections", JSON.stringify(el.sections))
										
										navigate(`/home/${el.name.toLowerCase()}?description=${el.description}`);
									}}
								>
									<img
										src={`${el.icon_url}`}
										alt={el.name}
										loading="lazy"
										style={{
											width: el.icon_width / 2,
											height: el.icon_height / 2
										}}
									/>
									<ListItemText ml={2}>
										{el.name}
									</ListItemText>
								</MenuItem>
							))
						}
						<MenuItem
							onClick={() => {
								setVisible(false);
								navigate(`/home/rates`);
							}}
						>
							<CurrencyExchange style={{height: iconSize, width: iconSize, marginRight: 8}} />
							<ListItemText>Rates</ListItemText>
						</MenuItem>
					</MenuList>
					
					<Divider />
					<MenuItem
						style={{
							marginTop: 12,
							marginLeft: 8
						}}
						onClick={() => {
							setVisible(false);
							localStorage.removeItem("tokens");
							navigate("/login");
						}}
					>
						<Logout />
						<ListItemText ml={2}>
							Sign Out
						</ListItemText>
					</MenuItem>
				</Box>
			</Drawer>
		</>
	);
}

export default NavBar;
