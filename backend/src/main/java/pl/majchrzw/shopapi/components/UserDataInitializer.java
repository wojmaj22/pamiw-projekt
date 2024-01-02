package pl.majchrzw.shopapi.components;

import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.majchrzw.shopapi.dao.*;
import pl.majchrzw.shopapi.model.*;

import java.time.Instant;
import java.util.*;

@Component
@RequiredArgsConstructor
public class UserDataInitializer {
	private final OrderDetailRepository orderDetailRepository;
	private final OrderRepository orderRepository;
	private final ProductRepository productRepository;
	
	private Faker faker = new Faker(new Random(100L));
	
	public void initializeData(){
		/*
		int usersAmount = 5;
		List<Role> roles = new ArrayList<>();
		List<User> users = new ArrayList<>();
		for ( int i = 0; i < usersAmount; i++){
			Role role = new Role(Roles.USER);
			User user = new User(faker.name().username(), encoder.encode(faker.ancient().god()), true, Set.of(role));
			role.setUser(user);
			roles.add(role);
			users.add(user);
		}
		Role userRole = new Role(Roles.USER);
		//Role secondUserRole = new Role(Roles.USER);
		Role adminRole = new Role(Roles.ADMIN);
		//List<Role> roles = List.of(userRole, secondUserRole, adminRole);
		
		//User firstUser = new User("testuser", encoder.encode( "password"), true, Set.of(userRole));
		User adminUser = new User("admin", encoder.encode( "password"), true, Set.of(userRole, adminRole));
		userRole.setUser(adminUser);
		//secondUserRole.setUser(secondUser);
		adminRole.setUser(adminUser);
		userRepository.saveAll(users);
		roleRepository.saveAll(roles);
		userRepository.save(adminUser);
		roleRepository.save(userRole);
		roleRepository.save(adminRole);
		*/
		int productsAmount = 30;
		int ordersAmount = 10;
		int orderDetailsAmount = 20;
		Random random = new Random();
		ArrayList<Product> products = new ArrayList<>();
		ArrayList<OrderDetail> orderDetails = new ArrayList<>();
		ArrayList<Order> orders = new ArrayList<>();
		for( int i = 0; i < productsAmount; i++) {
			Product product = Product.builder()
					.name(faker.commerce().productName())
					.price(Math.round(random.nextDouble()*10000.0)/100.0)
					.stockQuantity(random.nextInt(20,100))
					.build();
			products.add(product);
		}
		for( int i = 0; i < ordersAmount; i++){
			Order order = Order.builder()
					.user(faker.name().username())
					.orderDate(Date.from(Instant.now()))
					.orderStatus(OrderStatus.NEW)
					.build();
			orders.add(order);
		}
		for( int i = 0; i < orderDetailsAmount; i++){
			OrderDetail orderDetail = OrderDetail.builder()
					.product(products.get(Math.abs(random.nextInt()%productsAmount)))
					.order(orders.get(Math.abs(random.nextInt()%ordersAmount)))
					.build();
			orderDetail.setQuantity(Math.abs(random.nextInt()%20));
			orderDetails.add(orderDetail);
		}
		orderRepository.saveAll(orders);
		productRepository.saveAll(products);
		orderDetailRepository.saveAll(orderDetails);
	}
}
