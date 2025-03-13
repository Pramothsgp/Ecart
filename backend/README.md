## AuthController Endpoints

### `/auth/test`
- **Method:** GET
- **Description:** Returns a test string "Hello World".
- **Response:** 
  - `200 OK`: "Hello World"

### `/auth/login`
- **Method:** GET
- **Parameters:**
  - `username`: String
  - `password`: String
- **Description:** Authenticates a user and returns a JWT token if successful.
- **Response:**
  - `200 OK`: JWT token
  - `401 Unauthorized`: Authentication failed
  - `500 Internal Server Error`: Error message

### `/auth/registerUser`
- **Method:** POST
- **Parameters:**
  - `username`: String
  - `email`: String
  - `password`: String
- **Description:** Registers a new user with the provided username, email, and password.
- **Response:**
  - `200 OK`: Registered user details
  - `401 Unauthorized`: Registration failed

### `/auth/register`
- **Method:** POST
- **Parameters:**
  - `username`: String
  - `email`: String
  - `password`: String
  - `image`: MultipartFile
- **Description:** Registers a new user with the provided username, email, password, and profile image.
- **Response:**
  - `200 OK`: "Registered successfully"
  - `400 Bad Request`: "Failed to register"

### `/auth/change-password`
- **Method:** PUT
- **Parameters:**
  - `username`: String
  - `password`: String
  - `newPassword`: String
- **Description:** Changes the password for the specified user.
- **Response:**
  - `200 OK`: Updated user details
  - `400 Bad Request`: "Failed to change password" or "Invalid password"

### `/auth/register-delivery-agent`
- **Method:** POST
- **Parameters:** 
  - `deliveryAgent`: DeliveryAgent (RequestBody)
- **Description:** Registers a new delivery agent.
- **Response:**
  - `200 OK`: Registered delivery agent details
  - `400 Bad Request`: Error message

### `/auth/get-delivery-agent`
- **Method:** GET
- **Parameters:**
  - `id`: Long
- **Description:** Retrieves the delivery agent details by user ID.
- **Response:**
  - `200 OK`: Delivery agent details
  - `400 Bad Request`: Delivery agent not found

### `/auth/agent-login`
- **Method:** POST
- **Parameters:**
  - `username`: String
  - `password`: String
- **Description:** Authenticates a delivery agent and returns their details if successful.
- **Response:**
  - `200 OK`: Delivery agent details
  - `401 Unauthorized`: Authentication failed

### `/auth/logout`
- **Method:** POST
- **Parameters:**
  - `username`: String
- **Description:** Logs out the specified user.
- **Response:**
  - `200 OK`: "Logged out successfully"
  - `500 Internal Server Error`: Error message

## CartController Endpoints

### `/api/cart/add-to-cart/{userId}`
- **Method:** POST
- **Parameters:**
  - `userId`: Long (Path Variable)
  - `productId`: Long (Request Param)
  - `quantity`: Integer (Request Param)
- **Description:** Adds a product to the user's cart.
- **Response:**
  - `200 OK`: Cart details
  - `404 Not Found`: Product or user not found

### `/api/cart/update-cart`
- **Method:** PUT
- **Parameters:**
  - `cart`: Cart (Request Body)
- **Description:** Updates the quantity of a product in the cart.
- **Response:**
  - `200 OK`: Updated cart details
  - `204 No Content`: Quantity is less than or equal to zero

### `/api/cart/get-cart/{userId}`
- **Method:** GET
- **Parameters:**
  - `userId`: Long (Path Variable)
- **Description:** Retrieves the cart details for the specified user.
- **Response:**
  - `200 OK`: List of cart items

### `/api/cart/delete-cart/{cartId}`
- **Method:** DELETE
- **Parameters:**
  - `cartId`: Long (Path Variable)
- **Description:** Deletes the specified cart item.
- **Response:**
  - `200 OK`: "Cart deleted successfully"

## MailController Endpoints

### `/api/mail/send-mail`
- **Method:** POST
- **Parameters:**
  - `mail`: Mail (Request Body)
- **Description:** Sends an email with the provided details.
- **Response:**
  - `200 OK`: Success message or error message

