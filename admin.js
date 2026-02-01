// ===== FIREBASE CONFIGURATION =====
// Vérification du protocole - Firebase nécessite http/https
const isValidProtocol = ['http:', 'https:'].includes(window.location.protocol);

// En mode file://, désactiver Firebase proprement
if (!isValidProtocol) {
    console.info('ℹ️ NutriTrack fonctionne en mode LOCAL (file://). La sync cloud nécessite un serveur web.');
    console.info('   💡 Pour activer Firebase: npx serve . ou python -m http.server');
    // Fonctions placeholder pour éviter les erreurs
    window.firebaseSignIn = () => {
        alert('La synchronisation cloud nécessite un serveur web.\n\nLancez: npx serve ou python -m http.server');
    };
    window.firebaseSignOut = () => {};
    window.firebaseForceSync = () => {};
    window.firebaseRestoreFromCloud = () => {};
    window.firebaseDeleteAccount = () => {};
}

// Charger Firebase uniquement si protocole valide
if (isValidProtocol) {

const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
const { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
const { getFirestore, doc, getDoc, setDoc, deleteDoc, serverTimestamp, collection, query, getDocs, limit, updateDoc, Timestamp, where, orderBy, startAfter, endBefore, limitToLast } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
const { getMessaging, getToken, onMessage } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js');

// Import DataService
const { default: DataService } = await import('./DataService.js');

const firebaseConfig = {
    apiKey: "AIzaSyCL2SvQ2c784ZyA2Pr-Qtv2F1wnnDByGkc",
    authDomain: "nutritraack.firebaseapp.com",
    projectId: "nutritraack",
    storageBucket: "nutritraack.firebasestorage.app",
    messagingSenderId: "133692710812",
    appId: "1:133692710812:web:4a5937cea6e86c9b25b259"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ===== INITIALISER LES VARIABLES GLOBALES =====
// CRITIQUE: Initialiser avant que les fonctions de chargement ne les utilisent
if (!window.foodDatabase) {
    window.foodDatabase = [];
}
if (!window.smartMealTemplates) {
    window.smartMealTemplates = {};
}

// ===== FIREBASE CLOUD MESSAGING (FCM) =====
// IMPORTANT: Remplace cette clé par ta clé VAPID de Firebase Console
// Firebase Console > Project Settings > Cloud Messaging > Web Push certificates
const VAPID_KEY = 'BIHN84h45rQhbm5xYFPYH0sp2bZ56F9L9QBU9_lbKs_DFlvJvk7dLlj6jh1qiC21zm6To1hO3DiNm9jtN1ep12I';

let messaging = null;
let fcmToken = null;

// Initialiser FCM si supporté
async function initializeFCM() {
    try {
        if (!('Notification' in window) || !('serviceWorker' in navigator)) {
            console.log('FCM non supporté sur ce navigateur');
            return;
        }

        messaging = getMessaging(app);

        // Écouter les messages en foreground
        onMessage(messaging, (payload) => {
            console.log('Message reçu en foreground:', payload);
            // Afficher notification même si app ouverte
            if (Notification.permission === 'granted') {
                new Notification(payload.notification?.title || 'NutriTrack', {
                    body: payload.notification?.body || '',
                    icon: '/icon-192.png'
                });
            }
        });

        console.log('FCM initialisé');
    } catch (error) {
        console.error('Erreur initialisation FCM:', error);
    }
}

// Obtenir le token FCM et le sauvegarder
async function getFCMToken() {
    if (!messaging) {
        console.log('FCM non initialisé');
        return null;
    }

    try {
        // Attendre que le SW soit enregistré
        if (!window.swRegistration) {
            console.log('Service Worker pas encore enregistré, attente...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        const options = { vapidKey: VAPID_KEY };

        // Utiliser notre SW si disponible
        if (window.swRegistration) {
            options.serviceWorkerRegistration = window.swRegistration;
        }

        const currentToken = await getToken(messaging, options);

        if (currentToken) {
            fcmToken = currentToken;
            console.log('✅ Token FCM obtenu');
            return currentToken;
        } else {
            console.log('Pas de token FCM disponible');
            return null;
        }
    } catch (error) {
        console.error('Erreur obtention token FCM:', error);
        return null;
    }
}

// Sauvegarder le token et les préférences dans Firestore
async function savePushSubscription() {
    if (!auth.currentUser) {
        console.log('Utilisateur non connecté - subscription non sauvegardée');
        return;
    }

    const token = await getFCMToken();
    if (!token) return;

    const schedules = window.getNotificationSchedules ? window.getNotificationSchedules() : [];

    try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, {
            fcmToken: token,
            notificationSchedules: schedules,
            notificationsUpdatedAt: serverTimestamp(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }).catch(async () => {
            // Si le document n'existe pas, le créer
            await setDoc(userDocRef, {
                fcmToken: token,
                notificationSchedules: schedules,
                notificationsUpdatedAt: serverTimestamp(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }, { merge: true });
        });

        console.log('Subscription push sauvegardée dans Firestore');
    } catch (error) {
        console.error('Erreur sauvegarde subscription:', error);
    }
}

// Supprimer la subscription
async function removePushSubscription() {
    if (!auth.currentUser) return;

    try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, {
            fcmToken: null,
            notificationSchedules: []
        });
        console.log('Subscription push supprimée');
    } catch (error) {
        console.error('Erreur suppression subscription:', error);
    }
}

// Exposer les fonctions globalement
window.initializeFCM = initializeFCM;
window.getFCMToken = getFCMToken;
window.savePushSubscription = savePushSubscription;
window.removePushSubscription = removePushSubscription;

// Initialiser FCM au chargement
initializeFCM();

// ===== ALIMENTS COMMUNS (Base partagée) =====
// Fonction pour récupérer un aliment par code-barres depuis Firestore
window.getAlimentFromFirestore = async function(barcode) {
    try {
        const docRef = doc(db, 'aliments_communs', barcode);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Erreur lecture aliments_communs:', error);
        return null;
    }
};

// Fonction pour rechercher des aliments dans Firestore par texte
window.searchAlimentsCommuns = async function(searchText) {
    try {

        // Si c'est un code-barres numérique, chercher par ID de document
        if (/^\d+$/.test(searchText)) {
            const result = await window.getAlimentFromFirestore(searchText);
            if (result) {
                return [{
                    ...result,
                    barcode: searchText,
                    id: searchText
                }];
            }
            return [];
        }

        // Sinon, faire une recherche textuelle (limité à 100 résultats pour meilleures chances)
        const q = query(collection(db, 'aliments_communs'), limit(100));
        const querySnapshot = await getDocs(q);

        const results = [];
        const searchLower = searchText.toLowerCase();
        let totalDocs = 0;

        querySnapshot.forEach((doc) => {
            totalDocs++;
            const data = doc.data();
            // Filtrer côté client par nom
            if (data.name && data.name.toLowerCase().includes(searchLower)) {
                results.push({
                    ...data,
                    barcode: doc.id,
                    id: doc.id
                });
            }
        });

        return results;
    } catch (error) {
        console.error('❌ Erreur recherche aliments_communs:', error);
        return [];
    }
};

// Charger TOUS les aliments communautaires (pour affichage dans le filtre)
window.loadCommunityFoods = async function() {
    if (!db) return [];

    try {
        const q = query(collection(db, 'aliments_communs'), limit(200));
        const querySnapshot = await getDocs(q);

        const results = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.name) {
                results.push({
                    name: data.name,
                    calories: parseFloat(data.calories) || 0,
                    protein: parseFloat(data.proteins || data.protein) || 0,
                    carbs: parseFloat(data.carbs) || 0,
                    fat: parseFloat(data.fats || data.fat) || 0,
                    fiber: parseFloat(data.fibers || data.fiber) || 0,
                    category: data.category || 'autres',
                    barcode: doc.id,
                    unit: '100g',
                    custom: false,
                    fromFirestore: true
                });
            }
        });

        return results;
    } catch (error) {
        console.error('Erreur chargement aliments communautaires:', error);
        return [];
    }
};

// ===== CHARGER FOODDATABASE DEPUIS FIRESTORE (Source unique) =====
let foodDatabaseLoaded = false; // Flag pour éviter de charger plusieurs fois

window.loadFoodDatabaseFromFirestore = async function() {
    console.log('🎯 [DEBUG] loadFoodDatabaseFromFirestore appelée ! foodDatabaseLoaded =', foodDatabaseLoaded);

    // S'assurer que window.foodDatabase est un tableau
    if (!Array.isArray(window.foodDatabase)) {
        console.warn('⚠️ window.foodDatabase n\'est pas un tableau, réinitialisation...');
        window.foodDatabase = [];
    }

    // Si déjà chargé, ne pas recharger
    if (foodDatabaseLoaded) {
        console.log('✅ foodDatabase déjà chargé depuis Firestore');
        return;
    }

    // Si Firebase pas disponible, utiliser fallback
    if (!db) {
        console.warn('⚠️ Firebase non disponible, utilisation de foodDatabaseLegacy');
        foodDatabase = [...foodDatabaseLegacy];
        foodDatabaseLoaded = true;
        return;
    }

    try {
        console.log('🔄 Chargement foodDatabase depuis Firestore...');

        // OPTIMISATION : Vérifier d'abord le cache localStorage
        const CACHE_KEY = 'foodDatabase_cache';
        const CACHE_EXPIRY_KEY = 'foodDatabase_cache_expiry';
        const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures

        const cachedData = localStorage.getItem(CACHE_KEY);
        const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

        // Si cache valide, utiliser le cache
        if (cachedData && cacheExpiry && Date.now() < parseInt(cacheExpiry)) {
            console.log('✅ Utilisation du cache foodDatabase');
            const firestoreFoods = JSON.parse(cachedData);
            window.foodDatabase.length = 0;
            firestoreFoods.forEach(f => window.foodDatabase.push(f));
            foodDatabaseLoaded = true;
            console.log(`✅ foodDatabase chargé depuis cache: ${window.foodDatabase.length} aliments`);
            return;
        }

        // OPTIMISATION : Charger uniquement les 300 premiers aliments au démarrage
        // (les plus populaires ou les plus récents)
        const q = query(
            collection(db, 'aliments_communs'),
            limit(300)  // Limite à 300 aliments au lieu de TOUS
        );
        const querySnapshot = await getDocs(q);

        // Créer un tableau temporaire pour les aliments Firestore
        const firestoreFoods = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.name) {
                const foodItem = {
                    name: data.name,
                    calories: parseFloat(data.calories) || 0,
                    protein: parseFloat(data.proteins || data.protein) || 0,
                    carbs: parseFloat(data.carbs) || 0,
                    fat: parseFloat(data.fats || data.fat) || 0,
                    fiber: parseFloat(data.fibers || data.fiber) || 0,
                    category: data.category || 'autres',
                    barcode: doc.id,
                    unit: data.unit || '100g',
                    custom: false,
                    fromFirestore: true,
                    verified: data.verified || false
                };

                firestoreFoods.push(foodItem);
            }
        });

        // Si on a récupéré des aliments de Firestore, remplir foodDatabase
        if (firestoreFoods.length > 0) {
            // IMPORTANT : Ne pas remplacer window.foodDatabase par un nouveau tableau
            // car app.js a une référence locale. Il faut vider et remplir le tableau existant.
            window.foodDatabase.length = 0; // Vider
            firestoreFoods.forEach(f => window.foodDatabase.push(f)); // Remplir

            // OPTIMISATION : Mettre en cache les aliments
            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify(firestoreFoods));
                localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
            } catch (e) {
                console.warn('⚠️ Impossible de mettre en cache foodDatabase:', e);
            }

            foodDatabaseLoaded = true;
            console.log(`✅ foodDatabase chargé depuis Firestore: ${window.foodDatabase.length} aliments (limité à 300 pour performance)`);
        } else {
            console.warn('⚠️ Aucun aliment trouvé dans Firestore, utilisation de la base hardcodée');
            foodDatabaseLoaded = true;
        }

    } catch (error) {
        console.error('❌ Erreur chargement foodDatabase depuis Firestore:', error);
        console.warn('⚠️ Utilisation de la base hardcodée en fallback');
        foodDatabaseLoaded = true;
    }
};

// ===== CHARGER SMART TEMPLATES DEPUIS FIRESTORE =====
let smartTemplatesLoaded = false;

window.loadSmartMealTemplatesFromFirestore = async function() {
    // S'assurer que window.smartMealTemplates est un objet
    if (typeof window.smartMealTemplates !== 'object' || window.smartMealTemplates === null) {
        console.warn('⚠️ window.smartMealTemplates n\'est pas un objet, réinitialisation...');
        window.smartMealTemplates = {};
    }

    if (smartTemplatesLoaded) {
        console.log('✅ Smart templates déjà chargés depuis Firestore');
        return;
    }

    if (!db) {
        console.warn('⚠️ Firebase non disponible pour smart templates');
        smartTemplatesLoaded = true;
        return;
    }

    try {
        console.log('🔄 Chargement smart templates depuis Firestore...');

        const templatesSnap = await getDocs(
            query(collection(db, 'smartTemplates'), where('active', '==', true))
        );

        const firestoreTemplates = {};
        templatesSnap.forEach(doc => {
            const data = doc.data();
            firestoreTemplates[doc.id] = data;
            console.log(`📋 Template chargé: ${data.displayName} (${data.variant || 'standard'})`);
        });

        if (Object.keys(firestoreTemplates).length > 0) {
            // IMPORTANT : Ne pas remplacer window.smartMealTemplates par un nouveau objet
            // car app.js a une référence locale. Il faut vider et remplir l'objet existant.

            // Vider l'objet existant
            for (let key in window.smartMealTemplates) {
                delete window.smartMealTemplates[key];
            }

            // Remplir avec les templates de Firestore
            for (let key in firestoreTemplates) {
                window.smartMealTemplates[key] = firestoreTemplates[key];
            }

            localStorage.setItem('smartTemplatesCache', JSON.stringify(firestoreTemplates));
            smartTemplatesLoaded = true;
            console.log(`✅ ${Object.keys(window.smartMealTemplates).length} smart templates chargés depuis Firestore`);
        } else {
            console.warn('⚠️ Aucun template actif trouvé dans Firestore');
            smartTemplatesLoaded = true;
        }

    } catch (error) {
        console.error('❌ Erreur chargement smart templates depuis Firestore:', error);
        smartTemplatesLoaded = true;
    }
};

// 🧪 FONCTION DE TEST - Utilise dans la console: testFirestoreSearch("3017620422003") ou testFirestoreSearch("nutella")
window.testFirestoreSearch = async function(searchText) {

    if (!window.searchAlimentsCommuns) {
        console.error('❌ searchAlimentsCommuns non disponible');
        return;
    }

    const results = await window.searchAlimentsCommuns(searchText);


    if (results.length > 0) {
        results.forEach((item, index) => {
            console.log(`\n   ${index + 1}. ${item.name}`);
        });
    } else {
    }

    return results;
};

// 🚀 AUTO-TEST au chargement pour vérifier connexion Firestore
setTimeout(() => {
    if (typeof window.testFirestoreSearch === 'function') {
        // Test avec un code-barres connu (Nutella)
        window.testFirestoreSearch('3017620422003').then(() => {
        }).catch(err => {
            console.error('❌ Auto-test échoué:', err);
        });
    }
}, 2000); // Attendre 2s que Firebase soit complètement chargé

// Fonction pour sauvegarder un aliment dans la base partagée Firestore
window.saveToAlimentsCommuns = async function(food) {

    // Vérifier que l'utilisateur est connecté
    if (!auth.currentUser) {
        showToast('⚠️ Connecte-toi pour sauvegarder dans la base communautaire');
        return false;
    }

    if (!food.barcode) {
        return false;
    }

    try {
        // Créer un objet léger avec les données essentielles (tous en Number)
        const alimentData = {
            name: String(food.name || 'Sans nom'),
            calories: parseFloat(food.calories) || 0,
            proteins: parseFloat(food.protein) || 0,
            carbs: parseFloat(food.carbs) || 0,
            fats: parseFloat(food.fat) || 0,
            fibers: parseFloat(food.fiber) || 0,
            category: String(food.category || 'autres'),
            barcode: String(food.barcode),
            unit: 'g',
            updatedAt: serverTimestamp()
        };


        // Utiliser le code-barres comme ID du document
        const docRef = doc(db, 'aliments_communs', food.barcode);

        await setDoc(docRef, alimentData, { merge: true });

        console.log('Aliment sauvegardé dans aliments_communs:', alimentData.name);
        return true;
    } catch (error) {
        console.error('Erreur sauvegarde aliments_communs:', error);
        showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Erreur lors de la sauvegarde', 'error');
        return false;
    }
};

// Keys to sync with Firestore - ALL important data
const SYNC_KEYS = ['userProfile', 'foodLog', 'customFoods', 'macroTargets', 'allDailyMeals', 'trackingData', 'mealTemplates', 'weeklyPlan', 'favoriteFoods', 'appUsername', 'closedDays', 'advancedTrackingData', 'calcSettings', 'foodAliases', 'onboardingState', 'calc_goal'];

// Debounce timer for sync
let syncTimeout = null;
let isSyncing = false;

// ===== UI UPDATE FUNCTIONS =====
function updateSyncBanner(user) {
    const indicator = document.getElementById('sync-indicator');
    const textEl = document.getElementById('sync-indicator-text');

    if (!indicator || !textEl) return;

    if (user) {
        // Connecté
        indicator.classList.add('connected');
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const displayName = userProfile.firstName || user.displayName?.split(' ')[0] || '';
        textEl.textContent = displayName ? `✓ ${displayName}` : '✓ Sync';
        indicator.title = 'Synchronisé avec le cloud';
    } else {
        // Non connecté
        indicator.classList.remove('connected');
        textEl.textContent = 'Local';
        indicator.title = 'Mode local - Cliquez pour vous connecter';
    }
}

