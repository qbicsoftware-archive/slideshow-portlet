/**
*Client-Side
*/

// Define the namespace
var mySliderLibrary = mySliderLibrary || {};
var slideIndex = 0;
var document;

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
                        "<a class='prev' onclick='plusSlides(-1)'>&#10094;</a>"+
                        "<a class='next' onclick='plusSlides(1)'>&#10095;</a>"+
                    "</div>"+
                    "<br>"+
                    "<!-- The dots/circles -->"+
                    "<div style='text-align:center'>"+
                      "<span class='dot' onclick='currentSlide(1)'></span>"+
                      "<span class='dot' onclick='currentSlide(2)'></span>"+
                      "<span class='dot' onclick='currentSlide(3)'></span>"+
                    "</div>";



    var prev = element.getElementsByClassName("prev"); // -> use array to access the right field (here button)
    	var self = this; // Can't use this inside the function
    	prev.onclick = function () {
    		self.click(); //visualize button is pressed
    		//element.innerHTML = element.innerHTML+ "<p>This is a test </p>";
    		alert("pressed prev");
    };

    var next = element.getElementsByClassName("next"); // -> use array to access the right field (here button)
        var self = this; // Can't use this inside the function
        next.onclick = function () {
        	self.click(); //visualize button is pressed
        		//element.innerHTML = element.innerHTML+ "<p>This is a test </p>";
        		alert("pressed next");
        };


    showSlides(slideIndex);



};

function createHTML(innerHTML){

/*
create innerHTML here dynamically (no hardcoding!!)
*/
}




/*
Function to activate interactive clicking through slides
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



