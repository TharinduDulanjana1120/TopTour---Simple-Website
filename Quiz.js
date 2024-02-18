// declaring array to store question and options
//creating 10 questions with multiple choices.
const Questions = [
    {
        question:"What is the tallest mountain in Sri Lanka?",
        optA:"Namunukula",
        optB:"Sri Pada",
        optC:"Piduruthalagala",
        optD:"Haggala",
        correct:"optC"
    },
   

    {
        question:"How many districts are there in Sri Lanka?",
        optA:"25",
        optB:"24",
        optC:"22",
        optD:"23",
        correct:"optA"
    },

    
      

    {
        question:"Where is the King Kasyapa's Fortress?",
        optA:"Kandy",
        optB:"Rathnapura",
        optC:"Colombo",
        optD:"Matale ",
        correct:"optD"
    },


      
    {
        question:"How was Sri Lanka formerly known",
        optA:"Tableau",
        optB:"Ceylon",
        optC:"Burmae",
        optD:"Formosa",
        correct:"optB"
    },
    

    {
        question:"Which is the longest river in Sri Lanka",
        optA:"Mahaweli",
        optB:"Walave",
        optC:"Kalu",
        optD:"Kelani",
        correct:"optA"
    },

    
      

    {
        question:"Rathnapura district is famous for?",
        optA:"Gold",
        optB:"Wood",
        optC:"Cinnomon",
        optD:"Gems",
        correct:"optD"
    },
    
      

    {
        question:"What is the ocean around Sri Lanka",
        optA:"Pacific Ocean",
        optB:"Indian Ocean",
        optC:"Atlantic Ocean",
        optD:"Arctic Ocean",
        correct:"optB"
    },
    
    {
        question:"What animal appears on the flag of Sri Lanka",
        optA:"Lion",
        optB:"Elephant",
        optC:"Tiger",
        optD:"Giant squirrel",
        correct:"optA"
    },
  
      

    {
        question:"What is the traditional Sri Lankan greeting",
        optA:"Ayubowan",
        optB:"Jumbo",
        optC:"Bohoma Isthuthi",
        optD:"Wanakkam",
        correct:"optA"
    },
   
      
      
    
    {
        question:"Name the first Executive President of Sri Lanka",
        optA:"D S Senanayake",
        optB:"Orlie Day",
        optC:"JR Jayewardane",
        optD:"M R Ferdinand",
        correct:"optC"
    }

    
      
      
]

//declaring variables and assigning values
let questionnum = 1 ;
let playerScore = 0 ;
let wrongtry = 0 ;
let indexnum = 0 ;
var time=60;
var redirect = "Quiz.html";
let quizsummary="";
let numstring="";


//displays  the question and answers 
function Nextquestion(index) {
    let currentQuestion = Questions[index]
    document.getElementById("question").innerHTML = questionnum
    document.getElementById("score").innerHTML = playerScore
    document.getElementById("displayquestion").innerHTML = currentQuestion.question;
    document.getElementById("opt1label").innerHTML = currentQuestion.optA;
    document.getElementById("opt2label").innerHTML = currentQuestion.optB;
    document.getElementById("opt3label").innerHTML = currentQuestion.optC;
    document.getElementById("opt4label").innerHTML = currentQuestion.optD;

}

//checks if the choice of the player is correct
function checkAnswer() {
    let currentQuestion = Questions[indexnum] 
    let currentQuestionAnswer = currentQuestion.correct
    let options = document.getElementsByName("option"); 
    let correct = null
 
    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correct = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('optioncbox').style.display = "flex"
    }
    //Also changes the label color correctly and adjusts the variables
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correct).style.backgroundColor = "#628563";
            playerScore=playerScore+2;
            indexnum++ ;
            
            setTimeout(() => {
                questionnum++;
            }, 1000)
            numstring=indexnum.toString();
            quizsummary=quizsummary+numstring+". correct<br/>";//Quiz summary
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabel = option.labels[0].id
            document.getElementById(wrongLabel).style.backgroundColor = "#991f17"
            document.getElementById(correct).style.backgroundColor = "#628563"
            playerScore--;
            wrongtry++ ;
            indexnum++;
            setTimeout(() => {
                questionnum++
            }, 1000)
            numstring=indexnum.toString();
            numstring=indexnum.toString();
            quizsummary=quizsummary+numstring+". wrong<br/>";//Quiz summary
        }
    })
}

//calls the next question when needed 
function handlenextQ() {
    checkAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexnum <= 9) {
            Nextquestion(indexnum)
        }
        else {
            handleEnd()
        }
        resetOption()
    }, 1000);
}

//Resets the options after each question
function resetOption() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

//Resets the buttons to be used next time
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

//Displaying quiz summary, timetaken, remarks and score
function handleEnd() {
    let comment = null
    let commentColor = null

    if (playerScore <= 6) {
        comment = "It seems you don't know much about this beauty island!"
        commentColor = "#991f17"
        document.getElementById("mainpage").style.backgroundColor = "#991f17"


    }
    else if (playerScore >= 7 && playerScore < 12) {
        comment = "You could improve your knowledge further."
        commentColor = "#db8121"
        document.getElementById("mainpage").style.backgroundColor = "#db8121"

    }
    else if (playerScore >= 12) {
        comment = "You have a good knowledge about this beautiful island."
        commentColor = "#628563"
        document.getElementById("mainpage").style.backgroundColor = "#628563"

    }

    document.getElementById('QSummary').innerHTML=quizsummary;
    document.getElementById('comment').innerHTML = comment;
    document.getElementById('comment').style.color = commentColor;
    document.getElementById('totscore').innerHTML = playerScore;
    document.getElementById('timetaken').innerHTML=(60-time);
    document.getElementById('displaycontainer').style.display = "flex";

}
function startQuiz() {
    // hide the rules div
    document.getElementById("rules").style.display = "none";
}
  
//resets the variables to be used for the next round
function closeScore() {
    questionnum = 1;
    playerScore = 0;
    wrongtry = 0;
    indexnum = 0;
    Nextquestion(indexnum);
    document.getElementById('displaycontainer').style.display = "none";
}

//calls the countdown func
function closeOption() {
    countDown();
    document.getElementById('optioncontainer').style.display = "none";
}


// responsible for timing the quiz
function countDown(){
if(time > 0){
    time--;;
    timer.innerHTML = "This quiz will end in "+time+" seconds.";
    setTimeout("countDown()", 1000);
    if(indexnum>=10){
        return;
    }
}else{
    handleEnd();
    setTimeout(function()
    {
        window.location.href = redirect;

    }, 5000);
}
}