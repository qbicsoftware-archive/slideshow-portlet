package life.qbic.portal.portlet;

import com.vaadin.shared.ui.JavaScriptComponentState;

public class MySliderState extends JavaScriptComponentState {
    public int position;
    public String[] pictureList;


    //for dynamic picture loading; not in use currently
    public boolean endOfSlider;

}
