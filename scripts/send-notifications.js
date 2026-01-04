/**
 * NutriTrack - Script d'envoi de notifications
 * Exécuté par GitHub Actions toutes les 5 minutes
 */

const admin = require('firebase-admin');

// Messages personnalisés
const mealMessages = {
    breakfast: { title: '🌅 Petit-déjeuner', body: "N'oublie pas de noter ton petit-déjeuner !" },
    lunch: { title: '🍽️ Déjeuner', body: "C'est l'heure du déj ! Pense à logger ton repas." },
    snack: { title: '🍎 Goûter', body: "Un petit goûter ? Note-le pour garder le cap !" },
    dinner: { title: '🌙 Dîner', body: "Bon appétit ! N'oublie pas de noter ton dîner." }
};

async function main() {
    console.log('🚀 Démarrage envoi notifications...');
    console.log('⏰ Heure actuelle:', new Date().toISOString());

    // Initialiser Firebase
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

    if (!serviceAccount.project_id) {
        console.error('❌ FIREBASE_SERVICE_ACCOUNT non configuré');
        process.exit(1);
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();
    const messaging = admin.messaging();

    try {
        // Récupérer tous les utilisateurs avec FCM token
        const usersSnapshot = await db.collection('users')
            .where('fcmToken', '!=', null)
            .get();

        console.log(`👥 ${usersSnapshot.size} utilisateur(s) avec FCM token`);

        if (usersSnapshot.empty) {
            console.log('✅ Aucun utilisateur à notifier');
            return;
        }

        let sent = 0;
        let skipped = 0;

        for (const doc of usersSnapshot.docs) {
            const userData = doc.data();
            const schedules = userData.notificationSchedules || [];
            const fcmToken = userData.fcmToken;
            const userTimezone = userData.timezone || 'Europe/Paris';

            // Calculer l'heure locale de l'utilisateur
            const now = new Date();
            const userTime = now.toLocaleTimeString('fr-FR', {
                timeZone: userTimezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            // GitHub Actions tourne toutes les 5 min, donc on vérifie une fenêtre de 5 min
            const [currentHour, currentMinute] = userTime.split(':').map(Number);

            for (const schedule of schedules) {
                if (!schedule.enabled) continue;

                const [scheduleHour, scheduleMinute] = schedule.time.split(':').map(Number);

                // Vérifier si on est dans la fenêtre de 5 minutes
                const currentTotalMinutes = currentHour * 60 + currentMinute;
                const scheduleTotalMinutes = scheduleHour * 60 + scheduleMinute;
                const diff = currentTotalMinutes - scheduleTotalMinutes;

                // Notifier si on est entre 0 et 4 minutes après l'heure programmée
                if (diff >= 0 && diff < 5) {
                    const message = mealMessages[schedule.id] || {
                        title: 'NutriTrack',
                        body: schedule.body || "N'oublie pas de noter ton repas !"
                    };

                    try {
                        await messaging.send({
                            token: fcmToken,
                            notification: {
                                title: message.title,
                                body: message.body
                            },
                            webpush: {
                                notification: {
                                    icon: '/icon-192.png',
                                    badge: '/icon-192.png'
                                }
                            }
                        });
                        console.log(`✅ Notification envoyée: ${schedule.id} → ${doc.id}`);
                        sent++;
                    } catch (error) {
                        console.error(`❌ Erreur envoi ${doc.id}:`, error.message);

                        // Token invalide - le supprimer
                        if (error.code === 'messaging/registration-token-not-registered') {
                            await doc.ref.update({ fcmToken: null });
                            console.log(`🗑️ Token invalide supprimé pour ${doc.id}`);
                        }
                    }
                } else {
                    skipped++;
                }
            }
        }

        console.log(`\n📊 Résumé: ${sent} envoyée(s), ${skipped} non concernée(s)`);
        console.log('✅ Terminé');

    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

main();
