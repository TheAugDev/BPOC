// Main application logic for the Denton PD Review App

// --- App State ---
let currentChapter = null;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let userAnswers = [];
let officerName = '';
let currentReviewType = null;
let currentUnitId = null;
let currentMode = 'quiz';
let backTargetScreen = 'ROOT'; // Renamed from previousScreen, initialized to ROOT
let dataLoadingPromise = null; // Track data loading status

// Function to ensure external data is loaded
async function ensureDataLoaded() {
    if (!dataLoadingPromise) {
        dataLoadingPromise = loadExternalData();
    }
    return dataLoadingPromise;
}

// --- DOM Elements ---
const mainHeader = document.querySelector('header');
const dpdLogo = document.getElementById('dpd-logo');
const welcomeScreen = document.getElementById('welcome-screen');
const unitSelectionModal = document.getElementById('unit-selection-modal');
const chapterButtonsDiv = document.getElementById('chapter-buttons');
const quizContainerDiv = document.getElementById('quiz-container');
const resultsContainerDiv = document.getElementById('results-container');
const quizTitle = document.getElementById('quiz-title');
const questionNumberSpan = document.getElementById('question-number');
const totalQuestionsSpan = document.getElementById('total-questions');
const questionTextP = document.getElementById('question-text');
const optionsContainerDiv = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const feedbackReference = document.getElementById('feedback-reference');
const scoreSpan = document.getElementById('score');
const nextQuestionBtn = document.getElementById('next-question');

// Back Buttons
const backFromUnitSelectionBtn = document.getElementById('back-from-unit-selection');
const backFromQuizBtn = document.getElementById('back-from-quiz');
const backFromFlashcardBtn = document.getElementById('back-from-flashcard');

// Flashcard DOM Elements
const flashcardContainerDiv = document.getElementById('flashcard-container');
const flashcardTitle = document.getElementById('flashcard-title');
const flashcardNumberSpan = document.getElementById('flashcard-number');
const totalFlashcardsSpan = document.getElementById('total-flashcards');
const flashcardCard = document.getElementById('flashcard-card');
const flashcardQuestionTextP = document.getElementById('flashcard-question-text');
const flashcardAnswerTextP = document.getElementById('flashcard-answer-text');
const flashcardReferenceTextP = document.getElementById('flashcard-reference-text');
const previousFlashcardBtn = document.getElementById('previous-flashcard');
const nextFlashcardBtn = document.getElementById('next-flashcard');
const mainMenuFlashcardBtn = document.getElementById('main-menu-flashcard');

// --- Data ---
const generalOrderChapters = [
    { name: "Sample Unit (1 Question)", id: "unitSample" },
    { name: "Unit 1: Role, Authority & Organization", id: "unit1" },
    { name: "Unit 2: General Operations", id: "unit2" },
    { name: "Unit 3: Critical Incident Response", id: "unit3" },
    { name: "Unit 4: Patrol Operations", id: "unit4" },
    { name: "Unit 5: Special Populations", id: "unit5" },
    { name: "Unit 6: Technology & Media", id: "unit6" },
    { name: "Unit 7: Investigations", id: "unit7" },
    { name: "Unit 8: Equipment", id: "unit8" },
    { name: "Unit 9: Custody", id: "unit9" },
    { name: "Unit 10: Personnel", id: "unit10" },
    { name: "Unit 11: Records, Property & Evidence", id: "unit11" },
    { name: "Unit 12: Support Services", id: "unit12" },
    { name: "Unit 13: Internal Affairs & Ethics", id: "unit13" },
    { name: "Unit 14: Department Property & Appearance", id: "unit14" },
    { name: "Unit 15: Off-Duty Conduct & Secondary Employment", id: "unit15" }
];

const texasConstitutionArticles = [
    { name: "Article 1: Bill of Rights", id: "article1" },
    { name: "Article 3: Legislative Department", id: "article3" },
    { name: "Article 4: Executive Department", id: "article4" },
    { name: "Article 5: Judicial Department", id: "article5" },
    { name: "Article 6: Suffrage", id: "article6" },
    { name: "Article 7: Education", id: "article7" },
    { name: "Article 8: Taxation and Revenue", id: "article8" },
    { name: "Article 9: Counties", id: "article9" },
    { name: "Article 10: Railroads", id: "article10" },
    { name: "Article 11: Municipal Corporations", id: "article11" },
    { name: "Article 12: Private Corporations (Repealed)", id: "article12" },
    { name: "Article 14: Public Lands and Land Office (Repealed)", id: "article14" },
    { name: "Article 15: Impeachment", id: "article15" },
    { name: "Article 16: General Provisions", id: "article16" },
    { name: "Article 17: Mode of Amending the Constitution of this State", id: "article17" }
];

const texasStatuteCodes = [
    { name: "Penal Code", id: "penalCode" },
    { name: "Transportation Code", id: "transportationCode" },
    { name: "Alcoholic Beverage Code", id: "alcoholicBeverageCode" },
    { name: "Health and Safety Code", id: "healthAndSafetyCode" },
    { name: "Family Code", id: "familyCode" },
    { name: "Local Government Code", id: "localGovernmentCode" },
    { name: "Code of Criminal Procedure", id: "codeOfCriminalProcedure" },
    { name: "Education Code", id: "educationCode" },
    { name: "Government Code", id: "governmentCode" },
    { name: "Parks and Wildlife Code", id: "parksAndWildlifeCode" },
    { name: "Business and Commerce Code", id: "businessAndCommerceCode" },
    { name: "Property Code", id: "propertyCode" }
];

const tpcaCriticalAreas = [
    { name: "Use of Force", id: "useOfForce" },
    { name: "Emergency Vehicle Operation and Pursuits", id: "emergencyVehicleOperationAndPursuits" },
    { name: "Search, Seizure, and Arrest", id: "searchSeizureAndArrest" },
    { name: "Care, Custody and Restraint of Prisoners", id: "careCustodyAndRestraintOfPrisoners" },
    { name: "Domestic Violence and agency employee domestic conduct", id: "domesticViolenceAndAgencyEmployeeDomesticConduct" },
    { name: "Off-Duty Conduct", id: "offDutyConduct" },
    { name: "Selection and Hiring", id: "selectionAndHiring" },
    { name: "Sexual Harassment", id: "sexualHarassment" },
    { name: "Complaint and Internal Affairs Management", id: "complaintAndInternalAffairsManagement" },
    { name: "Narcotics, SWAT, and High-Risk Warrant Service", id: "narcoticsSwatAndHighRiskWarrantService" },
    { name: "Dealing with the Mentally Ill and Developmentally Disabled", id: "dealingWithTheMentallyIllAndDevelopmentallyDisabled" },
    { name: "Property and Evidence Management", id: "propertyAndEvidenceManagement" }
];

const bpocWeeks = [
    { name: "Week 1", id: "week1" },
    { name: "Week 2", id: "week2" },
    { name: "Week 3", id: "week3" },
    { name: "Week 4", id: "week4" },
    { name: "Week 5", id: "week5" },
    { name: "Week 6", id: "week6" },
    { name: "Week 7", id: "week7" },
    { name: "Week 8", id: "week8" },
    { name: "Week 9", id: "week9" },
    { name: "Week 10", id: "week10" },
    { name: "Week 11", id: "week11" },
    { name: "Week 12", id: "week12" },
    { name: "Week 13", id: "week13" },
    { name: "Week 14", id: "week14" },
    { name: "Week 15", id: "week15" },
    { name: "Week 16", id: "week16" },
    { name: "Week 17", id: "week17" },
    { name: "Week 18", id: "week18" },
    { name: "Week 19", id: "week19" },
    { name: "Week 20", id: "week20" },
    { name: "Week 21", id: "week21" }
];

const reviewTypes = [
    { id: 'generalOrders', name: 'General Orders', hasUnits: true, chapters: generalOrderChapters, questionLimit: 100 },
    { id: 'tcole', name: 'TCOLE Review', hasUnits: false, questionLimit: 250 },
    { id: 'texasConstitutions', name: 'Texas Constitutions', hasUnits: true, chapters: texasConstitutionArticles, questionLimit: 100 },
    { id: 'texasStatutes', name: 'Texas Statutes', hasUnits: true, chapters: texasStatuteCodes, questionLimit: 100 },
    { id: 'tpcaBestPractices', name: 'TPCA Best Practices', hasUnits: true, chapters: tpcaCriticalAreas, questionLimit: 100 },
    { id: 'BPOC', name: 'BPOC Review', hasUnits: true, chapters: bpocWeeks, questionLimit: 100 }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Attach event listeners for main menu/cancel buttons
    const closeModalBtn = document.getElementById('close-modal');
    const mainMenuQuizBtn = document.getElementById('main-menu-quiz');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', showWelcomeScreen);
    } else {
        console.warn('close-modal button not found during init');
    }
    
    if (mainMenuQuizBtn) {
        mainMenuQuizBtn.addEventListener('click', showWelcomeScreen);
    } else {
        console.warn('main-menu-quiz button not found during init');
    }
    
    // Attach other event listeners
    if (nextQuestionBtn) nextQuestionBtn.addEventListener('click', nextQuestion);
    if (flashcardCard) flashcardCard.addEventListener('click', flipFlashcard);
    if (previousFlashcardBtn) previousFlashcardBtn.addEventListener('click', previousFlashcard);
    if (nextFlashcardBtn) nextFlashcardBtn.addEventListener('click', nextFlashcard);
    if (mainMenuFlashcardBtn) mainMenuFlashcardBtn.addEventListener('click', showWelcomeScreen);    if (backFromUnitSelectionBtn) backFromUnitSelectionBtn.addEventListener('click', goBack);
    if (backFromQuizBtn) backFromQuizBtn.addEventListener('click', goBack);
    if (backFromFlashcardBtn) backFromFlashcardBtn.addEventListener('click', goBack);

    // Add logo click handler to return to home page
    if (dpdLogo) dpdLogo.addEventListener('click', showWelcomeScreen);

    // Ensure we start with the correct initial state
    showWelcomeScreen(); 
    if (quizContainerDiv) quizContainerDiv.classList.add('hidden');
    if (resultsContainerDiv) resultsContainerDiv.classList.add('hidden');
    if (flashcardContainerDiv) flashcardContainerDiv.classList.add('hidden');

    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// --- UI Rendering ---
