//Data for FAQ Questions
var FAQ = {
    "faqData" : [
        {
            "preCompetition": [
                {
                    "question"  : ["a","b"],
                    "answer"    : ["0","1"]
                }
            ]
        },
        {
            "duringCompetition": [
                {
                    "question"  : ["aa", "bb"],
                    "answer"    : ["2","3"]
                }
            ]
        },
        {
            "other": [
                {
                    "question"  : ["aaa","bbb"],
                    "answer"    : ["4","5"]
                }
            ]
        }
    ]
};

//Acts as an onload for the script
$(document).ready(function(){
    //Set the margin of the carousel arrows
    setMargin();
    
    //Carousel Variables
    var carouselWidth;
    var imageWidth;
    var animationSpeed = 600;
    var currentSlide = 1;   //initialize to first slide
    
    //cache DOM
    var arrowNavigation = $('div.carouselNavigation');
    var leftNav = $('div.leftNav');
    var rightNav = $('div.rightNav');
    var $carouselContainer = $('ul.slides');
    var $carouselImage = $('li.slide');
    var carouselIndicators = $('ul.carouselIndicatorsUL');
    var indicator1 = $('#indicator1');
    var indicator2 = $('#indicator2');
    var indicator3 = $('#indicator3');
    var indicator4 = $('#indicator4');
    
    //Sets the width of the arrow navigation
    setWidth(arrowNavigation,carouselIndicators,$carouselContainer,$carouselImage,currentSlide);
    
    //As page resizes maintain the width
    $(window).resize(function() {
        setMargin();
        setWidth(arrowNavigation,carouselIndicators,$carouselContainer,$carouselImage,currentSlide);
    });
    
    //Set initital slide indicators
    carouselIndicator(currentSlide, indicator1, indicator2, indicator3, indicator4);
    
    //Left and Right Arrow Navigation
    carouselLeft(leftNav, $carouselContainer, carouselWidth, imageWidth, animationSpeed, currentSlide);
    carouselRight(rightNav, $carouselContainer, carouselWidth, imageWidth, animationSpeed, currentSlide); 
    
    //Click event for sideBar menu
    $('a.button-collapse').click(toggleMenu);
    $('div.sideBar ul li a').click(toggleMenu);
    
    //Closes the sideBar if user clicks outside of menu
    $(document).mouseup(function (e) {
        var container = $('div.sideBar');
    
        if (!container.is(e.target)
            && container.has(e.target).length === 0 && $(".visible").length && 
            e.target.getAttribute('class') != 'fa fa-bars hamburger' ){
                container.toggleClass('visible');
            }
    });
    
    //Click event for faq bututons
    $('#faq1').click(faqChange);
    $('#faq2').click(faqChange);
    $('#faq3').click(faqChange);
    
    //intialize the FAQ with data
    generatePreCompetition();

/* Carousel Click Left */
function carouselLeft(leftNav, $carouselContainer, carouselWidth, imageWidth, animationSpeed) {
    leftNav.click(function() {
        //Declare local variables
        imageWidth = $('li.slide').width();
        carouselWidth = parseInt($carouselContainer.css("width"));
        
        //Disable the click event from being clicked during animation
        disableNavigation();
        
    if(currentSlide === 1){ //If on the first image set it to the last
        $carouselContainer.animate({'margin-left': '-='+(carouselWidth-imageWidth)+'px'}, animationSpeed, function(){
            currentSlide = 4;
            carouselIndicator(currentSlide);
        });
    }
    else { //Else lets keep moving left!                            
        $carouselContainer.animate({'margin-left': '+='+imageWidth+'px'}, animationSpeed, function(){
        currentSlide--;
        carouselIndicator(currentSlide);
        });
        }
    });
}

/* Carousel Click Right */
function carouselRight(rightNav, $carouselContainer, carouselWidth, imageWidth, animationSpeed) {
    
    rightNav.click(function() {
        //Declare local variables
        carouselWidth = parseInt($carouselContainer.css("width")); //Grabs the width of the container
        imageWidth = $('li.slide').width(); //Sets variable to image width
        
        //Disable the click event from being clicked during animation
        disableNavigation();

    if(currentSlide === $carouselImage.length) { //If on the last image set it to the first
        $carouselContainer.animate({'margin-left': '+='+(carouselWidth-imageWidth)+'px'}, animationSpeed, function() {
            currentSlide = 1;
            carouselIndicator(currentSlide);
        });
    } else { //Else lets keep moving right!
        $carouselContainer.animate({'margin-left': '-='+imageWidth+'px'}, animationSpeed, function(){
        currentSlide++;
        carouselIndicator(currentSlide);
    });
    }
    });
}

/* Carousel Indicators */
//Indicator 1    
indicator1.click(function() {
    imageWidth = $('li.slide').width();
    carouselWidth = parseInt($carouselContainer.css("width"));

    disableNavigation();
    
    $carouselContainer.animate({'margin-left': '+='+(imageWidth)*(currentSlide-1)+'px'}, animationSpeed, function() {
            currentSlide = 1;
            carouselIndicator(currentSlide);
        });
});

//Indicator 2
indicator2.click(function() {
    imageWidth = $('li.slide').width();
    carouselWidth = parseInt($carouselContainer.css("width"));

    disableNavigation();

    $carouselContainer.animate({'margin-left': '+='+(imageWidth)*(currentSlide-2)+'px'}, animationSpeed);

    currentSlide = 2;
    carouselIndicator(currentSlide);
});

//Indicator 3
indicator3.click(function() {
    imageWidth = $('li.slide').width();
    carouselWidth = parseInt($carouselContainer.css("width"));

    disableNavigation();
    
    $carouselContainer.animate({'margin-left': '+='+(imageWidth)*(currentSlide-3)+'px'}, animationSpeed);
    currentSlide = 3;
    carouselIndicator(currentSlide);
});

//Indicator 4
indicator4.click(function() {
    imageWidth = $('li.slide').width();
    carouselWidth = parseInt($carouselContainer.css("width"));

    disableNavigation();
    
    $carouselContainer.animate({'margin-left': '-='+(carouselWidth-(imageWidth*currentSlide))+'px'}, animationSpeed, function() {
            currentSlide = 4;
            carouselIndicator(currentSlide);
        });
});
    
/* Disables the arrow and indicator navigation in carousel */
function disableNavigation (){
    arrowNavigation.addClass('disableClick'); 
        setTimeout(function(){
            arrowNavigation.removeClass('disableClick');
        },animationSpeed);
    carouselIndicators.addClass('disableClick'); 
        setTimeout(function(){
            carouselIndicators.removeClass('disableClick');
        },animationSpeed);
}

}); //End of document.ready

