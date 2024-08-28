package oss.pres.domain.xml;

import javax.xml.bind.annotation.*;
import oss.pres.domain.model.Message;

@XmlType
@XmlAccessorType(XmlAccessType.FIELD)
public class MessageElement implements Message {
    private static final long serialVersionUID = 1L;

    @XmlAttribute
    int id;
    @XmlElement
    String column1;
    @XmlElement
    String column2;
    @XmlElement
    String column3;
    @XmlElement
    String column4;

    public MessageElement() {}

    public <M extends Message> MessageElement(M msg) {
        this.id = msg.getId();
        this.column1 = msg.getColumn1();
        this.column2 = msg.getColumn2();
        this.column3 = msg.getColumn3();
        this.column4 = msg.getColumn4();
    }

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public String getColumn1() {
        return column1;
    }

    @Override
    public String getColumn2() {
        return column2;
    }

    @Override
    public String getColumn3() {
        return column3;
    }

    @Override
    public String getColumn4() {
        return column4;
    }

    @Override
    public <M extends Message> void update(M msg) {
        column1 = msg.getColumn1();
        column2 = msg.getColumn2();
        column3 = msg.getColumn3();
        column4 = msg.getColumn4();
    }

    @Override
    public <M extends Message> void update(Integer id) {
        this.id = id;
    }
}

