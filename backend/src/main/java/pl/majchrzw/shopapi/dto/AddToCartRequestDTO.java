package pl.majchrzw.shopapi.dto;

import lombok.Data;

@Data
public class AddToCartRequestDTO {
	
	private int quantity;
	
	private long id;
}
