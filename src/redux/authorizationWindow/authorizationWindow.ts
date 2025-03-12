// При нажатии на кнопку Sign In показываю окно авторизации

import { createSlice } from '@reduxjs/toolkit'

interface IState {
	isOpen: boolean
}

const initialState: IState = {
	isOpen: false
}

const authorizationWindow = createSlice({
	name: 'authorizationWindow',
	initialState,
	reducers: {
		showComponent: state => {
			state.isOpen = true
			document.documentElement.style.overflow = 'hidden'
		},
		hideComponent: state => {
			state.isOpen = false
			document.documentElement.style.overflow = ''
		}
	}
})

export const { showComponent, hideComponent } = authorizationWindow.actions
export default authorizationWindow.reducer
