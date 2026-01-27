/**
 * SCRIPT DE GÉNÉRATION DE TEMPLATES DE TEST POUR L'ANALYSE DE PERFORMANCE
 *
 * Ce script génère des templates de repas en masse dans Firestore
 * pour tester la latence du panel admin "Repas conseillés"
 *
 * UTILISATION:
 * 1. Ouvrir la console du navigateur sur la page admin
 * 2. Copier-coller ce script dans la console
 * 3. Exécuter : await generatePerformanceTestTemplates(50)
 * 4. Observer la latence dans l'onglet "Repas conseillés"
 *
 * ATTENTION: Ce script va créer beaucoup de documents dans Firestore.
 * Utilisez cleanupTestTemplates() pour les supprimer après les tests.
 */

// ========================================
// CONFIGURATION
// ========================================

const TEST_CONFIG = {
  // Préfixe pour identifier les templates de test
  TEST_PREFIX: 'PERF_TEST_',

  // Types de repas disponibles
  MEAL_TYPES: ['breakfast', 'lunch', 'snack', 'dinner'],

  // Variantes disponibles
  VARIANTS: ['standard', 'vegan', 'glutenFree', 'vegetarian', 'lowCarb', 'highProtein'],

  // Pool d'aliments pour les templates
  FOOD_POOL: {
    proteins: [
      'Poulet rôti', 'Saumon frais', 'Thon en boîte', 'Œufs', 'Tofu ferme',
      'Jambon blanc', 'Dinde', 'Bœuf haché', 'Crevettes', 'Fromage blanc 0%',
      'Yaourt grec', 'Protéine de soja', 'Tempeh', 'Seitan', 'Cabillaud',
      'Sardines', 'Maquereau', 'Escalope de veau', 'Filet de porc', 'Cottage cheese'
    ],
    carbs: [
      'Riz blanc cuit', 'Pâtes complètes', 'Pomme de terre', 'Patate douce',
      'Pain complet', 'Flocons d\'avoine', 'Quinoa', 'Banane', 'Pomme',
      'Riz basmati', 'Couscous', 'Polenta', 'Semoule', 'Pain de mie',
      'Biscottes', 'Müesli', 'Corn flakes', 'Riz sauvage', 'Orge', 'Sarrasin'
    ],
    fats: [
      'Huile d\'olive', 'Avocat', 'Amandes', 'Noix', 'Beurre de cacahuète',
      'Huile de coco', 'Noisettes', 'Noix de cajou', 'Graines de chia',
      'Graines de lin', 'Huile de colza', 'Beurre', 'Fromage', 'Crème fraîche',
      'Tahini', 'Huile de sésame', 'Noix de pécan', 'Noix de macadamia',
      'Pistaches', 'Graines de tournesol'
    ],
    fiber: [
      'Haricots verts', 'Brocoli', 'Épinards', 'Courgettes', 'Tomates',
      'Carottes', 'Chou-fleur', 'Poivrons', 'Aubergine', 'Salade verte',
      'Champignons', 'Concombre', 'Asperges', 'Choux de Bruxelles', 'Céleri',
      'Radis', 'Endives', 'Fenouil', 'Betteraves', 'Artichauts'
    ]
  },

  // Templates de recettes
  RECIPE_TEMPLATES: [
    `Préchauffer le four à 180°C.

Préparer les aliments en suivant les instructions ci-dessous.
Disposer sur une plaque et assaisonner avec sel, poivre et herbes de Provence.
Enfourner pour 25-30 minutes.

Servir chaud avec un filet d'huile d'olive.`,

    `Faire revenir les aliments dans une poêle avec un peu d'huile.
Cuire à feu moyen pendant 10-15 minutes en remuant régulièrement.

Ajouter les légumes et poursuivre la cuisson 5 minutes.
Assaisonner selon vos goûts.

Servir immédiatement et déguster.`,

    `Cuire les glucides selon les instructions du paquet.
Pendant ce temps, préparer les protéines à la poêle ou au four.

Cuire les légumes à la vapeur pendant 10 minutes.
Mélanger le tout dans un grand bol.

Arroser d'un filet d'huile et servir.`,

    `Mixer tous les ingrédients dans un blender jusqu'à obtenir une consistance lisse.
Ajouter un peu d'eau si nécessaire pour ajuster la texture.

Verser dans un bol et décorer avec des fruits frais et des graines.
Laisser reposer 5 minutes avant de déguster.`,

    `Faire mariner les protéines avec les épices pendant 30 minutes.
Préparer les légumes en les coupant en morceaux.

Faire cuire les protéines à la poêle pendant 8-10 minutes.
Ajouter les légumes et cuire 5 minutes supplémentaires.

Servir avec les glucides et un accompagnement de votre choix.`
  ]
};

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