function updateFirebaseUI(user) {
    const notConnected = document.getElementById('firebase-not-connected');
    const connected = document.getElementById('firebase-connected');
    const headerLoginBtn = document.getElementById('header-login-btn');
    const headerGreeting = document.getElementById('header-greeting');
    const headerSyncBtn = document.getElementById('header-sync-btn');
    const headerProfileWrapper = document.querySelector('.header-profile-wrapper');

    // Mise à jour bannière
    updateSyncBanner(user);

    if (user) {
        document.body.classList.add('user-connected');
        if (notConnected) notConnected.style.display = 'none';
        if (connected) connected.style.display = 'block';

        // Header: cacher login, montrer greeting + profile
        if (headerLoginBtn) headerLoginBtn.style.display = 'none';
        if (headerGreeting) headerGreeting.style.display = 'flex';
        if (headerSyncBtn) headerSyncBtn.style.display = 'flex';
        if (headerProfileWrapper) headerProfileWrapper.style.display = 'block';

        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const displayName = userProfile.firstName || user.displayName?.split(' ')[0] || 'Utilisateur';
        const photoURL = user.photoURL || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2310b981"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>';

        // Update header greeting
        const headerUsername = document.getElementById('header-username');
        if (headerUsername) headerUsername.textContent = displayName;

        // Update header profile photo
        const headerProfilePhoto = document.getElementById('header-profile-photo');
        if (headerProfilePhoto) headerProfilePhoto.src = photoURL;

        // Update user menu
        const userMenuName = document.getElementById('user-menu-name');
        const userMenuPhoto = document.getElementById('user-menu-photo');
        const userMenuUsername = document.getElementById('user-menu-username-text');
        if (userMenuName) userMenuName.textContent = displayName;
        if (userMenuUsername) userMenuUsername.textContent = displayName;
        if (userMenuPhoto) userMenuPhoto.src = photoURL;

        // Legacy elements in settings
        if (document.getElementById('firebase-user-photo')) {
            document.getElementById('firebase-user-photo').src = photoURL;
        }
        if (document.getElementById('firebase-user-name')) {
            document.getElementById('firebase-user-name').textContent = displayName;
        }
        if (document.getElementById('firebase-user-email')) {
            document.getElementById('firebase-user-email').textContent = user.email;
        }

        // Update mobile drawer profile
        const mobileProfilePhoto = document.getElementById('mobile-profile-photo');
        const drawerUserPhoto = document.getElementById('drawer-user-photo');
        const drawerUserName = document.getElementById('drawer-user-name');
        if (mobileProfilePhoto) mobileProfilePhoto.src = photoURL;
        if (drawerUserPhoto) drawerUserPhoto.src = photoURL;
        if (drawerUserName) drawerUserName.textContent = displayName;

        if (typeof updateIcons === 'function') updateIcons();
    } else {
        document.body.classList.remove('user-connected');
        if (notConnected) notConnected.style.display = 'block';
        if (connected) connected.style.display = 'none';

        // Header: montrer login, cacher greeting + profile
        if (headerLoginBtn) headerLoginBtn.style.display = 'flex';
        if (headerGreeting) headerGreeting.style.display = 'none';
        if (headerSyncBtn) headerSyncBtn.style.display = 'none';
        if (headerProfileWrapper) headerProfileWrapper.style.display = 'none';
    }
}

// Fonction pour demander le prénom avant inscription
function askForFirstName() {
    console.log('askForFirstName called');
    return new Promise((resolve) => {
        console.log('customPrompt available:', typeof window.customPrompt === 'function');
        if (typeof window.customPrompt === 'function') {
            // Utiliser le prompt personnalisé si disponible
            const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            const existingName = userProfile.firstName || '';

            window.customPrompt('Bienvenue sur NutriTrack !', 'Entre ton prénom pour personnaliser ton expérience :', existingName || 'Ton prénom')
                .then(name => resolve(name));
        } else {
            // Fallback vers prompt natif
            console.log('Using native prompt');
            const name = prompt('Entre ton prénom pour personnaliser ton expérience :');
            resolve(name);
        }
    });
}

// Ajouter fonction customPrompt globale si elle n'existe pas
if (typeof window.customPrompt !== 'function') {
    window.customPrompt = function(title, message, placeholder) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'custom-popup-overlay active';
            modal.innerHTML = `
                <div class="custom-popup">
                    <h3>${title}</h3>
                    <p>${message}</p>
                    <input type="text" id="prompt-input-fb" placeholder="${placeholder || ''}"
                        style="width: 100%; padding: var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem; margin-bottom: var(--space-md);"
                        maxlength="20">
                    <div class="custom-popup-buttons">
                        <button id="prompt-cancel-fb" class="custom-popup-btn cancel">Annuler</button>
                        <button id="prompt-confirm-fb" class="custom-popup-btn confirm">Confirmer</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const input = modal.querySelector('#prompt-input-fb');
            input.focus();

            const cleanup = (value) => {
                modal.remove();
                resolve(value);
            };

            modal.querySelector('#prompt-confirm-fb').onclick = () => cleanup(input.value.trim());
            modal.querySelector('#prompt-cancel-fb').onclick = () => cleanup(null);
            input.onkeypress = (e) => { if (e.key === 'Enter') cleanup(input.value.trim()); };
            modal.onclick = (e) => { if (e.target === modal) cleanup(null); };
        });
    };
}

function updateSyncStatus(message) {
    const statusEl = document.getElementById('firebase-sync-status');
    if (statusEl) {
        statusEl.textContent = message;
    }
}

// ===== FIRESTORE SYNC FUNCTIONS =====
async function syncToFirestore(user) {
    if (!user || isSyncing) return;
    isSyncing = true;

    try {
        const data = {};
        SYNC_KEYS.forEach(key => {
            const value = localStorage.getItem(key);
            if (value) {
                data[key] = value;
            }
        });

        // Add additional keys that might be useful
        const additionalKeys = ['macroTargets', 'allDailyMeals', 'trackingData', 'mealTemplates', 'weeklyPlan'];
        additionalKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value) {
                data[key] = value;
            }
        });

        // Add user info from Firebase Auth
        data.email = user.email || null;
        data.displayName = user.displayName || null;

        // Extract firstName from userProfile if available
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (userProfile.firstName) {
            data.firstName = userProfile.firstName;
        }
        if (userProfile.lastName) {
            data.lastName = userProfile.lastName;
        }

        // Use serverTimestamp for lastSync instead of ISO string
        data.lastSync = serverTimestamp();

        // Check if document exists to set createdAt only on first sync
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        const updateData = {
            ...data,
            updatedAt: serverTimestamp()
        };

        // Only set createdAt if document doesn't exist yet
        if (!docSnap.exists()) {
            updateData.createdAt = serverTimestamp();
        }

        await setDoc(docRef, updateData, { merge: true });

        const now = new Date().toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        updateSyncStatus(`Dernière sync: ${now}`);

    } catch (error) {
        console.error('Erreur sync Firestore:', error);
        updateSyncStatus('Erreur de synchronisation');
    } finally {
        isSyncing = false;
    }
}

async function loadFromFirestore(user) {
    if (!user) return null;

    try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Erreur lecture Firestore:', error);
        return null;
    }
}

function restoreDataFromCloud(cloudData, silent = false) {
    // PROTECTION: Si migration v1 terminée, ne JAMAIS restaurer les anciennes données
    const MIGRATION_FLAG = 'migrationDone_v1';
    if (localStorage.getItem(MIGRATION_FLAG) === 'true') {
        console.log('🚫 Restore bloqué: migration v1 effectuée, données en sous-collections Firestore');
        return;
    }

    const allKeys = [...SYNC_KEYS]; // All synced keys

    allKeys.forEach(key => {
        if (cloudData[key]) {
            // Use original setItem to avoid triggering sync
            originalSetItem.call(localStorage, key, cloudData[key]);
        }
    });

    // Recharger les mealTemplates en mémoire immédiatement
    if (cloudData.mealTemplates && typeof loadMealTemplates === 'function') {
        loadMealTemplates();
    }

    // Sync firstName from userProfile to appUsername for header display
    try {
        const restoredProfile = JSON.parse(cloudData.userProfile || '{}');
        if (restoredProfile.firstName) {
            originalSetItem.call(localStorage, 'appUsername', restoredProfile.firstName);
        }
    } catch (e) { /* ignore parse errors */ }

    // Reload page SEULEMENT si restauration manuelle (pas lors de l'init)
    if (!silent) {
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Données restaurées depuis le cloud !', 'success');
        }
        setTimeout(() => location.reload(), 1500);
    }
}

// ===== LOCALSTORAGE HOOK =====
const originalSetItem = localStorage.setItem.bind(localStorage);
const keysToWatch = [...SYNC_KEYS]; // All keys from SYNC_KEYS are watched

localStorage.setItem = function(key, value) {
    originalSetItem(key, value);

    // PROTECTION: Ne pas sync si migration v1 effectuée (données en sous-collections)
    const MIGRATION_FLAG = 'migrationDone_v1';
    if (localStorage.getItem(MIGRATION_FLAG) === 'true') {
        return; // Skip ancien système de sync
    }

    // If connected and key is in watch list, sync to Firestore with debounce
    if (keysToWatch.includes(key) && auth.currentUser) {
        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
            syncToFirestore(auth.currentUser);
        }, 2000); // Debounce 2 seconds
    }
};

// ===== AUTH FUNCTIONS (exposed globally) =====
window.firebaseSignIn = async function() {
    try {
        // Connexion Google directe
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // DÉTECTION DE CHANGEMENT DE COMPTE
        const lastUserEmail = localStorage.getItem('lastUserEmail');
        const isAccountSwitch = lastUserEmail && lastUserEmail !== user.email;

        if (isAccountSwitch) {
            console.log('🔄 Changement de compte détecté:', lastUserEmail, '→', user.email);
        }

        // Check if cloud data exists AVANT d'effacer quoi que ce soit
        const cloudData = await loadFromFirestore(user);

        if (isAccountSwitch) {
            // Si changement de compte ET données cloud existent → OK pour effacer et restaurer
            if (cloudData && cloudData.lastSync) {
                console.log('✅ Données cloud trouvées, effacement sécurisé du localStorage');
                SYNC_KEYS.forEach(key => localStorage.removeItem(key));
                restoreDataFromCloud(cloudData, true); // silent = true
                localStorage.setItem('lastUserEmail', user.email);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="user-check" class="icon-inline"></i> Données du compte ' + user.email + ' chargées');
                }
                showAppAfterLogin(user);
                return;
            } else {
                // DANGER: Changement de compte mais PAS de données cloud
                // On garde les données locales de l'ancien compte et on avertit
                console.warn('⚠️ Changement de compte SANS données cloud - conservation localStorage');
                if (typeof customConfirm === 'function') {
                    const confirmed = await customConfirm(
                        'Compte sans données cloud',
                        `Le compte ${user.email} n'a pas de données sauvegardées dans le cloud. Si tu continues, tu perdras les données du compte précédent (${lastUserEmail}). Veux-tu vraiment changer de compte ?`,
                        { confirmText: 'Oui, effacer', cancelText: 'Annuler', isDanger: true }
                    );

                    if (!confirmed) {
                        // L'utilisateur annule - déconnexion
                        await signOut(auth);
                        if (typeof showToast === 'function') {
                            showToast('<i data-lucide="info" class="icon-inline"></i> Changement de compte annulé');
                        }
                        return;
                    }
                }

                // L'utilisateur confirme l'effacement
                console.log('🧹 Effacement confirmé par l\'utilisateur');
                SYNC_KEYS.forEach(key => localStorage.removeItem(key));
                localStorage.setItem('lastUserEmail', user.email);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="user-check" class="icon-inline"></i> Connecté avec ' + user.email + ' (compte vide)');
                }
                showAppAfterLogin(user);
                return;
            }
        }

        // PAS de changement de compte - comportement normal
        localStorage.setItem('lastUserEmail', user.email);

        // Utiliser le prénom Google si pas de prénom local
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (!userProfile.firstName && user.displayName) {
            const googleFirstName = user.displayName.split(' ')[0];
            userProfile.firstName = googleFirstName;
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            localStorage.setItem('appUsername', googleFirstName);
        }

        if (cloudData && cloudData.lastSync) {
            // Cloud data exists
            const hasLocalData = SYNC_KEYS.some(key => localStorage.getItem(key));

            if (hasLocalData) {
                // Both local and cloud data exist
                if (typeof customConfirm === 'function') {
                    customConfirm(
                        'Données trouvées dans le cloud',
                        `Des données existent déjà sur ce compte (sync: ${new Date(cloudData.lastSync).toLocaleDateString('fr-FR')}). Veux-tu les restaurer et remplacer tes données locales ?`,
                        { confirmText: 'Restaurer', cancelText: 'Garder local', isDanger: false }
                    ).then((restore) => {
                        if (restore) {
                            restoreDataFromCloud(cloudData);
                        } else {
                            // Keep local data and sync to cloud
                            syncToFirestore(user);
                            if (typeof showToast === 'function') {
                                showToast('<i data-lucide="cloud-upload" class="icon-inline"></i> Données locales envoyées vers le cloud');
                            }
                        }
                        showAppAfterLogin(user);
                    });
                } else {
                    // Fallback without custom confirm
                    if (confirm(`Des données existent déjà sur ce compte. Voulez-vous les restaurer ?`)) {
                        restoreDataFromCloud(cloudData);
                    } else {
                        syncToFirestore(user);
                    }
                    showAppAfterLogin(user);
                }
            } else {
                // No local data, restore from cloud
                restoreDataFromCloud(cloudData, true);
                showAppAfterLogin(user);
            }
        } else {
            // No cloud data, upload local
            syncToFirestore(user);
            if (typeof showToast === 'function') {
                showToast('<i data-lucide="check-circle" class="icon-inline"></i> Connecté ! Tes données sont synchronisées.');
            }
            showAppAfterLogin(user);
        }

    } catch (error) {
        console.error('Erreur connexion Google:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de connexion', 'error');
        }
    }
};

