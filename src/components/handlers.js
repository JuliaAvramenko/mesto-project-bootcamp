import { selectors } from "./config";
import { Modal } from "./modal";


export const Handlers = (function () {

    //function changePopupState(popupElem) {
    // popupElem.classList.toggle("popup_opened");
    //}
    const nameProfile = document.querySelector(selectors.profileTitleSelector);
    const occupationProfile = document.querySelector(selectors.profileSubtitleSelector);






    const editButton = document.querySelector(selectors.profileEditButtonSelector);
    editButton.addEventListener('click', (event) => {
        const form = document.forms["form-profile-edit"]
        const popupElem = form.closest(selectors.popupSelector)
        Modal.openPopup(popupElem);



        const nameForm = form.querySelector(selectors.formFieldNameSelector);
        const occupationForm = form.querySelector(selectors.formFieldOccupationSelector);

        nameForm.value = nameProfile.textContent;
        occupationForm.value = occupationProfile.textContent;

        let eventInput = new Event("input");

        nameForm.dispatchEvent(eventInput);
        occupationForm.dispatchEvent(eventInput);
    })


    const submitForm = document.querySelector(selectors.formSelector)
    submitForm.addEventListener("submit", (event) => {
        // Находим форму
        const form = event.target

        // Получаем значения инпутов
        const nameInput = form.querySelector(selectors.formFieldNameSelector);
        const occupationInput = form.querySelector(selectors.formFieldOccupationSelector);

        // Делаем что нибудь с инпутами
        nameProfile.textContent = nameInput.value;
        occupationProfile.textContent = occupationInput.value;

        // Закрываем форму
        const popupElem = form.closest(selectors.popupSelector);
        Modal.closePopup(popupElem);

        // Не делаем HTTP запрос
        event.preventDefault();
    })

    return {


    }
}());
