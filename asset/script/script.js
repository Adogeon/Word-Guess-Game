
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
                result.push(element);
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
var test1 = new wordAnswer("What is the name of Hoenn water starter ?","Mudkip");
var test2 = new wordAnswer("What is the name of Kanto leaf starter ?","Bulbasaur");

var tests = [test1,test2];

console.log(test1);
console.log(test2);

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
        var textInBox = document.createTextNode(answer[i].toUpperCase());
        boxSpan.appendChild(textInBox);
        boxSpan.className = "h1";
        var boxWrap = document.createElement('div');
        boxWrap.setAttribute('style','width:70px;height:70px');
        boxWrap.className = "border bd-dark bg-white mx-3 d-flex justify-content-center align-middle";
        boxWrap.appendChild(boxSpan);
        document.getElementById("answer-display").appendChild(boxWrap);
    }
    console.log("hi")
}



displayWord(test1);
displayBox(test1);