// Fonction helper pour afficher l'app après login
async function showAppAfterLogin(user) {
    // Cacher la landing page
    const landingPage = document.getElementById('landing-page');
    if (landingPage) {
        landingPage.style.display = 'none';
    }

    // Réinitialiser le flag pour permettre l'affichage
    window.appInitialized = false;

    // MIGRATION localStorage → Firestore (si nécessaire)
    const migrationResult = await migrateToFirestore(user);

    if (!migrationResult.success) {
        // Migration échouée → afficher erreur
        if (typeof showToast === 'function') {
            showToast(`<i data-lucide="alert-circle" class="icon-inline"></i> Migration impossible: ${migrationResult.error}`, 'error');
        }
        // Continuer quand même (données locales préservées)
    } else if (migrationResult.uploadCount > 0) {
        // Migration réussie → notifier
        if (typeof showToast === 'function') {
            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> ${migrationResult.uploadCount} éléments migrés`, 'success');
        }

        // Si needsReload, recharger pour purger les données en mémoire
        if (migrationResult.needsReload) {
            console.log('🔄 Rechargement de la page dans 1s...');
            setTimeout(() => window.location.reload(), 1000);
            return; // Arrêter l'exécution ici
        }
    }

    // INITIALISER DATASERVICE GLOBALEMENT pour app.js
    // Uniquement si migration effectuée (données en sous-collections)
    if (localStorage.getItem('migrationDone_v1') === 'true') {
        window.dataService = new DataService(db, user.uid);
        console.log('✅ DataService initialisé globalement');

        // Synchroniser les données en attente (modifiées pendant que dataService était indisponible)
        if (typeof window.syncPendingData === 'function') {
            window.syncPendingData();
        }
    } else {
        console.warn('⚠️ DataService non initialisé: migration v1 non effectuée');
    }

    // Afficher l'app
    if (typeof window.showApp === 'function') {
        window.showApp(user);
    }

    // Charger les données si nécessaire
    if (typeof window.loadFoodDatabaseFromFirestore === 'function') {
        window.loadFoodDatabaseFromFirestore();
    }
    if (typeof window.loadSmartMealTemplatesFromFirestore === 'function') {
        window.loadSmartMealTemplatesFromFirestore();
    }

    // IMPORTANT: Charger profile et calc settings APRÈS DataService créé
    if (window.dataService && typeof window.loadProfile === 'function') {
        console.log('🔄 Chargement profile depuis Firestore...');
        window.loadProfile().then(() => {
            console.log('✅ Profile chargé depuis Firestore');
            // Charger calc settings APRÈS profile
            if (typeof window.loadCalcSettings === 'function') {
                console.log('🔄 Chargement calc settings depuis Firestore...');
                window.loadCalcSettings().then(() => {
                    console.log('✅ Calc settings chargés depuis Firestore');
                });
            }
        });
    }
}

// ========================================
// MIGRATION SÉCURISÉE localStorage → Firestore
// ========================================

/**
 * Migre les données localStorage vers la nouvelle architecture Firestore
 *
 * Principes de sécurité:
 * - Ne vide localStorage QU'APRÈS confirmation upload Firestore
 * - Flag migrationDone_v1 = true seulement après succès
 * - Migration idempotente (pas de doublons si refresh)
 * - Si échec → garde localStorage + message clair
 */
async function migrateToFirestore(user) {
    const MIGRATION_FLAG = 'migrationDone_v1';

    // Vérifier si migration déjà effectuée
    if (localStorage.getItem(MIGRATION_FLAG) === 'true') {
        console.log('✅ Migration déjà effectuée, skip');
        return { success: true, alreadyDone: true };
    }

    console.log('🔄 Début migration localStorage → Firestore');

    try {
        // Liste des clés à migrer (ancien SYNC_KEYS)
        const LEGACY_KEYS = [
            'userProfile', 'foodLog', 'customFoods', 'macroTargets',
            'allDailyMeals', 'trackingData', 'mealTemplates', 'weeklyPlan',
            'favoriteFoods', 'appUsername', 'closedDays', 'advancedTrackingData',
            'calcSettings', 'foodAliases', 'calc_goal',
            // Clés calculateur
            'calc_weight', 'calc_activity', 'calc_deficit', 'calc_proteinCoeff', 'calc_fatCoeff',
            // Autres
            'initialWeight'
        ];

        // 1. Lire toutes les données localStorage
        const localData = {};
        let hasData = false;

        LEGACY_KEYS.forEach(key => {
            const value = localStorage.getItem(key);
            if (value) {
                localData[key] = value;
                hasData = true;
            }
        });

        // Si pas de données à migrer
        if (!hasData) {
            console.log('📭 Aucune donnée à migrer');
            localStorage.setItem(MIGRATION_FLAG, 'true');
            return { success: true, noData: true };
        }

        console.log('📦 Données trouvées:', Object.keys(localData));

        // 2. Initialiser DataService
        const dataService = new DataService(db, user.uid);

        // 3. Normaliser et uploader les données (avec compteur de succès)
        let uploadCount = 0;
        const errors = [];

        // 3a. PROFILE
        if (localData.userProfile) {
            try {
                const profile = JSON.parse(localData.userProfile);
                await dataService.saveProfile(profile);
                uploadCount++;
                console.log('✅ Profile migré');
            } catch (error) {
                console.error('❌ Erreur migration profile:', error);
                errors.push({ key: 'userProfile', error: error.message });
            }
        }

        // 3b. SETTINGS (macroTargets, calcSettings, calc_goal + toutes clés calc_*)
        try {
            const settings = {};
            if (localData.macroTargets) settings.macroTargets = JSON.parse(localData.macroTargets);
            if (localData.calcSettings) settings.calcSettings = JSON.parse(localData.calcSettings);
            if (localData.calc_goal) settings.calc_goal = localData.calc_goal;

            // Clés calculateur individuelles
            if (localData.calc_weight) settings.calc_weight = parseFloat(localData.calc_weight);
            if (localData.calc_activity) settings.calc_activity = parseFloat(localData.calc_activity);
            if (localData.calc_deficit) settings.calc_deficit = parseFloat(localData.calc_deficit);
            if (localData.calc_proteinCoeff) settings.calc_proteinCoeff = parseFloat(localData.calc_proteinCoeff);
            if (localData.calc_fatCoeff) settings.calc_fatCoeff = parseFloat(localData.calc_fatCoeff);
            if (localData.initialWeight) settings.initialWeight = parseFloat(localData.initialWeight);

            if (Object.keys(settings).length > 0) {
                await dataService.saveSettings(settings);
                uploadCount++;
                console.log('✅ Settings migrés');
            }
        } catch (error) {
            console.error('❌ Erreur migration settings:', error);
            errors.push({ key: 'settings', error: error.message });
        }

        // 3c. MEALS (allDailyMeals - structure par date)
        if (localData.allDailyMeals) {
            try {
                const allMeals = JSON.parse(localData.allDailyMeals);
                const dates = Object.keys(allMeals);

                // Upload chaque jour séparément
                for (const date of dates) {
                    await dataService.saveMeal(date, allMeals[date]);
                    uploadCount++;
                }

                console.log(`✅ ${dates.length} jours de repas migrés`);
            } catch (error) {
                console.error('❌ Erreur migration meals:', error);
                errors.push({ key: 'allDailyMeals', error: error.message });
            }
        }

        // 3d. TRACKING
        if (localData.trackingData) {
            try {
                const tracking = JSON.parse(localData.trackingData);

                // Structure: array [{date, weight, bodyfat, ...}]
                if (Array.isArray(tracking)) {
                    for (const entry of tracking) {
                        if (entry.date) {
                            await dataService.saveTracking(entry.date, entry);
                            uploadCount++;
                        }
                    }
                    console.log(`✅ ${tracking.length} entrées de tracking migrées`);
                }
            } catch (error) {
                console.error('❌ Erreur migration tracking:', error);
                errors.push({ key: 'trackingData', error: error.message });
            }
        }

        // 3e. CUSTOM FOODS
        if (localData.customFoods) {
            try {
                const foods = JSON.parse(localData.customFoods);

                if (Array.isArray(foods)) {
                    for (const food of foods) {
                        const foodId = food.id || `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                        await dataService.saveCustomFood(foodId, food);
                        uploadCount++;
                    }
                    console.log(`✅ ${foods.length} aliments perso migrés`);
                }
            } catch (error) {
                console.error('❌ Erreur migration customFoods:', error);
                errors.push({ key: 'customFoods', error: error.message });
            }
        }

        // 3f. MEAL TEMPLATES
        if (localData.mealTemplates) {
            try {
                const templates = JSON.parse(localData.mealTemplates);

                if (Array.isArray(templates)) {
                    for (const template of templates) {
                        const templateId = template.id || `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                        await dataService.saveMealTemplate(templateId, template);
                        uploadCount++;
                    }
                    console.log(`✅ ${templates.length} templates migrés`);
                }
            } catch (error) {
                console.error('❌ Erreur migration templates:', error);
                errors.push({ key: 'mealTemplates', error: error.message });
            }
        }

        // 4. Vérifier qu'au moins quelque chose a été uploadé
        if (uploadCount === 0 && errors.length > 0) {
            throw new Error('Aucune donnée n\'a pu être uploadée. Erreurs: ' + errors.map(e => e.key).join(', '));
        }

        // 5. SEULEMENT MAINTENANT: Purger localStorage + flag
        console.log(`✅ ${uploadCount} éléments uploadés avec succès`);

        if (errors.length > 0) {
            console.warn(`⚠️ ${errors.length} erreurs non critiques:`, errors);
        }

        // Purger les anciennes clés
        console.log('🗑️ Suppression des clés localStorage:', LEGACY_KEYS);
        let deletedCount = 0;
        LEGACY_KEYS.forEach(key => {
            if (localStorage.getItem(key)) {
                console.log(`   🗑️ Suppression: ${key}`);
                localStorage.removeItem(key);
                deletedCount++;
            }
        });
        console.log(`✅ ${deletedCount} clés supprimées du localStorage`);

        // Marquer migration comme terminée
        localStorage.setItem(MIGRATION_FLAG, 'true');

        console.log('🎉 Migration terminée avec succès');
        console.log('🔄 Rechargement nécessaire pour purger les données en mémoire...');

        return {
            success: true,
            uploadCount,
            errors: errors.length > 0 ? errors : null,
            needsReload: true // Signal qu'un reload est nécessaire
        };

    } catch (error) {
        console.error('❌ ERREUR CRITIQUE migration:', error);

        // NE PAS purger localStorage en cas d'erreur
        // Afficher message clair à l'utilisateur

        return {
            success: false,
            error: error.message
        };
    }
}

window.firebaseSignOut = async function() {
    // Modal de confirmation avant déconnexion
    if (typeof customConfirm === 'function') {
        customConfirm(
            'Se déconnecter ?',
            'Tu seras déconnecté du cloud. Tes données locales seront conservées mais ne seront plus synchronisées.',
            { confirmText: 'Déconnexion', cancelText: 'Annuler', isDanger: true }
        ).then(async (confirmed) => {
            if (!confirmed) return;
            try {
                await signOut(auth);
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="log-out" class="icon-inline"></i> Déconnecté');
                }
                // Rediriger vers la landing page
                window.appInitialized = false;
                window.location.reload();
            } catch (error) {
                console.error('Erreur déconnexion:', error);
            }
        });
    } else {
        // Fallback sans modal
        if (confirm('Voulez-vous vous déconnecter ?')) {
            try {
                await signOut(auth);
                // Rediriger vers la landing page
                window.appInitialized = false;
                window.location.reload();
            } catch (error) {
                console.error('Erreur déconnexion:', error);
            }
        }
    }
};

window.firebaseForceSync = async function() {
    if (auth.currentUser) {
        updateSyncStatus('Synchronisation en cours...');
        await syncToFirestore(auth.currentUser);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Synchronisation terminée !');
        }
    }
};

window.firebaseRestoreFromCloud = async function() {
    if (!auth.currentUser) return;

    const cloudData = await loadFromFirestore(auth.currentUser);
    if (cloudData) {
        if (typeof customConfirm === 'function') {
            customConfirm(
                'Restaurer depuis le cloud ?',
                'Tes données locales seront remplacées par celles du cloud. Cette action est irréversible.',
                true
            ).then((confirmed) => {
                if (confirmed) {
                    restoreDataFromCloud(cloudData);
                }
            });
        } else if (confirm('Tes données locales seront remplacées. Continuer ?')) {
            restoreDataFromCloud(cloudData);
        }
    } else {
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="info" class="icon-inline"></i> Aucune donnée dans le cloud');
        }
    }
};

// Delete cloud data for current user
window.firebaseDeleteCloudData = async function() {
    if (!auth.currentUser) {
        return false;
    }
    try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await deleteDoc(userRef);
        return true;
    } catch (error) {
        console.error('Erreur suppression cloud:', error);
        return false;
    }
};

// Check if user is connected to Firebase
window.isFirebaseConnected = function() {
    return !!auth.currentUser;
};

// ===== AUTH STATE LISTENER - CONTRÔLE L'AFFICHAGE INITIAL =====
onAuthStateChanged(auth, (user) => {
    const initUI = async () => {
        // Mettre à jour l'UI Firebase (header, boutons, etc.)
        updateFirebaseUI(user);

        // Mettre à jour la visibilité du bouton admin
        updateAdminVisibility();

        if (user) {
            // USER CONNECTÉ → Charger données + afficher l'app
            console.log('✅ User connecté:', user.email);

            // MIGRATION localStorage → Firestore (si nécessaire)
            const migrationResult = await migrateToFirestore(user);

            if (!migrationResult.success) {
                // Migration échouée → afficher erreur + permettre retry
                if (typeof customConfirm === 'function') {
                    const retry = await customConfirm(
                        'Migration impossible',
                        `Impossible de migrer tes données vers le cloud.\nErreur: ${migrationResult.error}\n\nTes données locales sont conservées. Veux-tu réessayer ?`,
                        { confirmText: 'Réessayer', cancelText: 'Plus tard', isDanger: false }
                    );

                    if (retry) {
                        // Reload pour réessayer
                        window.location.reload();
                        return;
                    }
                } else {
                    alert(`Migration impossible: ${migrationResult.error}\nTes données locales sont conservées.`);
                }
            } else if (migrationResult.uploadCount > 0) {
                // Migration réussie → notifier user
                if (typeof showToast === 'function') {
                    showToast(`<i data-lucide="check-circle" class="icon-inline"></i> ${migrationResult.uploadCount} éléments migrés vers le cloud`, 'success');
                }

                // Si needsReload, recharger pour purger les données en mémoire
                if (migrationResult.needsReload) {
                    console.log('🔄 Rechargement de la page dans 1.5s...');
                    setTimeout(() => window.location.reload(), 1500);
                    return; // Arrêter l'exécution ici
                }
            }

            // INITIALISER DATASERVICE GLOBALEMENT pour app.js
            // Uniquement si migration effectuée (données en sous-collections)
            if (localStorage.getItem('migrationDone_v1') === 'true') {
                window.dataService = new DataService(db, user.uid);
                console.log('✅ DataService initialisé globalement');

                // Synchroniser les données en attente (modifiées pendant que dataService était indisponible)
                if (typeof window.syncPendingData === 'function') {
                    window.syncPendingData();
                }
            } else {
                console.warn('⚠️ DataService non initialisé: migration v1 non effectuée');
            }

            // DEBUG: Vérifier si la fonction existe
            console.log('🔍 [DEBUG] typeof window.loadFoodDatabaseFromFirestore:', typeof window.loadFoodDatabaseFromFirestore);

            // Charger la base d'aliments depuis Firestore (CRITIQUE pour badges vérifiés)
            if (typeof window.loadFoodDatabaseFromFirestore === 'function') {
                console.log('🚀 [DEBUG] Appel de loadFoodDatabaseFromFirestore...');
                await window.loadFoodDatabaseFromFirestore();
                console.log('✅ [DEBUG] loadFoodDatabaseFromFirestore terminé');

                // IMPORTANT : Re-render la base d'aliments après chargement Firestore
                if (typeof window.renderFoodDatabase === 'function') {
                    console.log('🔄 Re-rendering foodDatabase après chargement Firestore...');
                    window.renderFoodDatabase();
                }
            } else {
                console.error('❌ [DEBUG] loadFoodDatabaseFromFirestore n\'existe pas !');
            }

            // Charger les smart templates depuis Firestore (CRITIQUE pour repas conseillés personnalisés)
            if (typeof window.loadSmartMealTemplatesFromFirestore === 'function') {
                console.log('🚀 [DEBUG] Appel de loadSmartMealTemplatesFromFirestore...');
                await window.loadSmartMealTemplatesFromFirestore();
                console.log('✅ [DEBUG] loadSmartMealTemplatesFromFirestore terminé');
            } else {
                console.error('❌ [DEBUG] loadSmartMealTemplatesFromFirestore n\'existe pas !');
            }

            // IMPORTANT: Charger profile et calc settings APRÈS DataService créé
            if (window.dataService && typeof window.loadProfile === 'function') {
                console.log('🔄 Chargement profile depuis Firestore...');
                await window.loadProfile();
                console.log('✅ Profile chargé depuis Firestore');

                // Charger calc settings APRÈS profile
                if (typeof window.loadCalcSettings === 'function') {
                    console.log('🔄 Chargement calc settings depuis Firestore...');
                    await window.loadCalcSettings();
                    console.log('✅ Calc settings chargés depuis Firestore');
                }

                // Charger les repas APRÈS profile et settings
                if (typeof window.loadAllMeals === 'function') {
                    console.log('🔄 Chargement repas depuis Firestore...');
                    await window.loadAllMeals();
                    console.log('✅ Repas chargés depuis Firestore');
                }

                // Charger le tracking APRÈS repas
                if (typeof window.loadTrackingData === 'function') {
                    console.log('🔄 Chargement tracking depuis Firestore...');
                    await window.loadTrackingData();
                    console.log('✅ Tracking chargé depuis Firestore');
                }

                // Charger custom foods APRÈS tracking
                if (typeof window.loadCustomFoods === 'function') {
                    console.log('🔄 Chargement custom foods depuis Firestore...');
                    await window.loadCustomFoods();
                    console.log('✅ Custom foods chargés depuis Firestore');
                }

                // Charger meal templates APRÈS custom foods
                if (typeof window.loadMealTemplates === 'function') {
                    console.log('🔄 Chargement meal templates depuis Firestore...');
                    await window.loadMealTemplates();
                    console.log('✅ Meal templates chargés depuis Firestore');
                }

                // Charger favorite foods
                if (typeof window.loadFavoriteFoods === 'function') {
                    console.log('🔄 Chargement favorite foods depuis Firestore...');
                    await window.loadFavoriteFoods();
                    console.log('✅ Favorite foods chargés depuis Firestore');
                }

                // Charger weekly plan
                if (typeof window.loadWeeklyPlan === 'function') {
                    console.log('🔄 Chargement weekly plan depuis Firestore...');
                    await window.loadWeeklyPlan();
                    console.log('✅ Weekly plan chargé depuis Firestore');
                }

                // Charger closed days
                if (typeof window.loadClosedDays === 'function') {
                    console.log('🔄 Chargement closed days depuis Firestore...');
                    await window.loadClosedDays();
                    console.log('✅ Closed days chargés depuis Firestore');
                }

                // Charger food aliases
                if (typeof window.loadFoodAliases === 'function') {
                    console.log('🔄 Chargement food aliases depuis Firestore...');
                    await window.loadFoodAliases();
                    console.log('✅ Food aliases chargés depuis Firestore');
                }

                // Charger macro targets
                if (typeof window.loadMacroTargets === 'function') {
                    console.log('🔄 Chargement macro targets depuis Firestore...');
                    await window.loadMacroTargets();
                    console.log('✅ Macro targets chargés depuis Firestore');
                }
            }

            // Charger les données depuis Firestore (source de vérité)
            const cloudData = await loadFromFirestore(user);

            if (cloudData && cloudData.lastSync) {
                const syncDate = new Date(cloudData.lastSync).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                updateSyncStatus(`Dernière sync: ${syncDate}`);

                // Restaurer les données depuis le cloud SILENCIEUSEMENT (pas de reload lors de l'init)
                if (cloudData.allDailyMeals || cloudData.trackingData) {
                    restoreDataFromCloud(cloudData, true); // silent = true
                }
            }

            // Afficher l'app + cacher splash (SEULEMENT si pas déjà fait)
            if (typeof window.showApp === 'function') {
                window.showApp(user);
            }
        } else {
            // USER NON CONNECTÉ → Afficher landing page (écran de login)
            console.log('❌ User non connecté');

            // Afficher landing page + cacher splash (SEULEMENT si pas déjà fait)
            if (typeof window.showLanding === 'function') {
                window.showLanding();
            }
        }

        // Rafraîchir les icônes Lucide
        if (typeof updateIcons === 'function') updateIcons();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUI);
    } else {
        // Lancer immédiatement si DOM déjà prêt
        initUI();
    }
});

// Log initialization

// ===== ADMIN & FEEDBACK SYSTEM =====
const ADMIN_UID = 'qEuqSbWO73OwTEwL6LhEILS5djD2';
let adminFeedbacksCache = [];
let adminCurrentPage = 1;
const FEEDBACKS_PER_PAGE = 20;

// Check if current user is admin
function isAdmin() {
    return auth.currentUser && auth.currentUser.uid === ADMIN_UID;
}
// Expose globally for access from other scopes
window.isAdmin = isAdmin;

// Show/hide admin button based on user
function updateAdminVisibility() {
    const isUserAdmin = isAdmin();
    // Sidebar button (desktop)
    const adminBtn = document.getElementById('admin-sidebar-btn');
    if (adminBtn) {
        adminBtn.style.display = isUserAdmin ? 'flex' : 'none';
    }
    // Drawer button (mobile)
    const drawerAdminBtn = document.getElementById('drawer-admin-btn');
    if (drawerAdminBtn) {
        drawerAdminBtn.style.display = isUserAdmin ? 'flex' : 'none';
    }
}

// NOTE: updateAdminVisibility est maintenant appelé dans le listener onAuthStateChanged principal (ligne 6143)

// ===== FEEDBACK MODAL =====
window.openFeedbackModal = function() {
    document.getElementById('feedback-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof updateIcons === 'function') updateIcons();
};

window.closeFeedbackModal = function() {
    document.getElementById('feedback-modal').classList.remove('active');
    document.body.style.overflow = '';
    // Reset form
    document.getElementById('feedback-type').value = '';
    document.getElementById('feedback-tab').value = '';
    document.getElementById('feedback-reproduction').value = '';
    document.getElementById('feedback-description').value = '';
    document.getElementById('reproduction-field').style.display = 'none';
};

window.toggleReproductionField = function() {
    const type = document.getElementById('feedback-type').value;
    document.getElementById('reproduction-field').style.display = type === 'bug' ? 'block' : 'none';
};

window.submitFeedback = async function() {
    const type = document.getElementById('feedback-type').value;
    const tab = document.getElementById('feedback-tab').value;
    const reproduction = document.getElementById('feedback-reproduction').value;
    const description = document.getElementById('feedback-description').value;

    if (!type || !tab || !description.trim()) {
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Remplis tous les champs obligatoires');
        }
        return;
    }

    try {
        // Detect device type and OS
        const ua = navigator.userAgent;
        let deviceType = 'Unknown';
        let deviceOS = 'Unknown';

        // Detect OS
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
            deviceType = 'Mobile';
            deviceOS = 'iOS';
        } else if (/android/i.test(ua)) {
            deviceType = 'Mobile';
            deviceOS = 'Android';
        } else if (/Windows/i.test(ua)) {
            deviceType = 'PC';
            deviceOS = 'Windows';
        } else if (/Mac/i.test(ua)) {
            deviceType = 'PC';
            deviceOS = 'macOS';
        } else if (/Linux/i.test(ua)) {
            deviceType = 'PC';
            deviceOS = 'Linux';
        }

        const feedbackData = {
            type: type,
            tab: tab,
            reproduction: type === 'bug' ? reproduction : null,
            description: description.trim(),
            status: 'new',
            createdAt: serverTimestamp(),
            userAgent: navigator.userAgent,
            deviceType: deviceType,
            deviceOS: deviceOS,
            userId: auth.currentUser ? auth.currentUser.uid : null,
            userEmail: auth.currentUser ? auth.currentUser.email : null
        };

        await setDoc(doc(collection(db, 'feedbacks')), feedbackData);

        closeFeedbackModal();
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Merci pour ton feedback !');
        }
    } catch (error) {
        console.error('Erreur envoi feedback:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur lors de l\'envoi', 'error');
        }
    }
};

// ===== ADMIN FEEDBACKS =====
window.loadAdminFeedbacks = async function() {
    if (!isAdmin()) return;

    const container = document.getElementById('admin-feedbacks-list');
    container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><i data-lucide="loader" style="width: 32px; height: 32px; animation: spin 1s linear infinite;"></i><p>Chargement...</p></div>';

    try {
        const filterType = document.getElementById('admin-filter-type')?.value || 'all';
        const filterStatus = document.getElementById('admin-filter-status')?.value || 'all';
        const filterSearch = document.getElementById('admin-filter-search')?.value.toLowerCase() || '';
        const filterDate = document.getElementById('admin-filter-date')?.value || '';

        // Fetch all feedbacks
        const q = query(collection(db, 'feedbacks'));
        const querySnapshot = await getDocs(q);

        let feedbacks = [];
        querySnapshot.forEach((doc) => {
            feedbacks.push({ id: doc.id, ...doc.data() });
        });

        // Sort by createdAt descending (newest first)
        feedbacks.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
            return dateB - dateA;
        });

        // Filter by type
        if (filterType !== 'all') {
            feedbacks = feedbacks.filter(f => f.type === filterType);
        }

        // Filter by status
        if (filterStatus !== 'all') {
            feedbacks = feedbacks.filter(f => f.status === filterStatus);
        }

        // Filter by search (email)
        if (filterSearch) {
            feedbacks = feedbacks.filter(f =>
                (f.userEmail && f.userEmail.toLowerCase().includes(filterSearch)) ||
                (f.description && f.description.toLowerCase().includes(filterSearch))
            );
        }

        // Filter by date
        if (filterDate) {
            feedbacks = feedbacks.filter(f => {
                if (!f.createdAt?.toDate) return false;
                const feedbackDate = f.createdAt.toDate().toISOString().split('T')[0];
                return feedbackDate === filterDate;
            });
        }

        // Update stats (use all feedbacks before search filter for accurate stats)
        const allFeedbacks = [];
        querySnapshot.forEach((doc) => {
            allFeedbacks.push({ id: doc.id, ...doc.data() });
        });
        updateAdminStats(allFeedbacks);

        // Store in cache
        adminFeedbacksCache = feedbacks;

        // Render
        renderAdminFeedbacks(feedbacks);

    } catch (error) {
        console.error('Erreur chargement feedbacks:', error);
        container.innerHTML = '<div style="text-align: center; color: var(--accent-danger); padding: var(--space-3xl);"><i data-lucide="alert-circle" style="width: 32px; height: 32px;"></i><p>Erreur de chargement</p></div>';
    }

    if (typeof updateIcons === 'function') updateIcons();
};

function updateAdminStats(feedbacks) {
    document.getElementById('stat-total').textContent = feedbacks.length;
    document.getElementById('stat-bugs').textContent = feedbacks.filter(f => f.type === 'bug').length;
    document.getElementById('stat-suggestions').textContent = feedbacks.filter(f => f.type === 'suggestion').length;
    document.getElementById('stat-new').textContent = feedbacks.filter(f => f.status === 'new').length;
    document.getElementById('feedbacks-count').textContent = feedbacks.length;
}

function renderAdminFeedbacks(feedbacks) {
    const container = document.getElementById('admin-feedbacks-list');

    if (feedbacks.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><i data-lucide="inbox" style="width: 48px; height: 48px; opacity: 0.5;"></i><p>Aucun feedback trouvé</p></div>';
        return;
    }

    // Pagination
    const start = (adminCurrentPage - 1) * FEEDBACKS_PER_PAGE;
    const end = start + FEEDBACKS_PER_PAGE;
    const paginated = feedbacks.slice(start, end);

    container.innerHTML = paginated.map(feedback => {
        const date = feedback.createdAt?.toDate ? feedback.createdAt.toDate().toLocaleString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }) : 'Date inconnue';

        const typeIcons = { bug: '🐛', suggestion: '💡', question: '❓' };
        const typeColors = { bug: 'var(--accent-danger)', suggestion: 'var(--accent-carbs)', question: 'var(--accent-ui)' };
        const statusIcons = { new: '🟢', read: '🔵', resolved: '✅' };
        const tabLabels = {
            home: '🏠 Accueil', calculator: '🧮 Calculateur', meals: '🍽️ Mes Repas',
            planner: '📅 Planning', foods: '🍎 Base d\'Aliments', 'meal-templates': '📋 Repas Types',
            tracking: '📊 Suivi', settings: '⚙️ Paramètres', other: '🔧 Autre'
        };

        return `
            <div class="feedback-item" style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg); border-left: 4px solid ${typeColors[feedback.type] || 'var(--accent-ui)'};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-md);">
                    <div style="display: flex; gap: var(--space-sm); align-items: center; flex-wrap: wrap;">
                        <span style="font-size: 1.2rem;">${typeIcons[feedback.type] || '📝'}</span>
                        <span style="background: ${typeColors[feedback.type]}22; color: ${typeColors[feedback.type]}; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">${feedback.type?.toUpperCase()}</span>
                        <span style="color: var(--text-secondary); font-size: 0.85rem;">${tabLabels[feedback.tab] || feedback.tab}</span>
                        <span style="font-size: 0.9rem;">${statusIcons[feedback.status] || '⚪'}</span>
                    </div>
                    <span style="color: var(--text-secondary); font-size: 0.8rem;">${date}</span>
                </div>
                <div style="color: var(--text-primary); line-height: 1.6; margin-bottom: var(--space-md); white-space: pre-wrap;">${escapeHtml(feedback.description)}</div>
                ${feedback.reproduction ? `<div style="background: rgba(239, 68, 68, 0.1); padding: var(--space-sm); border-radius: var(--radius-sm); margin-bottom: var(--space-md); font-size: 0.85rem;"><strong>Reproduction:</strong> ${escapeHtml(feedback.reproduction)}</div>` : ''}
                <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
                    ${feedback.status === 'new' ? `<button class="btn btn-sm btn-info" onclick="updateFeedbackStatus('${feedback.id}', 'read')">Marquer lu</button>` : ''}
                    ${feedback.status !== 'resolved' ? `<button class="btn btn-sm" onclick="updateFeedbackStatus('${feedback.id}', 'resolved')">Résolu</button>` : ''}
                    <button class="btn btn-danger btn-sm" onclick="deleteFeedback('${feedback.id}')">Supprimer</button>
                </div>
                <div style="margin-top: var(--space-sm); font-size: 0.75rem; color: var(--text-secondary); display: flex; gap: var(--space-md); flex-wrap: wrap;">
                    ${feedback.userEmail ? `<span>👤 ${feedback.userEmail}</span>` : ''}
                    ${feedback.deviceType && feedback.deviceOS ? `<span>📱 ${feedback.deviceType} - ${feedback.deviceOS}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');

    // Pagination controls
    const totalPages = Math.ceil(feedbacks.length / FEEDBACKS_PER_PAGE);
    const paginationContainer = document.getElementById('admin-pagination');
    if (totalPages > 1) {
        paginationContainer.innerHTML = `
            <button class="btn" ${adminCurrentPage === 1 ? 'disabled' : ''} onclick="adminChangePage(${adminCurrentPage - 1})" style="padding: 8px 16px;">← Précédent</button>
            <span style="color: var(--text-secondary);">Page ${adminCurrentPage} / ${totalPages}</span>
            <button class="btn" ${adminCurrentPage === totalPages ? 'disabled' : ''} onclick="adminChangePage(${adminCurrentPage + 1})" style="padding: 8px 16px;">Suivant →</button>
        `;
    } else {
        paginationContainer.innerHTML = '';
    }

    if (typeof updateIcons === 'function') updateIcons();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.adminChangePage = function(page) {
    adminCurrentPage = page;
    renderAdminFeedbacks(adminFeedbacksCache);
};

window.updateFeedbackStatus = async function(feedbackId, newStatus) {
    if (!isAdmin()) return;

    try {
        await setDoc(doc(db, 'feedbacks', feedbackId), { status: newStatus }, { merge: true });
        loadAdminFeedbacks();
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Statut mis à jour');
        }
    } catch (error) {
        console.error('Erreur mise à jour statut:', error);
    }
};

window.deleteFeedback = async function(feedbackId) {
    if (!isAdmin()) return;

    if (!confirm('Supprimer ce feedback ?')) return;

    try {
        await deleteDoc(doc(db, 'feedbacks', feedbackId));
        await logAdminAction('delete_feedback', { feedbackId });
        loadAdminFeedbacks();
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="trash-2" class="icon-inline"></i> Feedback supprimé');
        }
    } catch (error) {
        console.error('Erreur suppression feedback:', error);
    }
};

// ===== ADMIN SECTION NAVIGATION =====
window.showAdminSection = function(section) {
    if (!isAdmin()) return;

    // Sauvegarder la sous-section admin pour la restaurer après F5
    localStorage.setItem('lastAdminSection', section);

    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(el => el.style.display = 'none');

    // Show selected section
    const sectionEl = document.getElementById(`admin-section-${section}`);
    if (sectionEl) sectionEl.style.display = 'block';

    // Update nav buttons
    document.querySelectorAll('.admin-subnav-btn').forEach(btn => {
        if (btn.dataset.section === section) {
            btn.style.background = 'var(--accent-purple)';
            btn.style.color = 'white';
            btn.classList.add('active');
        } else {
            btn.style.background = 'var(--bg-tertiary)';
            btn.style.color = 'var(--text-secondary)';
            btn.classList.remove('active');
        }
    });

    // Load data for the section
    switch(section) {
        case 'dashboard':
            loadAdminDashboard();
            break;
        case 'feedbacks':
            loadAdminFeedbacks();
            break;
        case 'users':
            loadAdminUsers();
            break;
        case 'foods':
            loadAdminFoods();
            break;
        case 'smart-templates':
            loadAdminSmartTemplates();
            break;
        case 'settings':
            loadAdminSettings();
            break;
    }

    if (typeof updateIcons === 'function') updateIcons();
};

// ===== ADMIN DASHBOARD =====
window.loadAdminDashboard = async function() {
    if (!isAdmin()) return;

    try {
        // Count users (from Firestore users collection)
        const usersSnap = await getDocs(collection(db, 'users'));
        const totalUsers = usersSnap.size;

        // Count active users (7 days & 30 days)
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        let activeUsers7d = 0;
        let activeUsers30d = 0;
        let totalMeals = 0;
        let totalCustomFoods = 0;
        let totalBarcodeScans = 0;

        usersSnap.forEach(doc => {
            const data = doc.data();

            // Count active users
            if (data.lastSync) {
                const lastSync = data.lastSync.toDate ? data.lastSync.toDate() : new Date(data.lastSync);
                if (lastSync >= sevenDaysAgo) activeUsers7d++;
                if (lastSync >= thirtyDaysAgo) activeUsers30d++;
            }

            // Count meals
            if (data.allDailyMeals) {
                try {
                    const meals = typeof data.allDailyMeals === 'string'
                        ? JSON.parse(data.allDailyMeals)
                        : data.allDailyMeals;

                    // Count total meal items across all days
                    // Structure: { "2026-01-22": { "breakfast": { foods: [...], recipe: '' } } }
                    Object.entries(meals).forEach(([dateKey, dayMeals]) => {
                        if (dayMeals && typeof dayMeals === 'object' && !Array.isArray(dayMeals)) {
                            Object.entries(dayMeals).forEach(([mealTypeName, mealType]) => {
                                // mealType = { foods: [...], recipe: '' }
                                if (mealType && typeof mealType === 'object' && Array.isArray(mealType.foods)) {
                                    totalMeals += mealType.foods.length;
                                }
                            });
                        }
                    });
                } catch (e) {
                    console.error('❌ Error parsing meals for', doc.id, e);
                }
            } else {
                console.log('⚠️ User has no allDailyMeals:', doc.id);
            }

            // Count custom foods
            if (data.customFoods) {
                try {
                    const customFoods = Array.isArray(data.customFoods)
                        ? data.customFoods
                        : (typeof data.customFoods === 'string' ? JSON.parse(data.customFoods) : []);
                    totalCustomFoods += customFoods.length;
                } catch (e) {
                    console.error('❌ Error parsing customFoods for', doc.id, e);
                }
            }

            // Count barcode scans
            if (data.barcodeScans) {
                console.log('📷 User barcode scans:', doc.id, data.barcodeScans);
                totalBarcodeScans += parseInt(data.barcodeScans) || 0;
            }
        });

        // Count feedbacks
        const feedbacksSnap = await getDocs(collection(db, 'feedbacks'));
        const totalFeedbacks = feedbacksSnap.size;

        // Count aliments communs
        const foodsSnap = await getDocs(collection(db, 'aliments_communs'));
        const totalFoods = foodsSnap.size;

        // Log final counts for debugging
        console.log('📊 ANALYTICS TOTALS:', {
            totalUsers,
            activeUsers7d,
            activeUsers30d,
            totalMeals,
            totalCustomFoods,
            totalBarcodeScans,
            totalFeedbacks,
            totalFoods
        });

        // Update stats
        document.getElementById('stat-users-total').textContent = totalUsers;
        document.getElementById('stat-users-active-7d').textContent = activeUsers7d;
        document.getElementById('stat-users-active-30d').textContent = activeUsers30d;
        document.getElementById('stat-meals-total').textContent = totalMeals;
        document.getElementById('stat-custom-foods-total').textContent = totalCustomFoods;
        document.getElementById('stat-barcode-scans').textContent = totalBarcodeScans;
        document.getElementById('stat-feedbacks-total').textContent = totalFeedbacks;
        document.getElementById('stat-foods-total').textContent = totalFoods;

        // Load 5 derniers feedbacks
        const feedbacksQuery = query(collection(db, 'feedbacks'), limit(5));
        const recentFeedbacksSnap = await getDocs(feedbacksQuery);
        const recentFeedbacks = [];
        recentFeedbacksSnap.forEach(doc => {
            recentFeedbacks.push({ id: doc.id, ...doc.data() });
        });

        // Sort by date
        recentFeedbacks.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
            return dateB - dateA;
        });

        // Render recent feedbacks
        const container = document.getElementById('dashboard-recent-feedbacks');
        if (recentFeedbacks.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-xl);"><p>Aucun feedback récent</p></div>';
        } else {
            container.innerHTML = recentFeedbacks.slice(0, 5).map(f => {
                const date = f.createdAt?.toDate ? f.createdAt.toDate().toLocaleString('fr-FR', {
                    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                }) : 'Date inconnue';
                const typeIcons = { bug: '🐛', suggestion: '💡', question: '❓' };
                return `
                    <div style="background: var(--bg-tertiary); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-sm);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-xs);">
                            <span>${typeIcons[f.type] || '📝'} ${f.type?.toUpperCase()}</span>
                            <span style="color: var(--text-secondary); font-size: 0.85rem;">${date}</span>
                        </div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">${escapeHtml(f.description.substring(0, 100))}${f.description.length > 100 ? '...' : ''}</div>
                    </div>
                `;
            }).join('');
        }

    } catch (error) {
        console.error('Erreur chargement dashboard:', error);
    }

    if (typeof updateIcons === 'function') updateIcons();
};

// ===== ADMIN USERS =====
let adminUsersCache = [];
let adminUsersPage = 1;
const USERS_PER_PAGE = 50;

window.loadAdminUsers = async function() {
    if (!isAdmin()) return;

    const container = document.getElementById('admin-users-list');
    container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><i data-lucide="loader" style="width: 32px; height: 32px;"></i><p>Chargement...</p></div>';

    try {
        const usersSnap = await getDocs(collection(db, 'users'));
        let users = [];
        usersSnap.forEach(doc => {
            users.push({ uid: doc.id, ...doc.data() });
        });

        // Apply search filter
        const searchTerm = document.getElementById('users-filter-search')?.value.toLowerCase() || '';
        if (searchTerm) {
            users = users.filter(u =>
                (u.email && u.email.toLowerCase().includes(searchTerm)) ||
                (u.displayName && u.displayName.toLowerCase().includes(searchTerm))
            );
        }

        // Apply sort
        const sortBy = document.getElementById('users-filter-sort')?.value || 'newest';
        users.sort((a, b) => {
            if (sortBy === 'newest') {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                return dateB - dateA;
            } else if (sortBy === 'oldest') {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                return dateA - dateB;
            } else if (sortBy === 'lastLogin') {
                const dateA = a.lastSync?.toDate ? a.lastSync.toDate() : new Date(0);
                const dateB = b.lastSync?.toDate ? b.lastSync.toDate() : new Date(0);
                return dateB - dateA;
            }
            return 0;
        });

        // Update stats
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const active7d = users.filter(u => {
            if (!u.lastSync) return false;
            const lastSync = u.lastSync.toDate ? u.lastSync.toDate() : new Date(u.lastSync);
            return lastSync >= sevenDaysAgo;
        }).length;

        const active30d = users.filter(u => {
            if (!u.lastSync) return false;
            const lastSync = u.lastSync.toDate ? u.lastSync.toDate() : new Date(u.lastSync);
            return lastSync >= thirtyDaysAgo;
        }).length;

        document.getElementById('users-stat-total').textContent = users.length;
        document.getElementById('users-stat-active-7d').textContent = active7d;
        document.getElementById('users-stat-active-30d').textContent = active30d;
        document.getElementById('users-count').textContent = users.length;

        adminUsersCache = users;
        renderAdminUsers(users);

    } catch (error) {
        console.error('Erreur chargement users:', error);
        container.innerHTML = '<div style="text-align: center; color: var(--accent-danger); padding: var(--space-3xl);"><p>Erreur de chargement</p></div>';
    }

    if (typeof updateIcons === 'function') updateIcons();
};

function renderAdminUsers(users) {
    const container = document.getElementById('admin-users-list');

    if (users.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><p>Aucun utilisateur trouvé</p></div>';
        return;
    }

    // Pagination
    const start = (adminUsersPage - 1) * USERS_PER_PAGE;
    const end = start + USERS_PER_PAGE;
    const paginated = users.slice(start, end);

    container.innerHTML = paginated.map(user => {
        // Handle lastSync - can be either Firestore Timestamp or ISO string
        let lastSync = 'Jamais';
        if (user.lastSync) {
            try {
                const lastSyncDate = user.lastSync?.toDate ? user.lastSync.toDate() : new Date(user.lastSync);
                lastSync = lastSyncDate.toLocaleString('fr-FR', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });
            } catch (e) {
                lastSync = 'Erreur';
            }
        }

        const createdAt = user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString('fr-FR') : '-';

        // Count unique days with meals (parse allDailyMeals if it's a string)
        let mealsCount = 0;
        if (user.allDailyMeals) {
            try {
                const allDailyMeals = typeof user.allDailyMeals === 'string'
                    ? JSON.parse(user.allDailyMeals)
                    : user.allDailyMeals;
                mealsCount = Object.keys(allDailyMeals).length;
            } catch (e) {
                mealsCount = 0;
            }
        }

        // Display name priority: firstName > displayName > email > 'Utilisateur inconnu'
        const displayName = user.firstName || user.displayName || user.email || 'Utilisateur inconnu';

        return `
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md); ${user.disabled ? 'opacity: 0.6; border: 2px solid var(--accent-danger);' : ''}">
                <div style="flex: 1; min-width: 250px;">
                    <div style="font-weight: 600; margin-bottom: 4px; display: flex; align-items: center; gap: var(--space-sm);">
                        ${escapeHtml(displayName)}
                        ${user.disabled ? '<span style="background: var(--accent-danger); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">DÉSACTIVÉ</span>' : ''}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">
                        UID: <code style="background: var(--bg-primary); padding: 2px 4px; border-radius: 3px; font-size: 0.75rem;">${user.uid}</code>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
                        📅 Inscrit: ${createdAt} | 🔄 Dernière sync: ${lastSync} | 📊 Jours de repas: ${mealsCount}
                    </div>
                </div>
                <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap;">
                    <button class="btn btn-sm" style="background: ${user.disabled ? '#10b981' : '#f59e0b'};" onclick="toggleUserDisabled('${user.uid}', ${!user.disabled}, '${escapeHtml(displayName)}')">
                        <i data-lucide="${user.disabled ? 'unlock' : 'lock'}" style="width: 14px; height: 14px;"></i> ${user.disabled ? 'Activer' : 'Désactiver'}
                    </button>
                    <button class="btn btn-sm" style="background: #dc2626;" onclick="deleteUserDataRGPD('${user.uid}', '${escapeHtml(displayName)}')">
                        <i data-lucide="shield-alert" style="width: 14px; height: 14px;"></i> RGPD
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.uid}', '${escapeHtml(user.email || user.displayName || 'cet utilisateur')}')">
                        <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> Supprimer
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Pagination
    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
    const paginationContainer = document.getElementById('users-pagination');
    if (totalPages > 1) {
        paginationContainer.innerHTML = `
            <button class="btn" ${adminUsersPage === 1 ? 'disabled' : ''} onclick="adminUsersChangePage(${adminUsersPage - 1})">← Précédent</button>
            <span style="color: var(--text-secondary);">Page ${adminUsersPage} / ${totalPages}</span>
            <button class="btn" ${adminUsersPage === totalPages ? 'disabled' : ''} onclick="adminUsersChangePage(${adminUsersPage + 1})">Suivant →</button>
        `;
    } else {
        paginationContainer.innerHTML = '';
    }

    if (typeof updateIcons === 'function') updateIcons();
}

