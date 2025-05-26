 // Скрипт для слайдера
 document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.slider-track');
  const items = document.querySelectorAll('.slider-item');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth;
  const visibleItems = 3;
  
  // Создаем точки для навигации
  items.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    
    // Обновляем активную точку
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = items.length - visibleItems;
    }
    updateSlider();
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - visibleItems) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  });
  
  // Таймер для акции
  function updateTimer() {
    const daysElement = document.querySelector('.timer__days');
    const hoursElement = document.querySelector('.timer__hours');
    const minutesElement = document.querySelector('.timer__minutes');
    const secondsElement = document.querySelector('.timer__seconds');
    
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
  }
  
  setInterval(updateTimer, 1000);
  updateTimer();
});