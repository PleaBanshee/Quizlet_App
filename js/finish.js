// You can view local storage on Chrome devtools in Application tab
// Browser Local Storage works with a key and a value
// You can store arrays in local storage by sending it as a JSON string
// NB! event.target.value is probably deprecated
const userName = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore') // retrieves score in local storage

const highScores = JSON.parse(localStorage.getItem('highScores')) || []
finalScore.innerText = mostRecentScore;
const MAX_HIGH_SCORES = 5;

userName.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !userName.value // disable btn if no value in the input
})      

let saveHighScore = e => {
     // prevents a default action from happening (in this case, submitting to server)
    e.preventDefault();
    const score = {
        score: mostRecentScore,
        name: userName.value
    }
    highScores.push(score)
    highScores.sort((a, b) => b.score - a.score); // If b higher than a, sort
    // Only saves top 5 high scores
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('../index.html');
}