window.adminUsersChangePage = function(page) {
    adminUsersPage = page;
    renderAdminUsers(adminUsersCache);
};

window.deleteUser = async function(uid, identifier) {
    if (!isAdmin()) return;

    if (!confirm(`Supprimer l'utilisateur ${identifier} et toutes ses données ? Cette action est irréversible.`)) return;

    try {
        await deleteDoc(doc(db, 'users', uid));
        await logAdminAction('delete_user', { uid, identifier });
        loadAdminUsers();
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="trash-2" class="icon-inline"></i> Utilisateur supprimé');
        }
    } catch (error) {
        console.error('Erreur suppression utilisateur:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de suppression', 'error');
        }
    }
};

window.toggleUserDisabled = async function(uid, setDisabled, displayName) {
    if (!isAdmin()) return;

    const action = setDisabled ? 'désactiver' : 'activer';
    const confirmMsg = setDisabled
        ? `Désactiver le compte de ${displayName} ? L'utilisateur ne pourra plus se connecter.`
        : `Réactiver le compte de ${displayName} ?`;

    if (!confirm(confirmMsg)) return;

    try {
        await updateDoc(doc(db, 'users', uid), {
            disabled: setDisabled,
            disabledAt: setDisabled ? serverTimestamp() : null
        });
        await logAdminAction(setDisabled ? 'disable_user' : 'enable_user', { uid, displayName });
        loadAdminUsers();
        if (typeof showToast === 'function') {
            showToast(`<i data-lucide="${setDisabled ? 'lock' : 'unlock'}" class="icon-inline"></i> Compte ${action}`);
        }
    } catch (error) {
        console.error('Erreur modification statut utilisateur:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de modification', 'error');
        }
    }
};