function renderModeSelection() {
    const welcomeScreenEl = document.getElementById('welcome-screen');
    const modeContainer = document.getElementById('mode-selection-container');
    const buttonsParent = document.getElementById('mode-selection-buttons'); 
    const reviewContainer = document.getElementById('review-type-container');
    const unitModal = document.getElementById('unit-selection-modal');

    // Check for required elements
    if (!welcomeScreenEl || !modeContainer || !buttonsParent) {
        console.error("Critical UI elements missing for renderModeSelection:", {
            welcomeScreenEl: !!welcomeScreenEl,
            modeContainer: !!modeContainer,
            buttonsParent: !!buttonsParent
        });
        return; 
    }
    
    // Ensure correct visibility states
    welcomeScreenEl.classList.remove('hidden');
    if (unitModal) unitModal.classList.add('hidden');
    modeContainer.classList.remove('hidden');
    if (reviewContainer) reviewContainer.classList.add('hidden');

    // Set flex row for side-by-side layout
    buttonsParent.className = 'flex flex-row justify-center gap-3 md:gap-4 mt-4 mb-6';
    buttonsParent.innerHTML = '';

    // Create Quiz button
    const quizButton = document.createElement('button');
    quizButton.className = 'bg-purple-600 text-white px-6 md:px-8 py-3 md:py-3 rounded-lg hover:bg-purple-700 transition-colors text-base md:text-lg min-h-12 md:min-h-auto';
    quizButton.textContent = 'Start Quiz Review';
    quizButton.onclick = () => selectMode('quiz');
    buttonsParent.appendChild(quizButton);

    // Create Flashcard button
    const flashcardButton = document.createElement('button');
    flashcardButton.className = 'bg-teal-600 text-white px-6 md:px-8 py-3 md:py-3 rounded-lg hover:bg-teal-700 transition-colors text-base md:text-lg min-h-12 md:min-h-auto';
    flashcardButton.textContent = 'Start Flashcards';
    flashcardButton.onclick = () => selectMode('flashcards');
    buttonsParent.appendChild(flashcardButton);

    // Set navigation state
    backTargetScreen = 'ROOT';

    // Hide old buttons if they exist
    const oldSingleUnitBtn = document.getElementById('start-single-unit');
    const oldAllUnitsBtn = document.getElementById('start-all-units');
    if(oldSingleUnitBtn) oldSingleUnitBtn.classList.add('hidden');
    if(oldAllUnitsBtn) oldAllUnitsBtn.classList.add('hidden');
}

function selectMode(mode) {
    if (!handleNameCheck()) return;
    currentMode = mode;
    renderReviewTypeSelection(); 
    // backTargetScreen is set by renderReviewTypeSelection
}

function renderReviewTypeSelection() {
    const welcomeScreenEl = document.getElementById('welcome-screen');
    const modeSelectionContainer = document.getElementById('mode-selection-container');
    const reviewTypeContainer = document.getElementById('review-type-container');
    const reviewTypeButtonContainer = document.getElementById('review-type-buttons');
    const unitModal = document.getElementById('unit-selection-modal');

    if (!welcomeScreenEl || !modeSelectionContainer || !reviewTypeContainer || !reviewTypeButtonContainer || !unitModal) {
        console.error("One or more critical UI elements are missing for renderReviewTypeSelection.");
        if (welcomeScreenEl) welcomeScreenEl.classList.remove('hidden');
        return;
    }

    welcomeScreenEl.classList.remove('hidden'); // Ensure overall welcome screen is visible
    unitModal.classList.add('hidden');       // Ensure unit modal is hidden

    if (modeSelectionContainer) modeSelectionContainer.classList.add('hidden');
    if (reviewTypeContainer) reviewTypeContainer.classList.remove('hidden');

    reviewTypeButtonContainer.innerHTML = ''; 

    reviewTypes.forEach(type => {
        const button = document.createElement('button');
        button.className = 'bg-blue-600 text-white px-6 md:px-8 py-3 md:py-3 rounded-lg hover:bg-blue-700 transition-colors text-base md:text-lg min-h-12 md:min-h-auto';
        button.textContent = type.name;
        button.onclick = () => selectReviewType(type);
        reviewTypeButtonContainer.appendChild(button);
    });

    const modeButtonContainer = document.getElementById('mode-selection-buttons');
    if (modeButtonContainer) modeButtonContainer.classList.add('hidden');

    backTargetScreen = 'mode-selection'; // If on review type selection, back goes to mode selection

    const oldSingleUnitBtn = document.getElementById('start-single-unit');
    const oldAllUnitsBtn = document.getElementById('start-all-units');
    if(oldSingleUnitBtn) oldSingleUnitBtn.classList.add('hidden');
    if(oldAllUnitsBtn) oldAllUnitsBtn.classList.add('hidden');
}

function selectReviewType(reviewType) {
    if (!handleNameCheck()) return; 

    currentReviewType = reviewType;
    if (reviewType.hasUnits) {
        let modalTitle = 'Select Unit'; 
        if (currentMode === 'flashcards') modalTitle = `Select Unit for Flashcards`;

        if (reviewType.id === 'texasConstitutions') {
            modalTitle = currentMode === 'flashcards' ? 'Select Article for Flashcards' : 'Select Article';
        } else if (reviewType.id === 'texasStatutes') {
            modalTitle = currentMode === 'flashcards' ? 'Select Statute Code for Flashcards' : 'Select Statute Code';
        } else if (reviewType.id === 'tpcaBestPractices') {
            modalTitle = currentMode === 'flashcards' ? 'Select Critical Area for Flashcards' : 'Select Critical Area';
        } else if (reviewType.id === 'BPOC') {
            modalTitle = currentMode === 'flashcards' ? `Select Week for ${reviewType.name} Flashcards` : `Select Week for ${reviewType.name}`;
        } else if (currentMode === 'flashcards') { 
             modalTitle = `Select Unit for ${reviewType.name} Flashcards`;
        }
        renderChapterButtons(reviewType.chapters, modalTitle);
        unitSelectionModal.classList.remove('hidden');
        // backTargetScreen is set by renderChapterButtons
    } else {
        if (currentMode === 'quiz') {
            startQuiz(reviewType.id, null);
        } else {
            startFlashcards(reviewType.id, null);
        }
        // backTargetScreen is set by startQuiz/startFlashcards
    }
}

function renderChapterButtons(chapters, modalTitle = 'Select Unit') { 
    const modalHeader = unitSelectionModal.querySelector('h2');
    const welcomeScreenEl = document.getElementById('welcome-screen');

    if (modalHeader) {
        modalHeader.textContent = modalTitle;
    }
    chapterButtonsDiv.innerHTML = '';

    // This function populates unitSelectionModal, so ensure it's visible and welcome is hidden
    if (unitSelectionModal) unitSelectionModal.classList.remove('hidden');
    if (welcomeScreenEl) welcomeScreenEl.classList.add('hidden');

    const allButton = document.createElement('button');
    allButton.className = 'w-full bg-green-600 text-white p-3 md:p-4 rounded-lg text-base md:text-lg font-semibold hover:bg-green-700 transition-colors shadow-sm mb-2 min-h-12 md:min-h-auto';
    
    let allButtonText = 'All Units'; 
    if (currentReviewType.id === 'texasConstitutions') {
        allButtonText = 'All Articles';
    } else if (currentReviewType.id === 'texasStatutes') {
        allButtonText = 'All Statute Codes';
    } else if (currentReviewType.id === 'tpcaBestPractices') {
        allButtonText = 'All Critical Areas';
    } else if (currentReviewType.id === 'BPOC') {
        allButtonText = 'All Weeks';
    }
    allButton.textContent = allButtonText;

    allButton.onclick = () => {
        unitSelectionModal.classList.add('hidden');
        if (currentMode === 'quiz') {
            startQuiz(currentReviewType.id, 'all');
        } else {
            startFlashcards(currentReviewType.id, 'all');
        }
        // backTargetScreen is set by startQuiz/startFlashcards
    };
    chapterButtonsDiv.appendChild(allButton);

    chapters.forEach(chapter => {
        const button = document.createElement('button');
        button.className = 'w-full bg-blue-600 text-white p-3 md:p-4 rounded-lg text-base md:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm min-h-12 md:min-h-auto';
        button.textContent = chapter.name;
        button.onclick = () => {
            unitSelectionModal.classList.add('hidden');
            if (currentReviewType.id === 'BPOC') {
                handleBpocWeekSelection(currentReviewType.id, chapter.id);
                // backTargetScreen will be set within handleBpocWeekSelection or renderSubcategorySelection
            } else {
                if (currentMode === 'quiz') {
                    startQuiz(currentReviewType.id, chapter.id);
                } else {
                    startFlashcards(currentReviewType.id, chapter.id);
                }
                // backTargetScreen is set by startQuiz/startFlashcards
            }
        };
        chapterButtonsDiv.appendChild(button);
    });
    backTargetScreen = 'review-type-selection'; // If on chapter/unit selection, back goes to review type selection
}

