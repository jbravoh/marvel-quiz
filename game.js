const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};

let questions = [
    {
        question: 'What year was the Marvel Film, Avengers: Endgame, set in?',
        choice1: '2020',
        choice2: '2019',
        choice3: '2024',
        choice4: '2023',
        answer: 4,
    },
    {
        question: 'Which city does Hawkeye and Black Widow often reminisce?',
        choice1: 'Budapest',
        choice2: 'Prague',
        choice3: 'Istanbul',
        choice4: 'Sokovia',
        answer: 1,
    },
    {
        question: "What  material is Captain America's shield made out of?",
        choice1: 'Adamantium',
        choice2: 'Uru',
        choice3: 'Gironium',
        choice4: 'Vibranium',
        answer: 4,
    },
    {
        question: 'What universal element does the blue infinity stone control?',
        choice1: 'Power',
        choice2: 'Reality',
        choice3: 'Space',
        choice4: 'Time',
        answer: 4,
    },
    {
        question: 'Before becoming Vision, what is the name of Iron Man’s A.I. butler?',
        choice1: 'M.A.R.V.I.N',
        choice2: 'J.A.R.V.I.S',
        choice3: 'H.O.M.E.R',
        choice4: 'A.L.F.R.E.D',
        answer: 2,
    },
    {
        question: "Besides Thor, which Avenger can lift Thor's hammer?",
        choice1: 'Captain America',
        choice2: 'Hulk',
        choice3: 'Tony Stark',
        choice4: 'Black Widow',
        answer: 1,
    },
    {
        question: 'What year was the first Iron Man movie released, kicking off the Marvel Cinematic Universe?',
        choice1: '2005',
        choice2: '2008',
        choice3: '2010',
        choice4: '2012',
        answer: 2,
    },
    {
        question: 'What landmark does Peter Parker rescue his classmates from in Spider-Man: Homecoming?',
        choice1: 'Washington Monument',
        choice2: 'Statue of Liberty',
        choice3: 'Mount Rushmore',
        choice4: 'Golden Gate Bridge',
        answer: 1,
    },
    {
        question: 'What song does Baby Groot dance to at the end of the first Guardian of the Galaxy?',
        choice1: 'Cherry Bomb',
        choice2: 'Ain’t No Mountain High Enough',
        choice3: 'I Want You Back',
        choice4: 'Hooked On A Feeling',
        answer: 3,
    },
    {
        question: 'What type of doctor is Stephen Strange?',
        choice1: 'Plastic Surgeon',
        choice2: 'Cardiothoracic Surgeon',
        choice3: 'Trauma Surgeon',
        choice4: 'Neurosurgeon',
        answer: 4,
    },
    
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('most-recent-score', score);

        return window.location.assign('/end.html')
    }

    questionCounter++
    // E.g. question 1 of 5
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    // Calculare what question we are on and will correspond that with a percentage
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    //calculate value of question index
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    //Keep track of what question we are on
    currentQuestion = availableQuestions[questionsIndex]
    //Know what question to ask
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000)
    })

})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


startGame()