/* Colors the correct indicator */
function carouselIndicator(currentSlide) {
    
    //Declare local variables
    var indicator1 = $('#indicator1');
    var indicator2 = $('#indicator2');
    var indicator3 = $('#indicator3');
    var indicator4 = $('#indicator4');
    
    // Switches indicators depending on that the current slide is
    switch (currentSlide) {
        case 1:
            indicator1.css("background-color", "white");
            indicator2.css("background-color", "transparent");
            indicator3.css("background-color", "transparent");
            indicator4.css("background-color", "transparent");
            break;
            
        case 2:
            indicator1.css("background-color", "transparent");
            indicator2.css("background-color", "white");
            indicator3.css("background-color", "transparent");
            indicator4.css("background-color", "transparent");
            break;
        case 3:
            indicator1.css("background-color", "transparent");
            indicator2.css("background-color", "transparent");
            indicator3.css("background-color", "white");
            indicator4.css("background-color", "transparent");
            break;
        case 4:
            indicator1.css("background-color", "transparent");
            indicator2.css("background-color", "transparent");
            indicator3.css("background-color", "transparent");
            indicator4.css("background-color", "white");
            break;
    }
}

function toggleMenu() {
    $('div.sideBar').toggleClass('visible');
}

//Changes the current selected faq button and questions
function faqChange() {
    var className = $(this).attr('class');
    var idName = $(this).attr('id');
    var primary = 'btn-faq-primary';
    var secondary = 'btn-faq-secondary';

    //Change the primary button
    if(className = secondary) {
        $('a.waves-effect.waves-light.btn-faq-primary').removeClass(primary).addClass(secondary);
        $(this).removeClass(secondary).addClass(primary);
    }
    
    //Determine which data to populate the content with
    if(idName == 'faq1') {
        generatePreCompetition();
    } else if(idName == 'faq2') {
        generateDuringCompetition();
    } else {
        generateOther();
    }
}

