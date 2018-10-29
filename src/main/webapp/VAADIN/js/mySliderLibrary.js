/**
*Client-Side
*/

// Define the namespace
var mySliderLibrary = mySliderLibrary || {};
var slideIndex = 1;
var document;
var pictureList;
var self;

mySliderLibrary.MySlider = function (element) {

document = element;

//element.style.border = "thin solid red";        //frame

//do something like element.innerHTML = createHTML(pictureList) which is received from server (shared state??)
element.innerHTML = "<div class='slideshow-container'>"+
                    "<div class='mySlides fade'>" +
                        "<div class='numbertext'>1 / 3</div>"+
                       "<img src='./VAADIN/images/colors.jpg' style='width:100%'>"+
                         "<div class='text'>Caption one</div>"+
                    "</div>"+
                    "<div class='mySlides fade'>"+
                         "<div class='numbertext'>2 / 3</div>"+
                         "<img src='/VAADIN/images/holi.jpg' style='width:100%'>"+
                         "<div class='text'>Caption Two</div>"+
                    "</div>"+
                    "<div class='mySlides fade'>"+
                         "<div class='numbertext'>3 / 3</div>"+
                         "<img src='./VAADIN/images/holi.jpg' style='width:100%'>"+
                         "<div class='text'>Caption three</div>"+
                    "</div>"+
                        "<!-- Next and previous buttons -->"+
                        "<a class='prev'>&#10094;</a>"+
                        "<a class='next'>&#10095;</a>"+
                    "</div>"+
                    "<br>"+
                    "<!-- The dots/circles -->"+
                    "<div style='text-align:center'>"+
                      "<span class='dot' onclick='currentSlide(1)'></span>"+
                      "<span class='dot' onclick='currentSlide(2)'></span>"+
                      "<span class='dot' onclick='currentSlide(3)'></span>"+
                    "</div>";

  /**
  Deleted this to check if its reason for no pictures being displayed
  Tag a as either hyperlink or global variable
  "<a class='prev' onclick='plusSlides(-1)'>&#10094;</a>"+ //&#10094 is the leftpointing arrow
  "<a class='next' onclick='plusSlides(1)'>&#10095;</a>"+
  */

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


	// Default implementation of the click handler
	this.click = function () {
		//alert("Error: Must implement click() method");//is called with button.onclick
	};

/*
jump to these alerts after connector alert!!
*/
    var prev = element.getElementsByClassName("prev")[0]; // -> use array to access the right field
    self = this; // Can't use this inside the function
    prev.onclick = function () {
    	self.click(); //simulate button click -> defined in mySliderConnector
        plusSlides(-1);
        //alert(slideIndex);
    	//alert("pressed prev");
    };

    var next = element.getElementsByClassName("next")[0]; // -> use array to access the right field
  //  var self = this; // Can't use this inside the function
    next.onclick = function () {
        self.click();
        plusSlides(1);
       // alert(slideIndex);
      // alert("pressed next");
    };


    //call the slide show
    showSlides(slideIndex);
    //showSlidesAutomatic();
};

function createHTML(element){

/*
create innerHTML here dynamically (no hardcoding!!)
*/
}


// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls -> for clicking dots
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/*
Function to show slide on position n
*/
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {slideIndex = 1}

  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  //self.setValue(slideIndex);
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



