import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD8oL9v1Y5vKn3fZ9kX8pQ2wR7tY6uI5oM",
  authDomain: "larenegade-4137.firebaseapp.com",
  databaseURL: "https://larenegade-4137-default-rtdb.firebaseio.com",
  projectId: "larenegade-4137",
  storageBucket: "larenegade-4137.appspot.com",
  messagingSenderId: "1036840278918",
  appId: "1:1036840278918:web:7d8f5c9e2a1b3d4e5f6g7h"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
