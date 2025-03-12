import { configureStore } from '@reduxjs/toolkit'
import authorizationWindowReducer from './authorizationWindow/authorizationWindow'
import authorizationUserReducer from './authorizationUser/authorizationUser'

const store = configureStore({
	reducer: {
		authorizationWindow: authorizationWindowReducer,
		auth: authorizationUserReducer
	}
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
