import { createSlice } from '@reduxjs/toolkit'

interface IState {
	user: { login: string; password: string } | null
	isAuthenticated: boolean
}

function getUserFromLocalStorage() {
	const userData = localStorage.getItem('user')
	return userData ? JSON.parse(userData) : null
}

const initialState: IState = {
	user: getUserFromLocalStorage() || null,
	isAuthenticated: !!localStorage.getItem('user')
}

const authorizationUser = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginUser(state, action) {
			state.user = action.payload
			state.isAuthenticated = true
			localStorage.setItem('user', JSON.stringify(action.payload))
		},
		logOutUser(state) {
			state.user = null
			state.isAuthenticated = false
			localStorage.removeItem('user')
		}
	}
})

export const { loginUser, logOutUser } = authorizationUser.actions
export default authorizationUser.reducer