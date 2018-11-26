/**
*Client-Side
*/

// Define the namespace
var mySliderLibrary = mySliderLibrary || {};
var slideIndex = 1;
var documentX; //document is protected name!!
var pictureList = 'empty'; //"https://portal-testing.qbic.uni-tuebingen.de/slideshow-portlet/VAADIN/images/colors.jpg"];
var self;
//var endOfSlider = false;

mySliderLibrary.MySlider = function (element) {


    documentX = element;
    self = this;


    // Getter and setter for the value property
    this.getValue = function () {
    	return slideIndex;
    };
    this.setValue = function (value) {
        slideIndex = value;
    };

    // Getter and setter for the list property
    this.getList = function () {
    	return pictureList;
    };
    this.setList = function (list) {
    	pictureList =  list;
    };

    // Getter and Setter for the end of Slider -> use for dynamic picture loading
    this.setEndOfSlider = function (end){
        endOfSlider = end;
    };

    this.getEndOfSlider = function (){
        return endOfSlider;
    };

    // Default implementation of the click handler, needs to stay here in order for the connector to connect between Java and JS
    this.click = function () {
            //alert("Error: Must implement click() method");
    };

    this.isEnd = function(){
        //alert("i am at the end");
    };



    //This Function builds the innerHTML for the slider
    this.createHTML = function() {
    var content = " ";
    var num;
    var img;
    var capt;
    var dots="";
    //https://portal-testing.qbic.uni-tuebingen.de/slideshow-portlet/VAADIN/images/holi.jpg -> how to find the picture in browser


        if (pictureList == 'empty'){
            documentX.innerHTML = "<h1>Loading content, please wait!</h1>";
            //console.log(pictureList);
        }
        else {

            //create slideshow container
            for(i = 0; i < pictureList.length; i++){

                num = "<div class='numbertext'>"+(i+1)+" / "+pictureList.length+"</div>";
                img = "<img src='"+pictureList[i]+"' style='width:100%'>";

                // container for the Picture with its the Number
                content = content+"<div class='mySlides'>"+num+img+"</div>";

                // add a dot for each picture with onClick method to make it navigable
                dots = dots+"<span class='dot' onclick='currentSlide("+(i+1)+")'></span>";

            }
                //build the HTML
                //may be not that efficient since complete HTML is overwritten -->
                //try something like: documentX.getElementsByTagName("div")[0].innerHTML = "<p><i>This text is italic</i></p>"; or
                //documentX.getElementById("test").innerHTML = "<p><i>This text is italic</i></p>";
                //be careful to work on the right object!!!
                documentX.innerHTML = "<div class='slideshow-container'>"+
                                        content+
                                       "<!-- Next and previous buttons -->"+
                                       "<a class='prev' onclick='plusSlides(-1)'>&#10094;</a>"+
                                       "<a class='next' onclick='plusSlides(1)'>&#10095;</a>"+
                                     "</div>"+
                                     "<br>"+
                                     "<!-- The dots/circles -->"+
                                     "<div style='text-align:center'>"+
                                        dots+
                                     "</div>";

                showSlides(slideIndex);

        }

    };


    //initial load (necessary)
    this.createHTML();

    //call the slide show
    //showSlides(slideIndex); -> don't use here because first need to properly load the html before showing slides --> moved to createHTML()
    //showSlidesAutomatic();
};




// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
    self.click();
}

// Thumbnail image controls -> for clicking dots
function currentSlide(n) {
    showSlides(slideIndex = n);
    self.click();
}

/*
Function to show slide on position n
*/
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
    //call the is end function so that the connector realizes that we are at the end of the slides
    self.isEnd();
  }

  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

/*
Function to automatically show pictures
*/
function showSlidesAutomatic() {

    var i;
    var slides = document.getElementsByClassName("mySlides");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slideIndex++;

    if (slideIndex > slides.length) {slideIndex = 1}

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";

    setTimeout(showSlidesAutomatic, 2000); // Change image every 2 seconds
}

//How to include other scripts, the script is located in the project
//there may be problems with the path in the portal (was only tested for localhost)

//loads jQuery
function loadJS(){
    var theNewScript = document.createElement("script");

    theNewScript.type = "text/javascript";
    theNewScript.src = "./VAADIN/js/jQuery.js";
    document.getElementsByTagName("head")[0].appendChild(theNewScript);

    // jQuery MAY OR MAY NOT be loaded at this stage
    var waitForLoad = function () {
        if (typeof jQuery != "undefined") {
            //use jquery here -> it is loaded
            /*
                do stuff
            */
        } else {
            window.setTimeout(waitForLoad, 1000);
        }
    };

    window.setTimeout(waitForLoad, 1000);
}