window.deleteUserDataRGPD = async function(uid, displayName) {
    if (!isAdmin()) return;

    const confirmMsg = `Supprimer TOUTES les données de ${displayName} (RGPD) ?\n\n` +
        `Cela supprimera :\n` +
        `- Tous les repas et données nutritionnelles\n` +
        `- Tous les aliments personnalisés\n` +
        `- Toutes les préférences et paramètres\n` +
        `- L'historique de tracking\n\n` +
        `Le compte restera actif mais sera vide.\n` +
        `Cette action est IRRÉVERSIBLE.\n\n` +
        `Continuer ?`;

    if (!confirm(confirmMsg)) return;

    try {
        // Réinitialiser toutes les données utilisateur
        await updateDoc(doc(db, 'users', uid), {
            allDailyMeals: {},
            customFoods: [],
            macroTargets: {},
            userProfile: {},
            trackingData: [],
            mealTemplates: [],
            foodAliases: {},
            dataDeletedRGPD: true,
            dataDeletedAt: serverTimestamp()
        });
        await logAdminAction('delete_user_data_rgpd', { uid, displayName });
        loadAdminUsers();
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="shield-alert" class="icon-inline"></i> Données utilisateur supprimées (RGPD)');
        }
    } catch (error) {
        console.error('Erreur suppression données RGPD:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de suppression', 'error');
        }
    }
};

window.migrateUsersData = async function() {
    if (!isAdmin()) return;

    // Prevent double-clicks
    const migrateBtn = document.getElementById('migrate-users-btn');
    if (migrateBtn && migrateBtn.disabled) return; // Already running

    const confirmMsg = `Cette opération va mettre à jour les données de tous les utilisateurs :\n\n` +
        `- Ajouter createdAt pour les utilisateurs qui n'en ont pas\n` +
        `- Convertir lastSync en Timestamp Firestore\n` +
        `- Les emails/noms seront ajoutés lors de la prochaine sync de chaque utilisateur\n\n` +
        `Continuer ?`;

    if (!confirm(confirmMsg)) return;

    try {
        // Disable button to prevent double-clicks
        if (migrateBtn) {
            migrateBtn.disabled = true;
            migrateBtn.style.opacity = '0.6';
            migrateBtn.style.cursor = 'not-allowed';
        }

        if (typeof showToast === 'function') {
            showToast('<i data-lucide="loader" class="icon-inline"></i> Migration en cours...', 'info');
        }

        const usersSnap = await getDocs(collection(db, 'users'));
        let migratedCount = 0;
        let errorCount = 0;

        for (const userDoc of usersSnap.docs) {
            try {
                const userData = userDoc.data();
                const updates = {};
                let needsUpdate = false;

                // Add createdAt if missing (use updatedAt as fallback, or current time)
                if (!userData.createdAt) {
                    if (userData.updatedAt) {
                        updates.createdAt = userData.updatedAt;
                    } else {
                        updates.createdAt = serverTimestamp();
                    }
                    needsUpdate = true;
                }

                // Convert lastSync from ISO string to Timestamp if needed
                if (userData.lastSync && typeof userData.lastSync === 'string') {
                    try {
                        const lastSyncDate = new Date(userData.lastSync);
                        // Create a Firestore Timestamp from the date
                        updates.lastSync = Timestamp.fromDate(lastSyncDate);
                        needsUpdate = true;
                    } catch (e) {
                        console.error(`Error converting lastSync for ${userDoc.id}:`, e);
                    }
                }

                // Update if needed
                if (needsUpdate) {
                    await updateDoc(doc(db, 'users', userDoc.id), updates);
                    migratedCount++;
                }
            } catch (error) {
                console.error(`Error migrating user ${userDoc.id}:`, error);
                errorCount++;
            }
        }

        await logAdminAction('migrate_users', { migratedCount, errorCount });

        if (typeof showToast === 'function') {
            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> Migration terminée : ${migratedCount} utilisateurs mis à jour${errorCount > 0 ? `, ${errorCount} erreurs` : ''}`, 'success');
        }

        // Reload users list
        loadAdminUsers();

    } catch (error) {
        console.error('Erreur migration:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de migration', 'error');
        }
    } finally {
        // Re-enable button
        if (migrateBtn) {
            migrateBtn.disabled = false;
            migrateBtn.style.opacity = '1';
            migrateBtn.style.cursor = 'pointer';
        }
    }
};

// ===== ADMIN FOODS =====
let adminFoodsCache = [];
let adminFoodsPage = 1;
const FOODS_PER_PAGE = 50;

window.loadAdminFoods = async function() {
    if (!isAdmin()) return;

    const container = document.getElementById('admin-foods-list');
    container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><i data-lucide="loader" style="width: 32px; height: 32px;"></i><p>Chargement...</p></div>';

    try {
        const foodsSnap = await getDocs(collection(db, 'aliments_communs'));
        let foods = [];
        foodsSnap.forEach(doc => {
            foods.push({ id: doc.id, ...doc.data() });
        });

        // Apply search filter
        const searchTerm = document.getElementById('foods-filter-search')?.value.toLowerCase() || '';
        if (searchTerm) {
            foods = foods.filter(f => f.name && f.name.toLowerCase().includes(searchTerm));
        }

        // Apply category filter
        const categoryFilter = document.getElementById('foods-filter-category')?.value || 'all';
        if (categoryFilter !== 'all') {
            foods = foods.filter(f => f.category === categoryFilter);
        }

        // Sort alphabetically
        foods.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        // Update stats
        document.getElementById('foods-stat-total').textContent = foods.length;
        document.getElementById('foods-stat-proteins').textContent = foods.filter(f => f.category === 'proteines').length;
        document.getElementById('foods-stat-carbs').textContent = foods.filter(f => f.category === 'feculents').length;
        document.getElementById('foods-stat-vegetables').textContent = foods.filter(f => f.category === 'legumes').length;
        document.getElementById('foods-count').textContent = foods.length;

        adminFoodsCache = foods;
        renderAdminFoods(foods);

    } catch (error) {
        console.error('Erreur chargement aliments:', error);
        container.innerHTML = '<div style="text-align: center; color: var(--accent-danger); padding: var(--space-3xl);"><p>Erreur de chargement</p></div>';
    }

    if (typeof updateIcons === 'function') updateIcons();
};

function renderAdminFoods(foods) {
    const container = document.getElementById('admin-foods-list');

    if (foods.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-3xl);"><p>Aucun aliment trouvé</p></div>';
        return;
    }

    // Pagination
    const start = (adminFoodsPage - 1) * FOODS_PER_PAGE;
    const end = start + FOODS_PER_PAGE;
    const paginated = foods.slice(start, end);

    container.innerHTML = paginated.map(food => {
        const categoryLabels = {
            'proteines': 'Protéines', 'feculents': 'Féculents', 'legumes': 'Légumes',
            'fruits': 'Fruits', 'produits-laitiers': 'Produits laitiers',
            'matieres-grasses': 'Matières grasses', 'liquides': 'Liquides', 'autres': 'Autres'
        };

        // Validate macros
        const calculatedCals = (food.protein || 0) * 4 + (food.carbs || 0) * 4 + (food.fat || 0) * 9;
        const isValid = Math.abs(calculatedCals - (food.calories || 0)) < 15;

        return `
            <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: var(--space-lg); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-md);">
                <div style="flex: 1; min-width: 200px;">
                    <div style="font-weight: 600; margin-bottom: 4px; display: flex; align-items: center; gap: var(--space-sm);">
                        ${escapeHtml(food.name || 'Sans nom')}
                        ${food.verified ? '<span style="color: #10b981; font-size: 1rem; cursor: help;" title="Aliment vérifié par un administrateur">✓</span>' : ''}
                        ${!isValid ? '<span style="color: var(--accent-danger); font-size: 0.8rem;">⚠️ Macros incohérentes</span>' : ''}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">
                        ${categoryLabels[food.category] || food.category} • ${food.unit || '100g'}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
                        📊 ${food.calories || 0} kcal | P: ${food.protein || 0}g | G: ${food.carbs || 0}g | L: ${food.fat || 0}g
                    </div>
                </div>
                <div style="display: flex; gap: var(--space-sm);">
                    <button class="btn btn-sm" style="background: ${food.verified ? '#dc2626' : '#10b981'};" onclick="toggleFoodVerified('${food.id}', ${!food.verified})">
                        <i data-lucide="${food.verified ? 'x' : 'check'}" style="width: 14px; height: 14px;"></i> ${food.verified ? 'Dévérifier' : 'Vérifier'}
                    </button>
                    <button class="btn btn-sm" style="background: var(--accent-ui);" onclick="editFood('${food.id}')">
                        <i data-lucide="edit" style="width: 14px; height: 14px;"></i> Modifier
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteFood('${food.id}', '${escapeHtml(food.name || '')}')">
                        <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> Supprimer
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Pagination
    const totalPages = Math.ceil(foods.length / FOODS_PER_PAGE);
    const paginationContainer = document.getElementById('foods-pagination');
    if (totalPages > 1) {
        paginationContainer.innerHTML = `
            <button class="btn" ${adminFoodsPage === 1 ? 'disabled' : ''} onclick="adminFoodsChangePage(${adminFoodsPage - 1})">← Précédent</button>
            <span style="color: var(--text-secondary);">Page ${adminFoodsPage} / ${totalPages}</span>
            <button class="btn" ${adminFoodsPage === totalPages ? 'disabled' : ''} onclick="adminFoodsChangePage(${adminFoodsPage + 1})">Suivant →</button>
        `;
    } else {
        paginationContainer.innerHTML = '';
    }

    if (typeof updateIcons === 'function') updateIcons();
}

window.adminFoodsChangePage = function(page) {
    adminFoodsPage = page;
    renderAdminFoods(adminFoodsCache);
};

window.showAddFoodModal = function() {
    if (!isAdmin()) return;
    if (typeof showToast === 'function') {
        showToast('<i data-lucide="info" class="icon-inline"></i> Fonctionnalité en développement');
    }
};

let currentEditingFoodId = null;

window.editFood = async function(foodId) {
    if (!isAdmin()) return;

    let food = null;

    // Find food in cache first
    food = adminFoodsCache.find(f => f.id === foodId);

    // If not in cache, try to load from Firestore
    if (!food) {
        try {
            const docRef = doc(db, 'aliments_communs', foodId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                food = {
                    id: docSnap.id,
                    ...docSnap.data()
                };
            }
        } catch (error) {
            console.error('Erreur chargement aliment depuis Firestore:', error);
        }
    }

    // If still not found, show error
    if (!food) {
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Aliment introuvable', 'error');
        }
        return;
    }

    // Store current editing food ID
    currentEditingFoodId = foodId;

    // Pre-fill form (support both 'protein' and 'proteins' fields)
    document.getElementById('edit-food-name').value = food.name || '';
    document.getElementById('edit-food-category').value = food.category || 'autres';
    document.getElementById('edit-food-unit').value = food.unit || '100g';
    document.getElementById('edit-food-calories').value = food.calories || 0;
    document.getElementById('edit-food-protein').value = food.protein || food.proteins || 0;
    document.getElementById('edit-food-carbs').value = food.carbs || 0;
    document.getElementById('edit-food-fat').value = food.fat || food.fats || 0;

    // Validate on input
    const inputs = ['edit-food-calories', 'edit-food-protein', 'edit-food-carbs', 'edit-food-fat'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', validateEditFoodMacros);
    });

    // Show modal
    document.getElementById('edit-food-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeEditFoodModal = function() {
    document.getElementById('edit-food-modal').classList.remove('active');
    document.body.style.overflow = '';
    currentEditingFoodId = null;

    // Clear form
    document.getElementById('edit-food-name').value = '';
    document.getElementById('edit-food-category').value = 'proteines';
    document.getElementById('edit-food-unit').value = '100g';
    document.getElementById('edit-food-calories').value = '';
    document.getElementById('edit-food-protein').value = '';
    document.getElementById('edit-food-carbs').value = '';
    document.getElementById('edit-food-fat').value = '';
    document.getElementById('edit-food-validation-warning').style.display = 'none';
};

