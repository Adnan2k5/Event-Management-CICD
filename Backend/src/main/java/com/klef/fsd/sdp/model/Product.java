package com.klef.fsd.sdp.model;

import java.sql.Blob;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_table")
public class Product 
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="product_id")
  private int id;
  @Column(name="product_category",nullable = false,length = 100)
  private String category;
  @Column(name="product_name",nullable = false,length = 100)
  private String name;
  @Column(name="product_desc",nullable = false,length = 500)
  private String description;
  @Column(name="product_cost",nullable = false)
  private double cost;
  @Column(name="product_url",length = 200,nullable=false)
  private String url;
  @Column(name="product_image",nullable = false)
  private Blob image; // blob - binary large object
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getCategory() {
	return category;
}
public void setCategory(String category) {
	this.category = category;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public double getCost() {
	return cost;
}
public void setCost(double cost) {
	this.cost = cost;
}
public String getUrl() {
	return url;
}
public void setUrl(String url) {
	this.url = url;
}
public Blob getImage() {
	return image;
}
public void setImage(Blob image) {
	this.image = image;
}

}
