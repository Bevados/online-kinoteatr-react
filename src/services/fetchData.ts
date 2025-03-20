import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

import { MoviesSerials } from '../types'

export const fetchMovies = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'movies'))
		if (querySnapshot.empty) {
			throw new Error('Фильмы не найдены')
		}
		const movies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MoviesSerials))
		return movies
	} catch (error) {
		console.error('Ошибка загрузки фильмов:', error)
		if (error instanceof Error) {
			throw error
		} else {
			throw new Error('Неизвестная ошибка при загрузке фильмов')
		}
	}
}

export const fetchSerials = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'serials'))
		if (querySnapshot.empty) {
			throw new Error('Сериалы не найдены')
		}
		const serials = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MoviesSerials))
		return serials
	} catch (error) {
		console.error('Ошибка загрузки сериалов:', error)
		if (error instanceof Error) {
			throw error
		} else {
			throw new Error('Неизвестная ошибка при загрузке сериалов')
		}
	}
}
