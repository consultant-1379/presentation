package oss.pres.rest.mmap;

import java.util.logging.Logger;
import javax.inject.Inject;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(Arquillian.class)
public class MessageMapTest {
    private static final Logger logger =
        Logger.getLogger(MessageMapTest.class.getName());
    
    @Deployment
    public static JavaArchive createDeployment() {
        return ShrinkWrap.create(JavaArchive.class)
            .addClass(MessageMap.class)
            .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
    }
    
    @Inject
    MessageMap messageMap;

    /*
        try {
            for (Message m : MessageXMLFactory.seed()) {
                messageMap.create(m);
            }
        } catch (Exception x) {
            logger.warning(x.getMessage());
        }
        * 
        * 
        */
    
    @Test
    public void testFind() throws Exception {
        Assert.assertNotNull(messageMap);
    }

    @Test
    public void testCreate() throws Exception {
        Assert.assertNotNull(messageMap);
    }

    @Test
    public void testUpdate() throws Exception {
        Assert.assertNotNull(messageMap);
    }

    @Test
    public void testDelete() throws Exception {
        Assert.assertNotNull(messageMap);
    }

    @Test
    public void testList() throws Exception {
        Assert.assertNotNull(messageMap);
    }
}
