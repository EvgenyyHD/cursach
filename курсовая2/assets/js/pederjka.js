document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const plus = question.querySelector("span:last-child");

    if (answer.style.display === "block") {
      answer.style.display = "none";
      plus.textContent = "+";
    } else {
      answer.style.display = "block";
      plus.textContent = "-";
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const nav = document.querySelector('nav');
  
  burgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });
  
  // Закрытие меню при клике на ссылку
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      burgerMenu.classList.remove('active');
      nav.classList.remove('active');
    });
  });
  
  // Закрытие меню при изменении размера окна
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      burgerMenu.classList.remove('active');
      nav.classList.remove('active');
    }
  });
});