async function handleBpocWeekSelection(reviewTypeId, weekId) {
    currentUnitId = weekId; 
    let bpocData;
    try {
        // Ensure allReviewData is loaded, or fetch specifically if not.
        // Assuming allReviewData.BPOC is populated by data.js
        if (!allReviewData.BPOC || Object.keys(allReviewData.BPOC).length === 0) {
            console.warn("allReviewData.BPOC not found or empty, attempting to fetch...");
            const response = await fetch(`data/BPOC.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for BPOC.json`);
            const fetchedData = await response.json();
            
            // Initialize allReviewData.BPOC if it doesn't exist
            if (!allReviewData.BPOC) {
                allReviewData.BPOC = {};
            }
            
            // Populate the BPOC data
            for (const weekKey in fetchedData) {
                if (fetchedData.hasOwnProperty(weekKey)) {
                    allReviewData.BPOC[weekKey] = fetchedData[weekKey];
                }
            }
            console.log("BPOC data loaded successfully, weeks available:", Object.keys(allReviewData.BPOC));
        }
        bpocData = allReviewData.BPOC; // Use the globally (or freshly) loaded data
        if (!bpocData) throw new Error("BPOC data could not be loaded or is empty.");

    } catch (error) {
        console.error("Error accessing or fetching BPOC data for subcategory check:", error);
        alert(`Error loading data for ${weekId}. Please try again or check console.`);
        showWelcomeScreen(); 
        return;
    }

    console.log(`Checking week data for ${weekId}:`, bpocData[weekId]);
    const weekData = bpocData[weekId];
    if (typeof weekData === 'object' && weekData !== null && !Array.isArray(weekData)) {
        console.log(`${weekId} has subcategories:`, Object.keys(weekData));
        renderSubcategorySelection(reviewTypeId, weekId, Object.keys(weekData));
        unitSelectionModal.classList.remove('hidden'); 
        // backTargetScreen is set by renderSubcategorySelection
    } else {
        console.log(`${weekId} has no subcategories, starting directly:`, weekData);
        if (currentMode === 'quiz') {
            startQuiz(reviewTypeId, weekId); 
        } else {
            startFlashcards(reviewTypeId, weekId); 
        }
        // backTargetScreen is set by startQuiz/startFlashcards
    }
}

function renderSubcategorySelection(reviewTypeId, weekId, subcategoryNames) {
    const modalHeader = unitSelectionModal.querySelector('h2');
    const weekDisplayName = bpocWeeks.find(w => w.id === weekId)?.name || weekId;
    const welcomeScreenEl = document.getElementById('welcome-screen');

    if (modalHeader) {
        modalHeader.textContent = `Select Subcategory for ${weekDisplayName}`;
    }
    chapterButtonsDiv.innerHTML = ''; 

    // This function populates unitSelectionModal, so ensure it's visible and welcome is hidden
    if (unitSelectionModal) unitSelectionModal.classList.remove('hidden');
    if (welcomeScreenEl) welcomeScreenEl.classList.add('hidden');

    // Filter out empty subcategories by checking if they have questions
    const availableSubcategories = [];
    const weekData = allReviewData.BPOC[weekId];
    
    subcategoryNames.forEach(subcategoryName => {
        const subcategoryData = weekData[subcategoryName];
        if (Array.isArray(subcategoryData) && subcategoryData.length > 0) {
            availableSubcategories.push(subcategoryName);
        }
    });

    console.log(`Available subcategories for ${weekId}:`, availableSubcategories);

    if (availableSubcategories.length === 0) {
        // No subcategories have questions
        const noDataMessage = document.createElement('div');
        noDataMessage.className = 'text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200';
        noDataMessage.innerHTML = `
            <svg class="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <p class="text-lg text-yellow-700 font-medium">${weekDisplayName} - No Questions Available</p>
            <p class="text-sm text-yellow-600 mt-2">This week doesn't have any questions loaded yet. Please check back later or contact your administrator.</p>
        `;
        chapterButtonsDiv.appendChild(noDataMessage);
        backTargetScreen = 'unit-selection';
        return;
    }    // Show "All Available Subcategories" button only if there are multiple subcategories with content
    if (availableSubcategories.length > 1) {
        const totalQuestions = availableSubcategories.reduce((sum, subcatName) => sum + weekData[subcatName].length, 0);        const allSubcategoriesButton = document.createElement('button');
        allSubcategoriesButton.className = 'w-full bg-green-600 text-white p-4 md:p-5 rounded-lg text-base md:text-lg font-semibold hover:bg-green-700 transition-colors shadow-sm mb-3 min-h-12 md:min-h-auto group subcategory-card subcategory-card-green';
        
        allSubcategoriesButton.innerHTML = `
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                <div class="flex-1 text-left">
                    <div class="font-semibold text-white group-hover:text-green-50 transition-colors">
                        All Available Subcategories
                    </div>
                    <div class="text-green-100 text-sm font-normal group-hover:text-green-50 transition-colors">
                        ${weekDisplayName}
                    </div>
                </div>                <div class="flex-shrink-0">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500 text-green-100 group-hover:bg-green-400 transition-colors question-count-badge">
                        ${totalQuestions} total question${totalQuestions === 1 ? '' : 's'}
                    </span>
                </div>
            </div>
        `;
        
        allSubcategoriesButton.onclick = () => {
            unitSelectionModal.classList.add('hidden');
            if (currentMode === 'quiz') {
                startQuiz(reviewTypeId, weekId, 'all_subcategories'); 
            } else {
                startFlashcards(reviewTypeId, weekId, 'all_subcategories');
            }
            // backTargetScreen is set by startQuiz/startFlashcards
        };
        chapterButtonsDiv.appendChild(allSubcategoriesButton);
    }// Add buttons for available subcategories only
    availableSubcategories.forEach(subcategoryName => {
        const questionCount = weekData[subcategoryName].length;        const button = document.createElement('button');
        button.className = 'w-full bg-blue-600 text-white p-4 md:p-5 rounded-lg text-base md:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm min-h-12 md:min-h-auto group subcategory-card subcategory-card-blue';
        
        // Create a better structured layout for desktop
        button.innerHTML = `
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                <div class="flex-1 text-left">
                    <div class="font-semibold text-white group-hover:text-blue-50 transition-colors">
                        ${subcategoryName}
                    </div>
                </div>                <div class="flex-shrink-0">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500 text-blue-100 group-hover:bg-blue-400 transition-colors question-count-badge">
                        ${questionCount} question${questionCount === 1 ? '' : 's'}
                    </span>
                </div>
            </div>
        `;
        
        button.onclick = () => {
            unitSelectionModal.classList.add('hidden');
            if (currentMode === 'quiz') {
                startQuiz(reviewTypeId, weekId, subcategoryName); 
            } else {
                startFlashcards(reviewTypeId, weekId, subcategoryName);
            }
            // backTargetScreen is set by startQuiz/startFlashcards
        };
        chapterButtonsDiv.appendChild(button);
    });    // Show available vs total subcategories info
    const infoMessage = document.createElement('div');
    infoMessage.className = 'text-center text-sm text-gray-600 mt-4 p-3 rounded-lg subcategory-info';
    infoMessage.innerHTML = `
        <div class="flex items-center justify-center gap-2">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Showing <strong>${availableSubcategories.length}</strong> of <strong>${subcategoryNames.length}</strong> subcategories with questions</span>
        </div>
    `;
    chapterButtonsDiv.appendChild(infoMessage);

    backTargetScreen = 'unit-selection'; // If on subcategory selection, back goes to unit (week) selection
}


// --- User Interaction & Flow ---
function handleNameCheck() {
    const nameInput = document.getElementById('officer-name'); 
    officerName = nameInput.value; 
    if (officerName.trim() === '') { 
        nameInput.classList.add('border-red-500', 'ring-red-500');
        nameInput.placeholder = 'Your name is required!';
        setTimeout(() => {
            nameInput.classList.remove('border-red-500', 'ring-red-500');
            nameInput.placeholder = 'Enter your full name';
        }, 2500);
        return false;
    }
    nameInput.classList.remove('border-red-500', 'ring-red-500');
    return true;
}

function showWelcomeScreen() {
     console.log('showWelcomeScreen called');
     
     // Hide all other containers first
     if (quizContainerDiv) quizContainerDiv.classList.add('hidden');
     if (flashcardContainerDiv) flashcardContainerDiv.classList.add('hidden'); 
     if (resultsContainerDiv) {
         resultsContainerDiv.innerHTML = ''; 
         resultsContainerDiv.classList.add('hidden');
     }
     if (unitSelectionModal) unitSelectionModal.classList.add('hidden'); 
     
     // Ensure the main welcome screen element itself is visible
     const welcomeScreenEl = document.getElementById('welcome-screen');
     if (!welcomeScreenEl) {
         console.error('Welcome screen element not found!');
         return;
     }
     welcomeScreenEl.classList.remove('hidden');
     console.log('Welcome screen made visible');
     
     // Show header and footer
     if (mainHeader) mainHeader.classList.remove('hidden');
     const footer = document.getElementById('main-page-footer');
     if (footer) footer.classList.remove('hidden'); 

     // Reset state variables
     currentReviewType = null; 
     currentUnitId = null; 
     currentMode = 'quiz';
     backTargetScreen = 'ROOT';
     
     // Force reset the button containers to initial state
     const modeContainer = document.getElementById('mode-selection-container');
     const reviewContainer = document.getElementById('review-type-container');
     
     if (!modeContainer || !reviewContainer) {
         console.error('Required containers not found!', { modeContainer: !!modeContainer, reviewContainer: !!reviewContainer });
         return;
     }
     
     // Ensure containers are in correct state
     modeContainer.classList.remove('hidden');
     reviewContainer.classList.add('hidden');
     console.log('Containers set to correct visibility state');
     
     // Clear any existing content to prevent conflicts
     const modeButtonsContainer = document.getElementById('mode-selection-buttons');
     const reviewButtonsContainer = document.getElementById('review-type-buttons');
     
     if (modeButtonsContainer) {
         modeButtonsContainer.innerHTML = '';
         console.log('Mode buttons container cleared');
     }
     if (reviewButtonsContainer) {
         reviewButtonsContainer.innerHTML = '';
         console.log('Review buttons container cleared');
     }
     
     // Call renderModeSelection to rebuild the mode buttons
     console.log('About to call renderModeSelection');
     renderModeSelection(); 
     console.log('showWelcomeScreen completed');
}

