// NB! === is a strict comparison (also checks for types). == just checks for values
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const progressBarFull = document.getElementById("progressBarFull");
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader")
const game = document.getElementById("game")


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
let questions = []

// pulls in data from accross the web or any json file
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple')
.then(res => {
    return res.json(); // sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON
})
.then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
        const formatQuestion = {
            question: loadedQuestion.question
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formatQuestion.answer = Math.floor(Math.random()*4) + 1;
        answerChoices.splice(formatQuestion.answer - 1,0,loadedQuestion.correct_answer)
        answerChoices.forEach((choice,i) => {
              formatQuestion['choice'+(i+1)] = choice;
        })
        return formatQuestion;
    });
    startGame();
})
.catch(err => {
    console.log(`Something went wrong ... ${err}`)
})

let startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];  // spread operator: load all elements into assigned object
    getNewQuestion();
    game.classList.remove("hidden") // show questions
    loader.classList.add("hidden") // hide loader
};

let getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) { // if no questions left, do the following:
        //go to the end page
        localStorage.setItem('mostRecentScore',score); // stores value of highscore so it can be accessible later
        return window.location.assign("../html/finish.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`; // width must be percentage in this case

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return; // ignore the button click
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        // ternary operator
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000)
    });
});

let incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
}