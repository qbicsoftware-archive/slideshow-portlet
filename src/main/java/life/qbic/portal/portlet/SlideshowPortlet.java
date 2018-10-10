package life.qbic.portal.portlet;

import com.vaadin.annotations.Theme;
import com.vaadin.annotations.Widgetset;
import com.vaadin.server.VaadinRequest;
import com.vaadin.ui.Layout;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.navigator.View;
import com.vaadin.navigator.ViewChangeListener.ViewChangeEvent;

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
public class SlideshowPortlet extends QBiCPortletUI implements View{


    private static final Logger LOG = LogManager.getLogger(SlideshowPortlet.class);
    MyComponent mycomponent = new MyComponent();


    public SlideshowPortlet() {
        // Set the value from server-side
        mycomponent.setValue("Server-side value");

        // Process a value input by the user from the client-side
        mycomponent.addValueChangeListener(
                new MyComponent.ValueChangeListener() {
                    @Override
                    public void valueChange() {
                        Notification.show("Value: " + mycomponent.getValue());
                        LOG.info(mycomponent.getValue()+ "this is the value");
                    }
                });

    }

    @Override
    protected Layout getPortletContent(final VaadinRequest request) {
        LOG.info("Generating content for {}", SlideshowPortlet.class);
        

        HorizontalLayout layout = new HorizontalLayout();
        layout.addComponent(mycomponent);


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

    @Override
    public void enter(ViewChangeEvent event) {

        LOG.info("entered?? ");
    }
}