### `/api/mail/send-aligned-mail`
- **Method:** POST
- **Parameters:**
  - `mail`: Mail (Request Body)
- **Description:** Sends an aligned email with the provided details.
- **Response:**
  - `200 OK`: Success message or error message

## StoreController Endpoints

### `/api/stores/get-store/{id}`
- **Method:** GET
- **Parameters:**
  - `id`: Integer (Path Variable)
- **Description:** Retrieves the store and its products by store ID.
- **Response:**
  - `200 OK`: Store and product details
  - `404 Not Found`: Store not found

### `/api/stores/get-store-details/{id}`
- **Method:** GET
- **Parameters:**
  - `id`: Integer (Path Variable)
- **Description:** Retrieves the store details by store ID.
- **Response:**
  - `200 OK`: Store details
  - `404 Not Found`: Store not found

### `/api/stores/get-all-stores`
- **Method:** GET
- **Description:** Retrieves all stores.
- **Response:**
  - `200 OK`: List of all stores

### `/api/stores/create-store`
- **Method:** POST
- **Parameters:**
  - `store`: StoreAndProduct (Request Body)
- **Description:** Creates a new store with the provided details.
- **Response:**
  - `200 OK`: Created store details
  - `500 Internal Server Error`: Error message

### `/api/stores/update-store`
- **Method:** PUT
- **Parameters:**
  - `store`: StoreAndProduct (Request Body)
- **Description:** Updates the store with the provided details.
- **Response:**
  - `200 OK`: Updated store details
  - `500 Internal Server Error`: Error message

### `/api/stores/update-address/{id}`
- **Method:** PUT
- **Parameters:**
  - `id`: Integer (Path Variable)
  - `address`: Address (Request Body)
- **Description:** Updates the address of the specified store.
- **Response:**
  - `200 OK`: Updated address details
  - `500 Internal Server Error`: Error message

## ProductController Endpoints

### `/api/products/add-product`
- **Method:** POST
- **Parameters:**
  - `productName`: String (Request Param)
  - `productPrice`: String (Request Param)
  - `category`: String (Request Param)
  - `description`: String (Request Param)
  - `image`: MultipartFile (Request Param)
  - `stock`: Integer (Request Param)
  - `ownerId`: Integer (Request Param)
- **Description:** Adds a new product with the provided details.
- **Response:**
  - `200 OK`: "Product Added Successfully"
  - `401 Unauthorized`: Error message

### `/api/products/get-products`
- **Method:** GET
- **Description:** Retrieves all products.
- **Response:**
  - `200 OK`: List of all products
  - `401 Unauthorized`: Error message

### `/api/products/get-product/{id}`
- **Method:** GET
- **Parameters:**
  - `id`: Long (Path Variable)
- **Description:** Retrieves the product details by product ID.
- **Response:**
  - `200 OK`: Product details
  - `401 Unauthorized`: Error message

### `/api/products/add-comment`
- **Method:** POST
- **Parameters:**
  - `coments`: Comments (Request Body)
- **Description:** Adds a comment to the specified product.
- **Response:**
  - `200 OK`: "Comment Added Successfully"
  - `401 Unauthorized`: Error message

## OrderController Endpoints

### `/api/orders/update-location`
- **Method:** POST
- **Parameters:**
  - `location`: DeliveryAgentLocation (Request Body)
- **Description:** Updates the location of the delivery agent.
- **Response:**
  - `200 OK`: "Location updated"

### `/api/orders/place-order`
- **Method:** POST
- **Parameters:**
  - `order`: Orders (Request Body)
- **Description:** Places a new order with the provided details.
- **Response:**
  - `200 OK`: "Order placed successfully"
  - `400 Bad Request`: Error message

### `/api/orders/get-user-orders`
- **Method:** GET
- **Parameters:**
  - `userId`: Long (Request Param)
- **Description:** Retrieves the orders for the specified user.
- **Response:**
  - `200 OK`: List of user orders

### `/api/orders/get-orders`
- **Method:** GET
- **Parameters:**
  - `userId`: Long (Request Param)
