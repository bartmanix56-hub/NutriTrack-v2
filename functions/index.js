/**
 * NutriTrack - Cloud Functions pour notifications push
 *
 * Cette fonction s'exécute toutes les minutes et envoie des notifications
 * aux utilisateurs selon leurs horaires programmés.
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();
const messaging = admin.messaging();

// Messages personnalisés pour chaque type de repas
const mealMessages = {
    breakfast: {
        title: 'Petit-déjeuner',
        body: "Bonjour ! N'oublie pas de noter ton petit-déjeuner."
    },
    lunch: {
        title: 'Déjeuner',
        body: "C'est l'heure du déj ! Pense à logger ton repas."
    },
    snack: {
        title: 'Goûter',
        body: "Un petit goûter ? Note-le pour garder le cap !"
    },
    dinner: {
        title: 'Dîner',
        body: "Bon appétit ! N'oublie pas de noter ton dîner."
    }
};

/**
 * Fonction planifiée qui s'exécute toutes les minutes
 * Vérifie les utilisateurs qui doivent recevoir une notification
 */
exports.sendScheduledNotifications = functions
    .region('europe-west1') // Utilise la région la plus proche
    .pubsub
    .schedule('every 1 minutes')
    .timeZone('Europe/Paris')
    .onRun(async (context) => {
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, '0');
        const currentMinute = now.getMinutes().toString().padStart(2, '0');
        const currentTime = `${currentHour}:${currentMinute}`;

        console.log(`Checking notifications for time: ${currentTime}`);

        try {
            // Récupérer tous les utilisateurs avec un token FCM
            const usersSnapshot = await db.collection('users')
                .where('fcmToken', '!=', null)
                .get();

            if (usersSnapshot.empty) {
                console.log('No users with FCM tokens');
                return null;
            }

            const notifications = [];

            usersSnapshot.forEach(doc => {
                const userData = doc.data();
                const schedules = userData.notificationSchedules || [];
                const fcmToken = userData.fcmToken;
                const userTimezone = userData.timezone || 'Europe/Paris';

                // Calculer l'heure locale de l'utilisateur
                const userTime = new Date().toLocaleTimeString('fr-FR', {
                    timeZone: userTimezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });

                // Vérifier chaque schedule
                schedules.forEach(schedule => {
                    if (schedule.enabled && schedule.time === userTime) {
                        const message = mealMessages[schedule.id] || {
                            title: 'NutriTrack',
                            body: schedule.body || "N'oublie pas de noter ton repas !"
                        };

                        notifications.push({
                            token: fcmToken,
                            notification: {
                                title: message.title,
                                body: message.body
                            },
                            data: {
                                type: 'meal_reminder',
                                mealType: schedule.id,
                                url: 'https://nutritraack.web.app'
                            },
                            webpush: {
                                notification: {
                                    icon: '/icon-192.png',
                                    badge: '/icon-192.png',
                                    vibrate: [200, 100, 200]
                                },
                                fcmOptions: {
                                    link: 'https://nutritraack.web.app'
                                }
                            }
                        });

                        console.log(`Notification queued for user ${doc.id}: ${schedule.id} at ${userTime}`);
                    }
                });
            });

            // Envoyer toutes les notifications
            if (notifications.length > 0) {
                const results = await Promise.allSettled(
                    notifications.map(msg => messaging.send(msg))
                );

                let success = 0;
                let failed = 0;

                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        success++;
                    } else {
                        failed++;
                        console.error(`Failed to send notification: ${result.reason}`);

                        // Si le token est invalide, le supprimer
                        if (result.reason?.code === 'messaging/registration-token-not-registered') {
                            // Token invalide, on pourrait le nettoyer ici
                            console.log('Invalid token detected, should be cleaned up');
                        }
                    }
                });

                console.log(`Notifications sent: ${success} success, ${failed} failed`);
            } else {
                console.log('No notifications to send at this time');
            }

            return null;
        } catch (error) {
            console.error('Error in sendScheduledNotifications:', error);
            return null;
        }
    });

/**
 * Fonction HTTP pour envoyer une notification de test
 * Utile pour débugger
 */
exports.sendTestNotification = functions
    .region('europe-west1')
    .https
    .onCall(async (data, context) => {
        // Vérifier que l'utilisateur est authentifié
        if (!context.auth) {
            throw new functions.https.HttpsError(
                'unauthenticated',
                'User must be authenticated'
            );
        }

        const userId = context.auth.uid;

        try {
            // Récupérer le token de l'utilisateur
            const userDoc = await db.collection('users').doc(userId).get();

            if (!userDoc.exists) {
                throw new functions.https.HttpsError(
                    'not-found',
                    'User document not found'
                );
            }

            const fcmToken = userDoc.data().fcmToken;

            if (!fcmToken) {
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    'No FCM token found for this user'
                );
            }

            // Envoyer la notification
            await messaging.send({
                token: fcmToken,
                notification: {
                    title: 'Test NutriTrack',
                    body: 'Si tu vois ce message, les notifications fonctionnent !'
                },
                webpush: {
                    notification: {
                        icon: '/icon-192.png',
                        badge: '/icon-192.png'
                    }
                }
            });

            return { success: true, message: 'Notification sent' };
        } catch (error) {
            console.error('Error sending test notification:', error);
            throw new functions.https.HttpsError(
                'internal',
                error.message
            );
        }
    });

/**
 * Nettoyer les tokens FCM invalides
 * S'exécute une fois par jour
 */
exports.cleanupInvalidTokens = functions
    .region('europe-west1')
    .pubsub
    .schedule('every 24 hours')
    .onRun(async (context) => {
        console.log('Starting FCM token cleanup...');

        try {
            const usersSnapshot = await db.collection('users')
                .where('fcmToken', '!=', null)
                .get();

            let cleaned = 0;

            for (const doc of usersSnapshot.docs) {
                const fcmToken = doc.data().fcmToken;

                try {
                    // Essayer d'envoyer un message silencieux pour vérifier le token
                    await messaging.send({
                        token: fcmToken,
                        data: { type: 'token_check' }
                    }, true); // dry run
                } catch (error) {
                    if (error.code === 'messaging/registration-token-not-registered' ||
                        error.code === 'messaging/invalid-registration-token') {
                        // Token invalide, le supprimer
                        await doc.ref.update({ fcmToken: null });
                        cleaned++;
                        console.log(`Cleaned invalid token for user ${doc.id}`);
                    }
                }
            }

            console.log(`Token cleanup complete. Removed ${cleaned} invalid tokens.`);
            return null;
        } catch (error) {
            console.error('Error in token cleanup:', error);
            return null;
        }
    });
