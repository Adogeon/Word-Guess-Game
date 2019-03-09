console.log("Hello World!");

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

