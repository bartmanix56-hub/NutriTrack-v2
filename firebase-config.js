/**
 * Configuration Firebase unifiée pour NutriTrack
 * Ce fichier centralise toutes les constantes de configuration Firebase
 */

export const firebaseConfig = {
    apiKey: "AIzaSyBkxISTONDblC5MoRQYhaz9IusWg4GNIuY",
    authDomain: "nutritraack.firebaseapp.com",
    projectId: "nutritraack",
    storageBucket: "nutritraack.firebasestorage.app",
    messagingSenderId: "133692710812",
    appId: "1:133692710812:web:4a5937cea6e86c9b25b259"
};

// VAPID Key pour les notifications push FCM
export const vapidKey = "BKfDlWO2smFRGFxj_Rm-z_bnPHxBh0GKF_PqHVcuQfJ5TMlDm9MKPyUgCG5nQzZgXQ8WXIy0JCx5R_-_EXAMPLE";

// Version Firebase SDK
export const firebaseVersion = "10.7.1";

// URLs CDN Firebase
export const firebaseCDN = {
    app: `https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-app.js`,
    auth: `https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-auth.js`,
    firestore: `https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-firestore.js`,
    messaging: `https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-messaging.js`,
    // Versions compat pour les Service Workers
    appCompat: `https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-app-compat.js`,
    messagingCompat: `https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-messaging-compat.js`
};

export default firebaseConfig;
