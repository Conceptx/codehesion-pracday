import axios from "axios";
import {baseUrl} from "../constants";

const fetchAccessToken = () => {
	const tokens = localStorage.getItem("tokens");
	const {access_token} = JSON.parse(tokens);
	
	return access_token;
}

export const fetchMenus = () => new Promise(async (resolve, reject) => {
	try {
		const accessToken = fetchAccessToken();
		
		const config = {
			method: 'get',
			url: `${baseUrl}/api/v1/menus`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			}
		};
		
		const data = await axios(config);
		resolve(data.data);
	} catch (error) {
		reject(error);
	}
})

export const fetchProfile = () => new Promise(async (resolve, reject) => {
	try {
		const accessToken = fetchAccessToken();
		
		var config = {
			method: 'get',
			url: `${baseUrl}/api/v1/profiles`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			}
		};
		
		const data = await axios(config);
		resolve(data.data);
	} catch (error) {
		reject(error);
	}
})

