import { selectors } from "./config";
import { Validation } from "./validation";


export const Modal = (function () {
    // закрытие попапа 
    function closePopup(popupElem) {
        removeCloseHandlers(popupElem);
        popupElem.classList.remove(selectors.popupOpenedClass);
    }
    // открытие попапа
    function openPopup(popupElem) {
        addCloseHandlers(popupElem);
        popupElem.classList.add(selectors.popupOpenedClass);
    }

    function addCloseHandlers(popupElem) {
        // add Esc handler
        document.addEventListener("keydown", closeByEscape);
        // add cross handler
        const closeButton = popupElem.querySelector(selectors.popupContainerCloseButtonSelector);
        closeButton.addEventListener("click", closeByCross);
        // add overlay handler
        popupElem.addEventListener("mousedown", closeByOverlay);
    }

    function removeCloseHandlers(popupElem) {
        // remove Esc handler
        document.removeEventListener("keydown", closeByEscape);
        // remove  cross handler
        const closeButton = popupElem.querySelector(selectors.popupContainerCloseButtonSelector);
        closeButton.removeEventListener("click", closeByCross);
        //remove overlay handler
        popupElem.removeEventListener("mousedown", closeByOverlay);
    }

    //закрытие попапа нажатием на Esc
    function closeByEscape(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            closePopup(openedPopup);
        }
    }


    // закрытие попапв нажатием на крестик 
    function closeByCross(evt) {
        const popupElem = evt.target.closest(selectors.popupSelector);
        closePopup(popupElem);

    }

    function closeByOverlay(evt) {
        // Обрабатываем клик за пределами попапа: 
        // Source: https://misha.agency/javascript/klik-vne-elementa.html
        const popupElement = evt.target.closest(selectors.popupOpenedSelector);
        const popupContainer = popupElement.querySelector(selectors.popupContainerSelector);

        const withinBoundaries = evt.composedPath().includes(popupContainer);

        if (!withinBoundaries) {
            closePopup(popupElement);

        }
    }


    return {
        openPopup: openPopup,
        closePopup: closePopup,
    }
}());