// --- Back Button Logic ---
function goBack() {
    // Start by hiding all primary content views
    welcomeScreen.classList.add('hidden');
    unitSelectionModal.classList.add('hidden');
    quizContainerDiv.classList.add('hidden');
    flashcardContainerDiv.classList.add('hidden');
    resultsContainerDiv.classList.add('hidden'); 

    mainHeader.classList.remove('hidden');
    document.getElementById('main-page-footer').classList.remove('hidden');

    switch (backTargetScreen) {
        case 'mode-selection':
            renderModeSelection(); 
            break;
        case 'review-type-selection':
            renderReviewTypeSelection(); 
            break;
        case 'unit-selection': 
            if (currentReviewType && currentReviewType.hasUnits) {
                let modalTitle = 'Select Unit'; 
                if (currentReviewType.id === 'texasConstitutions') modalTitle = 'Select Article';
                else if (currentReviewType.id === 'texasStatutes') modalTitle = 'Select Statute Code';
                else if (currentReviewType.id === 'tpcaBestPractices') modalTitle = 'Select Critical Area';
                else if (currentReviewType.id === 'BPOC') modalTitle = `Select Week for ${currentReviewType.name}`;
                else modalTitle = `Select Unit for ${currentReviewType.name}`;
                renderChapterButtons(currentReviewType.chapters, modalTitle);
                // unitSelectionModal.classList.remove('hidden'); // renderChapterButtons now handles this
            } else {
                console.warn("goBack to 'unit-selection' called without valid currentReviewType. Falling back to welcome screen.");
                showWelcomeScreen();
            }
            break;
        case 'subcategory-selection':
            // Ensure allReviewData and allReviewData.BPOC are available
            if (currentReviewType && currentReviewType.id === 'BPOC' && currentUnitId && 
                typeof allReviewData !== 'undefined' && allReviewData.BPOC && 
                typeof allReviewData.BPOC[currentUnitId] === 'object' && 
                !Array.isArray(allReviewData.BPOC[currentUnitId])) {
                renderSubcategorySelection(currentReviewType.id, currentUnitId, Object.keys(allReviewData.BPOC[currentUnitId]));
                // unitSelectionModal.classList.remove('hidden'); // renderSubcategorySelection now handles this
            } else {
                console.warn("goBack to 'subcategory-selection' called with invalid state or missing BPOC data. Fallback initiated.", { currentReviewType, currentUnitId, bpocDataExists: typeof allReviewData !== 'undefined' && !!allReviewData.BPOC });
                if (currentReviewType && currentReviewType.hasUnits) {
                    goBackToUnitSelection(); 
                } else {
                    showWelcomeScreen();
                }
            }
            break;
        case 'ROOT':
        default:
            showWelcomeScreen(); 
            break;
    }
}

function goBackToUnitSelection() { 
    if (currentReviewType && currentReviewType.hasUnits) {
        let modalTitle = 'Select Unit';
        if (currentReviewType.id === 'texasConstitutions') modalTitle = 'Select Article';
        else if (currentReviewType.id === 'texasStatutes') modalTitle = 'Select Statute Code';
        else if (currentReviewType.id === 'tpcaBestPractices') modalTitle = 'Select Critical Area';
        else if (currentReviewType.id === 'BPOC') modalTitle = `Select Week for ${currentReviewType.name}`;
        else modalTitle = `Select Unit for ${currentReviewType.name}`;
        renderChapterButtons(currentReviewType.chapters, modalTitle); // This will show modal and hide welcome
    } else {
        showWelcomeScreen();
    }
}

// --- Quiz Logic ---
async function startQuiz(reviewTypeId, unitId, subcategoryId = null) { 
    mainHeader.classList.remove('hidden');
    document.getElementById('main-page-footer').classList.remove('hidden'); 
    currentUnitId = unitId; 
    // currentReviewType should already be set when selectReviewType was called.

    // Set backTargetScreen based on the screen this quiz is launched FROM
    if (subcategoryId) {
        backTargetScreen = 'subcategory-selection';
    } else if (unitId) { // This includes 'all' or a specific unit/week
        backTargetScreen = 'unit-selection';
    } else { // No unitId implies launched directly from review type (e.g., TCOLE)
        backTargetScreen = 'review-type-selection';
    }

    const reviewTypeDetails = reviewTypes.find(rt => rt.id === reviewTypeId);
    if (!reviewTypeDetails) {
        console.error("Review type details not found for:", reviewTypeId);
        return;
    }

    let questionPool = [];
    let quizName = reviewTypeDetails.name; 
    const questionLimit = reviewTypeDetails.questionLimit;    let allReviewDataForType = {};
    try {
        // Ensure allReviewData is loaded, or fetch specifically if not.
        // Assuming allReviewData[reviewTypeId] is populated by data.js
        if (typeof allReviewData === 'undefined' || !allReviewData[reviewTypeId]) {
            console.warn(`allReviewData.${reviewTypeId} not found, attempting to fetch...`);
            const response = await fetch(`data/${reviewTypeId}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${reviewTypeId}.json`);
            }
            if (typeof allReviewData === 'undefined') { // Initialize allReviewData if it's completely undefined
                window.allReviewData = {}; // Or however it's structured globally
            }
            allReviewData[reviewTypeId] = await response.json();
        }
        allReviewDataForType = allReviewData[reviewTypeId];
        if (!allReviewDataForType) throw new Error (`Data for ${reviewTypeId} could not be loaded or is empty.`);

    } catch (error) {
        console.error("Error fetching review data:", error);
        questionPool = [{ question: `Error loading questions for ${reviewTypeDetails.name}. (${error.message}). Please try again later.`, answer: "OK", options: ["OK"], reference: "N/A" }];
        questions = questionPool;
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        scoreSpan.textContent = score;
        quizTitle.textContent = `Error - ${reviewTypeDetails.name}`;
        totalQuestionsSpan.textContent = questions.length;
        welcomeScreen.classList.add('hidden');
        resultsContainerDiv.innerHTML = '';
        resultsContainerDiv.classList.add('hidden');
        quizContainerDiv.classList.remove('hidden');
        displayQuestion();
        return; 
    }

    if (reviewTypeDetails.id === 'BPOC') {
        if (unitId === 'all') { 
            currentChapter = { name: `Comprehensive BPOC Review`, id: "all" };
            quizName = currentChapter.name;
            for (const weekKey in allReviewDataForType) {
                const weekContent = allReviewDataForType[weekKey];
                if (typeof weekContent === 'object' && !Array.isArray(weekContent)) {
                    questionPool.push(...Object.values(weekContent).flat());
                } else if (Array.isArray(weekContent)) {
                    questionPool.push(...weekContent);
                }
            }
        } else { 
            currentChapter = reviewTypeDetails.chapters.find(c => c.id === unitId); 
            if (!currentChapter) {
                console.error(`BPOC chapter/week not found for id: ${unitId}`);
                questionPool = [{ question: `Week ${unitId} not found.`, answer: "OK", options: ["OK"], reference: "N/A" }];
            } else {
                quizName = `${reviewTypeDetails.name} - ${currentChapter.name}`;
                const weekData = allReviewDataForType[unitId];                if (typeof weekData === 'object' && weekData !== null && !Array.isArray(weekData)) { 
                    if (subcategoryId === 'all_subcategories') {
                        // Filter out empty subcategories and flatten the rest
                        const nonEmptySubcategories = Object.values(weekData).filter(subcat => Array.isArray(subcat) && subcat.length > 0);
                        questionPool = nonEmptySubcategories.flat();
                        quizName += ` - All Available Subcategories`;
                        console.log(`Loaded ${questionPool.length} questions from ${nonEmptySubcategories.length} non-empty subcategories`);
                    } else if (subcategoryId) {
                        // Robust subcategory matching (case-insensitive, trimmed)
                        const subcatKey = Object.keys(weekData).find(k => k.trim().toLowerCase() === subcategoryId.trim().toLowerCase());
                        if (subcatKey && Array.isArray(weekData[subcatKey]) && weekData[subcatKey].length > 0) {
                            questionPool = [...weekData[subcatKey]];
                            quizName += ` - ${subcatKey}`;
                        } else {
                            questionPool = [{ question: `No questions found for subcategory '${subcategoryId}' in ${currentChapter.name}.`, answer: "OK", options: ["OK"], reference: "N/A" }];
                            quizName += ` - Subcategory Not Found`;
                        }
                    } else if (!subcategoryId) {
                        questionPool = [{ question: `Error: Subcategory not selected for ${currentChapter.name}.`, answer: "OK", options: ["OK"], reference: "N/A" }];
                        quizName += ` - Error: No Subcategory`;
                    }
                } else if (Array.isArray(weekData)) { 
                    questionPool = [...weekData]; 
                } else { 
                    questionPool = [{ question: `No questions found for ${currentChapter.name}.`, answer: "OK", options: ["OK"], reference: "N/A" }];
                }
            }
        }
    } else if (reviewTypeDetails.hasUnits) { 
        if (unitId === 'all') {
            currentChapter = { name: `Comprehensive ${reviewTypeDetails.name}`, id: "all" };
            quizName = currentChapter.name;
            if (typeof allReviewDataForType === 'object' && !Array.isArray(allReviewDataForType)) {
                 questionPool = Object.values(allReviewDataForType).flat(); 
            } else if (Array.isArray(allReviewDataForType)) { 
                questionPool = allReviewDataForType;
            } else {
                questionPool = []; 
            }
        } else {
            currentChapter = reviewTypeDetails.chapters.find(c => c.id === unitId);
            if (!currentChapter) {
                console.error(`Chapter not found for id: ${unitId} in review type ${reviewTypeId}`);
                questionPool = [{ question: `Unit ${unitId} not found.`, answer: "OK", options: ["OK"], reference: "N/A" }];
            } else {
                quizName = `${reviewTypeDetails.name} - ${currentChapter.name}`;
                let unitQuestions = allReviewDataForType[unitId];
                if (!unitQuestions || (Array.isArray(unitQuestions) && unitQuestions.length === 0)) {
                    let unitType = 'unit'; 
                    if (reviewTypeId === 'texasConstitutions') unitType = 'article';
                    if (reviewTypeId === 'texasStatutes') unitType = 'statute code';
                    if (reviewTypeId === 'tpcaBestPractices') unitType = 'critical area';
                    unitQuestions = [{ question: `This ${unitType} has no questions yet. Please check back later.`, answer: "OK", options: ["OK"], reference: "N/A" }];
                }
                questionPool = Array.isArray(unitQuestions) ? [...unitQuestions] : [];
                 if (!Array.isArray(unitQuestions)) { 
                    console.error(`Expected array for unit ${unitId} in ${reviewTypeId}, got object:`, unitQuestions);
                    questionPool = [{ question: `Error loading questions for ${currentChapter.name}.`, answer: "OK", options: ["OK"], reference: "N/A" }];
                }
            }
        }
    } else { 
        currentChapter = { name: reviewTypeDetails.name, id: reviewTypeId }; 
        quizName = currentChapter.name;
        questionPool = Array.isArray(allReviewDataForType) ? [...allReviewDataForType] : [];
        if (questionPool.length === 0) {
            questionPool = [{ question: `This section (${reviewTypeDetails.name}) has no questions yet.`, answer: "OK", options: ["OK"], reference: "N/A" }];
        }
    }

    if (questionPool.length > 0 && questionPool.every(q => typeof q === 'object' && q && q.question && q.options && q.answer)) {
        questions = [...questionPool].sort(() => Math.random() - 0.5);
        if (questionLimit && questions.length > questionLimit) {
            questions = questions.slice(0, questionLimit);
        }
    } else if (questionPool.length > 0) { 
        console.warn("Question pool contained invalid items. Filtering them out.", questionPool);
        questions = questionPool.filter(q => typeof q === 'object' && q && q.question && q.options && q.answer);
        if (questions.length === 0) { 
             if (questionPool.length === 1 && questionPool[0].question.toLowerCase().includes("error")) {
                questions = questionPool;
            } else {
                questions = [{ question: "No valid questions could be loaded for this selection.", answer: "OK", options: ["OK"], reference: "N/A" }];
            }
        } else { 
            questions = questions.sort(() => Math.random() - 0.5);
             if (questionLimit && questions.length > questionLimit) {
                questions = questions.slice(0, questionLimit);
            }
        }
    } else { 
        questions = [{ question: "No questions available for this selection.", answer: "OK", options: ["OK"], reference: "N/A" }];
    }
    
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    scoreSpan.textContent = score;
    quizTitle.textContent = quizName; 
    totalQuestionsSpan.textContent = questions.length;
    
    welcomeScreen.classList.add('hidden');
    resultsContainerDiv.innerHTML = '';
    resultsContainerDiv.classList.add('hidden');
    quizContainerDiv.classList.remove('hidden');

    displayQuestion();
}

