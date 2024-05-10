document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.btn');
    const checkoutButton = document.querySelector('.cart-items-container .btn');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const navbar = document.querySelector('.navbar');
    const searchForm = document.querySelector('.search-form');
    const notification = document.querySelector('.notification');


    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        cartItemsContainer.classList.remove('active');
    };

    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        cartItemsContainer.classList.remove('active');
    };

    document.querySelector('#cart-btn').onclick = () => {
        cartItemsContainer.classList.toggle('active');
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
    };

    window.onscroll = () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartItemsContainer.classList.remove('active');
    };

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const box = button.closest('.box');
            if (!box) return;

            const itemName = box.querySelector('h3');
            const itemPrice = box.querySelector('.price');
            if (!itemName || !itemPrice) return;

            const cartItem = createCartItem(box);
            cartItemsContainer.appendChild(cartItem);

            updateTotal();

            showNotification();

            cartItemsContainer.classList.add('active');
        });
    });

    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('fa-times')) {
            const cartItem = event.target.closest('.cart-item');
            if (cartItem) {
                cartItem.remove();
                updateTotal();
            }
        }
    });

    checkoutButton.addEventListener('click', function (event) {
        event.preventDefault();

        const totalPrice = getTotal().toFixed(1);
        showModal(`Total Price: ₱${totalPrice}`);

        // Perform additional checkout actions if needed
    });

    function createCartItem(box) {
        const itemName = box.querySelector('h3').innerText;
        const itemPrice = box.querySelector('.price').innerText;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="fas fa-times"></span>
            <img src="${box.querySelector('img').src}" alt="">
            <div class="content">
                <h3>${itemName}</h3>
                <div class="price">${itemPrice}</div>
            </div>
        `;

        return cartItem;
    }

    function updateTotal() {
        const totalPriceElement = document.querySelector('.cart-items-container .total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `$${getTotal().toFixed(2)}`;
        }
    }


    function getTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalPrice = 0;

        cartItems.forEach(function (item) {
            const priceElement = item.querySelector('.price');
            if (priceElement) {
                const priceString = priceElement.innerText;
                const price = parseFloat(priceString.replace('$', '').replace('/-', ''));
                totalPrice += price;
            }
        });

        return totalPrice;
    }

    function showNotification() {
        notification.style.opacity = '1';
        setTimeout(() => {
            notification.style.opacity = '0';
        }, 2000);
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.btn');

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const box = button.closest('.box');
            if (!box) return;

            const itemName = box.querySelector('h3').innerText;
            const itemPrice = box.querySelector('.price').innerText;

            // Create an object to hold item details
            const item = {
                name: itemName,
                price: itemPrice
            };

            // Add the item to local storage or wherever you store cart items
            // For simplicity, let's assume local storage here
            addToCart(item);

            // Display notification
            showNotification();
        });
    });

    function addToCart(item) {
        // Retrieve existing cart items from local storage or initialize an empty array
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the new item to the cart
        cartItems.push(item);

        // Save the updated cart items back to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function showNotification() {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.opacity = '1';
            setTimeout(() => {
                notification.style.opacity = '0';
            }, 2000);
        }
    }
});

