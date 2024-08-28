package oss.pres.domain.model;

import java.io.Serializable;

public interface Message extends Serializable {
    public Integer getId();
    public String getColumn1();
    public String getColumn2();
    public String getColumn3();
    public String getColumn4();
    public <M extends Message> void update(M msg);
    public <M extends Message> void update(Integer id);
}
