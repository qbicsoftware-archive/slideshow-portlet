/**
*Client-Side
*/

// Define the namespace
var mySliderLibrary = mySliderLibrary || {};
var slideIndex = 1;
var documentX; //document is protected name!!
var pictureList = ["colors.jpg"];
var self;

mySliderLibrary.MySlider = function (element) {

    //element.style.border = "thin solid red";
    //loadJS();

    documentX = element;

   /* documentX.innerHTML = "<div id = 'container' class='slideshow-container'>"+
                            "<div id = 'content'>"+
                            "<div class='mySlides fade'>" +
                                                            "<div class='numbertext'>1 / 3</div>"+
                                                           "<img src='./VAADIN/images/colors.jpg' style='width:100%'>"+
                                                             "<div class='text'>Caption one</div>"+
                             "</div>"+
                            "</div>"
                            "<!-- Next and previous buttons -->"+
                            "<div class = 'split'>"+
                            "<a class='prev'>&#10094;</a>"+
                            "<a class='next'>&#10095;</a>"+
                            "</div>"
                         "</div>"+
                         "<br>"+
                         "<!-- The dots/circles -->"+
                         "<div id='dot' style='text-align:center'>"+
                            "<span class='dot' onclick='currentSlide(1)'></span>"+
                            "<span class='dot' onclick='currentSlide(2)'></span>"+
                            "<span class='dot' onclick='currentSlide(3)'></span>"+
                         "</div>";*/

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

    createHTML();

//this is necessary to reload the html after the list from Java is received via state change
    newLoad = function () {

    if(pictureList != "colors.jpg"){
        alert("change");
        createHTML();
    }
    else{
        window.setTimeout(newLoad, 1000);
    }

    };
    window.setTimeout(newLoad, 1000);



/* Test: is this function necessary?
	// Default implementation of the click handler
	this.click = function () {
		//alert("Error: Must implement click() method");//is called with button.onclick
	};

*/

/*
jump to these alerts after connector alert!!
*/
    var prev = element.getElementsByClassName("prev")[0]; // -> use array to access the right field
    self = this; // Can't use this inside the function
    prev.onclick = function () {
    	self.click(); //simulate button click -> defined in mySliderConnector
        plusSlides(-1);
    };

    var next = element.getElementsByClassName("next")[0]; // -> use array to access the right field
  //  var self = this; // Can't use this inside the function
    next.onclick = function () {
        self.click();
        plusSlides(1);
    };


    //call the slide show
    showSlides(slideIndex);
    //showSlidesAutomatic();
};

//currently not in use
function loadJS(){
var theNewScript = document.createElement("script");
theNewScript.type = "text/javascript";
theNewScript.src = "./VAADIN/js/jQuery.js";
document.getElementsByTagName("head")[0].appendChild(theNewScript);
// jQuery MAY OR MAY NOT be loaded at this stage
var waitForLoad = function () {
    if (typeof jQuery != "undefined") {
        alert("it worked!");
        //use jquery here -> it is loaded
        /*var dir = "./VAADIN/images/";
                var fileextension=".jpg";
                alert("after loading");
                  $.ajax({
                    url: "./VAADIN/images/",
                    success: function(data){
                       $(data).find("td > a").each(function(){
                          // will loop through
                          alert("Found a file: " + $(this).attr("href"));
                       });
                    }
                  });*/
        alert(pictureList[0]) // pictureList is available after some waiting
    } else {
        window.setTimeout(waitForLoad, 1000);
    }
};
window.setTimeout(waitForLoad, 1000);


}

function createHTML(){

var content = " ";
var num;
var img;
var capt;
var dots="";

   // pictureList = getList();
    //alert(pictureList);
    //alert("i am creating html");
    //element.getElementsByTagName("div")[0].innerHTML = "<p><i>This text is italic</i></p>"; element works for tag names
    //document.getElementById("test").innerHTML = "<p><i>This text is italic</i></p>"; //document works for id
    //alert(pictureList);


//create slideshow container
    for(i = 0; i < pictureList.length; i++){

     num = "<div class='numbertext'>"+i+" / "+pictureList.length+"</div>";
     img = "<img src='./VAADIN/images/"+pictureList[i]+"' style='width:100%'>";

  //   capt = "<div class='text'>Caption one</div>";

      content = content+"<div class='mySlides fade'>"+num+img+"</div>";

      dots = dots+"<span class='dot' onclick='currentSlide("+(i+1)+")'></span>";

    }

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

  if (n > slides.length) {
  slideIndex = 1;
  createHTML();}

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



