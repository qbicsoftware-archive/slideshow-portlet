package life.qbic.portal.portlet;

import com.vaadin.annotations.Theme;
import com.vaadin.annotations.Widgetset;
import com.vaadin.server.FileResource;
import com.vaadin.server.VaadinRequest;
import com.vaadin.server.VaadinService;
import com.vaadin.ui.*;

import life.qbic.portal.utils.PortalUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Properties;


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

    MySlider mySlider;

    public SlideshowPortlet() {
        mySlider =  new MySlider(buildImagePath());
        //String basePath = VaadinService.getCurrent().getBaseDirectory().getAbsolutePath();

        // Set the starting position from server
        // mySlider.setValue(0);

        // Process a value input by the user from the client-side
       mySlider.addValueChangeListener(
                new MySlider.ValueChangeListener() {
                    @Override
                    public void valueChange() {
                        //Notification.show("Value: " + mySlider.getValue());
                        //Notification.show("Value: " + mySlider.getEndOfSlider()); Notification in Window
                        LOG.info(mySlider.getValue()+ " this is the value");
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

            pathBuilder.append("https://");
            /**URI location = UI.getCurrent().getPage().getLocation();
            // http
            pathBuilder.append(location.getScheme());
            pathBuilder.append("://");
            // host+port
            pathBuilder.append(location.getAuthority());

            String port = (Integer.toString(location.getPort()));
            if (location.toString().contains(port)) {
                pathBuilder.append(":");
                pathBuilder.append(port);
            }**/
            pathBuilder.append("portal-testing.qbic.uni-tuebingen.de");
            pathBuilder.append("/");
            pathBuilder.append(portletName);
        }
        //path to images folder
        pathBuilder.append("/VAADIN/images/");
        LOG.info(pathBuilder.toString());
        return pathBuilder.toString();
    }


}
