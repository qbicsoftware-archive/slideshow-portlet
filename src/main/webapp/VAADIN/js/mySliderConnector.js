window.life_qbic_portal_portlet_MySlider= // <- match server-side class names! (consider package name!!)
function() {
    // Create the component
    var mySlider =
        new mySliderLibrary.MySlider(this.getElement()); //call myLibrary function with this element to connect JS

    // Handle changes from the server-side
    this.onStateChange = function() {
       //mySlider.setValue(this.getState().position); --> do not set this value (will overwrite new states continuously
       mySlider.setList(this.getState().pictureList);
       mySlider.createHTML();
       alert("changed state");
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
    mySlider.click = function() { //.click implemented in JS library -> overwrite!
          connector.onClick(mySlider.getValue()); //onClick implemented on Server-Side --> passing simple string
        //to extend the html work on the component object of mylibrary --> need to define method to extend html and call in connector
    };



};
