window.life_qbic_portal_portlet_MySlider= // <- match server-side class names! (consider package name!!)
function() {
    // Create the component
    var mySlider =
        new mySliderLibrary.MySlider(this.getElement()); //call myLibrary function with this element to connect JS


    //this.FunctionName = function() {}
    //implements functions from MySlider which is a java class (!= var mySlider which is js)
    //it calls a js method in function body

    // Handle changes from the server-side (if one of the shared state variables is changed this fkt is triggered)
    // Predefined!
    this.onStateChange = function() {
       mySlider.setList(this.getState().pictureList);
       //alert("changed state registered");
       //TODO reloads HTML each time someone clicks the slider -> filter for change of pictureList
       mySlider.createHTML();
    };

    /* uncommented to check if used
    this.loadPictures = function() {
        alert("i entered the connector");
        mySlider.setList(this.getState().pictureList);

    };*/

    //mySlider.FunctionName =  function(){}
    //implements functions from mySliderLibrary which is a js class and call a java class (of mySlider = this)

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
          //alert("clicked");
    };

    mySlider.isEnd = function(){
        connector.reloadPictures(); //setEndOfSlider is defined in mySlider.java
    }

};
