var timer;
var intervalId;
var sound10 = new Audio('assets/sounds/10.mp3');
var sound30 = new Audio('assets/sounds/30.mp3');
var sound20 = new Audio('assets/sounds/20.mp3');
var wrong = new Audio('assets/sounds/wrong.mp3');
var wrong2 = new Audio('assets/sounds/ouch.mp3');
var success = new Audio('assets/sounds/right.mp3');
var thanks = new Audio('assets/sounds/gracias-vuelvas-prontos.mp3');
var intro = new Audio('assets/sounds/simpsons_intro.mp3');
var promise;
var start = false;
var right_answers = 0;
var wrong_answers = 0;
var actual_question = 0;
var question_answered = false;
var questions = [{question: "Who did create the simpsons?",
                  option1: "Sam Simon",
                  option2: "Matt Groening",
                  option3: "James L. Brooks",
                  option4: "OJ Simpson",
                  answer: "option2"
                 },
                 {question: "What year was the broadcast of the first episode?",
                  option1: "1988",
                  option2: "1990",
                  option3: "1989",
                  option4: "1991",
                  answer: "option3"
                 },
                 {question: "When was Homer born?",
                  option1: "May 12, 1956",
                  option2: "March 12, 1956",
                  option3: "May 19, 1965",
                  option4: "March 19, 1965",
                  answer: "option1"
                 },
                 {question: "Which is the name of the Simpson's cat?",
                  option1: "Itchy",
                  option2: "Scratchy",
                  option3: "Snowball",
                  option4: "They dont have a cat",
                  answer: "option3"
                 },
                 {question: "What's the name of the Bart's brother?",
                  option1: "Rodd",
                  option2: "Todd",
                  option3: "Milhouse",
                  option4: "Hugo",
                  answer: "option4"
                 },
                 {question: "Secret Ingredient used in the Flaming Homer Drink",
                  option1: "Rum",
                  option2: "Fire",
                  option3: "Cough Syrup",
                  option4: "Soda",
                  answer: "option3"
                 },
                 {question: "What's the name of the Homer's brother?",
                  option1: "Herbert",
                  option2: "Abraham",
                  option3: "Carl",
                  option4: "Lenny",
                  answer: "option1"
                 },
                 {question: "How died Mud Flanders?",
                  option1: "By a T-Shirt canyon",
                  option2: "Ned killed Mud",
                  option3: "Homed killed Mud",
                  option4: "Car accident",
                  answer: "option1"
                 },
                 {question: "Sector where Homer works",
                  option1: "8G",
                  option2: "9G",
                  option3: "7G",
                  option4: "6G",
                  answer: "option3"
                 },
                 {question: "Real name of Skinner",
                  option1: "Seymour Skinner",
                  option2: "Armando Barreda",
                  option3: "Principal Skinner",
                  option4: "Armando Skinned",
                  answer: "option2"
                 },
                 {question: "How many children Apu had with Manjula?",
                  option1: "9",
                  option2: "8",
                  option3: "7",
                  option4: "6",
                  answer: "option2"
                 },
                 {question: "Which person had Lisa her first kiss?",
                  option1: "Ralph",
                  option2: "Milhouse",
                  option3: "Nelson",
                  option4: "Lalo Landa",
                  answer: "option3"
                 },
                 {question: "Who did run over to Bart?",
                  option1: "Bob Patino",
                  option2: "Mr Burns",
                  option3: "Homer",
                  option4: "Moe",
                  answer: "option2"
                 },
                 {question: "What is esquilax?",
                  option1: "Horse with rabbit body and head",
                  option2: "Rabbit with horse body and head",
                  option3: "Imaginary friend of somebody",
                  option4: "A monster",
                  answer: "option1"
                 },
                 {question: "What has Homer in his brain?",
                  option1: "Pen",
                  option2: "Pencil",
                  option3: "Nothing, only a little brain",
                  option4: "Crayon",
                  answer: "option4"
                 },
                 {question: "How many time is Flanders punished in U of Minnessta?",
                  option1: "6 months",
                  option2: "7 months",
                  option3: "8 months",
                  option4: "12 months",
                  answer: "option3"
                 }
                 {question: "Complete name of Homer",
                  option1: "Homer Simpson",
                  option2: "Homer Jay Simpson",
                  option3: "Homer Jey Simpson",
                  option4: "Homer J Simpson",
                  answer: "option2"
                 },
                 {question: "Number assigned to Homer in Magios organization",
                  option1: "509",
                  option2: "912",
                  option3: "908",
                  option4: "619",
                  answer: "option3"
                 },
                 {question: "Which vegetable has the kitchen curtains?",
                  option1: "Carrots",
                  option2: "Corn",
                  option3: "Pees",
                  option4: "No vegetable",
                  answer: "option2"
                 },
]
 
