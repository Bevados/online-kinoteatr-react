// import admin, { ServiceAccount } from 'firebase-admin'
// import path from 'path'
// import fs from 'fs'

// // Путь к файлу ключей (относительно текущего файла)
// const serviceAccountPath = path.resolve(__dirname, 'serviceAccountKey.json')

// export const initializeFirebase = () => {
// 	try {
// 		console.log('Проверяем существование файла:', serviceAccountPath)

// 		if (!fs.existsSync(serviceAccountPath)) {
// 			throw new Error(`Файл с ключом не найден по пути: ${serviceAccountPath}`)
// 		}

// 		const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8')) as ServiceAccount

// 		if (admin.apps.length === 0) {
// 			admin.initializeApp({
// 				credential: admin.credential.cert(serviceAccount)
// 			})
// 			console.log('Firebase успешно инициализирован')
// 		}
// 	} catch (error) {
// 		console.error('Ошибка инициализации Firebase:', error)
// 		process.exit(1)
// 	}
// }

import admin, { ServiceAccount } from 'firebase-admin'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config() // Загружаем переменные окружения из .env

// Получаем путь к файлу ключа из переменной окружения
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS

export const initializeFirebase = () => {
	if (!serviceAccountPath) {
		throw new Error('Переменная GOOGLE_APPLICATION_CREDENTIALS не установлена')
	}

	// Разрешаем путь относительно корня проекта
	const absoluteServiceAccountPath = path.resolve(process.cwd(), serviceAccountPath)

	// Проверка на существование файла
	if (!fs.existsSync(absoluteServiceAccountPath)) {
		throw new Error(`Файл с ключом не найден по пути: ${absoluteServiceAccountPath}`)
	}

	// Чтение и парсинг JSON файла с ключом
	const serviceAccount = JSON.parse(fs.readFileSync(absoluteServiceAccountPath, 'utf8')) as ServiceAccount

	if (admin.apps.length === 0) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount)
		})
		console.log('Firebase успешно инициализирован')
	} else {
		console.log('Firebase уже инициализирован')
	}
}
