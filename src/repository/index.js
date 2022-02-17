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
		
		const response = await axios(config);
		resolve(response.data);
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
		
		const response = await axios(config);
		resolve(response.data);
	} catch (error) {
		reject(error);
	}
})

export const fetchNews = () => new Promise(async (resolve, reject) => {
	try {
		const accessToken = fetchAccessToken();
		
		const config = {
			method: 'get',
			url: `${baseUrl}/api/v1/news/local_news`,
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		};
		
		const response = await axios(config);
		resolve(response.data);
	} catch (error) {
		reject(error);
	}
})

export const fetchRates = () => new Promise(async (resolve, reject) => {
	try {
		const accessToken = fetchAccessToken();
		
		const config = {
			method: 'get',
			url: `${baseUrl}/api/v1/currency`,
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		};
		
		const response = await axios(config);
		resolve(response.data);
	} catch (error) {
		reject(error);
	}
})

