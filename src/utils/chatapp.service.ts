import chatapp from './chatapp.config'
import { collection, addDoc } from 'firebase/firestore'
import { doc, updateDoc } from 'firebase/firestore'
export const addDocument = async (collectionPath: string, data: any) => {
  const db = chatapp.firestore
  const query = collection(db, collectionPath)
  await addDoc(query, { ...data, createAt: new Date() })
}

export const updateDocument = async (collectionPath: string, docId: string, data: any) => {
  const db = chatapp.firestore
  const documentRef = doc(db, collectionPath, docId)
  await updateDoc(documentRef, { ...data, updateAt: new Date() })
}