- **Description:** Retrieves the user with their orders.
- **Response:**
  - `200 OK`: User with orders

### `/api/orders/cancel-order`
- **Method:** DELETE
- **Parameters:**
  - `orderId`: Long (Request Param)
- **Description:** Cancels the specified order.
- **Response:**
  - `200 OK`: "Order cancelled successfully"
  - `400 Bad Request`: Error message

### `/api/orders/get-order-details`
- **Method:** GET
- **Parameters:**
  - `orderId`: Long (Request Param)
- **Description:** Retrieves the order details by order ID.
- **Response:**
  - `200 OK`: Order details
  - `400 Bad Request`: Order not found

### `/api/orders/update-order`
- **Method:** PUT
- **Parameters:**
  - `orderIds`: List<Long> (Request Param)
  - `status`: String (Request Param)
- **Description:** Updates the status of the specified orders.
- **Response:**
  - `200 OK`: Updated order details
  - `400 Bad Request`: Error message

### `/api/orders/update-order-for-delivery`
- **Method:** PUT
- **Parameters:**
  - `orderId`: List<Long> (Request Param)
  - `location`: DeliveryAgentLocation (Request Body)
- **Description:** Updates the order for delivery with the provided location.
- **Response:**
  - `200 OK`: Updated order details
  - `400 Bad Request`: Error message

### `/api/orders/get-agent-orders`
- **Method:** GET
- **Parameters:**
  - `agentId`: Long (Request Param)
- **Description:** Retrieves the orders for the specified delivery agent.
- **Response:**
  - `200 OK`: List of agent orders
  - `400 Bad Request`: Error message

## AuthService Methods

### `login(String username, String password)`
- **Description:** Authenticates a user with the provided username and password.
- **Returns:** Optional<User>
- **Explanation:** Validates the user's credentials and generates a JWT token if successful.

### `register(String username, String email, String password)`
- **Description:** Registers a new user with the provided username, email, and password.
- **Returns:** Optional<User>
- **Explanation:** Creates a new user account with the given details.

### `register(String username, String email, String password, MultipartFile image)`
- **Description:** Registers a new user with the provided username, email, password, and profile image.
- **Returns:** void
- **Explanation:** Creates a new user account with the given details and uploads the profile image.

### `changePassword(String username, String password, String newPassword)`
- **Description:** Changes the password for the specified user.
- **Returns:** User
- **Explanation:** Updates the user's password after validating the current password.

### `registerDeliveryAgent(DeliveryAgent deliveryAgent)`
- **Description:** Registers a new delivery agent.
- **Returns:** DeliveryAgent
- **Explanation:** Creates a new delivery agent account with the provided details.

### `getDeliveryAgentByUserId(Long id)`
- **Description:** Retrieves the delivery agent details by user ID.
- **Returns:** Optional<DeliveryAgent>
- **Explanation:** Fetches the delivery agent information associated with the given user ID.

### `agentLogin(String username, String password)`
- **Description:** Authenticates a delivery agent with the provided username and password.
- **Returns:** Optional<DeliveryAgent>
- **Explanation:** Validates the delivery agent's credentials and returns their details if successful.

### `logout(String username)`
- **Description:** Logs out the specified user.
- **Returns:** void
- **Explanation:** Invalidates the user's session or token.

## CartService Methods

### `addToCart(Long userId, Long productId, Integer quantity)`
- **Description:** Adds a product to the user's cart.
- **Returns:** Cart
- **Explanation:** Adds the specified product to the user's cart with the given quantity.

### `updateCart(Cart cart)`
- **Description:** Updates the quantity of a product in the cart.
- **Returns:** Cart
- **Explanation:** Modifies the quantity of a product in the user's cart.

### `getCartByUserId(Long userId)`
- **Description:** Retrieves the cart details for the specified user.
- **Returns:** List<Cart>
- **Explanation:** Fetches all cart items associated with the given user ID.

### `deleteCartById(Long cartId)`
- **Description:** Deletes the specified cart item.
- **Returns:** void
- **Explanation:** Removes the specified item from the user's cart.

## MailService Methods

