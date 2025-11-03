package com.klef.fsd.sdp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer_table")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)  // auto increment  starts from 1
	@Column(name = "customer_id")
	private int id;
	@Column(name = "customer_name", length = 50, nullable = false)
	private String name;
	@Column(name = "customer_gender", length = 10, nullable = false)
	private String gender;
	@Column(name = "customer_dob", length = 20, nullable = false)
	private String dob;
	@Column(name = "customer_email", length = 50, nullable = false, unique = true)
	private String email;
	@Column(name = "customer_uname", length = 50, nullable = false, unique = true)
	private String username;
	@Column(name = "customer_pwd", length = 50, nullable = false)
	private String password;
	@Column(name = "customer_mobileno", length = 20, nullable = false, unique = true)
	private String mobileno;
	@Column(name = "customer_location", length = 50, nullable = false)
	private String location;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobileno() {
		return mobileno;
	}

	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}
