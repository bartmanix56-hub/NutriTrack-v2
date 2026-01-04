// NutriTrack Service Worker - FCM Push Notifications
const CACHE_NAME = 'nutritrack-v2';
const NOTIFICATION_TAG = 'nutritrack-reminder';

// Import Firebase scripts pour le Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Configuration Firebase (même config que l'app)
firebase.initializeApp({
    apiKey: "AIzaSyCL2SvQ2c784ZyA2Pr-Qtv2F1wnnDByGkc",
    authDomain: "nutritraack.firebaseapp.com",
    projectId: "nutritraack",
    storageBucket: "nutritraack.firebasestorage.app",
    messagingSenderId: "133692710812",
    appId: "1:133692710812:web:4a5937cea6e86c9b25b259"
});

// Récupérer l'instance de messaging
const messaging = firebase.messaging();

// Gérer les messages push en arrière-plan
messaging.onBackgroundMessage((payload) => {
    console.log('[SW] Message reçu en background:', payload);

    const notificationTitle = payload.notification?.title || payload.data?.title || 'NutriTrack';
    const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || 'Tu as une notification !',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: payload.data?.tag || NOTIFICATION_TAG,
        vibrate: [200, 100, 200],
        data: {
            url: payload.data?.url || self.location.origin,
            ...payload.data
        },
        actions: [
            { action: 'open', title: 'Ouvrir' },
            { action: 'dismiss', title: 'Ignorer' }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Installation');
    self.skipWaiting();
});

// Activation
self.addEventListener('activate', (event) => {
    console.log('[SW] Activation');
    event.waitUntil(clients.claim());
});

// Réception de messages depuis l'app (pour notifications locales)
self.addEventListener('message', (event) => {
    const { type, data } = event.data || {};

    if (type === 'SCHEDULE_NOTIFICATIONS') {
        scheduleNotifications(data.schedules);
    } else if (type === 'CANCEL_NOTIFICATIONS') {
        cancelAllNotifications();
    } else if (type === 'TEST_NOTIFICATION') {
        showNotification(data.title, data.body, data.tag);
    }
});

// Stockage des timeouts actifs pour notifications locales
let activeTimeouts = [];

// Programmer les notifications locales (fallback si FCM non dispo)
function scheduleNotifications(schedules) {
    cancelAllNotifications();

    const now = new Date();

    schedules.forEach(schedule => {
        if (!schedule.enabled) return;

        const [hours, minutes] = schedule.time.split(':').map(Number);
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);

        if (scheduledTime <= now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        const delay = scheduledTime.getTime() - now.getTime();

        const timeoutId = setTimeout(() => {
            showNotification(
                schedule.title || 'NutriTrack - Rappel',
                schedule.body || "N'oublie pas de logger ton repas !",
                schedule.tag || NOTIFICATION_TAG
            );
        }, delay);

        activeTimeouts.push(timeoutId);
    });
}

function cancelAllNotifications() {
    activeTimeouts.forEach(id => clearTimeout(id));
    activeTimeouts = [];
}

function showNotification(title, body, tag) {
    const options = {
        body: body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: tag || NOTIFICATION_TAG,
        vibrate: [200, 100, 200],
        requireInteraction: false,
        actions: [
            { action: 'open', title: 'Ouvrir NutriTrack' },
            { action: 'dismiss', title: 'Ignorer' }
        ],
        data: { url: self.location.origin }
    };

    return self.registration.showNotification(title, options);
}

// Clic sur notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'dismiss') return;

    const urlToOpen = event.notification.data?.url || self.location.origin;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

// Push event (fallback si onBackgroundMessage ne fonctionne pas)
self.addEventListener('push', (event) => {
    console.log('[SW] Push event reçu');

    let data = {};
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data = { title: 'NutriTrack', body: event.data.text() };
        }
    }

    const title = data.notification?.title || data.title || 'NutriTrack';
    const options = {
        body: data.notification?.body || data.body || 'Nouvelle notification',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: data.tag || NOTIFICATION_TAG,
        vibrate: [200, 100, 200],
        data: { url: data.url || self.location.origin }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