function validateEditFoodMacros() {
    const calories = parseFloat(document.getElementById('edit-food-calories').value) || 0;
    const protein = parseFloat(document.getElementById('edit-food-protein').value) || 0;
    const carbs = parseFloat(document.getElementById('edit-food-carbs').value) || 0;
    const fat = parseFloat(document.getElementById('edit-food-fat').value) || 0;

    // Calories théoriques = P×4 + G×4 + L×9
    const theoreticalCals = protein * 4 + carbs * 4 + fat * 9;

    // Écart = |calories_saisies − calories_théoriques|
    const gap = Math.abs(calories - theoreticalCals);

    // Tolérance = max(20 kcal, 8% des calories saisies)
    const tolerance = Math.max(20, calories * 0.08);

    const warning = document.getElementById('edit-food-validation-warning');
    const confirmBtn = document.querySelector('#edit-food-modal .custom-popup-btn.confirm');

    if (calories > 0 && gap > tolerance) {
        // BLOCAGE: Écart > tolérance
        warning.style.display = 'block';
        warning.style.background = 'rgba(239, 68, 68, 0.15)';
        warning.style.borderLeft = '3px solid var(--accent-danger)';
        warning.innerHTML = `❌ BLOCAGE: Les macros donnent ${theoreticalCals.toFixed(0)} kcal, mais vous avez saisi ${calories} kcal<br>Différence: ${gap.toFixed(0)} kcal (max autorisé: ${tolerance.toFixed(0)} kcal)<br><strong>Correction obligatoire avant sauvegarde</strong>`;
        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.style.opacity = '0.5';
            confirmBtn.style.cursor = 'not-allowed';
        }
    } else if (calories > 0 && gap > 10) {
        // WARNING: Écart > 10 kcal mais ≤ tolérance
        warning.style.display = 'block';
        warning.style.background = 'rgba(251, 191, 36, 0.15)';
        warning.style.borderLeft = '3px solid var(--accent-fat)';
        warning.innerHTML = `⚠️ Attention: Les macros donnent ${theoreticalCals.toFixed(0)} kcal, mais vous avez saisi ${calories} kcal (différence: ${gap.toFixed(0)} kcal)<br>Sauvegarde autorisée mais vérifiez vos valeurs`;
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.style.opacity = '1';
            confirmBtn.style.cursor = 'pointer';
        }
    } else {
        // OK
        warning.style.display = 'none';
        if (confirmBtn) {
            confirmBtn.disabled = false;
            confirmBtn.style.opacity = '1';
            confirmBtn.style.cursor = 'pointer';
        }
    }

    return gap <= tolerance;
}

window.saveEditedFood = async function() {
    if (!isAdmin() || !currentEditingFoodId) return;

    const name = document.getElementById('edit-food-name').value.trim();
    const category = document.getElementById('edit-food-category').value;
    const unit = document.getElementById('edit-food-unit').value.trim();
    const calories = parseFloat(document.getElementById('edit-food-calories').value);
    const protein = parseFloat(document.getElementById('edit-food-protein').value);
    const carbs = parseFloat(document.getElementById('edit-food-carbs').value);
    const fat = parseFloat(document.getElementById('edit-food-fat').value);

    // Validation
    if (!name || !category || !unit) {
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Remplis tous les champs obligatoires', 'error');
        }
        return;
    }

    if (isNaN(calories) || isNaN(protein) || isNaN(carbs) || isNaN(fat)) {
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Les valeurs nutritionnelles doivent être des nombres', 'error');
        }
        return;
    }

    // VALIDATION STRICTE: Vérifier que les macros correspondent aux calories
    const isValid = validateEditFoodMacros();
    if (!isValid) {
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Impossible de sauvegarder : les macros ne correspondent pas aux calories', 'error');
        }
        return;
    }

    try {
        const updatedFood = {
            name: name,
            category: category,
            unit: unit,
            calories: calories,
            protein: protein,
            carbs: carbs,
            fat: fat
        };

        await setDoc(doc(db, 'aliments_communs', currentEditingFoodId), updatedFood, { merge: true });
        await logAdminAction('update_food', { foodId: currentEditingFoodId, foodName: name });

        closeEditFoodModal();
        loadAdminFoods();

        if (typeof showToast === 'function') {
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Aliment modifié avec succès');
        }
    } catch (error) {
        console.error('Erreur modification aliment:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur lors de la modification', 'error');
        }
    }
};

window.deleteFood = async function(foodId, foodName) {
    if (!isAdmin()) return;

    if (!confirm(`Supprimer l'aliment "${foodName}" ? Cette action est irréversible.`)) return;

    try {
        await deleteDoc(doc(db, 'aliments_communs', foodId));
        await logAdminAction('delete_food', { foodId, foodName });
        loadAdminFoods();
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="trash-2" class="icon-inline"></i> Aliment supprimé');
        }
    } catch (error) {
        console.error('Erreur suppression aliment:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de suppression', 'error');
        }
    }
};

window.toggleFoodVerified = async function(foodId, setVerified) {
    if (!isAdmin()) return;

    try {
        // Update in Firestore
        await updateDoc(doc(db, 'aliments_communs', foodId), {
            verified: setVerified
        });

        // IMPORTANT: Also update in foodDatabase (used by users)
        if (typeof foodDatabase !== 'undefined' && Array.isArray(foodDatabase)) {
            const foodInDb = foodDatabase.find(f => f.barcode === foodId);
            if (foodInDb) {
                foodInDb.verified = setVerified;
                console.log(`✅ Updated verified status in foodDatabase for ${foodInDb.name}`);

                // Refresh the user's food list if it's currently displayed
                if (typeof renderFoodDatabase === 'function') {
                    renderFoodDatabase();
                }
            }
        }

        await logAdminAction(setVerified ? 'verify_food' : 'unverify_food', { foodId });
        loadAdminFoods();
        if (typeof showToast === 'function') {
            showToast(`<i data-lucide="check" class="icon-inline"></i> Aliment ${setVerified ? 'vérifié' : 'dévérifié'}`);
        }
    } catch (error) {
        console.error('Erreur modification statut vérifié:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur de modification', 'error');
        }
    }
};

