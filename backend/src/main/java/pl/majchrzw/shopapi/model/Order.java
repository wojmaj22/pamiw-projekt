package pl.majchrzw.shopapi.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private Long id;
	
	@Column(name = "username")
	private String user;
	
	@Column(name = "order_date")
	private Date orderDate;
	
	@Column(name = "status")
	private OrderStatus orderStatus;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<OrderDetail> orderDetails;
	
	public Order(String user, Date orderDate) {
		this.user = user;
		this.orderDate = orderDate;
		this.orderStatus = OrderStatus.NEW;
	}
}

