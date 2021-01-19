let timerValue = 60;

let highscores = [];

let correctAnswers = 0;

const questions = [
    {
        text: "What color is a brown cow",
        answers: [
            'Brown', 'How', 'Now', 'Cow?', 
        ], 
        correctAnswerIndex: 0,
    },
    {
        text: "What is 2 + 2",
        answers: [
            'The number 22', 'The number 4', 'undefined or something', 'Why not cow?', 
        ], 
        correctAnswerIndex: 1, 
    },
    {
        text: "When is the best time to reflect on life?",
        answers: [
            'Never', 'Always at the end of your day', 'Whatever fits you', 'Twice a week', 
        ], 
        correctAnswerIndex: 2, 
    },
];

// Top Section
const topSectionEle = document.getElementById('top-section');
const highscoreLinkEle = document.getElementById('highscore-link');
const timerEle = document.getElementById('timer');

// Intro
const introEle = document.getElementById('intro');
const startEle = document.getElementById('start');

// Quiz
const quizEle = document.getElementById('quiz');
const questionEle = document.getElementById('question');
const answerEles = [
    document.getElementById('answer-1'),
    document.getElementById('answer-2'),
    document.getElementById('answer-3'),
    document.getElementById('answer-4'),
];

// Submit
const submitEle = document.getElementById('submit');
const scoreEle = document.getElementById('score');
const initalsEle = document.getElementById('initals');
const submitInitalsEle = document.getElementById('submit-initals');

// Highscore
const highscoresContainerEle = document.getElementById('highscores-container');
const highscoresEle = document.getElementById('highscores');
const backEle = document.getElementById('back');
const clearHighscoresEle = document.getElementById('clear-highscores');

const statusTextEle = document.getElementById('status-text');

// Helpers

function showIntro() {
    introEle.classList.remove('hide');
}
function hideIntro() {
    introEle.classList.add('hide');
}

function showTopSection() {
    topSectionEle.classList.remove('hide');
}
function hideTopSection() {
    topSectionEle.classList.add('hide');
}

function showQuiz() {
    quizEle.classList.remove('hide');
}
function hideQuiz() {
    quizEle.classList.add('hide');
}

function showSubmit() {
    submitEle.classList.remove('hide');
}
function hideSubmit() {
    submitEle.classList.add('hide');
}

function showHighscoresContainer() {
    highscoresContainerEle.classList.remove('hide');
}
function hideHighscoresContainer() {
    highscoresContainerEle.classList.add('hide');
}

function getParagraph(text) {
    const p = document.createElement('p');

    p.innerText = text;

    return p;
}

function showStatusText() {
    statusTextEle.classList.remove('hide');
}
function hideStatusText() {
    statusTextEle.classList.add('hide');
}

// Main functions

function displayIntro() {
    hideTopSection();
    showIntro();
    hideQuiz();
    hideSubmit();
    hideHighscoresContainer();

    endQuiz();
}

let currentQuestionIndex = 0;

function startQuiz() {
    showTopSection();
    hideIntro();
    showQuiz();
    hideSubmit();
    hideHighscoresContainer();

    // Reset quiz state
    currentQuestionIndex = 0;
    correctAnswers = 0;

    renderQuiz();
    startTimer();
}

function endQuiz() {
    clearInterval(timerInterval);
}

let timerInterval;

function startTimer() {
    // Reset timer (in seconds)
    timerValue = 60;

    handleRenderingTimer();

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timerValue -= 1;

        handleRenderingTimer();
    }, 1000);
}

function handleRenderingTimer() {
    if (timerValue <= 0) {
        displaySubmitForm();
        clearInterval(timerInterval);
        return;
    }

    timerEle.innerText = 'Time: ' + timerValue;
}

function renderQuiz() {
    question = questions[currentQuestionIndex];

    questionEle.innerText = question.text;

    answers = question.answers;

    for (let i = 0; i < answers.length; i++) {
        const answerText = answers[i];
        answerEles[i].innerText = answerText;
    }
}

function selectAnswer(index) {
    const question = questions[currentQuestionIndex];

    // Handle if they got the right or wrong answer
    if (question.correctAnswerIndex === index) {
        correctAnswers += 1;
        setStatusText('Correct!');
    } else {
        setStatusText('Wrong!');

        // 10 second penality for getting the wrong answer
        timerValue -= 10;

        handleRenderingTimer();
    }

    currentQuestionIndex += 1;

    if (currentQuestionIndex >= questions.length) {
        displaySubmitForm();
        return;
    }

    renderQuiz();
}

let statusTextTimeout;

function setStatusText(text) {
    clearTimeout(statusTextTimeout)
    statusTextEle.innerText = text;

    showStatusText();

    statusTextTimeout = setTimeout(() => {
        hideStatusText();
    }, 1000);
}

function displaySubmitForm() {
    hideTopSection();
    hideIntro();
    hideQuiz();
    showSubmit();
    hideHighscoresContainer();

    endQuiz();

    scoreEle.innerText = correctAnswers;
}

function submitScore(initals, score) {
    highscores.push({
        initals: initals || "ABC",
        score: score,
    });

    highscores.sort((a, b) => {
        return b.score - a.score;
    });

    displayHighscores();
}

function displayHighscores() {
    hideTopSection();
    hideIntro();
    hideQuiz();
    hideSubmit();
    showHighscoresContainer();

    endQuiz();

    highscoresEle.innerHTML = "";

    if (!highscores.length) {
        highscoresEle.append(getParagraph('No highscores'));
    }

    for (let i = 0; i < highscores.length; i++) {
        const initals = highscores[i].initals;
        const score = highscores[i].score;

        const p = getParagraph((i + 1) + '. ' + initals + ' - ' + score);

        p.classList.add('highlight');

        highscoresEle.append(p);
    }
}

function clearHighscores() {
    highscores = [];

    displayHighscores();
}

// Top Section
highscoreLinkEle.onclick = () => {
    displayHighscores();
}

// Intro
startEle.onclick = () => {
    startQuiz();
}

// Quiz
for (let i = 0; i < answerEles.length; i++) {
    const answerEle = answerEles[i];

    answerEle.onclick = () => {
        selectAnswer(i);
    }
}

// Highscores
backEle.onclick = () => {
    displayIntro();
}

clearHighscoresEle.onclick = () => {
    clearHighscores();
}

// Submit
submitInitalsEle.onclick = () => {
    console.log("test");
    const initals = initalsEle.value;

    submitScore(initals, correctAnswers);
}
