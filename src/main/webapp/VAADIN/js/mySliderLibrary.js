/**
*Client-Side
*/

// Define the namespace
var mySliderLibrary = mySliderLibrary || {};
var slideIndex = 0;
var document;

mySliderLibrary.MySlider = function (element) {

document = element;

element.style.border = "thin solid red";        //frame
//alert("test");
alert(element.URL);

element.innerHTML = "<div class='slideshow-container'>"+
                    "<div class='mySlides fade'>" +
                        "<div class='numbertext'>1 / 3</div>"+
                       "<img src='./VAADIN/images/colors.jpg' style='width:100%'>"+
                         "<div class='text'>Caption Text</div>"+
                    "</div>"+
                    "<div class='mySlides fade'>"+
                         "<div class='numbertext'>2 / 3</div>"+
                         "<img src='/VAADIN/images/holi.jpg' style='width:100%'>"+
                         "<div class='text'>Caption Two</div>"+
                    "</div>"+
                    "<div class='mySlides fade'>"+
                         "<div class='numbertext'>3 / 3</div>"+
                         "<img src='./VAADIN/images/holi.jpg' style='width:100%'>"+
                         "<div class='text'>Caption Two</div>"+
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
    showSlides();
    alert("i am done");
};

///slideshow-portlet/WEB-INF/resources/pictures/holi.jpg

function showSlides() {

    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds

  /*
  non-automatic: add n to function parameters
  var i;
  var slides = element.getElementsByClassName("mySlides");
  var dots = element.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
    alert(n);
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";*/
}

/*
//with this function try to get images from folder? use jQuery
function test(){
var fileExt = {},
    fileExt[0]=".png",
    fileExt[1]=".jpg",
    fileExt[2]=".gif";
$.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: '../../WEB-INF/resources/',
    success: function (data) {
       $("#fileNames").html('<ul>');
       //List all png or jpg or gif file names in the page
       $(data).find("a:contains(" + fileExt[0] + "),a:contains(" + fileExt[1] + "),a:contains(" + fileExt[2] + ")").each(function () {
           var filename = this.href.replace(window.location.host, "").replace("http:///", "");
           $("#fileNames").append( "<li>" + filename + "</li>");
       });
       $("#fileNames").append('</ul>');
     }
  });
}*/

