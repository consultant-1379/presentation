package oss.pres.rest.resource;

import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import oss.pres.domain.xml.MessageElement;
import oss.pres.rest.mmap.MessageMap;

/*
 Operation          | HTTP    | Method - URL 
 -------------------+---------+--------------------------------
 List all messages  | GET     | /rest/messages
 Create message     | POST    | /rest/messages
 Read message       | GET     | /rest/messages/id
 Update message     | PUT     | /rest/messages/id
 Delete message     | DELETE  | /rest/messages/id


 JSON format for messages
 [{
 "id":0,
 "column1":"Value01",
 "column2":"Value02",
 "column3":"Value03",
 "column4":"Value04"
 },
 ...]
 * 
 */

@Stateless
@Path("/messages")
public abstract class AbstractResource {
	private static final Logger logger = Logger
			.getLogger(AbstractResource.class.getName());

	@EJB
	private MessageMap ms;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMessages() {
		return Response.status(200).entity(ms.list()).build();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMessage(@PathParam("id") Integer id) {
		return Response.status(200).entity(ms.find(id)).build();
	}

	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateMessage(@PathParam("id") Integer id,
			MessageElement msg) {
		boolean ok = false;
		try {
			ms.update(msg);
			ok = true;
		} catch (Exception x) {
			logger.severe(x.getMessage());
		}
		return ok ? Response.noContent().build() : Response.serverError()
				.build();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createMessage(MessageElement msg) {
		boolean ok = false;
		int id = 0;
		try {
			id = ms.create(msg);
			ok = true;
		} catch (Exception x) {
			logger.severe(x.getMessage());
		}
		return ok ? Response.status(200).entity(ms.find(id)).build() : Response
				.serverError().build();
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteMessage(@PathParam("id") Integer id) {
		ms.delete(id);
		return Response.noContent().build();
	}
}