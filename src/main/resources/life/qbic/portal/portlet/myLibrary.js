/**
*Client-Side
*/

// Define the namespace
var myLibrary = myLibrary || {};

myLibrary.MyComponent = function (element) {

element.innerHTML =
		"<div class='caption'>Hello, world!</div>" +
		"<div class='textinput'>Enter a value: " +      //define textinputfield -> with text before field
		"<input type='text' name='value'/>" +           //value as variable to process within code?! --> access values of type 'input' as array in order they are defined
		"<input type='button' value='Click'/>" +        //create button
		"</div>";

    element.alert("Test Error!!!!!")
	// Style it
	element.style.border = "thin solid red";        //frame
	element.style.display = "inline-block";

	// Getter and setter for the value property  ---> value of the text-field!?!?!
	this.getValue = function () {
		return element.
		    getElementsByTagName("input")[0].value;
	};
	this.setValue = function (value) {
		element.getElementsByTagName("input")[0].value =
		    value;
	};

	// Default implementation of the click handler
	this.click = function () {
		element.alert("Error: Must implement click() method");//is called with button.onclick in the lower part??
	};

	// Set up button click
	var button = element.getElementsByTagName("input")[1]; // -> use array to access the right field (here button)
	var self = this; // Can't use this inside the function
	button.onclick = function () {
		self.click();
		element.alert("Value changed");
		element.innerHTML =
		"<div class='caption'>Changed!</div>";
	};
};