window.onload = function () {
    run();
    intro.play();
    $("#start_button").on("click", start_game);
    $("button").on("click", answer_selected);
};

function start_game(){
    start = true;
    intro.pause();
    intro.currentTime = 0;
    run();
}
//Timer function.
function clockTimer() {
    timer--;
    $("#option1").removeClass("active");
    $("#option2").removeClass("active");
    $("#option3").removeClass("active");
    $("#option4").removeClass("active");
    $("#timer").text(timer);
    if (timer <= 30 && timer > 20){
        $("#timer").css("color","whitesmoke");
        promise = sound30.play();
    }
    if (timer <= 20 && timer > 10){
        $("#timer").css("color","rgb(242,198,30)");
        promise = sound20.play();
    }
    if (timer <= 10 && timer > 0){
        $("#timer").css("color","red");
        promise = sound10.play();
    }
    if (timer <= 0) {
        promise = wrong2.play();
        $("#timer").text("Time Up!");
        question_answered = true;
        $("#"+questions[actual_question].answer).html($("#"+questions[actual_question].answer).text()+" "+"<i class=\"fas fa-check\">");
        wrong_answers++;
        stop();
        setTimeout(runNextQuestion,2000);
    }

    if (promise !== undefined) {
        promise.then(_ => {
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
            console.log("autoplay prevented");
        });
    }
}

function run(){
    
    if (start === false){
        $(".card").hide();
        $(".title_timer").hide();
        $("#start_button").show();
    }
    else{
       $(".card").show();
       $(".title_timer").show();
       $("#start_button").hide();
       timer = 30;
       clearInterval(intervalId);
       intervalId = setInterval(clockTimer,1000);
       $(".card-header").text(questions[actual_question].question);
       $("#option1").text(questions[actual_question].option1);
       $("#option2").text(questions[actual_question].option2);
       $("#option3").text(questions[actual_question].option3);
       $("#option4").text(questions[actual_question].option4);

    }
}

function stop() {
    clearInterval(intervalId);
}

function answer_selected(){
    
    var button_name = this.id;
    if (button_name === "option4" && $("#"+button_name).text() === "Restart"){
        right_answers = 0;
        wrong_answers = 0;
        actual_question = 0;
        run();
    }
    else if (button_name !== "start" && actual_question<questions.length && !question_answered){
        question_answered = true;
        stop();
        if (questions[actual_question].answer === button_name){
            $("#"+button_name).html($("#"+button_name).text()+" "+"<i class=\"fas fa-check\">");
            right_answers++;
            success.play();
        }
        else{
            $("#"+button_name).html($("#"+button_name).text()+" "+"<i class=\"fas fa-times\">");
            $("#"+questions[actual_question].answer).html($("#"+questions[actual_question].answer).text()+" "+"<i class=\"fas fa-check\">");
            wrong_answers++;
            wrong.play();
        }
        setTimeout(runNextQuestion,2000);
    }
}

function runNextQuestion(){
    actual_question++;
    question_answered = false;
    if (actual_question<questions.length){
        $(".card-header").text(questions[actual_question].question);
        $("#option1").text(questions[actual_question].option1);
        $("#option2").text(questions[actual_question].option2);
        $("#option3").text(questions[actual_question].option3);
        $("#option4").text(questions[actual_question].option4);
        run();
    }
    else{
        $("#option1").removeClass("active");
        $("#option2").removeClass("active");
        $("#option3").removeClass("active");
        $("#option4").removeClass("active");
        $(".card-header").text("Your Score");
        $("#option1").text("Total right answers: "+right_answers);
        $("#option2").text("Total wrong answers: "+wrong_answers);
        $("#option3").text(" ");
        $("#option4").text("Restart");
        thanks.play();
        stop();
    }
}
