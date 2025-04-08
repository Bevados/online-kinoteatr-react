import { ApolloServer } from 'apollo-server'
import { initializeFirebase } from './firebase'
import { typeDefs, resolvers } from './graphql/index'

// Инициализация Firebase
initializeFirebase()

// Создание сервера
const server = new ApolloServer({ typeDefs, resolvers })

server
	.listen()
	.then(({ url }) => {
		console.log(`🚀 Сервер запущен на ${url}`)
	})
	.catch(error => {
		console.error('Ошибка запуска сервера:', error)
	})
