import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider , signInWithPopup} from 'firebase/auth'

const chatappConfig = {
  apiKey: import.meta.env.VITE_CHAT_APP_API_KEY,
  authDomain: import.meta.env.VITE_CHAT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_CHAT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_CHAT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_CHAT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_CHAT_APP_APP_ID,
  measurementId: import.meta.env.VITE_CHAT_APP_MEASUREMENT_ID
}
const app = initializeApp(chatappConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const analytics = getAnalytics(app)
const imageDB = getStorage(app)
const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')
const chatapp = {
  app,
  firestore,
  analytics,
  imageDB,
  auth,
  googleProvider,
  signInWithPopup
}
firestore.app.automaticDataCollectionEnabled = true
if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(firestore, 'localhost', 2707)
}
export default chatapp
