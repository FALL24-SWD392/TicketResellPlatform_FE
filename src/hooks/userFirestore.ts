import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import chatapp from 'src/utils/chatapp.config'
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export interface Condition {
  field: string
  operator: firebase.firestore.WhereFilterOp
  value: string | number
}
const useFirestore = (collectionPath: string, condition?: Condition) => {
  const [document, setDocument] = useState<any[]>([])
  useEffect(() => {
    const db = chatapp.firestore
    let collectionRef = query(collection(db, collectionPath), orderBy('createAt', 'desc'))
    if (condition) {
      if (condition) collectionRef = query(collectionRef, where(condition.field, condition.operator, condition.value))
    }
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      setDocument(data)
    })

    return () => unsubscribe()
  }, [collectionPath, condition])
  return document;
}

export default useFirestore
