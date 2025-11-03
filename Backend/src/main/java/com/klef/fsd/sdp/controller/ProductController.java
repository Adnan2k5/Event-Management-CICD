package com.klef.fsd.sdp.controller;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.klef.fsd.sdp.dto.ProductDTO;
import com.klef.fsd.sdp.model.Product;
import com.klef.fsd.sdp.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin("*")
public class ProductController 
{
	 @Autowired
	 private ProductService productService;
	
	 // to add or insert the product with image
	 
	 @PostMapping("/addproduct")
	 public ResponseEntity<String> addProduct(
	         @RequestParam String category,
	         @RequestParam String name,
	         @RequestParam String description,
	         @RequestParam double cost,
	         @RequestParam String url,
	         @RequestParam("productimage") MultipartFile file) {
	     try {
	         byte[] bytes = file.getBytes();
	         Blob blob = new javax.sql.rowset.serial.SerialBlob(bytes);

	         Product p = new Product();
	         p.setCategory(category);
	         p.setName(name);
	         p.setDescription(description);
	         p.setCost(cost);
	         p.setUrl(url);
	         p.setImage(blob);

	         String output = productService.addProduct(p);
	         return ResponseEntity.ok(output);

	     } catch (Exception e) {
	         return ResponseEntity.status(500).body("Error: " + e.getMessage());
	     }
	 }

	 
	 // to view or display all products
	 
	 @GetMapping("viewallproducts")
	 public ResponseEntity<List<ProductDTO>> viewallproducts() 
	 {
	     List<Product> productList = productService.viewallProducts();
	     List<ProductDTO> productDTOList = new ArrayList<>();

	     for (Product p : productList) {
	         ProductDTO dto = new ProductDTO();
	         dto.setId(p.getId());
	         dto.setCategory(p.getCategory());
	         dto.setName(p.getName());
	         dto.setDescription(p.getDescription());
	         dto.setCost(p.getCost());
	         dto.setUrl(p.getUrl());
	         productDTOList.add(dto);
	     }

	     return ResponseEntity.ok(productDTOList);
	 }
	   // to display product image by id
	   
	@GetMapping("displayproductimage")
	public ResponseEntity<byte[]> displayproductimage(@RequestParam int id) throws Exception
	{
	  Product product =  productService.viewProductById(id);
	  byte [] imageBytes = null;
	  imageBytes = product.getImage().getBytes(1,(int) product.getImage().length());

	  return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
	  //return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(imageBytes);
	}
	
	// to view or display product by id

	   @PostMapping("displayproductbyid")
	   public ResponseEntity<ProductDTO> displayproductdemo(@RequestParam int pid)
	   {
		   Product p=productService.viewProductById(pid);
		   
		     ProductDTO dto = new ProductDTO();
		     
	         dto.setId(p.getId());
	         dto.setCategory(p.getCategory());
	         dto.setName(p.getName());
	         dto.setDescription(p.getDescription());
	         dto.setCost(p.getCost());
	         dto.setUrl(p.getUrl());
		   
		   return ResponseEntity.ok(dto);
	   }
	   


}