window.life_qbic_portal_portlet_MySlider= // <- match server-side class names! (consider package name!!)
function() {
    // Create the component
    var mySlider =
        new mySliderLibrary.MySlider(this.getElement()); //call myLibrary function with this element to connect JS

    // Handle changes from the server-side
    this.onStateChange = function() {
       // myComponent.setValue(this.getState().value); //put new value into JS in HTML
        this.getElement().alert("alert new value");

    };
};
