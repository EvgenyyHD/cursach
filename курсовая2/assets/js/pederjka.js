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
