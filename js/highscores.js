const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// map --- creates a new array populated with the results of calling a provided function on every element in the calling array
highScoresList.innerHTML = highScores.map(score => {
    return `<li  class="high-score">${score.name} - ${score.score}</li>`
}).join("")