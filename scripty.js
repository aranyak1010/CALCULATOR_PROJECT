const addToCartButtons = document.querySelectorAll(".product-card button:nth-child(2)");

// Function to add product information to the cart
function addToCart(event) {
  // Prevent default form submission behavior (if button is inside a form)
  event.preventDefault();

  // Get the product card element that the clicked button belongs to
  const productCard = event.target.parentElement.parentElement;

  // Extract product information from the product card
  const productImage = productCard.querySelector("img").src;
  const productName = productCard.querySelector("h3").textContent;
  const productPrice = productCard.querySelector(".price").textContent;

  // Create a cart item object (you can customize this object structure)
  const cartItem = {
    image: productImage,
    name: productName,
    price: productPrice,
    quantity: 1, // Initial quantity set to 1
  };
  let currentCart = [];
  if (localStorage.getItem("rikmartCart")) {
    currentCart = JSON.parse(localStorage.getItem("rikmartCart"));
  }
  currentCart.push(cartItem);
  localStorage.setItem("rikmartCart", JSON.stringify(currentCart));
  alert(`${productName} has been added to your cart!`);
}

// Add event listeners to all "Add to Cart" buttons
addToCartButtons.forEach((button) => button.addEventListener("click", addToCart));