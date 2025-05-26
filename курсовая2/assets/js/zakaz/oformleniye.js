document.addEventListener('DOMContentLoaded', function() {
  // Получаем данные корзины из localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const orderItemsContainer = document.querySelector('.order-items');
  const orderTotalElement = document.querySelector('.grand-total span:last-child');
  const orderSubtotalElement = document.querySelector('.total-row:first-child span:last-child');
  
  // Функция для обновления списка товаров в заказе
  function updateOrderSummary() {
      // Очищаем контейнер с товарами
      orderItemsContainer.innerHTML = '';
      
      // Если корзина пуста, показываем сообщение
      if (cart.length === 0) {
          orderItemsContainer.innerHTML = '<div class="empty-order">Ваша корзина пуста</div>';
          orderSubtotalElement.textContent = '0 ₽';
          orderTotalElement.textContent = '0 ₽';
          return;
      }
      
      // Считаем общую сумму
      let subtotal = 0;
      
      // Добавляем каждый товар из корзины
      cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          subtotal += itemTotal;
          
          const itemElement = document.createElement('div');
          itemElement.className = 'order-item';
          itemElement.innerHTML = `
              <div class="item-name">${item.name}</div>
              <div class="item-quantity">${item.quantity} × ${item.price.toFixed(2)} ₽</div>
              <div class="item-total">${itemTotal.toFixed(2)} ₽</div>
          `;
          
          orderItemsContainer.appendChild(itemElement);
      });
      
      // Обновляем суммы
      orderSubtotalElement.textContent = `${subtotal.toFixed(2)} ₽`;
      orderTotalElement.textContent = `${subtotal.toFixed(2)} ₽`;
  }
  
  // Обработчик отправки формы
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
      orderForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Проверяем, что в корзине есть товары
          if (cart.length === 0) {
              alert('Ваша корзина пуста! Пожалуйста, добавьте товары перед оформлением заказа.');
              return;
          }
          
          // Собираем данные формы
          const formData = new FormData(orderForm);
          const orderData = {
              customer: {
                  name: formData.get('name'),
                  phone: formData.get('phone'),
                  address: formData.get('address')
              },
              delivery: {
                  time: formData.get('delivery-time'),
                  comment: formData.get('comment')
              },
              payment: formData.get('payment'),
              items: cart,
              total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
              date: new Date().toISOString()
          };
          
          // Здесь можно отправить данные на сервер
          console.log('Order data:', orderData);
          
          // Очищаем корзину после оформления
          localStorage.removeItem('cart');
          
          // Показываем сообщение об успешном оформлении
          alert('Ваш заказ успешно оформлен! Номер вашего заказа: #' + Math.floor(Math.random() * 10000));
          
          // Перенаправляем на главную страницу
          window.location.href = '/';
      });
  }
  
  // Инициализируем страницу
  updateOrderSummary();
  
  // Обработчик для кнопки подтверждения заказа
  const placeOrderBtn = document.querySelector('.place-order-btn');
  if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', function() {
          // Проверяем обязательные поля
          const nameInput = document.getElementById('name');
          const phoneInput = document.getElementById('phone');
          const addressInput = document.getElementById('address');
          
          if (!nameInput.value.trim()) {
              alert('Пожалуйста, укажите ваше имя');
              nameInput.focus();
              return;
          }
          
          if (!phoneInput.value.trim()) {
              alert('Пожалуйста, укажите ваш телефон');
              phoneInput.focus();
              return;
          }
          
          if (!addressInput.value.trim()) {
              alert('Пожалуйста, укажите адрес доставки');
              addressInput.focus();
              return;
          }
          
          // Если все проверки пройдены, отправляем форму
          orderForm.dispatchEvent(new Event('submit'));
      });
  }
});