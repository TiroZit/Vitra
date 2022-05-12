// Подключение функционала
// import { isMobile } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;
  if (targetElement.closest("[data-parent]")) {
    const subMenuId = targetElement.dataset.parent
      ? targetElement.dataset.parent
      : null;
    const subMenu = document.querySelector(`[data-submenu='${subMenuId}']`);
    if (subMenu) {
      const activeLink = document.querySelector(".submenu-active");
      const activeBlock = document.querySelector(".submenu-open");
      if (activeLink && activeLink !== targetElement) {
        activeLink.classList.remove("submenu-active");
        activeBlock.classList.remove("submenu-open");
      }
      targetElement.classList.toggle("submenu-active");
      subMenu.classList.toggle("submenu-open");
    }
    e.preventDefault();
  }
  if (targetElement.closest("[data-sub-parent]")) {
    const subMenuId = targetElement.dataset.subParent
      ? targetElement.dataset.subParent
      : null;
    const subMenu = document.querySelector(`[data-sub-submenu='${subMenuId}']`);
    if (subMenu) {
      const activeLink = document.querySelector(".sub-submenu-active");
      const activeBlock = document.querySelector(".sub-submenu-open");
      if (activeLink && activeLink !== targetElement) {
        activeLink.classList.remove("sub-submenu-active");
        activeBlock.classList.remove("sub-submenu-open");
      }
      targetElement.classList.toggle("sub-submenu-active");
      subMenu.classList.toggle("sub-submenu-open");
    }
    e.preventDefault();
  }
}
