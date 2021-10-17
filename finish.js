// You can view local storage on Chrome devtools in Application tab
const userName = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore') // retrieves score in local storage

finalScore.innerText = mostRecentScore;

userName.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !event.target.value // disable btn if no value in the input
})      

let saveHighScore = e => {
     // prevents a default action from happening (in this case, submitting to server)
    e.preventDefault();
}