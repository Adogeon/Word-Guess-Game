class wordAnswer {
    constructor (question,text) {
        this.question = question;
        this.text = text;
        this.answerKey = this.getAnswerKey();
    }

    // return an Array that contain all of acceptable key
    getAnswerKey() {
        var result = [];
        (this.text).split("").forEach(function(element){
            if(!(result.includes(element))) {
                result.push(element.toLowerCase());
            }
        })
        return result;
    }

    //get an array of keys when a valid answer is supply
    //answerChar are assure by gameBoard to always supply the correct answer and give response to bad answer
    getAnswerIndex(answerChar) {
        var tempText = this.text;
        var result = [];
        while(tempText.includes(answerChar)) {
            var foundIndex = tempText.indexOf(answerChar);
            result.push(foundIndex);
            tempText = tempText.replace(answerChar,"*");
        }
        return result;
    } 
}

//trying to parse the text file into the script and put it into an array
/*function readTextFile(file) {
    var rawInput = new XMLHttpRequest();
    rawInput.open("GET", file, false);
    rawInput.onreadystatechange = function (){
        if(rawInput.readyState === 4) {
            if(rawInput.status === 200 || rawInput.status === 0) {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}*/
//untested work. Return an array of Word Object from file.

//declaration for test purpose
var word1 = new wordAnswer("Kanto leaf-type starter","bulbasaur");
var word2 = new wordAnswer("Kanto fire-type starter","charmander");
var word3 = new wordAnswer("Kanto water-type starter","squirtle");
var word4 = new wordAnswer("Johto leaf-type starter","chikorita");
var word5 = new wordAnswer("Johto fire-type starter","totodile");
var word6 = new wordAnswer("Johto water-type starter","cyndaquil");
var word7 = new wordAnswer("Hoenn leaf-type starter","treeko");
var word8 = new wordAnswer("Hoenn fire-type starter","torchic");
var word9 = new wordAnswer("Hoenn water-type starter","mudkip");
var words = [word1,word2,word3,word4,word5,word6,word7,word8,word9];

var randomNumber = Math.floor(Math.random()*words.length);
var currentWord = words[randomNumber];
var fail = 5;
var state = 0;
//var score = currentWord.

//display score
function displayFail() {
    if (fail > 1) {
        document.getElementById('score').textContent = fail;
    } else if (fail === 1) {
        var scoreBoardEle = document.getElementById('score');
        while(scoreBoardEle.firstChild) {
            scoreBoardEle.removeChild(scoreBoardEle.firstChild);
        }
        var warnEle = document.createElement('span')
        var warnText = document.createTextNode("Be carefule! You only have 1 try left")
        warnEle.appendChild(warnText)
        scoreBoardEle.appendChild(warnEle);
    } else if (fail === 0) {
        state = 1;
        var scoreBoardEle = document.getElementById('score');
        while(scoreBoardEle.firstChild) {
            scoreBoardEle.removeChild(scoreBoardEle.firstChild);
        }
        var warnEle = document.createElement('span')
        var warnText = document.createTextNode("Be carefule! You only have 1 try left")
        warnEle.appendChild(warnText)
        scoreBoardEle.appendChild(warnEle);
    }
    
}

//function to dynamically display the question on board
function displayWord(wordAnswerInst) {
    var questionEl = document.getElementById("question");
    questionEl.textContent = wordAnswerInst.question;
    console.log("hello");
}

//function to add character box on board
function displayBox(wordAnswerInst) {
    var answer = wordAnswerInst.text.split('');
    console.log(answer);
    for (i=0;i<answer.length;i++) {
        var boxSpan = document.createElement('span');
        var textInBox = document.createTextNode("_");
        boxSpan.appendChild(textInBox);
        boxSpan.className = "h1";
        boxSpan.setAttribute("id","box-text-"+i)
        var boxWrap = document.createElement('div');
        boxWrap.style.height="70px";
        boxWrap.style.width="70px";
        boxWrap.className = "border bd-dark bg-white mx-3 d-flex justify-content-center align-middle ";
        boxWrap.appendChild(boxSpan);
        document.getElementById("answer-display").appendChild(boxWrap);
    }
}

displayWord(currentWord);
displayBox(currentWord);
displayFail();

//keyEventListener to check for the answer 
document.addEventListener("keyup", function(event) {
    //check if state is playing (0) 
    if (state !== 0) {
        return;
    }
    //check if key press is correct
    var keyAnswer = event.key;
    var oldAnswer = [];
    if((currentWord.answerKey.includes(keyAnswer)) && (!oldAnswer.includes(keyAnswer))) {
        var answerIndex = currentWord.getAnswerIndex(keyAnswer);
        oldAnswer.push(keyAnswer);
        answerIndex.forEach(function(Element) {
            console.log(Element);
            var currentSpan = document.getElementById("box-text-"+Element);
            currentSpan.textContent = keyAnswer.toUpperCase();
        })
        //in case of won
        if (oldAnswer.length === currentWord.answerKey.length) {
            state = 1;
            var gameConsoleEle = document.getElementById('game-text');
            while(gameConsoleEle.firstChild) {
                gameBoardEle.removeChild(gameConsoleEle.firstChild);
            }
            var winEle = document.createElement('span')
            var winText = document.createTextNode("Congrats, you have win");
            winEle.appendChild(winText)
            gameConsoleEle.appendChild(winEle)
        }
    } else if (oldAnswer.includes(keyAnswer)) {
        // guess correct again, don't do anything
        return;
    } else {
        //fail answer
        score--;
        var wrongGuessList = document.getElementById('wrong-guess');
        var wrongGuessSpan = document.createElement('span');
        var wrongGuessText = document.createTextNode(keyAnswer.toUpperCase());
        wrongGuessSpan.appendChild(wrongGuessText);
        wrongGuessSpan.className = "mx-1";
        wrongGuessList.appendChild(wrongGuessSpan);
        displayFail()
    }
})

var resetButton = document.getElementById("reset-button")
resetButton.addEventListener ("click", function(){
    randomNumber = Math.floor(Math.random()*words.length);
    currentWord = word(randomNumber)
    displayWord(currentWord)
    displayBox(curentWord)
    fail = 5;
    state = 0;
    var scoreBoardEle = document.getElementById('score');
    while(scoreBoardEle.firstChild) {
        scoreBoardEle.removeChild(scoreBoardEle.firstChild);
    }
    var scoreEle = document.createElement('span')
    var scoreText = document.createTextNode("You have")
    scoreEle.appendChild(scoreText)
    scoreBoardEle.appendChild(scoreEle);
    scoreEle = document.createElement('span');
    scoreEle.setAttribute('id','score');
    scoreBoardEle.appendChild(scoreEle);
    scoreEle = document.createElement('span');
    scoreText = document.createTextNode(" tries.");
    scoreEle.appendChild(scoreText)
    scoreBoardEle.appendChild(scoreEle);
})




