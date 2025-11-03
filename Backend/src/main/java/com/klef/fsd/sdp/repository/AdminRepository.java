package com.klef.fsd.sdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.fsd.sdp.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
	public Admin findByUsernameAndPassword(String username, String password);
}
