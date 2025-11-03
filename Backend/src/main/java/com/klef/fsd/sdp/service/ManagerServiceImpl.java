package com.klef.fsd.sdp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.fsd.sdp.model.BookEvent;
import com.klef.fsd.sdp.model.Event;
import com.klef.fsd.sdp.model.Manager;
import com.klef.fsd.sdp.repository.BookEventRepository;
import com.klef.fsd.sdp.repository.EventRepository;
import com.klef.fsd.sdp.repository.ManagerRepository;

@Service
public class ManagerServiceImpl implements ManagerService
{
	@Autowired
    private ManagerRepository managerRepository;
	
	@Autowired
    private EventRepository eventRepository;
	
	@Autowired
	private BookEventRepository bookEventRepository;
	
	@Override
	public Manager checkmanagerlogin(String username, String password) 
	{
		return managerRepository.findByUsernameAndPassword(username, password);
	}

	@Override
	public String addevent(Event event) 
	{
		eventRepository.save(event);
		return "Event Added Successfully";
	}

	@Override
	public Manager getManagerById(int mid) 
	{
	   return managerRepository.findById(mid).get();
	}

	@Override
	public List<Event> vieweventsbymanager(int mid) 
	{
		 Manager manager = managerRepository.findById(mid).orElse(null);
		 return eventRepository.findByManager(manager);
	}

	@Override
	public List<BookEvent> getbookingsbyManager(int mid) 
	{
		return bookEventRepository.getbookingsbyManager(mid);
	}

	@Override
	public String updatebookingstatus(int id, String status) 
	{
		bookEventRepository.updateStatusById(status,id);
		return "Booking Status Updated Successfully";
	}

}