function displayQuestion() {
    feedbackContainer.classList.add('hidden');
    nextQuestionBtn.classList.add('hidden');

    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    if (!question || typeof question.question === 'undefined') {
        console.error("Invalid question object at index:", currentQuestionIndex, question);
        questionTextP.textContent = "Error: Could not load this question.";
        optionsContainerDiv.innerHTML = '';
        const okButton = document.createElement('button');
        okButton.textContent = "Continue";
        okButton.onclick = nextQuestion;
        optionsContainerDiv.appendChild(okButton);
        nextQuestionBtn.classList.remove('hidden'); 
        return;
    }

    questionNumberSpan.textContent = currentQuestionIndex + 1;
    questionTextP.textContent = question.question;
    optionsContainerDiv.innerHTML = '';
    
    const options = Array.isArray(question.options) ? question.options : [];
    if (options.length === 0 && question.answer === "OK") { 
         const button = document.createElement('button');
        button.className = 'w-full text-left bg-white p-3 md:p-4 border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-blue-500 transition-colors min-h-12 md:min-h-auto text-sm md:text-base';
        button.textContent = "OK";
        button.onclick = () => selectOption(button, "OK", question.answer, question.reference || "N/A");
        optionsContainerDiv.appendChild(button);
    } else {
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'w-full text-left bg-white p-3 md:p-4 border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-blue-500 transition-colors min-h-12 md:min-h-auto text-sm md:text-base';
            button.textContent = option;
            button.onclick = () => selectOption(button, option, question.answer, question.reference);
            optionsContainerDiv.appendChild(button);
        });
    }
}

function selectOption(button, selectedAnswer, correctAnswer, reference) {
    const isCorrect = selectedAnswer.toLowerCase() === correctAnswer.toLowerCase();
    userAnswers.push({ question: questions[currentQuestionIndex].question, selected: selectedAnswer, correct: correctAnswer, isCorrect: isCorrect, reference: reference });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
        button.classList.add('correct');
        feedbackText.textContent = "Correct!";
    } else {
        button.classList.add('incorrect');
        feedbackText.textContent = `Incorrect. The correct answer is: ${correctAnswer}`;
        Array.from(optionsContainerDiv.children).forEach(child => {
            if (child.textContent.toLowerCase() === correctAnswer.toLowerCase()) {
                child.classList.add('correct');
            }
        });
    }
    feedbackReference.textContent = `Reference: ${reference || 'N/A'}`;
    feedbackContainer.classList.remove('hidden');
    
    Array.from(optionsContainerDiv.children).forEach(child => child.classList.add('disabled-option'));
    nextQuestionBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

