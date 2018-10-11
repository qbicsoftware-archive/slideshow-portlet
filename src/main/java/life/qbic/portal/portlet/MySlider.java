package life.qbic.portal.portlet;

import com.vaadin.annotations.JavaScript;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.JavaScriptFunction;
import elemental.json.JsonArray;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.Serializable;
import java.util.ArrayList;


@JavaScript({"vaadin://js/myLibrary.js", "vaadin://js/myComponent-connector.js"})
public class MySlider extends AbstractJavaScriptComponent {


    private static final Logger LOG = LogManager.getLogger(life.qbic.portal.portlet.MySlider.class);
    ArrayList<ValueChangeListener> listeners = new ArrayList<ValueChangeListener>();

    //handel RCP calls from Server-Side

    public MySlider() {                                              //constructor that REGISTERS the call() function
        addFunction("onClick", new JavaScriptFunction() {   //call is a server-side function handler
            @Override
            public void call(JsonArray arguments) {
                /**
                 getState().value = arguments.getString(0);
                 LOG.info(getState().value+" value of state");


                 for (ValueChangeListener listener: listeners) {
                 listener.valueChange();
                 LOG.info(listener + " listener");
                 }
                 **/
            }
        });
    }

    //include ValueChangeListeners
    public interface ValueChangeListener extends Serializable {
        void valueChange();
    }

    public void addValueChangeListener(ValueChangeListener listener) {
        listeners.add(listener);
    }


    //include the states shared by Browser and Script
    @Override
    protected MySliderState getState() {

        return (MySliderState) super.getState();  //state shared by both the browser and the server
    }

    //################################### Getter-Setter ####################################################################
    public void setValue(int pos) {
        getState().position = pos;
    }

    public int getValue() {
        return getState().position;
    }


}
