// ===================================================================
// CALCULATOR WIZARD - Navigation & Interactions
// ===================================================================

// Current wizard step (1, 2, or 3)
let currentWizardStep = 1;

// Navigate to next step
function wizardNextStep() {
    if (currentWizardStep >= 3) return;

    // Validate current step before proceeding
    if (currentWizardStep === 1 && !validateStep1()) {
        return;
    }

    currentWizardStep++;
    updateWizardUI();
}

// Navigate to previous step
function wizardPrevStep() {
    if (currentWizardStep <= 1) return;
    currentWizardStep--;
    updateWizardUI();
}

// Go to specific step
function wizardGoToStep(step) {
    if (step < 1 || step > 3) return;
    currentWizardStep = step;
    updateWizardUI();
}

// Update wizard UI based on current step
function updateWizardUI() {
    // Update progress indicator
    document.querySelectorAll('.calc-wizard-step').forEach((stepEl, index) => {
        const stepNum = index + 1;
        stepEl.classList.remove('active', 'completed');

        if (stepNum < currentWizardStep) {
            stepEl.classList.add('completed');
        } else if (stepNum === currentWizardStep) {
            stepEl.classList.add('active');
        }
    });

    // Update connectors
    document.querySelectorAll('.calc-wizard-connector').forEach((connector, index) => {
        if (index + 1 < currentWizardStep) {
            connector.style.background = 'var(--accent-main)';
        } else {
            connector.style.background = 'var(--bg-tertiary)';
        }
    });

    // Show/hide panels with animation
    document.querySelectorAll('.calc-wizard-panel').forEach(panel => {
        const panelNum = parseInt(panel.dataset.panel);
        if (panelNum === currentWizardStep) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    // Re-render Lucide icons for the new panel
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Scroll to top of wizard
    const wizard = document.querySelector('.calc-wizard');
    if (wizard) {
        wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Validate Step 1 (Profile)
function validateStep1() {
    const birthDay = document.getElementById('birth-day').value;
    const birthMonth = document.getElementById('birth-month').value;
    const birthYear = document.getElementById('birth-year').value;
    const gender = document.getElementById('profile-gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const activity = document.getElementById('activity').value;

    const errors = [];

    if (!birthDay || !birthMonth || !birthYear) {
        errors.push('Date de naissance incomplète');
    }

    if (!gender) {
        errors.push('Sexe non sélectionné');
    }

    if (!height || height < 100 || height > 250) {
        errors.push('Taille invalide (100-250 cm)');
    }

    if (!weight || weight < 30 || weight > 300) {
        errors.push('Poids invalide (30-300 kg)');
    }

    if (!activity) {
        errors.push('Niveau d\'activité non sélectionné');
    }

    if (errors.length > 0) {
        showProfileAlert(errors.join('<br>'));
        return false;
    }

    hideProfileAlert();
    return true;
}

// Show profile alert
function showProfileAlert(message) {
    const alert = document.getElementById('profile-alert');
    const messageEl = document.getElementById('profile-alert-message');
    if (alert && messageEl) {
        messageEl.innerHTML = message;
        alert.style.display = 'block';
        alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Hide profile alert
function hideProfileAlert() {
    const alert = document.getElementById('profile-alert');
    if (alert) {
        alert.style.display = 'none';
    }
}

// Select gender (wizard version)
function selectGenderWizard(gender) {
    // Update hidden input
    document.getElementById('profile-gender').value = gender;

    // Update button states
    document.querySelectorAll('.calc-wizard-gender-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.gender === gender) {
            btn.classList.add('active');
        }
    });

    // Auto-save profile
    if (typeof saveProfile === 'function') {
        saveProfile();
    }
}

// Select activity (wizard version)
function selectActivityWizard(activityValue) {
    // Update hidden input
    document.getElementById('activity').value = activityValue;

    // Update button states
    document.querySelectorAll('.calc-wizard-activity-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.activity === activityValue) {
            btn.classList.add('active');
        }
    });

    // Auto-save
    if (typeof saveProfile === 'function') {
        saveProfile();
    }
}

// Override selectGoal for wizard UI
const originalSelectGoal = window.selectGoal;
window.selectGoal = function(goal) {
    // Update wizard goal buttons
    document.querySelectorAll('.calc-wizard-goal-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.goal === goal) {
            btn.classList.add('active');
        }
    });

    // Update pace buttons visibility
    const paceBtnsDeficit = document.getElementById('pace-btns-deficit');
    const paceBtnsMaintain = document.getElementById('pace-btns-maintain');

    if (paceBtnsDeficit && paceBtnsMaintain) {
        if (goal === 'maintain') {
            paceBtnsDeficit.style.display = 'none';
            paceBtnsMaintain.style.display = 'grid';
        } else {
            paceBtnsDeficit.style.display = 'grid';
            paceBtnsMaintain.style.display = 'none';
        }
    }

    // Update pace label
    const paceLabel = document.getElementById('pace-label');
    if (paceLabel) {
        if (goal === 'maintain') {
            paceLabel.innerHTML = '<i data-lucide="pie-chart" style="width: 16px; height: 16px; display: inline; vertical-align: middle; margin-right: 4px;"></i> Quelle répartition préfères-tu ?';
        } else {
            paceLabel.innerHTML = '<i data-lucide="gauge" style="width: 16px; height: 16px; display: inline; vertical-align: middle; margin-right: 4px;"></i> Quel rythme souhaites-tu ?';
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Call original function if it exists
    if (typeof originalSelectGoal === 'function') {
        originalSelectGoal(goal);
    }
};

// Override selectPace for wizard UI
const originalSelectPace = window.selectPace;
window.selectPace = function(pace) {
    // Update wizard pace buttons
    document.querySelectorAll('.calc-wizard-pace-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.pace === pace) {
            btn.classList.add('active');
        }
    });

    // Call original function if it exists
    if (typeof originalSelectPace === 'function') {
        originalSelectPace(pace);
    }
};

// Update macro rings after calculation
function updateMacroRings(protein, carbs, fat, total) {
    const maxMacro = Math.max(protein, carbs, fat);
    const circumference = 2 * Math.PI * 45; // r=45

    // Protein ring
    const proteinBar = document.getElementById('proteinBar');
    if (proteinBar && proteinBar.tagName === 'circle') {
        const proteinPct = (protein / maxMacro) * 100;
        const proteinDash = (proteinPct / 100) * circumference;
        proteinBar.setAttribute('stroke-dasharray', `${proteinDash} ${circumference}`);
    }

    // Carbs ring
    const carbsBar = document.getElementById('carbsBar');
    if (carbsBar && carbsBar.tagName === 'circle') {
        const carbsPct = (carbs / maxMacro) * 100;
        const carbsDash = (carbsPct / 100) * circumference;
        carbsBar.setAttribute('stroke-dasharray', `${carbsDash} ${circumference}`);
    }

    // Fat ring
    const fatBar = document.getElementById('fatBar');
    if (fatBar && fatBar.tagName === 'circle') {
        const fatPct = (fat / maxMacro) * 100;
        const fatDash = (fatPct / 100) * circumference;
        fatBar.setAttribute('stroke-dasharray', `${fatDash} ${circumference}`);
    }
}

// Patch calculateMacros to work with wizard
const originalCalculateMacros = window.calculateMacros;
window.calculateMacros = function() {
    // Validate before calculation
    if (!validateStep1()) {
        wizardGoToStep(1);
        return;
    }

    // Call original calculation
    if (typeof originalCalculateMacros === 'function') {
        originalCalculateMacros();
    }

    // After calculation, update wizard UI
    setTimeout(() => {
        const resultsContent = document.getElementById('results-content');
        const emptyState = document.getElementById('results-empty-state');

        if (resultsContent && resultsContent.style.display !== 'none') {
            // Hide empty state
            if (emptyState) emptyState.style.display = 'none';

            // Get calculated values and update rings
            const protein = parseFloat(document.getElementById('targetProtein')?.textContent) || 0;
            const carbs = parseFloat(document.getElementById('targetCarbs')?.textContent) || 0;
            const fat = parseFloat(document.getElementById('targetFat')?.textContent) || 0;
            const total = parseFloat(document.getElementById('totalCal')?.textContent) || 0;

            updateMacroRings(protein, carbs, fat, total);
        }
    }, 100);
};

// Initialize wizard when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Restore profile values to wizard UI
    setTimeout(() => {
        // Gender
        const gender = document.getElementById('profile-gender')?.value;
        if (gender) {
            document.querySelectorAll('.calc-wizard-gender-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.gender === gender);
            });
        }

        // Activity
        const activity = document.getElementById('activity')?.value;
        if (activity) {
            document.querySelectorAll('.calc-wizard-activity-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.activity === activity);
            });
        }

        // Goal
        const activeGoalBtn = document.querySelector('.goal-btn.active[data-goal]');
        if (activeGoalBtn) {
            const goal = activeGoalBtn.dataset.goal;
            document.querySelectorAll('.calc-wizard-goal-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.goal === goal);
            });
        }
    }, 500);
});

// Expose functions globally
window.wizardNextStep = wizardNextStep;
window.wizardPrevStep = wizardPrevStep;
window.wizardGoToStep = wizardGoToStep;
window.selectGenderWizard = selectGenderWizard;
window.selectActivityWizard = selectActivityWizard;
