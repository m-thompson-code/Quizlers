const TIME_LIMIT = 60 * 1000;

let highscores = [{
    initals: 'moo',
    score: 10
}];

const questions = [
    {
        question: "How now brown cow How now brown cow How now brown cow 1",
        answers: [
            1, 2, 3, 4,
        ],
        correctAnswer: 1,
    },
    {
        question: "How now brown cow How now brown cow How now brown cow 2",
        answers: [
            1, 2, 3, 4,
        ],
        correctAnswer: 2,
    },
    {
        question: "How now brown cow How now brown cow How now brown cow 3",
        answers: [
            1, 2, 3, 4,
        ],
        correctAnswer: 3,
    },
];

const topSectionEle = document.getElementById('top-section');
const introEle = document.getElementById('intro');
const startEle = document.getElementById('start');
const quizEle = document.getElementById('quiz');
const questionEle = document.getElementById('question');
const answerEles = [
    document.getElementById('answer-1'),
    document.getElementById('answer-2'),
    document.getElementById('answer-3'),
    document.getElementById('answer-4'),
];
const submitEle = document.getElementById('submit');
const scoreEle = document.getElementById('score');
const highscoresContainerEle = document.getElementById('highscores-container');
const highscoresEle = document.getElementById('highscores');
const backEle = document.getElementById('back');
const clearHighscoresEle = document.getElementById('clear-highscores');

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

// Main functions

function startQuiz() {
    showTopSection();
    hideIntro();
    showQuiz();
    hideSubmit();
    hideHighscoresContainer();

    // TODO: timer

    // TODO: populate question
    // TODO: populate answers
}

function displayHighscores() {
    hideTopSection();
    hideIntro();
    hideQuiz();
    hideSubmit();
    showHighscoresContainer();

    highscoresEle.innerHTML = "";
    console.log('test');

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

startEle.onclick = () => {
    startQuiz();
}

backEle.onclick = () => {
    startQuiz();
}

clearHighscoresEle.onclick = () => {
    clearHighscores();
}
