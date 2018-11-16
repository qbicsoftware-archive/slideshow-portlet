package life.qbic.portal.portlet;

import com.vaadin.annotations.Theme;
import com.vaadin.annotations.Widgetset;
import com.vaadin.server.FileResource;
import com.vaadin.server.VaadinRequest;
import com.vaadin.server.VaadinService;
import com.vaadin.ui.Image;
import com.vaadin.ui.Layout;
import com.vaadin.ui.HorizontalLayout;

import com.vaadin.ui.Notification;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;



/**
 * Entry point for portlet slideshow-portlet. This class derives from {@link QBiCPortletUI}, which is found in the {@code portal-utils-lib} library.
 * 
 * @see <a href=https://github.com/qbicsoftware/portal-utils-lib>portal-utils-lib</a>
 */
@Theme("mytheme") //-> include stylesheet
//@SuppressWarnings("serial")
@Widgetset("life.qbic.portal.portlet.AppWidgetSet") //-> include widgetinfo (gwt)
public class SlideshowPortlet extends QBiCPortletUI{


    private static final Logger LOG = LogManager.getLogger(SlideshowPortlet.class);
   // MyComponent mycomponent = new MyComponent();
    MySlider mySlider = new MySlider();


    public SlideshowPortlet() {
       // String basePath = VaadinService.getCurrent().getBaseDirectory().getAbsolutePath();

        // Set the starting position from server
        // mySlider.setValue(0);

        // Process a value input by the user from the client-side
       mySlider.addValueChangeListener(
                new MySlider.ValueChangeListener() {
                    @Override
                    public void valueChange() {
                        Notification.show("Value: " + mySlider.getValue());
                        Notification.show("Value: " + mySlider.getList());
                        Notification.show("Value: " + mySlider.getEndOfSlider());
                        LOG.info(mySlider.getValue()+ "this is the value");
                    }
                });

    }

    @Override
    protected Layout getPortletContent(final VaadinRequest request) {
        LOG.info("Generating content for {}", SlideshowPortlet.class);
        

        HorizontalLayout layout = new HorizontalLayout();
        layout.addComponent(mySlider);

        return layout;
    }


    public void createList() {
        /**
         *
         * This function should initially create the list of picture to be displayed in the slider
         */

    }

    public void updateList(){
        /**
         * This list should update the picture list every time the slider reached the last picture in the slider.
         * Are there any new pictures? Yes? Then add the new picture to the slider (--> update innerHTML of Element)
         */
    }

}