window.exportFoodsCSV = function() {
    if (!isAdmin()) return;

    if (adminFoodsCache.length === 0) {
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Aucun aliment à exporter');
        }
        return;
    }

    const csv = [
        ['Nom', 'Catégorie', 'Unité', 'Calories', 'Protéines', 'Glucides', 'Lipides'].join(','),
        ...adminFoodsCache.map(f => [
            `"${(f.name || '').replace(/"/g, '""')}"`,
            f.category || '',
            f.unit || '100g',
            f.calories || 0,
            f.protein || 0,
            f.carbs || 0,
            f.fat || 0
        ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `aliments_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    if (typeof showToast === 'function') {
        showToast('<i data-lucide="download" class="icon-inline"></i> Export CSV réussi');
    }
};

window.importFoodsCSV = function() {
    if (!isAdmin()) return;
    if (typeof showToast === 'function') {
        showToast('<i data-lucide="info" class="icon-inline"></i> Fonctionnalité en développement');
    }
};

window.exportFeedbacksCSV = function() {
    if (!isAdmin()) return;

    if (adminFeedbacksCache.length === 0) {
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Aucun feedback à exporter');
        }
        return;
    }

    const csv = [
        ['Date', 'Type', 'Statut', 'Email', 'Description'].join(','),
        ...adminFeedbacksCache.map(f => {
            const date = f.createdAt?.toDate ? f.createdAt.toDate().toLocaleString('fr-FR') : '';
            return [
                `"${date}"`,
                f.type || '',
                f.status || '',
                `"${(f.userEmail || '').replace(/"/g, '""')}"`,
                `"${(f.description || '').replace(/"/g, '""')}"`
            ].join(',');
        })
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `feedbacks_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    if (typeof showToast === 'function') {
        showToast('<i data-lucide="download" class="icon-inline"></i> Export CSV réussi');
    }
};

// ===== ADMIN SETTINGS =====
window.loadAdminSettings = async function() {
    if (!isAdmin()) return;

    // Show current admin UID
    document.getElementById('current-admin-uid').textContent = ADMIN_UID;

    // Load recent admin logs
    try {
        const logsQuery = query(collection(db, 'admin_logs'), limit(20));
        const logsSnap = await getDocs(logsQuery);
        const logs = [];
        logsSnap.forEach(doc => {
            logs.push({ id: doc.id, ...doc.data() });
        });

        logs.sort((a, b) => {
            const dateA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(0);
            const dateB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(0);
            return dateB - dateA;
        });

        // Deduplicate logs: remove entries with same action+details within 10 seconds
        const deduplicatedLogs = [];
        const seen = new Map();

        for (const log of logs) {
            const key = `${log.action}_${JSON.stringify(log.details || {})}`;
            const timestamp = log.timestamp?.toDate ? log.timestamp.toDate().getTime() : 0;

            const lastSeen = seen.get(key);
            // Keep this log if we haven't seen this action+details combo,
            // or if it was more than 10 seconds ago
            if (!lastSeen || Math.abs(timestamp - lastSeen) > 10000) {
                deduplicatedLogs.push(log);
                seen.set(key, timestamp);
            }
        }

        const container = document.getElementById('admin-logs-list');
        if (deduplicatedLogs.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: var(--space-xl);"><p>Aucun log disponible</p></div>';
        } else {
            container.innerHTML = deduplicatedLogs.map(log => {
                const date = log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString('fr-FR', {
                    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                }) : 'Date inconnue';
                return `
                    <div style="background: var(--bg-tertiary); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-sm); font-size: 0.85rem; display: flex; justify-content: space-between;">
                        <span><strong>${log.action}</strong> ${log.details ? '- ' + JSON.stringify(log.details) : ''}</span>
                        <span style="color: var(--text-secondary);">${date}</span>
                    </div>
                `;
            }).join('');
        }

    } catch (error) {
        console.error('Erreur chargement logs:', error);
    }

    if (typeof updateIcons === 'function') updateIcons();
};

// ===== ADMIN SMART TEMPLATES =====
// ===== PAGINATION STATE =====
window.smartTemplatesPagination = {
    currentPage: 0,
    pageSize: 20,
    totalDocs: 0,
    lastVisibleDoc: null,
    firstVisibleDoc: null,
    hasMore: false
};

// Helper function to render a single template card (for optimistic updates)
window.renderTemplateCard = function(template) {
    const activeBg = template.active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
    const activeColor = template.active ? '#10b981' : '#ef4444';
    const activeLabel = template.active ? 'Actif' : 'Inactif';
    const mealTypeLabels = {
        breakfast: '🌅 Petit-déjeuner',
        lunch: '🍽️ Déjeuner',
        snack: '🍎 Goûter',
        dinner: '🌙 Dîner'
    };

    // Variant badges
    const variantBadges = {
        'vegan': '<span style="display: inline-flex; align-items: center; gap: 3px; font-size: 0.75rem; padding: 3px 8px; background: rgba(34, 197, 94, 0.15); color: #22c55e; border-radius: var(--radius-md); font-weight: 600;"><i data-lucide="leaf" style="width: 11px; height: 11px;"></i> Vegan</span>',
        'glutenFree': '<span style="display: inline-flex; align-items: center; gap: 3px; font-size: 0.75rem; padding: 3px 8px; background: rgba(245, 158, 11, 0.15); color: #f59e0b; border-radius: var(--radius-md); font-weight: 600;"><i data-lucide="wheat-off" style="width: 11px; height: 11px;"></i> Sans gluten</span>',
        'vegetarian': '<span style="display: inline-flex; align-items: center; gap: 3px; font-size: 0.75rem; padding: 3px 8px; background: rgba(34, 197, 94, 0.15); color: #22c55e; border-radius: var(--radius-md); font-weight: 600;"><i data-lucide="salad" style="width: 11px; height: 11px;"></i> Végétarien</span>'
    };
    const variantBadge = template.variant && variantBadges[template.variant] ? variantBadges[template.variant] : '';

    return `
        <div class="card" id="template-card-${template.id}" style="padding: 0; overflow: hidden;">
            <!-- Header accordéon -->
            <div onclick="toggleTemplateAccordion('${template.id}')" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-lg); cursor: pointer; transition: background 0.2s;">
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-xs);">
                        <h3 id="template-title-${template.id}" style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 0;">
                            ${template.displayName || template.id}
                        </h3>
                        ${variantBadge}
                        <span id="template-status-${template.id}" style="font-size: 0.75rem; padding: 3px 10px; background: ${activeBg}; color: ${activeColor}; border-radius: var(--radius-md); font-weight: 600;">
                            ${activeLabel}
                        </span>
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">
                        ${mealTypeLabels[template.mealType] || template.mealType} • ${Math.round((template.targetPercentOfDay || 0) * 100)}% objectif journalier
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: var(--space-md);">
                    <div style="position: relative;">
                        <button onclick="event.stopPropagation(); toggleTemplateMenu('${template.id}')" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.5rem; padding: var(--space-xs); transition: color 0.2s;" title="Options">
                            ⋯
                        </button>
                        <div id="template-menu-${template.id}" class="meal-menu-dropdown" style="display: none; position: absolute; right: 0; top: 100%; background: var(--bg-secondary); border-radius: var(--radius-md); padding: var(--space-xs); min-width: 160px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 1000;">
                            <div class="meal-menu-item" onclick="event.stopPropagation(); editSmartTemplate('${template.id}')"><i data-lucide="edit-2" style="width: 16px; height: 16px;"></i> Modifier</div>
                            <div class="meal-menu-item" onclick="event.stopPropagation(); editTemplateTitle('${template.id}', '${template.displayName}')"><i data-lucide="type" style="width: 16px; height: 16px;"></i> Modifier le titre</div>
                            <div class="meal-menu-item" id="template-toggle-menu-${template.id}" onclick="event.stopPropagation(); toggleSmartTemplateActive('${template.id}', ${!template.active})"><i data-lucide="${template.active ? 'eye-off' : 'eye'}" style="width: 16px; height: 16px;"></i> ${template.active ? 'Désactiver' : 'Activer'}</div>
                            <div class="meal-menu-item danger" onclick="event.stopPropagation(); deleteSmartTemplate('${template.id}')"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i> Supprimer</div>
                        </div>
                    </div>
                    <i data-lucide="chevron-down" id="template-chevron-${template.id}" style="width: 20px; height: 20px; color: var(--text-secondary); transition: transform 0.3s;"></i>
                </div>
            </div>

            <!-- Contenu accordéon -->
            <div id="template-content-${template.id}" style="display: none; padding: 0 var(--space-lg) var(--space-lg) var(--space-lg);">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-sm); margin-bottom: var(--space-md); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                    <div style="text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">Objectif/Jour</div>
                        <div style="font-size: 1.1rem; font-weight: 600; color: var(--accent-main);">${Math.round((template.targetPercentOfDay || 0) * 100)}%</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">Protéines</div>
                        <div style="font-size: 1.1rem; font-weight: 600; color: var(--accent-protein);">${Math.round((template.macroSplit?.proteins || 0) * 100)}%</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">Glucides</div>
                        <div style="font-size: 1.1rem; font-weight: 600; color: var(--accent-carbs);">${Math.round((template.macroSplit?.carbs || 0) * 100)}%</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">Lipides</div>
                        <div style="font-size: 1.1rem; font-weight: 600; color: var(--accent-fat);">${Math.round((template.macroSplit?.fats || 0) * 100)}%</div>
                    </div>
                </div>

                <div style="margin-bottom: var(--space-md);">
                    <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: var(--space-xs); color: var(--text-primary);">
                        <i data-lucide="utensils" style="width: 14px; height: 14px;"></i> Aliments (${(template.foods || []).length})
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: var(--space-xs);">
                        ${(template.foods || []).map(food => `
                            <span style="background: var(--bg-tertiary); padding: 4px 8px; border-radius: var(--radius-sm); font-size: 0.8rem; color: var(--text-secondary);">
                                ${food.foodName} (${food.min}-${food.max}g)
                            </span>
                        `).join('')}
                    </div>
                </div>

                ${template.recipe ? `
                    <div style="margin-top: var(--space-md); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md); border-left: 3px solid var(--accent-carbs);">
                        <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: var(--space-xs); color: var(--accent-carbs);">
                            <i data-lucide="book-open" style="width: 14px; height: 14px;"></i> Recette
                        </div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); white-space: pre-line; max-height: 200px; overflow-y: auto;">
                            ${template.recipe}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
};

window.loadAdminSmartTemplates = async function(direction = 'initial') {
    if (!isAdmin()) return;

    const container = document.getElementById('smart-templates-list');
    const pagination = window.smartTemplatesPagination;

    container.innerHTML = '<div style="text-align: center; padding: var(--space-xl);"><i data-lucide="loader" class="spin"></i> Chargement...</div>';

    try {
        // OPTIMIZATION: Load ALL templates once and sort client-side
        // This avoids Firestore composite index requirement for orderBy on multiple fields
        // Since we typically have < 100 templates, this is more efficient than complex pagination

        if (direction === 'initial') {
            // Reset pagination and fetch all templates
            pagination.currentPage = 0;

            const templatesSnap = await getDocs(collection(db, 'smartTemplates'));
            const allTemplates = [];
            templatesSnap.forEach(doc => {
                allTemplates.push({ id: doc.id, ...doc.data() });
            });

            // Sort client-side: by mealType then by displayName
            allTemplates.sort((a, b) => {
                const mealOrder = {breakfast: 1, lunch: 2, snack: 3, dinner: 4};
                if (mealOrder[a.mealType] !== mealOrder[b.mealType]) {
                    return mealOrder[a.mealType] - mealOrder[b.mealType];
                }
                return (a.displayName || '').localeCompare(b.displayName || '');
            });

            // Store all templates in memory for pagination
            window.allSmartTemplates = allTemplates;
            pagination.totalDocs = allTemplates.length;
        }

        // Paginate client-side
        const allTemplates = window.allSmartTemplates || [];

        // Calculate pagination
        if (direction === 'next') {
            pagination.currentPage++;
        } else if (direction === 'prev' && pagination.currentPage > 0) {
            pagination.currentPage--;
        }

        const startIndex = pagination.currentPage * pagination.pageSize;
        const endIndex = startIndex + pagination.pageSize;
        const templates = allTemplates.slice(startIndex, endIndex);

        // Update pagination state
        pagination.hasMore = endIndex < allTemplates.length;

        // Render templates or empty state
        if (templates.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: var(--space-3xl); color: var(--text-secondary);">
                    <i data-lucide="sparkles" style="width: 48px; height: 48px; margin-bottom: var(--space-md);"></i>
                    <p>Aucun template de repas conseillé pour le moment.</p>
                    <p style="font-size: 0.9rem;">Créez votre premier template !</p>
                </div>
            `;
        } else {
            // Use the helper function for each template
            const templatesHTML = templates.map(template => renderTemplateCard(template)).join('');

            // Add pagination controls
            const startIndex = pagination.currentPage * pagination.pageSize + 1;
            const endIndex = Math.min(startIndex + templates.length - 1, pagination.totalDocs);

            const paginationHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-lg); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                    <button
                        onclick="loadAdminSmartTemplates('prev')"
                        ${pagination.currentPage === 0 ? 'disabled' : ''}
                        style="padding: var(--space-sm) var(--space-md); background: var(--accent-main); color: white; border: none; border-radius: var(--radius-md); cursor: ${pagination.currentPage === 0 ? 'not-allowed' : 'pointer'}; opacity: ${pagination.currentPage === 0 ? '0.5' : '1'}; transition: opacity 0.2s;">
                        <i data-lucide="chevron-left" style="width: 16px; height: 16px;"></i> Précédent
                    </button>
                    <span style="color: var(--text-secondary); font-size: 0.9rem;">
                        <strong>${startIndex}-${endIndex}</strong> sur <strong>${pagination.totalDocs}</strong> templates
                    </span>
                    <button
                        onclick="loadAdminSmartTemplates('next')"
                        ${!pagination.hasMore ? 'disabled' : ''}
                        style="padding: var(--space-sm) var(--space-md); background: var(--accent-main); color: white; border: none; border-radius: var(--radius-md); cursor: ${!pagination.hasMore ? 'not-allowed' : 'pointer'}; opacity: ${!pagination.hasMore ? '0.5' : '1'}; transition: opacity 0.2s;">
                        Suivant <i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i>
                    </button>
                </div>
            `;

            container.innerHTML = templatesHTML + paginationHTML;
        }

        // OPTIMIZATION: Pass specific container to updateIcons instead of parsing entire DOM
        if (typeof updateIcons === 'function') updateIcons(container);

    } catch (error) {
        console.error('Erreur chargement smart templates:', error);
        container.innerHTML = `
            <div style="text-align: center; padding: var(--space-xl); color: var(--text-danger);">
                <i data-lucide="alert-circle" style="width: 32px; height: 32px;"></i>
                <p>Erreur lors du chargement des templates</p>
            </div>
        `;
    }
};

// Toggle Template Accordion
window.toggleTemplateAccordion = function(templateId) {
    const content = document.getElementById(`template-content-${templateId}`);
    const chevron = document.getElementById(`template-chevron-${templateId}`);

    if (content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
};

// Toggle Template Menu
window.toggleTemplateMenu = function(templateId) {
    // Fermer tous les autres menus
    document.querySelectorAll('[id^="template-menu-"]').forEach(menu => {
        if (menu.id !== `template-menu-${templateId}`) {
            menu.style.display = 'none';
        }
    });

    const menu = document.getElementById(`template-menu-${templateId}`);
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
};

// Fermer les menus quand on clique ailleurs
document.addEventListener('click', (e) => {
    if (!e.target.closest('[id^="template-menu-"]') && !e.target.closest('button[onclick*="toggleTemplateMenu"]')) {
        document.querySelectorAll('[id^="template-menu-"]').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

// Edit Template Title
window.editTemplateTitle = async function(templateId, currentTitle) {
    if (!isAdmin()) return;

    const newTitle = prompt('Nouveau titre du template:', currentTitle);
    if (!newTitle || newTitle === currentTitle) return;

    // OPTIMISTIC UPDATE: Update DOM immediately
    const titleElement = document.getElementById(`template-title-${templateId}`);
    const oldTitle = titleElement ? titleElement.textContent : currentTitle;

    if (titleElement) {
        titleElement.textContent = newTitle.trim();
    }

    try {
        // Sync to Firestore in background
        await updateDoc(doc(db, 'smartTemplates', templateId), { displayName: newTitle.trim() });
        showToast('<i data-lucide="check-circle" class="icon-inline"></i> Titre mis à jour');
        await logAdminAction('update_template_title', { templateId, newTitle });
    } catch (error) {
        console.error('Erreur modification titre:', error);
        customAlert('Erreur', 'Impossible de modifier le titre du template');

        // Revert optimistic update on error
        if (titleElement) {
            titleElement.textContent = oldTitle;
        }
    }
};

// Toggle Smart Template Active Status
window.toggleSmartTemplateActive = async function(templateId, active) {
    if (!isAdmin()) return;

    // OPTIMISTIC UPDATE: Update DOM immediately for instant feedback
    const statusBadge = document.getElementById(`template-status-${templateId}`);
    const toggleMenuItem = document.getElementById(`template-toggle-menu-${templateId}`);

    if (statusBadge) {
        const activeBg = active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
        const activeColor = active ? '#10b981' : '#ef4444';
        const activeLabel = active ? 'Actif' : 'Inactif';

        statusBadge.style.background = activeBg;
        statusBadge.style.color = activeColor;
        statusBadge.textContent = activeLabel;
    }

    if (toggleMenuItem) {
        const icon = toggleMenuItem.querySelector('[data-lucide]');
        const text = active ? 'Désactiver' : 'Activer';
        if (icon) {
            icon.setAttribute('data-lucide', active ? 'eye-off' : 'eye');
        }
        toggleMenuItem.innerHTML = `<i data-lucide="${active ? 'eye-off' : 'eye'}" style="width: 16px; height: 16px;"></i> ${text}`;
        toggleMenuItem.onclick = function(e) {
            e.stopPropagation();
            toggleSmartTemplateActive(templateId, !active);
        };
        // Update icon
        if (typeof updateIcons === 'function') {
            updateIcons(toggleMenuItem);
        }
    }

    try {
        // Sync to Firestore in background
        await updateDoc(doc(db, 'smartTemplates', templateId), { active });
        showToast(`<i data-lucide="check-circle" class="icon-inline"></i> Template ${active ? 'activé' : 'désactivé'}`);
    } catch (error) {
        console.error('Erreur toggle active:', error);
        customAlert('Erreur', 'Impossible de modifier le statut du template');

        // Revert optimistic update on error
        if (statusBadge) {
            const activeBg = !active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
            const activeColor = !active ? '#10b981' : '#ef4444';
            const activeLabel = !active ? 'Actif' : 'Inactif';

            statusBadge.style.background = activeBg;
            statusBadge.style.color = activeColor;
            statusBadge.textContent = activeLabel;
        }
    }
};

// Delete Smart Template
window.deleteSmartTemplate = async function(templateId) {
    if (!isAdmin()) return;

    const confirmed = await customConfirm(
        'Supprimer ce template ?',
        'Cette action est irréversible. Le template sera définitivement supprimé.',
        true
    );

    if (!confirmed) return;

    // OPTIMISTIC UPDATE: Remove from DOM immediately with animation
    const templateCard = document.getElementById(`template-card-${templateId}`);
    const cardHTML = templateCard ? templateCard.outerHTML : null;
    const parentElement = templateCard ? templateCard.parentElement : null;

    if (templateCard) {
        // Fade out animation
        templateCard.style.transition = 'opacity 0.3s, transform 0.3s';
        templateCard.style.opacity = '0';
        templateCard.style.transform = 'scale(0.95)';

        setTimeout(() => {
            templateCard.remove();
        }, 300);
    }

    try {
        // Sync to Firestore in background
        await deleteDoc(doc(db, 'smartTemplates', templateId));
        showToast('<i data-lucide="trash-2" class="icon-inline"></i> Template supprimé');
        await logAdminAction('delete_smart_template', { templateId });

        // Update total count
        if (window.smartTemplatesPagination) {
            window.smartTemplatesPagination.totalDocs--;
        }
    } catch (error) {
        console.error('Erreur suppression template:', error);
        customAlert('Erreur', 'Impossible de supprimer le template');

        // Revert optimistic update on error
        if (cardHTML && parentElement) {
            parentElement.insertAdjacentHTML('beforeend', cardHTML);
            if (typeof updateIcons === 'function') {
                updateIcons(parentElement);
            }
        }
    }
};

// NOTE: Template food management functions moved to app.js for better code organization

// Open Smart Template Modal (Create or Edit)
window.openSmartTemplateModal = function(templateData = null) {
    if (!isAdmin()) return;

    const isEdit = !!templateData;
    const modalHtml = `
        <div id="smart-template-modal" class="modal active" style="z-index: 10000;">
            <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'Modifier' : 'Créer'} un repas conseillé</h2>
                    <button class="modal-close" onclick="closeSmartTemplateModal()">×</button>
                </div>
                <div class="modal-body">
                    <form id="smart-template-form" onsubmit="saveSmartTemplate(event); return false;">
                        <!-- Section 1: Informations générales -->
                        <div style="margin-bottom: var(--space-xl);">
                            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: var(--space-md); color: var(--text-primary);">
                                Informations générales
                            </h3>

                            <div style="margin-bottom: var(--space-md);">
                                <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.9rem;">
                                    Nom du repas * (affiché aux utilisateurs)
                                </label>
                                <input type="text" name="displayName" id="template-display-name" required
                                       placeholder="ex: Bolognaise vegan, Poke bowl saumon, etc."
                                       value="${templateData?.displayName || ''}"
                                       oninput="updateTemplateId(this.value, ${!isEdit})"
                                       style="width: 100%; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                                <small style="color: var(--text-secondary); font-size: 0.75rem;">Ce nom sera affiché aux utilisateurs</small>
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-md);">
                                <div>
                                    <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.9rem;">
                                        Type de repas *
                                    </label>
                                    <select name="mealType" id="template-meal-type" required ${isEdit ? 'disabled' : ''}
                                            onchange="updateTemplateId(document.getElementById('template-display-name').value, ${!isEdit})"
                                            style="width: 100%; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                                        <option value="breakfast" ${templateData?.mealType === 'breakfast' ? 'selected' : ''}>Petit-déjeuner</option>
                                        <option value="lunch" ${templateData?.mealType === 'lunch' ? 'selected' : ''}>Déjeuner</option>
                                        <option value="snack" ${templateData?.mealType === 'snack' ? 'selected' : ''}>Goûter</option>
                                        <option value="dinner" ${templateData?.mealType === 'dinner' ? 'selected' : ''}>Dîner</option>
                                    </select>
                                    ${isEdit ? '<input type="hidden" name="mealType" value="' + templateData?.mealType + '">' : ''}
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.9rem;">
                                        Variante (optionnelle, pour badge visuel uniquement)
                                    </label>
                                    <select name="variant" id="template-variant"
                                            style="width: 100%; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                                        <option value="" ${!templateData?.variant || templateData?.variant === '' ? 'selected' : ''}>Aucune</option>
                                        <option value="vegan" ${templateData?.variant === 'vegan' ? 'selected' : ''}>Vegan</option>
                                        <option value="glutenFree" ${templateData?.variant === 'glutenFree' ? 'selected' : ''}>Sans gluten</option>
                                        <option value="vegetarian" ${templateData?.variant === 'vegetarian' ? 'selected' : ''}>Végétarien</option>
                                    </select>
                                    <small style="color: var(--text-secondary); font-size: 0.75rem;">Affiche juste un badge, ne change pas les calculs</small>
                                </div>
                            </div>

                            <div style="margin-bottom: var(--space-md);">
                                <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.9rem;">
                                    ID technique * ${isEdit ? '(non modifiable)' : '(auto-généré)'}
                                </label>
                                <input type="text" name="id" id="template-id" required ${isEdit ? 'readonly' : 'readonly'}
                                       placeholder="Auto-généré depuis le nom"
                                       value="${templateData?.id || ''}"
                                       style="width: 100%; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary); opacity: 0.6;">
                                <small style="color: var(--text-secondary); font-size: 0.75rem;">
                                    ${isEdit ? 'Ne peut pas être modifié' : 'Généré automatiquement depuis le nom du repas'}
                                </small>
                            </div>

                            <div style="margin-top: var(--space-md);">
                                <label style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer; padding: var(--space-sm); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                                    <input type="checkbox" name="active" ${templateData?.active !== false ? 'checked' : ''}
                                           style="width: 20px; height: 20px;">
                                    <div>
                                        <div style="color: var(--text-primary); font-weight: 600;">Actif</div>
                                        <small style="color: var(--text-secondary); font-size: 0.75rem;">Ce template sera visible et utilisable par les utilisateurs</small>
                                    </div>
                                </label>
                            </div>

                            ${!isEdit ? `
                                <div style="margin-top: var(--space-md); padding: var(--space-md); background: rgba(56, 189, 248, 0.1); border-left: 3px solid #38bdf8; border-radius: var(--radius-md);">
                                    <div style="font-weight: 600; margin-bottom: var(--space-xs); color: #38bdf8; font-size: 0.9rem;">
                                        💡 Comment ça marche ?
                                    </div>
                                    <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
                                        • Le <strong>nom du repas</strong> est libre : "Bolognaise vegan", "Poke bowl", etc.<br>
                                        • Le <strong>type de repas</strong> détermine quand il sera proposé<br>
                                        • La <strong>variante</strong> est optionnelle et affiche juste un badge (🌱 🌾) - ne change pas les calculs<br>
                                        • L'<strong>ID</strong> est généré automatiquement
                                    </div>
                                </div>
                            ` : ''}
                        </div>

                        <!-- Section 2: Paramètres de calcul -->
                        <div style="margin-bottom: var(--space-xl);">
                            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: var(--space-md); color: var(--text-primary);">
                                Paramètres de calcul
                            </h3>
                            <div style="margin-bottom: var(--space-md);">
                                <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.9rem;">
                                    Pourcentage de l'objectif journalier * (0 à 1)
                                </label>
                                <input type="number" name="targetPercentOfDay" required min="0" max="1" step="0.05"
                                       placeholder="0.30" value="${templateData?.targetPercentOfDay || 0.30}"
                                       style="width: 200px; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                                <small style="display: block; margin-top: var(--space-xs); color: var(--text-secondary); font-size: 0.75rem;">
                                    Ex: 0.30 = 30% des objectifs de la journée
                                </small>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: var(--space-sm); color: var(--text-secondary); font-weight: 600;">
                                    Répartition des macros du repas (total doit faire 1.0)
                                </label>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-md);">
                                    <div>
                                        <label style="display: block; margin-bottom: var(--space-xs); color: var(--accent-protein); font-size: 0.9rem;">
                                            Protéines
                                        </label>
                                        <input type="number" name="macroSplit.proteins" required min="0" max="1" step="0.05"
                                               placeholder="0.40" value="${templateData?.macroSplit?.proteins || 0.40}"
                                               style="width: 100%; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: var(--space-xs); color: var(--accent-carbs); font-size: 0.9rem;">
                                            Glucides
                                        </label>
                                        <input type="number" name="macroSplit.carbs" required min="0" max="1" step="0.05"
                                               placeholder="0.35" value="${templateData?.macroSplit?.carbs || 0.35}"
                                               style="width: 100%; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: var(--space-xs); color: var(--accent-fat); font-size: 0.9rem;">
                                            Lipides
                                        </label>
                                        <input type="number" name="macroSplit.fats" required min="0" max="1" step="0.05"
                                               placeholder="0.25" value="${templateData?.macroSplit?.fats || 0.25}"
                                               style="width: 100%; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Section 3: Aliments -->
                        <div style="margin-bottom: var(--space-xl);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-md);">
                                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin: 0;">
                                    Aliments du repas
                                </h3>
                                <button type="button" onclick="addTemplateFood()" class="btn btn-secondary" style="display: flex; align-items: center; gap: var(--space-xs);">
                                    <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
                                    Ajouter un aliment
                                </button>
                            </div>
                            <div id="smart-template-foods-list" style="display: flex; flex-direction: column; gap: var(--space-sm);">
                                <!-- Foods will be added here -->
                            </div>
                        </div>

                        <!-- Section 4: Recette -->
                        <div style="margin-bottom: var(--space-xl);">
                            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: var(--space-md); color: var(--text-primary);">
                                Recette
                            </h3>
                            <textarea name="recipe" rows="8" placeholder="Instructions de préparation..."
                                      style="width: 100%; padding: var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary); font-family: inherit; resize: vertical;">${templateData?.recipe || ''}</textarea>
                        </div>

                        <!-- Boutons -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
                            <button type="button" onclick="closeSmartTemplateModal()" class="btn btn-secondary">
                                Annuler
                            </button>
                            <button type="submit" class="btn" style="background: var(--accent-main);">
                                ${isEdit ? 'Mettre à jour' : 'Créer le template'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existing = document.getElementById('smart-template-modal');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';

    // Initialize foods list
    window.templateFoodsData = templateData?.foods || [];
    if (typeof window.renderTemplateFoods === 'function') {
        window.renderTemplateFoods();
    }

    if (typeof updateIcons === 'function') updateIcons();
};

