import axios from "axios";
import { useState } from "react";
import { Timeout } from "../components/Timeout";

export const Home = () =>{
	const [location, setLocation] = useState('')
	if (window.navigator.geolocation) {
		// Geolocation available
		const successfulLookup = async (position: any) => {
			const { latitude, longitude } = position.coords;

			await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=62de7dce494f458faaed5d9b0236e22d`)
				.then(response => {
					const results = response.data.results
					setLocation(results[0].formatted)
				})
		}

		 window.navigator.geolocation.getCurrentPosition(successfulLookup, console.log);
	 } 
	 return <div>
		<h1>Home Page</h1>
		{location && <h3>Location: {location}</h3>}
		<br />
		<Timeout />
	 </div>
}