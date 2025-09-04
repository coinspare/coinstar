// firebase-config.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, update, onValue, push, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQDmtOSWi2lfdnhCqfgQrU8s4E-fw3wAA",
    authDomain: "coinspare-95e90.firebaseapp.com",
    projectId: "coinspare-95e90",
    storageBucket: "coinspare-95e90.firebasestorage.app",
    messagingSenderId: "706285247529",
    appId: "1:706285247529:web:b3822f6d9f234147899038",
    measurementId: "G-D81FZP5S6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// Function to generate referral code
function generateReferralCode(firstName) {
    const firstTwoLetters = firstName.substring(0, 2).toUpperCase();
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `CS${firstTwoLetters}${randomDigits}`;
}

// Function to check if user is logged in
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // User is not logged in, redirect to login page
            if (window.location.pathname.includes('dashboard.html') || 
                window.location.pathname.includes('admin.html')) {
                window.location.href = 'login.html';
            }
        } else {
            // Check if user is admin
            if (window.location.pathname.includes('admin.html')) {
                const adminRef = ref(database, 'admins/' + user.uid);
                get(adminRef).then((snapshot) => {
                    if (!snapshot.exists()) {
                        // User is not an admin, redirect to login
                        window.location.href = 'login.html';
                    }
                }).catch((error) => {
                    console.error("Error checking admin status:", error);
                    window.location.href = 'login.html';
                });
            }
        }
    });
}

// Export functions and variables
export {
    app,
    analytics,
    auth,
    database,
    generateReferralCode,
    checkAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    ref,
    set,
    get,
    update,
    onValue,
    push,
    child
};
