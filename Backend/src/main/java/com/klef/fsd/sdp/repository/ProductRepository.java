package com.klef.fsd.sdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.fsd.sdp.model.Product;
import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product,Integer>
{
  public List<Product> findByCategory(String category);
}