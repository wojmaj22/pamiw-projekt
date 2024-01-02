package pl.majchrzw.shopapi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.majchrzw.shopapi.model.OrderStatus;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostOrderDTO {

	@NotNull( message = "Field cannot be null")
	private String user;

	@NotNull( message = "Field cannot be null")
	private Date orderDate;

	@NotNull( message = "Field cannot be null")
	private OrderStatus orderStatus;
}