function generatePreCompetition() {
    //Local Variables
    var data; //The data that needs to be put onto the dataDiv
    var text; //Text to put in paragraph element
    var dataDiv = $('div.faq-content-container');   //Div that contains the questions and answers
    var questions = FAQ.faqData[0].preCompetition[0].question; //Array of questions for PreCompetition
    var answers = FAQ.faqData[0].preCompetition[0].answer; //Array of answers for preCompetition
    var type; //Is it a question or an answer
    
    dataDiv.empty(); //Clear Div
    
    for(i = 0; i<questions.length; i++) {
        //questions
        text = questions[i];     //Set the text equal to the question
        type = 'question';       //Set the type of data being sent
        id = 'question'+i;       //Set the id to the current question
        data = createPara(text,type, id); //New paragraph
        dataDiv.append(data);    //Add the paragraph tag to the div
        
        //answers
        text = answers[i];
        type = 'answer';
        id = 'answer'+i;
        data = createPara(text,type, id);
        dataDiv.append(data);
    }
    
    //Hide the answers
    $('.answer').hide();
}

function generateDuringCompetition() {
    //Local Variables
    var data; //The data that needs to be put onto the dataDiv
    var text; //Text to put in paragraph element
    var dataDiv = $('div.faq-content-container');
    var questions = FAQ.faqData[1].duringCompetition[0].question; //Array of questions for duringCompetition
    var answers = FAQ.faqData[1].duringCompetition[0].answer; //Array of answers for duringCompetition
    var type; //Is it a question or an answer
    var id;   //ID of question/answer
    
    dataDiv.empty(); //Clear Div
    
    for(i = 0; i<questions.length; i++) {
        //questions
        text = questions[i];     //Set the text equal to the question
        type = 'question';       //Set the type of data being sent
        id = 'question'+i;       //Set the id to the current question
        data = createPara(text,type, id); //New paragraph
        dataDiv.append(data);    //Add the paragraph tag to the div
        
        //answers
        text = answers[i];
        type = 'answer';
        id = 'answer'+i;
        data = createPara(text,type, id);
        dataDiv.append(data);
    }
    
    //Hide the answers
    $('.answer').hide();
}

function generateOther() {
    //Local Variables
    var data; //The data that needs to be put onto the dataDiv
    var text; //Text to put in paragraph element
    var dataDiv = $('div.faq-content-container');
    var questions = FAQ.faqData[2].other[0].question; //Array of questions for PreCompetition
    var answers = FAQ.faqData[2].other[0].answer; //Array of answers for duringCompetition
    var type; //Is it a question or an answer
    
    dataDiv.empty(); //Clear Div
    
    for(i = 0; i<questions.length; i++) {
        //questions
        text = questions[i];     //Set the text equal to the question
        type = 'question';       //Set the type of data being sent
        id = 'question'+i;       //Set the id to the current question
        data = createPara(text,type, id); //New paragraph
        dataDiv.append(data);    //Add the paragraph tag to the div
        
        //answers
        text = answers[i];
        type = 'answer';
        id = 'answer'+i;
        data = createPara(text,type, id);
        dataDiv.append(data);
    }
    
    //Hide the answers
    $('.answer').hide();
}

function activeAnswer() {
    var id = $(this).attr('id').charAt($(this).attr('id').length-1); //Grabs the selected question/answer's id
    
    $('.answer').hide();    //Hide previously selected answers
    $('#answer'+id).show(); //Shows the selected answer
}

/* Helper Functions */

/* Sets the vertical margin of the carousel navigation */
function setMargin() {
    var divHeight = $('.carousel').height() / 2;

    $('div.carouselNavigation').css({'top' : +divHeight+'px'});
}

//Sets the navigation buttons alignment of the width
function setWidth(arrowNavigation, carouselIndicators,$carouselContainer,$carouselImage,currentSlide) {
    var divWidth = $('div.slider-container').width();
    
    arrowNavigation.css({'width' : +divWidth+'px'});
    carouselIndicators.css({'width' : +divWidth+'px'});
    
    $carouselImage.css({'width' : +divWidth+'px'});
    $carouselContainer.css({'width' : +(divWidth*4)+'px'});
    
    $carouselContainer.css({'margin-left' : -(divWidth*currentSlide-(divWidth))+'px'});
}

//Create paragraph
function createPara (myText, myType, myId) {
    if(myType == 'question') {
        return $('<p>', {
            class: myType,
            id: myId,
            click: activeAnswer,
            text: myText
        });
    } else {
        return $('<p>', {
            class: myType,
            id: myId,
            text: myText
        });
    }
}