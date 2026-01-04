// NutriTrack Service Worker - Notifications & Caching
const CACHE_NAME = 'nutritrack-v2';
const NOTIFICATION_TAG = 'nutritrack-reminder';

// Installation du Service Worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Activation
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Réception de messages depuis l'app
self.addEventListener('message', (event) => {
    const { type, data } = event.data;

    if (type === 'SCHEDULE_NOTIFICATIONS') {
        // Programmer les notifications
        scheduleNotifications(data.schedules);
    } else if (type === 'CANCEL_NOTIFICATIONS') {
        // Annuler toutes les notifications programmées
        cancelAllNotifications();
    } else if (type === 'TEST_NOTIFICATION') {
        // Test immédiat
        showNotification(data.title, data.body, data.tag);
    }
});

// Stockage des timeouts actifs
let activeTimeouts = [];

// Programmer les notifications pour aujourd'hui
function scheduleNotifications(schedules) {
    // Annuler les anciennes
    cancelAllNotifications();

    const now = new Date();

    schedules.forEach(schedule => {
        if (!schedule.enabled) return;

        const [hours, minutes] = schedule.time.split(':').map(Number);
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);

        // Si l'heure est passée, programmer pour demain
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

// Annuler toutes les notifications programmées
function cancelAllNotifications() {
    activeTimeouts.forEach(id => clearTimeout(id));
    activeTimeouts = [];
}

// Afficher une notification
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
        data: {
            url: self.location.origin
        }
    };

    self.registration.showNotification(title, options);
}

// Clic sur notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'dismiss') {
        return;
    }

    // Ouvrir ou focus l'app
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            // Si une fenêtre est déjà ouverte, la focus
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            // Sinon ouvrir une nouvelle fenêtre
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});

// Fermeture de notification
self.addEventListener('notificationclose', (event) => {
    // Analytics ou autre action si besoin
});

// Periodic Background Sync (si supporté - Chrome Android)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'nutritrack-check-reminders') {
        event.waitUntil(checkAndSendReminders());
    }
});

// Vérifier et envoyer les rappels programmés
async function checkAndSendReminders() {
    // Cette fonction sera appelée périodiquement par le navigateur
    // Récupérer les horaires depuis IndexedDB ou envoyer un message à l'app
    // Pour l'instant, simple placeholder
}
