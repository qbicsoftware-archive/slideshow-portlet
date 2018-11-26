package life.qbic.portal.portlet;


import com.vaadin.annotations.JavaScript;

import com.vaadin.server.VaadinService;
import com.vaadin.ui.AbstractJavaScriptComponent;
import com.vaadin.ui.JavaScriptFunction;
import elemental.json.JsonArray;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.Serializable;

import java.util.ArrayList;


@JavaScript({"vaadin://js/mySliderLibrary.js", "vaadin://js/mySliderConnector.js"})
public class MySlider extends AbstractJavaScriptComponent {


    private static final Logger LOG = LogManager.getLogger(life.qbic.portal.portlet.MySlider.class);
    ArrayList<ValueChangeListener> listeners = new ArrayList<ValueChangeListener>();
    private String[] pictureType = new String[]{"jpg", "png"};
    private String jsPath;

    //handel RCP calls from Server-Side
    public MySlider(String basePath) { //constructor that REGISTERS the call() function
        //TODO read configuration.txt for valid datatypes
        readConfig();
        jsPath = basePath;

        loadPictures();

        //when a Button is clicked this Method retrieves JS function parameters and recognizes the use of the function
        addFunction("onClick", new JavaScriptFunction() {   //call is a server-side function handler
            @Override
            public void call(JsonArray arguments) {

                //LOG.info("Type {}", arguments.getNumber(0));
                getState().position = (int) (arguments.getNumber(0));
                //LOG.info(getState().position + " value of state");

                //reached end of list:
                //reload pictures; this attempt is not fully functional
                //if (getValue() == getList().length) {
                //    loadPictures();
                //    LOG.info("Updated list of pictures");

                //}


                for (ValueChangeListener listener : listeners) {
                    listener.valueChange();
                }

            }
        });

        //when the end of the slider is reached JS triggers a reload of the pictures (see connector)
        addFunction("reloadPictures", new JavaScriptFunction() {   //call is a server-side function handler
            @Override
            public void call(JsonArray arguments) {

                loadPictures();
                LOG.info("Updated list of pictures");

                for (ValueChangeListener listener : listeners) {
                    listener.valueChange();
                }

            }
        });

    }

    /**
     * Determines valid data types for the pictures that are loaded
     */
    private void readConfig(){
        //todo implement
    }

    /**
     * Method to check if the element is of defined file type
     *
     * @param file
     * @return
     */
    private boolean checkFileType(File file) {
        String name = file.getName();
        String fileEnding = name.split("\\.")[1];
        for (String elem : pictureType) {
            if (elem.equals(fileEnding)) {
                return true;
            }
        }
        return false;
    }

    /**
     * This Method loads the pictures from the folder and sets the new list (-> sharedState)
     */
    private void loadPictures(){
        //set up the pictureList
        String basePath = VaadinService.getCurrent().getBaseDirectory().getAbsolutePath();
        File folder = new File(basePath + "/VAADIN/images/");
        File[] listOfFiles = folder.listFiles();
        ArrayList<String> filesList = new ArrayList<>();


        for (int i = 0; i < listOfFiles.length; i++) {

            if (listOfFiles[i].isFile() && checkFileType(listOfFiles[i])) {
                filesList.add(jsPath+listOfFiles[i].getName());
                LOG.info("Name of the file " + listOfFiles[i].getName());

            } else if (listOfFiles[i].isDirectory()) {
                LOG.info("Why is there another directory? Pictures only get processed if they are directly located in the 'images' directory");
            }
        }

        String[] pictures = filesList.toArray(new String[filesList.size()]);
        setList(pictures);

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


    public void setList(String[] list) {
        getState().pictureList = list;
    }

    public String[] getList() {
        return getState().pictureList;
    }

    /*// should be used to dynamically reload the picture
    // if EndOfSlider is true then Java should transfer again the picturelist to JS
    public void setEndOfSlider(boolean end) {
        getState().endOfSlider = end;
    }

    public boolean getEndOfSlider() {
        return getState().endOfSlider;
    }*/


}