/**
 * Sélectionne un élément aléatoire dans un tableau
 */
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Génère un nombre aléatoire entre min et max
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Génère un nombre aléatoire flottant entre min et max
 */
function randomFloat(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

/**
 * Génère un split de macros valide (somme = 1.0)
 */
function generateMacroSplit() {
  // Générer des pourcentages aléatoires
  let proteins = randomFloat(0.25, 0.50);
  let carbs = randomFloat(0.20, 0.50);
  let fats = 1.0 - proteins - carbs;

  // Ajuster si nécessaire pour rester dans des valeurs raisonnables
  if (fats < 0.15 || fats > 0.40) {
    proteins = randomFloat(0.30, 0.40);
    carbs = randomFloat(0.30, 0.40);
    fats = 1.0 - proteins - carbs;
  }

  return {
    proteins: parseFloat(proteins.toFixed(2)),
    carbs: parseFloat(carbs.toFixed(2)),
    fats: parseFloat(fats.toFixed(2))
  };
}

/**
 * Génère une liste d'aliments pour un template
 */
function generateFoodsList() {
  const foods = [];
  const foodCount = randomInt(4, 10); // Entre 4 et 10 aliments

  // Sélectionner au moins un aliment de chaque catégorie
  const categories = ['proteins', 'carbs', 'fats', 'fiber'];
  const usedCategories = new Set();

  for (let i = 0; i < foodCount; i++) {
    // Choisir une catégorie (favoriser les catégories non encore utilisées)
    let category;
    if (usedCategories.size < categories.length) {
      const remainingCategories = categories.filter(c => !usedCategories.has(c));
      category = randomChoice(remainingCategories);
    } else {
      category = randomChoice(categories);
    }

    usedCategories.add(category);

    // Sélectionner un aliment dans cette catégorie
    const foodName = randomChoice(TEST_CONFIG.FOOD_POOL[category]);

    // Générer des quantités min/max en fonction de la catégorie
    let min, max;
    switch (category) {
      case 'proteins':
        min = randomInt(80, 150);
        max = randomInt(min + 50, 350);
        break;
      case 'carbs':
        min = randomInt(50, 100);
        max = randomInt(min + 50, 300);
        break;
      case 'fats':
        min = randomInt(5, 15);
        max = randomInt(min + 5, 50);
        break;
      case 'fiber':
        min = randomInt(80, 150);
        max = randomInt(min + 50, 300);
        break;
    }

    foods.push({
      foodName,
      role: category === 'fiber' ? 'fiber' : category.slice(0, -1), // Remove trailing 's'
      min,
      max,
      priority: i + 1
    });
  }

  return foods;
}

/**
 * Génère un nom unique pour le template
 */
function generateTemplateName(index, variant, mealType) {
  const adjectives = [
    'Équilibré', 'Savoureux', 'Nutritif', 'Gourmand', 'Léger',
    'Complet', 'Rapide', 'Facile', 'Délicieux', 'Healthy',
    'Énergétique', 'Protéiné', 'Vitaminé', 'Frais', 'Copieux'
  ];

  const mealLabels = {
    breakfast: 'Petit-déjeuner',
    lunch: 'Déjeuner',
    snack: 'Goûter',
    dinner: 'Dîner'
  };

  const variantLabels = {
    standard: '',
    vegan: 'Vegan',
    glutenFree: 'Sans Gluten',
    vegetarian: 'Végétarien',
    lowCarb: 'Low-Carb',
    highProtein: 'Riche en Protéines'
  };

  const adjective = randomChoice(adjectives);
  const variantLabel = variantLabels[variant] || '';

  return `${adjective} ${mealLabels[mealType]} ${variantLabel} #${index}`.trim();
}

// ========================================
// FONCTIONS PRINCIPALES
// ========================================

/**
 * Génère un template de test
 */
function generateTestTemplate(index) {
  const mealType = randomChoice(TEST_CONFIG.MEAL_TYPES);
  const variant = randomChoice(TEST_CONFIG.VARIANTS);
  const macroSplit = generateMacroSplit();
  const foods = generateFoodsList();
  const recipe = randomChoice(TEST_CONFIG.RECIPE_TEMPLATES);
  const displayName = generateTemplateName(index, variant, mealType);

  // Générer un ID unique
  const id = `${TEST_CONFIG.TEST_PREFIX}${mealType}_${variant}_${index}_${Date.now()}`;

  return {
    id,
    displayName,
    mealType,
    variant,
    targetPercentOfDay: randomFloat(0.15, 0.35),
    macroSplit,
    foods,
    recipe,
    active: Math.random() > 0.3, // 70% actifs, 30% inactifs
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

/**
 * Génère et sauvegarde N templates de test dans Firestore
 *
 * @param {number} count - Nombre de templates à générer
 * @param {boolean} measurePerformance - Mesurer la performance pendant la génération
 * @returns {Promise<Object>} Statistiques de génération
 */
async function generatePerformanceTestTemplates(count = 50, measurePerformance = true) {
  if (typeof db === 'undefined') {
    console.error('❌ Erreur: Firebase n\'est pas initialisé. Assurez-vous d\'être sur la page admin.');
    return;
  }

  if (typeof isAdmin === 'undefined' || !isAdmin()) {
    console.error('❌ Erreur: Vous devez être admin pour exécuter ce script.');
    return;
  }

  console.log(`🚀 Génération de ${count} templates de test...`);
  console.log(`📝 Préfixe: ${TEST_CONFIG.TEST_PREFIX}`);
  console.log('');

  const startTime = performance.now();
  const stats = {
    total: count,
    success: 0,
    errors: 0,
    byMealType: {},
    byVariant: {},
    totalTime: 0,
    avgTimePerTemplate: 0
  };

  // Mesurer la performance initiale si demandé
  let initialLoadTime = 0;
  if (measurePerformance && typeof loadAdminSmartTemplates === 'function') {
    console.log('⏱️  Mesure du temps de chargement initial...');
    const loadStart = performance.now();
    await loadAdminSmartTemplates();
    initialLoadTime = performance.now() - loadStart;
    console.log(`   Initial load time: ${initialLoadTime.toFixed(0)}ms`);
    console.log('');
  }

  // Générer et sauvegarder les templates
  for (let i = 1; i <= count; i++) {
    try {
      const template = generateTestTemplate(i);

      // Sauvegarder dans Firestore
      await setDoc(doc(db, 'smartTemplates', template.id), template);

      stats.success++;

      // Statistiques par type
      stats.byMealType[template.mealType] = (stats.byMealType[template.mealType] || 0) + 1;
      stats.byVariant[template.variant] = (stats.byVariant[template.variant] || 0) + 1;

      // Afficher la progression
      if (i % 10 === 0 || i === count) {
        const progress = ((i / count) * 100).toFixed(0);
        console.log(`📦 Progression: ${i}/${count} (${progress}%) - ${template.displayName}`);
      }

    } catch (error) {
      stats.errors++;
      console.error(`❌ Erreur lors de la création du template ${i}:`, error);
    }
  }

  const endTime = performance.now();
  stats.totalTime = endTime - startTime;
  stats.avgTimePerTemplate = stats.totalTime / count;

  // Mesurer la performance finale si demandé
  let finalLoadTime = 0;
  if (measurePerformance && typeof loadAdminSmartTemplates === 'function') {
    console.log('');
    console.log('⏱️  Mesure du temps de chargement final...');
    const loadStart = performance.now();
    await loadAdminSmartTemplates();
    finalLoadTime = performance.now() - loadStart;
    console.log(`   Final load time: ${finalLoadTime.toFixed(0)}ms`);
    console.log(`   Différence: +${(finalLoadTime - initialLoadTime).toFixed(0)}ms`);
  }

  // Afficher les statistiques
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('✅ GÉNÉRATION TERMINÉE');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`📊 Templates créés: ${stats.success}/${stats.total}`);
  console.log(`❌ Erreurs: ${stats.errors}`);
  console.log(`⏱️  Temps total: ${stats.totalTime.toFixed(0)}ms`);
  console.log(`⚡ Temps moyen par template: ${stats.avgTimePerTemplate.toFixed(0)}ms`);
  console.log('');
  console.log('📈 Répartition par type de repas:');
  Object.entries(stats.byMealType).forEach(([type, count]) => {
    console.log(`   - ${type}: ${count}`);
  });
  console.log('');
  console.log('🏷️  Répartition par variante:');
  Object.entries(stats.byVariant).forEach(([variant, count]) => {
    console.log(`   - ${variant}: ${count}`);
  });

  if (measurePerformance) {
    console.log('');
    console.log('🎯 IMPACT SUR LA PERFORMANCE:');
    console.log(`   Temps de chargement initial: ${initialLoadTime.toFixed(0)}ms`);
    console.log(`   Temps de chargement final: ${finalLoadTime.toFixed(0)}ms`);
    console.log(`   Augmentation: +${(finalLoadTime - initialLoadTime).toFixed(0)}ms (+${(((finalLoadTime / initialLoadTime) - 1) * 100).toFixed(0)}%)`);
  }

  console.log('');
  console.log('💡 Pour supprimer tous les templates de test:');
  console.log('   await cleanupTestTemplates()');
  console.log('═══════════════════════════════════════════════════════');

  return stats;
}

/**
 * Supprime tous les templates de test de Firestore
 *
 * @returns {Promise<Object>} Statistiques de suppression
 */
async function cleanupTestTemplates() {
  if (typeof db === 'undefined') {
    console.error('❌ Erreur: Firebase n\'est pas initialisé.');
    return;
  }

  if (typeof isAdmin === 'undefined' || !isAdmin()) {
    console.error('❌ Erreur: Vous devez être admin pour exécuter ce script.');
    return;
  }

  console.log(`🧹 Suppression des templates de test (préfixe: ${TEST_CONFIG.TEST_PREFIX})...`);

  const startTime = performance.now();
  const stats = {
    total: 0,
    success: 0,
    errors: 0,
    totalTime: 0
  };

  try {
    // Récupérer tous les templates
    const templatesSnap = await getDocs(collection(db, 'smartTemplates'));

    // Filtrer les templates de test
    const testTemplates = [];
    templatesSnap.forEach(doc => {
      if (doc.id.startsWith(TEST_CONFIG.TEST_PREFIX)) {
        testTemplates.push(doc.id);
      }
    });

    stats.total = testTemplates.length;

    if (stats.total === 0) {
      console.log('✅ Aucun template de test à supprimer.');
      return stats;
    }

    console.log(`📦 ${stats.total} templates de test trouvés.`);
    console.log('');

    // Supprimer chaque template
    for (let i = 0; i < testTemplates.length; i++) {
      try {
        await deleteDoc(doc(db, 'smartTemplates', testTemplates[i]));
        stats.success++;

        if ((i + 1) % 10 === 0 || (i + 1) === stats.total) {
          const progress = (((i + 1) / stats.total) * 100).toFixed(0);
          console.log(`🗑️  Progression: ${i + 1}/${stats.total} (${progress}%)`);
        }
      } catch (error) {
        stats.errors++;
        console.error(`❌ Erreur lors de la suppression de ${testTemplates[i]}:`, error);
      }
    }

    const endTime = performance.now();
    stats.totalTime = endTime - startTime;

    // Recharger l'interface
    if (typeof loadAdminSmartTemplates === 'function') {
      console.log('');
      console.log('🔄 Rechargement de l\'interface...');
      await loadAdminSmartTemplates();
    }

    console.log('');
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ SUPPRESSION TERMINÉE');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`🗑️  Templates supprimés: ${stats.success}/${stats.total}`);
    console.log(`❌ Erreurs: ${stats.errors}`);
    console.log(`⏱️  Temps total: ${stats.totalTime.toFixed(0)}ms`);
    console.log('═══════════════════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
  }

  return stats;
}

/**
 * Mesure la performance de chargement avec différents nombres de templates
 *
 * @returns {Promise<void>}
 */
async function benchmarkLoadPerformance() {
  if (typeof loadAdminSmartTemplates !== 'function') {
    console.error('❌ Erreur: loadAdminSmartTemplates() n\'est pas disponible.');
    return;
  }

  console.log('🔬 BENCHMARK DE PERFORMANCE');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');

  const tests = [
    { count: 10, label: '10 templates' },
    { count: 20, label: '20 templates' },
    { count: 50, label: '50 templates' },
    { count: 100, label: '100 templates' }
  ];

  const results = [];

  for (const test of tests) {
    console.log(`📊 Test: ${test.label}`);

    // Générer les templates
    await generatePerformanceTestTemplates(test.count, false);

    // Mesurer le temps de chargement (3 fois pour moyenne)
    const loadTimes = [];
    for (let i = 0; i < 3; i++) {
      const start = performance.now();
      await loadAdminSmartTemplates();
      const duration = performance.now() - start;
      loadTimes.push(duration);
      console.log(`   Essai ${i + 1}: ${duration.toFixed(0)}ms`);
    }

    const avgLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;
    results.push({ count: test.count, avgLoadTime });

    console.log(`   ⚡ Moyenne: ${avgLoadTime.toFixed(0)}ms`);
    console.log('');

    // Nettoyer pour le prochain test
    await cleanupTestTemplates();
  }

  // Afficher le résumé
  console.log('═══════════════════════════════════════════════════════');
  console.log('📈 RÉSULTATS DU BENCHMARK');
  console.log('═══════════════════════════════════════════════════════');
  results.forEach(r => {
    console.log(`${r.count} templates → ${r.avgLoadTime.toFixed(0)}ms`);
  });
  console.log('═══════════════════════════════════════════════════════');
}

// ========================================
// EXPORT
// ========================================

// Exposer les fonctions globalement
window.generatePerformanceTestTemplates = generatePerformanceTestTemplates;
window.cleanupTestTemplates = cleanupTestTemplates;
window.benchmarkLoadPerformance = benchmarkLoadPerformance;

console.log('✅ Script de génération de templates chargé !');
console.log('');
console.log('📚 COMMANDES DISPONIBLES:');
console.log('   generatePerformanceTestTemplates(50) - Générer 50 templates de test');
console.log('   cleanupTestTemplates() - Supprimer tous les templates de test');
console.log('   benchmarkLoadPerformance() - Mesurer la performance avec différentes quantités');
console.log('');
