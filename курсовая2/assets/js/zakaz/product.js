document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const nav = document.querySelector("nav");

  burgerMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Закрытие меню при клике на ссылку
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      burgerMenu.classList.remove("active");
      nav.classList.remove("active");
    });
  });

  // Закрытие меню при изменении размера окна
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      burgerMenu.classList.remove("active");
      nav.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Элементы корзины
  const cartFab = document.querySelector(".cart-fab");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartContainer = document.querySelector(".cart-container");
  const closeCartBtn = document.querySelector(".close-cart");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartBadge = document.querySelector(".cart-badge");
  const totalPriceElement = document.querySelector(".total-price");

  // Массив для хранения товаров в корзине
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Инициализация корзины
  updateCart();

  // Открытие/закрытие корзины
  cartFab.addEventListener("click", toggleCart);
  cartOverlay.addEventListener("click", toggleCart);
  closeCartBtn.addEventListener("click", toggleCart);

  function toggleCart() {
    cartOverlay.classList.toggle("open");
    cartContainer.classList.toggle("open");

    // Блокировка прокрутки body при открытой корзине
    if (cartContainer.classList.contains("open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Добавление товара в корзину
  document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const productId = productCard.dataset.id || `prod-${index + 1}`;
      const productName = productCard.querySelector("h3").textContent;
      const productPrice = parseFloat(
        productCard
          .querySelector(".product-price")
          .textContent.replace(/[^\d.]/g, "")
      );
      const productImage =
        productCard.querySelector(".product-image").style.backgroundImage;
      const productWeight =
        productCard.querySelector(".product-weight").textContent;

      // Проверяем, есть ли товар уже в корзине
      const existingItem = cart.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          weight: productWeight,
          quantity: 1,
        });
      }

      // Сохраняем в localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCart();

      // Анимация добавления в корзину
      const originalText = button.textContent;
      button.textContent = "✓";
      button.style.backgroundColor = "#4CAF50";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "#f85f73";
      }, 1000);
    });
  });

  // Обновление корзины
  function updateCart() {
    // Обновляем бейдж с количеством товаров
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "flex" : "none";

    // Обновляем список товаров
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<div class="empty-cart">Корзина пуста</div>';
    } else {
      cartItemsContainer.innerHTML = "";
      cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";
        cartItemElement.innerHTML = `
                  <div class="cart-item-image" style="width: 60px; height: 60px; background-image: ${
                    item.image
                  }; background-size: cover; background-position: center; border-radius: 8px;"></div>
                  <div class="cart-item-info" style="flex: 1; padding: 0 15px;">
                      <div class="cart-item-name" style="font-weight: bold; margin-bottom: 5px;">${
                        item.name
                      }</div>
                      <div class="cart-item-weight" style="font-size: 12px; color: #666; margin-bottom: 5px;">${
                        item.weight
                      }</div>
                      <div class="cart-item-price" style="color: #f85f73; font-weight: bold;">${(
                        item.price * item.quantity
                      ).toFixed(2)} ₽</div>
                  </div>
                  <div class="cart-item-quantity" style="display: flex; align-items: center; gap: 10px;">
                      <button class="quantity-btn minus" data-id="${
                        item.id
                      }" style="background: #f85f73; color: white; border: none; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">-</button>
                      <span style="min-width: 20px; text-align: center;">${
                        item.quantity
                      }</span>
                      <button class="quantity-btn plus" data-id="${
                        item.id
                      }" style="background: #f85f73; color: white; border: none; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">+</button>
                  </div>
              `;
        cartItemsContainer.appendChild(cartItemElement);
      });

      // Добавляем обработчики для кнопок +/-
      document.querySelectorAll(".quantity-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.dataset.id;
          const isPlus = this.classList.contains("plus");

          const itemIndex = cart.findIndex((item) => item.id === id);
          if (itemIndex !== -1) {
            if (isPlus) {
              cart[itemIndex].quantity += 1;
            } else {
              cart[itemIndex].quantity -= 1;
              if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
              }
            }

            // Сохраняем изменения
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
          }
        });
      });
    }

    // Обновляем общую сумму
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} ₽`;
  }

  // Закрытие корзины при нажатии ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cartContainer.classList.contains("open")) {
      toggleCart();
    }
  });

  // Обработчик для кнопки оформления заказа
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function (e) {
      if (cart.length === 0) {
        e.preventDefault();
        alert("Корзина пуста!");
        return;
      }
      // Просто переходим на страницу оформления, не очищая корзину
      toggleCart();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Получаем все необходимые элементы
  const filterButtons = document.querySelectorAll(".filter-btn");
  const categoryTags = document.querySelectorAll(".category-tag");
  const productCards = document.querySelectorAll(".product-card");
  const searchInput = document.querySelector(".search-box input");

  // Функция для фильтрации продуктов по категориям
  function filterProducts(category) {
    productCards.forEach((card) => {
      const cardCategory = card.querySelector("h3").textContent.toLowerCase();
      const matchesSearch = card
        .querySelector("h3")
        .textContent.toLowerCase()
        .includes(searchInput.value.toLowerCase());

      if (
        (category === "all" || cardCategory.includes(category.toLowerCase())) &&
        matchesSearch
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Обработчики событий для кнопок фильтрации
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Удаляем активный класс у всех кнопок
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Добавляем активный класс текущей кнопке
      this.classList.add("active");
      // Сортируем продукты
      sortProducts(this.textContent.toLowerCase());
    });
  });

  // Обработчики событий для категорий
  categoryTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      // Удаляем активный класс у всех категорий
      categoryTags.forEach((t) => t.classList.remove("active"));
      // Добавляем активный класс текущей категории
      this.classList.add("active");
      // Фильтруем продукты
      const category = this.textContent.toLowerCase();
      filterProducts(category === "все категории" ? "all" : category);
    });
  });

  // Обработчик события для поиска
  searchInput.addEventListener("input", function () {
    const activeFilter = document
      .querySelector(".filter-btn.active")
      .textContent.toLowerCase();
    const activeCategory = document
      .querySelector(".category-tag.active")
      .textContent.toLowerCase();

    // Применяем текущие фильтры и категорию с учетом поискового запроса
    sortProducts(activeFilter);
    filterProducts(activeCategory === "все категории" ? "all" : activeCategory);
  });

  // Обработчики событий для кнопок добавления в корзину
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const productCard = this.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;
      const productPrice =
        productCard.querySelector(".product-price").textContent;

      // Здесь можно добавить логику добавления в корзину
      // Анимация добавления
      this.textContent = "✓";
      this.style.backgroundColor = "#4CAF50";
      setTimeout(() => {
        this.textContent = "+";
        this.style.backgroundColor = "#f85f73";
      }, 1000);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Получаем элементы DOM
  const searchInput = document.querySelector(".search-box input");
  const productCards = document.querySelectorAll(".product-card");

  // Функция для фильтрации продуктов
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();

    productCards.forEach((card) => {
      const productName = card.querySelector("h3").textContent.toLowerCase();

      if (productName.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Слушаем событие input (ввод текста)
  searchInput.addEventListener("input", filterProducts);

  // Дополнительно: можно добавить обработчик для иконки поиска
  const searchIcon = document.querySelector(".search-icon");
  if (searchIcon) {
    searchIcon.addEventListener("click", filterProducts);
  }
});

let searchTimeout;

searchInput.addEventListener("input", function () {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(filterProducts, 300);
});

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();

  productCards.forEach((card) => {
    const productName = card.querySelector("h3").textContent.toLowerCase();
    const productCategory =
      card.querySelector(".category-tag.active")?.textContent.toLowerCase() ||
      "";
    const productDescription =
      card.querySelector(".product-description")?.textContent.toLowerCase() ||
      "";

    if (
      productName.includes(searchTerm) ||
      productCategory.includes(searchTerm) ||
      productDescription.includes(searchTerm)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    filterProducts();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const nav = document.querySelector("nav");
  const cartFab = document.querySelector(".cart-fab");
  const cartContainer = document.querySelector(".cart-container");

  burgerMenu.addEventListener("click", function () {
    // Закрываем корзину, если она открыта
    if (cartContainer.classList.contains("open")) {
      cartContainer.classList.remove("open");
      document.querySelector(".cart-overlay").classList.remove("open");
      document.body.style.overflow = "";
    }

    this.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Остальной код...
});
