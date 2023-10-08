// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAV1PRX_LgPG90QmsYr26T4mKNK4l-Qoq0',
  authDomain: 'doantotnghiep-ce201.firebaseapp.com',
  projectId: 'doantotnghiep-ce201',
  storageBucket: 'doantotnghiep-ce201.appspot.com',
  messagingSenderId: '384119692766',
  appId: '1:384119692766:web:def67e1890e4dfbc3c114f',
  measurementId: 'G-P6PQ2BJY68',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
