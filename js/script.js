// Main application logic for the Denton PD Review App

// --- App State ---
let currentChapter = null;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let userAnswers = [];
let officerName = ''; // Renamed from recruitName

// --- DOM Elements ---
const nameInput = document.getElementById('officer-name'); // Changed ID
const mainHeader = document.querySelector('header');
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
const emailModal = document.getElementById('email-modal');

// --- Data ---
const chaptersData = [
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
    { name: "Unit 15: Off-Duty Conduct & Secondary Employment", id: "unit15" },
    { name: "Unit 16: Health & Wellness", id: "unit16" },
    { name: "Unit 17: Internal Affairs", id: "unit17" }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('start-single-unit').addEventListener('click', showUnitSelection);
    document.getElementById('start-all-units').addEventListener('click', startAllUnitsQuiz);
    document.getElementById('close-modal').addEventListener('click', () => unitSelectionModal.classList.add('hidden'));
    document.getElementById('main-menu-quiz').addEventListener('click', showWelcomeScreen);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    document.getElementById('send-email-btn').addEventListener('click', sendEmail);
    document.getElementById('cancel-email-btn').addEventListener('click', () => emailModal.classList.add('hidden'));
    renderChapterButtons();
    // Hide containers that shouldn't be visible on load
    quizContainerDiv.classList.add('hidden');
    resultsContainerDiv.classList.add('hidden');
}

// --- UI Rendering ---
function renderChapterButtons() {
    chapterButtonsDiv.innerHTML = '';
    chaptersData.forEach(chapter => {
        const button = document.createElement('button');
        button.className = 'w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm';
        button.textContent = chapter.name;
        button.onclick = () => {
            unitSelectionModal.classList.add('hidden');
            startQuiz(chapter.id);
        };
        chapterButtonsDiv.appendChild(button);
    });
}

// --- User Interaction & Flow ---
function handleNameCheck() {
    // const nameInput = document.getElementById('recruit-name'); // Already changed above
    officerName = nameInput.value; // Renamed from recruitName
    if (officerName.trim() === '') { // Renamed from recruitName
        nameInput.classList.add('border-red-500');
        nameInput.placeholder = 'Your name is required!';
        setTimeout(() => {
            nameInput.classList.remove('border-red-500');
            nameInput.placeholder = 'Enter your full name';
        }, 2500);
        return false;
    }
    nameInput.classList.remove('border-red-500');
    return true;
}

function showUnitSelection() {
    if (handleNameCheck()) {
        unitSelectionModal.classList.remove('hidden');
    }
}

function showWelcomeScreen() {
     quizContainerDiv.classList.add('hidden');
     resultsContainerDiv.innerHTML = '';
     resultsContainerDiv.classList.add('hidden');
     welcomeScreen.classList.remove('hidden');
     mainHeader.classList.remove('hidden');
}

function startAllUnitsQuiz() {
    if (handleNameCheck()) {
        startQuiz('all');
    }
}

// --- Quiz Logic ---
function startQuiz(unitId) {
    mainHeader.classList.remove('hidden');

    if (unitId === 'all') {
        currentChapter = { name: "Comprehensive Review (All Units)", id: "all" };
        questions = Object.values(allQuestions).flat().sort(() => Math.random() - 0.5);
    } else {
        currentChapter = chaptersData.find(c => c.id === unitId);
        if (!currentChapter) return;
        
        let questionSet = allQuestions[unitId];
        // Ensure placeholder is not used, provide a default if empty
        if (!questionSet || questionSet.length === 0) {
            questionSet = [{ question: "This unit has no questions yet. Please check back later.", answer: "OK", options: ["OK"], reference: "N/A" }];
        }

        if (unitId === 'unitSample') {
            questions = [...questionSet];
        } else {
            questions = [...questionSet].sort(() => Math.random() - 0.5).slice(0, 100);
        }
    }
    
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    scoreSpan.textContent = score;
    quizTitle.textContent = currentChapter.name;
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
    questionNumberSpan.textContent = currentQuestionIndex + 1;
    questionTextP.textContent = question.question;
    optionsContainerDiv.innerHTML = '';
    
    const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'w-full text-left bg-white p-4 border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-blue-500 transition-colors';
        button.textContent = option;
        button.onclick = () => selectOption(button, option, question.answer, question.reference);
        optionsContainerDiv.appendChild(button);
    });
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
    feedbackReference.textContent = `Reference: ${reference}`;
    feedbackContainer.classList.remove('hidden');
    
    Array.from(optionsContainerDiv.children).forEach(child => child.classList.add('disabled-option'));
    nextQuestionBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// --- Results & Reporting ---
