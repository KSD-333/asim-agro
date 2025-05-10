import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // You'll need to add your API key from Firebase Console
  authDomain: "asim-agro.firebaseapp.com",
  projectId: "asim-agro",
  storageBucket: "asim-agro.appspot.com",
  messagingSenderId: "106769962291022610335",
  appId: "1:106769962291022610335:web:YOUR_APP_ID" // You'll need to add this from Firebase Console
};

// Initialize Firebase only if it hasn't been initialized already
let app: FirebaseApp;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } else {
    app = getApps()[0];
    console.log('Using existing Firebase app');
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Create a mock app for development
  app = {
    name: '[DEFAULT]',
    options: {},
    automaticDataCollectionEnabled: false,
    delete: async () => {},
  } as FirebaseApp;
}

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;