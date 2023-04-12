//Var for each element by ID buttons
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('questions');
var answerButtonsElement = document.getElementById('answer-buttons');
var timerElement = document.getElementById('timer');
var saveButton = document.getElementById('save-btn');
var scoreDisplay = document.getElementById('score-display');
var scoreForm = document.getElementById('score-form');
var gameOver = document.getElementById('game-over');
var shuffledQuestions, currentQuestionIndex;
var timer;
var timeLeft = 60;
var score;
var scoreCount = 0

//event listener for start button to start game
startButton.addEventListener('click', startGame)

//startGame function to start the game
function startGame() {
  startButton.classList.add('hide');
  saveButton.classList.add('hide');
  scoreForm.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();

  if (timer) {
    clearInterval(timer);
  }
  timerElement.textContent = `Time Left: ${timeLeft} seconds left`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft} seconds left`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Function for ending the game.  Ask the user if they want to restart game
function endGame() {
  questionContainerElement.classList.add('hide');
  resetState();
  nextButton.classList.add('hide');
  startButton.innerText = 'Restart';
  startButton.classList.remove('hide');
  saveButton.classList.remove('hide');
  gameOver.classList.remove('hide');
  scoreForm.classList.remove('hide');
  timerElement.textContent = '';
  clearInterval(timer);
  timeLeft = 60;



}
//Setting the next question function to jump from question to question
function setNextQuestion() {
  scoreCount++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endGame();
  }
}

//showQuestion function to show the questions
function showQuestion(question) {
  questionElement.innerText = question.question;

  const shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);

  shuffledAnswers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

//resetState function to reset evetything to default after game is over
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide');
  gameOver.classList.add('hide');
  scoreForm.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

//selectAnswer function
function selectAnswer(event) {
  const selectedButton = event.target
  const correct = selectedButton.dataset.correct
  setStatusClass(selectedButton, correct === 'true')
  Array.from(answerButtonsElement.children).forEach(button => {
    if (button !== selectedButton) {
      setStatusClass(button, false)
    }
  })
  nextButton.classList.remove('hide')
}

//Added nextButton to go from one question to another
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

//setStatusClass function to check which answer is correct and incorrect
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
//questions
var questions = [
  {
    question: 'Which operaror can be used to compare two values?',
    answers: [
      { text: '<>', correct: false },
      { text: '==', correct: true },
      { text: '><', correct: false },
      { text: '=', correct: false }
    ]
  },
  {
    question: 'To declare an array in Java, define the variable type with : ',
    answers: [
      { text: '{}', correct: false },
      { text: '[]', correct: true },
      { text: '())', correct: false },
      { text: '()', correct: false }
    ]
  },
  {
    question: 'Which HTML element do we put the JavaScript?',
    answers: [
      { text: '<scripting>', correct: false },
      { text: '<script>', correct: true },
      { text: '<js>', correct: false },
      { text: '<javascript>', correct: false }
    ]
  }

]

// saveScore function to save score locally
function saveScore() {

}



























