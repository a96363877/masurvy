import {
    collection,
    addDoc,
    serverTimestamp,
    setDoc,
    doc,
    getFirestore,
  } from "firebase/firestore";
  import { initializeApp } from "firebase/app";
  import { getDatabase } from "firebase/database";
  
  const firebaseConfig = {
    apiKey: "AIzaSyCUweKAfXJMW10BvzllQApSl41onSFoT80",
  authDomain: "msa22-aa2e4.firebaseapp.com",
  projectId: "msa22-aa2e4",
  storageBucket: "msa22-aa2e4.firebasestorage.app",
  messagingSenderId: "919911184061",
  appId: "1:919911184061:web:8f46fe98dc2a421db5e9d4",
  measurementId: "G-TWNKTN8W34"
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const datatabas = getDatabase(app);
  
  interface VisitorData {
    civilId: string;
    timestamp: any;
    userAgent: string;
    violations?: any[];
  }
  
  export async function logVisitor(civilId: string): Promise<string> {
    try {
      const visitorRef = await addDoc(collection(db, "visitors"), {
        civilId,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      } as VisitorData);
  
      return visitorRef.id;
    } catch (error) {
      console.error("Error logging visitor:", error);
      throw error;
    }
  }
  
  export async function addData(data: any) {
    const country = localStorage.getItem('country')
    let id = ''
  
    if (data.id) {
      localStorage.setItem("visitor", data.id);
      id = data.id
    } else {
      id = localStorage.getItem('visitor')!
    }
    try {
      const docRef = await doc(db, "pays", data.id!);
      await setDoc(
        docRef,
        {
          ...data,
          createdDate: new Date().toISOString()
        },
        { merge: true }
      );
  
      console.log("Document written with ID: ", docRef.id);
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e);
      // You might want to show an error message to the user here
    }
  }
