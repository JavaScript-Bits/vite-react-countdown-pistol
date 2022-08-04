import { useNavigate } from "react-router-dom"
import { UserData } from "../types/types"

export default function useGetUser () {
	const userRawData = localStorage.getItem('userData')
	let userData: UserData | undefined = userRawData ? JSON.parse(userRawData) : userRawData

	const navigate = useNavigate()

	const setUserData = (data: UserData) => localStorage.setItem('userData', JSON.stringify(data))

	const logout = () => {
		localStorage.removeItem('userData')
		userData = undefined
		navigate('/login')
	}

	const isLoggedIn = Boolean(userData)

	return {
		userData,
		isLoggedIn,
		setUserData,
		logout
	}
}