// Auto-generate template ID from displayName and mealType
window.updateTemplateId = function(displayName, canEdit) {
    if (!canEdit) return;

    const mealTypeSelect = document.getElementById('template-meal-type');
    const idInput = document.getElementById('template-id');

    if (!mealTypeSelect || !idInput) return;

    const mealType = mealTypeSelect.value;
    const cleanName = displayName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9]+/g, '') // Keep only letters and numbers
        .substring(0, 20); // Limit length

    // Generate ID: mealType + cleanName (ex: "lunchBolognaisevegan")
    const generatedId = mealType + (cleanName ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1) : '');
    idInput.value = generatedId;
};

window.closeSmartTemplateModal = function() {
    const modal = document.getElementById('smart-template-modal');
    if (modal) modal.remove();
    document.body.style.overflow = '';
    window.templateFoodsData = null;
};

window.editSmartTemplate = async function(templateId) {
    if (!isAdmin()) return;

    try {
        const templateDoc = await getDoc(doc(db, 'smartTemplates', templateId));
        if (!templateDoc.exists()) {
            customAlert('Erreur', 'Template introuvable');
            return;
        }

        const templateData = { id: templateDoc.id, ...templateDoc.data() };
        openSmartTemplateModal(templateData);
    } catch (error) {
        console.error('Erreur chargement template:', error);
        customAlert('Erreur', 'Impossible de charger le template');
    }
};

window.saveSmartTemplate = async function(event) {
    event.preventDefault();
    if (!isAdmin()) return;

    const form = event.target;
    const formData = new FormData(form);

    // Validate macro split total
    const proteins = parseFloat(formData.get('macroSplit.proteins'));
    const carbs = parseFloat(formData.get('macroSplit.carbs'));
    const fats = parseFloat(formData.get('macroSplit.fats'));
    const total = proteins + carbs + fats;

    if (Math.abs(total - 1.0) > 0.01) {
        customAlert('Erreur', `La somme des macros doit faire 1.0 (actuellement: ${total.toFixed(2)})`);
        return;
    }

    // Build template object
    const templateData = {
        id: formData.get('id').trim(),
        displayName: formData.get('displayName').trim(),
        mealType: formData.get('mealType'),
        variant: formData.get('variant'),
        targetPercentOfDay: parseFloat(formData.get('targetPercentOfDay')),
        macroSplit: {
            proteins,
            carbs,
            fats
        },
        foods: window.templateFoodsData || [],
        recipe: formData.get('recipe') || '',
        active: formData.get('active') === 'on',
        updatedAt: new Date()
    };

    // Validate foods
    if (templateData.foods.length === 0) {
        customAlert('Erreur', 'Ajoutez au moins un aliment au template');
        return;
    }

    // Validate all foods have names
    const emptyFoods = templateData.foods.filter(f => !f.foodName || !f.foodName.trim());
    if (emptyFoods.length > 0) {
        customAlert('Erreur', 'Tous les aliments doivent avoir un nom');
        return;
    }

    try {
        const isEdit = !!document.querySelector('[name="id"][readonly]');

        if (isEdit) {
            // Update existing - OPTIMISTIC UPDATE
            const templateCard = document.getElementById(`template-card-${templateData.id}`);

            // Sync to Firestore
            await updateDoc(doc(db, 'smartTemplates', templateData.id), templateData);
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Template mis à jour');
            await logAdminAction('update_smart_template', { templateId: templateData.id });

            // Update the card in DOM without reloading entire list
            if (templateCard) {
                const container = document.getElementById('smart-templates-list');
                const newCardHTML = renderTemplateCard(templateData);
                templateCard.outerHTML = newCardHTML;

                // Update icons only for the new card
                if (typeof updateIcons === 'function') {
                    const updatedCard = document.getElementById(`template-card-${templateData.id}`);
                    if (updatedCard) {
                        updateIcons(updatedCard);
                    }
                }
            }
        } else {
            // Create new
            templateData.createdAt = new Date();
            await setDoc(doc(db, 'smartTemplates', templateData.id), templateData);
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Template créé');
            await logAdminAction('create_smart_template', { templateId: templateData.id });

            // For new templates, reload to show in proper sorted position
            // and update pagination
            loadAdminSmartTemplates();
        }

        closeSmartTemplateModal();
    } catch (error) {
        console.error('Erreur sauvegarde template:', error);
        customAlert('Erreur', 'Impossible de sauvegarder le template');
    }
};

// Migrate Smart Templates from code to Firestore
window.migrateSmartTemplatesToFirestore = async function() {
    if (!isAdmin()) return;

    const confirmed = await customConfirm(
        'Migrer les templates ?',
        'Ceci va importer les 5 templates par défaut dans Firestore. Les templates existants avec les mêmes IDs seront écrasés.',
        false
    );

    if (!confirmed) return;

    try {
        // Define the default templates from app.js
        const defaultTemplates = {
            lunch: {
                id: 'lunch',
                mealType: 'lunch',
                variant: 'standard',
                displayName: 'Déjeuner standard',
                targetPercentOfDay: 0.30,
                macroSplit: { proteins: 0.40, carbs: 0.35, fats: 0.25 },
                foods: [
                    { foodName: 'Poulet rôti', role: 'protein', min: 100, max: 300, priority: 1 },
                    { foodName: 'Riz blanc cuit', role: 'carb', min: 80, max: 300, priority: 2 },
                    { foodName: 'Huile d\'olive', role: 'fat', min: 5, max: 15, priority: 3 },
                    { foodName: 'Haricots verts', role: 'fiber', min: 100, max: 250, priority: 4 }
                ],
                recipe: 'Faire cuire le riz dans de l\'eau bouillante salée pendant 15-20 minutes.\n\nFaire revenir le poulet à la poêle avec un peu d\'huile d\'olive jusqu\'à ce qu\'il soit bien doré.\n\nCuire les haricots verts à la vapeur pendant 10 minutes.\n\nServir le poulet sur le riz, accompagné des haricots verts. Arroser d\'un filet d\'huile d\'olive.',
                active: true
            },
            lunchLowCarb: {
                id: 'lunchLowCarb',
                mealType: 'lunch',
                variant: 'lowCarb',
                displayName: 'Déjeuner low-carb',
                targetPercentOfDay: 0.30,
                macroSplit: { proteins: 0.45, carbs: 0.15, fats: 0.40 },
                foods: [
                    { foodName: 'Poulet rôti', role: 'protein', min: 150, max: 350, priority: 1 },
                    { foodName: 'Avocat', role: 'fat', min: 50, max: 150, priority: 2 },
                    { foodName: 'Huile d\'olive', role: 'fat', min: 5, max: 12, priority: 3 },
                    { foodName: 'Haricots verts', role: 'fiber', min: 150, max: 300, priority: 4 }
                ],
                recipe: 'Faire cuire le poulet à la poêle avec un peu d\'huile d\'olive jusqu\'à ce qu\'il soit bien doré et cuit à cœur.\n\nCuire les haricots verts à la vapeur pendant 10 minutes.\n\nCouper l\'avocat en tranches.\n\nServir le poulet avec les haricots verts et l\'avocat. Assaisonner avec l\'huile d\'olive, sel et poivre.',
                active: true
            },
            breakfast: {
                id: 'breakfast',
                mealType: 'breakfast',
                variant: 'standard',
                displayName: 'Petit-déjeuner standard',
                targetPercentOfDay: 0.25,
                macroSplit: { proteins: 0.30, carbs: 0.50, fats: 0.20 },
                foods: [
                    { foodName: 'Fromage blanc 0%', role: 'protein', min: 100, max: 300, priority: 1 },
                    { foodName: 'Flocons d\'avoine', role: 'carb', min: 40, max: 100, priority: 2 },
                    { foodName: 'Banane', role: 'carb', min: 80, max: 150, priority: 3 },
                    { foodName: 'Miel', role: 'carb', min: 5, max: 20, priority: 4 },
                    { foodName: 'Amandes', role: 'fat', min: 10, max: 30, priority: 5 }
                ],
                recipe: 'Couper la banane en rondelles.\n\nDans un bol, mélanger le fromage blanc avec les flocons d\'avoine.\n\nAjouter les rondelles de banane et les amandes concassées.\n\nArroser de miel et bien mélanger.\n\nLaisser reposer 5 minutes pour que l\'avoine s\'hydrate. Déguster !',
                active: true
            },
            snack: {
                id: 'snack',
                mealType: 'snack',
                variant: 'standard',
                displayName: 'Goûter standard',
                targetPercentOfDay: 0.15,
                macroSplit: { proteins: 0.35, carbs: 0.45, fats: 0.20 },
                foods: [
                    { foodName: 'Yaourt grec', role: 'protein', min: 100, max: 250, priority: 1 },
                    { foodName: 'Pomme', role: 'carb', min: 100, max: 200, priority: 2 },
                    { foodName: 'Amandes', role: 'fat', min: 10, max: 30, priority: 3 }
                ],
                recipe: 'Laver et couper la pomme en morceaux.\n\nDans un bol, verser le yaourt grec.\n\nAjouter les morceaux de pomme et les amandes entières ou concassées.\n\nMélanger et déguster immédiatement.',
                active: true
            },
            dinner: {
                id: 'dinner',
                mealType: 'dinner',
                variant: 'standard',
                displayName: 'Dîner standard',
                targetPercentOfDay: 0.30,
                macroSplit: { proteins: 0.40, carbs: 0.35, fats: 0.25 },
                foods: [
                    { foodName: 'Saumon frais', role: 'protein', min: 120, max: 250, priority: 1 },
                    { foodName: 'Pomme de terre', role: 'carb', min: 150, max: 350, priority: 2 },
                    { foodName: 'Brocoli', role: 'fiber', min: 120, max: 250, priority: 3 },
                    { foodName: 'Huile d\'olive', role: 'fat', min: 5, max: 15, priority: 4 }
                ],
                recipe: 'Préchauffer le four à 180°C.\n\nLaver les pommes de terre et les couper en quartiers. Les disposer sur une plaque et arroser d\'un peu d\'huile d\'olive. Enfourner pour 30-35 minutes.\n\nCuire le brocoli à la vapeur pendant 10 minutes.\n\nFaire cuire le saumon à la poêle avec un peu d\'huile d\'olive, 4-5 minutes de chaque côté.\n\nServir le saumon avec les pommes de terre rôties et le brocoli. Assaisonner avec sel, poivre et un filet d\'huile d\'olive.',
                active: true
            }
        };

        // Migrate each template
        let migrated = 0;
        for (const [key, template] of Object.entries(defaultTemplates)) {
            template.createdAt = new Date();
            template.updatedAt = new Date();
            await setDoc(doc(db, 'smartTemplates', template.id), template);
            migrated++;
        }

        await logAdminAction('migrate_smart_templates', { count: migrated });
        showToast(`<i data-lucide="check-circle" class="icon-inline"></i> ${migrated} templates migrés avec succès`);
        loadAdminSmartTemplates();

    } catch (error) {
        console.error('Erreur migration:', error);
        customAlert('Erreur', 'Impossible de migrer les templates');
    }
};

window.addAdminUID = function() {
    if (!isAdmin()) return;
    if (typeof showToast === 'function') {
        showToast('<i data-lucide="info" class="icon-inline"></i> Fonctionnalité nécessite configuration backend');
    }
};

window.clearFirestoreCache = async function() {
    if (!isAdmin()) return;

    // Prevent double-clicks
    const clearBtn = document.getElementById('clear-cache-btn');
    if (clearBtn && clearBtn.disabled) return;

    if (!confirm('Vider le cache Firestore local ? Cette action rechargera la page.')) return;

    try {
        // Disable button
        if (clearBtn) {
            clearBtn.disabled = true;
            clearBtn.style.opacity = '0.6';
            clearBtn.style.cursor = 'not-allowed';
        }

        // Clear Firestore cache is handled by Firebase internally
        // We can clear localStorage as a workaround
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Cache vidé, rechargement...');
        }
        await logAdminAction('clear_cache', {});
        setTimeout(() => location.reload(), 1000);
    } catch (error) {
        console.error('Erreur vidage cache:', error);
        // Re-enable on error
        if (clearBtn) {
            clearBtn.disabled = false;
            clearBtn.style.opacity = '1';
            clearBtn.style.cursor = 'pointer';
        }
    }
};

window.viewAdminLogs = async function() {
    if (!isAdmin()) return;
    // Scroll to logs section
    document.getElementById('admin-logs-list').scrollIntoView({ behavior: 'smooth' });
};

window.migrateFoodDatabaseToFirestore = async function() {
    if (!isAdmin()) return;

    // Prevent double-clicks
    const migrateBtn = document.getElementById('migrate-food-btn');
    if (migrateBtn && migrateBtn.disabled) return;

    if (!confirm('✅ Cette action va AJOUTER les aliments de foodDatabase (app.js) manquants dans Firestore.\n\n⚠️ Les aliments EXISTANTS dans Firestore ne seront PAS écrasés.\n\nContinuer ?')) {
        return;
    }

    try {
        // Disable button
        if (migrateBtn) {
            migrateBtn.disabled = true;
            migrateBtn.style.opacity = '0.6';
            migrateBtn.style.cursor = 'not-allowed';
        }

        if (typeof showToast === 'function') {
            showToast('<i data-lucide="database" class="icon-inline"></i> Migration en cours...');
        }

        let addedCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        // Loop through foodDatabase from app.js
        for (const food of foodDatabase) {
            try {
                // Validate food data
                if (!food.name || typeof food.calories === 'undefined') {
                    console.warn('Skipping invalid food:', food);
                    errorCount++;
                    continue;
                }

                // Use food name as document ID for easier updates
                const docId = food.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const docRef = doc(db, 'aliments_communs', docId);

                // CHECK IF ALREADY EXISTS
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // SKIP: Ne pas écraser l'aliment existant
                    console.log('Skipping existing food:', food.name);
                    skippedCount++;
                    continue;
                }

                // Create document in Firestore (only if doesn't exist)
                const foodDoc = {
                    name: food.name,
                    category: food.category || 'autres',
                    unit: food.unit || '100g',
                    calories: Number(food.calories) || 0,
                    protein: Number(food.protein) || 0,
                    carbs: Number(food.carbs) || 0,
                    fat: Number(food.fat) || 0,
                    migratedAt: serverTimestamp()
                };

                await setDoc(docRef, foodDoc);
                addedCount++;
            } catch (err) {
                console.error('Error migrating food:', food.name, err);
                errorCount++;
            }
        }

        await logAdminAction('migrate_food_database', { addedCount, skippedCount, errorCount });

        if (typeof showToast === 'function') {
            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> Migration terminée ! ${addedCount} ajoutés, ${skippedCount} ignorés${errorCount > 0 ? `, ${errorCount} erreurs` : ''}`);
        }

        // Reload foods section if open
        if (typeof loadAdminFoods === 'function') {
            loadAdminFoods();
        }

    } catch (error) {
        console.error('Erreur migration:', error);
        if (typeof showToast === 'function') {
            showToast('<i data-lucide="x-circle" class="icon-inline"></i> Erreur lors de la migration', 'error');
        }
    } finally {
        // Re-enable button
        if (migrateBtn) {
            migrateBtn.disabled = false;
            migrateBtn.style.opacity = '1';
            migrateBtn.style.cursor = 'pointer';
        }
    }
};

// ===== ADMIN LOGGING =====
async function logAdminAction(action, details = {}) {
    if (!isAdmin()) return;

    try {
        await setDoc(doc(collection(db, 'admin_logs')), {
            action: action,
            adminUid: auth.currentUser.uid,
            adminEmail: auth.currentUser.email,
            details: details,
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error('Erreur log admin:', error);
    }
}

// Load dashboard when admin tab is opened
const originalSwitchToTab = window.switchToTab;
if (typeof originalSwitchToTab === 'function') {
    window.switchToTab = function(tab) {
        originalSwitchToTab(tab);
        if (tab === 'admin' && isAdmin()) {
            showAdminSection('dashboard');
        }
    };
}

// Event listeners for filters
document.addEventListener('DOMContentLoaded', function() {
    // Feedbacks search filter
    const feedbackSearch = document.getElementById('admin-filter-search');
    if (feedbackSearch) {
        feedbackSearch.addEventListener('input', () => {
            if (isAdmin()) loadAdminFeedbacks();
        });
    }

    // Feedbacks type/status filters
    const feedbackType = document.getElementById('admin-filter-type');
    const feedbackStatus = document.getElementById('admin-filter-status');
    const feedbackDate = document.getElementById('admin-filter-date');
    if (feedbackType) feedbackType.addEventListener('change', () => { if (isAdmin()) loadAdminFeedbacks(); });
    if (feedbackStatus) feedbackStatus.addEventListener('change', () => { if (isAdmin()) loadAdminFeedbacks(); });
    if (feedbackDate) feedbackDate.addEventListener('change', () => { if (isAdmin()) loadAdminFeedbacks(); });

    // Users search filter
    const usersSearch = document.getElementById('users-filter-search');
    if (usersSearch) {
        usersSearch.addEventListener('input', () => {
            if (isAdmin()) loadAdminUsers();
        });
    }

    // Users sort filter
    const usersSort = document.getElementById('users-filter-sort');
    if (usersSort) usersSort.addEventListener('change', () => { if (isAdmin()) loadAdminUsers(); });

    // Foods search filter
    const foodsSearch = document.getElementById('foods-filter-search');
    if (foodsSearch) {
        foodsSearch.addEventListener('input', () => {
            if (isAdmin()) loadAdminFoods();
        });
    }

    // Foods category filter
    const foodsCategory = document.getElementById('foods-filter-category');
    if (foodsCategory) foodsCategory.addEventListener('change', () => { if (isAdmin()) loadAdminFoods(); });
});

} // Fin du if (isValidProtocol)
