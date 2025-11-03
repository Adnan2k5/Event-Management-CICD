package com.klef.fsd.sdp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.klef.fsd.sdp.model.BookEvent;
import com.klef.fsd.sdp.model.Customer;




@Repository
public interface BookEventRepository extends JpaRepository<BookEvent,Integer>
{
  public List<BookEvent> findByCustomer(Customer customer);
  
  @Query("SELECT b from BookEvent b where b.event.manager.id = ?1")
  public List<BookEvent> getbookingsbyManager(int mid);
  
  @Modifying
  @Transactional
  @Query("UPDATE BookEvent b SET b.status = ?1 WHERE b.id = ?2")
  public int updateStatusById(String status,int id);
}