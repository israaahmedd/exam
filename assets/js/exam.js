const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
        correct: 1
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        choices: ["&lt;script&gt;", "&lt;css&gt;", "&lt;style&gt;"],
        correct: 2
    },
    {
        question: "Which is the correct CSS syntax?",
        choices: ["body {color: black}", "{body:color=black}", "{body;color:black}"],
        correct: 0
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["msg('Hello World');", "alert('Hello World');", "alertBox('Hello World');"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let userAnswers = Array(questions.length).fill(null);

function loadQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h2>${questions[index].question}</h2>
        <form id="question-form">
            ${questions[index].choices.map((choice, i) => `
                <div>
                    <input type="radio" id="choice${i}" name="choice" value="${i}" ${userAnswers[index] === i ? 'checked' : ''}>
                    <label for="choice${i}">${choice}</label>
                </div>
            `).join('')}
        </form>
    `;
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (currentQuestionIndex === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        saveAnswer();
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        saveAnswer();
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

function skipQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else if (currentQuestionIndex === questions.length - 1) {
        currentQuestionIndex = 0;
        loadQuestion(currentQuestionIndex);
    }
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    }
}

function submitExam() {
    saveAnswer();
    const score = userAnswers.reduce((total, answer, index) => answer === questions[index].correct ? total + 1 : total, 0);
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');
    const answersElement = document.getElementById('answers');

    scoreElement.textContent = `Your score is ${score} out of ${questions.length}`;
    answersElement.innerHTML = questions.map((question, index) => `
        <div>
            <h3>${question.question}</h3>
            <p>Your answer: ${question.choices[userAnswers[index]] || 'Not answered'}</p>
            <p>Correct answer: ${question.choices[question.correct]}</p>
        </div>
    `).join('');

    document.getElementById('question-container').style.display = 'none';
    document.getElementById('navigation').style.display = 'none';
    resultContainer.style.display = 'block';
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    const interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (timer < 60) {
            display.style.color = "red";
        }
        
        if (--timer < 0) {
            clearInterval(interval);
            submitExam();
        }
    }, 1000);
}

window.onload = () => {
    loadQuestion(currentQuestionIndex);

    const twoMinutes = 60 * 2;
    const display = document.querySelector('#time');
    startTimer(twoMinutes, display);
};