function getRecommendations() {
    const incorrectAnswers = userAnswers.filter(a => !a.isCorrect);
    if(incorrectAnswers.length === 0) {
        return '<p>Excellent work! No specific areas for review based on this perfect score. Continue to stay familiar with all General Orders.</p>';
    }
    
    const topics = {};
    incorrectAnswers.forEach(ans => {
        if (ans.reference === 'N/A') return;
        const chapter = ans.reference.split(' ')[0].replace('GO', 'Chapter');
        if(topics[chapter]){
            topics[chapter]++;
        } else {
            topics[chapter] = 1;
        }
    });

    if (Object.keys(topics).length === 0) {
         return '<p>Good effort. Please review the sample material again.</p>';
    }

    let recommendations = '<p class="mb-4">Based on your results, it is recommended to focus your review on the following areas:</p><ul class="list-disc list-inside space-y-2">';
    for(const topic in topics) {
        recommendations += `<li><strong>${topic}:</strong> You missed ${topics[topic]} question(s) in this area. A thorough review of this chapter in the General Orders is advised.</li>`;
    }
    recommendations += '</ul>';
    return recommendations;
}

function generateReportHTML() {
    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(0) : 0;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const recommendations = getRecommendations();

    return `
        <div class="report-container">
            <header class="report-header">
                <img src="assets/DPD email logo.png" alt="Denton PD Logo" class="logo">
                <h1>Performance Review</h1>
                <p>Denton Police Department</p>
                <p class="date">Date: ${date}</p>
            </header>
            <section class="officer-info"> <!-- Renamed class -->
                <h3>Officer Information</h3> <!-- Renamed text -->
                <p><strong>Name:</strong> ${officerName}</p> <!-- Renamed variable -->
                <p><strong>Assessment Type:</strong> ${currentChapter.name}</p>
            </section>
            <section class="performance-summary">
                <h3>Performance Summary</h3>
                <p><strong>Score:</strong> ${score} out of ${totalQuestions} (${percentage}%)</p>
                <div class="score-breakdown">
                    <div>
                        <span class="label">Correct Answers:</span>
                        <span class="value">${score}</span>
                    </div>
                    <div>
                        <span class="label">Incorrect Answers:</span>
                        <span class="value">${totalQuestions - score}</span>
                    </div>
                </div>
            </section>
            <section class="recommendations-section">
                <h3>Recommendations for Review</h3>
                ${recommendations}
            </section>
            <section class="signature-section">
                <div class="signature-line">
                    <p>Officer Signature:</p> <!-- Renamed text -->
                    <div></div>
                </div>
                <div class="signature-line">
                    <p>Supervisor Signature:</p>
                    <div></div>
                </div>
            </section>
        </div>
    `;
}

function showResults() {
    quizContainerDiv.classList.add('hidden');
    mainHeader.classList.add('hidden'); // Hide main header on results page
    const reportHTML = generateReportHTML();
    resultsContainerDiv.innerHTML = reportHTML;
    resultsContainerDiv.classList.remove('hidden');
    document.getElementById('print-area').innerHTML = reportHTML; // Prepare for printing


    // Animate the progress ring
    const circle = document.querySelector('.progress-ring__circle');
    if (circle) {
        // This forces a reflow, which is necessary for the transition to work on the first render
        circle.getBoundingClientRect(); 
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const scorePercentage = questions.length > 0 ? (score / questions.length) : 0;
        const offset = circumference - scorePercentage * circumference;
        circle.style.strokeDashoffset = offset;
    }

    document.getElementById('email-report-btn').addEventListener('click', () => emailModal.classList.remove('hidden'));
    document.getElementById('main-menu-results').addEventListener('click', showWelcomeScreen);
    document.getElementById('print-report-btn').addEventListener('click', () => window.print());
}

function sendEmail() {
    const emailTo = document.getElementById('supervisor-email').value;
    const subject = `Performance Review for ${officerName}`; // Renamed variable
    const body = `
        <h1>Performance Review</h1>
        <p><strong>Officer:</strong> ${officerName}</p> <!-- Renamed variable -->
        <p><strong>Assessment Type:</strong> ${currentChapter.name}</p>
        <p><strong>Score:</strong> ${score} out of ${questions.length} (${(score/questions.length*100).toFixed(2)}%)</p>
        <h3>Recommendations for Review:</h3>
        ${getRecommendations()}
        <p><em>This is an automated report from the DPD Interactive Review System.</em></p>
    `;
    
    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    emailModal.classList.add('hidden');
}
