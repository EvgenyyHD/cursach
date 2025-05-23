  // Фильтрация по категориям
  document.querySelectorAll('.category-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelector('.category-tag.active').classList.remove('active');
        tag.classList.add('active');
        // Здесь можно добавить фильтрацию продуктов
    });
});

// Добавление в корзину
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        alert(`${productName} добавлен в корзину!`);
        
        // Анимация добавления
        this.textContent = '✓';
        this.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            this.textContent = '+';
            this.style.backgroundColor = '#f85f73';
        }, 1000);
    });
});