### `sendMail(Mail mail)`
- **Description:** Sends an email with the provided details.
- **Returns:** String
- **Explanation:** Sends a standard email using the provided mail details.

### `sendAlignedMail(Mail mail)`
- **Description:** Sends an aligned email with the provided details.
- **Returns:** String
- **Explanation:** Sends an email with specific formatting or alignment.

## StoreService Methods

### `getStore(Integer id)`
- **Description:** Retrieves the store and its products by store ID.
- **Returns:** Optional<StoreAndProduct>
- **Explanation:** Fetches the store details along with its products for the given store ID.

### `getStoreDetails(Integer id)`
- **Description:** Retrieves the store details by store ID.
- **Returns:** Optional<Store>
- **Explanation:** Fetches only the store information for the given store ID.

### `getAllStores()`
- **Description:** Retrieves all stores.
- **Returns:** Optional<Iterable<Store>>
- **Explanation:** Fetches a list of all available stores.

### `createStore(StoreAndProduct store)`
- **Description:** Creates a new store with the provided details.
- **Returns:** StoreAndProduct
- **Explanation:** Adds a new store along with its initial products.

### `updateStore(StoreAndProduct store)`
- **Description:** Updates the store with the provided details.
- **Returns:** StoreAndProduct
- **Explanation:** Modifies the store information and its products.

### `updateAddress(Address address, Integer id)`
- **Description:** Updates the address of the specified store.
- **Returns:** Address
- **Explanation:** Changes the address details for the given store ID.

## ProductService Methods

### `addProduct(Product product, Integer ownerId)`
- **Description:** Adds a new product with the provided details.
- **Returns:** Optional<Product>
- **Explanation:** Adds a new product to the store owned by the specified owner.

### `getProducts()`
- **Description:** Retrieves all products.
- **Returns:** Optional<List<Product>>
- **Explanation:** Fetches a list of all available products.

### `getProductById(Long id)`
- **Description:** Retrieves the product details by product ID.
- **Returns:** Optional<ProductComments>
- **Explanation:** Fetches the product information along with its comments for the given product ID.

### `addComment(Comments comments)`
- **Description:** Adds a comment to the specified product.
- **Returns:** Optional<Comments>
- **Explanation:** Adds a new comment to the product.

## OrderService Methods

### `placeOrder(Orders order)`
- **Description:** Places a new order with the provided details.
- **Returns:** void
- **Explanation:** Creates a new order with the specified details.

### `getOrders(Long userId)`
- **Description:** Retrieves the orders for the specified user.
- **Returns:** List<Orders>
- **Explanation:** Fetches all orders associated with the given user ID.

### `getUserWithOrders(Long userId)`
- **Description:** Retrieves the user with their orders.
- **Returns:** UserWithOrders
- **Explanation:** Fetches the user details along with their orders.

### `cancelOrder(Long orderId)`
- **Description:** Cancels the specified order.
- **Returns:** void
- **Explanation:** Cancels the order with the given order ID.

### `getOrderDetails(Long orderId)`
- **Description:** Retrieves the order details by order ID.
- **Returns:** Optional<Orders>
- **Explanation:** Fetches the details of the specified order.

### `updateOrder(List<Long> orderIds, String status)`
- **Description:** Updates the status of the specified orders.
- **Returns:** List<Orders>
- **Explanation:** Changes the status of the given orders.

### `updateOrder(List<Long> orderId, DeliveryAgentLocation location)`
- **Description:** Updates the order for delivery with the provided location.
- **Returns:** List<Orders>
- **Explanation:** Modifies the order details for delivery with the specified location.

## DeliveryAgentService Methods

### `getDeliveryAgentDetails(Long agentId)`
- **Description:** Retrieves the orders for the specified delivery agent.
- **Returns:** List<Orders>
- **Explanation:** Fetches all orders assigned to the given delivery agent.

## TrackerService Methods

### `sendLocationUpdate(DeliveryAgentLocation location)`
- **Description:** Updates the location of the delivery agent.
- **Returns:** void
- **Explanation:** Sends the current location of the delivery agent to the tracking system.
