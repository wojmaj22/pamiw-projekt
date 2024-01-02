package pl.majchrzw.shopapi.components;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pl.majchrzw.shopapi.dto.ErrorResponseDTO;

import java.time.Instant;
import java.util.Set;

@ControllerAdvice
public class ExceptionResponseHelper {

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ErrorResponseDTO> ConstraintViolationExceptionHandler(ConstraintViolationException exception){
		ErrorResponseDTO errorResponse = new ErrorResponseDTO();
		var sb = new StringBuilder();
		Set<ConstraintViolation<?>> errors = exception.getConstraintViolations();
		for ( ConstraintViolation<?> violation: errors) {
			sb.append(violation.getMessage());
			sb.append(".");
		}
		errorResponse.setTimestamp(Instant.now());
		errorResponse.setMessage(sb.toString());
		errorResponse.setError("Validation error");
		
		return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<ErrorResponseDTO> EntityNotFoundExceptionHandler(EntityNotFoundException exception){
		ErrorResponseDTO errorResponse = new ErrorResponseDTO();
		errorResponse.setMessage(exception.getMessage());
		errorResponse.setTimestamp(Instant.now());
		errorResponse.setError("Not found error");
		
		return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
	}
}
