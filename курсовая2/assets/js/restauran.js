document.addEventListener('DOMContentLoaded', function() {
  // Получаем все кнопки категорий
  const categoryButtons = document.querySelectorAll('.category-btn');
  // Получаем все табы с контентом
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Обработчик клика для кнопок категорий
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Удаляем активный класс у всех кнопок
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс текущей кнопке
      this.classList.add('active');
      
      // Получаем data-атрибут с id таба
      const tabId = this.getAttribute('data-tab');
      
      // Скрываем все табы
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      
      // Показываем выбранный таб
      document.getElementById(tabId).classList.add('active');
      
      // Если выбрана категория "Все", показываем все карточки
      if (tabId === 'all') {
        document.querySelectorAll('.partner-card').forEach(card => {
          card.style.display = 'block';
        });
      } else {
        // Иначе показываем только карточки с соответствующей категорией
        document.querySelectorAll('.partner-card').forEach(card => {
          if (card.getAttribute('data-category') === tabId) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });
  
  // Фильтрация карточек внутри вкладки "Все"
  const filterButtons = document.querySelectorAll('.category-btn[data-tab="all"] ~ .category-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-tab');
      
      // Показываем только карточки выбранной категории
      document.querySelectorAll('#all .partner-card').forEach(card => {
        if (card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Прокручиваем к соответствующему разделу
      const section = document.querySelector(`#all .section-title:contains("${getCategoryName(category)}")`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Функция для получения имени категории по ее id
  function getCategoryName(categoryId) {
    const names = {
      'restaurants': 'Рестораны',
      'shops': 'Продуктовые магазины',
      'pizza': 'Пиццерии',
      'asian': 'Азиатская кухня',
      'fastfood': 'Фастфуд',
      'healthy': 'Здоровое питание'
    };
    return names[categoryId] || '';
  }
});