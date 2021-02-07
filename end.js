
const finalScore = document.querySelector('#final-score');
const mostRecentScore = localStorage.getItem('most-recent-score');

finalScore.innerText = mostRecentScore

// saveHighScore = e => {
//     e.preventDefault()

//     const score = {
//         score: mostRecentScore
//     }
// }