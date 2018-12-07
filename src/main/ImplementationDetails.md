# Implementation Details

In order to properly extent or improve this tool it is crucial to understand how **Vaadin** and **Javascript (JS)** work together
or more correctly how **Vaadin** integrates **JS** components.
The following should give a brief outline on how these two components interact and how to change the appearance of the slideshow with **CSS**.

## Vaadin

**Vaadin** contains both, the *server-* and the *client-side*. The *client-side* is represented by the class `SlideshowPortlet.java`.
The Server-Side Component is represented by `MySlider.java`, this class loads the **JS** components with: 
```
@JavaScript({"vaadin://js/mySliderLibrary.js", "vaadin://js/mySliderConnector.js"})
```
Note that this class extends the `AbstractJavaScriptComponent`. It creates `MySliderState.java`, which defines that
variables that are shared by **Vaadin** and **JS**.



## JavaScript

The JavaScript Connector `mySliderConnector.js` defines functions for the java class *window.life_qbic_portal_portlet_MySlider* and within its functions it creates a mySlider Javascript object (based on the `mySliderLibrary.js`) and links
**Vaadin** and **JS**. Be careful in distinguishing between these two objects! The keyword *this* reflects the **Vaadin** class
`mySlider` while the explicitly defined variable `mySlider` describes the **JS** object.
For registering calls from **Vaadin** in **JS** consider following example:
```javascript 1.8
    this.onStateChange = function() {
       mySlider.setList(this.getState().pictureList);
       mySlider.createHTML();
    };
```
The outer function therefore overwrites a **Vaadin** function by calling functions of **JS** (on its object).
*this* reflects the **Vaadin** object and *mySlider* represents the **JS** object.

To register call from **JS** in **Vaadin** it is the other way round:

```javascript 1.8
var connector = this;
    mySlider.click = function() { 
          connector.onClick(mySlider.getValue()); 
    };
```
Here *this* has to be called through a variable because the *this* will not be recognized within the **JS** function.
Notice how the function is called directly through the *JS* object, thus the called method needs to be defined in the `mySliderLibrary.js` in order to overwrite it here.
The onClick method is registered in `mySlider.java` with call, a server side function handler:

```java:
addFunction("onClick", new JavaScriptFunction() {   
            @Override
            public void call(JsonArray arguments) {

                getState().position = (int) (arguments.getNumber(0));

                for (ValueChangeListener listener : listeners) {
                    listener.valueChange();
                }

            }
        });
```
`call()` registers the arguments that have been used to call the function `onClick()`.
The parameters can be used to implement desired functionality on the **Vaadin**-side.

The `mySliderState.java` class contains only the variables that are shared by **Vaadin** and **JS**. Changes of these
variables are automatically reported by calling the *onStateChange()* function that is implemented in the connector. 
 

## CSS

In order to make changes on the styles visible it is important to consider the hierarchy of the objects. The most specific
style is applied to the object. To change the style of the slideshow within the horizontal layout change the class v-slot-slider. The class name slider
 is add in `SlideshowPortlet.java` and defined in `mytheme.scss`. These changes exclude the footer and thus enable e.g. centering.
 

Furthermore, the styles can only be defined in `mytheme.scss`, changes of the other style sheets will be overwritten.

Hint: checking the final css styles use your browsers *Inspect Page*. It also allows life changes.

## Additional Links

For the linking of **Javascript** to **Vaadin** [this](https://vaadin.com/docs/v8/framework/gwt/gwt-javascript.html "vaadin.com") tutorial
served as a guideline. The slideshow itself is based on [this](https://www.w3schools.com/howto/howto_js_slideshow.asp "w3schools.com") tutorial.
