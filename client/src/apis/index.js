import axios from 'axios';
const API_PATH = 'http://localhost:4000';

export const getItemList = async (status) => {
	try {
		const response = await axios.get(`${API_PATH}/v1/items/list/${status}`, {
			withCredentials: true
		});
		return response.data.data;
	} catch (error) {
		return {
			error: true,
			data: error.response.data,
			status: error.response.status
		};
	}
};

export const getItem = async (handler, field) => {
	try {
		const response = await axios.get(
			`${API_PATH}/v1/item/${handler}${field ? '/' + field : ''}`,
			{
				withCredentials: true
			}
		);
		return response.data.data;
	} catch (error) {
		return {
			error: true,
			data: error.response.data,
			status: error.response.status
		};
	}
};

export const postBid = async (itemId, fields) => {
	try {
		const response = await axios.post(
			`${API_PATH}/v1/bid/post`,
			{
				itemId,
				fields
			},
			{ withCredentials: true }
		);
		return response.data.ok;
	} catch (error) {
		return {
			error: true,
			data: error.response.data,
			status: error.response.status
		};
	}
};

export const enableAutoBid = async (itemId, fields) => {
	try {
		const response = await axios.post(
			`${API_PATH}/v1/bid/enable-auto-bid`,
			{
				itemId,
				fields
			},
			{ withCredentials: true }
		);
		return response.data.ok;
	} catch (error) {
		return {
			error: true,
			data: error.response.data,
			status: error.response.status
		};
	}
};

export const getBidList = async () => {
	try {
		const response = await axios.get(`${API_PATH}/v1/bid/list`, {
			withCredentials: true
		});
		return response.data.data;
	} catch (error) {
		return {
			error: true,
			data: error.response.data,
			status: error.response.status
		};
	}
};

export const login = async (email, password) => {
	try {
		const response = await axios.post(
			`${API_PATH}/v1/login`,
			{
				email,
				password
			},
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		return {
			error: true,
			data: error.response.data,
			status: error.response.status
		};
	}
};

export const getLogin = async () => {
	try {
		const response = await axios.get(`${API_PATH}/v1/login`, {
			withCredentials: true
		});
		return response.data.data;
	} catch (error) {
		return {
			error: true,
			data: error.response.data,
			status: error.response.status
		};
	}
};
