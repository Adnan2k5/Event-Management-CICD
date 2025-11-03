package com.klef.fsd.sdp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.klef.fsd.sdp.model.Event;
import com.klef.fsd.sdp.model.Manager;

@Repository
public interface EventRepository extends JpaRepository<Event,Integer>
{
	public List<Event> findByManager(Manager manager);
	
	 @Query("select count(e) from Event e")
	 public long eventcount();
}