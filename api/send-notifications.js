/**
 * NutriTrack - API Notifications (Vercel Serverless)
 *
 * Endpoint appelé par cron-job.org pour envoyer les notifications
 * URL: https://ton-app.vercel.app/api/send-notifications
 */

const admin = require('firebase-admin');

// Initialiser Firebase Admin (une seule fois)
if (!admin.apps.length) {
    // Les credentials sont dans les variables d'environnement Vercel
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

    if (serviceAccount.project_id) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } else {
        console.error('FIREBASE_SERVICE_ACCOUNT non configuré');
    }
}

// Messages personnalisés
const mealMessages = {
    breakfast: { title: 'Petit-déjeuner', body: "Bonjour ! N'oublie pas de noter ton petit-déjeuner." },
    lunch: { title: 'Déjeuner', body: "C'est l'heure du déj ! Pense à logger ton repas." },
    snack: { title: 'Goûter', body: "Un petit goûter ? Note-le pour garder le cap !" },
    dinner: { title: 'Dîner', body: "Bon appétit ! N'oublie pas de noter ton dîner." }
};

module.exports = async (req, res) => {
    // Vérifier la méthode
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Clé secrète optionnelle pour sécuriser l'endpoint
    const authKey = req.headers['x-cron-secret'] || req.query.key;
    if (process.env.CRON_SECRET && authKey !== process.env.CRON_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!admin.apps.length) {
        return res.status(500).json({ error: 'Firebase not initialized' });
    }

    const db = admin.firestore();
    const messaging = admin.messaging();

    try {
        // Récupérer les utilisateurs avec un token FCM
        const usersSnapshot = await db.collection('users')
            .where('fcmToken', '!=', null)
            .get();

        if (usersSnapshot.empty) {
            return res.json({ success: true, message: 'No users with FCM tokens', sent: 0 });
        }

        const notifications = [];
        const now = new Date();

        usersSnapshot.forEach(doc => {
            const userData = doc.data();
            const schedules = userData.notificationSchedules || [];
            const fcmToken = userData.fcmToken;
            const userTimezone = userData.timezone || 'Europe/Paris';

            // Calculer l'heure locale de l'utilisateur
            const userTime = now.toLocaleTimeString('fr-FR', {
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
                            mealType: schedule.id
                        },
                        webpush: {
                            notification: {
                                icon: '/icon-192.png',
                                badge: '/icon-192.png'
                            }
                        }
                    });
                }
            });
        });

        // Envoyer les notifications
        let success = 0;
        let failed = 0;

        for (const msg of notifications) {
            try {
                await messaging.send(msg);
                success++;
            } catch (error) {
                failed++;
                console.error('Failed to send:', error.message);

                // Nettoyer les tokens invalides
                if (error.code === 'messaging/registration-token-not-registered') {
                    // On pourrait supprimer le token ici
                }
            }
        }

        return res.json({
            success: true,
            time: now.toISOString(),
            sent: success,
            failed: failed,
            total: notifications.length
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    }
};
