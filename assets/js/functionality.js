//Acts as an onload for the script
$(document).ready(function(){
    //Set the margin of the carousel arrows
   setMargin();
});

function setMargin() {
    var divHeight = $('section.panel.carousel').height() / 2;

    $('div.carouselNavigation').css({'top' : +divHeight+'px'});
}