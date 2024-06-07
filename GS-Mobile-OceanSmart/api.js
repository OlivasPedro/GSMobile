// api.js

import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc } from '@firebase/firestore';
import { db } from './firebaseConfig';

export async function fetchData() {
  try {
    const querySnapshot = await getDocs(collection(db, "pollution_reports"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Erro ao buscar denúncias: ", error);
    return [];
  }
}

export async function fetchCollectionPoints() {
    try {
      const querySnapshot = await getDocs(collection(db, "collection_points"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    } catch (error) {
      console.error("Erro ao buscar pontos de coleta: ", error);
      return [];
    }
  }
  
  export async function addCollectionPoint(point) {
    try {
      const docRef = await addDoc(collection(db, "collection_points"), point);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao adicionar ponto de coleta: ", error);
      return null;
    }
  }
  
  export async function updateCollectionPoint(id, newData) {
    try {
      await updateDoc(doc(db, "collection_points", id), newData);
      return true;
    } catch (error) {
      console.error("Erro ao atualizar ponto de coleta: ", error);
      return false;
    }
  }
  
  export async function deleteCollectionPoint(id) {
    try {
      await deleteDoc(doc(db, "collection_points", id));
      return true;
    } catch (error) {
      console.error("Erro ao excluir ponto de coleta: ", error);
      return false;
    }
  }
