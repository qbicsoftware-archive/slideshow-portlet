window.life_qbic_portal_portlet_MySlider= // <- match server-side class names! (consider package name!!)
function() {
    // Create the component
    var mySlider =
        new mySliderLibrary.MySlider(this.getElement()); //call myLibrary function with this element to connect JS

    // Handle changes from the server-side
    this.onStateChange = function() {
       // myComponent.setValue(this.getState().value); //put new value into JS in HTML
       mySlider.setValue(this.getState().position);
       mySlider.setList(this.getState().pictureList);
       //this.getElement().alert("alert new value");
       //alert("another alert");

    };

    // Pass user interaction to the server-side
    var self = this;
       mySlider.click = function() {
       self.onClick(mySlider.getValue());
    };

    /**
    2)
    **/
    //JS RPC call in Connector
    var connector = this;
    mySlider.click = function() { //.click implemented in JS library
          connector.onClick(mySlider.getValue()); //onClick implemented on Server-Side --> passing simple string
        //  alert("alert connector");
        //to extend the html work on the component object of mylibrary --> need to define method to extend html and call in connector
    };



};
