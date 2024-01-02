package pl.majchrzw.shopapi.dto;

import lombok.Data;

import java.util.List;

@Data
public class AddToCartDTO {
	
	private List<AddToCartRequestDTO> items;
}


