package life.qbic.portal.portlet;


import com.vaadin.annotations.JavaScript;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.JavaScriptFunction;
import elemental.json.JsonArray;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.Serializable;
import java.util.ArrayList;

/**
 *
 * Server-Side
 *
 * handles the shared state and RemoteProcedureCall for the component
 *
 */
//Server-Side Component
@JavaScript({"myLibrary.js", "myComponent-connector.js"})
//, "myComponent-connector.js"}) //--> include scripts, if not in same package need path to script!!
public class MyComponent extends AbstractJavaScriptComponent {


    private static final Logger LOG = LogManager.getLogger(MyComponent.class);
    ArrayList<ValueChangeListener> listeners = new ArrayList<ValueChangeListener>();

    //handel RCP calls from Server-Side

    public MyComponent() {                                              //constructor that REGISTERS the call() function
        addFunction("onClick", new JavaScriptFunction() {   //call is a server-side function handler
            @Override
            public void call(JsonArray arguments) {
                getState().value = arguments.getString(0);
                LOG.info(getState().value+" value of state");
                // getState().setValue(arguments.getString(0));
                for (ValueChangeListener listener: listeners) {
                    listener.valueChange();
                    LOG.info(listener + " listener");
                }
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
    protected MyComponentState getState() {

        return (MyComponentState) super.getState();  //wie window.state für JS??
    }

//################################### Getter-Setter ####################################################################
    public void setValue(String value) {
        getState().value = value;
    }

    public String getValue() {
        return getState().value;
    }
}

