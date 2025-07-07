import Header from "./Header.js";

new Header();

function handleCardVisibility() {
  const card = document.querySelector(".hero__item.hero__item--alt");
  if (!card) return; // Если элемента нет, выходим

  const screenWidth = window.innerWidth;
  const shouldBeVisible = screenWidth >= 767.98 && screenWidth <= 1279.98;

  // Добавляем/удаляем класс в зависимости от условия
  card.classList.toggle("visually-hidden", !shouldBeVisible);
}

// Запускаем при загрузке и ресайзе
window.addEventListener("DOMContentLoaded", handleCardVisibility);
window.addEventListener("resize", handleCardVisibility);
