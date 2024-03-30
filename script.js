document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const item = event.target.closest('.menu-item');
            const itemName = item.querySelector('h3').innerText;
            const itemPrice = item.querySelector('.price').innerText;

            addItemToCart(itemName, itemPrice);
            animateAddToCart(item); 
        });
    });

    function addItemToCart(name, price) {
        const item = { name: name, price: price };
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Item added to cart!');
        window.location.href = 'cart.html';
    }

    const cartContainer = document.querySelector('.cart-items');

    if (cartContainer) {
        cartContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('btn-remove')) {
                const itemToRemove = event.target.closest('.cart-item');
                itemToRemove.remove();
                updateTotalPrice();

                // Get remaining cart items after removal
                const remainingItems = Array.from(cartContainer.children).map(item => {
                    return {
                        name: item.querySelector('h3').innerText,
                        price: item.querySelector('.item-details p').innerText
                    };
                });

                // Update localStorage with remaining items
                localStorage.setItem('cartItems', JSON.stringify(remainingItems));
            }
        });
    } else {
        console.error("Cart container not found.");
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems && cartItems.length > 0) {
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="chef.jpg" alt="Pizza">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-remove">Remove</button>
                </div>
            `;

            cartContainer.appendChild(cartItem);
        });
    }

    function updateTotalPrice() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalPrice = 0;

        cartItems.forEach(item => {
            const priceString = item.querySelector('.item-details p').innerText;
            const price = parseFloat(priceString.replace('Price: Rs.', ''));
            totalPrice += price;
        });

        const totalPriceElement = document.querySelector('.total-price');
        totalPriceElement.innerText = `Rs.${totalPrice.toFixed(2)}`;
    }

    // Initial update of total price when the page loads
    updateTotalPrice();

});
