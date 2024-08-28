package oss.pres.domain.xml;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.*;
import oss.pres.domain.model.Message;

public abstract class MessageXMLFactory {
    
    @XmlRootElement(name="messages")
    @XmlAccessorType(XmlAccessType.FIELD)
    static class Messages implements Serializable {
        private static final long serialVersionUID = 1L;
        
        @XmlElement(name="row")
        Collection<MessageElement> rows = new ArrayList<MessageElement>();
        
        public Messages() {}
        
        public <M extends Message> Messages(Collection<M> ms) {
            for (M m : ms) {
                rows.add(new MessageElement(m));
            }
        }
    }

    public static void exportMessages(Collection<? extends Message> ms, OutputStream out, boolean format) throws Exception {
        JAXBContext ctx = JAXBContext.newInstance(Messages.class);
        Marshaller m = ctx.createMarshaller();
        m.setProperty("jaxb.formatted.output", format);
        m.marshal(new Messages(ms), out);
    }
    
    public static Collection<? extends Message>  importMessages(InputStream in) throws Exception {
        JAXBContext ctx = JAXBContext.newInstance(Messages.class);
        Unmarshaller m = ctx.createUnmarshaller();
        Messages ms = (Messages) m.unmarshal(in);
        return ms.rows;
    }

    public static Collection<? extends Message>  seed() throws Exception {
        ClassLoader cl = MessageXMLFactory.class.getClassLoader();
        InputStream in = cl.getResourceAsStream("messages.xml");
        return importMessages(in);
    }
}
