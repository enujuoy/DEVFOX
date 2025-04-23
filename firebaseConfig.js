firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Firestore 추가
import { getAnalytics } from "firebase/analytics";  // Analytics도 사용할 경우 임포트

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzhmOzjCPMZyD3NGBkAghTE_0UP48UXu0",
  authDomain: "serviceareapj.firebaseapp.com",
  projectId: "serviceareapj",
  storageBucket: "serviceareapj.firebasestorage.app",
  messagingSenderId: "823042081954",
  appId: "1:823042081954:web:8b03bf265b63cb08ea03fb",
  measurementId: "G-ZS325V93N9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Firestore 초기화

export { db };  // db를 다른 파일에서 사용할 수 있도록 export