function showResults() {
    quizContainerDiv.classList.add('hidden');
    resultsContainerDiv.innerHTML = ''; 
    resultsContainerDiv.classList.remove('hidden');
    mainHeader.classList.add('hidden'); 
    document.getElementById('main-page-footer').classList.add('hidden');

    const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
    const correctAnswers = score;
    const incorrectAnswers = questions.length - score;

    // Main Results Container
    const resultsMainDiv = document.createElement('div');
    resultsMainDiv.className = 'bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto results-animation-fade-in results-main-container';
    resultsContainerDiv.appendChild(resultsMainDiv);

    // Header Section with Icon
    const headerSection = document.createElement('div');
    headerSection.className = 'text-center mb-8';
    
    const headerIcon = document.createElement('div');
    headerIcon.className = 'inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4';
    headerIcon.innerHTML = `
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    `;
    headerSection.appendChild(headerIcon);

    const resultsTitleElement = document.createElement('h1');
    resultsTitleElement.className = 'text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2';
    resultsTitleElement.textContent = 'Quiz Completed!';
    headerSection.appendChild(resultsTitleElement);

    const subtitleElement = document.createElement('p');
    subtitleElement.className = 'text-lg text-gray-600';
    subtitleElement.textContent = 'Here are your results';
    headerSection.appendChild(subtitleElement);

    resultsMainDiv.appendChild(headerSection);

    // Officer & Quiz Info Section
    const infoSection = document.createElement('div');
    infoSection.className = 'bg-gray-50 rounded-xl p-4 md:p-6 mb-8';
    
    const officerInfo = document.createElement('div');
    officerInfo.className = 'flex items-center justify-center mb-2';
    officerInfo.innerHTML = `
        <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <span class="text-lg font-medium text-gray-800">Officer: ${officerName}</span>
    `;
    infoSection.appendChild(officerInfo);

    const quizInfo = document.createElement('div');
    quizInfo.className = 'flex items-center justify-center';
    let quizTakenName = quizTitle.textContent || (currentReviewType ? currentReviewType.name : 'Quiz');
    quizInfo.innerHTML = `
        <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <span class="text-lg font-medium text-gray-800">Quiz: ${quizTakenName}</span>
    `;
    infoSection.appendChild(quizInfo);    resultsMainDiv.appendChild(infoSection);

    // Score Section with Circular Progress
    const scoreSection = document.createElement('div');
    scoreSection.className = 'flex flex-col md:flex-row items-center justify-center gap-8 mb-8';    // Circular Progress Indicator
    const progressContainer = document.createElement('div');
    progressContainer.className = 'relative flex items-center justify-center progress-container';
    
    const circumference = 2 * Math.PI * 60;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    let progressColor = '#ef4444'; // red
    if (percentage >= 80) progressColor = '#22c55e'; // green
    else if (percentage >= 70) progressColor = '#eab308'; // yellow
    else if (percentage >= 60) progressColor = '#f97316'; // orange
      progressContainer.innerHTML = `
        <svg class="w-32 h-32 md:w-40 md:h-40 transform -rotate-90" viewBox="0 0 144 144">
            <circle cx="72" cy="72" r="60" stroke="#e5e7eb" stroke-width="8" fill="transparent"></circle>
            <circle cx="72" cy="72" r="60" stroke="${progressColor}" stroke-width="8" fill="transparent" 
                    stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" 
                    stroke-linecap="round" class="transition-all duration-1000 ease-out progress-circle"></circle>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
                <div class="text-2xl md:text-3xl font-bold results-score-pulse" style="color: ${progressColor}">${percentage.toFixed(1)}%</div>
                <div class="text-sm text-gray-600">Score</div>
            </div>
        </div>
    `;
    scoreSection.appendChild(progressContainer);

    // Score Details
    const scoreDetails = document.createElement('div');
    scoreDetails.className = 'text-center md:text-left';

    const scoreTitle = document.createElement('h2');
    scoreTitle.className = 'text-2xl md:text-3xl font-bold text-gray-800 mb-4';
    scoreTitle.textContent = `${score} out of ${questions.length}`;
    scoreDetails.appendChild(scoreTitle);    // Performance Badge
    const performanceBadge = document.createElement('div');
    let badgeClass, badgeText, badgeIcon;
    
    if (percentage >= 90) {
        badgeClass = 'bg-green-100 text-green-800 border-green-200';
        badgeText = 'Excellent Performance';
        badgeIcon = '🏆';
    } else if (percentage >= 80) {
        badgeClass = 'bg-blue-100 text-blue-800 border-blue-200';
        badgeText = 'Good Performance';
        badgeIcon = '👍';
    } else if (percentage >= 70) {
        badgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        badgeText = 'Satisfactory Performance';
        badgeIcon = '📝';
    } else if (percentage >= 60) {
        badgeClass = 'bg-orange-100 text-orange-800 border-orange-200';
        badgeText = 'Needs Improvement';
        badgeIcon = '📚';
    } else {
        badgeClass = 'bg-red-100 text-red-800 border-red-200';
        badgeText = 'Requires Review';
        badgeIcon = '🔄';
    }
    
    performanceBadge.className = `inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${badgeClass} mb-4 performance-badge`;
    performanceBadge.innerHTML = `<span class="mr-2">${badgeIcon}</span>${badgeText}`;
    scoreDetails.appendChild(performanceBadge);

    // Statistics Grid
    const statsGrid = document.createElement('div');
    statsGrid.className = 'grid grid-cols-2 gap-4';
      const correctStat = document.createElement('div');
    correctStat.className = 'bg-green-50 p-3 rounded-lg text-center border border-green-200 stats-card';
    correctStat.innerHTML = `
        <div class="text-lg font-bold text-green-700">${correctAnswers}</div>
        <div class="text-sm text-green-600">Correct</div>
    `;
    statsGrid.appendChild(correctStat);

    const incorrectStat = document.createElement('div');
    incorrectStat.className = 'bg-red-50 p-3 rounded-lg text-center border border-red-200 stats-card';
    incorrectStat.innerHTML = `
        <div class="text-lg font-bold text-red-700">${incorrectAnswers}</div>
        <div class="text-sm text-red-600">Incorrect</div>
    `;
    statsGrid.appendChild(incorrectStat);    scoreDetails.appendChild(statsGrid);
    scoreSection.appendChild(scoreDetails);    resultsMainDiv.appendChild(scoreSection);

    // Action Buttons Section
    const actionButtonsSection = document.createElement('div');
    actionButtonsSection.className = 'flex flex-col sm:flex-row justify-center gap-3 mb-8 action-buttons-section action-buttons-mobile';

    const retryBtn = document.createElement('button');
    retryBtn.className = 'bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center action-button';
    retryBtn.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Retake Quiz
    `;
    retryBtn.onclick = () => {
        if (currentUnitId === 'all') {
            startQuiz(currentReviewType.id, 'all');
        } else {
            startQuiz(currentReviewType.id, currentUnitId);
        }
    };
    actionButtonsSection.appendChild(retryBtn);

    const printBtn = document.createElement('button');
    printBtn.className = 'bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center action-button';
    printBtn.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
        </svg>        Print Results
    `;
    printBtn.onclick = () => {
        generateSupervisorPrintout();
    };
    actionButtonsSection.appendChild(printBtn);

    const mainMenuBtn = document.createElement('button');
    mainMenuBtn.className = 'bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center action-button';
    mainMenuBtn.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        Main Menu
    `;
    mainMenuBtn.onclick = showWelcomeScreen;
    actionButtonsSection.appendChild(mainMenuBtn);

    resultsMainDiv.appendChild(actionButtonsSection);

    if (questions.length > 0 && questions.every(q => q && q.question)) { // Check if questions are valid
        // Review Section Title
        const reviewTitle = document.createElement('h3');
        reviewTitle.className = 'text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center';
        reviewTitle.innerHTML = `
            <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Review Your Answers
        `;
        resultsMainDiv.appendChild(reviewTitle);

        const reviewContainer = document.createElement('div');
        reviewContainer.className = 'space-y-4';        userAnswers.forEach((answer, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = `relative p-6 rounded-xl shadow-lg border-l-4 transition-all duration-300 hover:shadow-xl question-review-card result-card-hover ${
                answer.isCorrect 
                    ? 'bg-green-50 border-l-green-500 hover:bg-green-100' 
                    : 'bg-red-50 border-l-red-500 hover:bg-red-100'
            }`;

            // Question Number Badge
            const questionBadge = document.createElement('div');
            questionBadge.className = `absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white question-badge ${
                answer.isCorrect ? 'bg-green-500' : 'bg-red-500'
            }`;
            questionBadge.textContent = index + 1;
            questionDiv.appendChild(questionBadge);

            // Status Icon
            const statusIcon = document.createElement('div');
            statusIcon.className = 'absolute top-4 right-4 status-icon';
            statusIcon.innerHTML = answer.isCorrect 
                ? `<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                   </svg>`
                : `<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                   </svg>`;
            questionDiv.appendChild(statusIcon);

            const qText = document.createElement('p');
            qText.className = 'text-lg font-semibold text-gray-800 mb-4 pr-10';
            qText.textContent = answer.question;
            questionDiv.appendChild(qText);

            const answerContainer = document.createElement('div');
            answerContainer.className = 'space-y-2';

            const userAnswerDiv = document.createElement('div');
            userAnswerDiv.className = `p-3 rounded-lg ${answer.isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`;
            userAnswerDiv.innerHTML = `
                <div class="flex items-center">
                    <span class="font-medium text-gray-700 mr-2">Your answer:</span>
                    <span class="${answer.isCorrect ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}">${answer.selected}</span>
                </div>
            `;
            answerContainer.appendChild(userAnswerDiv);

            if (!answer.isCorrect) {
                const correctAnswerDiv = document.createElement('div');
                correctAnswerDiv.className = 'p-3 rounded-lg bg-green-100 border border-green-300';
                correctAnswerDiv.innerHTML = `
                    <div class="flex items-center">
                        <span class="font-medium text-gray-700 mr-2">Correct answer:</span>
                        <span class="text-green-700 font-semibold">${answer.correct}</span>
                    </div>
                `;
                answerContainer.appendChild(correctAnswerDiv);
            }

            questionDiv.appendChild(answerContainer);

            if (answer.reference && answer.reference !== "N/A") {
                const referenceDiv = document.createElement('div');
                referenceDiv.className = 'mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200';
                referenceDiv.innerHTML = `
                    <div class="flex items-center text-blue-700">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-sm font-medium">Reference: ${answer.reference}</span>
                    </div>
                `;
                questionDiv.appendChild(referenceDiv);
            }

            reviewContainer.appendChild(questionDiv);        });
        resultsMainDiv.appendChild(reviewContainer);
    } else {
        const noQuestionsDiv = document.createElement('div');
        noQuestionsDiv.className = 'text-center p-8 bg-yellow-50 rounded-xl border border-yellow-200';
        noQuestionsDiv.innerHTML = `
            <svg class="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <p class="text-lg text-yellow-700 font-medium">No Questions Available</p>
            <p class="text-sm text-yellow-600 mt-2">No questions were available for this quiz or an error occurred loading them.</p>        `;        resultsMainDiv.appendChild(noQuestionsDiv);
    }
}


// --- Flashcard Logic ---
async function startFlashcards(reviewTypeId, unitId, subcategoryId = null) {
    mainHeader.classList.remove('hidden');
    document.getElementById('main-page-footer').classList.remove('hidden');
    currentUnitId = unitId;
    // currentReviewType should already be set

    // Set backTargetScreen based on the screen these flashcards are launched FROM
    if (subcategoryId) {
        backTargetScreen = 'subcategory-selection';
    } else if (unitId) { // This includes 'all' or a specific unit/week
        backTargetScreen = 'unit-selection';
    } else { // No unitId implies launched directly from review type
        backTargetScreen = 'review-type-selection';
    }

    const reviewTypeDetails = reviewTypes.find(rt => rt.id === reviewTypeId);
    if (!reviewTypeDetails) {
        console.error("Review type details not found for flashcards:", reviewTypeId);
        return;
    }

    let questionPool = [];
    let cardSetName = reviewTypeDetails.name;
    const questionLimit = reviewTypeDetails.questionLimit;     let allReviewDataForType = {};
    try {
        // Ensure allReviewData is loaded, or fetch specifically if not.
        if (typeof allReviewData === 'undefined' || !allReviewData[reviewTypeId]) {
            console.warn(`allReviewData.${reviewTypeId} not found for flashcards, attempting to fetch...`);
            const response = await fetch(`data/${reviewTypeId}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${reviewTypeId}.json`);
            if (typeof allReviewData === 'undefined') {
                window.allReviewData = {};
            }
            allReviewData[reviewTypeId] = await response.json();
        }
        allReviewDataForType = allReviewData[reviewTypeId];
        if (!allReviewDataForType) throw new Error (`Data for ${reviewTypeId} could not be loaded or is empty for flashcards.`);
    } catch (error) {
        console.error("Error fetching review data for flashcards:", error);
        questionPool = [{ question: `Error loading flashcards for ${reviewTypeDetails.name}. (${error.message})`, answer: "Please try again.", reference: "N/A" }];
    }

    if (reviewTypeDetails.id === 'BPOC') {
        if (unitId === 'all') {
            currentChapter = { name: `Comprehensive BPOC Flashcards`, id: "all" };
            cardSetName = currentChapter.name;
            for (const weekKey in allReviewDataForType) {
                const weekContent = allReviewDataForType[weekKey];
                if (typeof weekContent === 'object' && !Array.isArray(weekContent)) {
                    questionPool.push(...Object.values(weekContent).flat());
                } else if (Array.isArray(weekContent)) {
                    questionPool.push(...weekContent);
                }
            }
        } else { 
            currentChapter = reviewTypeDetails.chapters.find(c => c.id === unitId);
            if (!currentChapter) {
                console.error(`BPOC chapter/week not found for id: ${unitId} in flashcards`);
                questionPool = [{ question: `Week ${unitId} not found for flashcards.`, answer: "Error", reference: "N/A" }];
            } else {
                cardSetName = `${reviewTypeDetails.name} - ${currentChapter.name}`;
                const weekData = allReviewDataForType[unitId];                if (typeof weekData === 'object' && weekData !== null && !Array.isArray(weekData)) {
                    if (subcategoryId === 'all_subcategories') {
                        // Filter out empty subcategories and flatten the rest
                        const nonEmptySubcategories = Object.values(weekData).filter(subcat => Array.isArray(subcat) && subcat.length > 0);
                        questionPool = nonEmptySubcategories.flat();
                        cardSetName += ` - All Available Subcategories`;
                        console.log(`Loaded ${questionPool.length} flashcards from ${nonEmptySubcategories.length} non-empty subcategories`);
                    } else if (subcategoryId && weekData[subcategoryId]) {
                        questionPool = [...weekData[subcategoryId]];
                        cardSetName += ` - ${subcategoryId}`;
                    } else if (!subcategoryId) {
                        console.warn(`BPOC week ${unitId} has subcategories, but none selected for flashcards. Loading all available from week.`);
                        const nonEmptySubcategories = Object.values(weekData).filter(subcat => Array.isArray(subcat) && subcat.length > 0);
                        questionPool = nonEmptySubcategories.flat();
                        cardSetName += ` - All Available Subcategories (Default)`;
                    } else {
                        questionPool = [{ question: `Subcategory '${subcategoryId}' not found in ${currentChapter.name} for flashcards.`, answer: "Error", reference: "N/A" }];
                        cardSetName += ` - Subcategory Not Found`;
                    }
                } else if (Array.isArray(weekData)) {
                    questionPool = [...weekData];
                } else {
                    questionPool = [{ question: `No flashcards found for ${currentChapter.name}.`, answer: "Check later.", reference: "N/A" }];
                }
            }
        }
    } else if (reviewTypeDetails.hasUnits) {
        if (unitId === 'all') {
            currentChapter = { name: `Comprehensive ${reviewTypeDetails.name} Flashcards`, id: "all" };
            cardSetName = currentChapter.name;
            if (typeof allReviewDataForType === 'object' && !Array.isArray(allReviewDataForType)) {
                questionPool = Object.values(allReviewDataForType).flat();
            } else if (Array.isArray(allReviewDataForType)) {
                questionPool = allReviewDataForType;
            } else {
                questionPool = [];
            }
        } else {
            currentChapter = reviewTypeDetails.chapters.find(c => c.id === unitId);
            if (!currentChapter) {
                 console.error(`Chapter not found for id: ${unitId} in flashcards type ${reviewTypeId}`);
                 questionPool = [{ question: `Unit ${unitId} not found for flashcards.`, answer: "Error", reference: "N/A" }];
            } else {
                cardSetName = `${reviewTypeDetails.name} - ${currentChapter.name}`;
                let unitQuestions = allReviewDataForType[unitId];
                if (!unitQuestions || (Array.isArray(unitQuestions) && unitQuestions.length === 0)) {
                    let unitType = 'unit';
                    if (reviewTypeId === 'texasConstitutions') unitType = 'article';
                    if (reviewTypeId === 'texasStatutes') unitType = 'statute code';
                    if (reviewTypeId === 'tpcaBestPractices') unitType = 'critical area';
                    unitQuestions = [{ question: `This ${unitType} has no flashcards yet.`, answer: "Please check back later.", reference: "N/A" }];
                }
                questionPool = Array.isArray(unitQuestions) ? [...unitQuestions] : [];
                if (!Array.isArray(unitQuestions)) {
                    console.error(`Expected array for flashcard unit ${unitId} in ${reviewTypeId}, got object:`, unitQuestions);
                    questionPool = [{ question: `Error loading flashcards for ${currentChapter.name}.`, answer: "Error", reference: "N/A" }];
                }
            }
        }
    } else {
        currentChapter = { name: reviewTypeDetails.name, id: reviewTypeId };
        cardSetName = currentChapter.name;
        questionPool = Array.isArray(allReviewDataForType) ? [...allReviewDataForType] : [];
         if (questionPool.length === 0) {
            questionPool = [{ question: `This section (${reviewTypeDetails.name}) has no flashcards yet.`, answer: "Please check back later.", reference: "N/A" }];
        }
    }

    if (questionPool.length > 0 && questionPool.every(q => typeof q === 'object' && q && q.question && q.answer)) {
        questions = [...questionPool].sort(() => Math.random() - 0.5);
        if (questionLimit && questions.length > questionLimit) {
            questions = questions.slice(0, questionLimit);
        }
    } else if (questionPool.length > 0) {
        console.warn("Flashcard pool contained invalid items. Filtering them out.", questionPool);
        questions = questionPool.filter(q => typeof q === 'object' && q && q.question && q.answer);
        if (questions.length === 0) {
            if (questionPool.length === 1 && questionPool[0].question.toLowerCase().includes("error")) {
                questions = questionPool;
            } else {
                questions = [{ question: "No valid flashcards could be loaded.", answer: "Error", reference: "N/A" }];
            }
        }
    } else {
        questions = [{ question: "No flashcards available for this selection.", answer: "Error", reference: "N/A" }];
    }
    
    currentQuestionIndex = 0; 
    
    flashcardTitle.textContent = cardSetName;
    totalFlashcardsSpan.textContent = questions.length;
    
    welcomeScreen.classList.add('hidden');
    quizContainerDiv.classList.add('hidden');
    resultsContainerDiv.classList.add('hidden');
    flashcardContainerDiv.classList.remove('hidden');

    displayFlashcard();
}


function displayFlashcard() {
    if (!questions || questions.length === 0 || !questions[currentQuestionIndex]) {
        flashcardQuestionTextP.textContent = "No flashcards available or error loading.";
        flashcardAnswerTextP.textContent = "";
        flashcardReferenceTextP.textContent = "";
        flashcardNumberSpan.textContent = "0";
        totalFlashcardsSpan.textContent = "0";
        previousFlashcardBtn.classList.add('hidden');
        nextFlashcardBtn.classList.add('hidden');
        if(flashcardCard) flashcardCard.classList.remove('is-flipped');
        return;
    }

    // Ensure currentQuestionIndex is within bounds
    if (currentQuestionIndex >= questions.length) currentQuestionIndex = questions.length - 1;
    if (currentQuestionIndex < 0) currentQuestionIndex = 0;

    const card = questions[currentQuestionIndex];
    if (!card || typeof card.question === 'undefined' || typeof card.answer === 'undefined') {
        flashcardQuestionTextP.textContent = "Error loading this flashcard.";
        flashcardAnswerTextP.textContent = "Please try again.";
        flashcardReferenceTextP.textContent = "";
    } else {
        flashcardQuestionTextP.textContent = card.question;
        flashcardAnswerTextP.textContent = card.answer;
        flashcardReferenceTextP.textContent = card.reference ? `Reference: ${card.reference}` : "";
    }
    
    flashcardNumberSpan.textContent = currentQuestionIndex + 1;
    totalFlashcardsSpan.textContent = questions.length; // Ensure this is updated if questions array changes
    
    if(flashcardCard) flashcardCard.classList.remove('is-flipped');

    previousFlashcardBtn.classList.remove('hidden');
    nextFlashcardBtn.classList.remove('hidden');
    previousFlashcardBtn.disabled = currentQuestionIndex === 0;
    nextFlashcardBtn.disabled = currentQuestionIndex >= questions.length - 1; // Use >= to be safe

    previousFlashcardBtn.classList.toggle('opacity-50', previousFlashcardBtn.disabled);
    nextFlashcardBtn.classList.toggle('opacity-50', nextFlashcardBtn.disabled);
}

// Flashcard navigation functions
function flipFlashcard() {
    if (flashcardCard) {
        flashcardCard.classList.toggle('is-flipped');
    }
}

function previousFlashcard() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayFlashcard();
    }
}

function nextFlashcard() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayFlashcard();
    }
}

// Function to generate and print supervisor-ready document
function generateSupervisorPrintout() {
    // Prompt for badge/PID number
    const badgeNumber = prompt('Please enter your Badge/PID Number for the training record:', '');
    
    // Check if user cancelled or entered empty value
    if (badgeNumber === null) {
        return; // User cancelled, don't generate printout
    }
    
    // Trim whitespace and check if still empty
    const trimmedBadgeNumber = badgeNumber.trim();
    if (trimmedBadgeNumber === '') {
        alert('Badge/PID Number is required for the training record.');
        return; // Don't generate printout without badge number
    }
    
    // Prompt for supervisor name
    const supervisorName = prompt('Please enter your Supervisor\'s name:', '');
    
    // Check if user cancelled or entered empty value
    if (supervisorName === null) {
        return; // User cancelled, don't generate printout
    }
    
    // Trim whitespace and check if still empty
    const trimmedSupervisorName = supervisorName.trim();
    if (trimmedSupervisorName === '') {
        alert('Supervisor name is required for the training record.');
        return; // Don't generate printout without supervisor name
    }
    
    // Calculate required data
    const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
    const correctAnswers = score;
    const incorrectAnswers = questions.length - score;
    
    // Get current date and time
    const currentDate = new Date().toLocaleDateString('en-US');
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    // Get unit display name
    const reviewTypeDetails = reviewTypes.find(rt => rt.id === currentReviewType?.id);
    let unitDisplayName = 'All Units';
    if (currentUnitId && currentUnitId !== 'all_subcategories' && currentUnitId !== 'all') {
        if (reviewTypeDetails?.chapters) {
            const unit = reviewTypeDetails.chapters.find(c => c.id === currentUnitId);
            if (unit) unitDisplayName = unit.name;
        } else if (currentUnitId.startsWith('week')) {
            unitDisplayName = currentUnitId.replace('week', 'Week ');
        }
    }
    
    // Get quiz name
    let quizTakenName = quizTitle.textContent || (currentReviewType ? currentReviewType.name : 'Quiz');
    
    // Determine performance rating
    let performanceRating, performanceDescription;
    if (percentage >= 90) {
        performanceRating = 'EXCELLENT';
        performanceDescription = 'Demonstrates superior understanding of material';
    } else if (percentage >= 80) {
        performanceRating = 'GOOD';
        performanceDescription = 'Demonstrates satisfactory understanding of material';
    } else if (percentage >= 70) {
        performanceRating = 'SATISFACTORY';
        performanceDescription = 'Meets minimum training requirements';
    } else if (percentage >= 60) {
        performanceRating = 'NEEDS IMPROVEMENT';
        performanceDescription = 'Additional training recommended';
    } else {
        performanceRating = 'UNSATISFACTORY';
        performanceDescription = 'Requires immediate retraining';
    }    // Create print window with supervisor document
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Training Completion Record - ${officerName}</title>
            <style>
                body {
                    font-family: 'Times New Roman', serif;
                    font-size: 12px;
                    line-height: 1.4;
                    margin: 0;
                    padding: 20px;
                    color: black;
                    background: white;
                }
                
                .header {
                    text-align: center;
                    border-bottom: 2px solid black;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }
                
                .header h1 {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 0 0 5px 0;
                }
                
                .header h2 {
                    font-size: 14px;
                    font-weight: normal;
                    margin: 0;
                }
                
                .section {
                    border: 1px solid black;
                    padding: 15px;
                    margin: 15px 0;
                    page-break-inside: avoid;
                }
                
                .section h3 {
                    font-size: 14px;
                    font-weight: bold;
                    margin: 0 0 10px 0;
                    text-decoration: underline;
                }
                
                .info-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .info-table td {
                    padding: 5px 8px;
                    border: 1px solid black;
                    vertical-align: top;
                }
                
                .info-label {
                    font-weight: bold;
                    width: 25%;
                    background: #f0f0f0;
                }
                
                .results-header {
                    background: #f0f0f0;
                    border-bottom: 1px solid black;
                    padding: 8px;
                    font-weight: bold;
                    text-align: center;
                }
                
                .score-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .score-table td {
                    padding: 8px;
                    border: 1px solid black;
                    text-align: center;
                    font-weight: bold;
                }
                
                .performance-rating {
                    text-align: center;
                    padding: 10px;
                    border: 2px solid black;
                    margin: 10px 0;
                    font-size: 14px;
                    font-weight: bold;
                }
                
                .question-item {
                    border-bottom: 1px solid #ccc;
                    padding: 10px;
                    page-break-inside: avoid;
                }
                
                .question-item:last-child {
                    border-bottom: none;
                }
                
                .question-number {
                    font-weight: bold;
                    display: inline-block;
                    width: 30px;
                }
                
                .signature-section {
                    margin-top: 30px;
                    page-break-inside: avoid;
                    border-top: 1px solid black;
                    padding-top: 15px;
                }
                
                .signature-table {
                    width: 100%;
                    margin-top: 20px;
                }
                
                .signature-table td {
                    width: 50%;
                    padding: 15px;
                    vertical-align: top;
                }
                
                .signature-line {
                    border-bottom: 1px solid black;
                    height: 30px;
                    margin-bottom: 5px;
                }
                
                .signature-label {
                    font-size: 11px;
                    text-align: center;
                }
                
                @page {
                    margin: 0.75in;
                }
                
                @media print {
                    body { margin: 0; padding: 0; }
                }
            </style>
        </head>
        <body>            <div class="header">
                <h1>DENTON POLICE DEPARTMENT</h1>
                <h2>TRAINING COMPLETION RECORD</h2>
                <p style="margin: 5px 0; font-size: 11px;">Official Training Documentation - Supervisor Review Required</p>
                <p style="margin: 5px 0; font-size: 10px; color: #666;">Generated: ${currentDate} at ${currentTime}</p>
            </div>
              <div class="section">
                <h3>OFFICER AND TRAINING INFORMATION</h3>
                <table class="info-table">                    <tr>
                        <td class="info-label">Officer Name:</td>
                        <td>${officerName}</td>
                        <td class="info-label">Badge/PID Number:</td>
                        <td>${trimmedBadgeNumber}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Training Module:</td>
                        <td>${quizTakenName}</td>
                        <td class="info-label">Unit/Section:</td>
                        <td>${unitDisplayName}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Date Completed:</td>
                        <td>${currentDate}</td>
                        <td class="info-label">Time Completed:</td>
                        <td>${currentTime}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Total Questions:</td>
                        <td>${questions.length}</td>
                        <td class="info-label">Training Type:</td>
                        <td>${currentMode === 'quiz' ? 'Quiz Assessment' : 'Flashcard Review'}</td>
                    </tr>
                    <tr>                        <td class="info-label">Department:</td>
                        <td>Denton Police Department</td>
                        <td class="info-label">Supervisor:</td>
                        <td>${trimmedSupervisorName}</td>
                    </tr>
                </table>
            </div>
              <div class="section">
                <div class="results-header">ASSESSMENT RESULTS</div>
                <table class="score-table">
                    <tr>
                        <td>Questions Answered</td>
                        <td>Correct Answers</td>
                        <td>Incorrect Answers</td>
                        <td>Percentage Score</td>
                    </tr>
                    <tr>
                        <td>${questions.length}</td>
                        <td>${correctAnswers}</td>
                        <td>${incorrectAnswers}</td>
                        <td>${percentage.toFixed(1)}%</td>
                    </tr>
                </table>
                <div class="performance-rating">
                    PERFORMANCE RATING: ${performanceRating}<br>
                    ${performanceDescription}
                </div>
            </div>
            
            <div class="section">
                <h3>TRAINING SUMMARY</h3>
                <table class="info-table">
                    <tr>
                        <td class="info-label">Areas Covered:</td>
                        <td>${currentReviewType ? currentReviewType.name : 'Professional Standards Review'}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Completion Status:</td>
                        <td>${percentage >= 70 ? 'COMPLETED SUCCESSFULLY' : 'REQUIRES ADDITIONAL TRAINING'}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Next Action Required:</td>
                        <td>${percentage >= 90 ? 'None - Exemplary Performance' : 
                             percentage >= 70 ? 'File for training record' : 
                             'Schedule retraining session'}</td>
                    </tr>
                    <tr>
                        <td class="info-label">Training Platform:</td>
                        <td>Denton PD Professional Standards Review System</td>
                    </tr>
                </table>
            </div>
              <div class="signature-section">
                <h3>CERTIFICATION AND ACKNOWLEDGMENT</h3>
                <p style="margin: 10px 0; font-size: 11px; line-height: 1.5;">
                    I certify that this training assessment was completed as indicated above and that the results 
                    accurately reflect my understanding of the material. I acknowledge that this training is part 
                    of my ongoing professional development and departmental requirements.
                </p>
                
                <table class="signature-table">
                    <tr>
                        <td>
                            <div class="signature-line"></div>
                            <div class="signature-label">Officer Signature</div>
                            <br>
                            <div class="signature-line"></div>
                            <div class="signature-label">Date</div>
                        </td>
                        <td>
                            <div class="signature-line"></div>
                            <div class="signature-label">Supervisor Signature & Badge #</div>
                            <br>
                            <div class="signature-line"></div>
                            <div class="signature-label">Date</div>
                        </td>
                    </tr>
                </table>
                
                <div style="margin-top: 20px; padding: 10px; border: 1px solid black; font-size: 10px;">
                    <strong>FOR TRAINING COORDINATOR USE ONLY:</strong><br>
                    Training Record Filed: ________________ By: ________________ Date: ________________<br>
                    Follow-up Required: ☐ Yes ☐ No &nbsp;&nbsp;&nbsp; Notes: _________________________________<br>
                    File Location: ________________ Review Date: ________________
                </div>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load, then print
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}
