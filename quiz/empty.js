var timeEl = document.querySelector("#secondsLeft");
var mainEl = document.getElementById("main");
var button = document.querySelector(".button")
var secondsLeft = 0;
var gameScore = 0;
var questionEl = -1;
var timer;

var questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<javascript>", "<scripting>", "<js>"],
    answer: "<script>"
},
{
    title: "The external JavaScript file must contain the <script> tag?",
    choices: ["true", "false"],
    answer: "false"
},
{
    title: "Which of the following is the correct syntax to display 'Bootcamp' in an alert box using JavaScript?",
    choices: ["alertbox('Bootcamp');", "msg('Bootcamp');", "msgalert('Bootcamp');", "alert('Bootcamp');"],
    answer: "alert('Bootcamp');"
},
{
    title: "Which of the following is not a reserved word in JavaScript?",
    choices: ["interface", "program", "throws", "short"],
    answer: "program"
},
{
    title: "How do you create a function in JavaScript?",
    choices: ["function:myFunction()", "function = myFunction()", "function myFunction()"],
    answer: "function myFunction()"
  }
]

function start() {
  secondsLeft = 75;
  document.getElementById("#secondsLeft").innerHTML = secondsLeft;

  timer = setInterval(function() {
    secondsLeft--;
    document.getElementById("#secondsLeft").innerHTML = secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timer);
      endGame();

    }
  }, 1000);

  next();

}

function endGame() {
  clearInterval(timer);

  var gameOver = `
  <h2>Game over<h2>
  <h3>Your score was ` + gameScore + ` /100!</h3>
  <h3>That means you got a score of ` + gameScore / 20 + ` questions correct!</h3>
  <input type="text" id="name" placeholder="Your initials">
  <button onClick="setScore()">Set Score!</button>`;

  document.getElementById("quizBody").innerHTML = gameOver;

}

function setScore() {
  localStorage.setItem("highscore", gameScore);
  localStorage.setItem("highscoreName", document.getElementById('name').value);
  getScore();
}

function getScore() {
  var gameOver = `
  <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
  <h1>` + localStorage.getItem("highscore") + `</h1><br> 
  
  <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
  
  `;

  document.getElementById("quizBody").innerHTML = gameOver;
}

function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName",  "");

  resetGame();
}

function resetGame() {
  clearInterval(timer);
  score = 0;
  questionEl = -1;
  secondsLeft = 0;
  timer = null;

  document.getElementById("secondsLeft").innerHTML = secondsLeft;

  var gameOver = `
  <h1>
      JavaScript Quiz!
  </h1>
  <h3>
      Click to play!   
  </h3>
  <button onclick="start()">Start!</button>`;

  document.getElementById("quizBody").innerHTML = gameOver;
}

function incorrect() {
  secondsLeft -= 15; 
  next();
}

function correct() {
  gameScore += 20; 
  next();
}

function next() {
  questionEl++;

  if (questionEl > questions.length - 1) {
    endGame();
    return;
  }

  var gameOver = "<h2>" + questions[questionEl].title + "</h2>"

  for (var buttonLoop = 0; buttonLoop < questions[questionEl].choices.length; buttonLoop++) {
      var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
      buttonCode = buttonCode.replace("[CHOICE]", questions[questionEl].choices[buttonLoop]);
      if (questions[questionEl].choices[buttonLoop] == questions[questionEl].answer) {
          buttonCode = buttonCode.replace("[ANS]", "correct()");
      } else {
          buttonCode = buttonCode.replace("[ANS]", "incorrect()");
      }
      questionEl += buttonCode
  }


  document.getElementById("quizBody").innerHTML = gameOver;
}

