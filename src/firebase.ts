import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyD93kQWt4lycPQZHj8i75Uez24vYGWNNPs',
	authDomain: 'onair-37e63.firebaseapp.com',
	projectId: 'onair-37e63',
	storageBucket: 'onair-37e63.firebasestorage.app',
	messagingSenderId: '1091250919492',
	appId: '1:1091250919492:web:d4ce24f1795dfdf5bcc411'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

