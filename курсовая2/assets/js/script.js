document.addEventListener('DOMContentLoaded', () => {
  const deadline = new Date('2025-05-30T23:59:59');
  const elDays = document.querySelector('.timer__days');
  const elHours = document.querySelector('.timer__hours');
  const elMinutes = document.querySelector('.timer__minutes');
  const elSeconds = document.querySelector('.timer__seconds');
  const declensionNum = (num, words) => {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
  };
  const updateTimer = () => {
    const now = new Date();
    const diff = Math.max(0, deadline - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');

    elDays.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
    elHours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    elMinutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    elSeconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);

    if (diff === 0) {
      clearInterval(timerId);
    }
  };
  updateTimer();
  const timerId = setInterval(updateTimer, 1000);
});
    document.addEventListener("DOMContentLoaded", function () {
      const cards = document.querySelectorAll(".card");
      const container = document.querySelector(".cards-container");
      let activeCardIndex = 1;
      let startX = 0;
      let currentX = 0;
      let isDragging = false;

      // Инициализация карточек
      updateCards();

      // Обработчики событий для мыши
      cards.forEach((card) => {
        card.addEventListener("mousedown", startDrag);
        card.addEventListener("touchstart", startDrag, { passive: false });
      });

      document.addEventListener("mousemove", drag);
      document.addEventListener("touchmove", drag, { passive: false });
      document.addEventListener("mouseup", endDrag);
      document.addEventListener("touchend", endDrag);

      function startDrag(e) {
        if (!e.target.closest(".card").classList.contains("center")) return;

        isDragging = true;
        startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
        currentX = startX;
        e.preventDefault();
      }

      function drag(e) {
        if (!isDragging) return;

        const x = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
        const deltaX = x - currentX;
        currentX = x;

        const centerCard = document.querySelector(".card.center");
        const centerRect = centerCard.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Ограничиваем перемещение, чтобы карточка не выходила за пределы контейнера
        const maxDelta = containerRect.width * 0.3;
        let newTranslateX =
          (parseFloat(
            centerCard.style.transform?.replace("translateX(", "") || 0
          ) || 0) + deltaX;

        if (Math.abs(newTranslateX) > maxDelta) {
          newTranslateX = newTranslateX > 0 ? maxDelta : -maxDelta;
        }

        centerCard.style.transform = `translateX(${newTranslateX}px) scale(1)`;
        centerCard.style.opacity =
          1 - (Math.abs(newTranslateX) / maxDelta) * 0.2;

        // Показываем следующую/предыдущую карточку
        if (newTranslateX > 0 && activeCardIndex > 0) {
          const prevCard = document.querySelector(
            `.card[data-index="${activeCardIndex - 1}"]`
          );
          const progress = Math.min(newTranslateX / maxDelta, 1);
          prevCard.style.transform = `translateX(${
            -80 + 80 * progress
          }%) scale(${0.8 + 0.2 * progress})`;
          prevCard.style.opacity = 0.8 + 0.2 * progress;
        } else if (newTranslateX < 0 && activeCardIndex < cards.length - 1) {
          const nextCard = document.querySelector(
            `.card[data-index="${activeCardIndex + 1}"]`
          );
          const progress = Math.min(Math.abs(newTranslateX) / maxDelta, 1);
          nextCard.style.transform = `translateX(${
            80 - 80 * progress
          }%) scale(${0.8 + 0.2 * progress})`;
          nextCard.style.opacity = 0.8 + 0.2 * progress;
        }

        e.preventDefault();
      }

      function endDrag() {
        if (!isDragging) return;
        isDragging = false;

        const centerCard = document.querySelector(".card.center");
        const centerRect = centerCard.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const threshold = containerRect.width * 0.2;
        const currentTranslateX =
          parseFloat(
            centerCard.style.transform?.replace("translateX(", "") || 0
          ) || 0;

        if (currentTranslateX > threshold && activeCardIndex > 0) {
          // Переход к предыдущей карточке
          activeCardIndex--;
        } else if (
          currentTranslateX < -threshold &&
          activeCardIndex < cards.length - 1
        ) {
          // Переход к следующей карточке
          activeCardIndex++;
        }

        // Сброс стилей и обновление позиций
        centerCard.style.transform = "";
        centerCard.style.opacity = "";
        updateCards();
      }

      function updateCards() {
        cards.forEach((card, index) => {
          card.classList.remove(
            "left",
            "center",
            "right",
            "hidden-left",
            "hidden-right"
          );

          if (index < activeCardIndex - 1) {
            card.classList.add("hidden-left");
          } else if (index === activeCardIndex - 1) {
            card.classList.add("left");
          } else if (index === activeCardIndex) {
            card.classList.add("center");
          } else if (index === activeCardIndex + 1) {
            card.classList.add("right");
          } else {
            card.classList.add("hidden-right");
          }
        });
      }
    });