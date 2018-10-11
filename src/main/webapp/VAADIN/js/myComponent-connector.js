//JavaScript Connector
// Define the namespace

//var version = "${project.version}";

window.life_qbic_portal_portlet_MyComponent = // <- match server-side class names! (consider package name!!)
function() {
    // Create the component
    var myComponent =
        new myLibrary.MyComponent(this.getElement()); //call myLibrary function with this element to connect JS

    // Handle changes from the server-side
    this.onStateChange = function() {
        myComponent.setValue(this.getState().value); //put new value into JS in HTML
        this.getElement().alert("alert new value");

    };

    // Pass user interaction to the server-side
    var self = this;
    myComponent.click = function() {
        self.onClick(myComponent.getValue());
        this.getElement().alert("alert self");
    };

    //JS RPC call in Connector
    var connector = this;
    myComponent.click = function() { //.click implemented in JS library
          connector.onClick(); //onClick implemented on Server-Side --> passing simple string
         // connector.onClick(myComponent.getValue()); //onClick implemented on Server-Side --> passing simple string
          this.getElement().alert("alert connector");

    };
};

