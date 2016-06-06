//Data for FAQ Questions
var FAQ = {
    "faqData" : [
        {
            "preCompetition": [
                {
                    "question"  : ["Can we bring software tools to the competition?","There are six members on our team. Will each of them have a system to pen test from?","One of our members is uncomfortable signing the “agreement to participate in CPTC”. Does that disqualify our whole team?","Because of travel issues, our team (or some members) cannot be there by 8am on the first day. Will that disqualify us?","We don’t have enough students to field a team of 6. Can we still participate?","Is a coach really required and has to be a faculty member?","If one of the members that we register gets sick or cannot make the event. Can we substitute another student?","Can we include a student from another school on our team?","Are graduate students allowed on the team?","What if a team member is a part-time student? What if a team member is not taking courses this semester but has not graduated yet can they participate?","If a student is working at a co-op or internship position approved by their institution, are they eligible for the team?"],
                    "answer"    : ["No. You will be provided with everything you are allowed to use during the competition.","Yes. There will be workstations available for each of your team members to work", "That member will not be allowed to attend and participate. The rest of the team will be allowed to attend and participate without that member.","No - At least ONE person has to represent your team during the initial discussion and your time to access the infrastructure will NOT be extended.","Yes. The minimum team size is 3 members.","Yes. Every team must be sponsored by an academic institution. A faculty or staff coach affiliated with the academic institution must also accompany the team.","Yes.","No. All team members must be currently matriculated students from the same sponsoring academic institution.","Yes.","As long as they are currently matriculated in a program at your university.","Yes. If approved by their sponsoring institution."]
                }
            ]
        },
        {
            "duringCompetition": [
                {
                    "question"  : ["Can our team (or some members) participate remotely?", "Will we have Internet access during the competition?", "Can we use our own laptops to perform the pen test?","Can we download data, logs, and results from the testing environment to construct our report and presentation?","Can we work through the night between the first and second day to write our final report and presentation?","Our team (or some members) needs to leave early on the last day. Will that be a problem?","After we get the RFP, is there a way for us to ask questions before or after the online Q&A session if we do not understand something?"],
                    "answer"    : ["No. Physical attendance by all members of your team at the event site is required to participate in the competition","Yes and No. The system that we provide for you to conduct your pen test from will have internet access. The target company systems that you are pen testing may be isolated from the internet.","No. All hardware you can use will be provided for you.","Yes. You will have the capability to export resources for your analysis and report writing","Yes. You can work all night if you wish, but remember that you need to be ready and prepared to present to the “C”-level folks in the morning.","As long as someone from the team is in attendance at the awards ceremony.","Yes. An email address will be provided for submitting questions. Submitted questions and answers will be distributed to all teams."]
                }
            ]
        },
        {
            "other": [
                {
                    "question"  : ["What is a “Scope”?","What is a ROE?","So what does the pen test system look like?","If our team or member gets disqualified, is there an appeals process?","Will we get any feedback on what we did well or not so well besides the final score?","If we own legitimate licenses for commercial pen testing software, can we bring it with us to use in the competition?","What things might disqualify members our team or members?"],
                    "answer"    : ["The pentest scope defines and details exactly what is to be tested. What targets are to be tested and which are not to be touched.","Rules of Engagement. It is a document that describes how the tests are to be conducted. It can include limitations on times, tools, and techniques that can be employed. It can also detail any restrictions imposed by the client.","You will be provided access to the hosting environment in advance to the event so that you and your team can become familiar. You will NOT get early access to the pen testing targets but you will get access to a representative target environment for practice.","No. During an actual engagement your company can be cut from a contact as a result of your behavior. This event will mirror real life as closely as possible.","Yes. Feedback about potential vulnerabilities and other considerations is intended to be provided after the event.","No. Selected commercial packages will be provided for each team at the event.","Unprofessional, rude or offensive behavior at or during the competition. Cheating, rule violations, or illegal activities."]
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
    
    //Hide the arrows and answers
    $('i.fa.fa-caret-right').hide();
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
    
    //Hide the arrows and answers
    $('i.fa.fa-caret-right').hide();
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
    
    //Hide the arrows and answers
    $('i.fa.fa-caret-right').hide();
    $('.answer').hide();
}

function activeAnswer() {
    if($(this).attr('id').length == 9) { //If it's single digit
       var id = $(this).attr('id').charAt($(this).attr('id').length-1); //Grabs the selected question/answer's id 
    } else { //The digit is greater than 9 grab last 2 characters
        var id = $(this).attr('id').charAt($(this).attr('id').length-2)+$(this).attr('id').charAt($(this).attr('id').length-1);
    }
    
    $('.selectedQuestion').toggleClass('selectedQuestion'); //Remove the old selected question
    
    $(this).toggleClass('selectedQuestion');           //Add class to the new selected quesiton
    
    $('i.fa.fa-caret-right').hide();                //Hide previous arrows
    $('#arrow'+id).show();                          //Show current arrow
    $('.answer').hide();                            //Hide previous answers
    $('#answer'+id).show();                         //Show current answer
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

//Create paragraph with attributes
function createPara (myText, myType, myId) {
    if($(this).attr('id').length == 9 || $(this).attr('id').length == 7) { //If it's single digit
       var id = $(this).attr('id').charAt($(this).attr('id').length-1); //Grabs the selected question/answer's id 
    } else {
        var id = $(this).attr('id').charAt($(this).attr('id').length-2)+$(this).attr('id').charAt($(this).attr('id').length-1);
    }
    
    if(myType == 'question') {
        return $('<p>', {
            class: myType,
            id: myId,
            click: activeAnswer,
            text: myText
        });
    } else {
        var arrow = $('<i>', {
            class: 'fa fa-caret-right',
            id: 'arrow'+id
        });
        
        var answer = $('<p>', {
            class: myType,
            id: myId,
            text: myText
        });
        
        arrow.append(answer);
        return arrow;
    }
}