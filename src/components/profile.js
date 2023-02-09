import { selectors, elements } from "./config";
import { Modal } from "./modal";


export const Profile = (function () {

    const nameProfile = document.querySelector(selectors.profileTitleSelector);
    const occupationProfile = document.querySelector(selectors.profileSubtitleSelector);
    const editButton = document.querySelector(selectors.profileEditButtonSelector);


    editButton.addEventListener('click', (event) => {
        const form = document.forms["form-profile-edit"]
        Modal.openPopup(elements.profilePopup);

        const nameForm = form.elements["form-profile-name"];
        const occupationForm = form.elements["form-profile-occupation"];

        nameForm.value = nameProfile.textContent;
        occupationForm.value = occupationProfile.textContent;

        const eventInput = new Event("input");

        nameForm.dispatchEvent(eventInput);
        occupationForm.dispatchEvent(eventInput);
    })


    const profileForm = document.querySelector(selectors.formSelector)
    profileForm.addEventListener("submit", (event) => {

        // Получаем значения инпутов
        const nameInput = profileForm.elements["form-profile-name"];
        const occupationInput = profileForm.elements["form-profile-occupation"];

        // Делаем что нибудь с инпутами
        nameProfile.textContent = nameInput.value;
        occupationProfile.textContent = occupationInput.value;

        // Закрываем форму

        Modal.closePopup(elements.profilePopup);

        // Не делаем HTTP запрос
        event.preventDefault();
    })

    const profileAvatar = document.querySelector(".profile__avatar");
    const profileEditImageButton = document.querySelector(".profile__edit-image");

    function handleClickEditImageButton(evt) {
        Modal.openPopup(elements.editImagePopup);

    }



    profileAvatar.addEventListener("mouseover", (evt) => {
        profileEditImageButton.addEventListener("click", handleClickEditImageButton);
        profileEditImageButton.classList.remove(selectors.profileEditImageClass);

    })
    profileAvatar.addEventListener("mouseout", (evt) => {
        profileEditImageButton.removeEventListener("click", handleClickEditImageButton);
        profileEditImageButton.classList.add(selectors.profileEditImageClass);
    })



    return {


    }
}());
