package pl.majchrzw.shopapi.dto;

import lombok.Data;

@Data
public class DefaultResponseDTO<T> {
	
	private String message;
	private T body;
}
