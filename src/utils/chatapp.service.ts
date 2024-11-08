import chatapp from './chatapp.config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
export const addDocument = async (collectionPath: string, data: any) => {
  const db = chatapp.firestore
  const query = collection(db, collectionPath)
  await addDoc(query, { ...data, createAt: serverTimestamp() })
}
