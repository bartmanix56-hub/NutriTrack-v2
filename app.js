// NutriTrack v2 - Main Application JavaScript
// Gestion complète de l'application de suivi nutritionnel

        // ===== PERFORMANCE: Fonctions utilitaires =====

        // Debounce : retarde l'exécution jusqu'à ce que l'utilisateur arrête d'interagir
        function debounce(func, delay) {
            let timeoutId;
            return function (...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        }

        // Throttle : limite le nombre d'exécutions par période de temps
        function throttle(func, limit) {
            let inThrottle;
            return function (...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }

        // ===== PERFORMANCE: Optimisation Lucide Icons =====
        // Au lieu d'appeler lucide.createIcons() partout (reparse tout le DOM),
        // on utilise un système de batching avec RAF pour regrouper les updates
        let iconsUpdatePending = false;
        let iconsUpdateContainers = new Set();

        function updateIcons(container = null) {
            if (typeof lucide === 'undefined') return;

            if (container) {
                iconsUpdateContainers.add(container);
            }

            if (!iconsUpdatePending) {
                iconsUpdatePending = true;
                requestAnimationFrame(() => {
                    if (iconsUpdateContainers.size > 0) {
                        // Créer les icônes uniquement dans les conteneurs spécifiés
                        iconsUpdateContainers.forEach(cont => {
                            if (cont && cont.querySelectorAll) {
                                lucide.createIcons({ icons: lucide.icons, nameAttr: 'data-lucide', attrs: {}, });
                            }
                        });
                        iconsUpdateContainers.clear();
                    } else {
                        // Si aucun conteneur spécifique, créer toutes les icônes (fallback)
                        lucide.createIcons();
                    }
                    iconsUpdatePending = false;
                });
            }
        }
        // ===== FIN OPTIMISATION LUCIDE =====

        // Food database
        let foodDatabase = []; // CHARGÉ DEPUIS FIRESTORE (voir index.html loadFoodDatabaseFromFirestore)

        // Expose foodDatabase globally for admin migration function
        window.foodDatabase = foodDatabase;

        // State management
        let dailyMeals = {
            breakfast: { foods: [], recipe: '' },
            lunch: { foods: [], recipe: '' },
            snack: { foods: [], recipe: '' },
            dinner: { foods: [], recipe: '' },
            water: 0
        };

        let weeklyPlan = {};

        // Charger currentWeekStart depuis localStorage ou utiliser la semaine actuelle
        let currentWeekStart = (() => {
            const saved = localStorage.getItem('currentWeekStart');
            if (saved) {
                return new Date(saved);
            }
            return getMonday(new Date());
        })();

        function getMonday(d) {
            const date = new Date(d);
            const day = date.getDay();
            const diff = date.getDate() - day + (day === 0 ? -6 : 1);
            return new Date(date.setDate(diff));
        } // Dec 16, 2024
        let currentGoal = 'cut';
        let currentMealType = null;

        // ===== DATA HELPERS - FIRESTORE FIRST =====
        // Ces fonctions gèrent le chargement/sauvegarde avec Firestore comme source de vérité

        /**
         * Charge les repas d'une date depuis Firestore
         * @param {string} date - Format YYYY-MM-DD
         * @returns {Promise<Object>} Repas du jour
         */
        async function loadMealFromFirestore(date) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, fallback localStorage');
                const allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
                return allMeals[date] || {
                    breakfast: { foods: [], recipe: '' },
                    lunch: { foods: [], recipe: '' },
                    snack: { foods: [], recipe: '' },
                    dinner: { foods: [], recipe: '' },
                    water: 0
                };
            }

            try {
                return await window.dataService.getMeal(date);
            } catch (error) {
                console.error('❌ Erreur chargement meal Firestore:', error);
                console.warn('⚠️ Fallback vers localStorage');
                const allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
                return allMeals[date] || {
                    breakfast: { foods: [], recipe: '' },
                    lunch: { foods: [], recipe: '' },
                    snack: { foods: [], recipe: '' },
                    dinner: { foods: [], recipe: '' },
                    water: 0
                };
            }
        }

        /**
         * Sauvegarde les repas d'une date vers Firestore
         * @param {string} date - Format YYYY-MM-DD
         * @param {Object} mealData - Données du repas
         */
        async function saveMealToFirestore(date, mealData) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, sauvegarde localStorage uniquement');
                const allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
                allMeals[date] = mealData;
                localStorage.setItem('allDailyMeals', JSON.stringify(allMeals));
                return;
            }

            try {
                await window.dataService.saveMeal(date, mealData);
            } catch (error) {
                console.error('❌ Erreur sauvegarde meal Firestore:', error);
                if (typeof showToast === 'function') {
                    showToast('Impossible de sauvegarder. Vérifie ta connexion.', 'error');
                }
                throw error;
            }
        }

        /**
         * Charge le profil utilisateur depuis Firestore
         * @returns {Promise<Object>} Profil utilisateur
         */
        async function loadProfileFromFirestore() {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, fallback localStorage');
                const saved = localStorage.getItem('userProfile');
                return saved ? JSON.parse(saved) : {};
            }

            try {
                return await window.dataService.getProfile();
            } catch (error) {
                console.error('❌ Erreur chargement profile Firestore:', error);
                console.warn('⚠️ Fallback vers localStorage');
                const saved = localStorage.getItem('userProfile');
                return saved ? JSON.parse(saved) : {};
            }
        }

        /**
         * Sauvegarde le profil utilisateur vers Firestore
         * @param {Object} profile - Profil utilisateur
         */
        async function saveProfileToFirestore(profile) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, sauvegarde localStorage uniquement');
                localStorage.setItem('userProfile', JSON.stringify(profile));
                return;
            }

            try {
                await window.dataService.saveProfile(profile);
            } catch (error) {
                console.error('❌ Erreur sauvegarde profile Firestore:', error);
                if (typeof showToast === 'function') {
                    showToast('Impossible de sauvegarder le profil.', 'error');
                }
                throw error;
            }
        }

        /**
         * Charge les settings (macroTargets, calcSettings, etc.) depuis Firestore
         * @returns {Promise<Object>} Settings
         */
        async function loadSettingsFromFirestore() {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, fallback localStorage');
                const macroTargets = localStorage.getItem('macroTargets');
                const calcSettings = localStorage.getItem('calcSettings');
                const calc_goal = localStorage.getItem('calc_goal');
                return {
                    macroTargets: macroTargets ? JSON.parse(macroTargets) : null,
                    calcSettings: calcSettings ? JSON.parse(calcSettings) : null,
                    calc_goal: calc_goal || null
                };
            }

            try {
                return await window.dataService.getSettings();
            } catch (error) {
                console.error('❌ Erreur chargement settings Firestore:', error);
                console.warn('⚠️ Fallback vers localStorage');
                const macroTargets = localStorage.getItem('macroTargets');
                const calcSettings = localStorage.getItem('calcSettings');
                const calc_goal = localStorage.getItem('calc_goal');
                return {
                    macroTargets: macroTargets ? JSON.parse(macroTargets) : null,
                    calcSettings: calcSettings ? JSON.parse(calcSettings) : null,
                    calc_goal: calc_goal || null
                };
            }
        }

        /**
         * Sauvegarde les settings vers Firestore
         * @param {Object} settings - Settings à sauvegarder
         */
        async function saveSettingsToFirestore(settings) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, sauvegarde localStorage uniquement');
                if (settings.macroTargets) localStorage.setItem('macroTargets', JSON.stringify(settings.macroTargets));
                if (settings.calcSettings) localStorage.setItem('calcSettings', JSON.stringify(settings.calcSettings));
                if (settings.calc_goal) localStorage.setItem('calc_goal', settings.calc_goal);
                // Sauvegarder aussi les champs individuels calc_*
                Object.keys(settings).forEach(key => {
                    if (key.startsWith('calc_') && key !== 'calc_goal') {
                        localStorage.setItem(key, settings[key]);
                    }
                });
                return;
            }

            try {
                await window.dataService.saveSettings(settings);
            } catch (error) {
                console.error('❌ Erreur sauvegarde settings Firestore:', error);
                if (typeof showToast === 'function') {
                    showToast('Impossible de sauvegarder les paramètres.', 'error');
                }
                throw error;
            }
        }

        /**
         * Charge toutes les données de tracking depuis Firestore
         * @returns {Promise<Array>} Array of tracking entries
         */
        async function loadTrackingFromFirestore() {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, fallback localStorage');
                const saved = localStorage.getItem('trackingData');
                return saved ? JSON.parse(saved) : [];
            }

            try {
                return await window.dataService.getRecentTracking(365); // 1 an de données
            } catch (error) {
                console.error('❌ Erreur chargement tracking Firestore:', error);
                console.warn('⚠️ Fallback vers localStorage');
                const saved = localStorage.getItem('trackingData');
                return saved ? JSON.parse(saved) : [];
            }
        }

        /**
         * Sauvegarde une entrée de tracking vers Firestore
         * @param {string} date - Format YYYY-MM-DD
         * @param {Object} trackingData - Tracking data (weight, bodyfat, etc.)
         */
        async function saveTrackingToFirestore(date, trackingData) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, sauvegarde localStorage uniquement');
                const saved = localStorage.getItem('trackingData') || '[]';
                let trackingArray = JSON.parse(saved);
                // Supprimer ancienne entrée de cette date
                trackingArray = trackingArray.filter(e => e.date !== date);
                // Ajouter nouvelle entrée
                trackingArray.push({date, ...trackingData});
                // Trier par date décroissante
                trackingArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                localStorage.setItem('trackingData', JSON.stringify(trackingArray));
                return;
            }

            try {
                await window.dataService.saveTracking(date, trackingData);
            } catch (error) {
                console.error('❌ Erreur sauvegarde tracking Firestore:', error);
                if (typeof showToast === 'function') {
                    showToast('Impossible de sauvegarder le suivi.', 'error');
                }
                throw error;
            }
        }

        /**
         * Supprime une entrée de tracking de Firestore
         * @param {string} date - Format YYYY-MM-DD
         */
        async function deleteTrackingFromFirestore(date) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, suppression localStorage uniquement');
                const saved = localStorage.getItem('trackingData') || '[]';
                let trackingArray = JSON.parse(saved);
                trackingArray = trackingArray.filter(e => e.date !== date);
                localStorage.setItem('trackingData', JSON.stringify(trackingArray));
                return;
            }

            try {
                await window.dataService.deleteTracking(date);
            } catch (error) {
                console.error('❌ Erreur suppression tracking Firestore:', error);
                if (typeof showToast === 'function') {
                    showToast('Impossible de supprimer le suivi.', 'error');
                }
                throw error;
            }
        }

        /**
         * Charge tous les custom foods depuis Firestore
         * @returns {Promise<Array>} Array of custom foods
         */
        async function loadCustomFoodsFromFirestore() {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, fallback localStorage');
                const saved = localStorage.getItem('customFoods');
                return saved ? JSON.parse(saved) : [];
            }

            try {
                return await window.dataService.getCustomFoods();
            } catch (error) {
                console.error('❌ Erreur chargement custom foods Firestore:', error);
                console.warn('⚠️ Fallback vers localStorage');
                const saved = localStorage.getItem('customFoods');
                return saved ? JSON.parse(saved) : [];
            }
        }

        /**
         * Sauvegarde un custom food vers Firestore
         * @param {string} foodId - ID du food (nom converti en slug)
         * @param {Object} foodData - Food data
         */
        async function saveCustomFoodToFirestore(foodId, foodData) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, sauvegarde localStorage uniquement');
                const saved = localStorage.getItem('customFoods') || '[]';
                let customFoodsArray = JSON.parse(saved);
                // Supprimer ancienne entrée si existe
                customFoodsArray = customFoodsArray.filter(f => f.name !== foodData.name);
                // Ajouter nouvelle entrée
                customFoodsArray.push(foodData);
                localStorage.setItem('customFoods', JSON.stringify(customFoodsArray));
                return;
            }

            try {
                await window.dataService.saveCustomFood(foodId, foodData);
            } catch (error) {
                console.error('❌ Erreur sauvegarde custom food Firestore:', error);
                if (typeof showToast === 'function') {
                    showToast('Impossible de sauvegarder l\'aliment.', 'error');
                }
                throw error;
            }
        }

        /**
         * Supprime un custom food de Firestore
         * @param {string} foodId - ID du food (nom converti en slug)
         */
        async function deleteCustomFoodFromFirestore(foodId) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, suppression localStorage uniquement');
                const saved = localStorage.getItem('customFoods') || '[]';
                let customFoodsArray = JSON.parse(saved);
                customFoodsArray = customFoodsArray.filter(f => f.name !== foodId);
                localStorage.setItem('customFoods', JSON.stringify(customFoodsArray));
                return;
            }

            try {
                await window.dataService.deleteCustomFood(foodId);
            } catch (error) {
                console.error('❌ Erreur suppression custom food Firestore:', error);
                if (typeof showToast === 'function') {
                    showToast('Impossible de supprimer l\'aliment.', 'error');
                }
                throw error;
            }
        }

        /**
         * Charge tous les meal templates depuis Firestore
         * @returns {Promise<Array>} Array of meal templates
         */
        async function loadMealTemplatesFromFirestore() {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, fallback localStorage');
                const saved = localStorage.getItem('mealTemplates');
                return saved ? JSON.parse(saved) : [];
            }

            try {
                return await window.dataService.getMealTemplates();
            } catch (error) {
                console.error('❌ Erreur chargement meal templates Firestore:', error);
                console.warn('⚠️ Fallback vers localStorage');
                const saved = localStorage.getItem('mealTemplates');
                return saved ? JSON.parse(saved) : [];
            }
        }

        /**
         * Sauvegarde un meal template vers Firestore
         * @param {string} templateId - ID du template
         * @param {Object} templateData - Template data
         */
        async function saveMealTemplateToFirestore(templateId, templateData) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, sauvegarde localStorage uniquement');
                const saved = localStorage.getItem('mealTemplates') || '[]';
                let templatesArray = JSON.parse(saved);
                // Supprimer ancienne entrée si existe
                templatesArray = templatesArray.filter(t => t.name !== templateData.name);
                // Ajouter nouvelle entrée
                templatesArray.push(templateData);
                localStorage.setItem('mealTemplates', JSON.stringify(templatesArray));
                return;
            }

            try {
                await window.dataService.saveMealTemplate(templateId, templateData);
            } catch (error) {
                console.error('❌ Erreur sauvegarde meal template Firestore:', error);
                if (typeof showToast === 'function') {
                    showToast('Impossible de sauvegarder le template.', 'error');
                }
                throw error;
            }
        }

        /**
         * Supprime un meal template de Firestore
         * @param {string} templateId - ID du template
         */
        async function deleteMealTemplateFromFirestore(templateId) {
            if (!window.dataService) {
                console.warn('⚠️ DataService non disponible, suppression localStorage uniquement');
                const saved = localStorage.getItem('mealTemplates') || '[]';
                let templatesArray = JSON.parse(saved);
                templatesArray = templatesArray.filter(t => t.name !== templateId);
                localStorage.setItem('mealTemplates', JSON.stringify(templatesArray));
                return;
            }

            try {
                await window.dataService.deleteMealTemplate(templateId);
            } catch (error) {
                console.error('❌ Erreur suppression meal template Firestore:', error);
                if (typeof showToast === 'function') {
                    showToast('Impossible de supprimer le template.', 'error');
                }
                throw error;
            }
        }

        // ===== FIN DATA HELPERS =====

        // ===== PWA INSTALL PROMPT =====
        let deferredInstallPrompt = null;

        window.addEventListener('beforeinstallprompt', (e) => {
            // Empêcher Chrome d'afficher le prompt automatiquement
            e.preventDefault();
            // Sauvegarder l'événement pour l'utiliser plus tard
            deferredInstallPrompt = e;
            // Afficher le bouton d'installation
            showInstallButton();
        });

        window.addEventListener('appinstalled', () => {
            // Cacher le bouton après installation
            hideInstallButton();
            deferredInstallPrompt = null;
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> NutriTrack installé avec succès !');
        });

        function showInstallButton() {
            const installInline = document.getElementById('pwa-install-inline');
            const landingInstallBtn = document.getElementById('landing-install-btn');
            // Afficher uniquement dans: Settings et Landing page
            if (installInline) installInline.style.display = 'block';
            if (landingInstallBtn) landingInstallBtn.style.display = 'inline-flex';
        }

        function hideInstallButton() {
            const installInline = document.getElementById('pwa-install-inline');
            const landingInstallBtn = document.getElementById('landing-install-btn');
            const footerInstallBtn = document.getElementById('footer-install-btn');
            const drawerInstallBtn = document.getElementById('drawer-install-btn');
            if (installInline) installInline.style.display = 'none';
            if (landingInstallBtn) landingInstallBtn.style.display = 'none';
            if (footerInstallBtn) footerInstallBtn.style.display = 'none';
            if (drawerInstallBtn) drawerInstallBtn.style.display = 'none';
        }

        // Afficher bouton install sur mobile (iOS n'a pas beforeinstallprompt)
        function checkMobileInstall() {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            // Vérifier si l'app est déjà installée (plusieurs méthodes)
            const isStandalone =
                window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone === true ||
                document.referrer.includes('android-app://');

            // Aussi vérifier si on est sur iOS en mode standalone
            const isIOSStandalone = window.navigator.standalone === true;

            // Seulement afficher le bouton si mobile ET PAS standalone
            if (isMobile && !isStandalone && !isIOSStandalone) {
                showInstallButton();
            } else if (isStandalone || isIOSStandalone) {
                // Si déjà installé, cacher le bouton
                hideInstallButton();
            }
        }
        // Exécuter au chargement
        document.addEventListener('DOMContentLoaded', checkMobileInstall);

        // ===== WEEKLY SUMMARY MOBILE ACCORDION =====
        window.toggleWeeklySummary = function() {
            const content = document.getElementById('weekly-summary-content');
            const toggle = document.getElementById('weekly-summary-toggle');

            if (!content || !toggle) return;

            const isOpen = content.classList.contains('open');

            if (isOpen) {
                content.classList.remove('open');
                toggle.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('open');
                toggle.style.transform = 'rotate(180deg)';
            }
        };

        // Show/hide chevron based on screen size
        function updateWeeklySummaryToggle() {
            const toggle = document.getElementById('weekly-summary-toggle');
            const content = document.getElementById('weekly-summary-content');

            if (!toggle || !content) return;

            if (window.innerWidth <= 768) {
                toggle.style.display = 'block';
                // Don't set inline styles - let CSS handle it
            } else {
                toggle.style.display = 'none';
                content.classList.remove('open');
                content.style.maxHeight = '';
                content.style.overflow = '';
                toggle.style.transform = 'rotate(0deg)';
            }
        }

        window.addEventListener('resize', updateWeeklySummaryToggle);
        document.addEventListener('DOMContentLoaded', updateWeeklySummaryToggle);

        // ===== HOME TAB =====
        // La page d'accueil est statique - pas de mise à jour dynamique nécessaire

        async function installPWA() {
            // Détecter iOS
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            const isAndroid = /Android/.test(navigator.userAgent);
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

            // Si déjà installé
            if (isStandalone) {
                showToast('<i data-lucide="check-circle" class="icon-inline"></i> L\'app est déjà installée !');
                return;
            }

            // iOS - pas de beforeinstallprompt
            if (isIOS) {
                showToast('<i data-lucide="share" class="icon-inline"></i> Appuie sur Partager <i data-lucide="square-plus" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> puis "Sur l\'écran d\'accueil"', 6000);
                return;
            }

            // Android/Chrome avec beforeinstallprompt
            if (deferredInstallPrompt) {
                deferredInstallPrompt.prompt();
                const { outcome } = await deferredInstallPrompt.userChoice;
                if (outcome === 'accepted') {
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Installation en cours...');
                }
                return;
            }

            // Android sans prompt (déjà installé ou pas supporté)
            if (isAndroid) {
                showToast('<i data-lucide="menu" class="icon-inline"></i> Menu ⋮ → "Installer l\'application" ou "Ajouter à l\'écran d\'accueil"', 5000);
                return;
            }

            // Autre navigateur
            showToast('<i data-lucide="info" class="icon-inline"></i> Utilise Chrome ou Safari pour installer');
        }

        // Tab switching
        // Fonction pour changer d'onglet programmatiquement
        // ===== SIDEBAR TOGGLE =====
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');

            // Save state
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        }

        function loadSidebarState() {
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) { document.getElementById('sidebar').classList.add('collapsed'); }
        }

        // ===== MOBILE DRAWER =====
        function toggleMobileDrawer() {
            const drawer = document.getElementById('mobile-drawer');
            const overlay = document.getElementById('mobile-drawer-overlay');

            drawer.classList.toggle('active');
            overlay.classList.toggle('active');
            document.documentElement.classList.toggle('drawer-open');
            document.body.classList.toggle('drawer-open');

            updateIcons();
        }

        function closeMobileDrawer() {
            const drawer = document.getElementById('mobile-drawer');
            const overlay = document.getElementById('mobile-drawer-overlay');
            drawer.classList.remove('active');
            overlay.classList.remove('active');
            document.documentElement.classList.remove('drawer-open');
            document.body.classList.remove('drawer-open');
        }

        function navigateFromDrawer(tabName) {
            closeMobileDrawer();
            switchTab(tabName);
        }

        function switchTab(tabName) {
            // Protection admin - bloquer l'accès si non admin
            if (tabName === 'admin') {
                if (typeof window.isAdmin !== 'function' || !window.isAdmin()) {
                    if (typeof showToast === 'function') {
                        showToast('<i data-lucide="shield-x" class="icon-inline"></i> Accès non autorisé', 'error');
                    }
                    return;
                }
            }

            // Sauvegarder l'onglet actif pour le restaurer après F5
            localStorage.setItem('lastActiveTab', tabName);

            // Désactiver tous les onglets
            document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Activer le bouton sidebar s'il existe
            const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
            if (targetBtn) targetBtn.classList.add('active');

            // Activer le tab content
            const targetContent = document.getElementById(tabName);
            if (targetContent) targetContent.classList.add('active');

            // Actions spécifiques par onglet (comme switchToTab)
            if (tabName === 'home') {
                if (typeof updateHomeTab === 'function') updateHomeTab();
            } else if (tabName === 'planner') {
                renderWeeklyPlan();
            } else if (tabName === 'tracking') {
                renderTrackingList();
            } else if (tabName === 'meal-templates') {
                renderMealTemplatesList();
            } else if (tabName === 'settings') {
                if (typeof updateSettingsStats === 'function') updateSettingsStats();
            } else if (tabName === 'admin') {
                if (typeof window.showAdminSection === 'function') window.showAdminSection('dashboard');
            }

            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Tab switching - EXCLURE le bouton Plus qui n'a pas de data-tab
        document.querySelectorAll('.sidebar-btn[data-tab]').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                if (tab) switchToTab(tab);
            });
        });

        // Fonction générique pour changer de tab
        function switchToTab(tab) {
            // Protection admin - bloquer l'accès si non admin
            if (tab === 'admin') {
                if (typeof window.isAdmin !== 'function' || !window.isAdmin()) {
                    if (typeof showToast === 'function') {
                        showToast('<i data-lucide="shield-x" class="icon-inline"></i> Accès non autorisé', 'error');
                    }
                    return;
                }
            }

            // Sauvegarder l'onglet actif pour le restaurer après F5
            localStorage.setItem('lastActiveTab', tab);

            document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Activer le bouton sidebar s'il existe
            const sidebarBtn = document.querySelector(`[data-tab="${tab}"]`);
            if (sidebarBtn)  { sidebarBtn.classList.add('active'); }

            // Activer le tab content
            const tabContent = document.getElementById(tab);
            if (tabContent)  { tabContent.classList.add('active'); }

            if (tab === 'home') { if (typeof updateHomeTab === 'function') updateHomeTab(); }
            else if (tab === 'planner')  {
                // Ne pas réinitialiser currentWeekStart pour garder la semaine sélectionnée par l'utilisateur
                // currentWeekStart garde sa valeur actuelle ou celle sauvegardée
                renderWeeklyPlan();
            } else if (tab === 'tracking')  { renderTrackingList(); } else if (tab === 'meal-templates')  { renderMealTemplatesList(); } else if (tab === 'settings')  { if (typeof updateSettingsStats === 'function') updateSettingsStats(); } else if (tab === 'admin')  { if (typeof window.showAdminSection === 'function') window.showAdminSection('dashboard'); }

            // Scroll to top
            window.scrollTo({top: 0, behavior: 'smooth'});
        }

        // Restaurer l'onglet actif après F5
        document.addEventListener('DOMContentLoaded', () => {
            const lastTab = localStorage.getItem('lastActiveTab');
            if (lastTab && lastTab !== 'home') {
                // Attendre un peu pour que tout soit initialisé
                setTimeout(() => {
                    switchToTab(lastTab);

                    // Si c'était l'admin, restaurer aussi la sous-section admin
                    if (lastTab === 'admin') {
                        const lastAdminSection = localStorage.getItem('lastAdminSection');
                        if (lastAdminSection && typeof window.showAdminSection === 'function') {
                            setTimeout(() => {
                                window.showAdminSection(lastAdminSection);
                            }, 200);
                        }
                    }
                }, 100);
            }
        });

        // Goal selection
        function checkFatWarning(value, type) {
            const fatValue = parseFloat(value);
            const warningId = type === 'cut' ? 'fat-warning-cut' : 'fat-warning-bulk';
            const warningElement = document.getElementById(warningId);

            if (fatValue > 1.2) { warningElement.style.display = 'block'; } else  { warningElement.style.display = 'none'; }
        }

        function selectGoal(goal, isLoading = false) {
            currentGoal = goal;
            document.querySelectorAll('.goal-btn:not(.pace-btn)').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-goal="${goal}"]`)?.classList.add('active');

            // Masquer toutes les options
            document.getElementById('cut-options').style.display = 'none';
            document.getElementById('maintain-options').style.display = 'none';
            document.getElementById('bulk-options').style.display = 'none';

            // Afficher les options correspondantes SEULEMENT si en mode avancé
            const advancedMode = document.getElementById('advanced-mode');
            const isAdvancedMode = advancedMode && advancedMode.style.display !== 'none';

            if (isAdvancedMode) {
                if (goal === 'cut') {
                    document.getElementById('cut-options').style.display = 'block';
                } else if (goal === 'maintain') {
                    document.getElementById('maintain-options').style.display = 'block';
                } else if (goal === 'bulk') {
                    document.getElementById('bulk-options').style.display = 'block';
                }
            }

            // Adapter le label et les boutons en mode guidé
            const paceLabel = document.getElementById('pace-label');
            const paceDeficitBtns = document.getElementById('pace-btns-deficit');
            const paceMaintainBtns = document.getElementById('pace-btns-maintain');

            if (goal === 'maintain') {
                // Mode maintien : afficher la question de répartition
                if (paceLabel) {
                    paceLabel.innerHTML = '<i data-lucide="scale" style="width: 16px; height: 16px; display: inline; vertical-align: middle; margin-right: 4px;"></i>Quelle répartition préfères-tu ?';
                    updateIcons();
                }
                if (paceDeficitBtns) paceDeficitBtns.style.display = 'none';
                if (paceMaintainBtns) {
                    paceMaintainBtns.style.display = 'grid';
                    // Sélectionner "Équilibré" par défaut si rien n'est actif
                    if (!isLoading && !document.querySelector('#pace-btns-maintain .pace-btn.active')) {
                        setTimeout(() => {
                            if (typeof window.selectPace === 'function') {
                                window.selectPace('balanced');
                            }
                        }, 50);
                    }
                }
            } else {
                // Mode sèche/prise : afficher la question de rythme
                if (paceLabel) {
                    paceLabel.innerHTML = '<i data-lucide="gauge" style="width: 16px; height: 16px; display: inline; vertical-align: middle; margin-right: 4px;"></i>Quel rythme souhaites-tu ?';
                    updateIcons();
                }
                if (paceDeficitBtns) paceDeficitBtns.style.display = 'grid';
                if (paceMaintainBtns) paceMaintainBtns.style.display = 'none';
            }

            // Sauvegarder le goal
            localStorage.setItem('calc_goal', goal);
            if (!isLoading) {
                saveSettingsToFirestore({ calc_goal: goal }).catch(err => {
                    console.error('Erreur sauvegarde goal:', err);
                });
            }

            // Si en mode guidé, réappliquer le rythme sélectionné
            // SAUF si on est en train de charger (isLoading = true)
            const guidedMode = document.getElementById('guided-mode');
            const isGuidedMode = guidedMode && guidedMode.style.display !== 'none';

            if (isGuidedMode && !isLoading) {
                const selectedPaceBtn = document.querySelector('.pace-btn.active');
                if (selectedPaceBtn) {
                    const pace = selectedPaceBtn.getAttribute('data-pace');
                    if (pace && typeof window.selectPace === 'function') {
                        // Réappliquer le rythme avec le nouvel objectif
                        window.selectPace(pace);
                    }
                }
            } else if (!isLoading) {
                // En mode avancé, juste revalider (sauf au chargement)
                validateMacroInputs();
            }
        }

        // Sélection du rythme en mode guidé
        window.selectPace = function(pace, skipCalculate = false) {
            // Mise à jour visuelle des boutons
            document.querySelectorAll('.pace-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            const selectedBtn = document.querySelector(`[data-pace="${pace}"]`);
            if (selectedBtn) {
                selectedBtn.classList.add('active');
            }

            // Récupérer le niveau d'activité
            const activity = parseFloat(document.getElementById('activity')?.value || 1.2);

            // Définir les valeurs selon le rythme, l'objectif ET l'activité
            const paceSettings = {
                // Rythmes pour sèche/prise
                gentle: {
                    deficit: 15,
                    surplus: 5,
                    protein: 1.8,
                    fat: 0.8
                },
                normal: {
                    deficit: 18,
                    surplus: 8,
                    protein: 2.0,
                    fat: 0.9
                },
                fast: {
                    // Adapter selon l'activité pour éviter glucides absurdes
                    deficit: activity <= 1.2 ? 18 :      // Sédentaire: cap à 18%
                             activity <= 1.375 ? 20 :     // Légèrement actif: 20%
                             22,                          // Actif+: 22%
                    surplus: activity <= 1.2 ? 8 :       // Sédentaire: cap à 8%
                             12,                          // Actif: 12%
                    protein: activity <= 1.2 ? 1.8 : 2.0, // Sédentaire: moins de protéines
                    fat: 0.9
                },
                // Répartitions pour maintien
                'high-carb': {
                    protein: 1.8,
                    fat: 0.7  // Moins de lipides = plus de glucides
                },
                'balanced': {
                    protein: 2.0,
                    fat: 0.9  // Équilibré classique
                },
                'high-fat': {
                    protein: 1.8,
                    fat: 1.1  // Plus de lipides = moins de glucides
                }
            };

            const settings = paceSettings[pace];

            if (!settings) {
                console.error('Pace inconnu:', pace);
                return;
            }

            // Appliquer les valeurs selon l'objectif actuel
            if (currentGoal === 'cut') {
                const deficitInput = document.getElementById('deficit');
                const proteinInput = document.getElementById('proteinCoeff');
                const fatInput = document.getElementById('fatCoeff');

                if (deficitInput) deficitInput.value = settings.deficit;
                if (proteinInput) proteinInput.value = settings.protein;
                if (fatInput) fatInput.value = settings.fat;

            } else if (currentGoal === 'bulk') {
                const surplusInput = document.getElementById('surplus');
                const proteinInput = document.getElementById('proteinCoeffBulk');
                const fatInput = document.getElementById('fatCoeffBulk');

                if (surplusInput) surplusInput.value = settings.surplus;
                if (proteinInput) proteinInput.value = settings.protein;
                if (fatInput) fatInput.value = settings.fat;

            } else if (currentGoal === 'maintain') {
                const proteinInput = document.getElementById('proteinCoeffMaintain');
                const fatInput = document.getElementById('fatCoeffMaintain');

                if (proteinInput) proteinInput.value = settings.protein;
                if (fatInput) fatInput.value = settings.fat;
            }

            // Sauvegarder le rythme sélectionné (localStorage ET Firestore)
            localStorage.setItem('selectedPace', pace);

            // Ne sauvegarder dans Firestore que si pas en mode chargement
            if (!skipCalculate) {
                saveSettingsToFirestore({ selectedPace: pace }).catch(err => {
                    console.error('Erreur sauvegarde selectedPace:', err);
                });
            }

            // Calculer automatiquement les macros (sauf si skipCalculate = true)
            if (!skipCalculate) {
                setTimeout(() => {
                    if (typeof calculateMacros === 'function') {
                        calculateMacros();
                    }
                }, 100);
            }
        };

        // Toggle entre mode guidé et mode avancé
        window.toggleAdvancedMode = function() {
            const guidedMode = document.getElementById('guided-mode');
            const advancedMode = document.getElementById('advanced-mode');
            const guidedPreview = document.getElementById('guided-preview');

            if (advancedMode.style.display === 'none') {
                // Animation de sortie de la preview
                if (guidedPreview) {
                    guidedPreview.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    guidedPreview.style.opacity = '0';
                    guidedPreview.style.transform = 'translateY(-10px)';
                }

                // Passer en mode avancé après l'animation
                setTimeout(() => {
                    guidedMode.style.display = 'none';
                    advancedMode.style.display = 'block';
                    advancedMode.style.opacity = '0';
                    advancedMode.style.transform = 'translateY(10px)';

                    // Animation d'entrée du mode avancé
                    setTimeout(() => {
                        advancedMode.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        advancedMode.style.opacity = '1';
                        advancedMode.style.transform = 'translateY(0)';
                    }, 10);

                    localStorage.setItem('calculatorMode', 'advanced');
                    saveSettingsToFirestore({ calculatorMode: 'advanced' }).catch(err => {
                        console.error('Erreur sauvegarde calculatorMode:', err);
                    });

                    // Afficher les options correspondant à l'objectif actuel
                    document.getElementById('cut-options').style.display = 'none';
                    document.getElementById('maintain-options').style.display = 'none';
                    document.getElementById('bulk-options').style.display = 'none';

                    if (currentGoal === 'cut') {
                        document.getElementById('cut-options').style.display = 'block';
                    } else if (currentGoal === 'maintain') {
                        document.getElementById('maintain-options').style.display = 'block';
                    } else if (currentGoal === 'bulk') {
                        document.getElementById('bulk-options').style.display = 'block';
                    }
                }, 300);

            } else {
                // Animation de sortie du mode avancé
                advancedMode.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                advancedMode.style.opacity = '0';
                advancedMode.style.transform = 'translateY(10px)';

                // Revenir en mode guidé après l'animation
                setTimeout(() => {
                    advancedMode.style.display = 'none';
                    guidedMode.style.display = 'block';

                    // Réinitialiser et animer la preview
                    if (guidedPreview) {
                        guidedPreview.style.opacity = '0';
                        guidedPreview.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            guidedPreview.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            guidedPreview.style.opacity = '1';
                            guidedPreview.style.transform = 'translateY(0)';
                        }, 10);
                    }

                    localStorage.setItem('calculatorMode', 'guided');
                    saveSettingsToFirestore({ calculatorMode: 'guided' }).catch(err => {
                        console.error('Erreur sauvegarde calculatorMode:', err);
                    });

                    // Masquer toutes les options en mode guidé
                    document.getElementById('cut-options').style.display = 'none';
                    document.getElementById('maintain-options').style.display = 'none';
                    document.getElementById('bulk-options').style.display = 'none';

                    // Réappliquer le rythme sélectionné
                    const selectedPaceBtn = document.querySelector('.pace-btn.active');
                    if (selectedPaceBtn) {
                        const pace = selectedPaceBtn.getAttribute('data-pace');
                        if (pace && typeof window.selectPace === 'function') {
                            window.selectPace(pace);
                        }
                    }
                }, 300);
            }
        };

        // === VALIDATION EN TEMPS RÉEL DES MACROS ===
        function validateMacroInputs() {
            // 1. Récupérer toutes les données nécessaires
            const weight = parseFloat(document.getElementById('weight')?.value);
            const height = parseFloat(document.getElementById('height')?.value);
            const birthDay = document.getElementById('birth-day')?.value;
            const birthMonth = document.getElementById('birth-month')?.value;
            const birthYear = document.getElementById('birth-year')?.value;
            const gender = document.getElementById('profile-gender')?.value;
            const activity = parseFloat(document.getElementById('activity')?.value);

            // Calculate age from dropdowns
            let age = null;
            if (birthDay && birthMonth && birthYear) {
                const today = new Date();
                const birth = new Date(parseInt(birthYear), parseInt(birthMonth), parseInt(birthDay));
                age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }
            }

            // Si données incomplètes, ne rien faire
            if (!weight || !height || !age || !gender || !activity)  { return; }

            // 2. Calculer BMR et TDEE (Mifflin-St Jeor)
            let bmr;
            if (gender === 'male')  { bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5; } else  { bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161; }
            const tdee = bmr * activity;

            // 3. Calculer calories cibles selon objectif
            let targetCalories, proteinCoeff, fatCoeff;

            if (currentGoal === 'cut') {
                const deficit = parseFloat(document.getElementById('deficit').value) / 100;
                targetCalories = tdee * (1 - deficit);
                proteinCoeff = parseFloat(document.getElementById('proteinCoeff').value);
                fatCoeff = parseFloat(document.getElementById('fatCoeff').value);
            } else if (currentGoal === 'maintain') {
                // Mode maintien: TDEE = calories cibles (pas de déficit ni surplus)
                targetCalories = tdee;
                proteinCoeff = parseFloat(document.getElementById('proteinCoeffMaintain').value);
                fatCoeff = parseFloat(document.getElementById('fatCoeffMaintain').value);
            } else {
                const surplus = parseFloat(document.getElementById('surplus').value) / 100;
                targetCalories = tdee * (1 + surplus);
                proteinCoeff = parseFloat(document.getElementById('proteinCoeffBulk').value);
                fatCoeff = parseFloat(document.getElementById('fatCoeffBulk').value);
            }

            // 4. Calculer macros
            const protein = proteinCoeff * weight;
            const fat = fatCoeff * weight;

            const proteinCal = protein * 4;
            const fatCal = fat * 9;
            const usedCal = proteinCal + fatCal;
            const remainingCal = targetCalories - usedCal;
            const carbs = remainingCal / 4;

            // 5. Vérifier si configuration valide
            const warningBox = document.getElementById('macro-warning');
            const calculateBtn = document.querySelector('button[onclick*="calculateMacros"]');

            if (!warningBox || !calculateBtn) return; // Éléments pas encore chargés

            // Seuil : minimum 50g de glucides
            if (carbs < 50) {
                // AFFICHER WARNING + DÉSACTIVER BOUTON
                warningBox.style.display = 'block';
                warningBox.innerHTML = `
                    <div style="font-weight: 600; color: var(--accent-danger); margin-bottom: var(--space-sm);"><i data-lucide="alert-triangle" class="icon-inline"></i> Configuration impossible</div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                        Avec ces réglages, ton objectif calorique ne peut pas être respecté.
                    </div>
                    <div style="margin-top: var(--space-md); padding: var(--space-md); background: rgba(0,0,0,0.2); border-radius: var(--radius-sm); font-size: 0.85rem;">
                        <strong style="color: var(--text-primary);">Budget calorique :</strong> ${Math.round(targetCalories)} kcal<br>
                        <strong style="color: var(--text-primary);">Protéines + Lipides :</strong> ${Math.round(usedCal)} kcal<br>
                        <strong style="color: ${carbs < 0 ? 'var(--accent-danger)' : 'var(--accent-fat)'};">Reste pour glucides :</strong> ${Math.round(remainingCal)} kcal ${carbs < 0 ? '(<i data-lucide="x-circle" class="icon-inline"></i> négatif)' : `(<i data-lucide="alert-triangle" class="icon-inline"></i> ${Math.round(carbs)}g - trop faible)`}
                    </div>
                    <div style="margin-top: var(--space-md); font-size: 0.85rem; color: var(--text-secondary);">
                        <strong style="color: var(--text-primary);">Solutions :</strong> Réduis ton déficit, tes protéines ou tes lipides.
                    </div>
                `;
                calculateBtn.disabled = true;
                calculateBtn.style.opacity = '0.5';
                calculateBtn.style.cursor = 'not-allowed';
            } else {
                // TOUT VA BIEN
                warningBox.style.display = 'none';
                calculateBtn.disabled = false;
                calculateBtn.style.opacity = '1';
                calculateBtn.style.cursor = 'pointer';
            }
        }

        // Calculate macros using EXACT formulas from the sheet
        function tryAutoCalculate() {
            // Only auto-calculate if profile is already complete
            const validation = validateProfile();
            if (validation.valid) { calculateMacros(); }
        }

        // Variable globale pour suivre le setTimeout de notification de calcul
        let pendingCalculationNotification = null;

        async function calculateMacros(silent = false) {
            // LOG pour debug - à retirer plus tard si besoin
            console.log('📊 calculateMacros appelé, silent:', silent, new Error().stack);
            // FEEDBACK VISUEL DU BOUTON (seulement si pas silencieux)
            const btn = document.getElementById('calculate-btn');
            if (btn && !silent) {
                btn.innerHTML = '<i data-lucide="loader" style="width: 18px; height: 18px; animation: spin 1s linear infinite;"></i> Calcul en cours...';
                updateIcons();
                btn.disabled = true;
            }

            hideProfileAlert();

            // VALIDATIONS EXPLICITES
            const birthDay = document.getElementById('birth-day')?.value;
            const birthMonth = document.getElementById('birth-month')?.value;
            const birthYear = document.getElementById('birth-year')?.value;

            if (!birthDay || !birthMonth || !birthYear) {
                showProfileAlert('<i data-lucide="x-circle" class="icon-inline"></i> Date de naissance manquante - Remplis jour, mois et année'); document.getElementById('birth-day')?.focus(); document.getElementById('birth-day')?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                if (btn) {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 18px; height: 18px;"></i> Calculer mes macros';
                    updateIcons();
                    btn.disabled = false;
                }
                return;
            }

            const gender = document.getElementById('profile-gender')?.value;
            if (!gender) {
                showProfileAlert('<i data-lucide="x-circle" class="icon-inline"></i> Sexe non sélectionné - Choisis Homme ou Femme'); document.getElementById('profile-gender')?.focus(); document.getElementById('profile-gender')?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                if (btn) {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 18px; height: 18px;"></i> Calculer mes macros';
                    updateIcons();
                    btn.disabled = false;
                }
                return;
            }

            const height = parseFloat(document.getElementById('height')?.value);
            if (!height || height <= 0) {
                showProfileAlert('<i data-lucide="x-circle" class="icon-inline"></i> Taille manquante ou invalide - Entre ta taille en cm'); document.getElementById('height')?.focus(); document.getElementById('height')?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                if (btn) {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 18px; height: 18px;"></i> Calculer mes macros';
                    updateIcons();
                    btn.disabled = false;
                }
                return;
            }

            const weight = parseFloat(document.getElementById('weight')?.value);
            if (!weight || weight <= 0) {
                showProfileAlert('<i data-lucide="x-circle" class="icon-inline"></i> Poids manquant ou invalide - Entre ton poids en kg'); document.getElementById('weight')?.focus(); document.getElementById('weight')?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                if (btn) {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 18px; height: 18px;"></i> Calculer mes macros';
                    updateIcons();
                    btn.disabled = false;
                }
                return;
            }

            const activity = parseFloat(document.getElementById('activity')?.value);
            if (!activity) {
                showProfileAlert('<i data-lucide="x-circle" class="icon-inline"></i> Niveau d\'activité non sélectionné - Choisis ton niveau');
                if (btn) {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 18px; height: 18px;"></i> Calculer mes macros';
                    updateIcons();
                    btn.disabled = false;
                }
                return;
            }

            // Récupérer les données du profil

            // Calculate age from birth dropdowns
            let age = null;
            if (birthDay && birthMonth && birthYear) {
                const today = new Date();
                const birth = new Date(parseInt(birthYear), parseInt(birthMonth), parseInt(birthDay));
                age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }
            }

            // Validation
            if (!weight || !height || !age || !gender || !activity) {
                showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Remplis tous les champs obligatoires (*) pour calculer tes macros.');
                return;
            }

            if (age < 10) {
                showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> L\'âge minimum est de 10 ans. Vérifie ta date de naissance.');
                return;
            }

            // Sauvegarder le profil (ATTENDRE la fin de la sauvegarde)
            await saveProfile();

            // MIFFLIN-ST JEOR FORMULA
            // Homme : BMR = (10 × poids) + (6.25 × taille) - (5 × âge) + 5
            // Femme : BMR = (10 × poids) + (6.25 × taille) - (5 × âge) - 161

            let bmr;
            if (gender === 'male')  { bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5; } else  { bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161; }

            // TDEE = BMR × Facteur d'activité
            const tdee = bmr * activity;


            let targetCalories, protein, fat, carbs;

            if (currentGoal === 'cut') {
                // SÈCHE
                const deficitInput = document.getElementById('deficit').value;
                const proteinCoeffInput = document.getElementById('proteinCoeff').value;
                const fatCoeffInput = document.getElementById('fatCoeff').value;

                // Vérifier que les champs sont remplis
                if (!deficitInput || deficitInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Déficit calorique (%) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; updateIcons(); }
                    document.getElementById('deficit')?.focus();
                    return;
                }
                if (!proteinCoeffInput || proteinCoeffInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Protéines (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; updateIcons(); }
                    document.getElementById('proteinCoeff')?.focus();
                    return;
                }
                if (!fatCoeffInput || fatCoeffInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Lipides (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; updateIcons(); }
                    document.getElementById('fatCoeff')?.focus();
                    return;
                }

                const deficit = parseFloat(deficitInput) / 100;
                const proteinCoeff = parseFloat(proteinCoeffInput);
                const fatCoeff = parseFloat(fatCoeffInput);

                // GARDE-FOUS: Validation des limites
                if (deficit < 0.10 || deficit > 0.25) {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Déficit invalide : max 25%');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; }
                    return;
                }
                if (proteinCoeff < 1.5 || proteinCoeff > 2.2) {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Protéines invalides : min 1,5 g/kg, max 2,2 g/kg');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; }
                    return;
                }
                if (fatCoeff < 0.6 || fatCoeff > 1.5) {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Lipides invalides : min 0,6 g/kg, max 1,5 g/kg');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; }
                    return;
                }

                // Calories cibles = TDEE × (1 - déficit%)
                targetCalories = tdee * (1 - deficit);

                // Protéines et lipides basés sur le POIDS TOTAL (pas masse sèche)
                protein = proteinCoeff * weight;
                fat = fatCoeff * weight;

                // Arrondir aux 5g près
                protein = Math.round(protein / 5) * 5;
                fat = Math.round(fat / 5) * 5;

                // Glucides = calories restantes / 4
                const proteinCal = protein * 4;
                const fatCal = fat * 9;
                const remainingCal = targetCalories - proteinCal - fatCal;
                carbs = Math.round((remainingCal / 4) / 5) * 5;

            } else if (currentGoal === 'maintain') {
                // MAINTIEN
                const proteinCoeffMaintainInput = document.getElementById('proteinCoeffMaintain').value;
                const fatCoeffMaintainInput = document.getElementById('fatCoeffMaintain').value;

                // Vérifier que les champs sont remplis
                if (!proteinCoeffMaintainInput || proteinCoeffMaintainInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Protéines (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; updateIcons(); }
                    document.getElementById('proteinCoeffMaintain')?.focus();
                    return;
                }
                if (!fatCoeffMaintainInput || fatCoeffMaintainInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Lipides (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; updateIcons(); }
                    document.getElementById('fatCoeffMaintain')?.focus();
                    return;
                }

                const proteinCoeff = parseFloat(proteinCoeffMaintainInput);
                const fatCoeff = parseFloat(fatCoeffMaintainInput);

                // Validation des limites
                if (proteinCoeff < 1.5 || proteinCoeff > 2.2) {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Protéines invalides : min 1,5 g/kg, max 2,2 g/kg');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; }
                    return;
                }
                if (fatCoeff < 0.6 || fatCoeff > 1.5) {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Lipides invalides : min 0,6 g/kg, max 1,5 g/kg');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; }
                    return;
                }

                // Calories cibles = TDEE (pas de modification)
                targetCalories = tdee;

                // Protéines et lipides basés sur le POIDS TOTAL
                protein = proteinCoeff * weight;
                fat = fatCoeff * weight;

                // Arrondir aux 5g près
                protein = Math.round(protein / 5) * 5;
                fat = Math.round(fat / 5) * 5;

                // Glucides = calories restantes / 4
                const proteinCal = protein * 4;
                const fatCal = fat * 9;
                const remainingCal = targetCalories - proteinCal - fatCal;
                carbs = Math.round((remainingCal / 4) / 5) * 5;

            } else {
                // PRISE DE MASSE
                const surplusInput = document.getElementById('surplus').value;
                const proteinCoeffBulkInput = document.getElementById('proteinCoeffBulk').value;
                const fatCoeffBulkInput = document.getElementById('fatCoeffBulk').value;

                // Vérifier que les champs sont remplis
                if (!surplusInput || surplusInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Surplus calorique (%) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; updateIcons(); }
                    document.getElementById('surplus')?.focus();
                    return;
                }
                if (!proteinCoeffBulkInput || proteinCoeffBulkInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Protéines (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; updateIcons(); }
                    document.getElementById('proteinCoeffBulk')?.focus();
                    return;
                }
                if (!fatCoeffBulkInput || fatCoeffBulkInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Lipides (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; updateIcons(); }
                    document.getElementById('fatCoeffBulk')?.focus();
                    return;
                }

                const surplus = parseFloat(surplusInput) / 100;
                const proteinCoeff = parseFloat(proteinCoeffBulkInput);
                const fatCoeff = parseFloat(fatCoeffBulkInput);

                // Calories cibles = TDEE × (1 + surplus%)
                targetCalories = tdee * (1 + surplus);

                // Protéines et lipides basés sur le POIDS TOTAL
                protein = proteinCoeff * weight;
                fat = fatCoeff * weight;

                // Arrondir aux 5g près
                protein = Math.round(protein / 5) * 5;
                fat = Math.round(fat / 5) * 5;

                // Glucides = calories restantes / 4
                const proteinCal = protein * 4;
                const fatCal = fat * 9;
                const remainingCal = targetCalories - proteinCal - fatCal;
                carbs = Math.round((remainingCal / 4) / 5) * 5;

            }

            // GARDE-FOU : Assurer un minimum de glucides (80g)
            // Uniquement en mode guidé pour ne pas interférer avec le mode avancé
            const guidedMode = document.getElementById('guided-mode');
            const isGuidedMode = guidedMode && guidedMode.style.display !== 'none';
            const MIN_CARBS = 80;
            let adjustedAutomatically = false;

            if (isGuidedMode && carbs < MIN_CARBS) {
                // Calculer le déficit/surplus nécessaire pour avoir MIN_CARBS glucides
                const proteinCal = protein * 4;
                const fatCal = fat * 9;
                const minCarbsCal = MIN_CARBS * 4;
                const minTargetCalories = proteinCal + fatCal + minCarbsCal;

                // Calculer le nouveau déficit/surplus
                let newDeficitOrSurplus;
                if (currentGoal === 'cut') {
                    newDeficitOrSurplus = (1 - (minTargetCalories / tdee)) * 100;
                    // Mettre à jour l'input
                    const deficitInput = document.getElementById('deficit');
                    if (deficitInput) deficitInput.value = Math.round(newDeficitOrSurplus);
                } else if (currentGoal === 'bulk') {
                    newDeficitOrSurplus = ((minTargetCalories / tdee) - 1) * 100;
                    // Mettre à jour l'input
                    const surplusInput = document.getElementById('surplus');
                    if (surplusInput) surplusInput.value = Math.round(newDeficitOrSurplus);
                }

                // Recalculer avec les nouvelles valeurs
                targetCalories = minTargetCalories;
                carbs = MIN_CARBS;
                adjustedAutomatically = true;
            }

            // Validation : vérifier que les glucides ne sont pas négatifs
            if (carbs < 0) {
                const proteinCal = protein * 4;
                const fatCal = fat * 9;
                const macroTotal = proteinCal + fatCal;

                // Récupérer les valeurs actuelles selon l'objectif
                let currentDeficitOrSurplus = '';
                let currentProtein = '';
                let currentFat = '';

                if (currentGoal === 'cut') {
                    const deficitValue = parseFloat(document.getElementById('deficit')?.value || 0);
                    const proteinValue = parseFloat(document.getElementById('proteinCoeff')?.value || 0);
                    const fatValue = parseFloat(document.getElementById('fatCoeff')?.value || 0);
                    currentDeficitOrSurplus = `${deficitValue}% déficit`;
                    currentProtein = `${proteinValue} g/kg`;
                    currentFat = `${fatValue} g/kg`;
                } else if (currentGoal === 'bulk') {
                    const surplusValue = parseFloat(document.getElementById('surplus')?.value || 0);
                    const proteinValue = parseFloat(document.getElementById('proteinCoeffBulk')?.value || 0);
                    const fatValue = parseFloat(document.getElementById('fatCoeffBulk')?.value || 0);
                    currentDeficitOrSurplus = `${surplusValue}% surplus`;
                    currentProtein = `${proteinValue} g/kg`;
                    currentFat = `${fatValue} g/kg`;
                } else {
                    const proteinValue = parseFloat(document.getElementById('proteinCoeffMaintain')?.value || 0);
                    const fatValue = parseFloat(document.getElementById('fatCoeffMaintain')?.value || 0);
                    currentDeficitOrSurplus = 'maintien (0%)';
                    currentProtein = `${proteinValue} g/kg`;
                    currentFat = `${fatValue} g/kg`;
                }

                showProfileAlert(
                    `Impossible de calculer : tes protéines (${protein}g = ${Math.round(proteinCal)} kcal) + lipides (${fat}g = ${Math.round(fatCal)} kcal) = ${Math.round(macroTotal)} kcal, mais ton objectif calorique est seulement ${Math.round(targetCalories)} kcal.

Solutions possibles :
• Réduis ton déficit/surplus (actuellement ${currentDeficitOrSurplus})
• Augmente ton niveau d'activité
• Réduis tes protéines (${currentProtein}) ou lipides (${currentFat})`,
                    'warning',
                    false // Ne pas cacher automatiquement
                );
                return;
            }

            // Afficher BMR, TDEE et IMC
            document.getElementById('bmr-display').textContent = Math.round(bmr).toLocaleString('fr-FR') + ' kcal';
            document.getElementById('tdee-display').textContent = Math.round(tdee).toLocaleString('fr-FR') + ' kcal';

            // Calculer IMC
            const heightM = height / 100;
            const imc = weight / (heightM * heightM);
            let imcCategory, imcColor;

            if (imc < 18.5)  { imcCategory = 'Maigreur';
                imcColor = 'var(--accent-carbs)'; } else if (imc < 25) {
                imcCategory = 'Corpulence normale';
                imcColor = 'var(--accent-main)';
            } else if (imc < 30)  { imcCategory = 'Surpoids';
                imcColor = 'var(--accent-fat)'; } else  { imcCategory = 'Obésité';
                imcColor = 'var(--accent-danger)'; }

            document.getElementById('imc-display-blur').textContent = imc.toFixed(1);
            document.getElementById('imc-display-blur').style.color = imcColor;
            document.getElementById('imc-category-blur').textContent = imcCategory;
            document.getElementById('imc-category-blur').style.color = imcColor;

            // Afficher les résultats
            document.getElementById('targetProtein').textContent = protein;
            document.getElementById('targetCarbs').textContent = carbs;
            document.getElementById('targetFat').textContent = fat;

            const proteinCal = protein * 4;
            const carbsCal = carbs * 4;
            const fatCal = fat * 9;
            const totalCal = Math.round(proteinCal + carbsCal + fatCal);

            document.getElementById('proteinCal').textContent = proteinCal;
            document.getElementById('carbsCal').textContent = carbsCal;
            document.getElementById('fatCal').textContent = fatCal;
            document.getElementById('totalCal').textContent = totalCal;

            // Message discret si ajusté automatiquement
            if (adjustedAutomatically) {
                showProfileAlert('<i data-lucide="info" class="icon-inline"></i> Ajusté automatiquement pour préserver ton énergie et garantir un apport en glucides suffisant.', 'info', true);
            }

            // Animer les barres de progression
            setTimeout(() => {
                const pPct = Math.round((proteinCal / totalCal) * 100);
                const cPct = Math.round((carbsCal / totalCal) * 100);
                const fPct = Math.round((fatCal / totalCal) * 100);

                document.getElementById('proteinBar').style.width = `${pPct}%`;
                document.getElementById('proteinBar').setAttribute('data-percent', `${pPct}%`);

                document.getElementById('carbsBar').style.width = `${cPct}%`;
                document.getElementById('carbsBar').textContent = `${cPct}%`;

                document.getElementById('fatBar').style.width = `${fPct}%`;
                document.getElementById('fatBar').textContent = `${fPct}%`;
            }, 100);

            document.getElementById('results').style.display = 'block';
            // Premium: Cacher l'état vide et afficher le contenu
            const emptyState = document.getElementById('results-empty-state');
            const resultsContent = document.getElementById('results-content');
            if (emptyState) emptyState.style.display = 'none';
            if (resultsContent) resultsContent.style.display = 'block';
            updateIcons();

            // Sauvegarder vers Firestore (incluant IMC)
            const macroTargets = {
                protein, carbs, fat, calories: totalCal, bmr: Math.round(bmr), tdee: Math.round(tdee), imc: imc.toFixed(1)
            };

            saveSettingsToFirestore({ macroTargets }).catch(err => {
                console.error('Erreur sauvegarde macroTargets:', err);
            });

            // Mettre à jour les sections disponibles
            updateSectionsAvailability();

            // FEEDBACK SUCCÈS DU BOUTON (seulement si pas silencieux)
            if (btn && !silent) {
                btn.innerHTML = '<i data-lucide="check" style="width: 22px; height: 22px;"></i> Calcul effectué <i data-lucide="check-circle" class="icon-inline"></i>';
                updateIcons();
                setTimeout(() => {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 22px; height: 22px;"></i> Calculer mes Macros';
                    updateIcons();
                    btn.disabled = false;
                }, 2000);
            }


            // MESSAGE DE TRANSITION (seulement si pas silencieux)
            if (!silent) {
                // ANNULER toute notification en attente pour éviter les doublons
                if (pendingCalculationNotification) {
                    console.log('🚫 Annulation de la notification en attente');
                    clearTimeout(pendingCalculationNotification);
                    pendingCalculationNotification = null;
                }

                // Programmer la nouvelle notification
                pendingCalculationNotification = setTimeout(() => {
                    console.log('✅ Affichage de la notification de calcul');
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> C\'est calculé ! Tu peux maintenant noter tes repas.', 'success');
                    pendingCalculationNotification = null;
                }, 2100); // Juste après le feedback du bouton
            }
        }

        // === VALIDATION DU PROFIL ===

        function showProfileAlert(message, type = 'warning', autoHide = false) {
            const alert = document.getElementById('profile-alert');
            const messageEl = document.getElementById('profile-alert-message');

            // Use innerHTML to support icons in message
            messageEl.innerHTML = message;
            alert.style.display = 'block';

            if (type === 'info') {
                alert.style.background = 'rgba(16, 185, 129, 0.1)';
                alert.style.borderColor = 'var(--accent-main)';
                messageEl.previousElementSibling.textContent = 'ℹ️ Information';
                messageEl.previousElementSibling.style.color = 'var(--accent-main)';
            } else {
                alert.style.background = 'rgba(239, 68, 68, 0.1)';
                alert.style.borderColor = 'var(--accent-danger)';
                messageEl.previousElementSibling.innerHTML = '<i data-lucide="alert-triangle" class="icon-inline"></i> Attention';
                messageEl.previousElementSibling.style.color = 'var(--accent-danger)';
            }

            // Reinitialize Lucide icons after setting HTML
            updateIcons();

            // Focus on alert
            alert.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Only auto-hide if explicitly requested
            if (autoHide)  { setTimeout(() => {
                    alert.style.display = 'none'; }, 5000);
            }
        }


        // Vérifier si les macros sont calculées
        function checkIfMacrosCalculated() {
            const macroTargets = localStorage.getItem('macroTargets');
            return macroTargets !== null;
        }

        // Mettre à jour la disponibilité des sections
        function updateSectionsAvailability() {
            const isReady = checkIfMacrosCalculated();

            if (!isReady) {
                // Griser les boutons sidebar
                const planner = document.querySelector('[data-tab="planner"]');
                const tracking = document.querySelector('[data-tab="tracking"]');

                if (planner) planner.classList.add('disabled');
                if (tracking) tracking.classList.add('disabled');

                // Ajouter les overlays sur les sections
                const plannerSection = document.getElementById('planner');
                const trackingSection = document.getElementById('tracking');

                if (plannerSection && !plannerSection.querySelector('.section-disabled-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'section-disabled-overlay';
                    overlay.innerHTML = `
                        <div class="section-disabled-message">
                            <h3><i data-lucide="lock" style="width: 24px; height: 24px;"></i> Section verrouillée</h3>
                            <p>Cette section sera disponible après avoir calculé tes besoins nutritionnels.</p>
                            <p style="margin-top: var(--space-md);">Va dans <strong>Calculateur</strong> pour commencer !</p>
                            <button onclick="switchToTab('calculator')" class="btn" style="margin-top: var(--space-lg); background: var(--accent-ui); color: white;">
                                <i data-lucide="calculator" style="width: 18px; height: 18px;"></i>
                                Aller au Calculateur
                            </button>
                        </div>
                    `;
                    plannerSection.style.minHeight = '80vh';
                    plannerSection.appendChild(overlay);
                    updateIcons();
                }

                if (trackingSection && !trackingSection.querySelector('.section-disabled-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'section-disabled-overlay';
                    overlay.innerHTML = `
                        <div class="section-disabled-message">
                            <h3><i data-lucide="lock" style="width: 24px; height: 24px;"></i> Section verrouillée</h3>
                            <p>Cette section sera disponible après avoir calculé tes besoins nutritionnels.</p>
                            <p style="margin-top: var(--space-md);">Va dans <strong>Calculateur</strong> pour commencer !</p>
                            <button onclick="switchToTab('calculator')" class="btn" style="margin-top: var(--space-lg); background: var(--accent-ui); color: white;">
                                <i data-lucide="calculator" style="width: 18px; height: 18px;"></i>
                                Aller au Calculateur
                            </button>
                        </div>
                    `;
                    trackingSection.style.minHeight = '80vh';
                    trackingSection.appendChild(overlay);
                    updateIcons();
                }
            } else {
                // Enlever les restrictions si macros calculées
                const planner = document.querySelector('[data-tab="planner"]');
                const tracking = document.querySelector('[data-tab="tracking"]');

                if (planner) planner.classList.remove('disabled');
                if (tracking) tracking.classList.remove('disabled');

                // Enlever les overlays
                document.querySelectorAll('.section-disabled-overlay').forEach(o => o.remove());

                // Cacher le banner "Par où commencer"
                const banner = document.getElementById('getting-started-banner');
                if (banner) banner.style.display = 'none';
            }
        }

        function hideProfileAlert()  { document.getElementById('profile-alert').style.display = 'none'; }

        // validateAge removed - using birth dropdowns now

        function validateHeight() {
            const height = parseFloat(document.getElementById('height').value);

            if (!height) return;

            if (height < 120) {
                showProfileAlert('Taille trop faible (minimum 120 cm). Vérifie cette valeur.');
                return false;
            }

            if (height < 140) {
                showProfileAlert('Taille inhabituelle. Vérifie que tu as bien saisi en centimètres (cm), pas en mètres.');
            }

            return true;
        }

        function getProfileData() {
            return {
                birthDay: document.getElementById('birth-day')?.value || '',
                birthMonth: document.getElementById('birth-month')?.value || '',
                birthYear: document.getElementById('birth-year')?.value || '',
                gender: document.getElementById('profile-gender')?.value || '',
                height: parseFloat(document.getElementById('height')?.value) || 0,
                weight: parseFloat(document.getElementById('weight')?.value) || 0,
                activity: parseFloat(document.getElementById('activity')?.value) || 0
            };
        }

        function validateProfile() {
            const profile = getProfileData();
            const errors = [];

            // Champs obligatoires
            if (!profile.birthDay || !profile.birthMonth || !profile.birthYear) { errors.push('date de naissance'); }

            if (!profile.gender)  { errors.push('sexe'); }

            if (!profile.height || isNaN(profile.height))  { errors.push('taille'); }

            if (!profile.weight || isNaN(profile.weight))  { errors.push('poids'); }

            if (!profile.activity || isNaN(profile.activity))  { errors.push('niveau d\'activité'); }

            // Validation des valeurs
            if (profile.height && profile.height < 100)  { errors.push('taille invalide (< 100 cm)'); }

            return {
                valid: errors.length === 0,
                errors: errors,
                profile: profile
            };
        }

        async function saveProfile() {
            const profile = getProfileData();

            // Sauvegarder vers Firestore (avec fallback localStorage)
            try {
                await saveProfileToFirestore(profile);
            } catch (error) {
                console.error('Erreur sauvegarde profil:', error);
                // L'erreur a déjà été affichée dans saveProfileToFirestore via toast
            }
        }

        async function loadProfile() {
            // Charger depuis Firestore (avec fallback localStorage)
            const profile = await loadProfileFromFirestore();
            if (!profile || Object.keys(profile).length === 0) { return; }

            if (profile.birthDay && document.getElementById('birth-day'))  { document.getElementById('birth-day').value = profile.birthDay; }
            if (profile.birthMonth && document.getElementById('birth-month'))  { document.getElementById('birth-month').value = profile.birthMonth; }
            if (profile.birthYear && document.getElementById('birth-year'))  { document.getElementById('birth-year').value = profile.birthYear; }
            if (profile.gender && document.getElementById('profile-gender')) document.getElementById('profile-gender').value = profile.gender;
            if (profile.height && document.getElementById('height')) document.getElementById('height').value = profile.height;
            if (profile.weight && document.getElementById('weight')) document.getElementById('weight').value = profile.weight;
            if (profile.activity && document.getElementById('activity')) document.getElementById('activity').value = profile.activity;
        }

        async function calculateMacrosFromProfile() {
            hideProfileAlert();

            const validation = validateProfile();

            if (!validation.valid) {
                const missingFields = validation.errors.join(', ');
                showProfileAlert(`<i data-lucide="alert-triangle" class="icon-inline"></i> Profil incomplet ou invalide : ${missingFields}. Remplis tous les champs obligatoires (*) avec des valeurs correctes.`);
                return;
            }

            // Sauvegarder le profil (ATTENDRE la fin)
            await saveProfile();

            // Appeler directement calculateMacros() car les champs ont les bons IDs maintenant
            calculateMacros();

            // Toast de confirmation
            const profile = validation.profile;
            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> Profil sauvegardé${profile.name ? ' pour ' + profile.name : ''}`);
        }

        // Modal management
        function openFoodModal(mealType) {
            currentMealType = mealType;
            document.getElementById('foodModal').classList.add('active');
            document.body.style.overflow = 'hidden';
            // Auto-focus seulement sur desktop (évite clavier mobile intempestif)
            if (window.innerWidth > 768) {
                setTimeout(() => {
                    document.getElementById('modalFoodSearch').focus();
                }, 50);
            }
        }

        function closeFoodModal() {
            document.getElementById('foodModal').classList.remove('active');
            document.getElementById('modalFoodSearch').value = '';
            document.getElementById('modalSearchResults').style.display = 'none';
            currentMealType = null;
            document.body.style.overflow = '';
        }

        // Food search in modal - Initialisé après DOMContentLoaded
        let modalSearchTimeout = null;

        function initQuickAddSearch() {
            const modalFoodSearch = document.getElementById('modalFoodSearch');
            const modalSearchResults = document.getElementById('modalSearchResults');

            if (!modalFoodSearch) {
                console.error('❌ [QuickAdd] Element modalFoodSearch non trouvé!');
                return;
            }


            modalFoodSearch.addEventListener('input', async (e) => {
                const query = e.target.value.toLowerCase().trim();

                if (query.length < 2) {
                    modalSearchResults.style.display = 'none';
                    return;
                }

                // Annuler le timeout précédent
                if (modalSearchTimeout) clearTimeout(modalSearchTimeout);

                // Fuzzy search in local database (immediate results)
                let localResults = fuzzySearchFoods(foodDatabase, query, 15);

                // Afficher les résultats locaux immédiatement
                if (localResults.length > 0) {
                    renderModalSearchResults(localResults);
                }

                // Chercher dans Firestore (avec debounce) - dès 2 caractères
                modalSearchTimeout = setTimeout(async () => {
                    // Afficher le loading spinner
                    modalSearchResults.innerHTML = `
                        <div style="text-align: center; padding: var(--space-xl); color: var(--text-secondary);">
                            <i data-lucide="loader" class="spinner" style="width: 24px; height: 24px; margin: 0 auto;"></i>
                            <p style="margin-top: var(--space-sm); font-size: 0.9rem; opacity: 0.7;">Recherche en cours...</p>
                        </div>
                    `;
                    modalSearchResults.style.display = 'block';
                    updateIcons();

                    if (typeof window.searchAlimentsCommuns === 'function') {
                        try {
                            const firestoreResults = await window.searchAlimentsCommuns(query);

                            // Convertir les résultats Firestore
                            const firestoreFoods = firestoreResults.map(item => ({
                                name: item.name,
                                calories: parseFloat(item.calories) || 0,
                                protein: parseFloat(item.proteins || item.protein) || 0,
                                carbs: parseFloat(item.carbs) || 0,
                                fat: parseFloat(item.fats || item.fat) || 0,
                                fiber: parseFloat(item.fibers || item.fiber) || 0,
                                category: item.category || 'autres',
                                barcode: item.barcode || item.id,
                                unit: '100g',
                                fromFirestore: true,
                                verified: item.verified || false
                            }));

                            // Fusionner : Firestore en premier, puis local (sans doublons)
                            const existingNames = new Set(firestoreFoods.map(f => f.name.toLowerCase()));
                            const uniqueLocalResults = localResults.filter(f => !existingNames.has(f.name.toLowerCase()));
                            const allResults = [...firestoreFoods, ...uniqueLocalResults].slice(0, 15);

                            if (allResults.length > 0) {
                                renderModalSearchResults(allResults);
                            } else {
                                modalSearchResults.style.display = 'none';
                            }
                        } catch (err) {
                            console.error('❌ [QuickAdd] Erreur Firestore:', err);
                            // Masquer le loading en cas d'erreur
                            if (localResults.length > 0) {
                                renderModalSearchResults(localResults);
                            } else {
                                modalSearchResults.style.display = 'none';
                            }
                        }
                    } else {
                        console.warn('⚠️ [QuickAdd] searchAlimentsCommuns non disponible');
                        // Masquer le loading si pas de Firestore
                        if (localResults.length > 0) {
                            renderModalSearchResults(localResults);
                        } else {
                            modalSearchResults.style.display = 'none';
                        }
                    }
                }, 300);
            });
        }

        // Initialiser quand DOM prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initQuickAddSearch);
        } else {
            initQuickAddSearch();
        }

        let currentModalSearchResults = [];
        let currentQuickAddResults = [];

        function renderModalSearchResults(foods) {
            const modalSearchResults = document.getElementById('modalSearchResults');
            if (!modalSearchResults) return;

            // Store current results for favorite toggle refresh
            currentModalSearchResults = foods;

            modalSearchResults.innerHTML = foods.map(food => {
                const displayName = (typeof getDisplayName === 'function') ? getDisplayName(food) : food.name;
                const isFav = isFavorite(food.name);
                const verifiedBadge = food.verified ? ' <span style="display: inline-flex; align-items: center; gap: 3px; padding: 2px 6px; background: rgba(16, 185, 129, 0.15); color: #10b981; border-radius: 6px; font-size: 0.7rem; font-weight: 600;" title="Aliment vérifié">✅ Vérifié</span>' : '';
                return `
                <div class="search-result-item" onclick='addFoodToMeal(${JSON.stringify(food).replace(/'/g, "&apos;")})'
                     style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer;">
                    <button onclick="event.stopPropagation(); toggleFavorite('${food.name.replace(/'/g, "\\'")}')"
                            class="star-btn"
                            style="background: none; border: none; font-size: 1.3rem; cursor: pointer; padding: 0; line-height: 1; flex-shrink: 0; color: ${isFav ? 'inherit' : 'var(--text-secondary)'};"
                            title="${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
                        ${isFav ? '⭐' : '☆'}
                    </button>
                    <div style="flex: 1; min-width: 0;">
                        <div class="search-result-name">${displayName}${verifiedBadge}</div>
                        <div class="search-result-macros">
                            P: ${food.protein}g • G: ${food.carbs}g • L: ${food.fat}g • ${food.calories} kcal
                        </div>
                    </div>
                </div>
            `}).join('');
            modalSearchResults.style.display = 'block';

            // Initialize Lucide icons
            updateIcons();
        }

        // Add food to specific meal
        function addFoodToMeal(food) {
            const modal = document.getElementById('foodModal');
            const target = modal.dataset.target;

            // If adding to template
            if (target === 'template') {
                addFoodToTemplate(food);
                return;
            }

            // Normal meal addition
            if (!currentMealType) return;

            const quantity = parseFloat(document.getElementById('modal-quantity')?.value) || 100;

            // Store modal position for flying animation
            const modalRect = modal.getBoundingClientRect();
            const startPos = {
                x: modalRect.left + modalRect.width / 2,
                y: modalRect.top + modalRect.height / 2
            };

            dailyMeals[currentMealType].foods.push({
                ...food,
                id: Date.now(),
                quantity: quantity
            });

            renderMeal(currentMealType);
            updateDayTotals();
            saveDailyMeals();
            syncMealsToPlanning();
            updateRemainingWidget();
            closeFoodModal();

            // Flying animation only (feedback will appear when user adjusts quantity)
            createFlyingFoodAnimation(food.name, startPos);

            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Ajouté !');
        }

        // ===== QUICK ADD SYSTEM =====
        let favoriteFoods = [];
        let quickAddTimeout = null;
        let currentQuickAddMealType = null;
        let currentQuickAddInput = null;

        function loadFavoriteFoods() {
            const saved = localStorage.getItem('favoriteFoods');
            if (saved) { favoriteFoods = JSON.parse(saved); }
        }

        function isFavorite(foodName) { return favoriteFoods.includes(foodName); }

        // ===== FUSE.JS FUZZY SEARCH =====
        function fuzzySearchFoods(foods, query, limit = 10) {
            if (!query || query.length < 2) return [];

            const fuse = new Fuse(foods, {
                keys: ['name'],
                threshold: 0.3, // 0 = exact match, 1 = match anything
                distance: 100,
                minMatchCharLength: 2,
                includeScore: true
            });

            const results = fuse.search(query);

            // Extract items and sort by favorites first, then by score
            return results
                .map(result => result.item)
                .sort((a, b) => {
                    const aFav = isFavorite(a.name);
                    const bFav = isFavorite(b.name);
                    if (aFav && !bFav) return -1;
                    if (!aFav && bFav) return 1;
                    return 0;
                })
                .slice(0, limit);
        }

        // ===== SMART SUGGESTIONS =====
        function getMealTypeFromTime() {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 11) return 'breakfast';
            if (hour >= 11 && hour < 15) return 'lunch';
            if (hour >= 15 && hour < 19) return 'snack';
            return 'dinner';
        }

        function getHistoricalFoods(mealType, limit = 10) {
            const allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            const foodFrequency = new Map();

            // Count frequency of each food for this meal type
            Object.keys(allMeals).forEach(dateKey => {
                const dayMeals = allMeals[dateKey];
                if (dayMeals[mealType] && dayMeals[mealType].foods) {
                    dayMeals[mealType].foods.forEach(food => {
                        const count = foodFrequency.get(food.name) || 0;
                        foodFrequency.set(food.name, count + 1);
                    });
                }
            });

            // Sort by frequency and get top foods
            return Array.from(foodFrequency.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, limit)
                .map(([name]) => name);
        }

        function getSmartSuggestions(mealType, limit = 6) {
            // 1. Get favorites
            const favorites = favoriteFoods.slice(0, 3);

            // 2. Get historical foods for this meal type
            const historical = getHistoricalFoods(mealType, 5);

            // 3. Combine and remove duplicates
            const combined = [...new Set([...favorites, ...historical])];

            // 4. Find actual food objects
            const suggestions = combined
                .map(name => foodDatabase.find(f => f.name === name))
                .filter(f => f) // Remove null/undefined
                .slice(0, limit);

            return suggestions;
        }

        // Get global dropdown element
        function getGlobalDropdown() {
            return document.getElementById('global-quick-add-results');
        }

        // Position the global dropdown relative to input
        function positionGlobalDropdown(input) {
            const dropdown = getGlobalDropdown();
            if (!dropdown || !input) return;

            const rect = input.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            // Calculate dropdown position - ALWAYS below input
            let top = rect.bottom + 4;
            let left = rect.left;
            let width = Math.max(rect.width, 350);

            // Ensure dropdown doesn't go off-screen horizontally
            if (left + width > viewportWidth) {
                left = viewportWidth - width - 10;
            }
            if (left < 10) left = 10;

            // Dropdown always appears below - allow scrolling if needed
            // Set a reasonable max-height based on available space
            const availableHeight = viewportHeight - top - 10;
            const maxHeight = Math.max(200, Math.min(availableHeight, 400));

            dropdown.style.top = `${top}px`;
            dropdown.style.left = `${left}px`;
            dropdown.style.width = `${width}px`;
            dropdown.style.maxHeight = `${maxHeight}px`;
        }

        function handleQuickAddSearch(mealType, query) {
            const input = document.getElementById(`quick-add-${mealType}`);
            const dropdown = getGlobalDropdown();

            currentQuickAddMealType = mealType;
            currentQuickAddInput = input;

            // Show smart suggestions if query is empty or too short
            if (query.length < 2) {
                if (query.length === 0 && document.activeElement === input) {
                    // Input is focused but empty - show smart suggestions
                    const suggestions = getSmartSuggestions(mealType, 6);
                    if (suggestions.length > 0) {
                        renderGlobalQuickAddSuggestions(suggestions, mealType);
                        return;
                    }
                }
                dropdown.style.display = 'none';
                return;
            }

            // Cancel previous timeout
            if (quickAddTimeout) clearTimeout(quickAddTimeout);

            // Fuzzy search in local database (immediate results)
            const localFiltered = fuzzySearchFoods(foodDatabase, query, 10);

            // Display local results immediately
            if (localFiltered.length > 0) {
                renderGlobalQuickAddResults(localFiltered);
            }

            // Search Firestore with debounce
            quickAddTimeout = setTimeout(async () => {
                const dropdown = getGlobalDropdown();

                // Afficher le loading spinner si des résultats locaux sont déjà affichés
                if (dropdown && localFiltered.length > 0) {
                    const loadingIndicator = `
                        <div style="padding: var(--space-sm); text-align: center; border-top: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.85rem;">
                            <i data-lucide="loader" class="spinner" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;"></i>
                            <span style="margin-left: var(--space-xs); vertical-align: middle;">Recherche Cloud...</span>
                        </div>
                    `;
                    dropdown.innerHTML += loadingIndicator;
                    updateIcons();
                }

                if (typeof window.searchAlimentsCommuns === 'function') {
                    try {
                        const firestoreResults = await window.searchAlimentsCommuns(query);

                        if (firestoreResults.length > 0) {
                            const firestoreFoods = firestoreResults.map(item => ({
                                name: item.name,
                                calories: parseFloat(item.calories) || 0,
                                protein: parseFloat(item.proteins || item.protein) || 0,
                                carbs: parseFloat(item.carbs) || 0,
                                fat: parseFloat(item.fats || item.fat) || 0,
                                fiber: parseFloat(item.fibers || item.fiber) || 0,
                                category: item.category || 'autres',
                                barcode: item.barcode || item.id,
                                unit: '100g',
                                fromFirestore: true,
                                verified: item.verified || false
                            }));

                            // Merge: Firestore + local (no duplicates), favorites first
                            const existingNames = new Set(firestoreFoods.map(f => f.name.toLowerCase()));
                            const uniqueLocalResults = localFiltered.filter(f => !existingNames.has(f.name.toLowerCase()));
                            const allResults = [...firestoreFoods, ...uniqueLocalResults]
                                .sort((a, b) => {
                                    const aFav = isFavorite(a.name);
                                    const bFav = isFavorite(b.name);
                                    if (aFav && !bFav) return -1;
                                    if (!aFav && bFav) return 1;
                                    return a.name.localeCompare(b.name);
                                })
                                .slice(0, 10);

                            if (allResults.length > 0) {
                                renderGlobalQuickAddResults(allResults);
                            }
                        } else {
                            // Pas de résultats Firestore, re-render juste les résultats locaux (retire le loading)
                            if (localFiltered.length > 0) {
                                renderGlobalQuickAddResults(localFiltered);
                            }
                        }
                    } catch (err) {
                        console.error('❌ [QuickAdd] Erreur Firestore:', err);
                        // En cas d'erreur, re-render les résultats locaux (retire le loading)
                        if (localFiltered.length > 0) {
                            renderGlobalQuickAddResults(localFiltered);
                        }
                    }
                }
            }, 300);
        }

        function renderGlobalQuickAddSuggestions(foods, mealType) {
            const dropdown = getGlobalDropdown();
            if (!dropdown) return;

            currentQuickAddResults = foods;

            const mealNames = {
                breakfast: 'ce petit-déjeuner',
                lunch: 'ce déjeuner',
                snack: 'ce snack',
                dinner: 'ce dîner'
            };

            let html = `
                <div style="padding: var(--space-sm) var(--space-md); background: var(--bg-secondary); border-bottom: 1px solid var(--border-color); font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: center; gap: var(--space-xs);">
                    <i data-lucide="sparkles" style="width: 14px; height: 14px; color: var(--accent-main);"></i>
                    <span>Suggestions pour ${mealNames[mealType] || 'ce repas'}</span>
                </div>
            `;

            html += foods.map(food => {
                const isFav = isFavorite(food.name);
                const displayName = (typeof getDisplayName === 'function') ? getDisplayName(food) : food.name;
                return `
                <div class="quick-add-item" onclick="quickAddFood('${currentQuickAddMealType}', ${JSON.stringify(food).replace(/"/g, '&quot;')})" style="display: flex; align-items: center; gap: var(--space-xs);">
                    <button onclick="event.stopPropagation(); toggleFavorite('${food.name.replace(/'/g, "\\'")}')"
                            class="star-btn"
                            style="background: none; border: none; font-size: 1.2rem; cursor: pointer; padding: var(--space-xs); line-height: 1; flex-shrink: 0; color: ${isFav ? 'inherit' : 'var(--text-secondary)'};"
                            title="${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
                        ${isFav ? '⭐' : '☆'}
                    </button>
                    <div style="flex: 1; min-width: 0;">
                        <div class="quick-add-item-name">
                            ${displayName}
                            ${food.verified ? ' <span style="color: #10b981; font-size: 0.9rem; cursor: help;" title="Aliment vérifié par un administrateur">✓</span>' : ''}
                        </div>
                        <div class="quick-add-item-macros">
                            P: ${food.protein}g • G: ${food.carbs}g • L: ${food.fat}g • ${food.calories} kcal
                        </div>
                    </div>
                </div>
            `}).join('');

            dropdown.innerHTML = html;
            positionGlobalDropdown(currentQuickAddInput);
            dropdown.style.display = 'block';
            updateIcons();
        }

        function renderGlobalQuickAddResults(foods) {
            const dropdown = getGlobalDropdown();
            if (!dropdown || !currentQuickAddMealType) return;

            // Store current results for favorite toggle refresh
            currentQuickAddResults = foods;

            dropdown.innerHTML = foods.map(food => {
                const displayName = (typeof getDisplayName === 'function') ? getDisplayName(food) : food.name;
                const isFav = isFavorite(food.name);
                return `
                <div class="quick-add-item" onclick="quickAddFood('${currentQuickAddMealType}', ${JSON.stringify(food).replace(/"/g, '&quot;')})" style="display: flex; align-items: center; gap: var(--space-xs);">
                    <button onclick="event.stopPropagation(); toggleFavorite('${food.name.replace(/'/g, "\\'")}')"
                            class="star-btn"
                            style="background: none; border: none; font-size: 1.2rem; cursor: pointer; padding: var(--space-xs); line-height: 1; flex-shrink: 0; color: ${isFav ? 'inherit' : 'var(--text-secondary)'};"
                            title="${isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
                        ${isFav ? '⭐' : '☆'}
                    </button>
                    <div style="flex: 1; min-width: 0;">
                        <div class="quick-add-item-name">
                            ${displayName}
                            ${food.verified ? ' <span style="color: #10b981; font-size: 0.9rem; cursor: help;" title="Aliment vérifié par un administrateur">✓</span>' : ''}
                        </div>
                        <div class="quick-add-item-macros">
                            P: ${food.protein}g • G: ${food.carbs}g • L: ${food.fat}g • ${food.calories} kcal
                        </div>
                    </div>
                </div>
            `}).join('');

            positionGlobalDropdown(currentQuickAddInput);
            dropdown.style.display = 'block';
        }

        // Legacy function for compatibility (no longer used)
        function renderQuickAddResults(mealType, foods, resultsDiv) {
            renderGlobalQuickAddResults(foods);
        }

        function quickAddFood(mealType, food) {
            // Store position for flying animation
            const dropdown = getGlobalDropdown();
            let startPos = null;
            if (dropdown) {
                const rect = dropdown.getBoundingClientRect();
                startPos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            }

            // Add food with default 100g
            dailyMeals[mealType].foods.push({
                ...food,
                id: Date.now(),
                quantity: 100
            });

            renderMeal(mealType);
            updateDayTotals();
            saveDailyMeals();
            syncMealsToPlanning();
            updateRemainingWidget();

            // Clear input and hide global dropdown
            const input = document.getElementById(`quick-add-${mealType}`);
            if (input) input.value = '';
            if (dropdown) dropdown.style.display = 'none';
            currentQuickAddMealType = null;
            currentQuickAddInput = null;

            // Flying animation only (feedback will appear when user adjusts quantity)
            if (startPos) {
                createFlyingFoodAnimation(food.name, startPos);
            }

            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> ${food.name} ajouté (100g)`);
        }

        // ===== FEEDBACK ANIMATIONS =====

        function createFlyingFoodAnimation(foodName, startPos) {
            const widget = document.getElementById('remaining-widget');
            if (!widget || widget.style.display === 'none') return;

            const widgetRect = widget.getBoundingClientRect();
            const endPos = {
                x: widgetRect.left + widgetRect.width / 2,
                y: widgetRect.top + widgetRect.height / 2
            };

            // Create flying element
            const flyingEl = document.createElement('div');
            flyingEl.className = 'flying-food';
            flyingEl.textContent = foodName;
            flyingEl.style.left = startPos.x + 'px';
            flyingEl.style.top = startPos.y + 'px';
            flyingEl.style.setProperty('--fly-x', (endPos.x - startPos.x) + 'px');
            flyingEl.style.setProperty('--fly-y', (endPos.y - startPos.y) + 'px');

            document.body.appendChild(flyingEl);

            // Remove after animation
            setTimeout(() => {
                flyingEl.remove();
            }, 800);
        }

        function showMacroFeedback(food, quantity) {
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{}');
            if (!targets.calories) return;

            const widget = document.getElementById('remaining-widget');
            if (!widget || widget.style.display === 'none') return;

            // Calculate what was added
            const multiplier = quantity / 100;
            const added = {
                protein: food.protein * multiplier,
                carbs: food.carbs * multiplier,
                fat: food.fat * multiplier,
                calories: food.calories * multiplier
            };

            // Calculate current totals to know what's remaining
            let totals = { protein: 0, carbs: 0, fat: 0, calories: 0 };
            Object.keys(dailyMeals).forEach(mealType => {
                const foods = dailyMeals[mealType].foods || [];
                foods.forEach(f => {
                    const m = f.quantity / 100;
                    totals.protein += f.protein * m;
                    totals.carbs += f.carbs * m;
                    totals.fat += f.fat * m;
                    totals.calories += f.calories * m;
                });
            });

            const remaining = {
                protein: targets.protein - totals.protein,
                carbs: targets.carbs - totals.carbs,
                fat: targets.fat - totals.fat,
                calories: targets.calories - totals.calories
            };

            // Determine feedback message
            let message = '';
            let type = 'success';

            // Find the most relevant macro (highest in food)
            const macros = [
                { name: 'protéines', value: added.protein, remaining: remaining.protein, emoji: '💪' },
                { name: 'glucides', value: added.carbs, remaining: remaining.carbs, emoji: '⚡' },
                { name: 'lipides', value: added.fat, remaining: remaining.fat, emoji: '🥑' }
            ].sort((a, b) => b.value - a.value);

            const topMacro = macros[0];

            if (topMacro.value > 0) {
                const roundedValue = Math.round(topMacro.value);

                if (remaining.calories < 0) {
                    message = `${topMacro.emoji} +${roundedValue}g ${topMacro.name} • Objectif dépassé`;
                    type = 'warning';
                } else if (topMacro.remaining < 0) {
                    message = `${topMacro.emoji} +${roundedValue}g ${topMacro.name} • Quota ${topMacro.name} atteint`;
                    type = 'warning';
                } else if (topMacro.remaining > 0 && topMacro.remaining < topMacro.value * 2) {
                    message = `${topMacro.emoji} +${roundedValue}g ${topMacro.name} • Parfait!`;
                    type = 'success';
                } else {
                    message = `${topMacro.emoji} +${roundedValue}g ${topMacro.name}`;
                    type = 'success';
                }
            } else {
                message = `✅ +${Math.round(added.calories)} kcal`;
                type = 'success';
            }

            // Remove existing feedback if any
            const existingFeedback = document.getElementById('macro-feedback-message');
            if (existingFeedback) {
                existingFeedback.remove();
            }

            // Create feedback element
            const feedbackEl = document.createElement('div');
            feedbackEl.id = 'macro-feedback-message';
            feedbackEl.className = `macro-feedback ${type}`;
            feedbackEl.innerHTML = `<span>${message}</span>`;

            // Insert after widget
            widget.parentNode.insertBefore(feedbackEl, widget.nextSibling);

            // Remove after 4 seconds
            setTimeout(() => {
                feedbackEl.remove();
            }, 4000);
        }

        function showMacroFeedbackFromChange(food, oldQuantity, newQuantity) {
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{}');
            if (!targets.calories) return;

            const widget = document.getElementById('remaining-widget');
            if (!widget || widget.style.display === 'none') return;

            // Calculate the TOTAL macros for this food item with new quantity
            const newMultiplier = newQuantity / 100;
            const totalMacros = {
                protein: food.protein * newMultiplier,
                carbs: food.carbs * newMultiplier,
                fat: food.fat * newMultiplier,
                calories: food.calories * newMultiplier
            };

            // Calculate the DIFFERENCE (for before/after comparison logic only)
            const oldMultiplier = oldQuantity / 100;
            const diff = {
                protein: food.protein * (newMultiplier - oldMultiplier),
                carbs: food.carbs * (newMultiplier - oldMultiplier),
                fat: food.fat * (newMultiplier - oldMultiplier),
                calories: food.calories * (newMultiplier - oldMultiplier)
            };

            // Calculate current totals (AFTER modification)
            let totals = { protein: 0, carbs: 0, fat: 0, calories: 0 };
            Object.keys(dailyMeals).forEach(mealType => {
                const foods = dailyMeals[mealType].foods || [];
                foods.forEach(f => {
                    const m = f.quantity / 100;
                    totals.protein += f.protein * m;
                    totals.carbs += f.carbs * m;
                    totals.fat += f.fat * m;
                    totals.calories += f.calories * m;
                });
            });

            // Calculate remaining AFTER modification
            const remaining = {
                protein: targets.protein - totals.protein,
                carbs: targets.carbs - totals.carbs,
                fat: targets.fat - totals.fat,
                calories: targets.calories - totals.calories
            };

            // Calculate what it was BEFORE modification
            const beforeTotals = {
                protein: totals.protein - diff.protein,
                carbs: totals.carbs - diff.carbs,
                fat: totals.fat - diff.fat,
                calories: totals.calories - diff.calories
            };

            const beforeRemaining = {
                protein: targets.protein - beforeTotals.protein,
                carbs: targets.carbs - beforeTotals.carbs,
                fat: targets.fat - beforeTotals.fat,
                calories: targets.calories - beforeTotals.calories
            };

            // Determine feedback message
            let message = '';
            let type = 'success';

            // Find the most relevant macro (highest in TOTAL, not change)
            const macros = [
                { name: 'protéines', total: totalMacros.protein, diff: Math.abs(diff.protein), sign: Math.sign(diff.protein), remaining: remaining.protein, beforeRemaining: beforeRemaining.protein, emoji: '💪' },
                { name: 'glucides', total: totalMacros.carbs, diff: Math.abs(diff.carbs), sign: Math.sign(diff.carbs), remaining: remaining.carbs, beforeRemaining: beforeRemaining.carbs, emoji: '⚡' },
                { name: 'lipides', total: totalMacros.fat, diff: Math.abs(diff.fat), sign: Math.sign(diff.fat), remaining: remaining.fat, beforeRemaining: beforeRemaining.fat, emoji: '🥑' }
            ].sort((a, b) => b.total - a.total);

            const topMacro = macros[0];

            if (topMacro.total > 0.5) { // Ignore if total < 0.5g
                const roundedTotal = Math.round(topMacro.total * 10) / 10; // 1 decimal for display

                if (topMacro.sign > 0) {
                    // Adding macros
                    const wasAlreadyOver = topMacro.beforeRemaining < 0 || beforeRemaining.calories < 0;
                    const isNowOver = topMacro.remaining < 0 || remaining.calories < 0;

                    if (wasAlreadyOver && isNowOver) {
                        // Was already over, still over
                        message = `${topMacro.emoji} ${roundedTotal}g ${topMacro.name} • Objectif déjà dépassé`;
                        type = 'danger';
                    } else if (!wasAlreadyOver && isNowOver) {
                        // Just went over the limit
                        message = `${topMacro.emoji} ${roundedTotal}g ${topMacro.name} • Quota ${topMacro.name} atteint`;
                        type = 'warning';
                    } else if (topMacro.remaining > 0 && topMacro.remaining < topMacro.total * 2) {
                        // Good addition, getting close to target
                        message = `${topMacro.emoji} ${roundedTotal}g ${topMacro.name} • Parfait!`;
                        type = 'success';
                    } else {
                        // Neutral addition
                        message = `${topMacro.emoji} ${roundedTotal}g ${topMacro.name}`;
                        type = 'success';
                    }
                } else if (topMacro.sign < 0) {
                    // Removing macros
                    message = `${topMacro.emoji} ${roundedTotal}g ${topMacro.name} retirées`;
                    type = 'success';
                } else {
                    // No change (shouldn't happen)
                    return;
                }
            } else {
                // Very small total, just show calories
                const totalCals = Math.round(totalMacros.calories);
                if (totalCals > 1) {
                    message = `${totalCals} kcal`;
                    type = 'success';
                } else {
                    return; // Too small to show feedback
                }
            }

            // Remove existing feedback if any
            const existingFeedback = document.getElementById('macro-feedback-message');
            if (existingFeedback) {
                existingFeedback.remove();
            }

            // Create feedback element
            const feedbackEl = document.createElement('div');
            feedbackEl.id = 'macro-feedback-message';
            feedbackEl.className = `macro-feedback ${type}`;
            feedbackEl.innerHTML = `<span>${message}</span>`;

            // Insert after widget
            widget.parentNode.insertBefore(feedbackEl, widget.nextSibling);

            // Remove after 4 seconds
            setTimeout(() => {
                feedbackEl.remove();
            }, 4000);
        }

        // ===== CALENDAR VIEW =====
        window.showCalendarView = function() {
            const modal = document.createElement('div');
            modal.className = 'modal active';
            modal.id = 'calendar-modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 650px;">
                    <div class="modal-header">
                        <h2 style="margin: 0; display: flex; align-items: center; gap: var(--space-sm);">
                            <i data-lucide="calendar" style="width: 24px; height: 24px;"></i> Calendrier
                        </h2>
                        <button onclick="closeCalendarView()" class="modal-close">✕</button>
                    </div>
                    <div class="modal-body">
                        <!-- Légende -->
                        <div style="display: flex; gap: var(--space-lg); margin-bottom: var(--space-lg); padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-md); flex-wrap: wrap; justify-content: center;">
                            <div style="display: flex; align-items: center; gap: var(--space-xs);">
                                <div style="width: 24px; height: 24px; border-radius: var(--radius-sm); background: var(--bg-secondary); border: 2px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: var(--text-secondary); font-size: 0.7rem;"></div>
                                <span style="font-size: 0.85rem; color: var(--text-secondary);">Vide</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: var(--space-xs);">
                                <div style="width: 24px; height: 24px; border-radius: var(--radius-sm); background: rgba(239, 68, 68, 0.15); border: 2px solid rgba(239, 68, 68, 0.4); display: flex; align-items: center; justify-content: center; color: rgba(239, 68, 68, 0.85); font-size: 0.9rem; font-weight: bold;">✗</div>
                                <span style="font-size: 0.85rem; color: var(--text-secondary);">Insuffisant</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: var(--space-xs);">
                                <div style="width: 24px; height: 24px; border-radius: var(--radius-sm); background: rgba(245, 158, 11, 0.15); border: 2px solid rgba(245, 158, 11, 0.4); display: flex; align-items: center; justify-content: center; color: rgba(245, 158, 11, 0.8); font-size: 0.9rem;">∼</div>
                                <span style="font-size: 0.85rem; color: var(--text-secondary);">Presque bon (≥2 macros OK)</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: var(--space-xs);">
                                <div style="width: 24px; height: 24px; border-radius: var(--radius-sm); background: rgba(16, 185, 129, 0.15); border: 2px solid var(--accent-main); display: flex; align-items: center; justify-content: center; color: var(--accent-main); font-size: 0.9rem;">✓</div>
                                <span style="font-size: 0.85rem; color: var(--text-secondary);">Objectif atteint</span>
                            </div>
                        </div>

                        <div class="calendar-container">
                            <div class="calendar-header">
                                <button class="btn-ghost" onclick="changeCalendarMonth(-1)"><i data-lucide="chevron-left"></i></button>
                                <h3 id="calendar-month-year" style="margin: 0; font-size: 1.3rem; font-weight: 700;"></h3>
                                <button class="btn-ghost" onclick="changeCalendarMonth(1)"><i data-lucide="chevron-right"></i></button>
                            </div>
                            <div id="calendar-content"></div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            renderCalendar(new Date());
            updateIcons();
        };

        window.closeCalendarView = function() {
            const modal = document.getElementById('calendar-modal');
            if (modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        };

        let currentCalendarDate = new Date();

        window.changeCalendarMonth = function(delta) {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
            renderCalendar(currentCalendarDate);
        };

        function renderCalendar(date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

            document.getElementById('calendar-month-year').textContent = `${monthNames[month]} ${year}`;

            const allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{}');
            const today = new Date();

            let html = '<div class="calendar-grid">';
            dayNames.forEach(day => {
                html += `<div class="calendar-day-header">${day}</div>`;
            });

            for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
                html += '<div class="calendar-day empty"></div>';
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayMeals = allMeals[dateKey];
                const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

                let classes = 'calendar-day';
                let indicator = '';
                let tooltip = '';

                if (dayMeals) {
                    const dayTotals = calculateDayTotals(dayMeals);

                    // Vérifier si le jour a des données
                    if (dayTotals.calories > 0 && targets.calories) {
                        // Système de couleurs basé sur le respect des macros
                        // Seuil strict : ±15% pour "bien respecté" (vert)
                        // Seuil large : ±25% pour "partiellement respecté" (jaune)
                        const strictTolerance = 0.15; // ±15%
                        const largeTolerance = 0.25;  // ±25%

                        let macrosRespected = 0;
                        let macrosPartial = 0;
                        let tooltipLines = [];

                        // Vérifier calories
                        const calDiff = Math.abs(dayTotals.calories - targets.calories) / targets.calories;
                        const calPercent = ((dayTotals.calories - targets.calories) / targets.calories * 100).toFixed(0);
                        if (calDiff <= strictTolerance) {
                            macrosRespected++;
                            tooltipLines.push(`✓ Calories: ${Math.round(dayTotals.calories)}/${targets.calories} (${calPercent > 0 ? '+' : ''}${calPercent}%)`);
                        } else if (calDiff <= largeTolerance) {
                            macrosPartial++;
                            tooltipLines.push(`∼ Calories: ${Math.round(dayTotals.calories)}/${targets.calories} (${calPercent > 0 ? '+' : ''}${calPercent}%)`);
                        } else {
                            tooltipLines.push(`✗ Calories: ${Math.round(dayTotals.calories)}/${targets.calories} (${calPercent > 0 ? '+' : ''}${calPercent}%)`);
                        }

                        // Vérifier protéines
                        if (targets.protein) {
                            const protDiff = Math.abs(dayTotals.protein - targets.protein) / targets.protein;
                            const protPercent = ((dayTotals.protein - targets.protein) / targets.protein * 100).toFixed(0);
                            if (protDiff <= strictTolerance) {
                                macrosRespected++;
                                tooltipLines.push(`✓ Protéines: ${Math.round(dayTotals.protein)}/${targets.protein}g (${protPercent > 0 ? '+' : ''}${protPercent}%)`);
                            } else if (protDiff <= largeTolerance) {
                                macrosPartial++;
                                tooltipLines.push(`∼ Protéines: ${Math.round(dayTotals.protein)}/${targets.protein}g (${protPercent > 0 ? '+' : ''}${protPercent}%)`);
                            } else {
                                tooltipLines.push(`✗ Protéines: ${Math.round(dayTotals.protein)}/${targets.protein}g (${protPercent > 0 ? '+' : ''}${protPercent}%)`);
                            }
                        }

                        // Vérifier glucides
                        if (targets.carbs) {
                            const carbsDiff = Math.abs(dayTotals.carbs - targets.carbs) / targets.carbs;
                            const carbsPercent = ((dayTotals.carbs - targets.carbs) / targets.carbs * 100).toFixed(0);
                            if (carbsDiff <= strictTolerance) {
                                macrosRespected++;
                                tooltipLines.push(`✓ Glucides: ${Math.round(dayTotals.carbs)}/${targets.carbs}g (${carbsPercent > 0 ? '+' : ''}${carbsPercent}%)`);
                            } else if (carbsDiff <= largeTolerance) {
                                macrosPartial++;
                                tooltipLines.push(`∼ Glucides: ${Math.round(dayTotals.carbs)}/${targets.carbs}g (${carbsPercent > 0 ? '+' : ''}${carbsPercent}%)`);
                            } else {
                                tooltipLines.push(`✗ Glucides: ${Math.round(dayTotals.carbs)}/${targets.carbs}g (${carbsPercent > 0 ? '+' : ''}${carbsPercent}%)`);
                            }
                        }

                        // Vérifier lipides
                        if (targets.fat) {
                            const fatDiff = Math.abs(dayTotals.fat - targets.fat) / targets.fat;
                            const fatPercent = ((dayTotals.fat - targets.fat) / targets.fat * 100).toFixed(0);
                            if (fatDiff <= strictTolerance) {
                                macrosRespected++;
                                tooltipLines.push(`✓ Lipides: ${Math.round(dayTotals.fat)}/${targets.fat}g (${fatPercent > 0 ? '+' : ''}${fatPercent}%)`);
                            } else if (fatDiff <= largeTolerance) {
                                macrosPartial++;
                                tooltipLines.push(`∼ Lipides: ${Math.round(dayTotals.fat)}/${targets.fat}g (${fatPercent > 0 ? '+' : ''}${fatPercent}%)`);
                            } else {
                                tooltipLines.push(`✗ Lipides: ${Math.round(dayTotals.fat)}/${targets.fat}g (${fatPercent > 0 ? '+' : ''}${fatPercent}%)`);
                            }
                        }

                        tooltip = tooltipLines.join('&#10;');

                        // Déterminer la couleur
                        // Vert : Toutes les macros dans ±15%
                        // Jaune : Au moins 2 macros dans ±25% mais pas toutes dans ±15%
                        // Rouge : Moins de 2 macros respectées
                        const totalMacros = 1 + (targets.protein ? 1 : 0) + (targets.carbs ? 1 : 0) + (targets.fat ? 1 : 0);

                        if (macrosRespected === totalMacros) {
                            // Toutes les macros bien respectées → VERT
                            classes += ' goal-perfect';
                            indicator = '✓';
                        } else if (macrosRespected + macrosPartial >= 2) {
                            // Au moins 2 macros OK (strict ou large) → JAUNE
                            classes += ' goal-partial';
                            indicator = '∼';
                        } else {
                            // Moins de 2 macros OK → ROUGE/ORANGÉ
                            classes += ' goal-insufficient';
                            indicator = '✗';
                        }
                    } else {
                        // Jour avec repas mais pas d'objectifs définis
                        tooltip = 'Objectifs non définis';
                        classes += ' goal-insufficient';
                        indicator = '✗';
                    }
                }

                if (isToday) classes += ' today';

                html += `
                    <div class="${classes}" onclick="goToDate('${dateKey}')" title="${tooltip}">
                        <div class="calendar-day-number">${day}</div>
                        <div class="calendar-day-indicator">${indicator}</div>
                    </div>
                `;
            }

            html += '</div>';
            document.getElementById('calendar-content').innerHTML = html;
        }

        function calculateDayTotals(dayMeals) {
            let totals = {calories: 0, protein: 0, carbs: 0, fat: 0};
            ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType => {
                const foods = dayMeals[mealType]?.foods || [];
                foods.forEach(f => {
                    const m = f.quantity / 100;
                    totals.calories += f.calories * m;
                    totals.protein += f.protein * m;
                    totals.carbs += f.carbs * m;
                    totals.fat += f.fat * m;
                });
            });
            return totals;
        }

        window.goToDate = function(dateKey) {
            closeCalendarView();
            const [y, m, d] = dateKey.split('-').map(Number);
            currentMealDate = new Date(y, m - 1, d);
            updateMealDateDisplay();
            loadDailyMealsForCurrentDate();
            switchToTab('meals');
        };

        // ===== EXPORT AS IMAGE =====
        window.exportDayAsImage = async function() {
            showToast('<i data-lucide="loader" class="icon-inline spinning"></i> Génération en cours...');

            const dateKey = getCurrentDateKey();
            const dayMeals = allDailyMeals[dateKey] || {};
            const totals = calculateDayTotals(dayMeals);
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{}');

            const canvas = document.createElement('canvas');
            canvas.width = 1080;
            canvas.height = 1750;
            const ctx = canvas.getContext('2d');

            // Background gradient (dark green)
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#0d1f1a');
            gradient.addColorStop(1, '#081410');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Load and draw logo
            const logo = new Image();
            logo.src = 'logo.svg';
            await new Promise(resolve => {
                logo.onload = () => {
                    ctx.drawImage(logo, 80, 60, 120, 120);
                    resolve();
                };
                logo.onerror = () => resolve(); // Continue even if logo fails
            });

            // Header - App name
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 56px DM Sans, sans-serif';
            ctx.fillText('NutriTrack', 220, 140);

            // Date
            ctx.fillStyle = '#9ca3af';
            ctx.font = '32px DM Sans, sans-serif';
            const dateStr = new Date().toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
            ctx.fillText(dateStr, 80, 220);

            // Title "Bilan du jour"
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 52px DM Sans, sans-serif';
            ctx.fillText('Bilan du jour', 80, 320);

            // Circular progress for calories
            const centerX = canvas.width / 2;
            const centerY = 580;
            const radius = 180;
            const calorieProgress = targets.calories ? Math.min(totals.calories / targets.calories, 1) : 0;
            const startAngle = -0.5 * Math.PI;
            const endAngle = startAngle + (calorieProgress * 2 * Math.PI);

            // Background circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 24;
            ctx.stroke();

            // Progress circle (green)
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 24;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Calories text in center
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 72px DM Sans, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(Math.round(totals.calories), centerX, centerY - 10);
            ctx.font = '32px DM Sans, sans-serif';
            ctx.fillStyle = '#9ca3af';
            ctx.fillText('kcal', centerX, centerY + 40);

            // Goal achieved badge (if within 5% of target)
            if (targets.calories && Math.abs(totals.calories - targets.calories) <= targets.calories * 0.05) {
                const badgeY = centerY + radius + 60;
                const badgeHeight = 60;
                const badgeWidth = 400;
                const badgeX = centerX - badgeWidth / 2;

                // Badge background
                ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
                ctx.beginPath();
                ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 30);
                ctx.fill();

                // Checkmark icon
                ctx.fillStyle = '#10b981';
                ctx.font = '32px Arial';
                ctx.fillText('✓', badgeX + 30, badgeY + 42);

                // Badge text
                ctx.fillStyle = '#10b981';
                ctx.font = 'bold 28px DM Sans, sans-serif';
                ctx.fillText('Objectif atteint', centerX + 20, badgeY + 42);
            }

            // Target calories text
            ctx.fillStyle = '#6b7280';
            ctx.font = '28px DM Sans, sans-serif';
            ctx.fillText(`sur ${Math.round(targets.calories || 0)} kcal`, centerX, centerY + radius + 140);

            // Macros section title
            ctx.textAlign = 'left';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 42px DM Sans, sans-serif';
            ctx.fillText('Macros', 80, 980);

            // Macro bars
            const macros = [
                {label: 'Protéines', value: totals.protein, target: targets.protein, color: '#ee6c4d'},
                {label: 'Glucides', value: totals.carbs, target: targets.carbs, color: '#4ecdc4'},
                {label: 'Lipides', value: totals.fat, target: targets.fat, color: '#ffe66d'}
            ];

            let yPos = 1080;
            const barWidth = 900;
            const barHeight = 40;
            const barX = 80;

            macros.forEach(macro => {
                // Macro label
                ctx.fillStyle = macro.color;
                ctx.font = 'bold 36px DM Sans, sans-serif';
                ctx.fillText(macro.label, barX, yPos);

                // Progress bar background
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.beginPath();
                ctx.roundRect(barX, yPos + 20, barWidth, barHeight, 20);
                ctx.fill();

                // Progress bar fill
                const progress = macro.target ? Math.min(macro.value / macro.target, 1) : 0;
                ctx.fillStyle = macro.color;
                ctx.beginPath();
                ctx.roundRect(barX, yPos + 20, barWidth * progress, barHeight, 20);
                ctx.fill();

                // Values text
                ctx.fillStyle = '#ffffff';
                ctx.font = '32px DM Sans, sans-serif';
                ctx.textAlign = 'right';
                const valueText = `${Math.round(macro.value)}g / ${Math.round(macro.target || 0)}g`;
                ctx.fillText(valueText, barX + barWidth, yPos + 52);
                ctx.textAlign = 'left';

                yPos += 160;
            });

            // Footer
            ctx.fillStyle = '#6b7280';
            ctx.font = '28px DM Sans, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Généré avec NutriTrack', centerX, canvas.height - 60);

            // Export/Share
            canvas.toBlob(async blob => {
                const file = new File([blob], `nutritrack-${dateKey}.png`, { type: 'image/png' });

                // Detect if mobile device (not desktop)
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

                // Only use Web Share API on mobile devices
                if (isMobile && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: 'Mon bilan NutriTrack',
                            text: `Mon bilan du ${new Date().toLocaleDateString('fr-FR')} 💪`
                        });
                        showToast('<i data-lucide="check-circle" class="icon-inline"></i> Image partagée !');
                    } catch (err) {
                        if (err.name !== 'AbortError') { // User cancelled
                            console.error('Erreur partage:', err);
                            // Fallback to download
                            downloadImage(blob, dateKey);
                        }
                    }
                } else {
                    // Desktop: direct download
                    downloadImage(blob, dateKey);
                }
            });
        };

        function downloadImage(blob, dateKey) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nutritrack-${dateKey}.png`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Image téléchargée !');
        }

        // Initialize smart suggestions on focus
        function initSmartSuggestions() {
            const mealTypes = ['breakfast', 'lunch', 'snack', 'dinner'];
            mealTypes.forEach(mealType => {
                const input = document.getElementById(`quick-add-${mealType}`);
                if (input) {
                    input.addEventListener('focus', () => {
                        const value = input.value.trim();
                        if (value.length === 0) {
                            handleQuickAddSearch(mealType, '');
                        }
                    });
                }
            });
        }

        // Call init when DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initSmartSuggestions);
        } else {
            initSmartSuggestions();
        }

        // ===== SMART TEMPLATES - RECURRENCE DETECTION =====

        function calculateMealSimilarity(meal1, meal2) {
            if (!meal1 || !meal2) return 0;
            const foods1 = meal1.foods || [];
            const foods2 = meal2.foods || [];

            if (foods1.length === 0 || foods2.length === 0) return 0;

            // Count matching foods (same name, similar quantity ±20%)
            let matches = 0;
            foods1.forEach(f1 => {
                const match = foods2.find(f2 =>
                    f2.name === f1.name &&
                    Math.abs(f2.quantity - f1.quantity) <= f1.quantity * 0.2
                );
                if (match) matches++;
            });

            return (matches / Math.max(foods1.length, foods2.length)) * 100;
        }

        function detectRecurrentMeals(mealType) {
            const allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            const currentMeal = dailyMeals[mealType];

            if (!currentMeal || !currentMeal.foods || currentMeal.foods.length === 0) return null;

            // Find similar meals in history
            const similarMeals = [];
            Object.keys(allMeals).forEach(dateKey => {
                const dayMeals = allMeals[dateKey];
                if (dayMeals[mealType]) {
                    const similarity = calculateMealSimilarity(currentMeal, dayMeals[mealType]);
                    if (similarity >= 80) { // 80% similar
                        similarMeals.push({ dateKey, similarity });
                    }
                }
            });

            // If found 3+ times, suggest saving as template
            if (similarMeals.length >= 3) {
                return {
                    count: similarMeals.length,
                    meal: currentMeal,
                    mealType: mealType
                };
            }

            return null;
        }

        function suggestTemplateCreation(mealType) {
            const recurrent = detectRecurrentMeals(mealType);
            if (!recurrent) return;

            // Check if already dismissed for this meal combo
            const dismissed = JSON.parse(localStorage.getItem('dismissedTemplateSuggestions') || '[]');
            const mealHash = recurrent.meal.foods.map(f => f.name).sort().join('|');
            if (dismissed.includes(mealHash)) return;

            // Show suggestion
            showTemplateSuggestion(recurrent);
        }

        function showTemplateSuggestion(recurrent) {
            const mealNames = {
                breakfast: 'petit-déjeuner',
                lunch: 'déjeuner',
                snack: 'snack',
                dinner: 'dîner'
            };

            const existingBanner = document.getElementById('template-suggestion-banner');
            if (existingBanner) existingBanner.remove();

            const banner = document.createElement('div');
            banner.id = 'template-suggestion-banner';
            banner.className = 'template-suggestion-banner';
            banner.innerHTML = `
                <div style="display: flex; align-items: center; gap: var(--space-md); flex: 1;">
                    <i data-lucide="lightbulb" style="width: 24px; height: 24px; color: var(--accent-main); flex-shrink: 0;"></i>
                    <div>
                        <div style="font-weight: 600; margin-bottom: var(--space-xs);">Tu manges souvent ce ${mealNames[recurrent.mealType]} !</div>
                        <div style="font-size: 0.85rem; opacity: 0.8;">Tu l'as déjà mangé ${recurrent.count} fois. Veux-tu le sauvegarder comme repas type ?</div>
                    </div>
                </div>
                <div style="display: flex; gap: var(--space-sm);">
                    <button onclick="saveRecurrentAsTemplate('${recurrent.mealType}')" class="btn" style="padding: var(--space-sm) var(--space-lg);">
                        <i data-lucide="save" style="width: 16px; height: 16px;"></i> Sauvegarder
                    </button>
                    <button onclick="dismissTemplateSuggestion('${recurrent.mealType}')" class="btn-ghost" style="padding: var(--space-sm) var(--space-md);">
                        Plus tard
                    </button>
                </div>
            `;

            const mealsSection = document.getElementById('meals');
            if (mealsSection) {
                mealsSection.insertBefore(banner, mealsSection.children[2]); // After hero and date nav
                updateIcons();
            }
        }

        window.saveRecurrentAsTemplate = function(mealType) {
            saveMealAsTemplate(mealType);
            const banner = document.getElementById('template-suggestion-banner');
            if (banner) banner.remove();
        };

        window.dismissTemplateSuggestion = function(mealType) {
            const meal = dailyMeals[mealType];
            if (!meal || !meal.foods) return;

            const mealHash = meal.foods.map(f => f.name).sort().join('|');
            const dismissed = JSON.parse(localStorage.getItem('dismissedTemplateSuggestions') || '[]');
            dismissed.push(mealHash);
            localStorage.setItem('dismissedTemplateSuggestions', JSON.stringify(dismissed));

            const banner = document.getElementById('template-suggestion-banner');
            if (banner) banner.remove();
        };

        // Close global quick add dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('global-quick-add-results');
            if (!dropdown) return;

            // Don't close if clicking inside dropdown or on a quick-add input
            if (e.target.closest('#global-quick-add-results') || e.target.id?.startsWith('quick-add-')) {
                return;
            }

            dropdown.style.display = 'none';
            currentQuickAddMealType = null;
            currentQuickAddInput = null;
        });

        // Reposition dropdown on scroll (throttled pour performance)
        document.addEventListener('scroll', throttle(() => {
            const dropdown = document.getElementById('global-quick-add-results');
            if (dropdown && dropdown.style.display === 'block' && currentQuickAddInput) {
                positionGlobalDropdown(currentQuickAddInput);
            }
        }, 100), true);

        // Render specific meal
        // Remove recipe from meal without clearing foods
        function removeMealRecipe(mealType) {
            const dateKey = getCurrentDateKey();

            // Hide recipe display
            const recipeDiv = document.getElementById(`${mealType}-recipe`);
            if (recipeDiv)  { recipeDiv.style.display = 'none'; }

            showToast('<i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette supprimée');
        }


        // Debounce pour la sauvegarde de recette
        let recipeDebounceTimer = null;

        // Auto-resize textarea to fit content
        function autoResizeTextarea(textarea) {
            if (!textarea) return;
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(80, textarea.scrollHeight) + 'px';
        }

        // Sauvegarder la recette d'un repas (avec debounce)
        function saveRecipe(mealType, recipeText) {
            const dateKey = getCurrentDateKey();
            if (!allDailyMeals[dateKey]) {
                allDailyMeals[dateKey] = {
                    breakfast: { foods: [], recipe: '' },
                    lunch: { foods: [], recipe: '' },
                    snack: { foods: [], recipe: '' },
                    dinner: { foods: [], recipe: '' }
                };
            }

            // Sauvegarder dans les deux structures
            allDailyMeals[dateKey][mealType].recipe = recipeText;
            dailyMeals[mealType].recipe = recipeText;

            saveDailyMeals();

            // Debounce le toast pour éviter le spam
            if (recipeDebounceTimer) clearTimeout(recipeDebounceTimer);
            recipeDebounceTimer = setTimeout(() => {
                showToast('<i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette sauvegardée');
            }, 1000);
        }

        function renderMeal(mealType) {
            const container = document.getElementById(`${mealType}-foods`);
            const meal = dailyMeals[mealType];
            const foods = meal.foods || [];

            if (foods.length === 0) {
                const mealIcons = {
                    breakfast: 'sunrise',
                    lunch: 'sun',
                    snack: 'cookie',
                    dinner: 'moon'
                };
                const mealNames = {
                    breakfast: 'petit-déjeuner',
                    lunch: 'déjeuner',
                    snack: 'snack',
                    dinner: 'dîner'
                };
                container.innerHTML = `
                    <div style="text-align: center; padding: var(--space-2xl) var(--space-lg); color: var(--text-secondary);">
                        <div style="margin-bottom: var(--space-md);"><i data-lucide="${mealIcons[mealType]}" style="width: 48px; height: 48px; opacity: 0.3;"></i></div>
                        <p style="font-size: 0.95rem; margin: 0; opacity: 0.8;">Ton ${mealNames[mealType]} est vide</p>
                        <p style="font-size: 0.85rem; margin-top: var(--space-xs); margin-bottom: 0; opacity: 0.6;">Ajoute des aliments pour commencer ✨</p>
                    </div>
                `;
                updateIcons();
                document.getElementById(`${mealType}-total`).textContent = '0 kcal';
                return;
            }

            let mealTotal = 0;
            let mealProtein = 0;
            let mealCarbs = 0;
            let mealFat = 0;

            container.innerHTML = foods.map(food => {
                const multiplier = food.quantity / 100;
                const calories = Math.round(food.calories * multiplier);
                mealTotal += calories;
                mealProtein += food.protein * multiplier;
                mealCarbs += food.carbs * multiplier;
                mealFat += food.fat * multiplier;

                // DEBUG: Log verified status
                console.log(`[renderMeal] ${food.name}: verified = ${food.verified}`);

                const verifiedBadge = food.verified ? ' <span style="color: #10b981; font-size: 1rem; cursor: help; margin-left: 4px;" title="Aliment vérifié par un administrateur">✓</span>' : '';

                return `
                    <div class="food-item">
                        <button class="delete-btn" onclick="removeFoodFromMeal('${mealType}', ${food.id})" style="width: 32px; height: 32px; min-width: 32px; display: flex; align-items: center; justify-content: center; padding: 0;"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></button>
                        <button onclick="event.stopPropagation(); toggleFavorite('${food.name.replace(/'/g, "\\'")}')"
                                style="width: 32px; height: 32px; min-width: 32px; background: none; border: none; cursor: pointer; font-size: 1.1rem; transition: var(--transition-fast); ${isFavorite(food.name) ? '' : 'filter: grayscale(1) brightness(2);'}"
                                title="${isFavorite(food.name) ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
                            ${isFavorite(food.name) ? '⭐' : '⭐'}
                        </button>
                        <div class="food-name">${getDisplayName(food)}${verifiedBadge}</div>
                        <div class="food-quantity">
                            <input type="number" value="${food.quantity}" min="1"
                                   onchange="updateMealQuantity('${mealType}', ${food.id}, this.value)">
                            <span style="color: var(--text-secondary);">g</span>
                        </div>
                        <div class="food-macros">
                            <span>
                                <div class="label">Prot</div>
                                <div class="value" style="color: var(--accent-protein)">
                                    ${(food.protein * multiplier).toFixed(1)}g
                                </div>
                            </span>
                            <span>
                                <div class="label">Glu</div>
                                <div class="value" style="color: var(--accent-carbs)">
                                    ${(food.carbs * multiplier).toFixed(1)}g
                                </div>
                            </span>
                            <span>
                                <div class="label">Lip</div>
                                <div class="value" style="color: var(--accent-fat)">
                                    ${(food.fat * multiplier).toFixed(1)}g
                                </div>
                            </span>
                            <span>
                                <div class="label">Cal</div>
                                <div class="value">${calories}</div>
                            </span>
                        </div></div>
                `;
            }).join('');

            document.getElementById(`${mealType}-total`).innerHTML = `
                <span style="color: var(--accent-protein);">${Math.round(mealProtein)}g</span> •
                <span style="color: var(--accent-carbs);">${Math.round(mealCarbs)}g</span> •
                <span style="color: var(--accent-fat);">${Math.round(mealFat)}g</span> •
                <span style="color: var(--accent-ui);">${mealTotal} kcal</span>
            `;

            // Display recipe if exists - DESACTIVÉ TEMPORAIREMENT
            /*
            const recipeDiv = document.getElementById(`${mealType}-recipe`);
            const recipeText = document.getElementById(`${mealType}-recipe-text`);
                recipeDiv.style.display = 'block';
            } else  { recipeDiv.style.display = 'none'; }
            */

            // Afficher la recette si elle existe
            const recipeDiv = document.getElementById(`${mealType}-recipe`);
            if (recipeDiv && meal.recipe && meal.recipe.trim()) {
                const recipeInput = document.getElementById(`${mealType}-recipe-input`);
                if (recipeInput)  { recipeInput.value = meal.recipe; }
                recipeDiv.style.display = 'block';
            } else if (recipeDiv)  { recipeDiv.style.display = 'none'; }

            // Recreate Lucide icons
            updateIcons();
        }

        // Update food quantity in meal
        function updateMealQuantity(mealType, id, quantity) {
            const food = dailyMeals[mealType].foods.find(f => f.id === id);
            if (food) {
                const parsedQuantity = parseFloat(quantity);
                // Block negative quantities
                if (parsedQuantity < 1 || isNaN(parsedQuantity)) {
                    showToast('<i data-lucide="alert-triangle" class="icon-inline"></i> Quantité invalide (min: 1g)', 'warning');
                    renderMeal(mealType);
                    return;
                }

                // Store old quantity for feedback
                const oldQuantity = food.quantity;
                const quantityDiff = parsedQuantity - oldQuantity;

                food.quantity = parsedQuantity;
                renderMeal(mealType);
                updateDayTotals();
                saveDailyMeals();
                updateRemainingWidget();

                // Show macro feedback based on the CHANGE in quantity
                if (Math.abs(quantityDiff) > 0) {
                    showMacroFeedbackFromChange(food, oldQuantity, parsedQuantity);
                }
            }
        }

        // Remove food from meal
        function removeFoodFromMeal(mealType, id) {
            dailyMeals[mealType].foods = dailyMeals[mealType].foods.filter(f => f.id !== id);

            // Si le repas est maintenant vide, supprimer aussi la recette
            if (dailyMeals[mealType].foods.length === 0) {
                dailyMeals[mealType].recipe = '';
                const dateKey = getCurrentDateKey();
                if (allDailyMeals[dateKey] && allDailyMeals[dateKey][mealType]) {
                    allDailyMeals[dateKey][mealType].recipe = '';
                }
                // Pas besoin d'appeler saveDailyMeals() ici, on l'appelle à la fin
            }

            renderMeal(mealType);
            updateDayTotals();
            saveDailyMeals();
        }

        // Update day totals

        // ===== BADGE JOURNALIER =====
        function updateCalorieBadge() {
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{"calories":0}');
            const caloriesEl = document.getElementById('day-total');

            if (!caloriesEl)  { return; }

            const currentCal = parseFloat(caloriesEl.textContent || 0);

            if (!targets.calories || targets.calories === 0)  { return; }

            const diff = ((currentCal - targets.calories) / targets.calories) * 100;

            let badgeHTML = '';
            let badgeClass = '';
            let badgeText = '';

            if (Math.abs(diff) <= 10)  { badgeClass = 'badge-green';
                badgeText = '<i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Objectif atteint'; } else if (Math.abs(diff) <= 20) {
                badgeClass = 'badge-orange';
                badgeText = diff > 0 ? '<i data-lucide="arrow-up" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Un peu au-dessus' : '<i data-lucide="arrow-down" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Un peu en-dessous';
            } else {
                badgeClass = 'badge-red';
                badgeText = diff > 0 ? '<i data-lucide="alert-circle" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Trop' : '<i data-lucide="alert-circle" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Pas assez';
            }

            badgeHTML = `<span class="calorie-badge ${badgeClass}">${badgeText}</span>`;

            // Chercher le parent (summary-card)
            const parentCard = caloriesEl.closest('.summary-card');
            if (parentCard) {
                // Supprimer l'ancien badge
                const oldBadge = parentCard.querySelector('.calorie-badge');
                if (oldBadge) oldBadge.remove();

                // Ajouter après la dernière div
                parentCard.insertAdjacentHTML('beforeend', badgeHTML);
            }
        }

        function updateMacroBadge(macroType, elementId) {
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{}');
            const macroEl = document.getElementById(elementId);

            if (!macroEl || !targets[macroType]) return;

            const current = parseFloat(macroEl.textContent || 0);
            const target = targets[macroType];

            if (target === 0) return;

            const diff = ((current - target) / target) * 100;

            let badgeClass = '';
            let badgeText = '';

            // Tolérance 20% pour macros (vs 10% pour calories)
            if (Math.abs(diff) <= 20)  { badgeClass = 'badge-green';
                badgeText = '<i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Objectif atteint'; } else if (Math.abs(diff) <= 35) {
                badgeClass = 'badge-orange';
                badgeText = diff > 0 ? '<i data-lucide="arrow-up" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Un peu au-dessus' : '<i data-lucide="arrow-down" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Un peu en-dessous';
            } else {
                badgeClass = 'badge-red';
                badgeText = diff > 0 ? '<i data-lucide="alert-circle" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Trop' : '<i data-lucide="alert-circle" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> Pas assez';
            }

            const badgeHTML = `<span class="calorie-badge ${badgeClass}">${badgeText}</span>`;


            const parentCard = macroEl.closest('.summary-card');
            if (parentCard) {
                const oldBadge = parentCard.querySelector('.calorie-badge');
                if (oldBadge) oldBadge.remove();
                parentCard.insertAdjacentHTML('beforeend', badgeHTML);
            }
        }

        function updateDayTotals() {
            let totals = { protein: 0, carbs: 0, fat: 0, fiber: 0, calories: 0 };

            ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType => {
                const foods = dailyMeals[mealType]?.foods || [];
                foods.forEach(food => {
                    const multiplier = food.quantity / 100;
                    totals.protein += food.protein * multiplier;
                    totals.carbs += food.carbs * multiplier;
                    totals.fat += food.fat * multiplier;
                    totals.fiber += (food.fiber || 0) * multiplier;
                    totals.calories += food.calories * multiplier;
                });
            });

            // Mise à jour eau
            if (typeof updateWaterUI === 'function') updateWaterUI();

            document.getElementById('day-protein').textContent = totals.protein.toFixed(1);
            document.getElementById('day-carbs').textContent = totals.carbs.toFixed(1);
            document.getElementById('day-fat').textContent = totals.fat.toFixed(1);
            document.getElementById('day-fiber').textContent = totals.fiber.toFixed(1);
            document.getElementById('day-total').textContent = Math.round(totals.calories);

            // Mettre à jour les badges
            updateCalorieBadge();
            updateMacroBadge('protein', 'day-protein');
            updateMacroBadge('carbs', 'day-carbs');
            updateMacroBadge('fat', 'day-fat');

            // Mettre à jour le feedback émotionnel journalier
            updateDailyFeedback(totals);

            // Mettre à jour le widget "Reste du jour"
            updateRemainingWidget();

            // Vérifier si objectifs atteints pour notification
            checkGoalsReached(totals);
        }

        // Vérifier si les objectifs sont atteints et envoyer notification
        let goalsReachedToday = localStorage.getItem('goalsReachedDate') === getDateKey(new Date());

        function checkGoalsReached(totals) {
            // Ne pas notifier si déjà fait aujourd'hui
            if (goalsReachedToday) return;

            // Vérifier si notifications objectifs activées
            const notifGoalsEnabled = localStorage.getItem('notification-goals') !== 'false';
            if (!notifGoalsEnabled) return;

            // Récupérer les objectifs
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{}');
            if (!targets.calories) return;

            // Vérifier si objectif calories atteint (entre 90% et 110%)
            const caloriePercent = (totals.calories / targets.calories) * 100;
            if (caloriePercent >= 90 && caloriePercent <= 110) {
                goalsReachedToday = true;
                localStorage.setItem('goalsReachedDate', getDateKey(new Date()));

                // Envoyer notification
                if (Notification.permission === 'granted') {
                    if (window.swRegistration && window.swRegistration.active) {
                        window.swRegistration.active.postMessage({
                            type: 'TEST_NOTIFICATION',
                            data: {
                                title: 'Objectif atteint !',
                                body: 'Bravo ! Tu as atteint ton objectif calorique du jour !',
                                tag: 'goal-reached'
                            }
                        });
                    } else {
                        new Notification('Objectif atteint !', {
                            body: 'Bravo ! Tu as atteint ton objectif calorique du jour !',
                            icon: '/icon-192.png'
                        });
                    }
                }
            }
        }

        // Save daily meals to localStorage

        // ===== WIDGET "RESTE DU JOUR" =====
        function updateRemainingWidget() {
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{}');
            const widget = document.getElementById('remaining-widget');

            if (!targets.calories)  { widget.style.display = 'none';
                return; }

            // Calculate current totals
            let totals = { protein: 0, carbs: 0, fat: 0, calories: 0 };
            Object.keys(dailyMeals).forEach(mealType => {
                const foods = dailyMeals[mealType].foods || [];
                foods.forEach(food => {
                    const multiplier = food.quantity / 100;
                    totals.protein += food.protein * multiplier;
                    totals.carbs += food.carbs * multiplier;
                    totals.fat += food.fat * multiplier;
                    totals.calories += food.calories * multiplier;
                });
            });

            // Calculate remaining
            const remaining = {
                protein: Math.max(0, targets.protein - totals.protein),
                carbs: Math.max(0, targets.carbs - totals.carbs),
                fat: Math.max(0, targets.fat - totals.fat),
                calories: Math.max(0, targets.calories - totals.calories)
            };

            // Update display
            document.getElementById('remaining-protein').textContent = Math.round(remaining.protein) + 'g';
            document.getElementById('remaining-carbs').textContent = Math.round(remaining.carbs) + 'g';
            document.getElementById('remaining-fat').textContent = Math.round(remaining.fat) + 'g';
            document.getElementById('remaining-cal').textContent = Math.round(remaining.calories) + ' kcal';

            // Show widget
            widget.style.display = 'block';
        }

        // ===== FEEDBACK ÉMOTIONNEL =====

        // Feedback émotionnel journalier
        function updateDailyFeedback(totals) {
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{}');
            const feedbackEl = document.getElementById('daily-feedback');

            // Ne pas afficher si pas de cibles ou si aucun aliment ajouté
            if (!targets.calories || totals.calories === 0) {
                feedbackEl.style.display = 'none';
                return;
            }

            const calPct = (totals.calories / targets.calories) * 100;
            const protPct = (totals.protein / targets.protein) * 100;

            const emojiEl = document.getElementById('feedback-emoji');
            const messageEl = document.getElementById('feedback-message');

            let emoji, message, bgColor, textColor;

            // Logique de feedback neutre basée sur les calories
            if (calPct >= 95 && calPct <= 105) {
                // Objectif atteint
                emoji = '<i data-lucide="check" class="icon-inline"></i>';
                message = 'Objectif atteint';
                bgColor = 'rgba(16, 185, 129, 0.15)';
                textColor = 'var(--accent-main)';
                updateStreakDisplay();
            } else if (calPct >= 85 && calPct <= 115) {
                // Très proche
                emoji = '<i data-lucide="check-circle" class="icon-inline"></i>';
                message = 'Très proche de l\'objectif';
                bgColor = 'rgba(78, 205, 196, 0.15)';
                textColor = 'var(--accent-carbs)';
            } else if (calPct >= 75 && calPct <= 125) {
                // Correct
                emoji = '<i data-lucide="circle-dot" class="icon-inline"></i>';
                message = 'Bonne journée';
                bgColor = 'rgba(255, 230, 109, 0.15)';
                textColor = 'var(--accent-fat)';
            } else if (calPct > 125 && calPct <= 150) {
                // Au-dessus
                emoji = '<i data-lucide="arrow-up" class="icon-inline"></i>';
                message = 'Un peu au-dessus de l\'objectif';
                bgColor = 'rgba(255, 193, 7, 0.15)';
                textColor = '#ffc107';
            } else if (calPct > 150) {
                // Bien au-dessus
                emoji = '<i data-lucide="trending-up" class="icon-inline"></i>';
                message = 'Journée plus riche que prévu';
                bgColor = 'rgba(168, 85, 247, 0.15)';
                textColor = '#a855f7';
            } else if (calPct < 75 && calPct > 50) {
                // En-dessous
                emoji = '<i data-lucide="arrow-down" class="icon-inline"></i>';
                message = 'En dessous de l\'objectif';
                bgColor = 'rgba(255, 193, 7, 0.15)';
                textColor = '#ffc107';
            } else if (calPct <= 50 && calPct > 0) {
                // Très en-dessous
                emoji = '<i data-lucide="alert-circle" class="icon-inline"></i>';
                message = 'Apport insuffisant';
                bgColor = 'rgba(248, 113, 113, 0.15)';
                textColor = 'var(--accent-protein)';
            }

            emojiEl.innerHTML = emoji;
            messageEl.textContent = message;
            feedbackEl.style.background = bgColor;
            feedbackEl.style.color = textColor;
            feedbackEl.style.border = `2px solid ${textColor}40`;
            feedbackEl.style.display = 'block';
            // Réinitialiser les icônes Lucide
            updateIcons();
        }

        // === CLÔTURE DE JOURNÉE ===
        function closeDayConfirm() {
            const dateKey = getDateKey(currentMealDate);
            const closedDays = JSON.parse(localStorage.getItem('closedDays') || '{}');

            if (closedDays[dateKey]) {
                // Journée déjà clôturée, on permet de rouvrir
                customConfirm('🔓 Rouvrir la journée', 'Cette journée est clôturée.\n\nVeux-tu la rouvrir pour modification ?').then((confirmed) => {
                    if (confirmed) reopenDay(dateKey);
                });
                return;
            }

            customConfirm('<i data-lucide="lock" style="width: 18px; height: 18px;"></i> Clôturer cette journée', '• Les repas seront enregistrés au planning\n• La journée sera verrouillée\n• Tu pourras la rouvrir si besoin\n\nContinuer ?').then((confirmed) =>  { if (!confirmed) return;

                closeDay(dateKey); });
        }

        function closeDay(dateKey) {
            // Sauvegarder l'état de verrouillage
            const closedDays = JSON.parse(localStorage.getItem('closedDays') || '{}');
            closedDays[dateKey] = {
                closedAt: new Date().toISOString(),
                meals: JSON.parse(JSON.stringify(dailyMeals)) // Deep copy
            };
            localStorage.setItem('closedDays', JSON.stringify(closedDays));

            // Forcer la sync au planning
            syncMealsToPlanning();

            // Update UI
            updateCloseDayUI(true);

            // Mettre à jour le résumé hebdomadaire
            if (typeof updateWeeklySummary === 'function') updateWeeklySummary();

            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Journée enregistrée dans ton planning !');
        }

        function reopenDay(dateKey) {
            const closedDays = JSON.parse(localStorage.getItem('closedDays') || '{}');
            delete closedDays[dateKey];
            localStorage.setItem('closedDays', JSON.stringify(closedDays));

            updateCloseDayUI(false);

            // Mettre à jour le résumé hebdomadaire
            if (typeof updateWeeklySummary === 'function') updateWeeklySummary();

            showToast('<i data-lucide="unlock" class="icon-inline"></i> Journée rouverte, tu peux la modifier');
        }

        function updateCloseDayUI(isClosed) {
            const btn = document.getElementById('close-day-btn');
            const notice = document.getElementById('day-closed-notice');
            const btnText = document.getElementById('close-day-text');
            const badge = document.getElementById('closed-day-badge');

            if (isClosed) {
                btn.innerHTML = '<i data-lucide="lock-open" style="width: 18px; height: 18px;"></i><span id="close-day-text">Rouvrir cette journée</span>';
                updateIcons();
                btn.style.background = '#d4a847';
                btn.style.color = '#1a1a1a';
                notice.style.display = 'block';
                if (badge) badge.style.display = 'inline-block';
                updateIcons();

                // Désactiver les boutons d'ajout
                document.querySelectorAll('#meals .add-food-btn, #meals .delete-btn').forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                });
            } else {
                btn.innerHTML = '<i data-lucide="check-circle" style="width: 18px; height: 18px;"></i><span id="close-day-text">Clôturer cette journée</span>';
                updateIcons();
                btn.style.background = '#5b8dd9';
                btn.style.color = 'white';
                notice.style.display = 'none';
                if (badge) badge.style.display = 'none';

                // Réactiver les boutons
                document.querySelectorAll('#meals .add-food-btn, #meals .delete-btn').forEach(btn => {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                });
            }
        }

        function checkIfDayClosed() {
            const dateKey = getDateKey(currentMealDate);
            const closedDays = JSON.parse(localStorage.getItem('closedDays') || '{}');
            const isClosed = !!closedDays[dateKey];
            updateCloseDayUI(isClosed);
            return isClosed;
        }

        // ===== NOUVELLES FONCTIONNALITÉS =====

        // 1. SYNCHRONISATION REPAS → PLANNING
        function syncMealsToPlanning() {
            const dateKey = getCurrentDateKey();

            // Générer les résumés de repas
            const breakfastSummary = generateMealSummary(dailyMeals.breakfast.foods);
            const lunchSummary = generateMealSummary(dailyMeals.lunch.foods);
            const snackSummary = generateMealSummary(dailyMeals.snack.foods);
            const dinnerSummary = generateMealSummary(dailyMeals.dinner.foods);


            // Mettre à jour le planning
            if (!weeklyPlan[dateKey]) {
                weeklyPlan[dateKey] = {};
            }

            weeklyPlan[dateKey].breakfast = breakfastSummary;
            weeklyPlan[dateKey].lunch = lunchSummary;
            weeklyPlan[dateKey].snack = snackSummary;
            weeklyPlan[dateKey].dinner = dinnerSummary;

            localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan));

            // Rafraîchir l'affichage du planning si on est dessus
            const planningTab = document.querySelector('.sidebar-btn[data-tab="planning"]');
            if (planningTab && planningTab.classList.contains('active')) {
                renderWeeklyPlan();
            }
        }

        function generateMealSummary(mealFoods) {
            if (!mealFoods || mealFoods.length === 0) { return 'Non planifié'; }

            // Prendre les 3 premiers aliments
            const foodNames = mealFoods.slice(0, 3).map(f => f.name);
            let summary = foodNames.join(', ');

            if (mealFoods.length > 3) {
                summary += ` +${mealFoods.length - 3}`;
            }

            return `${summary} (${mealFoods.length} aliment${mealFoods.length > 1 ? 's' : ''})`;
        }

        // 2. NAVIGATION PAR JOUR
        function goToDay(dayIndex) {

            // Calculer la date à partir de l'index (0=Lundi, 1=Mardi, etc.)
            const targetDate = new Date(currentWeekStart);
            targetDate.setDate(targetDate.getDate() + dayIndex);


            // Changer la date actuelle
            currentMealDate = targetDate;

            // Charger les repas de ce jour
            const dateKey = getCurrentDateKey();
            if (!allDailyMeals[dateKey]) {
                allDailyMeals[dateKey] = {
                    breakfast: { foods: [], recipe: '' },
                    lunch: { foods: [], recipe: '' },
                    snack: { foods: [], recipe: '' },
                    dinner: { foods: [], recipe: '' },
                    water: 0
                };
            }
            if (typeof allDailyMeals[dateKey].water !== 'number') allDailyMeals[dateKey].water = 0;
            dailyMeals = allDailyMeals[dateKey];

            // Rafraîchir l'affichage
            ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType =>  { renderMeal(mealType); });
            updateDayTotals();
            updateMealDateDisplay();

            // Passer à l'onglet Meals (pas de fonction switchTab, on le fait manuellement)
            document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            document.querySelector('[data-tab="meals"]').classList.add('active');
            document.getElementById('meals').classList.add('active');

        }

        // 3. DUPLIQUER JOURNÉE
        async function duplicateDay() {
            const sourceDateKey = getCurrentDateKey(); // Utiliser la vraie fonction
            const sourceMeals = allDailyMeals[sourceDateKey];


            // Vérifier si on a des repas
            const hasBreakfast = dailyMeals.breakfast && dailyMeals.breakfast.length > 0;
            const hasLunch = dailyMeals.lunch && dailyMeals.lunch.length > 0;
            const hasSnack = dailyMeals.snack && dailyMeals.snack.length > 0;
            const hasDinner = dailyMeals.dinner && dailyMeals.dinner.length > 0;

            if (!hasBreakfast && !hasLunch && !hasSnack && !hasDinner) {
                customAlert('<i data-lucide="x-circle" class="icon-inline"></i> Aucun repas', 'Aucun repas à dupliquer pour cette journée');
                return;
            }

            // Demander la date cible
            const tomorrow = new Date(currentMealDate);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const defaultDate = formatDate(tomorrow);

            const targetDateStr = await customPrompt('📋 Dupliquer la journée', 'Vers quelle date ? (Format: AAAA-MM-JJ)', '');

            if (!targetDateStr) return;

            // Valider la date
            const parts = targetDateStr.split('-');
            if (parts.length !== 3) {
                alert('<i data-lucide="x-circle" class="icon-inline"></i> Format invalide. Utilise AAAA-MM-JJ');
                return;
            }

            const targetDate = new Date(targetDateStr);
            if (isNaN(targetDate.getTime())) {
                alert('<i data-lucide="x-circle" class="icon-inline"></i> Date invalide');
                return;
            }

            const targetDateKey = formatDate(targetDate);

            // Demander confirmation si la date cible a déjà des repas
            if (allDailyMeals[targetDateKey] && (allDailyMeals[targetDateKey].breakfast.length > 0 || allDailyMeals[targetDateKey].lunch.length > 0 || allDailyMeals[targetDateKey].snack.length > 0 || allDailyMeals[targetDateKey].dinner.length > 0)) {
                customConfirm('<i data-lucide="alert-triangle" class="icon-inline"></i> Écraser les repas', 'Cette date contient déjà des repas.\n\nLes écraser ?', true).then((confirmed) => {
                    if (!confirmed) return;
                    completeDuplication();
                });
                return;
            }

            completeDuplication();
        }

        function completeDuplication() {
            const targetDate = new Date(document.getElementById('duplicate-date').value);
            const targetDateKey = getDateKey(targetDate);
            const allDailyMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');

            // Deep copy pour éviter les références - utiliser dailyMeals actuel
            allDailyMeals[targetDateKey] = {
                breakfast: JSON.parse(JSON.stringify(dailyMeals.breakfast || [])),
                lunch: JSON.parse(JSON.stringify(dailyMeals.lunch || [])),
                snack: JSON.parse(JSON.stringify(dailyMeals.snack || [])),
                dinner: JSON.parse(JSON.stringify(dailyMeals.dinner || []))
            };

            // Régénérer les IDs pour éviter les conflits
            ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType => {
                allDailyMeals[targetDateKey][mealType].forEach(food => {
                    food.id = Date.now() + Math.random();
                });
            });

            // Sauvegarder
            localStorage.setItem('allDailyMeals', JSON.stringify(allDailyMeals));


            // Synchroniser avec le planning
            const oldDate = currentMealDate;
            currentMealDate = targetDate;
            syncMealsToPlanning();
            currentMealDate = oldDate;

            alert(`<i data-lucide="check-circle" class="icon-inline"></i> Journée dupliquée vers ${targetDate.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'})}`);

            // Demander si on veut aller sur cette date
            customConfirm('Aller vers cette date', 'Basculer sur le ' + targetDate.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'}) + ' ?').then((confirmed) => {
                if (confirmed) { goToDay(targetDate.getDay() === 0 ? 6 : targetDate.getDay() - 1); }
            });
        }


        // ===== TOAST DE SAUVEGARDE (avec debounce) =====
        let saveToastDebounceTimer = null;

        function showSaveToast() {
            // Debounce to avoid spam
            if (saveToastDebounceTimer) clearTimeout(saveToastDebounceTimer);

            saveToastDebounceTimer = setTimeout(() => {
                // Créer le toast s'il n'existe pas
                let toast = document.getElementById('save-toast');
                if (!toast) {
                    toast = document.createElement('div');
                    toast.id = 'save-toast';
                    toast.className = 'save-toast';
                    toast.innerHTML = '<i data-lucide="save" class="icon-inline"></i> Données enregistrées';
                    updateIcons();
                    document.body.appendChild(toast);
                }

                // Afficher
                toast.classList.add('show');

                // Masquer après 2s
                setTimeout(() =>  { toast.classList.remove('show'); }, 2000);
            }, 1000);
        }

        // Load daily meals from localStorage
        function loadDailyMeals() {
            const saved = localStorage.getItem('dailyMeals');
            if (saved) {
                dailyMeals = JSON.parse(saved);
                // Assurer que water existe
                if (typeof dailyMeals.water !== 'number') dailyMeals.water = 0;
                Object.keys(dailyMeals).forEach(mealType => {
                    if (mealType !== 'water') renderMeal(mealType);
                });
                updateDayTotals();
                updateWaterUI();
            }
        }

        // Weekly planner functions
        function changeWeek(direction) {
            currentWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
            // Sauvegarder la semaine actuelle dans localStorage
            localStorage.setItem('currentWeekStart', currentWeekStart.toISOString());
            renderWeeklyPlan();
        }

        function formatDate(date) {
            const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        }

        function getDayPlanFromMeals(dateKey) {
            // Get actual meal data from allDailyMeals instead of weeklyPlan cache
            const savedMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            const dayMeals = savedMeals[dateKey];

            if (!dayMeals) {
                return {
                    breakfast: 'Non planifié',
                    lunch: 'Non planifié',
                    snack: 'Non planifié',
                    dinner: 'Non planifié',
                    totalCal: 0
                };
            }

            const getMealSummary = (mealData) => {
                if (!mealData || !mealData.foods || mealData.foods.length === 0) {
                    return 'Non planifié';
                }
                return mealData.foods.map(f => f.name).join(', ');
            };

            const getMealCalories = (mealData) => {
                if (!mealData || !mealData.foods) return 0;
                return mealData.foods.reduce((sum, f) => {
                    const quantity = f.quantity || 100;
                    return sum + ((f.calories || 0) * quantity / 100);
                }, 0);
            };

            const totalCal = getMealCalories(dayMeals.breakfast) + getMealCalories(dayMeals.lunch) +
                            getMealCalories(dayMeals.snack) + getMealCalories(dayMeals.dinner);

            return {
                breakfast: getMealSummary(dayMeals.breakfast),
                lunch: getMealSummary(dayMeals.lunch),
                snack: getMealSummary(dayMeals.snack),
                dinner: getMealSummary(dayMeals.dinner),
                totalCal: Math.round(totalCal)
            };
        }

        function renderWeeklyPlan() {
            const weekStart = new Date(currentWeekStart);
            document.getElementById('current-week').textContent = `Semaine du ${formatDate(weekStart)}`;

            const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            const weekGrid = document.getElementById('week-grid');

            weekGrid.innerHTML = days.map((day, index) => {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + index);
                const dateKey = getDateKey(date);
                const dayPlan = getDayPlanFromMeals(dateKey);

                return `
                    <div class="day-card">
                        <div class="day-name">${day}</div>
                        <div class="day-date" style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 15px;">
                            ${formatDate(date)}
                        </div>
                        <div class="day-meals">
                            <div class="day-meal-item">
                                <div class="day-meal-label"><i data-lucide="coffee" style="width: 16px; height: 16px; display: inline; vertical-align: middle; color: var(--accent-fat);"></i> Petit-déjeuner</div>
                                <div class="day-meal-foods">${dayPlan.breakfast}</div></div>
                            <div class="day-meal-item">
                                <div class="day-meal-label"><i data-lucide="utensils" style="width: 16px; height: 16px; display: inline; vertical-align: middle; color: var(--accent-carbs);"></i> Déjeuner</div>
                                <div class="day-meal-foods">${dayPlan.lunch}</div></div>
                            <div class="day-meal-item">
                                <div class="day-meal-label"><i data-lucide="apple" style="width: 16px; height: 16px; display: inline; vertical-align: middle; color: var(--accent-ui);"></i> Goûter</div>
                                <div class="day-meal-foods">${dayPlan.snack}</div></div>
                            <div class="day-meal-item">
                                <div class="day-meal-label"><i data-lucide="moon" style="width: 16px; height: 16px; display: inline; vertical-align: middle; color: var(--accent-purple);"></i> Dîner</div>
                                <div class="day-meal-foods">${dayPlan.dinner}</div></div></div>
                        <div class="day-total-cal">${dayPlan.totalCal} kcal</div></div>
                `;
            }).join('');

            // Reinitialize Lucide icons after dynamic content
            updateIcons();

            // Update weekly summary
            updateWeeklySummary();
        }

        function updateWeeklySummary() {
            const weekStart = new Date(currentWeekStart);
            const savedMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            const closedDays = JSON.parse(localStorage.getItem('closedDays') || '{}');
            const macroTargets = JSON.parse(localStorage.getItem('macroTargets') || '{}');

            console.log('=== UPDATE WEEKLY SUMMARY ===');
            console.log('currentWeekStart:', currentWeekStart);
            console.log('weekStart:', weekStart);
            console.log('savedMeals:', savedMeals);
            console.log('Object.keys(savedMeals):', Object.keys(savedMeals));

            let totalCalories = 0;
            let daysWithData = 0;
            let closedDaysCount = 0;
            let macroSuccessDays = 0;
            let totalDaysChecked = 0;

            // Parcourir les 7 jours de la semaine
            for (let i = 0; i < 7; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);
                const dateKey = getDateKey(date);

                console.log(`Day ${i}: date=${date.toISOString()}, dateKey=${dateKey}, hasMeals=${!!savedMeals[dateKey]}, isClosed=${!!closedDays[dateKey]}`);

                // Compter les jours clôturés
                if (closedDays[dateKey]) {
                    closedDaysCount++;
                }

                // Récupérer les repas du jour
                const dayMeals = savedMeals[dateKey];
                if (dayMeals) {
                    // Calculer les calories du jour
                    const getMealMacros = (mealData) => {
                        if (!mealData || !mealData.foods) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
                        return mealData.foods.reduce((sum, f) => {
                            const quantity = f.quantity || 100;
                            const ratio = quantity / 100;
                            return {
                                calories: sum.calories + ((f.calories || 0) * ratio),
                                protein: sum.protein + ((f.protein || 0) * ratio),
                                carbs: sum.carbs + ((f.carbs || 0) * ratio),
                                fat: sum.fat + ((f.fat || 0) * ratio)
                            };
                        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
                    };

                    const breakfast = getMealMacros(dayMeals.breakfast);
                    const lunch = getMealMacros(dayMeals.lunch);
                    const snack = getMealMacros(dayMeals.snack);
                    const dinner = getMealMacros(dayMeals.dinner);

                    const dayTotals = {
                        calories: breakfast.calories + lunch.calories + snack.calories + dinner.calories,
                        protein: breakfast.protein + lunch.protein + snack.protein + dinner.protein,
                        carbs: breakfast.carbs + lunch.carbs + snack.carbs + dinner.carbs,
                        fat: breakfast.fat + lunch.fat + snack.fat + dinner.fat
                    };

                    // Ajouter aux calories totales si le jour a des données
                    if (dayTotals.calories > 0) {
                        totalCalories += dayTotals.calories;
                        daysWithData++;

                        // Vérifier si les objectifs macros sont respectés (seulement pour les jours avec données)
                        if (macroTargets.calories && macroTargets.protein && macroTargets.carbs && macroTargets.fat) {
                            totalDaysChecked++;

                            // Tolérance de 10% pour les calories, 20% pour les macros
                            const calorieMatch = Math.abs(dayTotals.calories - macroTargets.calories) <= macroTargets.calories * 0.10;
                            const proteinMatch = Math.abs(dayTotals.protein - macroTargets.protein) <= macroTargets.protein * 0.20;
                            const carbsMatch = Math.abs(dayTotals.carbs - macroTargets.carbs) <= macroTargets.carbs * 0.20;
                            const fatMatch = Math.abs(dayTotals.fat - macroTargets.fat) <= macroTargets.fat * 0.20;

                            // Si au moins calories + 2 macros sont respectées, on considère le jour comme réussi
                            const macrosMetCount = [proteinMatch, carbsMatch, fatMatch].filter(Boolean).length;
                            if (calorieMatch && macrosMetCount >= 2) {
                                macroSuccessDays++;
                            }
                        }
                    }
                }
            }

            // Calculer la moyenne des calories
            const avgCalories = daysWithData > 0 ? Math.round(totalCalories / daysWithData) : 0;

            // Calculer le pourcentage de réussite des objectifs macros
            const macroSuccessRate = totalDaysChecked > 0 ? Math.round((macroSuccessDays / totalDaysChecked) * 100) : 0;

            console.log('RESULTS:');
            console.log('totalCalories:', totalCalories);
            console.log('daysWithData:', daysWithData);
            console.log('avgCalories:', avgCalories);
            console.log('closedDaysCount:', closedDaysCount);
            console.log('macroSuccessRate:', macroSuccessRate);

            // Mettre à jour l'interface
            const avgCaloriesEl = document.getElementById('weekly-avg-calories');
            const closedDaysEl = document.getElementById('weekly-closed-days');
            const macroSuccessEl = document.getElementById('weekly-macro-success');

            console.log('Elements:', {avgCaloriesEl, closedDaysEl, macroSuccessEl});

            if (avgCaloriesEl) {
                avgCaloriesEl.textContent = daysWithData > 0 ? avgCalories.toLocaleString() : '—';
            }

            if (closedDaysEl) {
                closedDaysEl.textContent = closedDaysCount;
            }

            if (macroSuccessEl) {
                if (totalDaysChecked > 0) {
                    macroSuccessEl.textContent = macroSuccessRate + '%';
                    // Changer la couleur selon le taux de réussite
                    if (macroSuccessRate >= 80) {
                        macroSuccessEl.style.color = 'var(--accent-main)';
                    } else if (macroSuccessRate >= 60) {
                        macroSuccessEl.style.color = 'var(--accent-fat)';
                    } else {
                        macroSuccessEl.style.color = 'var(--accent-danger)';
                    }
                } else {
                    macroSuccessEl.textContent = '—';
                    macroSuccessEl.style.color = 'var(--accent-fat)';
                }
            }
        }

        // Food database search
        const foodDbSearch = document.getElementById('foodDbSearch');
        const foodDatabaseContainer = document.getElementById('foodDatabase');


        let currentCategory = 'all';

        function filterFoodsByCategory(category) {
            currentCategory = category;

            // Mettre à jour les styles des boutons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                if (btn.dataset.category === category) {
                    btn.style.background = 'var(--accent-ui)';
                    btn.style.color = 'white';
                    btn.style.border = 'none';
                    btn.classList.add('active');
                } else {
                    btn.style.background = 'var(--bg-tertiary)';
                    btn.style.color = 'var(--text-secondary)';
                    btn.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    btn.classList.remove('active');
                }
            });

            // Filtrer et afficher
            let filtered = foodDatabase;
            if (category !== 'all')  { filtered = foodDatabase.filter(food => food.category === category); }

            // Appliquer aussi le filtre de recherche si présent
            const searchTerm = document.getElementById('foodDbSearch')?.value.toLowerCase();
            if (searchTerm) {
                filtered = filtered.filter(food =>
                    food.name.toLowerCase().includes(searchTerm)
                );
            }

            renderFoodDatabase(filtered);
        }

        // Helper: obtenir le nom à afficher (alias ou nom original)
        function getDisplayName(food) {
            if (food.barcode) {
                const aliases = JSON.parse(localStorage.getItem('foodAliases') || '{}');
                if (aliases[food.barcode]) {
                    return aliases[food.barcode];
                }
            }
            return food.name;
        }

        function renderFoodDatabase(foods = foodDatabase) {
            const verifiedBadgeHtml = '<span style="color: #10b981; font-size: 1rem; cursor: help; margin-left: 4px;" title="Aliment vérifié par un administrateur">✓</span>';

            foodDatabaseContainer.innerHTML = foods.map(food => `
                <div class="food-item">
                    <div class="food-name">
                        ${getDisplayName(food)}
                        ${food.verified ? verifiedBadgeHtml : ''}
                    </div>
                    <div class="food-macros">
                        <span>
                            <div class="label">Prot</div>
                            <div class="value" style="color: var(--accent-protein)">${food.protein}g</div>
                        </span>
                        <span>
                            <div class="label">Glu</div>
                            <div class="value" style="color: var(--accent-carbs)">${food.carbs}g</div>
                        </span>
                        <span>
                            <div class="label">Lip</div>
                            <div class="value" style="color: var(--accent-fat)">${food.fat}g</div>
                        </span>
                        <span>
                            <div class="label">Cal</div>
                            <div class="value">${food.calories}</div>
                        </span>
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">
                        pour ${food.unit}
                    </div></div>
            `).join('');

            // Initialize Lucide icons
            updateIcons();
        }

        // Debounce pour éviter trop d'appels Firestore
        let searchTimeout = null;
        foodDbSearch.addEventListener('input', (e) => {
            const query = e.target.value.trim();

            // Annuler le timeout précédent
            if (searchTimeout) clearTimeout(searchTimeout);

            // Si query très courte (1 char), filtrer localement immédiatement
            if (query.length <= 1 && !/^\d+$/.test(query)) {
                let filtered = currentCategory === 'all' ? foodDatabase : foodDatabase.filter(food => food.category === currentCategory);
                if (query.length > 0) {
                    filtered = filtered.filter(food => food.name.toLowerCase().includes(query.toLowerCase()));
                }
                renderFoodDatabase(filtered);
                return;
            }

            // Pour les queries plus longues ou codes-barres, attendre 300ms puis chercher dans Firestore
            searchTimeout = setTimeout(() => {
                filterFoodDatabase(); // Cette fonction cherche dans Firestore !
            }, 300);
        });

        // Close modal when clicking outside
        document.getElementById('foodModal').addEventListener('click', (e) =>  { if (e.target.id === 'foodModal') {
                closeFoodModal(); }
        });

        // Initialize
        renderFoodDatabase();
        loadDailyMeals();

        // Load saved macro targets
        const savedTargets = localStorage.getItem('macroTargets');
        if (savedTargets) {
            const targets = JSON.parse(savedTargets);
            document.getElementById('targetProtein').textContent = targets.protein;
            document.getElementById('targetCarbs').textContent = targets.carbs;
            document.getElementById('targetFat').textContent = targets.fat;
            document.getElementById('totalCal').textContent = targets.calories;

            const proteinCal = targets.protein * 4;
            const carbsCal = targets.carbs * 4;
            const fatCal = targets.fat * 9;

            document.getElementById('proteinCal').textContent = proteinCal;
            document.getElementById('carbsCal').textContent = carbsCal;
            document.getElementById('fatCal').textContent = fatCal;

            document.getElementById('proteinBar').style.width = `${(proteinCal / targets.calories) * 100}%`;
            document.getElementById('carbsBar').style.width = `${(carbsCal / targets.calories) * 100}%`;
            document.getElementById('fatBar').style.width = `${(fatCal / targets.calories) * 100}%`;

            document.getElementById('results').style.display = 'block';
            // Premium: Cacher l'état vide et afficher le contenu
            const emptyState2 = document.getElementById('results-empty-state');
            const resultsContent2 = document.getElementById('results-content');
            if (emptyState2) emptyState2.style.display = 'none';
            if (resultsContent2) resultsContent2.style.display = 'block';
            updateIcons();
        }

        // ========================================
        // VERSION 2.0 - NOUVELLES FONCTIONNALITÉS
        // ========================================

        // Variables globales V2
        let customFoods = [];
        let allDailyMeals = {};
        let currentMealDate = new Date();
        let trackingData = [];

        // Initialisation V2
        window.addEventListener('DOMContentLoaded', function() {
            updateSectionsAvailability();
            initV2();

            // Attach save listeners to all objective inputs
            const inputsToSave = ['deficit', 'surplus', 'proteinCoeff', 'fatCoeff', 'proteinCoeffBulk', 'fatCoeffBulk', 'activity', 'weight', 'bodyFat'];
            inputsToSave.forEach(id => {
                const input = document.getElementById(id);
                if (input) { input.addEventListener('change', function() {
                        saveCalcSettings(); });
                }
            });
        });

        // === VALIDATION ROBUSTE DES INPUTS ===
        function enforceInputLimits() {
            // Age validation removed - using birth dropdowns now

            // Taille: 100-250 cm
            const heightInput = document.getElementById('height');
            if (heightInput) {
                heightInput.addEventListener('blur', function() {
                    const val = parseFloat(this.value);
                    if (val && val < 100) {
                        this.value = 100;
                        showProfileAlert('La taille minimum est de 100 cm', 'warning', true);
                    }
                    if (val && val > 250) {
                        this.value = 250;
                        showProfileAlert('La taille maximum est de 250 cm', 'warning', true);
                    }
                });
            }

            // Poids: 30-300 kg
            const weightInput = document.getElementById('weight');
            if (weightInput) {
                weightInput.addEventListener('blur', function() {
                    const val = parseFloat(this.value);
                    if (val && val < 30) {
                        this.value = 30;
                        showProfileAlert('Le poids minimum est de 30 kg', 'warning', true);
                    }
                    if (val && val > 300) {
                        this.value = 300;
                        showProfileAlert('Le poids maximum est de 300 kg', 'warning', true);
                    }
                    // Mettre à jour l'objectif d'hydratation
                    if (typeof updateWaterUI === 'function') updateWaterUI();
                });
            }
        }

        // === RGPD CONSENTEMENT ===
        function checkRGPDConsent() {
            const hasConsent = localStorage.getItem('rgpd-consent');
            if (!hasConsent) { showRGPDModal(); }
        }

        function showRGPDModal() {
            const modal = document.getElementById('rgpd-modal');
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
                window.scrollTo(0, 0);
            }
        }

        function acceptRGPD() {
            localStorage.setItem('rgpd-consent', 'accepted');
            localStorage.setItem('rgpd-consent-date', new Date().toISOString());
            document.getElementById('rgpd-modal').style.display = 'none';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        function refuseRGPD() {
            // Effacer toutes les données
            localStorage.clear();
            alert('Tes données ont été effacées. L\'application ne fonctionnera pas sans consentement car elle nécessite de sauvegarder tes informations localement.');
            // Recharger pour montrer à nouveau le modal
            location.reload();
        }

        // === EXPORT MACROS AS IMAGE ===
        async function exportMacrosAsImage() {
            const resultsCard = document.getElementById('results');

            if (!resultsCard || resultsCard.style.display === 'none') {
                alert('Calcule d\'abord tes macros avant d\'exporter !');
                return;
            }

            // Scroll to top for visibility
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Afficher modal custom d'avertissement
            document.getElementById('export-warning-modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function cancelExport() {
            document.getElementById('export-warning-modal').style.display = 'none';
            document.body.style.overflow = '';
        }

        async function cleanDuplicateRecipes() {
            const confirmed = await customConfirm(
                '<i data-lucide="sparkles" style="width: 18px; height: 18px;"></i> Nettoyer les recettes',
                'Cette action va supprimer les recettes dupliquées par erreur sur plusieurs jours.\n\nContinuer ?',
                false
            );

            if (!confirmed) return;

            let cleaned = 0;

            // Trouver les doublons
            const recipesMap = {};
            Object.keys(allRecipes).forEach(dateKey => {
                const dayRecipes = allRecipes[dateKey];
                ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType => {
                    const recipe = dayRecipes[mealType];
                    if (recipe && recipe.trim()) {
                        const key = recipe.trim();
                        if (!recipesMap[key]) { recipesMap[key] = []; }
                        recipesMap[key].push({ date: dateKey, meal: mealType });
                    }
                });
            });

            // Garder seulement la première occurrence
            Object.values(recipesMap).forEach(occurrences => {
                if (occurrences.length > 1) {
                    // Garder la première, supprimer les autres
                    for (let i = 1; i < occurrences.length; i++) {
                        const { date, meal } = occurrences[i];
                        allRecipes[date][meal] = '';
                        cleaned++;
                    }
                }
            });


            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> ${cleaned} recette(s) dupliquée(s) supprimée(s)`);

            // Recharger l'affichage
            loadDailyMealsForCurrentDate();
        }

        async function resetAllData() {
            const isConnected = typeof isFirebaseConnected === 'function' && isFirebaseConnected();

            let message = 'Cette action est irréversible et supprimera :\n\n• Tous tes repas et plannings\n• Tous tes aliments personnalisés\n• Tous tes suivis corporels\n• Tous tes paramètres\n\n';

            if (isConnected) {
                message += '<i data-lucide="cloud" class="icon-inline"></i> <strong>Les données locales ET cloud seront supprimées.</strong>\n\n';
            } else {
                message += '<i data-lucide="hard-drive" class="icon-inline"></i> <strong>Seules les données locales seront supprimées</strong> (pas connecté au cloud).\n\n';
            }

            message += '<i data-lucide="lightbulb" class="icon-inline"></i> Pense à exporter tes données avant.\n\nConfirmer la suppression ?';

            customConfirm('Supprimer toutes les données', message, true).then(async (confirmed) => {
                if (!confirmed) {
                    showToast('<i data-lucide="x-circle" class="icon-inline"></i> Suppression annulée');
                    return;
                }

                // Supprimer les données cloud si connecté
                if (isConnected && typeof firebaseDeleteCloudData === 'function') {
                    const cloudDeleted = await firebaseDeleteCloudData();
                    if (cloudDeleted) {
                        showToast('<i data-lucide="cloud-off" class="icon-inline"></i> Données cloud supprimées');
                    }
                }

                // Supprimer toutes les données locales
                localStorage.clear();
                showToast('<i data-lucide="check-circle" class="icon-inline"></i> Toutes les données ont été supprimées');

                // Reload après 1 seconde
                setTimeout(() =>  { location.reload(); }, 1000);
            });
        }

        // Fonction pour charger html2canvas dynamiquement
        function loadHtml2Canvas() {
            return new Promise((resolve, reject) => {
                if (typeof html2canvas !== 'undefined') {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        async function confirmExport() {
            // Fermer modal
            document.getElementById('export-warning-modal').style.display = 'none';
            document.body.style.overflow = '';

            const resultsCard = document.getElementById('results');

            try {
                // Charger html2canvas si nécessaire
                showToast('<i data-lucide="loader" class="icon-inline"></i> Préparation de l\'export...');
                await loadHtml2Canvas();

                // Masquer l'IMC avant export (toujours masqué pour protéger la vie privée)
                const imcOverlay = document.getElementById('imc-overlay-btn');
                let wasImcVisible = false;

                if (imcOverlay && imcOverlay.style.opacity === '0') {
                    // IMC était visible, on le masque pour l'export
                    wasImcVisible = true;
                    imcOverlay.style.opacity = '1';
                    imcOverlay.style.background = 'rgba(0, 0, 0, 0.7)';
                    imcOverlay.style.backdropFilter = 'blur(10px)';
                    imcOverlay.style.webkitBackdropFilter = 'blur(10px)';
                }

                // Capturer la card résultats
                const canvas = await html2canvas(resultsCard, {
                    backgroundColor: '#151515',
                    scale: 2, // Haute qualité
                    logging: false,
                    windowWidth: 1200,
                });

                // Restaurer l'état IMC si nécessaire
                if (wasImcVisible && imcOverlay) {
                    imcOverlay.style.opacity = '0';
                    imcOverlay.style.background = 'transparent';
                    imcOverlay.style.backdropFilter = 'none';
                    imcOverlay.style.webkitBackdropFilter = 'none';
                }

                // Convertir en image et télécharger
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    const now = new Date();
                    const dateStr = `${now.getDate()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getFullYear()}`;
                    link.download = `macros-nutrition-${dateStr}.png`;
                    link.href = url;
                    link.click();
                    URL.revokeObjectURL(url);

                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Image téléchargée !');
                });

            } catch (error) {
                console.error('Erreur export:', error);
                alert('Erreur lors de l\'export. Utilise la capture d\'écran de ton appareil.');
            }
        }

        // === POLITIQUE DE CONFIDENTIALITÉ ===
        function showPrivacyPolicy() {
            document.getElementById('privacy-modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closePrivacyPolicy() {
            document.getElementById('privacy-modal').style.display = 'none';
            document.body.style.overflow = '';
        }

        function initV2() {
            // loadCustomFoods(); // DÉPLACÉ dans admin.js APRÈS création DataService
            // loadMealTemplates(); // DÉPLACÉ dans admin.js APRÈS création DataService
            // loadAllMeals(); // DÉPLACÉ dans admin.js APRÈS création DataService
            // loadTrackingData(); // DÉPLACÉ dans admin.js APRÈS création DataService
            // loadCalcSettings(); // DÉPLACÉ dans requestAnimationFrame
            loadFavoriteFoods();  // Load favorite foods
            // loadProfile(); // MOVED: Now called AFTER dropdown population in requestAnimationFrame
            updateMealDateDisplay();

            // Populate tracking date dropdowns and set today
            populateTrackingDateDropdowns();
            setTrackingDateToToday();

            // Load sidebar state
            loadSidebarState();

            // Remplacer renderFoodDatabase par la version avec custom
            const originalRenderDb = renderFoodDatabase;
            renderFoodDatabase = function(foods) {
                renderFoodDatabaseWithCustom(foods || foodDatabase);
            };
            renderFoodDatabase();

            // Forcer les limites sur les inputs numériques
            enforceInputLimits();

            // Vérifier consentement RGPD
            checkRGPDConsent();

            // Attacher validation en temps réel aux inputs de macros
            const macroInputs = [
                'weight', 'height', 'profile-gender', 'activity',
                'deficit', 'proteinCoeff', 'fatCoeff',
                'surplus', 'proteinCoeffBulk', 'fatCoeffBulk'
            ];

            macroInputs.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('input', validateMacroInputs);
                    element.addEventListener('change', validateMacroInputs);
                }
            });

            // Populate birth date dropdowns - use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(async () => {
                const daySelect = document.getElementById('birth-day');
                const yearSelect = document.getElementById('birth-year');


                if (daySelect) {
                    // Clear existing options first
                    while (daySelect.options.length > 1) {
                        daySelect.remove(1);
                    }
                    for (let i = 1; i <= 31; i++) {
                        const option = document.createElement('option');
                        option.value = i;
                        option.textContent = i;
                        daySelect.appendChild(option);
                    }
                } else {
                    console.error('<i data-lucide="x-circle" class="icon-inline"></i> Day select not found! ID: birth-day');
                }

                if (yearSelect) {
                    // Clear existing options first
                    while (yearSelect.options.length > 1) {
                        yearSelect.remove(1);
                    }
                    const currentYear = new Date().getFullYear();
                    for (let i = currentYear - 10; i >= currentYear - 100; i--) {
                        const option = document.createElement('option');
                        option.value = i;
                        option.textContent = i;
                        yearSelect.appendChild(option);
                    }
                } else {
                    console.error('<i data-lucide="x-circle" class="icon-inline"></i> Year select not found! ID: birth-year');
                }

                // IMPORTANT: Profile et calc settings sont maintenant chargés depuis admin.js
                // APRÈS que window.dataService soit créé (sinon fallback localStorage)
                // await loadProfile();
                // await loadCalcSettings();

                // Initialize Lucide icons
                if (typeof lucide !== 'undefined')  { updateIcons(); }
            });
        }

        // ===== ALIMENTS PERSONNALISÉS =====
        async function loadCustomFoods() {
            // Charger depuis Firestore (avec fallback localStorage)
            const foods = await loadCustomFoodsFromFirestore();
            customFoods = foods;
            customFoods.forEach(food => {
                // Ajouter une catégorie par défaut si elle n'existe pas
                if (!food.category) {
                    food.category = 'feculents';
                }
                if (!foodDatabase.find(f => f.name === food.name))  { foodDatabase.push(food); }
            });
        }

        function openAddFoodModal() {
            document.getElementById('addFoodModal').classList.add('active');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            window.scrollTo(0, 0);
            // Focus on first input
            setTimeout(() => {
                const nameInput = document.getElementById('new-food-name');
                if (nameInput) nameInput.focus();
            }, 100);
        }

        function closeAddFoodModal() {
            document.getElementById('addFoodModal').classList.remove('active');
            document.getElementById('new-food-name').value = '';
            document.getElementById('new-food-name').disabled = false; // Réactiver le nom
            document.getElementById('new-food-category').value = ''; // Reset catégorie
            document.getElementById('new-food-unit').value = '100g';
            document.getElementById('new-food-protein').value = '';
            document.getElementById('new-food-carbs').value = '';
            document.getElementById('new-food-fat').value = '';
            document.getElementById('new-food-fiber').value = '';
            document.getElementById('new-food-calories').value = '';
            // Reset alias
            const aliasInput = document.getElementById('new-food-alias');
            const aliasGroup = document.getElementById('alias-input-group');
            if (aliasInput) aliasInput.value = '';
            if (aliasGroup) aliasGroup.style.display = 'none';
            // Reset le champ de saisie manuelle de code-barres
            const manualInput = document.getElementById('manual-barcode-input');
            if (manualInput) manualInput.value = '';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            // Reset les variables globales du scanner
            window.pendingBarcode = null;
            window.pendingProductSource = null;
            // Supprimer le message source s'il existe
            const modalBody = document.querySelector('#addFoodModal .modal-body');
            if (modalBody) {
                const oldMsg = modalBody.querySelector('.source-message');
                if (oldMsg) oldMsg.remove();
            }
        }

        // Fonction pour pré-remplir le formulaire après scan
        function preFillAddFoodModal(product, barcode) {

            // Stocker le code-barres et la source AVANT d'ouvrir le modal
            window.pendingBarcode = barcode;
            window.pendingProductSource = product.source; // 'firestore' ou 'openfoodfacts'

            // Ouvrir le modal
            openAddFoodModal();

            // Pré-remplir les champs (timeout pour s'assurer que le modal est ouvert)
            setTimeout(() => {
                const nameInput = document.getElementById('new-food-name');
                nameInput.value = product.name || '';
                // Bloquer le changement de nom pour les produits OpenFoodFacts
                nameInput.disabled = (product.source === 'openfoodfacts');

                // Afficher le champ alias si produit OFF
                const aliasGroup = document.getElementById('alias-input-group');
                const aliasInput = document.getElementById('new-food-alias');
                if (product.source === 'openfoodfacts') {
                    aliasGroup.style.display = 'block';
                    // Pré-remplir avec alias existant si présent
                    const aliases = JSON.parse(localStorage.getItem('foodAliases') || '{}');
                    if (aliases[barcode]) {
                        aliasInput.value = aliases[barcode];
                    }
                } else {
                    aliasGroup.style.display = 'none';
                    aliasInput.value = '';
                }

                document.getElementById('new-food-protein').value = product.protein || '';
                document.getElementById('new-food-carbs').value = product.carbs || '';
                document.getElementById('new-food-fat').value = product.fat || '';
                document.getElementById('new-food-fiber').value = product.fiber || '';
                document.getElementById('new-food-calories').value = product.calories || '';

                // Sélectionner la catégorie UNIQUEMENT si source = firestore (donc catégorie déjà validée)
                const categorySelect = document.getElementById('new-food-category');
                if (categorySelect) {
                    if (product.source === 'firestore' && product.category) {
                        categorySelect.value = product.category;
                    } else {
                        // Pour OpenFoodFacts, on force la sélection par l'utilisateur
                        categorySelect.value = '';
                    }
                }

                // Afficher message selon la source
                const modalBody = document.querySelector('#addFoodModal .modal-body');
                if (modalBody) {
                    // Supprimer ancien message si existe
                    const oldMsg = modalBody.querySelector('.source-message');
                    if (oldMsg) oldMsg.remove();

                    // Ajouter nouveau message
                    const message = document.createElement('div');
                    message.className = 'source-message';
                    message.style.cssText = 'padding: var(--space-md); margin-bottom: var(--space-lg); border-radius: var(--radius-md); font-size: 0.9rem;';

                    if (product.source === 'firestore') {
                        message.style.background = 'rgba(16, 185, 129, 0.1)';
                        message.style.border = '1px solid rgba(16, 185, 129, 0.3)';
                        message.style.color = 'var(--accent-main)';
                        message.innerHTML = '<i data-lucide="database" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> <strong>Produit trouvé dans la base communautaire</strong>';
                    } else {
                        message.style.background = 'rgba(251, 191, 36, 0.1)';
                        message.style.border = '1px solid rgba(251, 191, 36, 0.3)';
                        message.style.color = '#fbbf24';
                        message.innerHTML = '<i data-lucide="globe" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> <strong>Données d\'Open Food Facts</strong><br><span style="font-size: 0.85rem;">Vérifie les macros et <strong>choisis une catégorie</strong> avant de valider. En validant, ce produit sera ajouté à la base communautaire.</span>';
                    }

                    modalBody.insertBefore(message, modalBody.firstChild);
                    updateIcons();
                }

            }, 100);
        }

        async function saveNewFood() {
            const name = document.getElementById('new-food-name').value.trim();
            const category = document.getElementById('new-food-category').value;
            const protein = parseFloat(document.getElementById('new-food-protein').value) || 0;
            const carbs = parseFloat(document.getElementById('new-food-carbs').value) || 0;
            const fat = parseFloat(document.getElementById('new-food-fat').value) || 0;
            const fiber = parseFloat(document.getElementById('new-food-fiber').value) || 0;
            let calories = parseFloat(document.getElementById('new-food-calories').value);


            if (!name) {
                customAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Nom manquant', 'Veuillez entrer un nom pour l\'aliment.').then(() => {});
                return;
            }

            // Vérifier qu'une catégorie a été sélectionnée
            if (!category) {
                customAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Catégorie manquante', 'Veuillez choisir une catégorie pour l\'aliment.').then(() => {});
                return;
            }

            if (!calories || calories === 0)  { calories = Math.round(protein * 4 + carbs * 4 + fat * 9); }

            // Récupérer le code-barres et la source
            const barcode = window.pendingBarcode || null;
            const productSource = window.pendingProductSource || null;


            const newFood = {
                name,
                unit: '100g',
                protein,
                carbs,
                fat,
                fiber,
                calories,
                category
            };

            if (barcode) {
                newFood.barcode = barcode;
            }

            let toastMessage = '';

            // === CAS 1: Produit venant de Firestore (déjà dans la base communautaire) ===
            if (productSource === 'firestore') {

                // Mettre à jour Firestore si modifications
                if (barcode && typeof window.saveToAlimentsCommuns === 'function') {
                    const saved = await window.saveToAlimentsCommuns(newFood);
                    if (saved) {
                        toastMessage = '<i data-lucide="database" class="icon-inline"></i> ' + name + ' (base communautaire)';
                    }
                } else {
                    toastMessage = '<i data-lucide="check-circle" class="icon-inline"></i> ' + name + ' prêt !';
                }
            }
            // === CAS 2: Produit d'OpenFoodFacts ou saisie manuelle ===
            else {

                // Vérifier doublon local
                const existingFood = customFoods.find(f => f.name.toLowerCase() === name.toLowerCase());
                if (existingFood) {
                    customAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Nom déjà utilisé', 'Un aliment avec ce nom existe déjà dans ta base.').then(() => {});
                    return;
                }

                // Sauvegarder vers Firestore
                newFood.custom = true;
                const foodId = newFood.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                try {
                    await saveCustomFoodToFirestore(foodId, newFood);
                } catch (error) {
                    console.error('Erreur sauvegarde custom food:', error);
                    // L'erreur a déjà été affichée
                }

                // Recharger depuis Firestore pour s'assurer de la cohérence
                customFoods = await loadCustomFoodsFromFirestore();
                // Reconstruire foodDatabase avec les custom foods
                customFoods.forEach(food => {
                    if (!foodDatabase.find(f => f.name === food.name)) {
                        foodDatabase.push(food);
                    }
                });

                toastMessage = '<i data-lucide="check-circle" class="icon-inline"></i> ' + name + ' ajouté à ta base';

                // Sauvegarder dans Firestore si code-barres
                if (barcode && typeof window.saveToAlimentsCommuns === 'function') {
                    try {
                        const saved = await window.saveToAlimentsCommuns(newFood);
                        if (saved) {
                            toastMessage = '<i data-lucide="cloud" class="icon-inline"></i> ' + name + ' ajouté à la base communautaire !';
                        }
                    } catch (err) {
                        console.error('❌ [saveNewFood] Erreur Firestore:', err);
                    }
                }
            }

            // Sauvegarder l'alias si fourni (pour produits OFF)
            const aliasInput = document.getElementById('new-food-alias');
            if (aliasInput && aliasInput.value.trim() && barcode) {
                const aliases = JSON.parse(localStorage.getItem('foodAliases') || '{}');
                aliases[barcode] = aliasInput.value.trim();
                localStorage.setItem('foodAliases', JSON.stringify(aliases));
            }

            // Reset
            window.pendingBarcode = null;
            window.pendingProductSource = null;

            closeAddFoodModal();
            filterFoodDatabase();
            showToast(toastMessage);
        }

        // ===== BARCODE SCANNER =====
        let html5QrCode = null;
        let scannerVideoTrack = null;
        let scannerFlashOn = false;
        let scannerScannedBarcode = null;

        // Ouvrir le scanner depuis le modal d'ajout d'aliment
        function openBarcodeScannerFromAddModal() {
            // Fermer le modal d'ajout d'abord
            document.getElementById('addFoodModal').classList.remove('active');
            // Puis ouvrir le scanner
            openBarcodeScanner();
        }

        // Rechercher un code-barres saisi manuellement
        async function searchManualBarcode() {
            const input = document.getElementById('manual-barcode-input');
            const barcode = input.value.trim();

            if (!barcode) {
                showToast('⚠️ Entre un code-barres');
                return;
            }

            if (!/^\d+$/.test(barcode)) {
                showToast('⚠️ Le code-barres doit contenir uniquement des chiffres');
                return;
            }

            showToast('🔍 Recherche en cours...');

            const product = await searchProductByBarcode(barcode);

            if (product) {
                // Vider l'input
                input.value = '';
                // Pré-remplir le formulaire (le modal est déjà ouvert)
                preFillAddFoodModalInPlace(product, barcode);
            } else {
                showToast('❌ Produit non trouvé pour ce code-barres');
                // Stocker quand même le barcode pour l'ajout manuel
                window.pendingBarcode = barcode;
                window.pendingProductSource = 'manual';
            }
        }

        // Pré-remplir le formulaire sans ouvrir le modal (déjà ouvert)
        function preFillAddFoodModalInPlace(product, barcode) {

            // Stocker le code-barres et la source
            window.pendingBarcode = barcode;
            window.pendingProductSource = product.source;

            // Pré-remplir les champs
            const nameInput = document.getElementById('new-food-name');
            nameInput.value = product.name || '';
            // Bloquer le changement de nom pour les produits OpenFoodFacts
            nameInput.disabled = (product.source === 'openfoodfacts');

            // Afficher le champ alias si produit OFF
            const aliasGroup = document.getElementById('alias-input-group');
            const aliasInput = document.getElementById('new-food-alias');
            if (product.source === 'openfoodfacts') {
                aliasGroup.style.display = 'block';
                // Pré-remplir avec alias existant si présent
                const aliases = JSON.parse(localStorage.getItem('foodAliases') || '{}');
                if (aliases[barcode]) {
                    aliasInput.value = aliases[barcode];
                }
            } else {
                aliasGroup.style.display = 'none';
                aliasInput.value = '';
            }

            document.getElementById('new-food-protein').value = product.protein || '';
            document.getElementById('new-food-carbs').value = product.carbs || '';
            document.getElementById('new-food-fat').value = product.fat || '';
            document.getElementById('new-food-fiber').value = product.fiber || '';
            document.getElementById('new-food-calories').value = product.calories || '';
            document.getElementById('manual-barcode-input').value = '';

            // Sélectionner la catégorie UNIQUEMENT si source = firestore
            const categorySelect = document.getElementById('new-food-category');
            if (categorySelect) {
                if (product.source === 'firestore' && product.category) {
                    categorySelect.value = product.category;
                } else {
                    categorySelect.value = '';
                }
            }

            // Afficher message selon la source
            const modalBody = document.querySelector('#addFoodModal .modal-body');
            if (modalBody) {
                const oldMsg = modalBody.querySelector('.source-message');
                if (oldMsg) oldMsg.remove();

                const message = document.createElement('div');
                message.className = 'source-message';
                message.style.cssText = 'padding: var(--space-md); margin-bottom: var(--space-lg); border-radius: var(--radius-md); font-size: 0.9rem;';

                if (product.source === 'firestore') {
                    message.style.background = 'rgba(16, 185, 129, 0.1)';
                    message.style.border = '1px solid rgba(16, 185, 129, 0.3)';
                    message.style.color = 'var(--accent-main)';
                    message.innerHTML = '<i data-lucide="database" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> <strong>Produit trouvé dans la base communautaire</strong>';
                } else {
                    message.style.background = 'rgba(251, 191, 36, 0.1)';
                    message.style.border = '1px solid rgba(251, 191, 36, 0.3)';
                    message.style.color = '#fbbf24';
                    message.innerHTML = '<i data-lucide="globe" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> <strong>Données d\'Open Food Facts</strong><br><span style="font-size: 0.85rem;">Vérifie les macros et <strong>choisis une catégorie</strong> avant de valider.</span>';
                }

                modalBody.insertBefore(message, modalBody.firstChild);
                updateIcons();
            }

            showToast('✅ Produit trouvé : ' + product.name);
        }

        function openBarcodeScanner() {
            // Vérifier si HTTPS (requis pour caméra sur mobile)
            if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
                showToast('<i data-lucide="alert-triangle" class="icon-inline"></i> Le scanner nécessite HTTPS', 'warning');
                return;
            }

            const modal = document.getElementById('barcodeScannerModal');
            const scannerContainer = document.getElementById('scanner-container');
            const scannerResult = document.getElementById('scanner-result');

            // Reset l'état
            scannerContainer.style.display = 'block';
            scannerResult.style.display = 'none';
            scannerScannedBarcode = null;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            updateIcons();

            // Initialiser le scanner
            startBarcodeScanner();
        }

        function closeBarcodeScanner() {
            const modal = document.getElementById('barcodeScannerModal');
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // Reset flash
            scannerFlashOn = false;
            scannerVideoTrack = null;
            const flashBtn = document.getElementById('scanner-flash-btn');
            if (flashBtn) {
                flashBtn.style.display = 'none';
                flashBtn.style.background = 'rgba(0, 0, 0, 0.6)';
            }

            // Arrêter le scanner
            if (html5QrCode) {
                html5QrCode.stop().then(() => {
                    html5QrCode.clear();
                }).catch(err => console.log('Erreur arrêt scanner:', err));
            }
        }

        // Toggle flash/torche du scanner
        async function toggleScannerFlash() {
            if (!scannerVideoTrack) return;

            try {
                scannerFlashOn = !scannerFlashOn;
                await scannerVideoTrack.applyConstraints({
                    advanced: [{ torch: scannerFlashOn }]
                });

                // Mise à jour visuelle du bouton
                const flashBtn = document.getElementById('scanner-flash-btn');
                if (flashBtn) {
                    flashBtn.style.background = scannerFlashOn ? 'rgba(250, 204, 21, 0.8)' : 'rgba(0, 0, 0, 0.6)';
                    flashBtn.style.color = scannerFlashOn ? '#000' : '#fff';
                }

            } catch (err) {
                console.error('Erreur toggle flash:', err);
                showToast('<i data-lucide="zap-off" class="icon-inline"></i> Impossible d\'activer le flash', 'error');
            }
        }

        async function startBarcodeScanner() {
            const readerDiv = document.getElementById('barcode-reader');

            try {
                html5QrCode = new Html5Qrcode('barcode-reader');

                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                    // Désactiver le beep
                    disableFlip: false,
                    // Config pour codes-barres (pas QR codes)
                    experimentalFeatures: {
                        useBarCodeDetectorIfSupported: true
                    },
                    // Formats de codes-barres alimentaires
                    formatsToSupport: [
                        Html5QrcodeSupportedFormats.EAN_13,  // Le plus courant (13 chiffres)
                        Html5QrcodeSupportedFormats.EAN_8,   // 8 chiffres
                        Html5QrcodeSupportedFormats.UPC_A,   // USA/Canada
                        Html5QrcodeSupportedFormats.UPC_E,   // USA/Canada compact
                        Html5QrcodeSupportedFormats.CODE_128 // Autres
                    ]
                };


                await html5QrCode.start(
                    { facingMode: 'environment' },
                    config,
                    onBarcodeScanned,
                    (errorMessage) => {
                        // Ignorer les erreurs de scan en continu (ne pas polluer la console)
                    }
                );


                // Vérifier si le flash/torche est disponible
                try {
                    const videoElement = document.querySelector('#barcode-reader video');
                    if (videoElement && videoElement.srcObject) {
                        const tracks = videoElement.srcObject.getVideoTracks();
                        if (tracks.length > 0) {
                            scannerVideoTrack = tracks[0];
                            const capabilities = scannerVideoTrack.getCapabilities();
                            if (capabilities.torch) {
                                // Afficher le bouton flash
                                const flashBtn = document.getElementById('scanner-flash-btn');
                                if (flashBtn) {
                                    flashBtn.style.display = 'flex';
                                    flashBtn.style.alignItems = 'center';
                                    flashBtn.style.justifyContent = 'center';
                                }
                            }
                        }
                    }
                } catch (flashErr) {
                    console.log('Flash non disponible:', flashErr);
                }
            } catch (err) {
                console.error('❌ Erreur démarrage scanner:', err);
                showToast('<i data-lucide="camera-off" class="icon-inline"></i> Impossible d\'accéder à la caméra', 'error');
                closeBarcodeScanner();
            }
        }

        // Track barcode scan count for analytics
        async function incrementBarcodeScanCount() {
            if (!auth?.currentUser) return;

            try {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const currentCount = parseInt(userSnap.data().barcodeScans) || 0;
                    await updateDoc(userRef, {
                        barcodeScans: currentCount + 1
                    });
                }
            } catch (error) {
                console.error('Erreur tracking scan barcode:', error);
                // Don't show error to user, this is background tracking
            }
        }

        async function onBarcodeScanned(decodedText, decodedResult) {
            // Éviter les scans multiples
            if (scannerScannedBarcode === decodedText) return;
            scannerScannedBarcode = decodedText;

            // Track barcode scan for analytics
            incrementBarcodeScanCount();

            try {
                // Afficher loader
                const scannerContainer = document.getElementById('scanner-container');
                const scannerResult = document.getElementById('scanner-result');

                scannerContainer.style.display = 'none';
                scannerResult.style.display = 'block';
                scannerResult.innerHTML = `
                    <div class="scanner-result-content">
                        <i data-lucide="loader" class="spinner" style="width: 32px; height: 32px;"></i>
                        <p>Recherche du produit...</p>
                        <p style="font-size: 0.85rem; color: var(--text-secondary);">Code: ${decodedText}</p>
                    </div>
                `;
                updateIcons();

                // Recherche en cascade : Firestore → Open Food Facts
                const product = await searchProductByBarcode(decodedText);

                // Arrêter le scanner
                if (html5QrCode) {
                    try {
                        await html5QrCode.stop();
                    } catch (e) {
                    }
                }

                // Fermer le modal scanner
                const modal = document.getElementById('barcodeScannerModal');
                modal.classList.remove('active');
                document.body.style.overflow = '';

                // Ouvrir le modal d'ajout avec les données
                if (product) {
                    // Stocker les données AVANT d'ouvrir le modal
                    window.pendingBarcode = decodedText;
                    window.pendingProductSource = product.source;

                    // Ouvrir le modal
                    document.getElementById('addFoodModal').classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // Pré-remplir les champs
                    setTimeout(() => {
                        const nameInput = document.getElementById('new-food-name');
                        nameInput.value = product.name || '';
                        // Bloquer le changement de nom pour les produits OpenFoodFacts
                        nameInput.disabled = (product.source === 'openfoodfacts');

                        // Afficher le champ alias si produit OFF
                        const aliasGroup = document.getElementById('alias-input-group');
                        const aliasInput = document.getElementById('new-food-alias');
                        if (product.source === 'openfoodfacts') {
                            aliasGroup.style.display = 'block';
                            const aliases = JSON.parse(localStorage.getItem('foodAliases') || '{}');
                            if (aliases[decodedText]) {
                                aliasInput.value = aliases[decodedText];
                            }
                        } else {
                            aliasGroup.style.display = 'none';
                            aliasInput.value = '';
                        }

                        document.getElementById('new-food-protein').value = product.protein || '';
                        document.getElementById('new-food-carbs').value = product.carbs || '';
                        document.getElementById('new-food-fat').value = product.fat || '';
                        document.getElementById('new-food-fiber').value = product.fiber || '';
                        document.getElementById('new-food-calories').value = product.calories || '';
                        document.getElementById('manual-barcode-input').value = '';

                        // Catégorie
                        const categorySelect = document.getElementById('new-food-category');
                        if (product.source === 'firestore' && product.category) {
                            categorySelect.value = product.category;
                        } else {
                            categorySelect.value = '';
                        }

                        // Message source
                        const modalBody = document.querySelector('#addFoodModal .modal-body');
                        const oldMsg = modalBody.querySelector('.source-message');
                        if (oldMsg) oldMsg.remove();

                        const message = document.createElement('div');
                        message.className = 'source-message';
                        message.style.cssText = 'padding: var(--space-md); margin-bottom: var(--space-lg); border-radius: var(--radius-md); font-size: 0.9rem;';

                        if (product.source === 'firestore') {
                            message.style.background = 'rgba(16, 185, 129, 0.1)';
                            message.style.border = '1px solid rgba(16, 185, 129, 0.3)';
                            message.style.color = 'var(--accent-main)';
                            message.innerHTML = '✅ <strong>Produit trouvé dans la base communautaire</strong>';
                        } else {
                            message.style.background = 'rgba(251, 191, 36, 0.1)';
                            message.style.border = '1px solid rgba(251, 191, 36, 0.3)';
                            message.style.color = '#fbbf24';
                            message.innerHTML = '🌐 <strong>Données Open Food Facts</strong><br><span style="font-size: 0.85rem;">Vérifie les macros et choisis une catégorie.</span>';
                        }
                        modalBody.insertBefore(message, modalBody.firstChild);

                    }, 100);

                    showToast('✅ Produit trouvé : ' + product.name);
                } else {
                    // Ouvrir quand même le modal avec le code-barres
                    window.pendingBarcode = decodedText;
                    window.pendingProductSource = 'manual';
                    document.getElementById('addFoodModal').classList.add('active');
                    document.body.style.overflow = 'hidden';
                    showToast('❌ Produit non trouvé - entre les macros manuellement');
                }
            } catch (err) {
                console.error('📷 [SCAN] Erreur:', err);
                showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Erreur lors de la recherche', 'error');
            }
        }

        async function searchProductByBarcode(barcode) {
            // Priorité 1: Chercher dans Firestore aliments_communs
            const firestoreProduct = await searchFirestoreAliments(barcode);
            if (firestoreProduct) {
                return { ...firestoreProduct, source: 'firestore' };
            }

            // Priorité 2: Chercher dans Open Food Facts
            const offProduct = await searchOpenFoodFacts(barcode);
            if (offProduct) {
                return { ...offProduct, source: 'openfoodfacts' };
            }

            return null;
        }

        async function searchFirestoreAliments(barcode) {
            // Utiliser la fonction globale exposée par le module Firebase
            if (typeof window.getAlimentFromFirestore === 'function') {
                try {
                    const data = await window.getAlimentFromFirestore(barcode);
                    if (data) {
                        // Mapper les champs Firestore (proteins/fats/fibers) vers les champs locaux (protein/fat/fiber)
                        return {
                            name: data.name,
                            calories: parseFloat(data.calories) || 0,
                            protein: parseFloat(data.proteins || data.protein) || 0,
                            carbs: parseFloat(data.carbs) || 0,
                            fat: parseFloat(data.fats || data.fat) || 0,
                            fiber: parseFloat(data.fibers || data.fiber) || 0,
                            category: data.category || 'autres',
                            barcode: barcode,
                            unit: '100g'
                        };
                    }
                    return null;
                } catch (err) {
                    console.log('Erreur Firestore:', err);
                    return null;
                }
            }
            return null;
        }

        async function searchOpenFoodFacts(barcode) {
            try {
                const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
                const data = await response.json();

                if (data.status === 1 && data.product) {
                    const p = data.product;
                    const nutriments = p.nutriments || {};

                    // Extraire le nom en français si possible
                    const name = p.product_name_fr || p.product_name || 'Produit sans nom';

                    // Extraire les valeurs nutritionnelles pour 100g
                    const calories = parseFloat(nutriments['energy-kcal_100g']) || 0;
                    const proteins = parseFloat(nutriments.proteins_100g) || 0;
                    const carbs = parseFloat(nutriments.carbohydrates_100g) || 0;
                    const fats = parseFloat(nutriments.fat_100g) || 0;
                    const fibers = parseFloat(nutriments.fiber_100g) || 0;

                    return {
                        name: name,
                        calories: calories,
                        protein: proteins,
                        carbs: carbs,
                        fat: fats,
                        fiber: fibers,
                        barcode: barcode,
                        unit: '100g'
                    };
                }
                return null;
            } catch (err) {
                console.error('Erreur Open Food Facts:', err);
                return null;
            }
        }

        function deleteCustomFood(foodName) {

            customConfirm('Supprimer cet aliment ?', `Supprimer "${foodName}" de ta base ?`, true).then(async (confirmed) => {

                if (confirmed) {

                    // Supprimer depuis Firestore (utiliser le nom comme ID)
                    const foodId = foodName.toLowerCase().replace(/[^a-z0-9]/g, '-');
                    try {
                        await deleteCustomFoodFromFirestore(foodId);
                    } catch (error) {
                        console.error('Erreur suppression custom food:', error);
                        // L'erreur a déjà été affichée
                    }

                    // Recharger depuis Firestore pour s'assurer de la cohérence
                    customFoods = await loadCustomFoodsFromFirestore();

                    // Aussi supprimer de foodDatabase (car ajouté au chargement)
                    const dbIndex = foodDatabase.findIndex(f => f.name === foodName && f.custom === true);
                    if (dbIndex !== -1) {
                        foodDatabase.splice(dbIndex, 1);
                    }

                    // Rafraîchir la liste (filterFoodDatabase reconstruit allFoods)
                    filterFoodDatabase();

                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Aliment supprimé');

                }
            });
        }

        async function filterFoodDatabase() {
            const query = document.getElementById('foodDbSearch').value.toLowerCase().trim();
            const filter = document.getElementById('foodFilter').value;
            const sortBy = document.getElementById('foodSort').value;

            // Afficher le loading spinner si une recherche est en cours
            if (query && query.length >= 2) {
                const container = document.getElementById('foodDatabase');
                if (container) {
                    container.innerHTML = `
                        <div style="text-align: center; padding: var(--space-3xl); color: var(--text-secondary);">
                            <i data-lucide="loader" class="spinner" style="width: 32px; height: 32px; margin: 0 auto;"></i>
                            <p style="margin-top: var(--space-md); font-size: 1rem; opacity: 0.8;">Recherche en cours...</p>
                        </div>
                    `;
                    updateIcons();
                }
            }

            // Utiliser foodDatabase qui contient déjà les customFoods (ajoutés par loadCustomFoods)
            // Dédupliquer en utilisant un Map par nom
            const foodMap = new Map();
            foodDatabase.forEach(food => {
                if (!foodMap.has(food.name)) {
                    foodMap.set(food.name, food);
                }
            });
            let allFoods = Array.from(foodMap.values());

            // RECHERCHE FIRESTORE (si query >= 2 caractères ou code-barres numérique)
            if (query && (query.length >= 2 || /^\d+$/.test(query))) {

                // Si c'est un code-barres numérique, recherche DIRECTE par ID de document
                if (/^\d+$/.test(query) && typeof window.getAlimentFromFirestore === 'function') {
                    try {
                        const directResult = await window.getAlimentFromFirestore(query);
                        if (directResult) {
                            const foodItem = {
                                name: directResult.name,
                                calories: parseFloat(directResult.calories) || 0,
                                protein: parseFloat(directResult.proteins || directResult.protein) || 0,
                                carbs: parseFloat(directResult.carbs) || 0,
                                fat: parseFloat(directResult.fats || directResult.fat) || 0,
                                fiber: parseFloat(directResult.fibers || directResult.fiber) || 0,
                                category: directResult.category || 'autres',
                                barcode: query,
                                unit: '100g',
                                custom: false,
                                fromFirestore: true,
                                verified: directResult.verified || false
                            };

                            if (!foodMap.has(foodItem.name)) {
                                foodMap.set(foodItem.name, foodItem);
                                allFoods = Array.from(foodMap.values());
                            }
                        } else {
                        }
                    } catch (err) {
                        console.error('❌ Erreur recherche directe code-barres:', err);
                    }
                }
                // Sinon recherche textuelle classique
                else if (typeof window.searchAlimentsCommuns === 'function') {
                    try {
                        const firestoreResults = await window.searchAlimentsCommuns(query);

                        // Convertir les résultats Firestore au format local et les ajouter
                        firestoreResults.forEach(item => {
                            const foodItem = {
                                name: item.name,
                                calories: parseFloat(item.calories) || 0,
                                protein: parseFloat(item.proteins || item.protein) || 0,
                                carbs: parseFloat(item.carbs) || 0,
                                fat: parseFloat(item.fats || item.fat) || 0,
                                fiber: parseFloat(item.fibers || item.fiber) || 0,
                                category: item.category || 'autres',
                                barcode: item.barcode || item.id,
                                unit: '100g',
                                custom: false,
                                fromFirestore: true,
                                verified: item.verified || false
                            };

                            // Ajouter uniquement si pas déjà présent (éviter doublons)
                            if (!foodMap.has(foodItem.name)) {
                                foodMap.set(foodItem.name, foodItem);
                            }
                        });

                        // Reconstruire allFoods avec les résultats Firestore
                        allFoods = Array.from(foodMap.values());
                    } catch (err) {
                        console.error('❌ Erreur recherche Firestore:', err);
                    }
                } else {
                    console.warn('⚠️ searchAlimentsCommuns non disponible (Firebase non chargé?)');
                }
            }

            // Filtrer
            let filtered = allFoods;

            if (filter === 'custom') {
                filtered = filtered.filter(f => f.custom === true);
            } else if (filter === 'verified') {
                filtered = filtered.filter(f => f.verified === true);
            }

            // Fuzzy search if query provided
            if (query) {
                filtered = fuzzySearchFoods(filtered, query, 100); // No limit, we'll sort after
            }

            // Sort
            filtered.sort((a, b) => {
                switch(sortBy) {
                    case 'name': return a.name.localeCompare(b.name);
                    case 'protein': return b.protein - a.protein;
                    case 'carbs': return b.carbs - a.carbs;
                    case 'fat': return b.fat - a.fat;
                    case 'calories': return b.calories - a.calories;
                    default: return a.name.localeCompare(b.name); // Par défaut, tri alphabétique
                }
            });

            renderFoodDatabaseWithCustom(filtered);
        }

        function renderFoodDatabaseWithCustom(foods) {
            const container = document.getElementById('foodDatabase');

            // Si pas de foods fournis, utiliser foodDatabase dédupliqué
            if (!foods || foods === foodDatabase) {
                const foodMap = new Map();
                foodDatabase.forEach(food => {
                    if (!foodMap.has(food.name)) {
                        foodMap.set(food.name, food);
                    }
                });
                foods = Array.from(foodMap.values());
            }

            // Charger les favoris
            const favorites = JSON.parse(localStorage.getItem('favoriteFoods') || '[]');

            // Séparer favoris et non-favoris
            const favoriteFoods = foods.filter(food => favorites.includes(food.name));
            const regularFoods = foods.filter(food => !favorites.includes(food.name));

            // Trier alphabétiquement
            favoriteFoods.sort((a, b) => a.name.localeCompare(b.name));
            regularFoods.sort((a, b) => a.name.localeCompare(b.name));

            let html = '';

            // Section Favoris (si il y en a)
            if (favoriteFoods.length > 0) {
                html += `
                    <div style="background: linear-gradient(135deg, rgba(255, 230, 109, 0.1) 0%, rgba(255, 230, 109, 0.05) 100%); padding: var(--space-lg); border-radius: var(--radius-md); margin-bottom: var(--space-2xl); border: 1px solid rgba(255, 230, 109, 0.2);">
                        <h3 style="font-size: 1rem; font-weight: 600; color: var(--accent-fat); margin-bottom: var(--space-lg); display: flex; align-items: center; gap: var(--space-sm);">
                            ⭐ Favoris (${favoriteFoods.length})
                        </h3>
                        ${favoriteFoods.map((food, index) => {
                            const globalIndex = foods.indexOf(food);
                            return `
                                <div class="food-item" data-food-index="${globalIndex}" style="background: rgba(0, 0, 0, 0.2);">
                                    <div>
                                        <div class="food-name">${getDisplayName(food)} ${food.verified ? '<span style="color: #10b981; font-size: 1rem; cursor: help; margin-left: 4px;" title="Aliment vérifié par un administrateur">✓</span>' : ''} ${food.custom ? '<i data-lucide="sparkles" style="width: 14px; height: 14px; display: inline; vertical-align: middle; color: var(--accent-main);"></i>' : ''}</div>
                                        ${food.custom ? '<span style="font-size: 0.85rem; color: var(--accent-ui);">Personnalisé</span>' : ''}
                                    </div>
                                    <div class="food-macros">
                                        <span><div class="label">Prot</div><div class="value" style="color: var(--accent-protein)">${food.protein}g</div></span>
                                        <span><div class="label">Glu</div><div class="value" style="color: var(--accent-carbs)">${food.carbs}g</div></span>
                                        <span><div class="label">Lip</div><div class="value" style="color: var(--accent-fat)">${food.fat}g</div></span>
                                        <span><div class="label">Cal</div><div class="value">${food.calories}</div></span>
                                    </div>
                                    <div style="display: flex; flex-direction: column; gap: var(--space-sm); align-items: flex-end;">
                                        <span style="color: var(--text-secondary); font-size: 0.9rem;">pour ${food.unit}</span>
                                        <div style="display: flex; gap: var(--space-sm); align-items: center;">
                                            <button class="icon-btn" style="background: rgba(255, 230, 109, 0.2); border: 1px solid var(--accent-fat); width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center;" onclick="toggleFavorite('${food.name.replace(/'/g, "\\'")}')"><i data-lucide="star" style="width: 16px; height: 16px; fill: var(--accent-fat); color: var(--accent-fat);"></i></button>
                                            ${food.custom ? `<button class="icon-btn" style="padding: 8px 12px; font-size: 0.85rem; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;" onclick="editFoodByIndex(${globalIndex})"><i data-lucide="pencil" style="width: 16px; height: 16px;"></i></button>` : ''}
                                            ${food.custom ? `<button class="delete-btn" style="font-size: 1.1rem; width: 36px; height: 36px;" onclick="deleteFoodByIndex(${globalIndex})"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></button>` : ''}
                                        </div></div></div>
                            `;
                        }).join('')}
                    </div>
                `;
            }

            // Section Tous les aliments
            if (regularFoods.length > 0) {
                html += regularFoods.map((food, index) => {
                    const globalIndex = foods.indexOf(food);
                    return `
                        <div class="food-item" data-food-index="${globalIndex}">
                            <div>
                                <div class="food-name">${getDisplayName(food)} ${food.verified ? '<span style="color: #10b981; font-size: 1rem; cursor: help; margin-left: 4px;" title="Aliment vérifié par un administrateur">✓</span>' : ''} ${food.custom ? '<i data-lucide="sparkles" style="width: 14px; height: 14px; display: inline; vertical-align: middle; color: var(--accent-main);"></i>' : ''}</div>
                                ${food.custom ? '<span style="font-size: 0.85rem; color: var(--accent-ui);">Personnalisé</span>' : ''}
                            </div>
                            <div class="food-macros">
                                <span><div class="label">Prot</div><div class="value" style="color: var(--accent-protein)">${food.protein}g</div></span>
                                <span><div class="label">Glu</div><div class="value" style="color: var(--accent-carbs)">${food.carbs}g</div></span>
                                <span><div class="label">Lip</div><div class="value" style="color: var(--accent-fat)">${food.fat}g</div></span>
                                <span><div class="label">Cal</div><div class="value">${food.calories}</div></span>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: var(--space-sm); align-items: flex-end;">
                                <span style="color: var(--text-secondary); font-size: 0.9rem;">pour ${food.unit}</span>
                                <div style="display: flex; gap: var(--space-sm); align-items: center;">
                                    <button class="icon-btn" style="width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center;" onclick="toggleFavorite('${food.name.replace(/'/g, "\\'")}')"><i data-lucide="star" style="width: 16px; height: 16px;"></i></button>
                                    ${food.custom ? `<button class="icon-btn" style="padding: 8px 12px; font-size: 0.85rem; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;" onclick="editFoodByIndex(${globalIndex})"><i data-lucide="pencil" style="width: 16px; height: 16px;"></i></button>` : ''}
                                    ${food.custom ? `<button class="delete-btn" style="font-size: 1.1rem; width: 36px; height: 36px;" onclick="deleteFoodByIndex(${globalIndex})"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></button>` : ''}
                                </div></div></div>
                    `;
                }).join('');
            }

            container.innerHTML = html;

            // Store current foods for access by index
            window.currentFoodList = foods;

            // Reinitialize Lucide icons for delete buttons
            updateIcons();
        }

        function toggleFavorite(foodName) {
            const index = favoriteFoods.indexOf(foodName);

            if (index > -1) {
                // Retirer des favoris
                favoriteFoods.splice(index, 1);
                showToast('<i data-lucide="x-circle" class="icon-inline"></i> Retiré des favoris');
            } else {
                // Ajouter aux favoris
                favoriteFoods.push(foodName);
                showToast('⭐ Ajouté aux favoris');
            }

            localStorage.setItem('favoriteFoods', JSON.stringify(favoriteFoods));

            // Refresh all meals to update stars
            ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType =>  { if (dailyMeals[mealType]) {
                    renderMeal(mealType); }
            });

            // Re-render food database if open
            if (typeof filterFoodDatabase === 'function')  { filterFoodDatabase(); }

            // Re-render modal search results if they exist
            if (typeof renderModalSearchResults === 'function' && currentModalSearchResults && currentModalSearchResults.length > 0) {
                renderModalSearchResults(currentModalSearchResults);
            }

            // Re-render quick add results if they exist
            if (typeof renderGlobalQuickAddResults === 'function' && currentQuickAddResults && currentQuickAddResults.length > 0) {
                renderGlobalQuickAddResults(currentQuickAddResults);
            }
        }

        function editFoodByIndex(index) {
            const food = window.currentFoodList[index];
            if (!food) {
                showToast('<i data-lucide="x-circle" class="icon-inline"></i> Aliment introuvable');
                return;
            }

            // Only allow editing custom foods
            if (!food.custom) {
                showToast('<i data-lucide="alert-triangle" class="icon-inline"></i> Tu ne peux modifier que les aliments personnalisés', 'warning');
                return;
            }

            // Pre-fill modal
            document.getElementById('new-food-name').value = food.name;
            document.getElementById('new-food-name').disabled = false; // Permettre la modification du nom
            document.getElementById('new-food-unit').value = food.unit;
            document.getElementById('new-food-protein').value = food.protein;
            document.getElementById('new-food-carbs').value = food.carbs;
            document.getElementById('new-food-fat').value = food.fat;
            document.getElementById('new-food-fiber').value = food.fiber || 0;
            document.getElementById('new-food-calories').value = food.calories;

            // Change modal title and button
            const modalTitle = document.querySelector('#addFoodModal h2');
            if (modalTitle) modalTitle.textContent = 'Modifier ' + food.name;

            const saveBtn = document.querySelector('#addFoodModal .btn[onclick="saveNewFood()"]');
            if (saveBtn) {
                saveBtn.innerHTML = '<i data-lucide="save" class="icon-inline"></i> Sauvegarder';
                saveBtn.onclick = () => updateFoodByIndex(index);
            }

            openAddFoodModal();
        }

        function updateFoodByIndex(index) {
            const food = window.currentFoodList[index];
            if (!food || !food.custom) return;

            // Get values
            const newName = document.getElementById('new-food-name').value.trim();
            const unit = document.getElementById('new-food-unit').value.trim();
            const protein = parseFloat(document.getElementById('new-food-protein').value) || 0;
            const carbs = parseFloat(document.getElementById('new-food-carbs').value) || 0;
            const fat = parseFloat(document.getElementById('new-food-fat').value) || 0;
            const fiber = parseFloat(document.getElementById('new-food-fiber').value) || 0;

            if (!newName) {
                showToast('<i data-lucide="alert-triangle" class="icon-inline"></i> Le nom est obligatoire', 'warning');
                return;
            }

            // Vérifier si le nouveau nom existe déjà (sauf si c'est le même)
            if (newName !== food.name && foodDatabase.some(f => f.name.toLowerCase() === newName.toLowerCase())) {
                showToast('<i data-lucide="alert-triangle" class="icon-inline"></i> Un aliment avec ce nom existe déjà', 'warning');
                return;
            }

            let calories = parseFloat(document.getElementById('new-food-calories').value);
            if (!calories || calories === 0) { calories = Math.round(protein * 4 + carbs * 4 + fat * 9); }

            // Update in customFoods array
            const customIndex = customFoods.findIndex(f => f.name === food.name);
            if (customIndex !== -1) {
                customFoods[customIndex] = {
                    ...customFoods[customIndex],
                    name: newName,
                    unit,
                    protein,
                    carbs,
                    fat,
                    fiber,
                    calories
                };
                localStorage.setItem('customFoods', JSON.stringify(customFoods));
            }

            // Reset modal
            document.getElementById('new-food-name').disabled = false;
            const modalTitle = document.querySelector('#addFoodModal h2');
            if (modalTitle) modalTitle.textContent = 'Ajouter un aliment Personnalisé';

            const saveBtn = document.querySelector('#addFoodModal .btn[onclick]');
            if (saveBtn) {
                saveBtn.innerHTML = '<i data-lucide="plus" class="icon-inline"></i> Ajouter à ma Base';
                // onclick déjà défini dans HTML - pas de double binding
            }

            closeAddFoodModal();
            filterFoodDatabase();
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Aliment modifié !');
        }

        function deleteFoodByIndex(index) {
            const food = window.currentFoodList[index];
            if (food) deleteCustomFood(food.name);
        }

        // ===== NAVIGATION PAR JOUR =====

        function goToToday() {
            currentMealDate = new Date();
            loadDailyMealsForCurrentDate();
            updateMealDateDisplay();
            updateDayTotals();
        }

        // Premium: Copier les repas d'hier vers la date actuelle affichée
        function copyYesterdayMeals() {
            // Utiliser la date actuellement affichée au lieu de "aujourd'hui"
            const targetDate = new Date(currentMealDate);
            const targetKey = getDateKey(targetDate);

            // Trouver la dernière journée non vide
            const allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            let sourceDate = null;
            let sourceMeals = null;

            // Chercher d'abord hier (par rapport à la date actuelle affichée)
            const yesterday = new Date(targetDate);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayKey = getDateKey(yesterday);

            // Fonction pour vérifier si un repas contient des aliments
            const hasFoods = (meal) => {
                if (!meal) return false;
                if (Array.isArray(meal)) return meal.length > 0;
                if (meal.foods && Array.isArray(meal.foods)) return meal.foods.length > 0;
                return false;
            };

            if (allMeals[yesterdayKey] && Object.values(allMeals[yesterdayKey]).some(hasFoods)) {
                sourceDate = yesterday;
                sourceMeals = allMeals[yesterdayKey];
            } else {
                // Chercher dans les 7 derniers jours (par rapport à la date cible)
                for (let i = 2; i <= 7; i++) {
                    const checkDate = new Date(targetDate);
                    checkDate.setDate(checkDate.getDate() - i);
                    const checkKey = getDateKey(checkDate);
                    if (allMeals[checkKey] && Object.values(allMeals[checkKey]).some(hasFoods)) {
                        sourceDate = checkDate;
                        sourceMeals = allMeals[checkKey];
                        break;
                    }
                }
            }

            if (!sourceMeals) {
                showToast('<i data-lucide="info" class="icon-inline"></i> Aucun repas récent à copier');
                return;
            }

            // Copier vers la date actuellement affichée
            const targetDateStr = targetDate.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'});
            customConfirm(
                'Copier les repas',
                `Copier les repas du ${sourceDate.toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'})} vers le ${targetDateStr} ?`
            ).then((confirmed) => {
                if (confirmed) {
                    allMeals[targetKey] = JSON.parse(JSON.stringify(sourceMeals));
                    localStorage.setItem('allDailyMeals', JSON.stringify(allMeals));

                    // Recharger les repas pour la date actuelle
                    loadDailyMealsForCurrentDate();
                    updateMealDateDisplay();
                    updateDayTotals();

                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Repas copiés avec succès');
                    updateIcons();
                }
            });
        }

        // Premium: Scroll vers le prochain repas vide
        function scrollToNextEmptyMeal() {
            const mealTypes = ['breakfast', 'lunch', 'snack', 'dinner'];
            const dateKey = currentMealDate.toISOString().split('T')[0];
            const allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            const dayMeals = allMeals[dateKey] || {};

            // Trouver le premier repas sans aliments
            for (const mealType of mealTypes) {
                const mealData = dayMeals[mealType];
                const foods = mealData?.foods || (Array.isArray(mealData) ? mealData : []);
                if (foods.length === 0) {
                    // Scroll vers ce repas et focus sur le quick-add
                    const quickAddInput = document.getElementById(`quick-add-${mealType}`);
                    if (quickAddInput) {
                        quickAddInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => quickAddInput.focus(), 500);
                        return;
                    }
                }
            }

            // Si tous les repas sont remplis, scroll vers le premier
            const firstInput = document.getElementById('quick-add-breakfast');
            if (firstInput) {
                firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => firstInput.focus(), 500);
            }
        }

        function changeMealDate(days) {
            currentMealDate.setDate(currentMealDate.getDate() + days);
            updateMealDateDisplay();
            loadDailyMealsForCurrentDate();
                   syncMealsToPlanning();
        }

        function updateMealDateDisplay() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const current = new Date(currentMealDate);
            current.setHours(0, 0, 0, 0);

            const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
            const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

            let dateText;
            const diff = Math.floor((current - today) / (1000 * 60 * 60 * 24));

            if (diff === 0) dateText = "Aujourd'hui";
            else if (diff === -1) dateText = "Hier";
            else if (diff === 1) dateText = "Demain";
            else dateText = days[current.getDay()] + ' ' + current.getDate() + ' ' + months[current.getMonth()];

            const dateElement = document.getElementById('meal-date-text');
            if (dateElement) { dateElement.textContent = dateText; }

            // Update header date
            const headerDate = document.getElementById('meal-header-date');
            if (headerDate) {
                headerDate.textContent = days[current.getDay()] + ' ' + current.getDate() + ' ' + months[current.getMonth()] + ' ' + current.getFullYear();
            }

            // Aussi mettre à jour le display si il existe
            const displayElement = document.getElementById('current-meal-date-display');
            if (displayElement)  { displayElement.textContent = dateText; }
        }

        function getCurrentDateKey()  { return getDateKey(currentMealDate); }

        function getDateKey(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        async function loadAllMeals() {
            // NOUVELLE APPROCHE: Ne charger que le jour actuel depuis Firestore
            // allDailyMeals sert de cache en mémoire, on ne charge plus tout au démarrage
            await loadDailyMealsForCurrentDate();
        }

        async function loadDailyMealsForCurrentDate() {
            const dateKey = getCurrentDateKey();

            // Charger depuis Firestore (avec fallback localStorage si DataService pas dispo)
            const mealData = await loadMealFromFirestore(dateKey);

            // Mettre en cache
            allDailyMeals[dateKey] = mealData;

            // Utiliser dailyMeals de l'ancien code
            dailyMeals = allDailyMeals[dateKey];

            // Charger les recettes dans les textareas et vider les anciennes
            ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType => {
                const recipeInput = document.getElementById(`${mealType}-recipe-input`);
                const recipeDiv = document.getElementById(`${mealType}-recipe`);
                const recipe = dailyMeals[mealType]?.recipe || '';

                // Mettre à jour le textarea
                if (recipeInput) {
                    recipeInput.value = recipe;
                    autoResizeTextarea(recipeInput);
                }

                // Afficher ou masquer la div de recette selon si elle existe
                if (recipeDiv) {
                    if (recipe && recipe.trim()) {
                        recipeDiv.style.display = 'block';
                    } else {
                        recipeDiv.style.display = 'none';
                    }
                }

                renderMeal(mealType);
            });
            updateDayTotals();
            syncMealsToPlanning();

            // Vérifier si la journée est clôturée
            checkIfDayClosed();
        }

        async function saveDailyMeals() {
            const dateKey = getCurrentDateKey();
            showSaveToast();

            // Mettre à jour le cache en mémoire
            allDailyMeals[dateKey] = dailyMeals;

            // Sauvegarder vers Firestore (avec fallback localStorage si DataService pas dispo)
            try {
                await saveMealToFirestore(dateKey, dailyMeals);
            } catch (error) {
                console.error('Erreur sauvegarde repas:', error);
                // L'erreur a déjà été affichée dans saveMealToFirestore via toast
            }
            // Mettre à jour le streak en temps réel
            if (typeof updateStreakDisplay === 'function') updateStreakDisplay();
            // Mettre à jour le résumé hebdomadaire si visible
            if (typeof updateWeeklySummary === 'function') updateWeeklySummary();

            // Check for recurrent meals (debounced to avoid spam)
            clearTimeout(window.recurrentCheckTimeout);
            window.recurrentCheckTimeout = setTimeout(() => {
                ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType => {
                    if (dailyMeals[mealType]?.foods?.length > 0) {
                        suggestTemplateCreation(mealType);
                    }
                });
            }, 2000);
        }

        // ===== GESTION HYDRATATION (EAU) =====
        function updateWater(delta) {
            if (typeof dailyMeals.water !== 'number') dailyMeals.water = 0;
            dailyMeals.water = Math.max(0, dailyMeals.water + delta);
            updateWaterUI();
            saveDailyMeals();
        }

        function getWaterTarget() {
            // Objectif = 30ml par kg de poids corporel (minimum 1500ml, max 4000ml)
            const weight = parseFloat(document.getElementById('weight')?.value) || 0;
            if (weight > 0) {
                return Math.min(4000, Math.max(1500, Math.round(weight * 30)));
            }
            return 2000; // Défaut si pas de poids renseigné
        }

        function updateWaterUI() {
            const count = dailyMeals.water || 0;
            const ml = count * 250;
            const target = getWaterTarget();
            const percent = Math.min(100, (ml / target) * 100);

            const countEl = document.getElementById('water-count');
            const mlEl = document.getElementById('water-ml');
            const targetEl = document.getElementById('water-target');
            const progressEl = document.getElementById('water-progress');

            if (countEl) countEl.textContent = count;
            if (mlEl) mlEl.textContent = ml;
            if (targetEl) targetEl.textContent = target;
            if (progressEl) progressEl.style.width = percent + '%';
        }

        // Wrapper les fonctions existantes
        const origUpdateQuantity = updateMealQuantity;
        updateMealQuantity = function(mealType, id, quantity)  {
            origUpdateQuantity(mealType, id, quantity);
            // saveDailyMeals() est déjà appelé dans origUpdateQuantity
        };

        const origRemoveFood = removeFoodFromMeal;
        removeFoodFromMeal = function(mealType, id) {
            origRemoveFood(mealType, id);
            // saveDailyMeals() et syncMealsToPlanning() sont déjà appelés dans origRemoveFood
        };

        // ===== QUANTITÉ DANS MODAL =====
        function selectFoodForMeal(food) {
            const quantity = parseFloat(document.getElementById('modal-quantity').value) || 100;
            food.quantity = quantity;

            dailyMeals[currentMealType].foods.push({
                ...food,
                id: Date.now(),
                quantity: quantity
            });

            renderMeal(currentMealType);
            updateDayTotals();
            saveDailyMeals();
            syncMealsToPlanning(); // Synchroniser avec le planning
            closeFoodModal();
        }

        // ===== BARRES DE PROGRESSION =====
        const origUpdateDayTotals = updateDayTotals;

        // Wrapper pour ajouter le badge
        const origUpdateForBadge = updateDayTotals;
        updateDayTotals = function() {
            origUpdateForBadge();
            setTimeout(updateCalorieBadge, 100); // Petit délai pour que le DOM soit à jour
        };

        const wrappedUpdateDayTotals = updateDayTotals;
        updateDayTotals = function()  { origUpdateDayTotals();
            updateProgressBars(); };

        function updateProgressBars() {
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{"protein":0,"carbs":0,"fat":0,"calories":0}');

            if (targets.protein > 0) {
                const pVal = parseFloat(document.getElementById('day-protein').textContent);
                const cVal = parseFloat(document.getElementById('day-carbs').textContent);
                const fVal = parseFloat(document.getElementById('day-fat').textContent);
                const calVal = parseFloat(document.getElementById('day-total').textContent);

                const pProg = Math.min((pVal / targets.protein) * 100, 100);
                const cProg = Math.min((cVal / targets.carbs) * 100, 100);
                const fProg = Math.min((fVal / targets.fat) * 100, 100);
                const calProg = targets.calories > 0 ? Math.min((calVal / targets.calories) * 100, 100) : 0;

                const pBar = document.getElementById('day-protein-bar');
                const cBar = document.getElementById('day-carbs-bar');
                const fBar = document.getElementById('day-fat-bar');
                const calBar = document.getElementById('day-cal-bar');

                pBar.style.width = pProg + '%';
                cBar.style.width = cProg + '%';
                fBar.style.width = fProg + '%';
                calBar.style.width = calProg + '%';

                // Set data-percent for mobile display
                pBar.setAttribute('data-percent', Math.round(pProg) + '%');
                cBar.setAttribute('data-percent', Math.round(cProg) + '%');
                fBar.setAttribute('data-percent', Math.round(fProg) + '%');
                calBar.setAttribute('data-percent', Math.round(calProg) + '%');

                document.getElementById('day-protein-progress').textContent = pVal.toFixed(0) + ' / ' + targets.protein + 'g';
                document.getElementById('day-carbs-progress').textContent = cVal.toFixed(0) + ' / ' + targets.carbs + 'g';
                document.getElementById('day-fat-progress').textContent = fVal.toFixed(0) + ' / ' + targets.fat + 'g';
                document.getElementById('day-cal-progress').textContent = calVal.toFixed(0) + ' / ' + (targets.calories || 0) + ' kcal';
            }
        }

        // ===== PLANNING AMÉLIORÉ =====
        const origRenderPlan = renderWeeklyPlan;
        renderWeeklyPlan = function() {
            const weekStart = new Date(currentWeekStart);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            // Format condensé sur mobile
            const isMobile = window.innerWidth <= 768;
            const startDay = weekStart.getDate();
            const endDay = weekEnd.getDate();
            const startMonth = weekStart.toLocaleDateString('fr-FR', { month: 'short' });
            const endMonth = weekEnd.toLocaleDateString('fr-FR', { month: 'short' });
            const weekText = isMobile
                ? `${startDay} ${startMonth} → ${endDay} ${endMonth}`
                : `Semaine du ${formatDate(weekStart)} au ${formatDate(weekEnd)}`;
            document.getElementById('current-week').textContent = weekText;

            const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            const weekGrid = document.getElementById('week-grid');
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            weekGrid.innerHTML = days.map((day, index) => {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + index);
                date.setHours(0, 0, 0, 0);
                const dateKey = getDateKey(date);
                // Utiliser getDayPlanFromMeals pour lire directement depuis allDailyMeals
                const dayPlan = getDayPlanFromMeals(dateKey);
                const isToday = date.getTime() === today.getTime();

                return `
                    <div class="day-card${isToday ? ' today' : ''}">
                        <div class="day-name" style="cursor: pointer; color: var(--accent-main);" onclick="goToDay(${index})" title="Cliquer pour voir les repas">${day}${isToday ? ' (Aujourd\'hui)' : ''}</div>
                        <div class="day-date">${formatDate(date)}</div>
                        <div class="day-meals">
                            <div class="day-meal-item">
                                <div class="day-meal-label"><i data-lucide="coffee" style="width: 16px; height: 16px; display: inline; vertical-align: middle; color: var(--accent-fat);"></i> Petit-déjeuner</div>
                                <div class="day-meal-foods">${dayPlan.breakfast}</div></div>
                            <div class="day-meal-item">
                                <div class="day-meal-label"><i data-lucide="utensils" style="width: 16px; height: 16px; display: inline; vertical-align: middle; color: var(--accent-carbs);"></i> Déjeuner</div>
                                <div class="day-meal-foods">${dayPlan.lunch}</div></div>
                            <div class="day-meal-item">
                                <div class="day-meal-label"><i data-lucide="apple" style="width: 16px; height: 16px; display: inline; vertical-align: middle; color: var(--accent-ui);"></i> Goûter</div>
                                <div class="day-meal-foods">${dayPlan.snack}</div></div>
                            <div class="day-meal-item">
                                <div class="day-meal-label"><i data-lucide="moon" style="width: 16px; height: 16px; display: inline; vertical-align: middle; color: var(--accent-purple);"></i> Dîner</div>
                                <div class="day-meal-foods">${dayPlan.dinner}</div></div></div>
                        <div class="day-total-cal">${dayPlan.totalCal} kcal</div></div>
                `;
            }).join('');

            // Reinitialize Lucide icons after dynamic content
            updateIcons();

            // Update weekly summary
            updateWeeklySummary();
        };

        function goToCurrentWeek() {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
            currentWeekStart = new Date(today);
            currentWeekStart.setDate(today.getDate() + mondayOffset);
            currentWeekStart.setHours(0, 0, 0, 0);
            // Sauvegarder la semaine actuelle dans localStorage
            localStorage.setItem('currentWeekStart', currentWeekStart.toISOString());
            renderWeeklyPlan();
        }

        function savePlanMeal(dateKey, mealType, text) {
            if (!weeklyPlan[dateKey]) {
                weeklyPlan[dateKey] = {};
            }
            weeklyPlan[dateKey][mealType] = text.trim() || 'Non planifié';
            localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan));
        }

        // ===== SUIVI =====
        async function loadTrackingData() {
            // Charger depuis Firestore (avec fallback localStorage)
            const data = await loadTrackingFromFirestore();
            trackingData = data;
            advancedTrackingData = data; // Sync with advancedTrackingData
            renderTrackingList();
        }

        // ===== TRACKING DATE DROPDOWNS =====
        function populateTrackingDateDropdowns() {
            const daySelect = document.getElementById('tracking-day');
            const yearSelect = document.getElementById('tracking-year');

            // Populate days (1-31)
            for (let i = 1; i <= 31; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                daySelect.appendChild(option);
            }

            // Populate years (current year - 5 to current year + 1)
            const currentYear = new Date().getFullYear();
            for (let i = currentYear - 5; i <= currentYear + 1; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                yearSelect.appendChild(option);
            }
        }

        function setTrackingDateToToday() {
            const today = new Date();
            const daySelect = document.getElementById('tracking-day');
            const monthSelect = document.getElementById('tracking-month');
            const yearSelect = document.getElementById('tracking-year');

            // S'assurer que les valeurs existent dans les dropdowns
            const day = today.getDate();
            const month = today.getMonth();
            const year = today.getFullYear();

            // Vérifier que l'option jour existe, sinon utiliser requestAnimationFrame
            if (daySelect.querySelector(`option[value="${day}"]`)) {
                daySelect.value = day;
                monthSelect.value = month;
                yearSelect.value = year;
            } else {
                // Attendre le prochain frame pour que le DOM soit prêt
                requestAnimationFrame(() => {
                    daySelect.value = day;
                    monthSelect.value = month;
                    yearSelect.value = year;
                });
            }
        }

        function getTrackingDateFromDropdowns() {
            const day = parseInt(document.getElementById('tracking-day').value);
            const month = parseInt(document.getElementById('tracking-month').value);
            const year = parseInt(document.getElementById('tracking-year').value);

            if (!day || isNaN(month) || !year) {
                return null;
            }

            // Create date in format YYYY-MM-DD
            const dateObj = new Date(year, month, day);
            const yyyy = dateObj.getFullYear();
            const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
            const dd = String(dateObj.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        }

        async function saveTracking() {
            const date = getTrackingDateFromDropdowns();
            const weight = parseFloat(document.getElementById('tracking-weight').value);
            const bodyfat = parseFloat(document.getElementById('tracking-bodyfat').value);
            const muscle = parseFloat(document.getElementById('tracking-muscle').value);
            const bone = parseFloat(document.getElementById('tracking-bone').value);
            const proteinPct = parseFloat(document.getElementById('tracking-protein-pct').value);
            const water = parseFloat(document.getElementById('tracking-water').value);
            const bodyAge = parseFloat(document.getElementById('tracking-body-age').value);
            const visceral = parseFloat(document.getElementById('tracking-visceral').value);
            const notes = document.getElementById('tracking-notes').value.trim();


            if (!date) {
                customAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Date manquante', 'Veuillez sélectionner une date.').then(() => {});
                return;
            }

            if (!weight || weight <= 0) {
                customAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Date manquante', 'Veuillez sélectionner une date.').then(() => {});
                return;
            }

            // Charger depuis localStorage
            const saved = localStorage.getItem('trackingData');
            trackingData = saved ? JSON.parse(saved) : [];


            // Supprimer ancienne entrée de cette date
            trackingData = trackingData.filter(e => e.date !== date);

            // Calculer l'IMC automatiquement si poids et taille disponibles
            let imc = null;
            const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            if (weight && profile.height) {
                const heightM = profile.height / 100;
                imc = parseFloat((weight / (heightM * heightM)).toFixed(1));
            }

            // Préparer nouvelle entrée
            const newEntry = {
                weight: weight || null,
                bodyfat: bodyfat || null,
                muscle: muscle || null,
                bone: bone || null,
                proteinPct: proteinPct || null,
                water: water || null,
                bodyAge: bodyAge || null,
                visceral: visceral || null,
                imc: imc,
                notes: notes || ''
            };

            // Sauvegarder vers Firestore (avec fallback localStorage)
            try {
                await saveTrackingToFirestore(date, newEntry);
            } catch (error) {
                console.error('Erreur sauvegarde tracking:', error);
                // L'erreur a déjà été affichée
            }

            // Recharger depuis Firestore pour mettre à jour l'array local
            trackingData = await loadTrackingFromFirestore();
            advancedTrackingData = [...trackingData]; // Sync with advancedTrackingData

            // Rafraîchir affichage
            renderTrackingList();

            // Reset form
            document.getElementById('tracking-weight').value = '';
            document.getElementById('tracking-bodyfat').value = '';
            document.getElementById('tracking-muscle').value = '';
            document.getElementById('tracking-bone').value = '';
            document.getElementById('tracking-protein-pct').value = '';
            document.getElementById('tracking-water').value = '';
            document.getElementById('tracking-body-age').value = '';
            document.getElementById('tracking-visceral').value = '';
            document.getElementById('tracking-notes').value = '';
            setTrackingDateToToday();

            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Mesure enregistrée !');
        }

        // ===== WEIGHT SYNC SYSTEM (legacy, non utilisé après migration Firestore) =====
        function getLatestWeight() {
            const saved = localStorage.getItem('trackingData');

            if (!saved) {
                return null;
            }

            const data = JSON.parse(saved);

            if (data.length === 0) {
                return null;
            }

            // Sort by date descending and find first entry with weight
            const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));

            const latestWithWeight = sorted.find(entry => entry.weight && !isNaN(entry.weight));

            if (latestWithWeight)  { return latestWithWeight.weight; } else {
                return null;
            }
        }

        // syncWeightToCalculator SUPPRIMÉ: migration Firestore-first terminée
        // Le poids vient maintenant UNIQUEMENT de Firestore (profile/current)

        function autoRecalculateMacros() {

            // Check if we have all required data to recalculate
            const weight = parseFloat(document.getElementById('weight')?.value);
            const height = parseFloat(document.getElementById('height')?.value);
            const birthDay = document.getElementById('birth-day')?.value;
            const birthMonth = document.getElementById('birth-month')?.value;
            const birthYear = document.getElementById('birth-year')?.value;
            const gender = document.getElementById('profile-gender')?.value;
            const activity = parseFloat(document.getElementById('activity')?.value);

            // Calculate age
            let age = null;
            if (birthDay && birthMonth && birthYear) {
                const today = new Date();
                const birth = new Date(parseInt(birthYear), parseInt(birthMonth), parseInt(birthDay));
                age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }
            }

            // If all data present, recalculate silently
            if (weight && height && age && gender && activity)  { try {
                    calculateMacros(true); } catch (error) {
                    console.error('<i data-lucide="x-circle" class="icon-inline"></i> Error during auto-recalculation:', error);
                }
            }
        }

       // Variables pour la pagination du tracking
        let trackingCurrentPage = 1;
        const trackingPerPage = 5;

        // Premium: Mettre à jour les tendances de suivi
        function updateTrackingTrends() {
            const saved = localStorage.getItem('trackingData');
            const data = saved ? JSON.parse(saved) : [];

            const trend14dEl = document.getElementById('trend-14d');
            const trend7dAvgEl = document.getElementById('trend-7d-avg');
            const trendLastEl = document.getElementById('trend-last');

            if (!trend14dEl || !trend7dAvgEl || !trendLastEl) return;

            if (data.length === 0) {
                trend14dEl.textContent = '—';
                trend7dAvgEl.textContent = '—';
                trendLastEl.textContent = '—';
                return;
            }

            // Trier par date (plus récent en premier)
            const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

            // Dernière mesure
            const lastWeight = sortedData[0]?.weight;
            if (lastWeight) {
                trendLastEl.textContent = `${lastWeight} kg`;
                trendLastEl.className = 'trend-value';
            } else {
                trendLastEl.textContent = '—';
            }

            // Moyenne 7 jours (les 7 dernières mesures avec poids)
            const last7WithWeight = sortedData.filter(d => d.weight).slice(0, 7);
            if (last7WithWeight.length > 0) {
                const avg = last7WithWeight.reduce((sum, d) => sum + parseFloat(d.weight), 0) / last7WithWeight.length;
                trend7dAvgEl.textContent = `${avg.toFixed(1)} kg`;
            } else {
                trend7dAvgEl.textContent = '—';
            }

            // Évolution 14 jours (différence entre la dernière et il y a ~14 jours)
            const now = new Date();
            const twoWeeksAgo = new Date(now);
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

            const recentWeight = sortedData.find(d => d.weight)?.weight;
            const oldEntries = sortedData.filter(d => d.weight && new Date(d.date) <= twoWeeksAgo);
            const oldWeight = oldEntries.length > 0 ? oldEntries[0].weight : null;

            if (recentWeight && oldWeight) {
                const diff = (parseFloat(recentWeight) - parseFloat(oldWeight)).toFixed(1);
                const sign = diff > 0 ? '+' : '';
                trend14dEl.textContent = `${sign}${diff} kg`;
                trend14dEl.className = `trend-value ${diff < 0 ? 'positive' : diff > 0 ? 'negative' : ''}`;
            } else if (recentWeight && sortedData.filter(d => d.weight).length > 1) {
                // S'il n'y a pas assez de données sur 14j, prendre la différence avec la plus ancienne
                const oldest = sortedData.filter(d => d.weight).pop();
                if (oldest) {
                    const diff = (parseFloat(recentWeight) - parseFloat(oldest.weight)).toFixed(1);
                    const sign = diff > 0 ? '+' : '';
                    trend14dEl.textContent = `${sign}${diff} kg`;
                    trend14dEl.className = `trend-value ${diff < 0 ? 'positive' : diff > 0 ? 'negative' : ''}`;
                }
            } else {
                trend14dEl.textContent = 'stable';
                trend14dEl.className = 'trend-value';
            }
        }

        function renderTrackingList() {
            const container = document.getElementById('tracking-list');

            // Utiliser les données depuis la variable globale (chargée depuis Firestore)
            const data = trackingData || [];

            // Premium: Mettre à jour les tendances
            updateTrackingTrends();

            if (data.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: var(--space-3xl); color: var(--text-secondary);">
                        <div style="font-size: 4rem; margin-bottom: var(--space-lg); opacity: 0.5;"><i data-lucide="bar-chart-2" style="width: 48px; height: 48px;"></i></div>
                        <div style="font-size: 1.2rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-sm);">Aucun suivi pour le moment</div>
                        <div style="font-size: 0.95rem; line-height: 1.6;">Enregistre ta première mesure ci-dessus pour commencer à suivre ton évolution corporelle</div></div>
                `;
                return;
            }

            // Afficher du plus récent au plus ancien
            const sortedData = data.slice().reverse();

            // Calculer la pagination
            const totalPages = Math.ceil(sortedData.length / trackingPerPage);
            if (trackingCurrentPage > totalPages) trackingCurrentPage = totalPages;
            if (trackingCurrentPage < 1) trackingCurrentPage = 1;

            const startIndex = (trackingCurrentPage - 1) * trackingPerPage;
            const endIndex = startIndex + trackingPerPage;
            const pageData = sortedData.slice(startIndex, endIndex);

            // Générer le HTML compact
            let html = '<div class="tracking-entries-list">';

            pageData.forEach((entry, index) => {
                const entryId = `tracking-entry-${startIndex + index}`;
                const dateStr = new Date(entry.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

                // Métriques principales pour le résumé
                const summaryMetrics = [];
                if (entry.weight) summaryMetrics.push(`<span>Poids:</span> <span style="color: var(--accent-protein);">${entry.weight}kg</span>`);
                if (entry.bodyfat) summaryMetrics.push(`<span>Graisse:</span> <span style="color: var(--accent-carbs);">${entry.bodyfat}%</span>`);
                if (entry.muscle) summaryMetrics.push(`<span>Muscle:</span> <span style="color: var(--accent-main);">${entry.muscle}kg</span>`);

                html += `
                    <div class="tracking-compact-entry" id="${entryId}">
                        <div class="tracking-compact-header" onclick="toggleTrackingEntry('${entryId}')">
                            <span class="tracking-compact-date">${dateStr}</span>
                            <div class="tracking-compact-summary">
                                ${summaryMetrics.map(m => `<div class="tracking-compact-metric">${m}</div>`).join('')}
                            </div>
                            <div class="tracking-compact-actions">
                                <button class="icon-btn" style="width: 32px; height: 32px; padding: 0;" onclick="event.stopPropagation(); editTracking('${entry.date}')"><i data-lucide="pencil" style="width: 14px; height: 14px;"></i></button>
                                <button class="delete-btn" style="width: 32px; height: 32px; padding: 0;" onclick="event.stopPropagation(); deleteTracking('${entry.date}')"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
                                <button class="tracking-compact-toggle" id="${entryId}-toggle"><i data-lucide="chevron-down" style="width: 16px; height: 16px;"></i></button>
                            </div>
                        </div>
                        <div class="tracking-compact-details" id="${entryId}-details">
                            <div class="tracking-compact-grid">
                                ${entry.weight ? `<div class="tracking-compact-grid-item"><span class="label">Poids</span><span class="value" style="color: var(--accent-main);">${entry.weight} kg</span></div>` : ''}
                                ${entry.bodyfat ? `<div class="tracking-compact-grid-item"><span class="label">Taux de graisse</span><span class="value" style="color: var(--accent-ui);">${entry.bodyfat}%</span></div>` : ''}
                                ${entry.muscle ? `<div class="tracking-compact-grid-item"><span class="label">Masse musculaire</span><span class="value" style="color: var(--accent-main);">${entry.muscle} kg</span></div>` : ''}
                                ${entry.bone ? `<div class="tracking-compact-grid-item"><span class="label">Masse osseuse</span><span class="value" style="color: var(--text-secondary);">${entry.bone} kg</span></div>` : ''}
                                ${entry.proteinPct ? `<div class="tracking-compact-grid-item"><span class="label">Protéines</span><span class="value" style="color: var(--accent-protein);">${entry.proteinPct}%</span></div>` : ''}
                                ${entry.water ? `<div class="tracking-compact-grid-item"><span class="label">Eau</span><span class="value" style="color: var(--accent-ui);">${entry.water}%</span></div>` : ''}
                                ${entry.visceral ? `<div class="tracking-compact-grid-item"><span class="label">Graisse viscérale</span><span class="value" style="color: var(--accent-danger);">${entry.visceral}</span></div>` : ''}
                                ${entry.bodyAge ? `<div class="tracking-compact-grid-item"><span class="label">Âge corporel</span><span class="value" style="color: var(--accent-purple);">${entry.bodyAge} ans</span></div>` : ''}
                            </div>
                            ${entry.notes ? `<div style="margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid rgba(128,128,128,0.1);"><span class="label" style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Notes</span><p style="margin: var(--space-xs) 0 0; color: var(--text-primary); font-size: 0.9rem;">${entry.notes}</p></div>` : ''}
                        </div>
                    </div>
                `;
            });

            html += '</div>';

            // Ajouter la pagination si nécessaire
            if (totalPages > 1) {
                html += `
                    <div class="tracking-pagination">
                        <button class="tracking-pagination-btn" onclick="changeTrackingPage(-1)" ${trackingCurrentPage === 1 ? 'disabled' : ''}>
                            <i data-lucide="chevron-left" style="width: 18px; height: 18px;"></i>
                        </button>
                        <span class="tracking-pagination-info">${trackingCurrentPage} / ${totalPages}</span>
                        <button class="tracking-pagination-btn" onclick="changeTrackingPage(1)" ${trackingCurrentPage === totalPages ? 'disabled' : ''}>
                            <i data-lucide="chevron-right" style="width: 18px; height: 18px;"></i>
                        </button>
                    </div>
                `;
            }

            container.innerHTML = html;

            // Initialiser les icônes Lucide pour les boutons générés dynamiquement
            updateIcons();
        }

        function toggleTrackingEntry(entryId) {
            const details = document.getElementById(`${entryId}-details`);
            const toggle = document.getElementById(`${entryId}-toggle`);

            if (details && toggle) {
                details.classList.toggle('show');
                toggle.classList.toggle('expanded');
            }
        }

        function changeTrackingPage(delta) {
            trackingCurrentPage += delta;
            renderTrackingList();
        }

        function deleteTracking(date) {
            customConfirm('Supprimer ce suivi ?', 'Cette mesure sera définitivement supprimée.', true).then(async (confirmed) => {
                if (confirmed) {
                    // Supprimer depuis Firestore (avec fallback localStorage)
                    try {
                        await deleteTrackingFromFirestore(date);
                    } catch (error) {
                        console.error('Erreur suppression tracking:', error);
                        // L'erreur a déjà été affichée
                    }

                    // Recharger depuis Firestore pour mettre à jour l'array local
                    trackingData = await loadTrackingFromFirestore();
                    advancedTrackingData = [...trackingData];

                    // Rafraîchir l'affichage
                    renderTrackingList();
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Suivi supprimé');
                } else {
                }
            }).catch(err => {
                console.error('❌ Erreur Promise:', err);
            });
        }

        function editTracking(date) {
            // Charger l'entrée depuis l'array local (déjà chargé depuis Firestore)
            const entry = trackingData.find(e => e.date === date);


            if (!entry) {
                return;
            }

            // Parse date string (YYYY-MM-DD) and set dropdowns
            const dateObj = new Date(entry.date + 'T00:00:00');
            document.getElementById('tracking-day').value = dateObj.getDate();
            document.getElementById('tracking-month').value = dateObj.getMonth();
            document.getElementById('tracking-year').value = dateObj.getFullYear();

            // Remplir le reste du formulaire
            document.getElementById('tracking-weight').value = entry.weight || '';
            document.getElementById('tracking-bodyfat').value = entry.bodyfat || '';
            document.getElementById('tracking-muscle').value = entry.muscle || '';
            document.getElementById('tracking-bone').value = entry.bone || '';
            document.getElementById('tracking-protein-pct').value = entry.proteinPct || '';
            document.getElementById('tracking-water').value = entry.water || '';
            document.getElementById('tracking-body-age').value = entry.bodyAge || '';
            document.getElementById('tracking-visceral').value = entry.visceral || '';
            document.getElementById('tracking-notes').value = entry.notes || '';

            // Scroll vers le formulaire
            document.getElementById('tracking-day').scrollIntoView({ behavior: 'smooth', block: 'start' });

            showToast('✏️ Modification - Sauvegarde pour mettre à jour');
        }

        // ===== EXPORT/IMPORT =====
        function exportData() {
            // Charger toutes les données depuis localStorage
            const customFoods = JSON.parse(localStorage.getItem('customFoods') || '[]');
            const allDailyMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            const weeklyPlan = JSON.parse(localStorage.getItem('weeklyPlan') || '[]');
            const trackingData = JSON.parse(localStorage.getItem('trackingData') || '[]');
            const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            const favoriteFoods = JSON.parse(localStorage.getItem('favoriteFoods') || '[]');

            const data = {
                version: '3.0',
                exportDate: new Date().toISOString(),
                customFoods,
                allDailyMeals,
                weeklyPlan,
                trackingData,
                profile,
                favoriteFoods,
                macroTargets: JSON.parse(localStorage.getItem('macroTargets') || '{}'),
                calcSettings: JSON.parse(localStorage.getItem('calcSettings') || '{}'),
                // Données utilisateur complètes
                username: localStorage.getItem('username') || '',
                theme: localStorage.getItem('theme') || 'dark',
                hasSeenLanding: localStorage.getItem('hasSeenLanding') || 'false',
                rgpdConsent: localStorage.getItem('rgpdConsent') || 'false',
                // Préférences
                autoSave: localStorage.getItem('autoSave') || 'true',
                confirmDelete: localStorage.getItem('confirmDelete') || 'true',
                notifications: localStorage.getItem('notifications') || 'false',
                // Onboarding et goal
                onboardingState: JSON.parse(localStorage.getItem('onboardingState') || '{}'),
                calc_goal: localStorage.getItem('calc_goal') || 'cut'
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'nutritrack-backup-' + new Date().toISOString().split('T')[0] + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Fichier téléchargé !');
        }

        function importData(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);

                    customConfirm('<i data-lucide="alert-triangle" class="icon-inline"></i> Importer les données', 'Ça remplacera tes données actuelles.\n\nContinuer ?', true).then((confirmed) => {
                        if (!confirmed) return;

                        // Import données principales
                        if (data.customFoods) localStorage.setItem('customFoods', JSON.stringify(data.customFoods));
                        if (data.allDailyMeals) localStorage.setItem('allDailyMeals', JSON.stringify(data.allDailyMeals));
                        if (data.weeklyPlan) localStorage.setItem('weeklyPlan', JSON.stringify(data.weeklyPlan));
                        if (data.trackingData) localStorage.setItem('trackingData', JSON.stringify(data.trackingData));
                        if (data.profile) localStorage.setItem('userProfile', JSON.stringify(data.profile));
                        if (data.favoriteFoods) localStorage.setItem('favoriteFoods', JSON.stringify(data.favoriteFoods));
                        if (data.macroTargets) localStorage.setItem('macroTargets', JSON.stringify(data.macroTargets));
                        if (data.calcSettings) localStorage.setItem('calcSettings', JSON.stringify(data.calcSettings));

                        // Import données utilisateur
                        if (data.username !== undefined) localStorage.setItem('username', data.username);
                        if (data.theme !== undefined) localStorage.setItem('theme', data.theme);
                        if (data.hasSeenLanding !== undefined) localStorage.setItem('hasSeenLanding', data.hasSeenLanding);
                        if (data.rgpdConsent !== undefined) localStorage.setItem('rgpdConsent', data.rgpdConsent);
                        if (data.autoSave !== undefined) localStorage.setItem('autoSave', data.autoSave);
                        if (data.confirmDelete !== undefined) localStorage.setItem('confirmDelete', data.confirmDelete);
                        if (data.notifications !== undefined) localStorage.setItem('notifications', data.notifications);

                        // Import onboarding et goal
                        if (data.onboardingState) localStorage.setItem('onboardingState', JSON.stringify(data.onboardingState));
                        if (data.calc_goal) localStorage.setItem('calc_goal', data.calc_goal);

                        showToast('<i data-lucide="check-circle" class="icon-inline"></i> Import réussi ! Rechargement...');
                        setTimeout(() => location.reload(), 1000);
                    });
                } catch (error) {
                    customAlert('<i data-lucide="x-circle" class="icon-inline"></i> Erreur', 'Fichier invalide');
                }
            };
            reader.readAsText(file);
            event.target.value = '';
        }

        // ===== ÉDITION D'ALIMENTS (TOUS) =====
        function editFood(foodName) {
            const food = foodDatabase.find(f => f.name === foodName);
            if (!food) return;

            // Pré-remplir le modal avec les données actuelles
            document.getElementById('new-food-name').value = food.name;
            document.getElementById('new-food-name').disabled = false; // Permettre la modification du nom
            document.getElementById('new-food-unit').value = food.unit;
            document.getElementById('new-food-protein').value = food.protein;
            document.getElementById('new-food-carbs').value = food.carbs;
            document.getElementById('new-food-fat').value = food.fat;
            document.getElementById('new-food-fiber').value = food.fiber || 0;
            document.getElementById('new-food-calories').value = food.calories;

            // Changer le bouton
            const modalTitle = document.querySelector('#addFoodModal .modal-title');
            modalTitle.textContent = 'Modifier ' + food.name;

            const saveBtn = document.querySelector('#addFoodModal .btn');
            saveBtn.innerHTML = '<i data-lucide="save" class="icon-inline"></i> Sauvegarder les Modifications';
            saveBtn.onclick = function() { updateFood(foodName); };

            openAddFoodModal();
        }

        function updateFood(originalName) {
            const food = foodDatabase.find(f => f.name === originalName);
            if (!food) return;

            const newName = document.getElementById('new-food-name').value.trim();

            if (!newName) {
                showToast('<i data-lucide="alert-triangle" class="icon-inline"></i> Le nom est obligatoire', 'warning');
                return;
            }

            // Vérifier si le nouveau nom existe déjà (sauf si c'est le même)
            if (newName !== originalName && foodDatabase.some(f => f.name.toLowerCase() === newName.toLowerCase())) {
                showToast('<i data-lucide="alert-triangle" class="icon-inline"></i> Un aliment avec ce nom existe déjà', 'warning');
                return;
            }

            food.name = newName;
            food.unit = document.getElementById('new-food-unit').value.trim();
            food.protein = parseFloat(document.getElementById('new-food-protein').value) || 0;
            food.carbs = parseFloat(document.getElementById('new-food-carbs').value) || 0;
            food.fat = parseFloat(document.getElementById('new-food-fat').value) || 0;
            food.fiber = parseFloat(document.getElementById('new-food-fiber').value) || 0;

            let calories = parseFloat(document.getElementById('new-food-calories').value);
            if (!calories || calories === 0) { calories = Math.round(food.protein * 4 + food.carbs * 4 + food.fat * 9); }
            food.calories = calories;

            // Si c'était un aliment custom, update le localStorage
            if (food.custom) {
                const customIndex = customFoods.findIndex(f => f.name === originalName);
                if (customIndex !== -1) {
                    customFoods[customIndex] = food;
                    localStorage.setItem('customFoods', JSON.stringify(customFoods));
                }
            }

            // Reset modal
            document.getElementById('new-food-name').disabled = false;
            document.querySelector('#addFoodModal .modal-title').textContent = 'Ajouter un aliment Personnalisé';
            const saveBtn = document.querySelector('#addFoodModal .btn');
            saveBtn.innerHTML = '<i data-lucide="plus" class="icon-inline"></i> Ajouter à ma Base';
            // onclick déjà défini dans HTML - pas de double binding

            closeAddFoodModal();
            filterFoodDatabase();
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> ' + newName + ' modifié !');
        }

        // ===== REPAS TYPES =====
        let mealTemplates = [];

        async function loadMealTemplates() {
            // Charger depuis Firestore (avec fallback localStorage)
            const templates = await loadMealTemplatesFromFirestore();
            mealTemplates = templates;
        }

        function saveMealAsTemplate(mealType) {
            const dateKey = getCurrentDateKey();
            const meal = allDailyMeals[dateKey] ? allDailyMeals[dateKey][mealType] : null;
            const foods = meal ? (meal.foods || meal) : [];
            const recipe = meal ? (meal.recipe || '') : '';

            if (foods.length === 0) {
                customAlert('<i data-lucide="x-circle" class="icon-inline"></i> Repas vide', 'Ce repas est vide, ajoute des aliments d\'abord');
                return;
            }

            customPrompt('Nom du repas type', '(ex: "Déjeuner de travail", "Petit-déj protéiné")', '').then(async (templateName) => {
                if (!templateName || !templateName.trim()) return;

                const template = {
                    id: Date.now(),
                    name: templateName.trim(),
                    foods: JSON.parse(JSON.stringify(foods)), // Copie profonde
                    recipe: recipe, // Sauvegarder la recette avec le template
                    createdAt: new Date().toISOString()
                };

                // Sauvegarder vers Firestore (utiliser le nom comme ID)
                const templateId = template.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                try {
                    await saveMealTemplateToFirestore(templateId, template);
                } catch (error) {
                    console.error('Erreur sauvegarde meal template:', error);
                    // L'erreur a déjà été affichée
                }

                // Recharger depuis Firestore pour s'assurer de la cohérence
                mealTemplates = await loadMealTemplatesFromFirestore();

                showToast('<i data-lucide="check-circle" class="icon-inline"></i> Repas type "' + templateName + '" sauvegardé !');
            });
        }

        function openMealTemplatesModal(mealType) {
            if (mealTemplates.length === 0) {
                customAlert('<i data-lucide="x-circle" class="icon-inline"></i> Aucun repas type', 'Aucun repas type sauvegardé.\n\nAjoute des aliments à un repas puis clique sur "<i data-lucide="save" class="icon-inline"></i> Sauvegarder"');
                return;
            }

            // Créer un modal temporaire pour choisir
            const modalHtml = `
                <div id="templatesModal" class="modal active" data-meal-type="${mealType}">
                    <div class="modal-content">
                        <button class="modal-close" onclick="closeTemplatesModal()">×</button>
                        <h2 class="modal-title">Choisir un Repas Type</h2>
                        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                            ${mealTemplates.map(t => {
                                const totalCal = t.foods.reduce((sum, f) => sum + (f.calories * f.quantity / 100), 0);
                                const totalP = t.foods.reduce((sum, f) => sum + (f.protein * f.quantity / 100), 0);
                                const totalG = t.foods.reduce((sum, f) => sum + (f.carbs * f.quantity / 100), 0);
                                const totalL = t.foods.reduce((sum, f) => sum + (f.fat * f.quantity / 100), 0);
                                return `
                                    <div class="card" style="padding: 15px;">
                                        <div style="display: flex; justify-content: space-between; align-items: start; cursor: pointer;" onclick="applyMealTemplate(${t.id}, '${mealType}')">
                                            <div style="flex: 1;">
                                                <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 5px;">${t.name}</div>
                                                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">
                                                    P: ${Math.round(totalP)}g • g: ${Math.round(totalG)}g • L: ${Math.round(totalL)}g • ${Math.round(totalCal)} kcal
                                                </div></div>
                                            <button class="delete-btn" onclick="event.stopPropagation(); deleteMealTemplate(${t.id})" style="width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center;"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i></button>
                                        </div>
                                        ${t.recipe ? `
                                            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1);">
                                                <button onclick="event.stopPropagation(); toggleRecipe('recipe-${t.id}')"
                                                        style="background: none; border: none; color: var(--accent-carbs); font-size: 0.9rem; cursor: pointer; padding: 4px 0; font-weight: 600;">
                                                    <i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Voir la recette ▼
                                                </button>
                                                <div id="recipe-${t.id}" style="display: none; margin-top: 8px; padding: var(--space-md); background: var(--bg-tertiary); border-radius: var(--radius-sm); border-left: 3px solid var(--accent-carbs); font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap;">${t.recipe}</div></div>
                                        ` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div></div></div>
            `;

            // Insérer dans le DOM
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = modalHtml;
            document.body.appendChild(tempDiv.firstElementChild);
        }

        function closeTemplatesModal() {
            const modal = document.getElementById('templatesModal');
            if (modal) modal.remove();
        }

        function toggleRecipe(recipeId) {
            const recipeDiv = document.getElementById(recipeId);
            const btn = event.target;
            if (recipeDiv.style.display === 'none') {
                recipeDiv.style.display = 'block';
                btn.innerHTML = '<i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Masquer la recette ▲';
            } else {
                recipeDiv.style.display = 'none';
                btn.innerHTML = '<i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Voir la recette ▼';
            }
            updateIcons();
        }

        function toggleRecipeList(recipeId) {
            const recipeDiv = document.getElementById(recipeId);
            const arrow = document.getElementById('arrow-' + recipeId);
            if (recipeDiv.style.display === 'none') {
                recipeDiv.style.display = 'block';
                arrow.textContent = '▲';
            } else  { recipeDiv.style.display = 'none';
                arrow.textContent = '▼'; }
        }

        function toggleTemplateDetails(detailsId) {
            const detailsDiv = document.getElementById(detailsId);
            const arrow = document.getElementById('arrow-' + detailsId);
            const btn = event.target.closest('button');
            if (detailsDiv.style.display === 'none') {
                detailsDiv.style.display = 'block';
                arrow.textContent = '▲';
                btn.querySelector('span:first-child').textContent = 'Masquer les détails';
            } else {
                detailsDiv.style.display = 'none';
                arrow.textContent = '▼';
                btn.querySelector('span:first-child').textContent = 'Voir les détails';
            }
        }

        function applyMealTemplate(templateId, mealType) {
            const template = mealTemplates.find(t => t.id === templateId);
            if (!template) return;

            const dateKey = getCurrentDateKey();
            if (!allDailyMeals[dateKey]) {
                allDailyMeals[dateKey] = {
                    breakfast: { foods: [], recipe: '' },
                    lunch: { foods: [], recipe: '' },
                    snack: { foods: [], recipe: '' },
                    dinner: { foods: [], recipe: '' }
                };
            }

            // REMPLACER les aliments existants (ne pas ajouter)
            if (!allDailyMeals[dateKey][mealType]) {
                allDailyMeals[dateKey][mealType] = { foods: [], recipe: '' };
            }
            allDailyMeals[dateKey][mealType].foods = [];

            // Copier les aliments avec nouveaux IDs
            template.foods.forEach(food => {
                allDailyMeals[dateKey][mealType].foods.push({
                    ...food,
                    id: Date.now() + Math.random() // ID unique
                });
            });

            // Charger aussi la recette si elle existe
            if (template.recipe) {
                allDailyMeals[dateKey][mealType].recipe = template.recipe;
                // Mettre à jour le textarea de recette
                const recipeInput = document.getElementById(`${mealType}-recipe-input`);
                if (recipeInput) {
                    recipeInput.value = template.recipe;
                    autoResizeTextarea(recipeInput);
                }
            }

            dailyMeals = allDailyMeals[dateKey];
            renderMeal(mealType);
            updateDayTotals();
            saveDailyMeals();

            syncMealsToPlanning();
            closeTemplatesModal();
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Repas type "' + template.name + '" chargé');
        }

        async function deleteMealTemplate(templateId) {
            const template = mealTemplates.find(t => t.id === templateId);
            if (!template) return;

            const confirmed = await customConfirm('Supprimer "' + template.name + '" ?', 'Ce modèle sera définitivement supprimé.', true);
            if (!confirmed) return;

            // Supprimer depuis Firestore (utiliser le nom comme ID)
            const templateIdSlug = template.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
            try {
                await deleteMealTemplateFromFirestore(templateIdSlug);
            } catch (error) {
                console.error('Erreur suppression meal template:', error);
                // L'erreur a déjà été affichée
            }

            // Recharger depuis Firestore pour s'assurer de la cohérence
            mealTemplates = await loadMealTemplatesFromFirestore();

            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Repas type supprimé');

            // Refresh modal content without closing
            const modal = document.getElementById('templatesModal');
            if (modal) {
                const mealType = modal.dataset.mealType;
                closeTemplatesModal();
                if (mealTemplates.length > 0) {
                    openMealTemplatesModal(mealType);
                }
            }

            // If we're on meal-templates tab, refresh the list
            if (document.getElementById('meal-templates').classList.contains('active'))  { renderMealTemplatesList(); }
        }

        // ===== SMART MEAL TEMPLATES (INTELLIGENT GENERATION) =====

        // Default templates (fallback if Firestore unavailable)
        const defaultSmartMealTemplates = {
            // LUNCH TEMPLATES
            lunch: {
                mealType: 'lunch',
                variant: 'standard',
                displayName: 'Déjeuner standard',
                targetPercentOfDay: 0.30, // 30% of daily budget
                macroSplit: {
                    proteins: 0.40, // 40% of meal calories from protein
                    carbs: 0.35,    // 35% from carbs
                    fats: 0.25      // 25% from fats
                },
                foods: [
                    { foodName: 'Poulet rôti', role: 'protein', min: 100, max: 300, priority: 1 },
                    { foodName: 'Riz blanc cuit', role: 'carb', min: 80, max: 300, priority: 2 },
                    { foodName: 'Huile d\'olive', role: 'fat', min: 5, max: 15, priority: 3 },
                    { foodName: 'Haricots verts', role: 'fiber', min: 100, max: 250, priority: 4 }
                ],
                recipe: 'Faire cuire le riz dans de l\'eau bouillante salée pendant 15-20 minutes.\n\nFaire revenir le poulet à la poêle avec un peu d\'huile d\'olive jusqu\'à ce qu\'il soit bien doré.\n\nCuire les haricots verts à la vapeur pendant 10 minutes.\n\nServir le poulet sur le riz, accompagné des haricots verts. Arroser d\'un filet d\'huile d\'olive.'
            },
            lunchLowCarb: {
                mealType: 'lunch',
                variant: 'lowCarb',
                displayName: 'Déjeuner low-carb',
                targetPercentOfDay: 0.30,
                macroSplit: {
                    proteins: 0.45,
                    carbs: 0.15,
                    fats: 0.40
                },
                foods: [
                    { foodName: 'Poulet rôti', role: 'protein', min: 150, max: 350, priority: 1 },
                    { foodName: 'Avocat', role: 'fat', min: 50, max: 150, priority: 2 },
                    { foodName: 'Huile d\'olive', role: 'fat', min: 5, max: 12, priority: 3 },
                    { foodName: 'Haricots verts', role: 'fiber', min: 150, max: 300, priority: 4 }
                ],
                recipe: 'Faire cuire le poulet à la poêle avec un peu d\'huile d\'olive jusqu\'à ce qu\'il soit bien doré et cuit à cœur.\n\nCuire les haricots verts à la vapeur pendant 10 minutes.\n\nCouper l\'avocat en tranches.\n\nServir le poulet avec les haricots verts et l\'avocat. Assaisonner avec l\'huile d\'olive, sel et poivre.'
            },

            // BREAKFAST TEMPLATE
            breakfast: {
                mealType: 'breakfast',
                variant: 'standard',
                displayName: 'Petit-déjeuner standard',
                targetPercentOfDay: 0.25,
                macroSplit: {
                    proteins: 0.30,
                    carbs: 0.50,
                    fats: 0.20
                },
                foods: [
                    { foodName: 'Fromage blanc 0%', role: 'protein', min: 100, max: 300, priority: 1 },
                    { foodName: 'Flocons d\'avoine', role: 'carb', min: 40, max: 100, priority: 2 },
                    { foodName: 'Banane', role: 'carb', min: 80, max: 150, priority: 3 },
                    { foodName: 'Miel', role: 'carb', min: 5, max: 20, priority: 4 },
                    { foodName: 'Amandes', role: 'fat', min: 10, max: 30, priority: 5 }
                ],
                recipe: 'Couper la banane en rondelles.\n\nDans un bol, mélanger le fromage blanc avec les flocons d\'avoine.\n\nAjouter les rondelles de banane et les amandes concassées.\n\nArroser de miel et bien mélanger.\n\nLaisser reposer 5 minutes pour que l\'avoine s\'hydrate. Déguster !'
            },

            // SNACK TEMPLATE
            snack: {
                mealType: 'snack',
                variant: 'standard',
                displayName: 'Goûter standard',
                targetPercentOfDay: 0.15,
                macroSplit: {
                    proteins: 0.35,
                    carbs: 0.45,
                    fats: 0.20
                },
                foods: [
                    { foodName: 'Yaourt grec', role: 'protein', min: 100, max: 250, priority: 1 },
                    { foodName: 'Pomme', role: 'carb', min: 100, max: 200, priority: 2 },
                    { foodName: 'Amandes', role: 'fat', min: 10, max: 30, priority: 3 }
                ],
                recipe: 'Laver et couper la pomme en morceaux.\n\nDans un bol, verser le yaourt grec.\n\nAjouter les morceaux de pomme et les amandes entières ou concassées.\n\nMélanger et déguster immédiatement.'
            },

            // DINNER TEMPLATE
            dinner: {
                mealType: 'dinner',
                variant: 'standard',
                displayName: 'Dîner standard',
                targetPercentOfDay: 0.30,
                macroSplit: {
                    proteins: 0.40,
                    carbs: 0.35,
                    fats: 0.25
                },
                foods: [
                    { foodName: 'Saumon frais', role: 'protein', min: 120, max: 250, priority: 1 },
                    { foodName: 'Pomme de terre', role: 'carb', min: 150, max: 350, priority: 2 },
                    { foodName: 'Brocoli', role: 'fiber', min: 120, max: 250, priority: 3 },
                    { foodName: 'Huile d\'olive', role: 'fat', min: 5, max: 15, priority: 4 }
                ],
                recipe: 'Préchauffer le four à 180°C.\n\nLaver les pommes de terre et les couper en quartiers. Les disposer sur une plaque et arroser d\'un peu d\'huile d\'olive. Enfourner pour 30-35 minutes.\n\nCuire le brocoli à la vapeur pendant 10 minutes.\n\nFaire cuire le saumon à la poêle avec un peu d\'huile d\'olive, 4-5 minutes de chaque côté.\n\nServir le saumon avec les pommes de terre rôties et le brocoli. Assaisonner avec sel, poivre et un filet d\'huile d\'olive.'
            }
        };

        // Initialize smartMealTemplates with defaults (will be replaced by Firestore data at login)
        let smartMealTemplates = defaultSmartMealTemplates;
        window.smartMealTemplates = smartMealTemplates;

        // OLD FUNCTION - NO LONGER USED (replaced by loadSmartMealTemplatesFromFirestore in index.html)
        // Kept for reference only
        async function loadSmartMealTemplates_OLD() {
            try {
                // Try to load from Firestore
                if (typeof firebase !== 'undefined' && firebase.firestore) {
                    const db = firebase.firestore();
                    const templatesSnap = await db.collection('smartTemplates')
                        .where('active', '==', true)
                        .get();

                    const firestoreTemplates = {};
                    templatesSnap.forEach(doc => {
                        const data = doc.data();
                        firestoreTemplates[doc.id] = data;
                    });

                    // If we got templates from Firestore, use them
                    if (Object.keys(firestoreTemplates).length > 0) {
                        smartMealTemplates = firestoreTemplates;
                        // Cache in localStorage for offline use
                        localStorage.setItem('smartTemplatesCache', JSON.stringify(firestoreTemplates));
                        console.log(`✅ Loaded ${Object.keys(firestoreTemplates).length} smart templates from Firestore`);
                        return;
                    }
                }
            } catch (error) {
                console.warn('⚠️ Could not load smart templates from Firestore:', error.message);
            }

            // Fallback 1: Try to load from cache
            try {
                const cached = localStorage.getItem('smartTemplatesCache');
                if (cached) {
                    smartMealTemplates = JSON.parse(cached);
                    console.log('📦 Loaded smart templates from cache');
                    return;
                }
            } catch (error) {
                console.warn('⚠️ Could not load smart templates from cache:', error.message);
            }

            // Fallback 2: Use default templates
            smartMealTemplates = defaultSmartMealTemplates;
            console.log('🔄 Using default smart templates (hardcoded)');
        }

        // OLD - Initialize templates on page load
        // NO LONGER USED - Templates are now loaded in index.html via loadSmartMealTemplatesFromFirestore() at login
        // if (typeof document !== 'undefined') {
        //     document.addEventListener('DOMContentLoaded', () => {
        //         loadSmartMealTemplates().catch(err => {
        //             console.error('Failed to load smart templates:', err);
        //             smartMealTemplates = defaultSmartMealTemplates;
        //         });
        //     });
        // }

        // Smart rounding function - returns human-friendly quantities
        function smartRound(value) {
            if (value < 50) {
                return Math.round(value / 5) * 5; // Round to 5g for small quantities
            } else if (value <= 200) {
                return Math.round(value / 10) * 10; // Round to 10g for medium quantities
            } else {
                return Math.round(value / 20) * 20; // Round to 20g for large quantities
            }
        }

        // Clamp value between min and max
        function clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }

        // Get remaining macros for the day and context
        function getRemainingMacrosWithContext() {
            const targets = JSON.parse(localStorage.getItem('macroTargets') || '{}');
            const dateKey = getCurrentDateKey();
            const dayMeals = allDailyMeals[dateKey] || {};
            const consumed = calculateDayTotals(dayMeals);

            // Count existing meals
            const mealsCount = ['breakfast', 'lunch', 'snack', 'dinner'].filter(mealType => {
                const meal = dayMeals[mealType];
                return meal && meal.foods && meal.foods.length > 0;
            }).length;

            const hasExistingMeals = mealsCount > 0;
            const remainingMealsCount = 4 - mealsCount; // Assume 4 meals total

            const remaining = {
                calories: Math.max(0, (targets.calories || 0) - consumed.calories),
                protein: Math.max(0, (targets.protein || 0) - consumed.protein),
                carbs: Math.max(0, (targets.carbs || 0) - consumed.carbs),
                fat: Math.max(0, (targets.fat || 0) - consumed.fat),
                hasTargets: !!(targets.calories && targets.protein && targets.carbs && targets.fat)
            };

            return {
                targets,
                remaining,
                consumed,
                hasExistingMeals,
                remainingMealsCount: Math.max(1, remainingMealsCount)
            };
        }

        // Generate smart meal with specific template (NEW - used when user selects template)
        function generateSmartMealWithTemplate(mealType, templateConfig) {
            const context = getRemainingMacrosWithContext();

            if (!context.remaining.hasTargets) {
                return {
                    success: false,
                    error: 'Aucun objectif macro défini',
                    message: 'Va dans l\'onglet Calculateur pour définir tes objectifs avant de générer un repas conseillé.'
                };
            }

            if (!templateConfig) {
                return {
                    success: false,
                    error: 'Template non disponible',
                    message: 'Ce template n\'existe pas.'
                };
            }

            // Calculate meal targets
            let mealTargets;
            if (context.hasExistingMeals) {
                // Renormalize: distribute remaining macros across remaining meals
                const percentForThisMeal = 1 / context.remainingMealsCount;
                mealTargets = {
                    protein: context.remaining.protein * percentForThisMeal,
                    carbs: context.remaining.carbs * percentForThisMeal,
                    fat: context.remaining.fat * percentForThisMeal
                };
            } else {
                // Use fixed percentage of daily targets
                mealTargets = {
                    protein: context.targets.protein * templateConfig.targetPercentOfDay,
                    carbs: context.targets.carbs * templateConfig.targetPercentOfDay,
                    fat: context.targets.fat * templateConfig.targetPercentOfDay
                };
            }

            // Calculate target calories from macros
            const targetCalories = (mealTargets.protein * 4) + (mealTargets.carbs * 4) + (mealTargets.fat * 9);

            // Find foods in database
            const foodDb = window.foodDatabase || [];
            const generatedFoods = [];

            // Step 1: Calculate protein source quantity (highest priority)
            const proteinFood = templateConfig.foods.find(f => f.role === 'protein');
            if (proteinFood) {
                const dbFood = foodDb.find(f => f.name === proteinFood.foodName);
                if (dbFood) {
                    // DEBUG: Log verified status from foodDatabase
                    console.log(`[generateSmartMeal] ${dbFood.name}: verified = ${dbFood.verified}, fromFirestore = ${dbFood.fromFirestore}`);

                    // Target: provide ~70% of protein needs from main protein source
                    let quantity = (mealTargets.protein * 0.7 / dbFood.protein) * 100;
                    quantity = smartRound(quantity);
                    quantity = clamp(quantity, proteinFood.min, proteinFood.max);

                    generatedFoods.push({
                        ...dbFood,
                        quantity: quantity,
                        role: 'protein',
                        id: Date.now() + Math.random()
                    });
                }
            }

            // Calculate macros from protein source
            let providedMacros = { protein: 0, carbs: 0, fat: 0, calories: 0 };
            generatedFoods.forEach(food => {
                providedMacros.protein += (food.protein * food.quantity / 100);
                providedMacros.carbs += (food.carbs * food.quantity / 100);
                providedMacros.fat += (food.fat * food.quantity / 100);
                providedMacros.calories += (food.calories * food.quantity / 100);
            });

            // Step 2: Calculate carb source quantity (if not low-carb)
            const carbFood = templateConfig.foods.find(f => f.role === 'carb');
            if (carbFood) {
                const dbFood = foodDb.find(f => f.name === carbFood.foodName);
                if (dbFood) {
                    // Remaining carbs needed
                    const remainingCarbs = Math.max(0, mealTargets.carbs - providedMacros.carbs);
                    let quantity = (remainingCarbs / dbFood.carbs) * 100;
                    quantity = smartRound(quantity);
                    quantity = clamp(quantity, carbFood.min, carbFood.max);

                    generatedFoods.push({
                        ...dbFood,
                        quantity: quantity,
                        role: 'carb',
                        id: Date.now() + Math.random()
                    });

                    // Update provided macros
                    providedMacros.protein += (dbFood.protein * quantity / 100);
                    providedMacros.carbs += (dbFood.carbs * quantity / 100);
                    providedMacros.fat += (dbFood.fat * quantity / 100);
                    providedMacros.calories += (dbFood.calories * quantity / 100);
                }
            }

            // Step 3: Add vegetables (fixed portion)
            const fiberFood = templateConfig.foods.find(f => f.role === 'fiber');
            if (fiberFood) {
                const dbFood = foodDb.find(f => f.name === fiberFood.foodName);
                if (dbFood) {
                    let quantity = 150; // Standard portion
                    quantity = smartRound(quantity);
                    quantity = clamp(quantity, fiberFood.min, fiberFood.max);

                    generatedFoods.push({
                        ...dbFood,
                        quantity: quantity,
                        role: 'fiber',
                        id: Date.now() + Math.random()
                    });

                    // Update provided macros
                    providedMacros.protein += (dbFood.protein * quantity / 100);
                    providedMacros.carbs += (dbFood.carbs * quantity / 100);
                    providedMacros.fat += (dbFood.fat * quantity / 100);
                    providedMacros.calories += (dbFood.calories * quantity / 100);
                }
            }

            // Step 4: Calculate fat source quantity (oil) to reach target
            const fatFood = templateConfig.foods.find(f => f.role === 'fat');
            if (fatFood) {
                const dbFood = foodDb.find(f => f.name === fatFood.foodName);
                if (dbFood) {
                    // Remaining fat needed
                    const remainingFat = Math.max(0, mealTargets.fat - providedMacros.fat);
                    let quantity = (remainingFat / dbFood.fat) * 100;
                    quantity = smartRound(quantity);
                    quantity = clamp(quantity, fatFood.min, fatFood.max);

                    generatedFoods.push({
                        ...dbFood,
                        quantity: quantity,
                        role: 'fat',
                        id: Date.now() + Math.random()
                    });
                }
            }

            // Final calculation of actual macros
            let actualMacros = { calories: 0, protein: 0, carbs: 0, fat: 0 };
            generatedFoods.forEach(food => {
                actualMacros.calories += (food.calories * food.quantity / 100);
                actualMacros.protein += (food.protein * food.quantity / 100);
                actualMacros.carbs += (food.carbs * food.quantity / 100);
                actualMacros.fat += (food.fat * food.quantity / 100);
            });

            return {
                success: true,
                foods: generatedFoods,
                macros: actualMacros,
                mealType: templateConfig.mealType,
                templateName: templateConfig.displayName,
                variant: templateConfig.variant || '',
                isLowCarb: templateConfig.variant === 'lowCarb',
                recipe: templateConfig.recipe || ''
            };
        }

        // Open smart meal modal
        window.openSmartMealModal = function(mealType) {
            const context = getRemainingMacrosWithContext();

            if (!context.remaining.hasTargets) {
                customAlert('<i data-lucide="alert-circle" class="icon-inline"></i> Aucun objectif macro défini', 'Va dans l\'onglet Calculateur pour définir tes objectifs avant de générer un repas conseillé.');
                return;
            }

            // Find all templates that match the meal type
            const matchingTemplates = Object.values(smartMealTemplates).filter(t => t.mealType === mealType);

            if (matchingTemplates.length === 0) {
                customAlert('<i data-lucide="alert-circle" class="icon-inline"></i> Template non disponible', 'Aucun repas conseillé disponible pour ce type de repas.');
                return;
            }

            // If multiple templates, show selection modal
            if (matchingTemplates.length > 1) {
                showTemplateSelectionModal(mealType, matchingTemplates);
            } else {
                // Generate and show directly
                showGeneratedMealModal(mealType, matchingTemplates[0]);
            }
        };

        // Show template selection modal
        function showTemplateSelectionModal(mealType, templates) {
            const variantIcons = {
                'vegan': '<i data-lucide="leaf" style="width: 16px; height: 16px;"></i>',
                'glutenFree': '<i data-lucide="wheat-off" style="width: 16px; height: 16px;"></i>',
                'vegetarian': '<i data-lucide="salad" style="width: 16px; height: 16px;"></i>',
                'lowCarb': '<i data-lucide="trending-down" style="width: 16px; height: 16px;"></i>'
            };

            const templatesHtml = templates.map((template, index) => {
                const icon = template.variant && variantIcons[template.variant] ? variantIcons[template.variant] : '';
                return `
                    <button onclick="selectTemplateAndGenerate('${mealType}', ${index})"
                            style="width: 100%; padding: var(--space-lg); background: var(--bg-tertiary); border: 2px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s; text-align: left; display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-md);"
                            onmouseover="this.style.borderColor='var(--accent-main)'; this.style.background='var(--bg-secondary)';"
                            onmouseout="this.style.borderColor='var(--border-color)'; this.style.background='var(--bg-tertiary)';">
                        <div style="flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: var(--accent-main); display: flex; align-items: center; justify-content: center; color: white;">
                            ${icon || '<i data-lucide="utensils" style="width: 20px; height: 20px;"></i>'}
                        </div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; font-size: 1rem; margin-bottom: 4px;">${template.displayName}</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">${template.variant || 'Standard'}</div>
                        </div>
                        <i data-lucide="chevron-right" style="width: 20px; height: 20px; color: var(--text-secondary);"></i>
                    </button>
                `;
            }).join('');

            const modalHtml = `
                <div id="templateSelectionModal" class="modal active">
                    <div class="modal-content" style="max-width: 500px;">
                        <div class="modal-header">
                            <h2 class="modal-title">Choisis ton repas conseillé</h2>
                            <p style="color: var(--text-secondary); font-size: 0.9rem; margin: var(--space-xs) 0 0 0;">
                                ${templates.length} options disponibles
                            </p>
                            <button class="modal-close" onclick="closeTemplateSelectionModal()">×</button>
                        </div>
                        <div class="modal-body">
                            ${templatesHtml}
                        </div>
                    </div>
                </div>
            `;

            const existing = document.getElementById('templateSelectionModal');
            if (existing) existing.remove();

            document.body.insertAdjacentHTML('beforeend', modalHtml);
            document.body.style.overflow = 'hidden';

            updateIcons();

            // Store templates for selection
            window.currentTemplateChoices = templates;
        }

        window.closeTemplateSelectionModal = function() {
            const modal = document.getElementById('templateSelectionModal');
            if (modal) modal.remove();
            document.body.style.overflow = '';
            window.currentTemplateChoices = null;
        };

        window.selectTemplateAndGenerate = function(mealType, templateIndex) {
            if (!window.currentTemplateChoices) return;
            const template = window.currentTemplateChoices[templateIndex];
            closeTemplateSelectionModal();
            showGeneratedMealModal(mealType, template);
        };

        // Show generated meal modal (refactored from openSmartMealModal)
        function showGeneratedMealModal(mealType, templateConfig) {
            // Generate the meal with specific template
            const result = generateSmartMealWithTemplate(mealType, templateConfig);

            if (!result.success) {
                customAlert('<i data-lucide="alert-circle" class="icon-inline"></i> ' + result.error, result.message);
                return;
            }

            // Show info message if low-carb was auto-selected
            const lowCarbNotice = result.isLowCarb ?
                `<div style="background: rgba(255, 193, 7, 0.1); border-left: 3px solid #ffc107; padding: var(--space-md); border-radius: var(--radius-sm); margin-bottom: var(--space-lg);">
                    <div style="display: flex; gap: var(--space-sm); align-items: start;">
                        <i data-lucide="info" style="width: 18px; height: 18px; color: #ffc107; flex-shrink: 0; margin-top: 2px;"></i>
                        <p style="margin: 0; color: var(--text-primary); font-size: 0.9rem; line-height: 1.5;">
                            <strong>Version low-carb sélectionnée automatiquement</strong><br>
                            Il te reste moins de 30g de glucides aujourd'hui, j'ai donc adapté le repas en conséquence.
                        </p>
                    </div>
                </div>` : '';

            // Generate variant badge if applicable
            const variantBadges = {
                'vegan': '<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; background: rgba(34, 197, 94, 0.15); color: #22c55e; border-radius: 12px; font-size: 0.75rem; font-weight: 600; margin-left: 8px;"><i data-lucide="leaf" style="width: 14px; height: 14px;"></i> Vegan</span>',
                'glutenFree': '<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; background: rgba(245, 158, 11, 0.15); color: #f59e0b; border-radius: 12px; font-size: 0.75rem; font-weight: 600; margin-left: 8px;"><i data-lucide="wheat-off" style="width: 14px; height: 14px;"></i> Sans gluten</span>',
                'vegetarian': '<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; background: rgba(34, 197, 94, 0.15); color: #22c55e; border-radius: 12px; font-size: 0.75rem; font-weight: 600; margin-left: 8px;"><i data-lucide="salad" style="width: 14px; height: 14px;"></i> Végétarien</span>'
            };
            const variantBadge = result.variant && variantBadges[result.variant] ? variantBadges[result.variant] : '';

            // Create modal HTML with proper structure (COMPACT VERSION)
            const modalHtml = `
                <div id="smartMealModal" class="modal active">
                    <div class="modal-content" style="max-width: 600px;">
                        <div class="modal-header" style="padding: var(--space-lg);">
                            <h2 class="modal-title" style="font-size: 1.25rem;">${result.templateName}${variantBadge}</h2>
                            <button class="modal-close" onclick="closeSmartMealModal()">×</button>
                        </div>

                        <div class="modal-body" style="padding: var(--space-lg); max-height: 70vh; overflow-y: auto;">
                            ${lowCarbNotice}

                            <!-- Macros - Plus compact -->
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-sm); margin-bottom: var(--space-lg);">
                                <div style="text-align: center;">
                                    <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 2px;">Cal</div>
                                    <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-main);">${Math.round(result.macros.calories)}</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 2px;">Prot</div>
                                    <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-protein);">${Math.round(result.macros.protein)}g</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 2px;">Glu</div>
                                    <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-carbs);">${Math.round(result.macros.carbs)}g</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 2px;">Lip</div>
                                    <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-fat);">${Math.round(result.macros.fat)}g</div>
                                </div>
                            </div>

                            <!-- Composition - Plus compact -->
                            <div style="background: var(--bg-tertiary); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-md);">
                                <div style="font-size: 0.85rem; font-weight: 600; margin-bottom: var(--space-sm); color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                                    <i data-lucide="utensils" style="width: 14px; height: 14px;"></i>
                                    Composition
                                </div>
                                ${result.foods.map(food => `
                                    <div style="display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.85rem;">
                                        <span style="color: var(--text-secondary);">${food.name}</span>
                                        <span style="color: var(--text-primary); font-weight: 600;">${food.quantity}g</span>
                                    </div>
                                `).join('')}
                            </div>

                            ${result.recipe ? `
                                <details style="background: var(--bg-tertiary); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-md);">
                                    <summary style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); cursor: pointer; display: flex; align-items: center; gap: 6px;">
                                        <i data-lucide="book-open" style="width: 14px; height: 14px;"></i>
                                        Recette
                                    </summary>
                                    <div style="color: var(--text-secondary); line-height: 1.5; white-space: pre-line; font-size: 0.85rem; margin-top: var(--space-sm);">
                                        ${result.recipe}
                                    </div>
                                </details>
                            ` : ''}

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm);">
                                <button class="btn btn-secondary" onclick="closeSmartMealModal()" style="padding: var(--space-sm);">
                                    Annuler
                                </button>
                                <button class="btn" onclick="applySmartMeal('${mealType}')" style="background: var(--accent-main); display: flex; align-items: center; justify-content: center; gap: 6px; padding: var(--space-sm);">
                                    <i data-lucide="check" style="width: 16px; height: 16px;"></i>
                                    Charger
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add modal to DOM
            const existingModal = document.getElementById('smartMealModal');
            if (existingModal) existingModal.remove();

            document.body.insertAdjacentHTML('beforeend', modalHtml);
            document.body.style.overflow = 'hidden';

            // Re-init lucide icons for modal
            updateIcons();

            // Store result for applying
            window.currentSmartMealResult = result;
        };

        window.closeSmartMealModal = function() {
            const modal = document.getElementById('smartMealModal');
            if (modal) modal.remove();
            document.body.style.overflow = '';
            window.currentSmartMealResult = null;
        };

        window.applySmartMeal = function(mealType) {
            if (!window.currentSmartMealResult) return;

            const result = window.currentSmartMealResult;
            const dateKey = getCurrentDateKey();

            // Ensure day structure exists
            if (!allDailyMeals[dateKey]) {
                allDailyMeals[dateKey] = {
                    breakfast: { foods: [], recipe: '' },
                    lunch: { foods: [], recipe: '' },
                    snack: { foods: [], recipe: '' },
                    dinner: { foods: [], recipe: '' }
                };
            }

            // Add foods to meal (append, don't replace)
            if (!allDailyMeals[dateKey][mealType]) {
                allDailyMeals[dateKey][mealType] = { foods: [], recipe: '' };
            }

            // Add each generated food
            result.foods.forEach(food => {
                allDailyMeals[dateKey][mealType].foods.push({
                    ...food,
                    id: Date.now() + Math.random() // Unique ID
                });
            });

            // Add recipe if present
            if (result.recipe) {
                allDailyMeals[dateKey][mealType].recipe = result.recipe;
                // Update the recipe textarea
                const recipeTextarea = document.getElementById(`${mealType}-recipe-input`);
                if (recipeTextarea) {
                    recipeTextarea.value = result.recipe;
                    autoResizeTextarea(recipeTextarea);
                }
                // Show the recipe display section
                const recipeDisplay = document.getElementById(`${mealType}-recipe`);
                if (recipeDisplay) {
                    recipeDisplay.style.display = 'block';
                }
            }

            dailyMeals = allDailyMeals[dateKey];
            renderMeal(mealType);
            updateDayTotals();
            saveDailyMeals();
            syncMealsToPlanning();
            updateRemainingWidget();

            closeSmartMealModal();

            const mealNames = {
                'breakfast': 'Petit-déjeuner',
                'lunch': 'Déjeuner',
                'snack': 'Goûter',
                'dinner': 'Dîner'
            };
            const mealName = mealNames[mealType] || 'Repas';
            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> ${mealName} conseillé ajouté`);
        };

        // ===== DEDICATED MEAL TEMPLATES PAGE =====
        let currentTemplateFoods = [];

        function openFoodModalForTemplate() {
            // Reuse existing food modal but for template creation
            const modal = document.getElementById('foodModal');
            modal.dataset.target = 'template';
            modal.classList.add('active');
            renderFoodDatabase();
        }

        function addFoodToTemplate(food) {
            // No modal anymore, always use 100g default
            const quantity = 100;

            currentTemplateFoods.push({
                ...food,
                quantity: quantity,
                id: Date.now() + Math.random()
            });

            renderTemplateFoodsList();
            updateTemplateMacros();
            closeFoodModal();
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Aliment ajouté (100g)');
        }

        function renderTemplateFoodsList() {
            const container = document.getElementById('template-foods-list');

            if (currentTemplateFoods.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; color: var(--text-secondary); padding: var(--space-xl);">
                        <i data-lucide="utensils" style="width: 32px; height: 32px; color: var(--accent-ui); margin-bottom: var(--space-sm);"></i>
                        <p style="margin: 0;">Ajoute des aliments à ton repas type</p>
                    </div>
                `;
                updateIcons();
                return;
            }

            container.innerHTML = currentTemplateFoods.map(food => {
                const protein = Math.round((food.protein * food.quantity) / 100);
                const carbs = Math.round((food.carbs * food.quantity) / 100);
                const fat = Math.round((food.fat * food.quantity) / 100);
                const calories = Math.round((food.calories * food.quantity) / 100);

                return `
                    <div class="food-item" style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-md); background: var(--bg-secondary); border-radius: var(--radius-md); margin-bottom: var(--space-sm); gap: var(--space-md);">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: var(--space-xs);">${food.name}</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">
                                P: ${protein}g • g: ${carbs}g • L: ${fat}g • ${calories} kcal
                            </div></div>
                        <div style="display: flex; align-items: center; gap: var(--space-sm);">
                            <input type="number" value="${food.quantity}" min="1"
                                   onchange="updateTemplateFoodQuantity(${food.id}, this.value)"
                                   style="width: 70px; padding: var(--space-xs); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary); text-align: center;">
                            <span style="color: var(--text-secondary); font-size: 0.9rem;">g</span>
                        </div>
                        <button class="delete-btn" onclick="removeTemplateFood(${food.id})" style="padding: var(--space-sm);">
                            <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                        </button>
                    </div>
                `;
            }).join('');
            
            // Reinitialize Lucide icons after dynamic content
            updateIcons();
        }

        function updateTemplateFoodQuantity(foodId, newQuantity) {
            const food = currentTemplateFoods.find(f => f.id === foodId);
            if (food) {
                food.quantity = parseFloat(newQuantity);
                renderTemplateFoodsList();
                updateTemplateMacros();
            }
        }

        function removeTemplateFood(foodId) {
            currentTemplateFoods = currentTemplateFoods.filter(f => f.id !== foodId);
            renderTemplateFoodsList();
            updateTemplateMacros();
        }

        function updateTemplateMacros() {
            const totals = currentTemplateFoods.reduce((acc, food) => {
                acc.protein += (food.protein * food.quantity) / 100;
                acc.carbs += (food.carbs * food.quantity) / 100;
                acc.fat += (food.fat * food.quantity) / 100;
                acc.calories += (food.calories * food.quantity) / 100;
                return acc;
            }, { protein: 0, carbs: 0, fat: 0, calories: 0 });

            document.getElementById('template-protein-total').textContent = Math.round(totals.protein) + 'g';
            document.getElementById('template-carbs-total').textContent = Math.round(totals.carbs) + 'g';
            document.getElementById('template-fat-total').textContent = Math.round(totals.fat) + 'g';
            document.getElementById('template-cal-total').textContent = Math.round(totals.calories) + ' kcal';
        }

        // Premium: Importer un repas du jour comme template
        function importMealFromToday() {
            const mealNames = {
                breakfast: 'Petit-déjeuner',
                lunch: 'Déjeuner',
                snack: 'Goûter',
                dinner: 'Dîner'
            };

            const dateKey = getCurrentDateKey();
            const dayMeals = allDailyMeals[dateKey] || {};

            // Vérifier s'il y a des repas avec aliments
            const availableMeals = Object.entries(mealNames).filter(([type]) => {
                const foods = dayMeals[type] || [];
                return foods.length > 0;
            });

            if (availableMeals.length === 0) {
                customAlert('Aucun repas', "Tu n'as pas encore d'aliments dans tes repas d'aujourd'hui");
                return;
            }

            // Créer un modal de sélection
            const options = availableMeals.map(([type, name]) => {
                const foods = dayMeals[type] || [];
                return `<option value="${type}">${name} (${foods.length} aliment${foods.length > 1 ? 's' : ''})</option>`;
            }).join('');

            const modal = document.createElement('div');
            modal.className = 'custom-popup-overlay active';
            modal.id = 'import-meal-popup';
            modal.innerHTML = `
                <div class="custom-popup">
                    <h3><i data-lucide="download" style="width: 20px; height: 20px; display: inline; vertical-align: middle; color: var(--accent-main);"></i> Importer un repas</h3>
                    <p>Choisis le repas à importer comme nouveau repas type :</p>
                    <select id="import-meal-select" style="width: 100%; padding: var(--space-md); margin-bottom: var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem;">
                        ${options}
                    </select>
                    <div style="margin-bottom: var(--space-lg);">
                        <label style="font-weight: 600; margin-bottom: var(--space-xs); display: block; font-size: 0.9rem;">Nom du repas type</label>
                        <input type="text" id="import-template-name" placeholder="Ex: Mon déjeuner habituel" style="width: 100%; padding: var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); color: var(--text-primary);">
                    </div>
                    <div class="custom-popup-buttons">
                        <button onclick="document.getElementById('import-meal-popup').remove()" class="custom-popup-btn cancel">Annuler</button>
                        <button onclick="executeImportMeal()" class="custom-popup-btn confirm">Importer</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            updateIcons();
        }

        function executeImportMeal() {
            const mealType = document.getElementById('import-meal-select').value;
            const templateName = document.getElementById('import-template-name').value.trim();
            const dateKey = getCurrentDateKey();
            const foods = allDailyMeals[dateKey]?.[mealType] || [];

            if (!templateName) {
                showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Donne un nom au repas type');
                return;
            }

            // Copier les aliments dans le formulaire de template
            currentTemplateFoods = JSON.parse(JSON.stringify(foods));

            // Remplir le nom
            document.getElementById('new-template-name').value = templateName;

            // Mettre à jour l'affichage
            updateTemplateFoodsList();
            updateTemplateMacros();

            // Fermer le modal
            document.getElementById('import-meal-popup').remove();

            // Scroll vers le formulaire
            document.getElementById('new-template-name').scrollIntoView({ behavior: 'smooth', block: 'center' });

            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> ${foods.length} aliment(s) importé(s)`);
            updateIcons();
        }

        function saveNewMealTemplate() {
            const name = document.getElementById('new-template-name').value.trim();
            const recipe = document.getElementById('new-template-recipe').value.trim();

            if (!name) {
                customAlert('<i data-lucide="x-circle" class="icon-inline"></i> Nom manquant', 'Donne un nom à ton repas type');
                return;
            }

            if (currentTemplateFoods.length === 0) {
                customAlert('<i data-lucide="x-circle" class="icon-inline"></i> Repas vide', 'Ajoute au moins un aliment à ton repas type');
                return;
            }

            const template = {
                id: Date.now(),
                name: name,
                recipe: recipe || '', // Add recipe field
                foods: JSON.parse(JSON.stringify(currentTemplateFoods)),
                createdAt: new Date().toISOString()
            };

            mealTemplates.push(template);
            localStorage.setItem('mealTemplates', JSON.stringify(mealTemplates));

            // Reset form
            document.getElementById('new-template-name').value = '';
            document.getElementById('new-template-recipe').value = '';
            currentTemplateFoods = [];
            renderTemplateFoodsList();
            updateTemplateMacros();

            // Refresh list
            renderMealTemplatesList();

            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Repas type "' + name + '" créé !');
        }

        function renderMealTemplatesList() {
            const container = document.getElementById('templates-list');
            const countBadge = document.getElementById('templates-count');

            countBadge.textContent = mealTemplates.length;

            if (mealTemplates.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: var(--space-3xl); color: var(--text-secondary);">
                        <div style="font-size: 3rem; margin-bottom: var(--space-md);"><i data-lucide="clipboard-list" style="width: 48px; height: 48px;"></i></div>
                        <p style="font-size: 1.1rem; margin: 0;">Aucun repas type sauvegardé</p>
                        <p style="margin-top: var(--space-sm); margin-bottom: 0;">Crée-en un ci-dessus !</p>
                    </div>
                `;
                return;
            }

            // Sort by creation date (newest first)
            const sorted = [...mealTemplates].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            container.innerHTML = sorted.map(template => {
                const totals = template.foods.reduce((acc, food) => {
                    acc.protein += (food.protein * food.quantity) / 100;
                    acc.carbs += (food.carbs * food.quantity) / 100;
                    acc.fat += (food.fat * food.quantity) / 100;
                    acc.calories += (food.calories * food.quantity) / 100;
                    return acc;
                }, { protein: 0, carbs: 0, fat: 0, calories: 0 });

                return `
                    <div class="card" style="padding: var(--space-lg); background: var(--bg-secondary); border: 1px solid rgba(255, 255, 255, 0.05);">
                        <!-- Compact Header: Title + Macros + Buttons -->
                        <div style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-md);">
                            <div style="flex: 1;">
                                <h3 style="font-size: 1.2rem; font-weight: 700; margin: 0;">${template.name}</h3>
                            </div>

                            <!-- Compact Macros (inline) -->
                            <div style="display: flex; gap: var(--space-md); font-size: 0.9rem; color: var(--text-secondary);">
                                <span><strong style="color: var(--accent-protein);">${Math.round(totals.protein)}g</strong> P</span>
                                <span><strong style="color: var(--accent-carbs);">${Math.round(totals.carbs)}g</strong> g</span>
                                <span><strong style="color: var(--accent-fat);">${Math.round(totals.fat)}g</strong> L</span>
                                <span><strong style="color: var(--accent-ui);">${Math.round(totals.calories)}</strong> kcal</span>
                            </div>

                            <!-- Action Buttons -->
                            <div style="display: flex; gap: var(--space-xs);">
                                <button class="icon-btn" onclick="editMealTemplate(${template.id})" style="width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center;">
                                    <i data-lucide="pencil" style="width: 16px; height: 16px;"></i>
                                </button>
                                <button class="delete-btn" onclick="deleteMealTemplateFromPage(${template.id})" style="width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center;">
                                    <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                                </button>
                            </div></div>

                        <!-- Dropdown Toggle Button -->
                        <button onclick="toggleTemplateDetails('template-details-${template.id}')"
                                style="width: 100%; margin-top: var(--space-md); padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-secondary); cursor: pointer; font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: var(--space-sm);">
                            <span>Voir les détails</span>
                            <span id="arrow-template-details-${template.id}">▼</span>
                        </button>

                        <!-- Dropdown Content (hidden by default) -->
                        <div id="template-details-${template.id}" style="display: none; margin-top: var(--space-md);">

                            ${template.recipe ? `
                                <div style="padding: var(--space-md); background: var(--bg-tertiary); border-radius: 0 0 var(--radius-md) var(--radius-md); margin-bottom: var(--space-md);">
                                    <div style="font-size: 0.85rem; color: var(--accent-carbs); font-weight: 600; margin-bottom: var(--space-xs);"><i data-lucide="book-open" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Recette</div>
                                    <div style="color: var(--text-primary); font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap;">${template.recipe}</div></div>
                            ` : ''}

                            <!-- Foods List -->
                            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-sm); font-weight: 600;"><i data-lucide="utensils" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Aliments (${template.foods.length})</div>
                            <div style="display: flex; flex-direction: column; gap: var(--space-xs);">
                                ${template.foods.map(food => {
                                    const protein = Math.round((food.protein * food.quantity) / 100);
                                    const carbs = Math.round((food.carbs * food.quantity) / 100);
                                    const fat = Math.round((food.fat * food.quantity) / 100);
                                    const calories = Math.round((food.calories * food.quantity) / 100);

                                    return `
                                        <div style="padding: var(--space-sm); background: var(--bg-tertiary); border-radius: var(--radius-sm); border: 1px solid rgba(255, 255, 255, 0.05); font-size: 0.85rem;">
                                            <div style="font-weight: 600; margin-bottom: 2px;">${food.name} (${food.quantity}g)</div>
                                            <div style="color: var(--text-secondary);">
                                                P: ${protein}g • g: ${carbs}g • L: ${fat}g • ${calories} kcal
                                            </div></div>
                                    `;
                                }).join('')}
                            </div></div></div>
                `;
            }).join('');
            
            // Reinitialize Lucide icons after dynamic content
            updateIcons();
        }

        async function deleteMealTemplateFromPage(templateId) {
            const template = mealTemplates.find(t => t.id === templateId);
            if (!template) return;

            const confirmed = await customConfirm(
                'Supprimer "' + template.name + '" ?',
                'Ce repas type sera définitivement supprimé.',
                true
            );

            if (!confirmed) return;

            // Supprimer depuis Firestore (utiliser le nom comme ID)
            const templateIdSlug = template.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
            try {
                await deleteMealTemplateFromFirestore(templateIdSlug);
            } catch (error) {
                console.error('Erreur suppression meal template:', error);
                // L'erreur a déjà été affichée
            }

            // Recharger depuis Firestore pour s'assurer de la cohérence
            mealTemplates = await loadMealTemplatesFromFirestore();

            renderMealTemplatesList();
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Repas type supprimé');
        }

        function editMealTemplate(templateId) {
            const template = mealTemplates.find(t => t.id === templateId);
            if (!template) return;

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Load template data into form
            document.getElementById('new-template-name').value = template.name;
            document.getElementById('new-template-recipe').value = template.recipe || '';
            currentTemplateFoods = JSON.parse(JSON.stringify(template.foods));
            renderTemplateFoodsList();
            updateTemplateMacros();

            // Delete old template
            mealTemplates = mealTemplates.filter(t => t.id !== templateId);
            localStorage.setItem('mealTemplates', JSON.stringify(mealTemplates));
            renderMealTemplatesList();

            showToast('✏️ Modifie ton repas puis enregistre');
        }

        // Premium: Toggle menu repas
        function toggleMealMenu(mealType) {
            const menu = document.getElementById(`meal-menu-${mealType}`);
            const isOpen = menu.classList.contains('show');

            // Fermer tous les menus
            closeMealMenus();

            // Ouvrir celui-ci s'il était fermé
            if (!isOpen) {
                menu.classList.add('show');
                updateIcons();
            }
        }

        function closeMealMenus() {
            document.querySelectorAll('.meal-menu-dropdown').forEach(m => m.classList.remove('show'));
        }

        // Fermer les menus si on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.meal-menu-container')) {
                closeMealMenus();
            }
        });

        // Premium: Copier un repas vers un autre jour
        function copyMealTo(mealType) {
            closeMealMenus();
            const mealNames = {
                breakfast: 'Petit-déjeuner',
                lunch: 'Déjeuner',
                snack: 'Goûter',
                dinner: 'Dîner'
            };

            const dateKey = getCurrentDateKey();
            const meal = allDailyMeals[dateKey] ? allDailyMeals[dateKey][mealType] : null;
            const foods = meal ? (meal.foods || meal) : [];

            if (foods.length === 0) {
                showToast('<i data-lucide="info" class="icon-inline"></i> Ce repas est vide');
                return;
            }

            // Demander où copier
            const targetMealTypes = Object.keys(mealNames).filter(m => m !== mealType);
            const options = targetMealTypes.map(m => `<option value="${m}">${mealNames[m]}</option>`).join('');

            const modal = document.createElement('div');
            modal.className = 'custom-popup-overlay active';
            modal.id = 'copy-meal-popup';
            modal.innerHTML = `
                <div class="custom-popup">
                    <h3><i data-lucide="copy" style="width: 20px; height: 20px; display: inline; vertical-align: middle;"></i> Copier ${mealNames[mealType]}</h3>
                    <p>Copier les ${foods.length} aliment(s) vers :</p>
                    <select id="copy-target-meal" style="width: 100%; padding: var(--space-md); margin-bottom: var(--space-md); background: var(--bg-tertiary); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); color: var(--text-primary); font-size: 1rem;">
                        ${options}
                    </select>
                    <div class="custom-popup-buttons">
                        <button onclick="document.getElementById('copy-meal-popup').remove()" class="custom-popup-btn cancel">Annuler</button>
                        <button onclick="executeCopyMeal('${mealType}')" class="custom-popup-btn confirm">Copier</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            updateIcons();
        }

        function executeCopyMeal(sourceMealType) {
            const targetMealType = document.getElementById('copy-target-meal').value;
            const dateKey = getCurrentDateKey();
            const sourceFoods = allDailyMeals[dateKey][sourceMealType] || [];

            if (!allDailyMeals[dateKey]) allDailyMeals[dateKey] = {};
            if (!allDailyMeals[dateKey][targetMealType]) allDailyMeals[dateKey][targetMealType] = [];

            // Copier les aliments (deep copy)
            const copiedFoods = JSON.parse(JSON.stringify(sourceFoods));
            allDailyMeals[dateKey][targetMealType] = [...allDailyMeals[dateKey][targetMealType], ...copiedFoods];

            saveDailyMeals();
            renderMealFoods(targetMealType);
            updateDayTotals();

            document.getElementById('copy-meal-popup').remove();
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Repas copié');
            updateIcons();
        }

        async function clearMeal(mealType) {
            const mealNames = {
                breakfast: 'Petit-déjeuner',
                lunch: 'Déjeuner',
                snack: 'Goûter',
                dinner: 'Dîner'
            };

            const dateKey = getCurrentDateKey();
            const meal = allDailyMeals[dateKey] ? allDailyMeals[dateKey][mealType] : null;
            const foods = meal ? (meal.foods || meal) : [];

            if (foods.length === 0)  { customAlert('Repas vide', 'Ce repas est déjà vide.');
                return; }

            const confirmed = await customConfirm(
                '<i data-lucide="trash-2" style="width: 18px; height: 18px;"></i> Vider ce repas',
                `Supprimer tous les aliments du ${mealNames[mealType]} ?\n\nCette action ne peut pas être annulée.`,
                true
            );

            if (!confirmed) return;

            // Vider le repas
            if (allDailyMeals[dateKey]) {
                allDailyMeals[dateKey][mealType] = { foods: [], recipe: '' };
            }
            dailyMeals[mealType] = { foods: [], recipe: '' };

            // Clear recipe textarea and hide it
            const recipeInput = document.getElementById(`${mealType}-recipe-input`);
            const recipeDiv = document.getElementById(`${mealType}-recipe`);
            if (recipeInput) recipeInput.value = '';
            if (recipeDiv) recipeDiv.style.display = 'none';

            // Mettre à jour l'affichage
            renderMeal(mealType);
            updateDayTotals();
            saveDailyMeals();
            syncMealsToPlanning();

            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> ${mealNames[mealType]} vidé`);
        }

        // ===== SAUVEGARDE PARAMÈTRES =====
        async function loadCalcSettings() {
            // Charger depuis Firestore (avec fallback localStorage)
            const settings = await loadSettingsFromFirestore();

            // Charger les valeurs individuelles (SAUF weight, height, activity qui viennent du profil)
            ['bodyFat', 'deficit', 'surplus', 'proteinCoeff', 'fatCoeff', 'proteinCoeffMaintain', 'fatCoeffMaintain', 'proteinCoeffBulk', 'fatCoeffBulk'].forEach(s => {
                const value = settings['calc_' + s];
                if (value && document.getElementById(s)) {
                    document.getElementById(s).value = value;
                }
            });

            const savedGoal = settings.calc_goal;
            if (savedGoal) selectGoal(savedGoal, true); // true = isLoading, ne pas recalculer

            // Restaurer le mode (guidé/avancé) depuis Firestore (avec fallback localStorage)
            const savedMode = settings.calculatorMode || localStorage.getItem('calculatorMode');
            if (savedMode === 'advanced') {
                const guidedMode = document.getElementById('guided-mode');
                const advancedMode = document.getElementById('advanced-mode');
                if (guidedMode && advancedMode) {
                    guidedMode.style.display = 'none';
                    advancedMode.style.display = 'block';

                    // Afficher les options correspondant à l'objectif actuel
                    document.getElementById('cut-options').style.display = 'none';
                    document.getElementById('maintain-options').style.display = 'none';
                    document.getElementById('bulk-options').style.display = 'none';

                    if (currentGoal === 'cut') {
                        document.getElementById('cut-options').style.display = 'block';
                    } else if (currentGoal === 'maintain') {
                        document.getElementById('maintain-options').style.display = 'block';
                    } else if (currentGoal === 'bulk') {
                        document.getElementById('bulk-options').style.display = 'block';
                    }
                }
            }

            // Restaurer le rythme depuis Firestore (avec fallback localStorage)
            const savedPace = settings.selectedPace || localStorage.getItem('selectedPace');
            if (savedPace && typeof window.selectPace === 'function') {
                // Appeler selectPace pour remplir les champs SANS déclencher calculateMacros
                window.selectPace(savedPace, true); // true = skipCalculate
            }

            // Load saved macro targets and display results
            const targets = settings.macroTargets;
            if (targets) {
                try {

                    if (targets.calories) {
                        // BMR and TDEE
                        if (targets.bmr && document.getElementById('bmr-display')) {
                            document.getElementById('bmr-display').textContent = targets.bmr.toLocaleString('fr-FR') + ' kcal';
                        }
                        if (targets.tdee && document.getElementById('tdee-display')) {
                            document.getElementById('tdee-display').textContent = targets.tdee.toLocaleString('fr-FR') + ' kcal';
                        }

                        // IMC - Restaurer au chargement
                        if (targets.imc && document.getElementById('imc-display-blur')) {
                            const imc = parseFloat(targets.imc);
                            let imcCategory, imcColor;
                            if (imc < 18.5) { imcCategory = 'Maigreur'; imcColor = 'var(--accent-carbs)'; }
                            else if (imc < 25) { imcCategory = 'Corpulence normale'; imcColor = 'var(--accent-main)'; }
                            else if (imc < 30) { imcCategory = 'Surpoids'; imcColor = 'var(--accent-fat)'; }
                            else { imcCategory = 'Obésité'; imcColor = 'var(--accent-danger)'; }

                            document.getElementById('imc-display-blur').textContent = targets.imc;
                            document.getElementById('imc-display-blur').style.color = imcColor;
                            if (document.getElementById('imc-category-blur')) {
                                document.getElementById('imc-category-blur').textContent = imcCategory;
                                document.getElementById('imc-category-blur').style.color = imcColor;
                            }
                        }

                        // Macro targets (grammes)
                        if (document.getElementById('targetProtein')) document.getElementById('targetProtein').textContent = Math.round(targets.protein);
                        if (document.getElementById('targetCarbs')) document.getElementById('targetCarbs').textContent = Math.round(targets.carbs);
                        if (document.getElementById('targetFat')) document.getElementById('targetFat').textContent = Math.round(targets.fat);

                        // Calories breakdown
                        const proteinCal = targets.protein * 4;
                        const carbsCal = targets.carbs * 4;
                        const fatCal = targets.fat * 9;
                        const totalCal = Math.round(proteinCal + carbsCal + fatCal);

                        if (document.getElementById('proteinCal')) document.getElementById('proteinCal').textContent = Math.round(proteinCal);
                        if (document.getElementById('carbsCal')) document.getElementById('carbsCal').textContent = Math.round(carbsCal);
                        if (document.getElementById('fatCal')) document.getElementById('fatCal').textContent = Math.round(fatCal);
                        if (document.getElementById('totalCal')) document.getElementById('totalCal').textContent = totalCal;

                        // Progress bars
                        setTimeout(() => {
                            const pPct = Math.round((proteinCal / totalCal) * 100);
                            const cPct = Math.round((carbsCal / totalCal) * 100);
                            const fPct = Math.round((fatCal / totalCal) * 100);

                            if (document.getElementById('proteinBar')) {
                                document.getElementById('proteinBar').style.width = `${pPct}%`;
                                document.getElementById('proteinBar').setAttribute('data-percent', `${pPct}%`);
                            }
                            if (document.getElementById('carbsBar')) {
                                document.getElementById('carbsBar').style.width = `${cPct}%`;
                                document.getElementById('carbsBar').textContent = `${cPct}%`;
                            }
                            if (document.getElementById('fatBar')) {
                                document.getElementById('fatBar').style.width = `${fPct}%`;
                                document.getElementById('fatBar').textContent = `${fPct}%`;
                            }
                        }, 100);

                        // Show results section
                        const resultsEl = document.getElementById('results');
                        if (resultsEl)  { resultsEl.style.display = 'block'; }
                    }
                } catch(e) {
                    console.error('<i data-lucide="x-circle" class="icon-inline"></i> Error loading saved targets:', e);
                }
            }
        }

        async function saveCalcSettings() {
            // NE PAS sauvegarder weight et activity ici: ils viennent du profil
            const values = {
                bodyFat: document.getElementById('bodyFat')?.value || '',
                deficit: document.getElementById('deficit')?.value || '',
                surplus: document.getElementById('surplus')?.value || '',
                proteinCoeff: document.getElementById('proteinCoeff')?.value || '',
                fatCoeff: document.getElementById('fatCoeff')?.value || '',
                proteinCoeffMaintain: document.getElementById('proteinCoeffMaintain')?.value || '',
                fatCoeffMaintain: document.getElementById('fatCoeffMaintain')?.value || '',
                proteinCoeffBulk: document.getElementById('proteinCoeffBulk')?.value || '',
                fatCoeffBulk: document.getElementById('fatCoeffBulk')?.value || '',
                goal: currentGoal || 'cut'
            };

            console.log('💾 saveCalcSettings - Valeurs lues:', values);

            // Construire l'objet settings pour Firestore avec préfixe calc_
            const settings = {};
            Object.keys(values).forEach(k => {
                if (values[k] !== '') {
                    settings['calc_' + k] = values[k];
                }
            });

            console.log('💾 saveCalcSettings - Settings à sauvegarder:', settings);

            // Sauvegarder vers Firestore (avec fallback localStorage)
            try {
                await saveSettingsToFirestore(settings);
                console.log('✅ saveCalcSettings - Sauvegarde Firestore réussie');
            } catch (error) {
                console.error('❌ Erreur sauvegarde settings calculateur:', error);
            }
        }

        const origCalculateMacros = calculateMacros;
        calculateMacros = async function(...args)  {
            console.log('🔄 Wrapper calculateMacros, args:', args);
            origCalculateMacros(...args);
            await saveCalcSettings();
        };

        // ===== USER MENU =====
        function toggleUserMenu() {
            const menu = document.getElementById('user-menu');
            if (menu) {
                menu.classList.toggle('active');
                updateIcons();
            }
        }

        function closeUserMenu() {
            const menu = document.getElementById('user-menu');
            if (menu) menu.classList.remove('active');
        }

        // Fermer le menu si on clique ailleurs
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('user-menu');
            const btn = document.getElementById('header-profile-btn');
            if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
                menu.classList.remove('active');
            }
        });

        // ===== THEME TOGGLE =====
        function toggleTheme() {
            const body = document.body;
            const icon = document.getElementById('theme-icon');

            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                icon.setAttribute('data-lucide', 'moon');
                updateIcons();
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.add('light-theme');
                icon.setAttribute('data-lucide', 'sun');
                updateIcons();
                localStorage.setItem('theme', 'light');
            }
        }

        // Charger le thème sauvegardé
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            setTheme(savedTheme);
        }

        function setTheme(theme) {
            if (theme === 'light') { document.body.classList.add('light-theme'); } else  { document.body.classList.remove('light-theme'); }
            localStorage.setItem('theme', theme);

            // Update buttons immediately and with timeout to ensure they exist
            updateThemeButtons(theme);
            setTimeout(() => updateThemeButtons(theme), 100);
        }

        function updateThemeButtons(theme) {
            const darkBtn = document.getElementById('theme-dark-btn');
            const lightBtn = document.getElementById('theme-light-btn');


            if (!darkBtn || !lightBtn) return;

            if (theme === 'dark') {
                darkBtn.style.background = 'var(--accent-ui)';
                darkBtn.style.color = 'white';
                darkBtn.style.border = 'none';
                lightBtn.style.background = 'var(--bg-tertiary)';
                lightBtn.style.color = 'var(--text-primary)';
                lightBtn.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            } else {
                lightBtn.style.background = 'var(--accent-ui)';
                lightBtn.style.color = 'white';
                lightBtn.style.border = 'none';
                darkBtn.style.background = 'var(--bg-tertiary)';
                darkBtn.style.color = 'var(--text-primary)';
                darkBtn.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            }
        }

                // ===== END PIN AUTHENTICATION =====


        // Fonction pour changer l'unité de poids
        function setUnit(unit) {
            localStorage.setItem('weightUnit', unit);
            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> Unité changée en ${unit}`);

            // Mettre à jour les boutons
            const kgBtn = document.querySelector('button[onclick="setUnit(\'kg\')"]');
            const lbsBtn = document.querySelector('button[onclick="setUnit(\'lbs\')"]');

            if (kgBtn && lbsBtn) {
                if (unit === 'kg') {
                    kgBtn.style.background = 'var(--accent-ui)';
                    kgBtn.style.color = 'white';
                    lbsBtn.style.background = 'var(--bg-tertiary)';
                    lbsBtn.style.color = 'var(--text-primary)';
                } else {
                    lbsBtn.style.background = 'var(--accent-ui)';
                    lbsBtn.style.color = 'white';
                    kgBtn.style.background = 'var(--bg-tertiary)';
                    kgBtn.style.color = 'var(--text-primary)';
                }
            }
        }

        function displayUsername() {
            const username = localStorage.getItem('appUsername');
            const displayEl = document.getElementById('username-display');

            if (username && displayEl) {
                const hour = new Date().getHours();
                let greeting = '👋';
                if (hour < 12) greeting = '☀️';
                else if (hour < 18) greeting = '👋';
                else greeting = '🌙';

                displayEl.innerHTML = `<span>${greeting}</span><span>Salut, <strong style="color: var(--text-primary);">${username}</strong> !</span>`;
            }
        }

        function updateUsername() {
            const newUsername = document.getElementById('username-edit-input').value.trim();

            if (!newUsername || newUsername.length < 2) {
                customAlert('<i data-lucide="x-circle" class="icon-inline"></i> Prénom invalide', 'Entre un prénom valide (minimum 2 caractères)');
                return;
            }

            localStorage.setItem('appUsername', newUsername);
            displayUsername();
            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Prénom mis à jour !');
        }

        // Appeler au chargement
        window.addEventListener('DOMContentLoaded', function() {
            updateSectionsAvailability();

            // NOTE: Ne pas afficher main-app ici !
            // L'affichage est maintenant géré par onAuthStateChanged dans index.html
            // qui attend Firebase pour décider : showApp(user) ou showLanding()

            // Display username in header
            displayUsername();

            // Load username in settings
            const username = localStorage.getItem('appUsername') || '';
            const usernameEditInput = document.getElementById('username-edit-input');
            if (usernameEditInput) { usernameEditInput.value = username; }

            loadTheme();

            // Remplir les dropdowns de date de naissance
            const daySelect = document.getElementById('birth-day');
            const yearSelect = document.getElementById('birth-year');

            if (daySelect) {
                // Ajouter les jours (1-31)
                for (let i = 1; i <= 31; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    daySelect.appendChild(option);
                }
            }

            if (yearSelect) {
                // Ajouter les années (de 1935 à 2025)
                const currentYear = new Date().getFullYear();
                for (let i = currentYear; i >= 1935; i--) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    yearSelect.appendChild(option);
                }
            }

            // Charger le profil après avoir rempli les dropdowns
            // NOTE: Désactivé - loadProfile() est maintenant appelé depuis admin.js
            // APRÈS que window.dataService soit créé (sinon fallback localStorage)
            // loadProfile();

            // Charger les données du suivi
            const savedTracking = localStorage.getItem('advancedTrackingData');
            if (savedTracking)  { advancedTrackingData = JSON.parse(savedTracking); }

            const savedHeight = localStorage.getItem('userHeight');
            if (savedHeight)  { userHeight = parseFloat(savedHeight); }

            // Afficher l'historique
            renderAdvancedTrackingList();

            // Initialiser la date
            const trackingDateInput = document.getElementById('tracking-date');
            if (trackingDateInput)  { trackingDateInput.valueAsDate = new Date(); }

            // Afficher l'historique si on est sur l'onglet tracking
            setTimeout(() => {
                if (document.getElementById('tracking-list')) {
                    renderAdvancedTrackingList();
                }
            }, 100);

            // AUTO-CALCUL: Ajouter listeners sur les champs du profil
            const profileFields = ['weight', 'height', 'birth-day', 'birth-month', 'birth-year', 'profile-gender', 'activity'];
            profileFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) { field.addEventListener('change', checkAndAutoCalculate); }
            });

            // Ne PAS auto-calculer au chargement (ligne 6366 supprimée)
            // L'utilisateur veut que ça recalcule uniquement quand il change:
            // - le rythme (selectPace)
            // - le niveau d'activité (listener ci-dessus)
            // - le poids (listener ci-dessus)
            // PAS au F5!

            // ===== NOTIFICATION PREFERENCES =====
            const notifGoals = document.getElementById('notification-goals');
            const savedNotifGoals = localStorage.getItem('notification-goals');

            if (notifGoals) {
                notifGoals.checked = savedNotifGoals !== 'false'; // Default true
                notifGoals.addEventListener('change', function() {
                    localStorage.setItem('notification-goals', this.checked);
                    if (this.checked && Notification.permission !== 'granted') {
                        Notification.requestPermission();
                    }
                });
            }

            // Initialiser les icônes Lucide
            updateIcons();
        });

        // Fonction qui vérifie si le profil est complet et auto-calcule
        function checkAndAutoCalculate() {
            const weight = document.getElementById('weight')?.value;
            const height = document.getElementById('height')?.value;
            const birthDay = document.getElementById('birth-day')?.value;
            const birthMonth = document.getElementById('birth-month')?.value;
            const birthYear = document.getElementById('birth-year')?.value;
            const gender = document.getElementById('profile-gender')?.value;
            const activity = document.getElementById('activity')?.value;

            // Si tous les champs sont remplis, calculer automatiquement
            if (weight && height && birthDay && birthMonth && birthYear && gender && activity) {
                // Vérifier si on a déjà des résultats pour ne pas recalculer à chaque fois
                const hasResults = localStorage.getItem('macroTargets');
                if (!hasResults) {
                    // Premier calcul automatique silencieux
                    calculateMacros(true);
                }
            }
        }


        // ===== SUIVI AVANCÉ =====
        let advancedTrackingData = [];
        let trackingChart = null;
        let userHeight = null;

        function loadAdvancedTracking() {
            // Charger depuis trackingData comme source principale
            const trackingSaved = localStorage.getItem('trackingData');
            if (trackingSaved) {
                advancedTrackingData = JSON.parse(trackingSaved);
            } else {
                // Fallback vers advancedTrackingData si trackingData n'existe pas
                const saved = localStorage.getItem('advancedTrackingData');
                if (saved) advancedTrackingData = JSON.parse(saved);
            }

            // Récupérer la taille depuis le champ dans le calculateur
            const heightField = document.getElementById('height');
            if (heightField && heightField.value) {
                userHeight = parseFloat(heightField.value);
                localStorage.setItem('userHeight', userHeight);
            } else {
                const savedHeight = localStorage.getItem('userHeight');
                if (savedHeight) { userHeight = parseFloat(savedHeight); } else {
                    userHeight = 175; // Valeur par défaut
                    localStorage.setItem('userHeight', userHeight);
                }
            }

            renderAdvancedTrackingList();
        }

        function saveAdvancedTracking() {
            const date = document.getElementById('tracking-date').value;
            const weight = parseFloat(document.getElementById('tracking-weight').value);

            if (!date || !weight) {
                alert('<i data-lucide="x-circle" class="icon-inline"></i> Date et poids obligatoires');
                return;
            }

            let imc = null;
            if (userHeight && weight)  { imc = parseFloat((weight / ((userHeight / 100) ** 2)).toFixed(1)); }

            const entry = {
                date, weight, imc,
                bodyfat: parseFloat(document.getElementById('tracking-bodyfat').value) || null,
                muscle: parseFloat(document.getElementById('tracking-muscle').value) || null,
                bone: parseFloat(document.getElementById('tracking-bone').value) || null,
                proteinPct: parseFloat(document.getElementById('tracking-protein-pct').value) || null,
                water: parseFloat(document.getElementById('tracking-water').value) || null,
                bodyAge: parseInt(document.getElementById('tracking-body-age').value) || null,
                visceral: parseInt(document.getElementById('tracking-visceral').value) || null,
                notes: document.getElementById('tracking-notes').value.trim()
            };

            advancedTrackingData = advancedTrackingData.filter(e => e.date !== date);
            advancedTrackingData.push(entry);
            advancedTrackingData.sort((a, b) => new Date(b.date) - new Date(a.date));

            localStorage.setItem('advancedTrackingData', JSON.stringify(advancedTrackingData));
            renderAdvancedTrackingList();

            ['weight', 'bodyfat', 'muscle', 'bone', 'protein-pct', 'water', 'body-age', 'visceral', 'notes'].forEach(id => {
                const elem = document.getElementById('tracking-' + id);
                if (elem) elem.value = '';
            });

            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Mesure enregistrée !');
        }


        function renderAdvancedTrackingList() {

            const container = document.getElementById('tracking-list');
            if (!container) return;

            if (advancedTrackingData.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: var(--space-3xl); color: var(--text-secondary);">
                        <div style="margin-bottom: var(--space-lg);"><i data-lucide="trending-up" style="width: 64px; height: 64px; opacity: 0.3;"></i></div>
                        <p style="font-size: 1.1rem; margin: 0; opacity: 0.9;">Aucune mesure enregistrée</p>
                        <p style="font-size: 0.9rem; margin-top: var(--space-sm); margin-bottom: 0; opacity: 0.6;">Commence ton suivi ci-dessus pour visualiser ta progression 📊</p>
                    </div>
                `;
                updateIcons();
                return;
            }

            container.innerHTML = advancedTrackingData.map(e => `
                <div class="card" style="margin-bottom: 15px; padding: var(--space-xl);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <div style="flex: 1;">
                            <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 10px;">
                                ${new Date(e.date).toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                                <div><strong>Poids:</strong> ${e.weight} kg</div>
                                ${e.imc ? `<div><strong>IMC:</strong> ${e.imc}</div>` : ''}
                                ${e.bodyfat ? `<div><strong>Graisse:</strong> ${e.bodyfat}%</div>` : ''}
                                ${e.muscle ? `<div><strong>Muscle:</strong> ${e.muscle} kg</div>` : ''}
                                ${e.bone ? `<div><strong>Os:</strong> ${e.bone} kg</div>` : ''}
                                ${e.proteinPct ? `<div><strong>Protéines:</strong> ${e.proteinPct}%</div>` : ''}
                                ${e.water ? `<div><strong>Eau:</strong> ${e.water}%</div>` : ''}
                                ${e.bodyAge ? `<div><strong>Âge:</strong> ${e.bodyAge} ans</div>` : ''}
                                ${e.visceral ? `<div><strong>Viscérale:</strong> ${e.visceral}</div>` : ''}
                            </div>
                            ${e.notes ? `<div style="margin-top: 10px; color: var(--text-secondary); font-style: italic;">📝 ${e.notes}</div>` : ''}
                        </div>
                        <button class="delete-btn" onclick="deleteAdvancedTracking('${e.date}')"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></button>
                    </div></div>
            `).join('');
            
            // Reinitialize Lucide icons after dynamic content
            updateIcons();
        }

        function deleteAdvancedTracking(date) {
            customConfirm('Supprimer cette mesure', 'Cette mesure sera définitivement supprimée.\n\nContinuer ?', true).then((confirmed) => {
                if (!confirmed) return;
                advancedTrackingData = advancedTrackingData.filter(e => e.date !== date);
                localStorage.setItem('advancedTrackingData', JSON.stringify(advancedTrackingData));
                renderAdvancedTrackingList();
                showToast('<i data-lucide="check-circle" class="icon-inline"></i> Mesure supprimée');
            });
        }

        function showChart(type) {

            // Filter data that has the requested metric
            const validData = advancedTrackingData.filter(entry => {
                switch(type) {
                    case 'weight': return entry.weight != null && entry.weight > 0;
                    case 'bodyfat': return entry.bodyfat != null && entry.bodyfat > 0;
                    case 'muscle': return entry.muscle != null && entry.muscle > 0;
                    case 'imc': return entry.imc != null && entry.imc > 0;
                    case 'water': return entry.water != null && entry.water > 0;
                    case 'bone': return entry.bone != null && entry.bone > 0;
                    case 'proteinPct': return entry.proteinPct != null && entry.proteinPct > 0;
                    case 'bodyAge': return entry.bodyAge != null && entry.bodyAge > 0;
                    case 'visceral': return entry.visceral != null && entry.visceral > 0;
                    default: return false;
                }
            });

            if (validData.length < 2) {
                customAlert('📊 Graphique', 'Minimum 2 mesures requises pour afficher un graphique.').then(() => {});
                return;
            }

            const canvas = document.getElementById('tracking-chart');
            if (!canvas) {
                console.error('Canvas not found!');
                alert('Erreur: Canvas introuvable');
                return;
            }

            canvas.style.display = 'block';

            // Détruire l'ancien graphique
            if (trackingChart)  { trackingChart.destroy();
                trackingChart = null; }

            // Préparer les données
            const sorted = [...validData].sort((a, b) => new Date(a.date) - new Date(b.date));
            const labels = sorted.map(e => new Date(e.date).toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'}));

            let data, label, color;

            // Couleurs sémantiques pour chaque métrique
            const METRIC_COLORS = {
                weight: '#FF6B6B',     // Corail - mesure corporelle principale
                bodyfat: '#FFB347',    // Orange - à réduire idéalement
                muscle: '#10B981',     // Vert - croissance positive
                imc: '#8B5CF6',        // Violet - indicateur calculé
                water: '#38BDF8',      // Bleu ciel - hydratation
                bone: '#94A3B8',       // Gris ardoise - structure
                proteinPct: '#F97316', // Orange vif - protéines
                bodyAge: '#F472B6',    // Rose - âge métabolique
                visceral: '#EF4444'    // Rouge - attention santé
            };

            switch(type) {
                case 'weight':
                    data = sorted.map(e => e.weight);
                    label = 'Poids (kg)';
                    color = METRIC_COLORS.weight;
                    break;
                case 'bodyfat':
                    data = sorted.map(e => e.bodyfat || 0);
                    label = 'Graisse (%)';
                    color = METRIC_COLORS.bodyfat;
                    break;
                case 'muscle':
                    data = sorted.map(e => e.muscle || 0);
                    label = 'Muscle (kg)';
                    color = METRIC_COLORS.muscle;
                    break;
                case 'imc':
                    data = sorted.map(e => e.imc || 0);
                    label = 'IMC';
                    color = METRIC_COLORS.imc;
                    break;
                case 'water':
                    data = sorted.map(e => e.water || 0);
                    label = 'Eau (%)';
                    color = METRIC_COLORS.water;
                    break;
                case 'bone':
                    data = sorted.map(e => e.bone || 0);
                    label = 'Os (kg)';
                    color = METRIC_COLORS.bone;
                    break;
                case 'proteinPct':
                    data = sorted.map(e => e.proteinPct || 0);
                    label = 'Protéines (%)';
                    color = METRIC_COLORS.proteinPct;
                    break;
                case 'bodyAge':
                    data = sorted.map(e => e.bodyAge || 0);
                    label = 'Âge corporel';
                    color = METRIC_COLORS.bodyAge;
                    break;
                case 'visceral':
                    data = sorted.map(e => e.visceral || 0);
                    label = 'Viscérale';
                    color = METRIC_COLORS.visceral;
                    break;
                default:
                    alert('Type de graphique inconnu');
                    return;
            }

            // Filtrer les données nulles/0
            const filteredData = data.filter(d => d !== null && d !== 0);
            if (filteredData.length === 0) {
                customAlert('📊 Graphique', 'Aucune donnée disponible pour ce graphique.').then(() => {});
                canvas.style.display = 'none';
                return;
            }


            // Vérifier que Chart existe
            if (typeof Chart === 'undefined') {
                alert('Erreur: Chart.js non chargé. Recharge la page.');
                return;
            }

            try {
                const ctx = canvas.getContext('2d');
                trackingChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: label,
                            data: data,
                            borderColor: color,
                            backgroundColor: color + '33',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true,
                            pointRadius: 6,
                            pointHoverRadius: 8,
                            pointBackgroundColor: color,
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    color: '#ffffff',
                                    font: { size: 14 }
                                }
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: '#fff',
                                bodyColor: '#fff'
                            }
                        },
                        scales: {
                            x: {
                                ticks: { color: '#a0a0a0' },
                                grid: { color: 'rgba(255, 255, 255, 0.1)' }
                            },
                            y: {
                                ticks: { color: '#a0a0a0' },
                                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                                beginAtZero: false
                            }
                        }
                    }
                });

                canvas.scrollIntoView({behavior: 'smooth', block: 'nearest'});
            } catch (error) {
                console.error('Error creating chart:', error);
                alert('Erreur lors de la création du graphique: ' + error.message);
            }
        }

        // Variable pour tracker le graphique actif
        let activeChartType = null;

        function toggleChart(type) {
            const canvas = document.getElementById('tracking-chart');
            const allButtons = document.querySelectorAll('.chart-toggle-btn');

            // Si on clique sur le même type et le graphique est visible, on le cache
            if (activeChartType === type && canvas && canvas.style.display !== 'none') {
                // Cacher le graphique
                canvas.style.display = 'none';
                if (trackingChart) {
                    trackingChart.destroy();
                    trackingChart = null;
                }
                // Retirer l'état actif de tous les boutons
                allButtons.forEach(btn => btn.classList.remove('active'));
                activeChartType = null;
            } else {
                // Retirer l'état actif de tous les boutons
                allButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter l'état actif au bouton cliqué
                const clickedBtn = document.querySelector(`.chart-toggle-btn[data-chart="${type}"]`);
                if (clickedBtn) clickedBtn.classList.add('active');
                // Afficher le graphique
                activeChartType = type;
                showChart(type);
            }
        }

/* accolade supprimée */


        // ===== POP-UPS CUSTOM =====
        let popupResolve = null;

        function customConfirm(title, message, isDangerOrOptions = false) {
            return new Promise((resolve) => {
                popupResolve = resolve;

                document.getElementById('popup-title').innerHTML = title;
                // Use innerHTML to preserve HTML formatting like <br> tags
                document.getElementById('popup-message').innerHTML = message.replace(/\n/g, '<br>');

                const confirmBtn = document.getElementById('popup-confirm-btn');
                const cancelBtn = document.querySelector('#custom-popup .cancel');

                // Support custom button texts: isDangerOrOptions can be boolean or object {confirmText, cancelText, isDanger}
                let isDanger = false;
                let confirmText = 'Confirmer';
                let cancelText = 'Annuler';

                if (typeof isDangerOrOptions === 'object') {
                    isDanger = isDangerOrOptions.isDanger || false;
                    confirmText = isDangerOrOptions.confirmText || 'Confirmer';
                    cancelText = isDangerOrOptions.cancelText || 'Annuler';
                } else {
                    isDanger = isDangerOrOptions;
                    confirmText = isDanger ? 'Supprimer' : 'Confirmer';
                }

                confirmBtn.className = isDanger ? 'custom-popup-btn danger' : 'custom-popup-btn confirm';
                confirmBtn.textContent = confirmText;
                if (cancelBtn) cancelBtn.textContent = cancelText;

                // IMPORTANT: Reset onclick handler (peut avoir été modifié par customAlert)
                confirmBtn.onclick = () => closePopup(true);

                // Aussi restaurer le bouton Annuler au cas où customAlert l'a masqué
                if (cancelBtn) cancelBtn.style.display = 'block';

                document.getElementById('custom-popup').classList.add('active');
                document.body.style.overflow = 'hidden';
                updateIcons();
            });
        }

        function closePopup(result) {
            document.getElementById('custom-popup').classList.remove('active');
            document.body.style.overflow = '';
            if (popupResolve) {
                popupResolve(result);
                popupResolve = null;
            }
        }

        // SYSTÈME ANTI-DOUBLON POUR NOTIFICATIONS
        const toastHistory = new Map(); // message -> timestamp de dernière notification
        let currentToastTimeout = null;

        function showToast(message, type = 'success') {
            console.log('🔔 showToast appelé:', message.substring(0, 50), 'type:', type);

            // Vérifier si cette notification exacte a été affichée récemment
            const now = Date.now();
            const lastShown = toastHistory.get(message);

            if (lastShown && (now - lastShown < 4000)) {
                // Cette notification a été affichée il y a moins de 4 secondes, ignorer
                console.log('🚫 Notification dupliquée ignorée:', message.substring(0, 50), 'délai:', now - lastShown, 'ms');
                return;
            }

            console.log('✓ Notification acceptée, affichage en cours');
            // Enregistrer cette notification
            toastHistory.set(message, now);

            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-message');
            toastMsg.innerHTML = message;

            // Reset et appliquer le type
            toast.classList.remove('toast-success', 'toast-error', 'toast-warning', 'toast-info');
            toast.classList.add('toast-' + type);
            toast.classList.add('show');

            // Reinit Lucide APRÈS que le DOM soit mis à jour
            setTimeout(() => {
                updateIcons();
            }, 0);

            // Annuler le timeout précédent si existant
            if (currentToastTimeout) {
                clearTimeout(currentToastTimeout);
            }

            // Programmer la disparition
            currentToastTimeout = setTimeout(() => {
                toast.classList.remove('show');
                currentToastTimeout = null;
            }, 3000);

            // Nettoyer l'historique des vieilles entrées (> 10 secondes)
            for (const [msg, timestamp] of toastHistory.entries()) {
                if (now - timestamp > 10000) {
                    toastHistory.delete(msg);
                }
            }
        }

        // Fermer avec Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('custom-popup').classList.contains('active')) {
                closePopup(false);
            }
        });

        // Alert custom (juste OK, pas de Annuler)
        function customAlert(title, message) {
            return new Promise((resolve) => {
                document.getElementById('popup-title').innerHTML = title;
                document.getElementById('popup-message').innerHTML = message;

                const popup = document.getElementById('custom-popup');
                const confirmBtn = document.getElementById('popup-confirm-btn');

                // Masquer le bouton Annuler
                const cancelBtn = popup.querySelector('.cancel');
                cancelBtn.style.display = 'none';

                // Bouton OK bleu
                confirmBtn.className = 'custom-popup-btn confirm';
                confirmBtn.textContent = 'OK';
                confirmBtn.onclick = () => {
                    popup.classList.remove('active');
                    cancelBtn.style.display = 'block'; // Restaurer pour les autres pop-ups
                    document.body.style.overflow = '';
                    resolve(true);
                };

                popup.classList.add('active');
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    updateIcons();
                }, 0);
            });
        }

        // Prompt custom
        let promptResolve = null;

        function customPrompt(title, message, defaultValue = '') {
            console.log('customPrompt function called with:', title, message);
            return new Promise((resolve) => {
                promptResolve = resolve;

                const promptEl = document.getElementById('custom-prompt');
                console.log('prompt element found:', !!promptEl);

                document.getElementById('prompt-title').textContent = title;
                document.getElementById('prompt-message').textContent = message;
                document.getElementById('prompt-input').value = defaultValue;

                promptEl.classList.add('active');
                console.log('prompt classList:', promptEl.classList.toString());
                document.body.style.overflow = 'hidden';

                // Focus sur l'input
                setTimeout(() => {
                    document.getElementById('prompt-input').focus();
                }, 100);
            });
        }

        function closePrompt(result) {
            document.getElementById('custom-prompt').classList.remove('active');
            document.body.style.overflow = '';
            if (promptResolve) {
                promptResolve(result);
                promptResolve = null;
            }
        }

        // Soumettre avec Entrée
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.getElementById('custom-prompt').classList.contains('active')) {
                closePrompt(document.getElementById('prompt-input').value);
            }
        });



        // ===== TEMPLATE FOOD MANAGEMENT FUNCTIONS =====
        // Create Fuse instance once for food selection (performance optimization)
        let foodSelectionFuse = null;

        function getFoodSelectionFuse() {
            if (!foodSelectionFuse && window.foodDatabase) {
                foodSelectionFuse = new Fuse(window.foodDatabase, {
                    keys: ['name'],
                    threshold: 0.3,
                    distance: 100,
                    minMatchCharLength: 2,
                    includeScore: true
                });
            }
            return foodSelectionFuse;
        }

        // Debounce for search input to avoid blocking main thread
        let filterFoodDebounceTimer = null;
        function debouncedFilterFoodSelection(query) {
            clearTimeout(filterFoodDebounceTimer);
            filterFoodDebounceTimer = setTimeout(() => {
                filterFoodSelection(query);
            }, 180); // 180ms debounce as requested (150-200ms range)
        }

        // Note: Optimisation Lucide déplacée en haut du fichier (fonction updateIcons)

        // Helper functions for template food management (MUST be defined before openSmartTemplateModal)
        window.renderTemplateFoods = function() {
            const container = document.getElementById('smart-template-foods-list');
            if (!container) {
                console.error('Container smart-template-foods-list not found');
                return;
            }

            console.log('renderTemplateFoods called, templateFoodsData:', window.templateFoodsData);

            if (!window.templateFoodsData || window.templateFoodsData.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: var(--space-xl); color: var(--text-secondary); background: var(--bg-tertiary); border-radius: var(--radius-md);">
                        <p>Aucun aliment ajouté. Cliquez sur "Ajouter un aliment" pour commencer.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = window.templateFoodsData.map((food, index) => `
                <div style="background: var(--bg-tertiary); padding: var(--space-md); border-radius: var(--radius-md);">
                    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto; gap: var(--space-sm); align-items: end;">
                        <div>
                            <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.85rem;">
                                Nom de l'aliment
                            </label>
                            <input type="text" value="${food.foodName || ''}"
                                   onchange="window.templateFoodsData[${index}].foodName = this.value"
                                   placeholder="ex: Poulet rôti"
                                   style="width: 100%; padding: var(--space-sm); background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.85rem;">
                                Rôle
                            </label>
                            <select onchange="window.templateFoodsData[${index}].role = this.value"
                                    style="width: 100%; padding: var(--space-sm); background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                                <option value="protein" ${food.role === 'protein' ? 'selected' : ''}>Protéine</option>
                                <option value="carb" ${food.role === 'carb' ? 'selected' : ''}>Glucide</option>
                                <option value="fat" ${food.role === 'fat' ? 'selected' : ''}>Lipide</option>
                                <option value="fiber" ${food.role === 'fiber' ? 'selected' : ''}>Fibre</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.85rem;">
                                Min (g)
                            </label>
                            <input type="number" value="${food.min || 0}"
                                   onchange="window.templateFoodsData[${index}].min = parseInt(this.value)"
                                   min="0"
                                   style="width: 100%; padding: var(--space-sm); background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.85rem;">
                                Max (g)
                            </label>
                            <input type="number" value="${food.max || 0}"
                                   onchange="window.templateFoodsData[${index}].max = parseInt(this.value)"
                                   min="0"
                                   style="width: 100%; padding: var(--space-sm); background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: var(--space-xs); color: var(--text-secondary); font-size: 0.85rem;">
                                Priorité
                            </label>
                            <input type="number" value="${food.priority || index + 1}"
                                   onchange="window.templateFoodsData[${index}].priority = parseInt(this.value)"
                                   min="1"
                                   style="width: 100%; padding: var(--space-sm); background: var(--bg-primary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                        </div>
                        <div>
                            <button type="button" onclick="removeTemplateFood(${index})" class="delete-btn" title="Supprimer">
                                <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            // Optimize: create icons only in this container
            updateIcons(container);
        };

        // Food selection modal helpers
        window.closeFoodSelectionModal = function() {
            const modal = document.getElementById('food-selection-modal');
            if (modal) modal.remove();

            // Refresh the main template modal to show added foods
            renderTemplateFoods();
        };

        window.renderSelectedFoodsPreview = function() {
            const container = document.getElementById('selected-foods-preview');
            if (!container) return;

            const selectedFoods = window.templateFoodsData || [];

            if (selectedFoods.length === 0) {
                container.innerHTML = '';
                return;
            }

            container.innerHTML = `
                <div style="background: var(--bg-secondary); padding: var(--space-md); border-radius: var(--radius-md); border: 1px solid rgba(56, 189, 248, 0.3);">
                    <div style="font-size: 0.9rem; font-weight: 600; color: var(--accent-main); margin-bottom: var(--space-sm); display: flex; align-items: center; gap: var(--space-xs);">
                        <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
                        Aliments déjà ajoutés (${selectedFoods.length})
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: var(--space-xs);">
                        ${selectedFoods.map((food, index) => `
                            <div style="display: inline-flex; align-items: center; gap: var(--space-xs); background: var(--bg-tertiary); padding: 4px 8px; border-radius: var(--radius-sm); font-size: 0.85rem;">
                                <span style="color: var(--text-primary);">${food.foodName}</span>
                                <button type="button" onclick="removeTemplateFoodFromModal(${index})"
                                        style="background: none; border: none; color: var(--accent-danger); cursor: pointer; padding: 0; display: flex; align-items: center;"
                                        title="Retirer">
                                    <i data-lucide="x" style="width: 14px; height: 14px;"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            // Optimize: create icons only in this container
            updateIcons(container);
        };

        window.removeTemplateFoodFromModal = function(index) {
            window.templateFoodsData.splice(index, 1);
            // Recalculate priorities
            window.templateFoodsData.forEach((food, i) => {
                food.priority = i + 1;
            });
            // Update preview in modal
            renderSelectedFoodsPreview();
            // Update main modal list (if visible)
            renderTemplateFoods();
        };

        window.renderFoodSelectionList = function(foods) {
            console.time('renderSuggestions');

            const container = document.getElementById('food-selection-list');
            if (!container) {
                console.timeEnd('renderSuggestions');
                return;
            }

            if (!foods || foods.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: var(--space-xl); color: var(--text-secondary);">
                        Aucun aliment trouvé
                    </div>
                `;
                console.timeEnd('renderSuggestions');
                return;
            }

            // Limiter à 30 résultats max (optimisation perf - range 25-40)
            const limitedFoods = foods.length > 30 ? foods.slice(0, 30) : foods;

            // Trier par ordre alphabétique
            const sortedFoods = [...limitedFoods].sort((a, b) => a.name.localeCompare(b.name));

            // OPTIMIZATION: Event delegation instead of inline onclick (1 handler vs 30)
            container.innerHTML = sortedFoods.map(food => {
                const verifiedBadge = food.verified
                    ? ' <span style="color: #10b981; font-size: 0.85rem;" title="Aliment vérifié">✓</span>'
                    : '';

                return `
                    <button type="button" data-food-name="${food.name}" class="food-selection-item">
                        <div style="font-weight: 500; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            ${food.name}${verifiedBadge}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            P: ${food.protein}g · G: ${food.carbs}g · L: ${food.fat}g · ${food.calories} kcal
                        </div>
                    </button>
                `;
            }).join('');

            console.timeEnd('renderSuggestions');
            // NO createIcons() call here - hover must be pure CSS
        };

        window.filterFoodSelection = function(query) {
            const container = document.getElementById('food-selection-list');
            if (!container) return;

            const allFoods = window.foodDatabase || [];

            // Afficher un message si la recherche est vide ou trop courte
            if (!query || query.trim().length < 2) {
                container.innerHTML = `
                    <div style="text-align: center; padding: var(--space-xl); color: var(--text-secondary);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto var(--space-md); opacity: 0.5; display: block;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <p style="font-size: 1.1rem; margin-bottom: var(--space-xs);">Recherchez un aliment</p>
                        <p style="font-size: 0.9rem; opacity: 0.7;">Tapez au moins 2 caractères pour afficher les résultats</p>
                    </div>
                `;
                // NO createIcons() - use inline SVG instead
                return;
            }

            // Utiliser Fuse.js pour la recherche fuzzy (trouve "pâtes" avec "pate")
            const fuse = getFoodSelectionFuse();
            if (!fuse) {
                console.error('Fuse instance not initialized');
                return;
            }

            const results = fuse.search(query);
            const filtered = results.map(result => result.item);

            // Limiter à 30 résultats max pour éviter la lenteur (range 25-40)
            const limited = filtered.slice(0, 30);

            // Afficher un avertissement si il y a plus de 30 résultats
            if (filtered.length > 30) {
                console.log(`⚠️ ${filtered.length} résultats trouvés, affichage des 30 premiers seulement`);
            }

            renderFoodSelectionList(limited);
        };

        window.selectFoodForTemplate = function(foodName) {
            const food = (window.foodDatabase || []).find(f => f.name === foodName);
            if (!food) {
                console.error('Aliment non trouvé:', foodName);
                return;
            }

            // Déterminer le rôle principal de l'aliment basé sur ses macros
            let role = 'protein';
            if (food.protein >= food.carbs && food.protein >= food.fat) {
                role = 'protein';
            } else if (food.carbs > food.protein && food.carbs >= food.fat) {
                role = 'carb';
            } else if (food.fat > food.protein && food.fat > food.carbs) {
                role = 'fat';
            }

            // Check if food already exists
            const existingFood = window.templateFoodsData.find(f => f.foodName === food.name);
            if (existingFood) {
                // Don't add duplicate, just update preview
                renderSelectedFoodsPreview();
                return;
            }

            // Ajouter l'aliment au template
            window.templateFoodsData.push({
                foodName: food.name,
                role: role,
                min: 100,
                max: 300,
                priority: window.templateFoodsData.length + 1
            });

            // Batch updates with RAF to avoid blocking
            requestAnimationFrame(() => {
                // Update preview in modal to show newly added food
                renderSelectedFoodsPreview();

                // Re-render la liste des aliments du template (dans le modal principal)
                renderTemplateFoods();

                // Clear search to allow adding more foods easily
                const searchInput = document.getElementById('food-selection-search');
                if (searchInput) {
                    searchInput.value = '';
                    filterFoodSelection(''); // Reset to initial state
                    searchInput.focus(); // Keep focus for adding more foods
                }
            });
        };

        window.addTemplateFood = function() {
            if (!window.templateFoodsData) window.templateFoodsData = [];

            // Ouvrir un modal de sélection d'aliments depuis foodDatabase
            const modalHtml = `
                <div id="food-selection-modal" class="modal active" style="z-index: 10001;">
                    <div class="modal-content" style="max-width: 700px; max-height: 80vh; display: flex; flex-direction: column;">
                        <div class="modal-header">
                            <h2 class="modal-title">Sélectionner un aliment</h2>
                            <button class="modal-close" onclick="closeFoodSelectionModal()">×</button>
                        </div>
                        <div class="modal-body" style="flex: 1; overflow: hidden; display: flex; flex-direction: column;">
                            <!-- Aliments déjà ajoutés -->
                            <div id="selected-foods-preview" style="margin-bottom: var(--space-md);">
                                <!-- Will be filled by renderSelectedFoodsPreview() -->
                            </div>

                            <!-- Recherche -->
                            <div style="margin-bottom: var(--space-md);">
                                <input type="text" id="food-selection-search" placeholder="Rechercher un aliment..."
                                       oninput="debouncedFilterFoodSelection(this.value)"
                                       style="width: 100%; padding: var(--space-sm); background: var(--bg-tertiary); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-sm); color: var(--text-primary);">
                            </div>

                            <!-- Liste d'aliments -->
                            <div id="food-selection-list" style="flex: 1; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; gap: var(--space-xs);">
                                <!-- Foods will be rendered here -->
                            </div>
                        </div>

                        <!-- Footer avec bouton Terminé -->
                        <div class="modal-footer" style="padding: var(--space-md); border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: flex-end;">
                            <button type="button" onclick="closeFoodSelectionModal()" class="btn" style="background: var(--accent-main); color: white; display: flex; align-items: center; gap: var(--space-xs);">
                                <i data-lucide="check" style="width: 16px; height: 16px;"></i>
                                Terminé
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Supprimer modal existant si présent
            const existing = document.getElementById('food-selection-modal');
            if (existing) existing.remove();

            document.body.insertAdjacentHTML('beforeend', modalHtml);

            // Afficher les aliments déjà sélectionnés
            renderSelectedFoodsPreview();

            // Ne rien afficher au début (recherche obligatoire pour éviter de charger 159 aliments)
            const container = document.getElementById('food-selection-list');
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; padding: var(--space-xl); color: var(--text-secondary);">
                        <i data-lucide="search" style="width: 48px; height: 48px; margin: 0 auto var(--space-md); opacity: 0.5;"></i>
                        <p style="font-size: 1.1rem; margin-bottom: var(--space-xs);">Recherchez un aliment</p>
                        <p style="font-size: 0.9rem; opacity: 0.7;">Tapez au moins 2 caractères pour afficher les résultats</p>
                    </div>
                `;
            }

            // OPTIMIZATION: Pass modal container to updateIcons instead of parsing entire DOM
            const modal = document.getElementById('food-selection-modal');
            if (typeof updateIcons === 'function') {
                updateIcons(modal);
            }

            // OPTIMIZATION: Event delegation for food selection (1 listener vs 30 inline onclick)
            if (container) {
                container.addEventListener('click', (e) => {
                    const button = e.target.closest('.food-selection-item');
                    if (button && button.dataset.foodName) {
                        selectFoodForTemplate(button.dataset.foodName);
                    }
                });
            }

            // Focus sur le champ de recherche
            setTimeout(() => {
                const searchInput = document.getElementById('food-selection-search');
                if (searchInput) searchInput.focus();
            }, 100);
        };

        window.removeTemplateFood = function(index) {
            window.templateFoodsData.splice(index, 1);
            // Recalculate priorities
            window.templateFoodsData.forEach((food, i) => {
                food.priority = i + 1;
            });
            renderTemplateFoods();
        };
