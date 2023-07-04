document.addEventListener('DOMContentLoaded', function () {
    const cart = [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.getElementById('cart');
    const totalAmount = document.querySelector('.total');
    const clearCartButton = document.querySelector('.clear-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));

            const itemInCart = cart.find(item => item.product === product);

            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                cart.push({ product, price, quantity: 1 });
            }

            updateCart();
        });
    });

    clearCartButton.addEventListener('click', function () {
        cart.length = 0;
        updateCart();
    });

    function updateCart() {
        cartContainer.innerHTML = '';

        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
          <p><strong>${item.product}</strong> - ${item.price} x ${item.quantity}</p>
          <p>Total: ${itemTotal.toFixed(2)}</p>
        `;

            cartContainer.appendChild(cartItemElement);
        });

        totalAmount.textContent = `Total: ${total.toFixed(2)}`;
    }
});
