// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: `${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`,
	authDomain: `${process.env.EXPO_PUBLIC_AUTH_DOMAIN}`,
	projectId: `${process.env.EXPO_PUBLIC_PROJECT_ID}`,
	storageBucket: `${process.env.EXPO_PUBLIC_STORAGE_BUCKET}`,
	messagingSenderId: `${process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID}`,
	appId: `${process.env.EXPO_PUBLIC_APP_ID}`,
	measurementId: `${process.env.EXPO_PUBLIC_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.useDeviceLanguage();

export default auth;
