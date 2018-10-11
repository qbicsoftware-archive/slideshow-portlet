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
		"<input type='button' value='Press'/>" +        //create button
		"</div>";

    //alert(element.innerHTML)//give test alert (operate on window!!!)
	// Style it
	element.style.border = "thin solid purple";        //frame needs to be changed on element object (DOM)
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
		alert("Error: Must implement click() method");//is called with button.onclick in the lower part?? --> overwritten in the connector
	};

/**
not called
**/
	// Set up button click
	var button = element.getElementsByTagName("input")[1]; // -> use array to access the right field (here button)
	var self = this; // Can't use this inside the function
	button.onclick = function () {
		self.click(); //visualize button is pressed
		//element.innerHTML = element.innerHTML+ "<p>This is a test </p>";
		//self.alert("Button clicked");

	};

	//testfunction
    this.test = function () {
    console.log("in test");
    	element.innerHTML = element.innerHTML+ "<p>This is a test "+this.getValue()+"</p>";
    	alert("this is a test");

    };
};
