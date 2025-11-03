package com.klef.fsd.sdp.service;

import java.util.List;

import com.klef.fsd.sdp.model.BookEvent;
import com.klef.fsd.sdp.model.Customer;
import com.klef.fsd.sdp.model.Event;

public interface CustomerService 
{
  public String customerregistration(Customer customer);
  public Customer checkcustomerlogin(String username,String password);
  
  public String customerupdateprofile(Customer customer);
  
  public List<Event> viewallevents();
  
  public Customer getCustomerById(int cid);
  public Event getEventById(int eid);
  
  public String bookevent(BookEvent bookEvent);
  public List<BookEvent> getbookedeventsByCustomer(int cid);
  
}