import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBrYvFVVx3s2rZ6LQef8UaIQK1qEmkP7XQ',
  authDomain: 'email-poc-40fad.firebaseapp.com',
  projectId: 'email-poc-40fad',
  storageBucket: 'email-poc-40fad.appspot.com',
  messagingSenderId: '498639041648',
  appId: '1:498639041648:web:59068b29b8298742d330b5'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();
