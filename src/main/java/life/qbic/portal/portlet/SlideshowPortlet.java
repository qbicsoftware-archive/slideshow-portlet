package life.qbic.portal.portlet;

import com.vaadin.annotations.Theme;
import com.vaadin.annotations.Widgetset;
import com.vaadin.server.ClassResource;
import com.vaadin.server.FileResource;
import com.vaadin.server.VaadinRequest;
import com.vaadin.server.VaadinService;
import com.vaadin.ui.Image;
import com.vaadin.ui.Layout;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.navigator.View;
import com.vaadin.navigator.ViewChangeListener.ViewChangeEvent;

import com.vaadin.ui.Notification;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.util.ArrayList;


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
    MyComponent mycomponent = new MyComponent();
    MySlider mySlider = new MySlider();
    ArrayList<String> listOfPictures = new ArrayList<String>();


    public SlideshowPortlet() {
       // String basePath = VaadinService.getCurrent().getBaseDirectory().getAbsolutePath();

        // Set the value from server-side
        //mycomponent.setValue("Server-side value");

        // Process a value input by the user from the client-side
       /* mySlider.addValueChangeListener(
                new MyComponent.ValueChangeListener() {
                    @Override
                    public void valueChange() {
                        Notification.show("Value: " + mycomponent.getValue());
                        LOG.info(mycomponent.getValue()+ "this is the value");
                    }
                });*/

    }

    @Override
    protected Layout getPortletContent(final VaadinRequest request) {
        LOG.info("Generating content for {}", SlideshowPortlet.class);
        

        HorizontalLayout layout = new HorizontalLayout();
        layout.addComponent(mySlider);

        String basepath = VaadinService.getCurrent()
                .getBaseDirectory().getAbsolutePath();

        // Image as a file resource
        FileResource resource = new FileResource(new File(basepath +
                "/WEB-INF/images/colors.jpg"));
        LOG.info(basepath+"/WEB-INF/images/colors.jpg");

        // Show the image in the application
        Image image = new Image("Image from file", resource);
        layout.addComponent(image);

        //layout.addComponent(new Image(null,
        //        new FileResource("images/colors.jpg")));


        return layout;
    }


    public void test() {

        /** Place into code to display
         * window.foo = new mylibrary.MyComponent(
         *             document.getElementById("foo"));
         *     window.foo.click = function () {
         *         alert("Value is " + this.getValue());
         */

    }

}
