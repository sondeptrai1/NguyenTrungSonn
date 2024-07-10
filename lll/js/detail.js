// Đoạn mã JavaScript để cập nhật số lượng sản phẩm trong giỏ hàng và hiển thị giỏ hàng
document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const notification = document.getElementById('notification');
    const cartItemCount = document.getElementById('cartItemCount');
    const cartIcon = document.getElementById('cartIcon'); // Thêm lấy biểu tượng giỏ hàng

    addToCartBtn.addEventListener('click', addToCart);
    buyNowBtn.addEventListener('click', buyNow);

    updateCartItemCount(); // Cập nhật số lượng sản phẩm trong giỏ hàng khi trang được tải

    function addToCart() {
        const item = {
            id: 1,
            name: "Acer Swift 3 SF314-512-52MZ",
            price: 19990990,
            quantity: 1
        };

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push(item);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartItemCount();
        showNotification('Đã thêm vào giỏ hàng');
    }

    function buyNow() {
        showNotification('Mua Hàng Thành Công.');
    }

    function updateCartItemCount() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItemCount) {
            cartItemCount.textContent = cartItems.length;
        }
    }

    function displayCartItems(cartItems) {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <p>${item.name} - ${item.price} VND</p>
                <button class="remove-item" onclick="removeCartItem(${item.id})">Xóa</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    function removeCartItem(itemId) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(cartItems);
        updateCartItemCount();
    }

    function showNotification(message) {
        notification.innerText = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Thêm hàm toggleCart để hiển thị/ẩn giỏ hàng khi click vào biểu tượng giỏ hàng
    function toggleCart() {
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        cartItemsContainer.classList.toggle('show'); // Thêm hoặc bỏ class 'show' để hiển thị/ẩn giỏ hàng
        if (cartItemsContainer.classList.contains('show')) {
            // Nếu hiện thị giỏ hàng, thì hiển thị danh sách sản phẩm
            displayCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);
        }
    }

    // Bắt sự kiện click vào biểu tượng giỏ hàng
    cartIcon.addEventListener('click', toggleCart);
});
// Thêm hàm displayCartPreview để hiển thị sản phẩm đã thêm vào giỏ hàng
function displayCartPreview(cartItems) {
    const cartItemsPreview = document.getElementById('cartItemsPreview');
    cartItemsPreview.innerHTML = '';

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item-preview');
        cartItemElement.innerHTML = `
            <img src="../image/product/sp1.png" alt="anh san pham">
            <p>${item.name} - ${item.price} VND</p>
        `;
        cartItemsPreview.appendChild(cartItemElement);
    });
}

// Thêm sự kiện click cho biểu tượng giỏ hàng
cartIcon.addEventListener('click', toggleCartPreview);

// Hàm toggleCartPreview để hiển thị/ẩn giỏ hàng preview
function toggleCartPreview() {
    const cartPreview = document.getElementById('cartPreview');
    cartPreview.classList.toggle('show'); // Thêm hoặc bỏ class 'show' để hiển thị/ẩn giỏ hàng

    if (cartPreview.classList.contains('show')) {
        // Nếu hiện thị giỏ hàng, thì hiển thị danh sách sản phẩm
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        displayCartPreview(cartItems);
    }
}
