package com.klef.fsd.sdp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.fsd.sdp.model.Product;
import com.klef.fsd.sdp.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService
{
	@Autowired
	private ProductRepository productRepository;

	@Override
	public String addProduct(Product product) 
	{
	   productRepository.save(product);
	   return "Product Added Successfully";
	}

	@Override
	public List<Product> viewallProducts() 
	{
	    return productRepository.findAll();
	}

	@Override
	public Product viewProductById(int pid) 
	{
	   return productRepository.findById(pid).orElse(null);
	}

	@Override
	public List<Product> viewProductsByCategory(String category) 
	{
		return productRepository.findByCategory(category);
	}

}