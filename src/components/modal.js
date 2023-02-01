import { selectors } from "./config";

export const Modal = (function () {

    //закрытие попапа 
    function closePopup(popupElem) {
        popupElem.classList.remove(selectors.popupOpenedClass);
    }
    // открытие попапа
    function openPopup(popupElem) {
        popupElem.classList.add(selectors.popupOpenedClass);
    }

    // закрытие попапв нажатием на крестик 
    const closeButtonList = document.querySelectorAll(selectors.popupContainerCloseButtonSelector)
    closeButtonList.forEach(closeButton =>
        closeButton.addEventListener("click", (event) => {
            const popupElem = event.target.closest(selectors.popupSelector);
            closePopup(popupElem);
        })
    )

    // закрытие окна за пределами попапа
    const popupList = document.querySelectorAll(selectors.popupSelector);
    popupList.forEach(popupElement => {
        // Обрабатываем клик за пределами попапа: 
        // Source: https://misha.agency/javascript/klik-vne-elementa.html

        const popupContainer = popupElement.querySelector(selectors.popupContainerSelector);

        popupElement.addEventListener("click", (event) => {
            const withinBoundaries = event.composedPath().includes(popupContainer);

            if (!withinBoundaries) {
                closePopup(popupElement);
                // div.style.display = 'none'; // скрываем элемент т к клик был за его пределами
            }
        })


        // Закрываем попап по нажатию Esc

        //popupElement.addEventListener("keydown", (event) => {
        // console.log("I was here");
        //if (event.key === "s");
        //const popupElem = event.target.closest(".popup");
        //closePopup(popupElem);
        // });
    })

    // Закрываем попапы по нажатию Esc
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !event.repeat) {
            //console.log("I was here");
            const popupList = document.querySelectorAll(selectors.popupSelector);
            popupList.forEach(popupElement => {
                //console.log(popupElement);
                if ([...popupElement.classList].includes(selectors.popupOpenedClass)) {
                    closePopup(popupElement)

                };
                // classList.проверяет есьть элемент в массива true - выключить, в другиз - ничего
            })
        }
        //if (event.key === "s");
        //const popupElem = event.target.closest(".popup");
        //closePopup(popupElem);
    });


    return {
        openPopup: openPopup,
        closePopup: closePopup,

    }

}());