package oss.pres.domain.xml;

import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import org.junit.BeforeClass;
import org.junit.Test;
import oss.pres.domain.model.Message;

public class MessageElementTest {
    
    static final MessageElement msg = new MessageElement();
    
    @BeforeClass
    public static void setUpClass() throws Exception {
        msg.id = 1;
        msg.column1 = "Column1";
        msg.column2 = "Column2";
        msg.column3 = "Column3";
        msg.column4 = "Column4";
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }
    
    @Test
    public void testGetId() {
        Integer res = 1;
        assertEquals(res, msg.getId());
    }

    @Test
    public void testGetColumn1() {
        assertEquals("Column1", msg.getColumn1());
    }

    @Test
    public void testGetColumn2() {
        assertEquals("Column2", msg.getColumn2());
    }

    @Test
    public void testGetColumn3() {
        assertEquals("Column3", msg.getColumn3());
    }

    @Test
    public void testGetColumn4() {
        assertEquals("Column4", msg.getColumn4());
    }

    @Test
    public void testUpdate_Message() {
        final Integer res = 2;
        Message newMsg = new Message(){
            @Override
            public Integer getId() {
                return res;
            }

            @Override
            public String getColumn1() {
                return "Column21";
            }

            @Override
            public String getColumn2() {
                return "Column22";
            }

            @Override
            public String getColumn3() {
                return "Column23";
            }

            @Override
            public String getColumn4() {
                return "Column24";
            }

            @Override
            public <M extends Message> void update(M msg) {
                // test object
            }

            @Override
            public <M extends Message> void update(Integer id) {
                // test object
            }
        };
        msg.update(newMsg);
        // This method does not update ID
        assertFalse(res.equals(msg.getId()));
        assertEquals("Column21", msg.getColumn1());
        assertEquals("Column22", msg.getColumn2());
        assertEquals("Column23", msg.getColumn3());
        assertEquals("Column24", msg.getColumn4());
    }

    @Test
    public void testUpdate_Integer() {
        Integer res = 3;
        msg.update(res);
        assertEquals(res, msg.getId());
    }
}