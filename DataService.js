/**
 * DataService.js
 *
 * Service de gestion des données avec Firestore comme source unique de vérité.
 * Architecture simple: write direct Firestore, state en mémoire, pas de cache localStorage.
 *
 * Principes:
 * - Firestore = source de vérité
 * - Variables globales en mémoire = état temporaire
 * - localStorage = UI uniquement (thème, langue, dernier onglet)
 * - Connexion obligatoire pour toutes les actions critiques
 */

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
    Timestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

class DataService {
    constructor(db, uid) {
        if (!db) throw new Error('Firestore instance required');
        if (!uid) throw new Error('User ID required');

        this.db = db;
        this.uid = uid;
        this.listeners = []; // Pour cleanup
    }

    // ========================================
    // PROFILE
    // ========================================

    /**
     * Récupère le profil utilisateur
     * @returns {Promise<Object>} Profile data
     */
    async getProfile() {
        try {
            const docRef = doc(this.db, `users/${this.uid}/profile/current`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            }

            return null;
        } catch (error) {
            console.error('Error loading profile:', error);
            throw new Error('Impossible de charger le profil. Vérifiez votre connexion.');
        }
    }

    /**
     * Sauvegarde le profil utilisateur
     * @param {Object} profile - Profile data (weight, height, age, gender, etc.)
     */
    async saveProfile(profile) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/profile/current`);
            await setDoc(docRef, {
                ...profile,
                updatedAt: serverTimestamp()
            }, { merge: true }); // CRITIQUE: merge pour ne pas écraser les autres champs
        } catch (error) {
            console.error('Error saving profile:', error);
            throw new Error('Impossible de sauvegarder le profil. Vérifiez votre connexion.');
        }
    }

    // ========================================
    // MEALS
    // ========================================

    /**
     * Récupère les repas d'une date
     * @param {string} date - Format YYYY-MM-DD
     * @returns {Promise<Object>} Meal data
     */
    async getMeal(date) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/meals/${date}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            }

            // Retourner structure vide si pas de données
            return {
                breakfast: { foods: [], recipe: '' },
                lunch: { foods: [], recipe: '' },
                snack: { foods: [], recipe: '' },
                dinner: { foods: [], recipe: '' },
                water: 0
            };
        } catch (error) {
            console.error('Error loading meal:', error);
            throw new Error('Impossible de charger le repas. Vérifiez votre connexion.');
        }
    }

    /**
     * Sauvegarde les repas d'une date
     * @param {string} date - Format YYYY-MM-DD
     * @param {Object} mealData - Meal data (breakfast, lunch, snack, dinner, water)
     */
    async saveMeal(date, mealData) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/meals/${date}`);
            await setDoc(docRef, {
                ...mealData,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error saving meal:', error);
            throw new Error('Impossible de sauvegarder le repas. Vérifiez votre connexion.');
        }
    }

    /**
     * Récupère les repas d'une semaine
     * @param {Array<string>} dates - Array of dates (YYYY-MM-DD)
     * @returns {Promise<Object>} Object with date as key
     */
    async getMealsForWeek(dates) {
        try {
            const promises = dates.map(date => this.getMeal(date));
            const results = await Promise.all(promises);

            const mealsMap = {};
            dates.forEach((date, index) => {
                mealsMap[date] = results[index];
            });

            return mealsMap;
        } catch (error) {
            console.error('Error loading weekly meals:', error);
            throw new Error('Impossible de charger les repas de la semaine. Vérifiez votre connexion.');
        }
    }

    /**
     * Écoute les changements du repas d'une date en temps réel
     * @param {string} date - Format YYYY-MM-DD
     * @param {Function} callback - Appelé à chaque changement
     * @returns {Function} Unsubscribe function
     */
    listenToMeal(date, callback) {
        const docRef = doc(this.db, `users/${this.uid}/meals/${date}`);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                callback(docSnap.data());
            } else {
                callback({
                    breakfast: { foods: [], recipe: '' },
                    lunch: { foods: [], recipe: '' },
                    snack: { foods: [], recipe: '' },
                    dinner: { foods: [], recipe: '' },
                    water: 0
                });
            }
        }, (error) => {
            console.error('Error listening to meal:', error);
        });

        this.listeners.push(unsubscribe);
        return unsubscribe;
    }

    /**
     * Écoute les changements des repas d'une semaine en temps réel
     * @param {Array<string>} dates - Array of dates (YYYY-MM-DD)
     * @param {Function} callback - Appelé à chaque changement avec {date, data}
     * @returns {Array<Function>} Array of unsubscribe functions
     */
    listenToWeekMeals(dates, callback) {
        const unsubscribes = dates.map(date => {
            return this.listenToMeal(date, (data) => {
                callback({ date, data });
            });
        });

        return unsubscribes;
    }

    // ========================================
    // TRACKING (poids, composition corporelle)
    // ========================================

    /**
     * Récupère les données de tracking d'une date
     * @param {string} date - Format YYYY-MM-DD
     * @returns {Promise<Object>} Tracking data
     */
    async getTracking(date) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/tracking/${date}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            }

            return null;
        } catch (error) {
            console.error('Error loading tracking:', error);
            throw new Error('Impossible de charger le suivi. Vérifiez votre connexion.');
        }
    }

    /**
     * Sauvegarde les données de tracking
     * @param {string} date - Format YYYY-MM-DD
     * @param {Object} trackingData - {weight, bodyfat, muscle, etc.}
     */
    async saveTracking(date, trackingData) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/tracking/${date}`);
            await setDoc(docRef, {
                ...trackingData,
                date,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error saving tracking:', error);
            throw new Error('Impossible de sauvegarder le suivi. Vérifiez votre connexion.');
        }
    }

    /**
     * Récupère les N dernières entrées de tracking
     * @param {number} limitCount - Nombre d'entrées à récupérer
     * @returns {Promise<Array>} Array of tracking entries
     */
    async getRecentTracking(limitCount = 30) {
        try {
            const trackingRef = collection(this.db, `users/${this.uid}/tracking`);
            const q = query(trackingRef, orderBy('date', 'desc'), limit(limitCount));
            const querySnapshot = await getDocs(q);

            const tracking = [];
            querySnapshot.forEach((doc) => {
                tracking.push({ id: doc.id, ...doc.data() });
            });

            return tracking;
        } catch (error) {
            console.error('Error loading recent tracking:', error);
            throw new Error('Impossible de charger l\'historique. Vérifiez votre connexion.');
        }
    }

    // ========================================
    // CUSTOM FOODS (aliments personnalisés)
    // ========================================

    /**
     * Récupère tous les aliments personnalisés de l'utilisateur
     * @returns {Promise<Array>} Array of custom foods
     */
    async getCustomFoods() {
        try {
            const foodsRef = collection(this.db, `users/${this.uid}/customFoods`);
            const querySnapshot = await getDocs(foodsRef);

            const foods = [];
            querySnapshot.forEach((doc) => {
                foods.push({ id: doc.id, ...doc.data() });
            });

            return foods;
        } catch (error) {
            console.error('Error loading custom foods:', error);
            throw new Error('Impossible de charger les aliments. Vérifiez votre connexion.');
        }
    }

    /**
     * Sauvegarde un aliment personnalisé
     * @param {string} foodId - ID de l'aliment
     * @param {Object} foodData - {name, calories, protein, carbs, fat, etc.}
     */
    async saveCustomFood(foodId, foodData) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/customFoods/${foodId}`);
            await setDoc(docRef, {
                ...foodData,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error saving custom food:', error);
            throw new Error('Impossible de sauvegarder l\'aliment. Vérifiez votre connexion.');
        }
    }

    /**
     * Supprime un aliment personnalisé
     * @param {string} foodId - ID de l'aliment
     */
    async deleteCustomFood(foodId) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/customFoods/${foodId}`);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting custom food:', error);
            throw new Error('Impossible de supprimer l\'aliment. Vérifiez votre connexion.');
        }
    }

    // ========================================
    // MEAL TEMPLATES (templates de repas)
    // ========================================

    /**
     * Récupère tous les templates de repas de l'utilisateur
     * @returns {Promise<Array>} Array of meal templates
     */
    async getMealTemplates() {
        try {
            const templatesRef = collection(this.db, `users/${this.uid}/mealTemplates`);
            const querySnapshot = await getDocs(templatesRef);

            const templates = [];
            querySnapshot.forEach((doc) => {
                templates.push({ id: doc.id, ...doc.data() });
            });

            return templates;
        } catch (error) {
            console.error('Error loading meal templates:', error);
            throw new Error('Impossible de charger les templates. Vérifiez votre connexion.');
        }
    }

    /**
     * Sauvegarde un template de repas
     * @param {string} templateId - ID du template
     * @param {Object} templateData - Template data
     */
    async saveMealTemplate(templateId, templateData) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/mealTemplates/${templateId}`);
            await setDoc(docRef, {
                ...templateData,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error saving meal template:', error);
            throw new Error('Impossible de sauvegarder le template. Vérifiez votre connexion.');
        }
    }

    /**
     * Supprime un template de repas
     * @param {string} templateId - ID du template
     */
    async deleteMealTemplate(templateId) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/mealTemplates/${templateId}`);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting meal template:', error);
            throw new Error('Impossible de supprimer le template. Vérifiez votre connexion.');
        }
    }

    // ========================================
    // SETTINGS (objectifs macros, paramètres)
    // ========================================

    /**
     * Récupère les paramètres utilisateur
     * @returns {Promise<Object>} Settings data
     */
    async getSettings() {
        try {
            const docRef = doc(this.db, `users/${this.uid}/settings/current`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            }

            return null;
        } catch (error) {
            console.error('Error loading settings:', error);
            throw new Error('Impossible de charger les paramètres. Vérifiez votre connexion.');
        }
    }

    /**
     * Sauvegarde les paramètres utilisateur
     * @param {Object} settings - {macroTargets, calcSettings, etc.}
     */
    async saveSettings(settings) {
        try {
            const docRef = doc(this.db, `users/${this.uid}/settings/current`);
            await setDoc(docRef, {
                ...settings,
                updatedAt: serverTimestamp()
            }, { merge: true }); // CRITIQUE: merge pour ne pas écraser les autres champs
        } catch (error) {
            console.error('Error saving settings:', error);
            throw new Error('Impossible de sauvegarder les paramètres. Vérifiez votre connexion.');
        }
    }

    // ========================================
    // ADMIN TEMPLATES (templates globaux)
    // ========================================

    /**
     * Récupère tous les templates globaux (lecture seule pour users)
     * @returns {Promise<Array>} Array of smart templates
     */
    async getSmartTemplates() {
        try {
            const templatesRef = collection(this.db, 'smartTemplates');
            const q = query(templatesRef, where('enabled', '==', true), orderBy('priority', 'asc'));
            const querySnapshot = await getDocs(q);

            const templates = [];
            querySnapshot.forEach((doc) => {
                templates.push({ id: doc.id, ...doc.data() });
            });

            return templates;
        } catch (error) {
            console.error('Error loading smart templates:', error);
            throw new Error('Impossible de charger les templates. Vérifiez votre connexion.');
        }
    }

    // ========================================
    // CLEANUP
    // ========================================

    /**
     * Nettoie tous les listeners actifs
     */
    cleanup() {
        this.listeners.forEach(unsubscribe => unsubscribe());
        this.listeners = [];
    }
}

// Export pour utilisation globale
export default DataService;
