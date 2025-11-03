package com.klef.fsd.sdp.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "bookevent_table")
public class BookEvent 
{
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(nullable = false)
    private String startdate;

    @Column(nullable = false)
    private String enddate;

    @Column(nullable = false)
    private int bookedcapacity;

    @Column(nullable = false)
    private String status;

    // Automatically sets the booking time at record creation
    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime bookingtime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getStartdate() {
        return startdate;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public String getEnddate() {
        return enddate;
    }

    public void setEnddate(String enddate) {
        this.enddate = enddate;
    }

    public int getBookedcapacity() {
        return bookedcapacity;
    }

    public void setBookedcapacity(int bookedcapacity) {
        this.bookedcapacity = bookedcapacity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getBookingtime() {
        return bookingtime;
    }

    public void setBookingtime(LocalDateTime bookingtime) {
        this.bookingtime = bookingtime;
    }

	@Override
	public String toString() {
		return "BookEvent [id=" + id + ", event=" + event + ", customer=" + customer + ", startdate=" + startdate
				+ ", enddate=" + enddate + ", bookedcapacity=" + bookedcapacity + ", status=" + status
				+ ", bookingtime=" + bookingtime + "]";
	}
}