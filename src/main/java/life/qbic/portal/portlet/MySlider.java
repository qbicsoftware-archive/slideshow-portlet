package life.qbic.portal.portlet;

import com.vaadin.annotations.JavaScript;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.JavaScriptFunction;
import elemental.json.JsonArray;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.Serializable;
import java.util.ArrayList;

import static com.liferay.portal.kernel.util.GetterUtil.getNumber;


@JavaScript({"vaadin://js/mySliderLibrary.js", "vaadin://js/mySliderConnector.js"})
public class MySlider extends AbstractJavaScriptComponent {


    private static final Logger LOG = LogManager.getLogger(life.qbic.portal.portlet.MySlider.class);
    ArrayList<ValueChangeListener> listeners = new ArrayList<ValueChangeListener>();

    //handel RCP calls from Server-Side

    public MySlider() { //constructor that REGISTERS the call() function
        addFunction("onClick", new JavaScriptFunction() {   //call is a server-side function handler
            @Override
            public void call(JsonArray arguments) {

                 getState().position = (int) arguments.getNumber(0);
                 LOG.info(getState().position+" value of state");


                 for (ValueChangeListener listener: listeners) {
                 listener.valueChange();
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

    public void setList(ArrayList<String> list){ getState().pictureList = list;}
    public ArrayList<String> getList() {
        return getState().pictureList;
    }

}
