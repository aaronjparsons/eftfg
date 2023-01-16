import { initializeApp  } from 'firebase/app';
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged  } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.GRIDSOME_FIREBASE_API_KEY,
    authDomain: "eftfg-f1ce4.firebaseapp.com",
    databaseURL: "https://eftfg-f1ce4.firebaseio.com",
    projectId: "eftfg-f1ce4",
    storageBucket: "eftfg-f1ce4.appspot.com",
    messagingSenderId: "311034622061",
    appId: "1:311034622061:web:206f21fca935c3a3d20f64",
    measurementId: "G-794QFM8LV2"
};

export let app;
export let auth;

export const setupFirebase = (store) => {
    app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    try {
        if (isSupported()) {
            const analytics = getAnalytics(app);
        }
    } catch {
        console.log('analytics not supported')
    }

    auth = getAuth();
    signInAnonymously(auth)
        .then(() => {
            const lfgCountRef = ref(db, '/lfg');
            onValue(lfgCountRef, (snapshot) => {
                const data = snapshot.val();
                store.dispatch('setLfgEntries', data)
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
    });
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            store.dispatch('setCurrentUser', user);
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}