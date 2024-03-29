package pl.majchrzw.shopapi.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.majchrzw.shopapi.dao.OrderRepository;
import pl.majchrzw.shopapi.dto.AddToCartDTO;
import pl.majchrzw.shopapi.dto.AddToCartRequestDTO;
import pl.majchrzw.shopapi.dto.OrderDTO;
import pl.majchrzw.shopapi.dto.PostOrderDTO;
import pl.majchrzw.shopapi.model.*;

import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderService {
	
	private final OrderRepository orderRepository;
	private final OrderDetailService orderDetailService;
	
	private final ProductService productService;
	
	public Page<Order> getOrders(Pageable pageable){
		return orderRepository.findAll(pageable);
	}
	
	public List<Order> getOrdersByUsername(String username){
		//List<Order> orders = orderRepository.findAllByUser(username);
		return orderRepository.findAllByUser(username);
	}
	
	public Order getOrderByUsernameAndStatus(String username, OrderStatus status){
		List<Order> orders = orderRepository.findAllByUserAndOrderStatus(username, status);
		if( orders.size() == 0){
			Order order = new Order(username, Date.from(Instant.now()));
			orderRepository.save(order);
			return order;
		} else if ( orders.size() == 1){
			return orders.get(0);
		} else {
			throw new IllegalStateException("Cannot have more than one order with NEW status for user");
		}
	}
	
	public long checkIfNewOrderExists( List<Order> orders){
		return orders.stream()
				.filter(order -> order.getOrderStatus() == OrderStatus.NEW)
				.count();
	}
	
	public Order getOrderById(Long id){
		Optional<Order> orderOptional = orderRepository.findById(id);
		if( orderOptional.isPresent()){
			return orderOptional.get();
		} else {
			throw new EntityNotFoundException("No order with id:" + id + ", has been found.");
		}
	}
	
	public List<OrderDetail> getOrderDetailsOfOrderById(Long id){
		Optional<Order> orderOptional = orderRepository.findById(id);
		if( orderOptional.isPresent()) {
			return orderOptional.get().getOrderDetails();
		} else {
			throw new EntityNotFoundException("No order with id:" + id + ", has been found.");
		}
	}
	
	public Long checkIfProductAlreadyExistsInOrder(Order order, Long productId){
		Optional<Long> optionalOrderDetailId = order.getOrderDetails()
				.stream()
				.filter( orderDetail -> Objects.equals(orderDetail.getProduct().getId(), productId))
				.map(OrderDetail::getId)
				.findFirst();
		return optionalOrderDetailId.orElse(-1L);
	}
	
	public void addProductToOrder(Order order, Long productId, Integer quantity){
		Long orderDetailId = checkIfProductAlreadyExistsInOrder(order,productId);
		if ( orderDetailId == -1){
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setProduct(productService.getProductById(productId));
			orderDetail.setQuantity(quantity);
			orderDetail.setOrder(order);
			
			orderDetailService.createOrderDetail(orderDetail);
		} else {
			if ( quantity == 0){
				orderDetailService.deleteOrderDetail(orderDetailId);
			} else {
				orderDetailService.updateOrderDetailsQuantity(orderDetailId, quantity);
			}
		}
	}
	
	public void addOrderDetailToOrder(OrderDetail orderDetail, Long id){
		Order order = getOrderById(id);
		order.getOrderDetails().add(orderDetail);
		orderRepository.save(order);
	}
	
	public void deleteOrderDetailFromOrder(long orderId, long productId){
		Long orderDetailId = checkIfProductAlreadyExistsInOrder(getOrderById(orderId),productId);
		orderDetailService.deleteOrderDetail(orderDetailId);
	}
	
	
	public boolean checkoutOrderForShipping(Order order){
		if (!checkProductsForAvailability(order)){
			return false;
		}
		checkIfClientExists();
		updateOrderStatusToShipped(order);
		return true;
	}
	
	public boolean checkProductsForAvailability(Order order){
		for ( OrderDetail orderDetail: order.getOrderDetails()) {
			Product product = orderDetail.getProduct();
			if (product.getStockQuantity() < orderDetail.getQuantity()){
				return false;
			} else {
				product.setStockQuantity(product.getStockQuantity() - orderDetail.getQuantity());
			}
		}
		return true;
	}
	
	/*
	public void cancelOrderAndResetQuantity(Order order){
		if( order.getOrderStatus() == OrderStatus.NEW){
			throw new IllegalStateException("Cannot Reset quantity on new order");
		}
		for ( OrderDetail orderDetail: order.getOrderDetails()){
			Product product = orderDetail.getProduct();
			product.setStockQuantity(product.getStockQuantity() + orderDetail.getQuantity());
		}
		order.setOrderStatus(OrderStatus.NEW);
	}
	 */
	
	public void updateOrderStatusToShipped(Order oder){
		oder.setOrderStatus(OrderStatus.SHIPPED);
	}
	
	public boolean checkIfClientExists(){
		return true;
	}
	
	public Order saveNewOrder(PostOrderRequestBody requestBody){
		if ( orderRepository.existsByUserAndOrderStatus(requestBody.getUser(), OrderStatus.NEW)){
			throw new IllegalStateException("Cannot have more than one order with NEW status for user");
		} else {
			Order order = new Order();
			order.setUser(requestBody.getUser());
			if ( requestBody.getOrderDate() != null) {
				order.setOrderDate(requestBody.getOrderDate());
			} else {
				order.setOrderDate(Date.from(Instant.now()));
			}
			if (requestBody.getOrderStatus() != null) {
				order.setOrderStatus(requestBody.getOrderStatus());
			} else {
				order.setOrderStatus(OrderStatus.NEW);
			}
			order = orderRepository.save(order);
			if ( requestBody.getItems() != null){
				order.setOrderDetails(new ArrayList<>());
				for ( AddToCartRequestDTO item: requestBody.getItems()){
					addProductToOrder(order, item.getId(), item.getQuantity());
				}
			}
			return order;
		}
	}
	
	public void saveOrder(Order order){
		orderRepository.save(order);
	}
	
	public void updateOrder(Order order){
		if(orderRepository.existsById(order.getId())){
			orderRepository.save(order);
		} else {
			throw new EntityNotFoundException("No product with id: " + order.getId() + ", has been found.");
		}
	}
	
	public void deleteOrder(Long id) {
		if(orderRepository.existsById(id)){
			orderRepository.deleteById(id);
		} else {
			throw new EntityNotFoundException("No product with id: " + id + ", has been found.");
		}
	}
	
	public Order getOrderByUsername(String username){
		List<Order> orders =  orderRepository.findAllByUserAndOrderStatus(username, OrderStatus.NEW);
		if( orders.size() > 1){
			throw new IllegalStateException("More than one new order for user: " + username);
		}
		if( orders.size() == 0){
			return null;
		}
		return orders.get(0);
	}
	
	public Order saveOrderByUsername(String username, AddToCartDTO dto){
		Order order = getOrderByUsername(username);
		if ( order  == null){
			PostOrderRequestBody body = new PostOrderRequestBody();
			body.setUser(username);
			body.setOrderStatus(OrderStatus.NEW);
			body.setOrderDate(Date.from(Instant.now()));
			body.setItems(dto.getItems());
			return saveNewOrder(body);
		} else {
			for ( AddToCartRequestDTO x: dto.getItems()){
				addProductToOrder(order, x.getId(), x.getQuantity());
			}
			return orderRepository.save(order);
		}
	}
}

