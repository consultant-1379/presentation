package oss.pres.rest.mmap;

import java.util.*;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;

import oss.pres.domain.model.Message;
import oss.pres.domain.xml.MessageXMLFactory;

@Singleton
public class MessageMap {
	private static final Logger logger = Logger.getLogger(MessageMap.class
			.getName());

	private final SortedMap<Integer, Message> mmap = new TreeMap<Integer, Message>();

	@PostConstruct
	private void init() {

		try {
			for (Message m : MessageXMLFactory.seed()) {
				create(m);
			}
		} catch (Exception x) {
			logger.warning(x.getMessage());
		}
		logger.info("MessageMap - PostConstruct");
	}

	public Message find(Integer id) {
		return mmap.get(id);
	}

	public Integer create(Message msg) {
		int key = mmap.isEmpty() ? 0 : mmap.lastKey() + 1;
		msg.update(key);
		mmap.put(key, msg);
		return key;
	}

	public void update(Message msg) {
		Message m = mmap.get(msg.getId());
		if (m == null)
			return;
		m.update(msg);
	}

	public void delete(Integer id) {
		mmap.remove(id);
	}

	public Collection<? extends Message> list() {
		return mmap.values();
	}
}
