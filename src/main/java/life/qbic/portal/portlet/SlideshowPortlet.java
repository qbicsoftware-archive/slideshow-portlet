package life.qbic.portal.portlet;

import com.vaadin.annotations.Theme;
import com.vaadin.annotations.Widgetset;
import java.io.InputStream;
import java.net.URI;
import java.util.Properties;

import com.vaadin.server.Page;
import com.vaadin.server.VaadinRequest;
import com.vaadin.server.VaadinServlet;
import com.vaadin.ui.Alignment;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.Layout;
import com.vaadin.ui.UI;

import life.qbic.portal.utils.PortalUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.validation.constraints.Null;
import java.io.IOException;

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

    private MySlider mySlider;

    @Override
    protected Layout getPortletContent(final VaadinRequest request) {
        mySlider =  new MySlider(buildImagePath());
        //String basePath = VaadinService.getCurrent().getBaseDirectory().getAbsolutePath();

        // Set the starting position from server
        // mySlider.setValue(0);

        // Process a value input by the user from the client-side
        mySlider.addValueChangeListener(
                new MySlider.ValueChangeListener() {
                    @Override
                    public void valueChange() {
                        //handle value changes from JS here in java
                        //Notification.show("Value: " + mySlider.getValue());
                        //Notification.show("Value: " + mySlider.getEndOfSlider()); Notification in Window
                        //LOG.info(mySlider.getValue()+ " this is the value");
                    }
                });
        LOG.info("Generating content for {}", SlideshowPortlet.class);


        HorizontalLayout layout = new HorizontalLayout();

        layout.addComponent(mySlider);
        layout.addStyleName("mySlider"); //vaadin adds the tag to the layout in order to change its style settings --> see mytheme.scss

        return layout;
    }

    /**
     * This Method creates the path to the pictures
     * @return
     */
    private String buildImagePath() {
        StringBuilder pathBuilder = new StringBuilder();

        if (PortalUtils.isLiferayPortlet()) {
            Properties prop = new Properties();
            InputStream in = this.getClass().getClassLoader()
                    .getResourceAsStream("WEB-INF/liferay-plugin-package.properties");
            try {
                prop.load(in);
                in.close();
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            String portletName = prop.getProperty("name");


            //pathBuilder.append("https://");
            URI location = UI.getCurrent().getPage().getLocation();
            // http
            pathBuilder.append(location.getScheme());
            pathBuilder.append("://");
            // host+port
            pathBuilder.append(location.getAuthority());

            String port = (Integer.toString(location.getPort()));
            if (location.toString().contains(port)) {
                pathBuilder.append(":");
                pathBuilder.append(port);
            }
           // pathBuilder.append("portal-testing.qbic.uni-tuebingen.de");
            pathBuilder.append("/");
            pathBuilder.append(portletName);
        }
        //path to images folder
        pathBuilder.append("/VAADIN/images/");
        LOG.info(pathBuilder.toString());
        return pathBuilder.toString();
    }


}
