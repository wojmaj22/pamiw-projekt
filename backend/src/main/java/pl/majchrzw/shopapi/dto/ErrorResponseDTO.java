package pl.majchrzw.shopapi.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class ErrorResponseDTO {
	private String message;
	private Instant timestamp;
	
	private String error;
}
