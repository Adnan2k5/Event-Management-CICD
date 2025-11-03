package com.klef.fsd.sdp.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "event_table")
public class Event 
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
  private int id;
  @Column(nullable = false,length = 100)
  private String category;
  @Column(nullable = false,length = 100)
  private String title;
  @Column(nullable = false,length = 500)
  private String description;
  @Column(nullable = false)
  private int capacity;
  @Column(nullable = false)
  private double cost;
  
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "manager_id") // Foreign key column
  private Manager manager;

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

public String getTitle() {
	return title;
}

public void setTitle(String title) {
	this.title = title;
}

public String getDescription() {
	return description;
}

public void setDescription(String description) {
	this.description = description;
}

public int getCapacity() {
	return capacity;
}

public void setCapacity(int capacity) {
	this.capacity = capacity;
}

public double getCost() {
	return cost;
}

public void setCost(double cost) {
	this.cost = cost;
}

public Manager getManager() {
	return manager;
}

public void setManager(Manager manager) {
	this.manager = manager;
}
}
