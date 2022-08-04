import axios from 'axios'
import { UserData } from '../types/types';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	config.baseURL = 'https://reqres.in/api'

	const userRawData = localStorage.getItem('userData')
	const userData: UserData | undefined = userRawData ? JSON.parse(userRawData) : userRawData

	if(userData) {
		config.headers.Authorization = `Bearer ${userData.token}`
	}

	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response;
}, function (error) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
	return Promise.reject(error);
});

export default axios