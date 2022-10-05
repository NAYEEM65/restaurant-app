// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAVLzc9kpeZqDLbYUAfNb74E15jXXrrFwo',

    authDomain: 'restaurantapp-nayeem.firebaseapp.com',

    databaseURL: 'https://restaurantapp-nayeem-default-rtdb.asia-southeast1.firebasedatabase.app',

    projectId: 'restaurantapp-nayeem',

    storageBucket: 'restaurantapp-nayeem.appspot.com',

    messagingSenderId: '208828263617',

    appId: '1:208828263617:web:267dee928ffe68d292b840',
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, firestore, storage };
