// NutriTrack v2 - Main Application JavaScript
// Gestion complète de l'application de suivi nutritionnel

        // Food database
        const foodDatabase = [{"name": "Amandes","unit": "100g","protein": 21.0,"carbs": 22.0,"fat": 49.0,"calories": 575.0,"category": "matieres-grasses"},{"name": "Andouillette Super U","unit": "100g","protein": 19.0,"carbs": 0.3,"fat": 16.0,"calories": 222.0,"category": "proteines"},{"name": "Avocat","unit": "100g","protein": 2.0,"carbs": 3.5,"fat": 22.0,"calories": 220.0,"category": "fruits"},{"name": "Baked beans","unit": "100g","protein": 8.4,"carbs": 13.0,"fat": 0.8,"calories": 93.0,"category": "feculents"},{"name": "Banane","unit": "100g","protein": 1.5,"carbs": 20.0,"fat": 0.0,"calories": 86.0,"category": "fruits"},{"name": "Beurre","unit": "100g","protein": 0.7,"carbs": 0.5,"fat": 80.0,"calories": 725.0,"category": "matieres-grasses"},{"name": "Bière","unit": "100ml","protein": 0.4,"carbs": 4.0,"fat": 0.0,"calories": 46.0,"category": "liquides"},{"name": "Blanc d'œuf","unit": "1u","protein": 10.3,"carbs": 1.12,"fat": 0.0,"calories": 47.3,"category": "proteines"},{"name": "Blanc d'œuf cru","unit": "100g","protein": 11.0,"carbs": 0.7,"fat": 0.2,"calories": 52.0,"category": "proteines"},{"name": "Blanc de dinde","unit": "100g","protein": 18.0,"carbs": 3.0,"fat": 3.0,"calories": 111.0,"category": "proteines"},{"name": "Blanc de poulet carrefour","unit": "100g","protein": 20.0,"carbs": 0.9,"fat": 3.2,"calories": 112.0,"category": "proteines"},{"name": "Blanc de poulet Ranou doré au four","unit": "100g","protein": 20.8,"carbs": 1.2,"fat": 1.8,"calories": 103.0,"category": "proteines"},{"name": "Blé Saint eloi","unit": "100g","protein": 12.7,"carbs": 71.0,"fat": 1.8,"calories": 362.0,"category": "feculents"},{"name": "Bolognaise maison","unit": "100g","protein": 5.9,"carbs": 3.9,"fat": 4.1,"calories": 77.0,"category": "proteines"},{"name": "Boulgour","unit": "100g","protein": 12.0,"carbs": 75.0,"fat": 1.5,"calories": 340.0,"category": "feculents"},{"name": "Broccolis","unit": "100g","protein": 1.9,"carbs": 2.2,"fat": 0.0,"calories": 24.0,"category": "legumes"},{"name": "Brocoli","unit": "100g","protein": 2.8,"carbs": 7.0,"fat": 0.3,"calories": 34.0,"category": "legumes"},{"name": "Bœuf","unit": "100g","protein": 22.0,"carbs": 0.0,"fat": 7.0,"calories": 151.0,"category": "proteines"},{"name": "Cabillaud","unit": "100g","protein": 18.0,"carbs": 0.0,"fat": 0.7,"calories": 82.0,"category": "proteines"},{"name": "Carotte","unit": "100g","protein": 0.9,"carbs": 10.0,"fat": 0.2,"calories": 41.0,"category": "legumes"},{"name": "Carotte fraiche","unit": "100g","protein": 1.0,"carbs": 6.4,"fat": 0.3,"calories": 30.0,"category": "legumes"},{"name": "Champignon de paris","unit": "100g","protein": 2.3,"carbs": 0.6,"fat": 0.5,"calories": 15.0,"category": "legumes"},{"name": "Cheddar","unit": "100g","protein": 24.0,"carbs": 1.3,"fat": 34.0,"calories": 403.0,"category": "produits-laitiers"},{"name": "Chicorée","unit": "100g","protein": 0.9,"carbs": 0.7,"fat": 0.1,"calories": 8.0,"category": "legumes"},{"name": "Chocolat au lait","unit": "100g","protein": 8.0,"carbs": 51.0,"fat": 32.0,"calories": 535.0,"category": "autres"},{"name": "Chocolat noir 70%","unit": "100g","protein": 6.1,"carbs": 45.0,"fat": 35.0,"calories": 531.0,"category": "autres"},{"name": "Chou-fleur","unit": "100g","protein": 1.9,"carbs": 5.0,"fat": 0.3,"calories": 25.0,"category": "legumes"},{"name": "Citron","unit": "100g","protein": 1.1,"carbs": 9.0,"fat": 0.3,"calories": 29.0,"category": "fruits"},{"name": "Coca-Cola","unit": "100ml","protein": 0.0,"carbs": 10.6,"fat": 0.0,"calories": 42.0,"category": "liquides"},{"name": "Colin","unit": "100g","protein": 18.0,"carbs": 0.0,"fat": 0.6,"calories": 80.0,"category": "proteines"},{"name": "Concombre","unit": "100g","protein": 0.6,"carbs": 3.6,"fat": 0.1,"calories": 15.0,"category": "legumes"},{"name": "Coquillettes","unit": "100g","protein": 12.0,"carbs": 71.0,"fat": 1.5,"calories": 350.0,"category": "feculents"},{"name": "Courgette","unit": "100g","protein": 1.2,"carbs": 3.1,"fat": 0.3,"calories": 17.0,"category": "legumes"},{"name": "Crème Fraiche 4%","unit": "100g","protein": 3.3,"carbs": 4.3,"fat": 4.0,"calories": 70.0,"category": "produits-laitiers"},{"name": "Crème fraîche 15%","unit": "100g","protein": 2.6,"carbs": 3.3,"fat": 15.0,"calories": 165.0,"category": "produits-laitiers"},{"name": "Crème fraîche 30%","unit": "100g","protein": 2.2,"carbs": 3.3,"fat": 30.0,"calories": 292.0,"category": "produits-laitiers"},{"name": "Emmental râpé","unit": "100g","protein": 28.0,"carbs": 1.4,"fat": 30.0,"calories": 382.0,"category": "produits-laitiers"},{"name": "Endives","unit": "100g","protein": 0.9,"carbs": 2.4,"fat": 0.1,"calories": 15.0,"category": "legumes"},{"name": "Filet de poulet carrefour","unit": "100g","protein": 23.0,"carbs": 0.6,"fat": 1.2,"calories": 107.0,"category": "proteines"},{"name": "Flocons d'avoine","unit": "100g","protein": 13.0,"carbs": 66.0,"fat": 7.0,"calories": 380.0,"category": "feculents"},{"name": "Fraise","unit": "100g","protein": 0.7,"carbs": 7.7,"fat": 0.3,"calories": 32.0,"category": "fruits"},{"name": "Frites au four","unit": "100g","protein": 3.3,"carbs": 21.0,"fat": 4.7,"calories": 142.0,"category": "feculents"},{"name": "Fromage blanc 0%","unit": "100g","protein": 8.0,"carbs": 4.0,"fat": 0.0,"calories": 48.0,"category": "produits-laitiers"},{"name": "Fromage blanc 3%","unit": "100g","protein": 7.5,"carbs": 3.5,"fat": 3.0,"calories": 75.0,"category": "produits-laitiers"},{"name": "Haricots rouges secs","unit": "100g","protein": 22.0,"carbs": 45.0,"fat": 1.5,"calories": 290.0,"category": "feculents"},{"name": "Haricots verts","unit": "100g","protein": 1.8,"carbs": 7.0,"fat": 0.2,"calories": 31.0,"category": "legumes"},{"name": "Huile d'olive","unit": "100g","protein": 0.0,"carbs": 0.0,"fat": 100.0,"calories": 900.0,"category": "matieres-grasses"},{"name": "Jambon blanc","unit": "100g","protein": 21.0,"carbs": 1.2,"fat": 3.0,"calories": 115.0,"category": "proteines"},{"name": "Jambon cru","unit": "100g","protein": 26.0,"carbs": 0.5,"fat": 12.0,"calories": 215.0,"category": "proteines"},{"name": "Ketchup","unit": "100g","protein": 1.0,"carbs": 25.0,"fat": 0.1,"calories": 101.0,"category": "autres"},{"name": "Kiwi","unit": "100g","protein": 1.1,"carbs": 15.0,"fat": 0.5,"calories": 61.0,"category": "fruits"},{"name": "Lait demi-écrémé","unit": "100g","protein": 3.4,"carbs": 4.8,"fat": 1.6,"calories": 47.0,"category": "produits-laitiers"},{"name": "Lait entier","unit": "100ml","protein": 3.3,"carbs": 4.8,"fat": 3.5,"calories": 64.0,"category": "produits-laitiers"},{"name": "Lentilles cuites","unit": "100g","protein": 9.0,"carbs": 17.0,"fat": 0.4,"calories": 116.0,"category": "feculents"},{"name": "Lentilles sèches","unit": "100g","protein": 24.0,"carbs": 50.0,"fat": 1.0,"calories": 315.0,"category": "feculents"},{"name": "Mayonnaise","unit": "100g","protein": 1.1,"carbs": 0.6,"fat": 79.0,"calories": 718.0,"category": "matieres-grasses"},{"name": "Maïs doux en conserve","unit": "100g","protein": 2.9,"carbs": 19.0,"fat": 1.2,"calories": 86.0,"category": "feculents"},{"name": "Miel","unit": "100g","protein": 0.3,"carbs": 82.0,"fat": 0.0,"calories": 304.0,"category": "autres"},{"name": "Moutarde","unit": "100g","protein": 7.0,"carbs": 6.0,"fat": 10.0,"calories": 143.0,"category": "autres"},{"name": "Mozzarella","unit": "100g","protein": 18.0,"carbs": 2.2,"fat": 20.0,"calories": 280.0,"category": "produits-laitiers"},{"name": "Mâche","unit": "100g","protein": 2.0,"carbs": 0.7,"fat": 0.4,"calories": 21.0,"category": "legumes"},{"name": "Noix","unit": "100g","protein": 15.0,"carbs": 14.0,"fat": 65.0,"calories": 654.0,"category": "matieres-grasses"},{"name": "Oignon","unit": "100g","protein": 1.1,"carbs": 7.1,"fat": 0.1,"calories": 40.0,"category": "legumes"},{"name": "Orange","unit": "100g","protein": 0.9,"carbs": 12.0,"fat": 0.1,"calories": 47.0,"category": "fruits"},{"name": "Pain blanc","unit": "100g","protein": 8.0,"carbs": 49.0,"fat": 3.2,"calories": 265.0,"category": "feculents"},{"name": "Pain complet","unit": "100g","protein": 9.0,"carbs": 41.0,"fat": 3.5,"calories": 247.0,"category": "feculents"},{"name": "Parmesan","unit": "100g","protein": 36.0,"carbs": 3.2,"fat": 26.0,"calories": 392.0,"category": "produits-laitiers"},{"name": "Patate douce crue","unit": "100g","protein": 1.6,"carbs": 20.0,"fat": 0.1,"calories": 86.0,"category": "feculents"},{"name": "Petits pois en conserve","unit": "100g","protein": 5.4,"carbs": 10.0,"fat": 0.4,"calories": 69.0,"category": "feculents"},{"name": "Poire","unit": "100g","protein": 0.4,"carbs": 15.0,"fat": 0.1,"calories": 57.0,"category": "fruits"},{"name": "Poireau","unit": "100g","protein": 1.5,"carbs": 3.9,"fat": 0.3,"calories": 27.0,"category": "legumes"},{"name": "Pois chiches cuits","unit": "100g","protein": 8.9,"carbs": 27.4,"fat": 2.6,"calories": 164.0,"category": "feculents"},{"name": "Pois chiches secs","unit": "100g","protein": 19.0,"carbs": 55.0,"fat": 6.0,"calories": 360.0,"category": "feculents"},{"name": "Poivron","unit": "100g","protein": 1.0,"carbs": 6.0,"fat": 0.3,"calories": 26.0,"category": "legumes"},{"name": "Pomme","unit": "100g","protein": 0.3,"carbs": 14.0,"fat": 0.2,"calories": 52.0,"category": "fruits"},{"name": "Pomme de terre","unit": "100g","protein": 2.0,"carbs": 17.0,"fat": 0.1,"calories": 77.0,"category": "feculents"},{"name": "Pommes de terre crues","unit": "100g","protein": 2.0,"carbs": 17.0,"fat": 0.1,"calories": 77.0,"category": "feculents"},{"name": "Poulet rôti","unit": "100g","protein": 27.0,"carbs": 0.0,"fat": 14.0,"calories": 239.0,"category": "proteines"},{"name": "Purée de tomate","unit": "100g","protein": 4.3,"carbs": 18.0,"fat": 0.5,"calories": 82.0,"category": "legumes"},{"name": "Pâtes","unit": "100g","protein": 13.0,"carbs": 71.0,"fat": 1.5,"calories": 371.0,"category": "feculents"},{"name": "Pâtes blanches sèches","unit": "100g","protein": 12.0,"carbs": 72.0,"fat": 1.5,"calories": 355.0,"category": "feculents"},{"name": "Quinoa cuit","unit": "100g","protein": 4.4,"carbs": 21.3,"fat": 1.9,"calories": 120.0,"category": "feculents"},{"name": "Quinoa sec","unit": "100g","protein": 14.0,"carbs": 64.0,"fat": 6.0,"calories": 365.0,"category": "feculents"},{"name": "Raisin","unit": "100g","protein": 0.7,"carbs": 17.0,"fat": 0.2,"calories": 69.0,"category": "fruits"},{"name": "Ratatouille en boite D'aucy","unit": "100g","protein": 0.9,"carbs": 4.8,"fat": 1.7,"calories": 39.0,"category": "legumes"},{"name": "Riz basmati cuit","unit": "100g","protein": 3.5,"carbs": 25.0,"fat": 0.9,"calories": 121.0,"category": "feculents"},{"name": "Riz blanc cuit","unit": "100g","protein": 2.7,"carbs": 28.0,"fat": 0.3,"calories": 130.0,"category": "feculents"},{"name": "Riz blanc sec","unit": "100g","protein": 8.0,"carbs": 77.0,"fat": 1.0,"calories": 350.0,"category": "feculents"},{"name": "Riz complet cuit","unit": "100g","protein": 2.6,"carbs": 23.0,"fat": 0.9,"calories": 111.0,"category": "feculents"},{"name": "Salade verte","unit": "100g","protein": 1.4,"carbs": 1.8,"fat": 0.2,"calories": 15.0,"category": "legumes"},{"name": "Sarrasin","unit": "100g","protein": 13.0,"carbs": 71.0,"fat": 3.0,"calories": 340.0,"category": "feculents"},{"name": "Saumon frais","unit": "100g","protein": 20.0,"carbs": 0.0,"fat": 13.0,"calories": 208.0,"category": "proteines"},{"name": "Saumon fumé","unit": "100g","protein": 21.0,"carbs": 0.0,"fat": 14.0,"calories": 208.0,"category": "proteines"},{"name": "Seitan","unit": "100g","protein": 25.0,"carbs": 5.0,"fat": 2.0,"calories": 145.0,"category": "proteines"},{"name": "Semoule Couscous","unit": "100g","protein": 12.0,"carbs": 72.0,"fat": 0.6,"calories": 376.0,"category": "feculents"},{"name": "Semoule de blé","unit": "100g","protein": 12.0,"carbs": 73.0,"fat": 1.0,"calories": 355.0,"category": "feculents"},{"name": "skyr nature","unit": "100g","protein": 11.0,"carbs": 4.0,"fat": 0.2,"calories": 63.0,"category": "produits-laitiers"},{"name": "skyr Stracciatella Siggi's","unit": "100g","protein": 10.0,"carbs": 10.0,"fat": 2.0,"calories": 98.0,"category": "produits-laitiers"},{"name": "Steak haché 10% MG","unit": "100g","protein": 20.0,"carbs": 0.0,"fat": 10.0,"calories": 176.0,"category": "proteines"},{"name": "Steak haché 12% MG","unit": "100g","protein": 19.0,"carbs": 0.0,"fat": 12.0,"calories": 196.0,"category": "proteines"},{"name": "Steak haché 15%","unit": "100g","protein": 19.0,"carbs": 0.0,"fat": 15.0,"calories": 227.0,"category": "proteines"},{"name": "Steak haché 15% MG","unit": "100g","protein": 18.0,"carbs": 0.0,"fat": 15.0,"calories": 215.0,"category": "proteines"},{"name": "Steak haché 20% MG","unit": "100g","protein": 17.0,"carbs": 0.0,"fat": 20.0,"calories": 254.0,"category": "proteines"},{"name": "Steak haché 5%","unit": "100g","protein": 21.0,"carbs": 0.0,"fat": 5.0,"calories": 137.0,"category": "proteines"},{"name": "Steak haché 5% MG","unit": "100g","protein": 21.0,"carbs": 0.0,"fat": 5.0,"calories": 126.0,"category": "proteines"},{"name": "Steak haché 8% MG","unit": "100g","protein": 20.0,"carbs": 0.0,"fat": 8.0,"calories": 158.0,"category": "proteines"},{"name": "Steak haché Charal 10%","unit": "100g","protein": 20.0,"carbs": 0.5,"fat": 10.0,"calories": 176.0,"category": "proteines"},{"name": "Thon cru","unit": "100g","protein": 24.0,"carbs": 0.0,"fat": 1.0,"calories": 110.0,"category": "proteines"},{"name": "Thon en conserve au naturel","unit": "100g","protein": 26.0,"carbs": 0.0,"fat": 1.0,"calories": 116.0,"category": "proteines"},{"name": "Tofu nature","unit": "100g","protein": 12.0,"carbs": 2.0,"fat": 6.0,"calories": 115.0,"category": "proteines"},{"name": "Tomate","unit": "100g","protein": 0.9,"carbs": 3.9,"fat": 0.2,"calories": 18.0,"category": "legumes"},{"name": "Yaourt grec","unit": "100g","protein": 10.0,"carbs": 3.6,"fat": 5.0,"calories": 97.0,"category": "produits-laitiers"},{"name": "Yaourt nature","unit": "100g","protein": 3.5,"carbs": 4.0,"fat": 1.0,"calories": 61.0,"category": "produits-laitiers"},{"name": "Épinards","unit": "100g","protein": 2.9,"carbs": 3.6,"fat": 0.4,"calories": 23.0,"category": "legumes"},{"name": "Œuf entier","unit": "1u","protein": 6.3,"carbs": 0.6,"fat": 5.3,"calories": 78.0,"category": "proteines"},{"name": "Œuf entier cru","unit": "100g","protein": 13.0,"carbs": 1.0,"fat": 11.0,"calories": 155.0,"category": "proteines"}];

        // State management
        let dailyMeals = {
            breakfast: { foods: [], recipe: '' },
            lunch: { foods: [], recipe: '' },
            snack: { foods: [], recipe: '' },
            dinner: { foods: [], recipe: '' },
            water: 0
        };

        let weeklyPlan = {};
        let currentWeekStart = getMonday(new Date());

        function getMonday(d) {
            const date = new Date(d);
            const day = date.getDay();
            const diff = date.getDate() - day + (day === 0 ? -6 : 1);
            return new Date(date.setDate(diff));
        } // Dec 16, 2024
        let currentGoal = 'cut';
        let currentMealType = null;

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
                if (!content.classList.contains('open')) {
                    content.style.maxHeight = '0';
                    content.style.overflow = 'hidden';
                }
            } else {
                toggle.style.display = 'none';
                content.classList.remove('open');
                content.style.maxHeight = 'none';
                content.style.overflow = 'visible';
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
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function closeMobileDrawer() {
            const drawer = document.getElementById('mobile-drawer');
            const overlay = document.getElementById('mobile-drawer-overlay');
            drawer.classList.remove('active');
            overlay.classList.remove('active');
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

            // Désactiver tous les onglets
            document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Activer l'onglet ciblé
            const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
            const targetContent = document.getElementById(tabName);

            if (targetBtn && targetContent) {
                targetBtn.classList.add('active');
                targetContent.classList.add('active');

                // Actions spécifiques par onglet
                if (tabName === 'planner') {
                    renderWeeklyPlan();
                } else if (tabName === 'tracking')  { renderTrackingList(); }

                // Scroll vers le haut
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
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

            document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Activer le bouton sidebar s'il existe
            const sidebarBtn = document.querySelector(`[data-tab="${tab}"]`);
            if (sidebarBtn)  { sidebarBtn.classList.add('active'); }

            // Activer le tab content
            const tabContent = document.getElementById(tab);
            if (tabContent)  { tabContent.classList.add('active'); }

            if (tab === 'home') { if (typeof updateHomeTab === 'function') updateHomeTab(); }
            else if (tab === 'planner')  { renderWeeklyPlan(); } else if (tab === 'tracking')  { renderTrackingList(); } else if (tab === 'meal-templates')  { renderMealTemplatesList(); } else if (tab === 'settings')  { if (typeof updateSettingsStats === 'function') updateSettingsStats(); }

            // Scroll to top
            window.scrollTo({top: 0, behavior: 'smooth'});
        }

        // Goal selection
        function checkFatWarning(value, type) {
            const fatValue = parseFloat(value);
            const warningId = type === 'cut' ? 'fat-warning-cut' : 'fat-warning-bulk';
            const warningElement = document.getElementById(warningId);

            if (fatValue > 1.2) { warningElement.style.display = 'block'; } else  { warningElement.style.display = 'none'; }
        }

        function selectGoal(goal) {
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

            // Sauvegarder le goal
            localStorage.setItem('calc_goal', goal);

            // Si en mode guidé, réappliquer le rythme sélectionné
            const guidedMode = document.getElementById('guided-mode');
            const isGuidedMode = guidedMode && guidedMode.style.display !== 'none';

            if (isGuidedMode) {
                const selectedPaceBtn = document.querySelector('.pace-btn.active');
                if (selectedPaceBtn) {
                    const pace = selectedPaceBtn.getAttribute('data-pace');
                    if (pace && typeof window.selectPace === 'function') {
                        // Réappliquer le rythme avec le nouvel objectif
                        window.selectPace(pace);
                    }
                }
            } else {
                // En mode avancé, juste revalider
                validateMacroInputs();
            }
        }

        // Sélection du rythme en mode guidé
        window.selectPace = function(pace) {
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
                }
            };

            const settings = paceSettings[pace];

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

            // Sauvegarder le rythme sélectionné
            localStorage.setItem('selectedPace', pace);

            // Calculer automatiquement les macros
            setTimeout(() => {
                if (typeof calculateMacros === 'function') {
                    calculateMacros();
                }
            }, 100);
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

        function calculateMacros() {
            // FEEDBACK VISUEL DU BOUTON
            const btn = document.getElementById('calculate-btn');
            if (btn) {
                btn.innerHTML = '<i data-lucide="loader" style="width: 18px; height: 18px; animation: spin 1s linear infinite;"></i> Calcul en cours...';
                if (typeof lucide !== "undefined") lucide.createIcons();
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
                    if (typeof lucide !== "undefined") lucide.createIcons();
                    btn.disabled = false;
                }
                return;
            }

            const gender = document.getElementById('profile-gender')?.value;
            if (!gender) {
                showProfileAlert('<i data-lucide="x-circle" class="icon-inline"></i> Sexe non sélectionné - Choisis Homme ou Femme'); document.getElementById('profile-gender')?.focus(); document.getElementById('profile-gender')?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                if (btn) {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 18px; height: 18px;"></i> Calculer mes macros';
                    if (typeof lucide !== "undefined") lucide.createIcons();
                    btn.disabled = false;
                }
                return;
            }

            const height = parseFloat(document.getElementById('height')?.value);
            if (!height || height <= 0) {
                showProfileAlert('<i data-lucide="x-circle" class="icon-inline"></i> Taille manquante ou invalide - Entre ta taille en cm'); document.getElementById('height')?.focus(); document.getElementById('height')?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                if (btn) {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 18px; height: 18px;"></i> Calculer mes macros';
                    if (typeof lucide !== "undefined") lucide.createIcons();
                    btn.disabled = false;
                }
                return;
            }

            const weight = parseFloat(document.getElementById('weight')?.value);
            if (!weight || weight <= 0) {
                showProfileAlert('<i data-lucide="x-circle" class="icon-inline"></i> Poids manquant ou invalide - Entre ton poids en kg'); document.getElementById('weight')?.focus(); document.getElementById('weight')?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                if (btn) {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 18px; height: 18px;"></i> Calculer mes macros';
                    if (typeof lucide !== "undefined") lucide.createIcons();
                    btn.disabled = false;
                }
                return;
            }

            const activity = parseFloat(document.getElementById('activity')?.value);
            if (!activity) {
                showProfileAlert('<i data-lucide="x-circle" class="icon-inline"></i> Niveau d\'activité non sélectionné - Choisis ton niveau');
                if (btn) {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 18px; height: 18px;"></i> Calculer mes macros';
                    if (typeof lucide !== "undefined") lucide.createIcons();
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

            // Sauvegarder le profil
            saveProfile();

            // Save initial weight if this is the first calculation (no tracking yet)
            const trackingData = localStorage.getItem('trackingData');
            const hasTracking = trackingData && JSON.parse(trackingData).length > 0;
            if (!hasTracking && !localStorage.getItem('initialWeight'))  { localStorage.setItem('initialWeight', weight); }

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
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; if (typeof lucide !== "undefined") lucide.createIcons(); }
                    document.getElementById('deficit')?.focus();
                    return;
                }
                if (!proteinCoeffInput || proteinCoeffInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Protéines (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; if (typeof lucide !== "undefined") lucide.createIcons(); }
                    document.getElementById('proteinCoeff')?.focus();
                    return;
                }
                if (!fatCoeffInput || fatCoeffInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Lipides (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; if (typeof lucide !== "undefined") lucide.createIcons(); }
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
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; if (typeof lucide !== "undefined") lucide.createIcons(); }
                    document.getElementById('proteinCoeffMaintain')?.focus();
                    return;
                }
                if (!fatCoeffMaintainInput || fatCoeffMaintainInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Lipides (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; if (typeof lucide !== "undefined") lucide.createIcons(); }
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
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; if (typeof lucide !== "undefined") lucide.createIcons(); }
                    document.getElementById('surplus')?.focus();
                    return;
                }
                if (!proteinCoeffBulkInput || proteinCoeffBulkInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Protéines (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; if (typeof lucide !== "undefined") lucide.createIcons(); }
                    document.getElementById('proteinCoeffBulk')?.focus();
                    return;
                }
                if (!fatCoeffBulkInput || fatCoeffBulkInput === '') {
                    showProfileAlert('<i data-lucide="alert-triangle" class="icon-inline"></i> Lipides (g/kg) requis pour calculer les macros');
                    if (btn) { btn.innerHTML = '<i data-lucide="calculator"></i> Calculer mes macros'; btn.disabled = false; if (typeof lucide !== "undefined") lucide.createIcons(); }
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
            if (typeof lucide !== "undefined") lucide.createIcons();

            // Sauvegarder dans localStorage (incluant IMC)
            localStorage.setItem('macroTargets', JSON.stringify({
                protein, carbs, fat, calories: totalCal, bmr: Math.round(bmr), tdee: Math.round(tdee), imc: imc.toFixed(1)
            }));

            // Mettre à jour les sections disponibles
            updateSectionsAvailability();

            // FEEDBACK SUCCÈS DU BOUTON
            if (btn) {
                btn.innerHTML = '<i data-lucide="check" style="width: 22px; height: 22px;"></i> Calcul effectué <i data-lucide="check-circle" class="icon-inline"></i>';
                if (typeof lucide !== "undefined") lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = '<i data-lucide="calculator" style="width: 22px; height: 22px;"></i> Calculer mes Macros';
                    if (typeof lucide !== "undefined") lucide.createIcons();
                    btn.disabled = false;
                    lucide.createIcons();
                }, 2000);
            }


            // MESSAGE DE TRANSITION
            setTimeout(() => {
                showToast('<i data-lucide="check-circle" class="icon-inline"></i> C\'est calculé ! Tu peux maintenant noter tes repas.', 'success');
            }, 2100); // Juste après le feedback du bouton
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
            if (typeof lucide !== 'undefined') lucide.createIcons();

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
                    lucide.createIcons();
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
                    lucide.createIcons();
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

        function saveProfile() {
            const profile = getProfileData();
            localStorage.setItem('userProfile', JSON.stringify(profile));
        }

        function loadProfile() {
            const saved = localStorage.getItem('userProfile');
            if (!saved) { return; }

            const profile = JSON.parse(saved);

            if (profile.birthDay && document.getElementById('birth-day'))  { document.getElementById('birth-day').value = profile.birthDay; }
            if (profile.birthMonth && document.getElementById('birth-month'))  { document.getElementById('birth-month').value = profile.birthMonth; }
            if (profile.birthYear && document.getElementById('birth-year'))  { document.getElementById('birth-year').value = profile.birthYear; }
            if (profile.gender && document.getElementById('profile-gender')) document.getElementById('profile-gender').value = profile.gender;
            if (profile.height && document.getElementById('height')) document.getElementById('height').value = profile.height;
            if (profile.weight && document.getElementById('weight')) document.getElementById('weight').value = profile.weight;
            if (profile.activity && document.getElementById('activity')) document.getElementById('activity').value = profile.activity;
        }

        function calculateMacrosFromProfile() {
            hideProfileAlert();

            const validation = validateProfile();

            if (!validation.valid) {
                const missingFields = validation.errors.join(', ');
                showProfileAlert(`<i data-lucide="alert-triangle" class="icon-inline"></i> Profil incomplet ou invalide : ${missingFields}. Remplis tous les champs obligatoires (*) avec des valeurs correctes.`);
                return;
            }

            // Sauvegarder le profil
            saveProfile();

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

                // Filtrer localement d'abord (résultats immédiats)
                let localResults = foodDatabase.filter(food =>
                    food.name.toLowerCase().includes(query)
                ).slice(0, 10);

                // Afficher les résultats locaux immédiatement
                if (localResults.length > 0) {
                    renderModalSearchResults(localResults);
                }

                // Chercher dans Firestore (avec debounce) - dès 2 caractères
                modalSearchTimeout = setTimeout(async () => {
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
                                fromFirestore: true
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
                        }
                    } else {
                        console.warn('⚠️ [QuickAdd] searchAlimentsCommuns non disponible');
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

        function renderModalSearchResults(foods) {
            const modalSearchResults = document.getElementById('modalSearchResults');
            if (!modalSearchResults) return;

            modalSearchResults.innerHTML = foods.map(food => {
                const displayName = (typeof getDisplayName === 'function') ? getDisplayName(food) : food.name;
                return `
                <div class="search-result-item" onclick='addFoodToMeal(${JSON.stringify(food).replace(/'/g, "&apos;")})'>
                    <div class="search-result-name">${displayName}${food.fromFirestore ? ' <span style="color: var(--accent-main); font-size: 0.75rem;">☁️</span>' : ''}</div>
                    <div class="search-result-macros">
                        P: ${food.protein}g • G: ${food.carbs}g • L: ${food.fat}g • ${food.calories} kcal
                    </div></div>
            `}).join('');
            modalSearchResults.style.display = 'block';
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

            dailyMeals[currentMealType].foods.push({
                ...food,
                id: Date.now(),
                quantity: quantity
            });

            renderMeal(currentMealType);
            updateDayTotals();
            saveDailyMeals();
            syncMealsToPlanning();
            closeFoodModal();
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

            if (query.length < 2) {
                dropdown.style.display = 'none';
                return;
            }

            // Cancel previous timeout
            if (quickAddTimeout) clearTimeout(quickAddTimeout);

            // Filter foods locally first (immediate results)
            const localFiltered = foodDatabase
                .filter(food => food.name.toLowerCase().includes(query.toLowerCase()))
                .sort((a, b) => {
                    const aFav = isFavorite(a.name);
                    const bFav = isFavorite(b.name);
                    if (aFav && !bFav) return -1;
                    if (!aFav && bFav) return 1;
                    return a.name.localeCompare(b.name);
                })
                .slice(0, 10);

            // Display local results immediately
            if (localFiltered.length > 0) {
                renderGlobalQuickAddResults(localFiltered);
            }

            // Search Firestore with debounce
            quickAddTimeout = setTimeout(async () => {
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
                                fromFirestore: true
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
                        }
                    } catch (err) {
                        console.error('❌ [QuickAdd] Erreur Firestore:', err);
                    }
                }
            }, 300);
        }

        function renderGlobalQuickAddResults(foods) {
            const dropdown = getGlobalDropdown();
            if (!dropdown || !currentQuickAddMealType) return;

            dropdown.innerHTML = foods.map(food => {
                const displayName = (typeof getDisplayName === 'function') ? getDisplayName(food) : food.name;
                return `
                <div class="quick-add-item" onclick="quickAddFood('${currentQuickAddMealType}', ${JSON.stringify(food).replace(/"/g, '&quot;')})">
                    <div class="quick-add-item-name">
                        ${isFavorite(food.name) ? '<span class="quick-add-favorite">⭐</span>' : ''}
                        ${displayName}
                        ${food.fromFirestore ? ' <span style="color: var(--accent-main); font-size: 0.75rem;">☁️</span>' : ''}
                    </div>
                    <div class="quick-add-item-macros">
                        P: ${food.protein}g • G: ${food.carbs}g • L: ${food.fat}g • ${food.calories} kcal
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
            const dropdown = getGlobalDropdown();
            if (input) input.value = '';
            if (dropdown) dropdown.style.display = 'none';
            currentQuickAddMealType = null;
            currentQuickAddInput = null;

            showToast(`<i data-lucide="check-circle" class="icon-inline"></i> ${food.name} ajouté (100g)`);
        }

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

        // Reposition dropdown on scroll
        document.addEventListener('scroll', () => {
            const dropdown = document.getElementById('global-quick-add-results');
            if (dropdown && dropdown.style.display === 'block' && currentQuickAddInput) {
                positionGlobalDropdown(currentQuickAddInput);
            }
        }, true);

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
                container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: var(--space-xl); font-size: 0.9rem;">Aucun aliment</p>';
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

                return `
                    <div class="food-item">
                        <button class="delete-btn" onclick="removeFoodFromMeal('${mealType}', ${food.id})" style="width: 32px; height: 32px; min-width: 32px; display: flex; align-items: center; justify-content: center; padding: 0;"><i data-lucide="trash-2" style="width: 18px; height: 18px;"></i></button>
                        <button onclick="event.stopPropagation(); toggleFavorite('${food.name.replace(/'/g, "\\'")}')"
                                style="width: 32px; height: 32px; min-width: 32px; background: none; border: none; cursor: pointer; font-size: 1.1rem; transition: var(--transition-fast); ${isFavorite(food.name) ? '' : 'filter: grayscale(1) brightness(2);'}"
                                title="${isFavorite(food.name) ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
                            ${isFavorite(food.name) ? '⭐' : '⭐'}
                        </button>
                        <div class="food-name">${getDisplayName(food)}</div>
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
            if (typeof lucide !== "undefined") lucide.createIcons();
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
                food.quantity = parsedQuantity;
                renderMeal(mealType);
                updateDayTotals();
                saveDailyMeals();
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
                saveDailyMeals();
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
            if (typeof lucide !== 'undefined') lucide.createIcons();
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

            showToast('<i data-lucide="check-circle" class="icon-inline"></i> Journée enregistrée dans ton planning !');
        }

        function reopenDay(dateKey) {
            const closedDays = JSON.parse(localStorage.getItem('closedDays') || '{}');
            delete closedDays[dateKey];
            localStorage.setItem('closedDays', JSON.stringify(closedDays));

            updateCloseDayUI(false);

            showToast('<i data-lucide="unlock" class="icon-inline"></i> Journée rouverte, tu peux la modifier');
        }

        function updateCloseDayUI(isClosed) {
            const btn = document.getElementById('close-day-btn');
            const notice = document.getElementById('day-closed-notice');
            const btnText = document.getElementById('close-day-text');
            const badge = document.getElementById('closed-day-badge');

            if (isClosed) {
                btn.innerHTML = '<i data-lucide="lock-open" style="width: 18px; height: 18px;"></i><span id="close-day-text">Rouvrir cette journée</span>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
                btn.style.background = '#d4a847';
                btn.style.color = '#1a1a1a';
                notice.style.display = 'block';
                if (badge) badge.style.display = 'inline-block';
                if (typeof lucide !== "undefined") lucide.createIcons();

                // Désactiver les boutons d'ajout
                document.querySelectorAll('#meals .add-food-btn, #meals .delete-btn').forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                });
            } else {
                btn.innerHTML = '<i data-lucide="check-circle" style="width: 18px; height: 18px;"></i><span id="close-day-text">Clôturer cette journée</span>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
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
                    if (typeof lucide !== "undefined") lucide.createIcons();
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
            if (typeof lucide !== 'undefined') lucide.createIcons();

            // Update weekly summary
            updateWeeklySummary();
        }

        function updateWeeklySummary() {
            const weekStart = new Date(currentWeekStart);
            const savedMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            const closedDays = JSON.parse(localStorage.getItem('closedDays') || '{}');
            const macroTargets = JSON.parse(localStorage.getItem('macroTargets') || '{}');

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

            // Mettre à jour l'interface
            const avgCaloriesEl = document.getElementById('weekly-avg-calories');
            const closedDaysEl = document.getElementById('weekly-closed-days');
            const macroSuccessEl = document.getElementById('weekly-macro-success');

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
            foodDatabaseContainer.innerHTML = foods.map(food => `
                <div class="food-item">
                    <div class="food-name">${getDisplayName(food)}</div>
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
            if (typeof lucide !== "undefined") lucide.createIcons();
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
            loadCustomFoods();
            loadMealTemplates();
            loadAllMeals();
            loadTrackingData();
            loadCalcSettings();
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
            requestAnimationFrame(() => {
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

                // IMPORTANT: Load profile AFTER dropdowns are populated
                // Otherwise saved values get overwritten
                loadProfile();

                // Sync weight from tracking on page load
                setTimeout(() =>  { syncWeightToCalculator(); }, 500);

                // Initialize Lucide icons
                if (typeof lucide !== 'undefined')  { if (typeof lucide !== "undefined") lucide.createIcons(); }
            });
        }

        // ===== ALIMENTS PERSONNALISÉS =====
        function loadCustomFoods() {
            const saved = localStorage.getItem('customFoods');
            if (saved) {
                customFoods = JSON.parse(saved);
                customFoods.forEach(food => {
                    // Ajouter une catégorie par défaut si elle n'existe pas
                    if (!food.category) {
                        food.category = 'feculents';
                    }
                    if (!foodDatabase.find(f => f.name === food.name))  { foodDatabase.push(food); }
                });
            }
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
                    if (typeof lucide !== 'undefined') lucide.createIcons();
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

                // Sauvegarder localement
                newFood.custom = true;
                customFoods.push(newFood);
                if (!foodDatabase.find(f => f.name === newFood.name)) {
                    foodDatabase.push(newFood);
                }
                localStorage.setItem('customFoods', JSON.stringify(customFoods));

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
                if (typeof lucide !== 'undefined') lucide.createIcons();
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

            if (typeof lucide !== 'undefined') lucide.createIcons();

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

        async function onBarcodeScanned(decodedText, decodedResult) {
            // Éviter les scans multiples
            if (scannerScannedBarcode === decodedText) return;
            scannerScannedBarcode = decodedText;


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
                if (typeof lucide !== 'undefined') lucide.createIcons();

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

            customConfirm('Supprimer cet aliment ?', `Supprimer "${foodName}" de ta base ?`, true).then((confirmed) => {

                if (confirmed) {

                    // Filtrer customFoods
                    customFoods = customFoods.filter(f => f.name !== foodName);
                    
                    // IMPORTANT: Aussi supprimer de foodDatabase (car ajouté au chargement)
                    const dbIndex = foodDatabase.findIndex(f => f.name === foodName && f.custom === true);
                    if (dbIndex !== -1) {
                        foodDatabase.splice(dbIndex, 1);
                    }


                    localStorage.setItem('customFoods', JSON.stringify(customFoods));

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

            // Utiliser foodDatabase qui contient déjà les customFoods (ajoutés par loadCustomFoods)
            // Dédupliquer en utilisant un Map par nom
            const foodMap = new Map();
            foodDatabase.forEach(food => {
                if (!foodMap.has(food.name)) {
                    foodMap.set(food.name, food);
                }
            });
            let allFoods = Array.from(foodMap.values());

            // CHARGER ALIMENTS COMMUNAUTAIRES si filtre "community" sélectionné (même sans recherche)
            if (filter === 'community' && typeof window.loadCommunityFoods === 'function') {
                try {
                    const communityFoods = await window.loadCommunityFoods();
                    communityFoods.forEach(item => {
                        if (!foodMap.has(item.name)) {
                            foodMap.set(item.name, item);
                        }
                    });
                    allFoods = Array.from(foodMap.values());
                } catch (err) {
                    console.error('Erreur chargement aliments communautaires:', err);
                }
            }

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
                                fromFirestore: true
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
                                fromFirestore: true // Marquer comme provenant de Firestore
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
            } else if (filter === 'community') {
                filtered = filtered.filter(f => f.fromFirestore === true);
            } else if (filter === 'default') {
                filtered = filtered.filter(f => !f.custom && !f.fromFirestore);
            }

            if (query)  { filtered = filtered.filter(f => f.name.toLowerCase().includes(query)); }

            filtered.sort((a, b) => {
                switch(sortBy) {
                    case 'name': return a.name.localeCompare(b.name);
                    case 'protein': return b.protein - a.protein;
                    case 'carbs': return b.carbs - a.carbs;
                    case 'fat': return b.fat - a.fat;
                    case 'calories': return b.calories - a.calories;
                    default: return 0;
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
                                        <div class="food-name">${getDisplayName(food)} ${food.custom ? '<i data-lucide="sparkles" style="width: 14px; height: 14px; display: inline; vertical-align: middle; color: var(--accent-main);"></i>' : ''} ${food.fromFirestore ? '<i data-lucide="cloud" style="width: 14px; height: 14px; display: inline; vertical-align: middle; color: var(--accent-ui);"></i>' : ''}</div>
                                        ${food.custom ? '<span style="font-size: 0.85rem; color: var(--accent-ui);">Personnalisé</span>' : ''}
                                        ${food.fromFirestore ? '<span style="font-size: 0.85rem; color: var(--accent-ui);">Base communautaire</span>' : ''}
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
                                <div class="food-name">${getDisplayName(food)} ${food.custom ? '<i data-lucide="sparkles" style="width: 14px; height: 14px; display: inline; vertical-align: middle; color: var(--accent-main);"></i>' : ''} ${food.fromFirestore ? '<i data-lucide="cloud" style="width: 14px; height: 14px; display: inline; vertical-align: middle; color: var(--accent-ui);"></i>' : ''}</div>
                                ${food.custom ? '<span style="font-size: 0.85rem; color: var(--accent-ui);">Personnalisé</span>' : ''}
                                ${food.fromFirestore ? '<span style="font-size: 0.85rem; color: var(--accent-ui);">Base communautaire</span>' : ''}
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
            if (typeof lucide !== 'undefined')  { lucide.createIcons(); }
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
                    if (typeof lucide !== "undefined") lucide.createIcons();
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

        function loadAllMeals() {
            const saved = localStorage.getItem('allDailyMeals');
            if (saved) { allDailyMeals = JSON.parse(saved); }

            loadDailyMealsForCurrentDate();
        }

        function loadDailyMealsForCurrentDate() {
            const dateKey = getCurrentDateKey();

            if (!allDailyMeals[dateKey]) {
                allDailyMeals[dateKey] = {
                    breakfast: { foods: [], recipe: '' },
                    lunch: { foods: [], recipe: '' },
                    snack: { foods: [], recipe: '' },
                    dinner: { foods: [], recipe: '' }
                };
            }

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

        function saveDailyMeals() {
            const dateKey = getCurrentDateKey();
            showSaveToast();
            allDailyMeals[dateKey] = dailyMeals;
            localStorage.setItem('allDailyMeals', JSON.stringify(allDailyMeals));
            // Mettre à jour le streak en temps réel
            if (typeof updateStreakDisplay === 'function') updateStreakDisplay();
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
        updateMealQuantity = function(mealType, id, quantity)  { origUpdateQuantity(mealType, id, quantity);
            saveDailyMeals(); };

        const origRemoveFood = removeFoodFromMeal;
        removeFoodFromMeal = function(mealType, id) {
            origRemoveFood(mealType, id);
            saveDailyMeals();
            syncMealsToPlanning();
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
            if (typeof lucide !== 'undefined') lucide.createIcons();
        };

        function goToCurrentWeek() {
            const today = new Date();
            const dayOfWeek = today.getDay();
            const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
            currentWeekStart = new Date(today);
            currentWeekStart.setDate(today.getDate() + mondayOffset);
            currentWeekStart.setHours(0, 0, 0, 0);
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
        function loadTrackingData() {
            const saved = localStorage.getItem('trackingData');
            if (saved) {
                trackingData = JSON.parse(saved);
                advancedTrackingData = JSON.parse(saved); // Sync with advancedTrackingData
            } else {
            }
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

        function saveTracking() {
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

            // Ajouter nouvelle entrée
            trackingData.push({
                date,
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
            });


            // Trier par date décroissante
            trackingData.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Sauvegarder
            localStorage.setItem('trackingData', JSON.stringify(trackingData));
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

            // SYNC: Update calculator weight with latest tracking weight
            syncWeightToCalculator();
        }

        // ===== WEIGHT SYNC SYSTEM =====
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

        function syncWeightToCalculator() {
            const latestWeight = getLatestWeight();

            if (latestWeight === null) {

                // If no tracking, restore initial weight (before any tracking was added)
                const initialWeight = localStorage.getItem('initialWeight');
                if (initialWeight) {
                    const weightInput = document.getElementById('weight');
                    const currentWeight = parseFloat(weightInput.value);
                    const initial = parseFloat(initialWeight);

                    if (currentWeight !== initial) {
                        weightInput.value = initial;
                        saveProfile();
                        autoRecalculateMacros();
                        showToast(`⚖️ Poids restauré : ${initial} kg`);
                    } else {
                    }
                } else {
                }
                return;
            }

            const weightInput = document.getElementById('weight');
            if (!weightInput) {
                console.error('<i data-lucide="x-circle" class="icon-inline"></i> Weight input not found');
                return;
            }

            const currentWeight = parseFloat(weightInput.value);

            // Only update if weight has changed
            if (currentWeight !== latestWeight) {
                weightInput.value = latestWeight;

                // Save to profile
                saveProfile();

                // Auto-recalculate macros if we have all required data
                autoRecalculateMacros();

                showToast(`⚖️ Poids mis à jour : ${latestWeight} kg`);
            }
        }

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
                    calculateMacros(); } catch (error) {
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

            // Charger les données depuis localStorage
            const saved = localStorage.getItem('trackingData');
            const data = saved ? JSON.parse(saved) : [];

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
            if (typeof lucide !== 'undefined') lucide.createIcons();
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
            customConfirm('Supprimer ce suivi ?', 'Cette mesure sera définitivement supprimée.', true).then((confirmed) => {
                if (confirmed) {
                    // Recharger depuis localStorage
                    const saved = localStorage.getItem('trackingData');
                    let data = saved ? JSON.parse(saved) : [];

                    // Filtrer
                    data = data.filter(e => e.date !== date);

                    // Sauvegarder
                    localStorage.setItem('trackingData', JSON.stringify(data));
                    trackingData = data;

                    // Rafraîchir l'affichage
                    renderTrackingList();
                    showToast('<i data-lucide="check-circle" class="icon-inline"></i> Suivi supprimé');

                    // SYNC: Update calculator weight after deletion
                    syncWeightToCalculator();
                } else {
                }
            }).catch(err => {
                console.error('❌ Erreur Promise:', err);
            });
        }

        function editTracking(date) {
            // Charger l'entrée depuis localStorage
            const saved = localStorage.getItem('trackingData');
            const data = saved ? JSON.parse(saved) : [];
            const entry = data.find(e => e.date === date);


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

        function loadMealTemplates() {
            const saved = localStorage.getItem('mealTemplates');
            if (saved) { mealTemplates = JSON.parse(saved); }
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

            customPrompt('Nom du repas type', '(ex: "Déjeuner de travail", "Petit-déj protéiné")', '').then((templateName) => {
                if (!templateName || !templateName.trim()) return;

                const template = {
                    id: Date.now(),
                    name: templateName.trim(),
                    foods: JSON.parse(JSON.stringify(foods)), // Copie profonde
                    recipe: recipe, // Sauvegarder la recette avec le template
                    createdAt: new Date().toISOString()
                };

                mealTemplates.push(template);
                localStorage.setItem('mealTemplates', JSON.stringify(mealTemplates));

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
            if (typeof lucide !== 'undefined') lucide.createIcons();
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
                if (recipeInput) recipeInput.value = template.recipe;
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

            mealTemplates = mealTemplates.filter(t => t.id !== templateId);
            localStorage.setItem('mealTemplates', JSON.stringify(mealTemplates));

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
                if (typeof lucide !== 'undefined') lucide.createIcons();
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
            if (typeof lucide !== 'undefined') lucide.createIcons();
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
            if (typeof lucide !== "undefined") lucide.createIcons();
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
            if (typeof lucide !== "undefined") lucide.createIcons();
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
            if (typeof lucide !== 'undefined') lucide.createIcons();
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

            mealTemplates = mealTemplates.filter(t => t.id !== templateId);
            localStorage.setItem('mealTemplates', JSON.stringify(mealTemplates));

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
                if (typeof lucide !== "undefined") lucide.createIcons();
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
            if (typeof lucide !== "undefined") lucide.createIcons();
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
            if (typeof lucide !== "undefined") lucide.createIcons();
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
        function loadCalcSettings() {
            ['weight', 'bodyFat', 'activity', 'deficit', 'surplus', 'proteinCoeff', 'fatCoeff', 'proteinCoeffBulk', 'fatCoeffBulk'].forEach(s => {
                const saved = localStorage.getItem('calc_' + s);
                if (saved && document.getElementById(s)) {
                    document.getElementById(s).value = saved;
                }
            });

            const savedGoal = localStorage.getItem('calc_goal');
            if (savedGoal) selectGoal(savedGoal);

            // Load saved macro targets and display results
            const savedTargets = localStorage.getItem('macroTargets');
            if (savedTargets) {
                try {
                    const targets = JSON.parse(savedTargets);

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

        function saveCalcSettings() {

            const settings = {
                weight: document.getElementById('weight')?.value || '',
                bodyFat: document.getElementById('bodyFat')?.value || '',
                activity: document.getElementById('activity')?.value || '',
                deficit: document.getElementById('deficit')?.value || '',
                surplus: document.getElementById('surplus')?.value || '',
                proteinCoeff: document.getElementById('proteinCoeff')?.value || '',
                fatCoeff: document.getElementById('fatCoeff')?.value || '',
                proteinCoeffBulk: document.getElementById('proteinCoeffBulk')?.value || '',
                fatCoeffBulk: document.getElementById('fatCoeffBulk')?.value || '',
                goal: currentGoal || 'cut'
            };

            Object.keys(settings).forEach(k => {
                if (settings[k] !== '') {  // Only save if not empty
                    localStorage.setItem('calc_' + k, settings[k]);
                }
            });
        }

        const origCalculateMacros = calculateMacros;
        calculateMacros = function()  { origCalculateMacros();
            saveCalcSettings(); };

        // ===== USER MENU =====
        function toggleUserMenu() {
            const menu = document.getElementById('user-menu');
            if (menu) {
                menu.classList.toggle('active');
                if (typeof lucide !== 'undefined') lucide.createIcons();
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
                if (typeof lucide !== "undefined") lucide.createIcons();
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.add('light-theme');
                icon.setAttribute('data-lucide', 'sun');
                if (typeof lucide !== "undefined") lucide.createIcons();
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
            // Afficher l'app directement
            document.getElementById('main-app').style.display = 'block';

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
            loadProfile();

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

            // Vérifier au chargement si le profil est complet
            checkAndAutoCalculate();

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
            if (typeof lucide !== "undefined") lucide.createIcons();
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
                    calculateMacros();
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
                container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">Aucune mesure</p>';
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
            if (typeof lucide !== 'undefined') lucide.createIcons();
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
                if (typeof lucide !== 'undefined') lucide.createIcons();
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

        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-message');
            toastMsg.innerHTML = message;

            // Reset et appliquer le type
            toast.classList.remove('toast-success', 'toast-error', 'toast-warning', 'toast-info');
            toast.classList.add('toast-' + type);
            toast.classList.add('show');

            // Reinit Lucide APRÈS que le DOM soit mis à jour
            setTimeout(() => {
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 0);

            setTimeout(() => { toast.classList.remove('show'); }, 3000);
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
                    if (typeof lucide !== 'undefined') lucide.createIcons();
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


        // ============================================
        // ONBOARDING - Gestion de l'accueil nouveaux utilisateurs
        // ============================================

        // État de l'onboarding
        let onboardingState = JSON.parse(localStorage.getItem('onboardingState') || '{"goal": false, "profile": false, "meal": false}');
        let selectedOnboardingGoal = null;

        // Initialiser l'onboarding au chargement
        function initOnboarding() {
            // Charger l'état depuis localStorage
            onboardingState = JSON.parse(localStorage.getItem('onboardingState') || '{"goal": false, "profile": false, "meal": false}');

            // Vérifier si l'onboarding est terminé
            const isComplete = onboardingState.goal && onboardingState.profile && onboardingState.meal;
            const onboardingSection = document.getElementById('onboarding-section');

            if (isComplete && onboardingSection) {
                onboardingSection.classList.add('hidden');
            } else {
                updateOnboardingUI();
            }
        }

        // Mettre à jour l'UI de l'onboarding
        function updateOnboardingUI() {
            // Mettre à jour les cards
            const cards = {
                goal: document.getElementById('onboarding-card-goal'),
                profile: document.getElementById('onboarding-card-profile'),
                meal: document.getElementById('onboarding-card-meal')
            };

            // Compter les étapes terminées
            let completed = 0;

            Object.keys(onboardingState).forEach(key => {
                const card = cards[key];
                if (card) {
                    const checkIcon = card.querySelector('.onboarding-card-check i');
                    if (onboardingState[key]) {
                        card.classList.add('completed');
                        if (checkIcon) checkIcon.style.display = 'block';
                        completed++;
                    } else {
                        card.classList.remove('completed');
                        if (checkIcon) checkIcon.style.display = 'none';
                    }
                }
            });

            // Mettre à jour le compteur de progression
            const progressEl = document.getElementById('onboarding-progress');
            if (progressEl) {
                progressEl.textContent = `${completed}/3 terminé`;
            }

            // Masquer la section si tout est terminé
            if (completed === 3) {
                setTimeout(() => {
                    const section = document.getElementById('onboarding-section');
                    if (section) {
                        section.style.animation = 'fadeIn 0.5s ease reverse';
                        setTimeout(() => section.classList.add('hidden'), 500);
                    }
                }, 500);
            }

            // Rafraîchir les icônes Lucide
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Sauvegarder l'état de l'onboarding
        function saveOnboardingState() {
            localStorage.setItem('onboardingState', JSON.stringify(onboardingState));
            updateOnboardingUI();
            // Sync avec Firestore (best effort, non bloquant)
            if (typeof auth !== 'undefined' && auth.currentUser && typeof syncToFirestore === 'function') {
                syncToFirestore(auth.currentUser).catch(() => {});
            }
        }

        // === MODAL OBJECTIF ===
        function openOnboardingGoal() {
            if (onboardingState.goal) return;
            const modal = document.getElementById('onboarding-goal-modal');
            modal.classList.add('active');
            selectedOnboardingGoal = null;
            document.querySelectorAll('#onboarding-goal-selector .goal-btn').forEach(btn => btn.classList.remove('active'));
            const confirmBtn = document.getElementById('onboarding-goal-confirm');
            confirmBtn.disabled = true;
            confirmBtn.style.opacity = '0.5';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function closeOnboardingGoal() {
            document.getElementById('onboarding-goal-modal').classList.remove('active');
        }

        function selectOnboardingGoal(goal) {
            selectedOnboardingGoal = goal;
            document.querySelectorAll('#onboarding-goal-selector .goal-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`#onboarding-goal-selector [data-goal="${goal}"]`).classList.add('active');
            const confirmBtn = document.getElementById('onboarding-goal-confirm');
            confirmBtn.disabled = false;
            confirmBtn.style.opacity = '1';
        }

        function confirmOnboardingGoal() {
            if (!selectedOnboardingGoal) return;

            // Appliquer l'objectif au calculateur
            selectGoal(selectedOnboardingGoal);

            // Fermer la modale d'abord
            closeOnboardingGoal();

            // Marquer comme terminé et sauvegarder
            onboardingState.goal = true;
            saveOnboardingState();

            // Afficher un toast
            if (typeof showToast === 'function') {
                showToast('<i data-lucide="check-circle" class="icon-inline"></i> Objectif défini !', 'success');
            }
        }

        function skipOnboardingGoal() {
            onboardingState.goal = true;
            saveOnboardingState();
            closeOnboardingGoal();
        }

        // === MODAL PROFIL ===
        function openOnboardingProfile() {
            if (onboardingState.profile) return;
            const modal = document.getElementById('onboarding-profile-modal');
            modal.classList.add('active');

            // Pré-remplir avec les données existantes si disponibles
            const existingWeight = document.getElementById('weight')?.value;
            const existingHeight = document.getElementById('height')?.value;
            const existingActivity = document.getElementById('activity')?.value;

            if (existingWeight) document.getElementById('onboarding-weight').value = existingWeight;
            if (existingHeight) document.getElementById('onboarding-height').value = existingHeight;
            if (existingActivity) document.getElementById('onboarding-activity').value = existingActivity;

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function closeOnboardingProfile() {
            document.getElementById('onboarding-profile-modal').classList.remove('active');
        }

        function confirmOnboardingProfile() {
            const weight = document.getElementById('onboarding-weight').value;
            const height = document.getElementById('onboarding-height').value;
            const activity = document.getElementById('onboarding-activity').value;

            // Validation - tous les champs sont requis
            if (!weight) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Le poids est requis', 'error');
                }
                document.getElementById('onboarding-weight')?.focus();
                return;
            }
            if (!height) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="alert-circle" class="icon-inline"></i> La taille est requise pour calculer les macros', 'error');
                }
                document.getElementById('onboarding-height')?.focus();
                return;
            }
            if (!activity) {
                if (typeof showToast === 'function') {
                    showToast('<i data-lucide="alert-circle" class="icon-inline"></i> Le niveau d\'activité est requis', 'error');
                }
                document.getElementById('onboarding-activity')?.focus();
                return;
            }

            // Appliquer les valeurs au calculateur
            const weightEl = document.getElementById('weight');
            const heightEl = document.getElementById('height');
            const activityEl = document.getElementById('activity');

            if (weightEl) weightEl.value = weight;
            if (heightEl) heightEl.value = height;
            if (activityEl) activityEl.value = activity;

            // Fermer la modale d'abord
            closeOnboardingProfile();

            // Marquer comme terminé et sauvegarder
            onboardingState.profile = true;
            saveOnboardingState();

            // Afficher un toast
            if (typeof showToast === 'function') {
                showToast('<i data-lucide="check-circle" class="icon-inline"></i> Profil enregistré !', 'success');
            }
        }

        function skipOnboardingProfile() {
            onboardingState.profile = true;
            saveOnboardingState();
            closeOnboardingProfile();
        }

        // === MODAL PREMIER REPAS ===
        function openOnboardingMeal() {
            if (onboardingState.meal) return;
            const modal = document.getElementById('onboarding-meal-modal');
            modal.classList.add('active');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function closeOnboardingMeal() {
            document.getElementById('onboarding-meal-modal').classList.remove('active');
        }

        function confirmOnboardingMeal() {
            // Ajouter le repas exemple au petit-déjeuner
            const exampleFoods = [
                {
                    id: 'onb_' + Date.now() + '_1',
                    name: 'Flocons d\'avoine',
                    quantity: 50,
                    protein: 6.5,
                    carbs: 33,
                    fat: 3.5,
                    calories: 189,
                    category: 'cereales'
                },
                {
                    id: 'onb_' + Date.now() + '_2',
                    name: 'Lait demi-écrémé',
                    quantity: 200,
                    protein: 6.4,
                    carbs: 9.6,
                    fat: 3.2,
                    calories: 92,
                    category: 'produits-laitiers'
                },
                {
                    id: 'onb_' + Date.now() + '_3',
                    name: 'Banane',
                    quantity: 100,
                    protein: 1.1,
                    carbs: 22.8,
                    fat: 0.3,
                    calories: 89,
                    category: 'fruits'
                }
            ];

            // Ajouter au repas du jour
            const today = new Date();
            const dateKey = getDateKey ? getDateKey(today) : today.toISOString().split('T')[0];

            // Charger les repas existants
            let allMeals = JSON.parse(localStorage.getItem('allDailyMeals') || '{}');
            if (!allMeals[dateKey]) {
                allMeals[dateKey] = {
                    breakfast: { foods: [], recipe: '' },
                    lunch: { foods: [], recipe: '' },
                    snack: { foods: [], recipe: '' },
                    dinner: { foods: [], recipe: '' },
                    water: 0
                };
            }

            // Ajouter les aliments au petit-déjeuner
            allMeals[dateKey].breakfast.foods.push(...exampleFoods);

            // Sauvegarder
            localStorage.setItem('allDailyMeals', JSON.stringify(allMeals));

            // Sync avec Firestore (best effort, non bloquant)
            if (typeof auth !== 'undefined' && auth.currentUser && typeof syncToFirestore === 'function') {
                syncToFirestore(auth.currentUser).catch(() => {});
            }

            // Mettre à jour dailyMeals si c'est le jour courant
            if (typeof dailyMeals !== 'undefined' && typeof currentMealDate !== 'undefined') {
                const currentDateKey = getDateKey ? getDateKey(currentMealDate) : currentMealDate.toISOString().split('T')[0];
                if (currentDateKey === dateKey) {
                    dailyMeals.breakfast.foods.push(...exampleFoods);
                    if (typeof renderMeal === 'function') renderMeal('breakfast');
                    if (typeof updateRemainingWidget === 'function') updateRemainingWidget();
                }
            }

            // Marquer comme terminé
            onboardingState.meal = true;
            saveOnboardingState();
            closeOnboardingMeal();

            // Afficher un toast
            if (typeof showToast === 'function') {
                showToast('<i data-lucide="check-circle" class="icon-inline"></i> Repas ajouté !', 'success');
            }

            // Optionnel : Rediriger vers l'onglet repas
            setTimeout(() => {
                if (typeof switchToTab === 'function') {
                    switchToTab('meals');
                }
            }, 800);
        }

        function skipOnboardingMeal() {
            onboardingState.meal = true;
            saveOnboardingState();
            closeOnboardingMeal();
        }

        // Initialiser l'onboarding au chargement de la page
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initOnboarding, 500);
        });
