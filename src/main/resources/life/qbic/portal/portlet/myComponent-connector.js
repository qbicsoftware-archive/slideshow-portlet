//JavaScript Connector
// Define the namespace

//var version = "${project.version}";

window.life_qbic_portal_portlet_MyComponent = // <- match server-side class names! (consider package name!!)
function() {
    // Create the component
    var myComponent =
        new myLibrary.MyComponent(this.getElement()); //call myLibrary function with this element to connect JS

/**
1)
**/
    // Handle changes from the server-side
    this.onStateChange = function() {
        myComponent.setValue(this.getState().value); //put new value into JS in HTML
    };
/**
not called to show alert!
**/
    // Pass user interaction to the server-side
    var self = this;
    myComponent.click = function() {
        self.onClick(myComponent.getValue());
    };

/**
2)
**/
    //JS RPC call in Connector
    var connector = this;
    myComponent.click = function() { //.click implemented in JS library
        connector.onClick(myComponent.getValue()); //onClick implemented on Server-Side --> passing simple string
        myComponent.test();
        //to extend the html work on the component object of mylibrary --> need to define method to extend html and call in connector
     };

};

