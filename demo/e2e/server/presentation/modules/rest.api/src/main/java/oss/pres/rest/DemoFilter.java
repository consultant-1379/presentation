package oss.pres.rest;

import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;
import org.jboss.resteasy.plugins.server.servlet.FilterDispatcher;

@WebFilter(
    filterName = "restfilter",
    urlPatterns = {"/*"},
    initParams={
        @WebInitParam(name="resteasy.scan", value="true")
    }
)
public class DemoFilter extends FilterDispatcher {
}
