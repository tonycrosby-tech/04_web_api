//question, choices, answers     
var questions = [{
    "title": "Which of the following is the correct syntax to display 'Bootcamp' in an alert box using JavaScript?",
    "choices": ["alertbox('Bootcamp');","msg('Bootcamp');", "msgalert('Bootcamp');", "alert('Bootcamp');"],
    "answer": "alert('Bootcamp');"
},
{
    "title": "Which of the following is not a reserved word in JavaScript?",
    "choices": ["interface", "program", "throws", "short"],
    "answer": "program"
},
{
    "title": " How do you create a function in JavaScript?",
    "choices": ["function:myFunction()", "function = myFunction()", "function myFunction()"],
    "answer": "function myFunction()"
},
{
    "title": "The external JavaScript file must contain the script tag?",
    "choices": [" true ", " false "],
    "answer": " false "
},
{
    "title": "Where is the correct place to insert a JavaScript?",
    "choices": ["the body section", "both the head section and the body section are correct.", "the head section"],
    "answer": "both the head section and the body section are correct."
}
]

//setting scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //end the game when timer is below 0 at any time
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//stop the timer to end game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<p>You got a ` + score +  ` /100!</p>
<p>you got ` + score / 20 +  ` questions correct!</p>
<input type="text" id="name" placeholder="Initials here"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the score in local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}

// get the score depending how many questions were correct
function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br>

<button onclick="clearScore()">Clear score!</button></br><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//resets game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    JavaScript Quiz!
</h1>
<h2>
    Click to play!   
</h2>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//minus 15seconds from timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 20;
next();
}

//loops through questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[answer]\">[choices]</button></br>"; 
    buttonCode = buttonCode.replace("[choices]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[answer]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[answer]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}
