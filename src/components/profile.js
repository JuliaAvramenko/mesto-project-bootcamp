import { selectors, elements } from "./config";
import { Modal } from "./modal";
import { Api, MyInformation } from "./api";


export const Profile = (function () {

    const nameProfile = document.querySelector(selectors.profileTitleSelector);
    const occupationProfile = document.querySelector(selectors.profileSubtitleSelector);
    const editButton = document.querySelector(selectors.profileEditButtonSelector);
    const profileImage = document.querySelector(selectors.profileImageSelector);
    // Profile Form
    const profileForm = document.forms["form-profile-edit"];
    const nameFormInput = profileForm.elements["form-profile-name"];
    const occupationFormInput = profileForm.elements["form-profile-occupation"];

    editButton.addEventListener('click', (event) => {
        Modal.openPopup(elements.profilePopup);

        nameFormInput.value = nameProfile.textContent;
        occupationFormInput.value = occupationProfile.textContent;

        const eventInput = new Event("input");

        nameFormInput.dispatchEvent(eventInput);
        occupationFormInput.dispatchEvent(eventInput);
    })



    profileForm.addEventListener("submit", (event) => {
        // Делаем что нибудь с инпутами
        const editProfileSubmitButton = profileForm.querySelector(selectors.formSubmitButtonSelector);
        editProfileSubmitButton.textContent = "Сохранение..."

        Api.patchProfile(nameFormInput.value, occupationFormInput.value)
            .then((profile) => {
                nameProfile.textContent = profile.name;
                occupationProfile.textContent = profile.about;
                // Закрываем форму
                Modal.closePopup(elements.profilePopup);
            })
            .catch((error) => {

                console.log(`Профиль не удалось обновить ${error}`)
            })
            .finally(() => {
                editProfileSubmitButton.textContent = "Сохранить";
            })

        



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

    const myProfileInfo = {
        name: "Jul&#8209;liA&nbsp;Авраменко",
        occupation: "Шопоголик на отдыхе",
        link: "https://images.unsplash.com/photo-1561731172-9d906d7b13bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"

    }

    function showProfile(profile) {
        console.log(MyInformation.myProfile);


        nameProfile.textContent = profile.name;
        occupationProfile.textContent = profile.about;
        profileImage.src = profile.avatar;

    }

    const profileEditAvatarForm = document.forms["form-profile-image-change"];
    profileEditAvatarForm.addEventListener("submit", (event) => {
        const linkInput = profileEditAvatarForm.elements["form-edit-image-link"];

        const editProfileImageSubmitButton = profileEditAvatarForm.querySelector(selectors.formSubmitButtonSelector);
        editProfileImageSubmitButton.textContent = "Сохранение..."

        Api.patchProfileAvatar(linkInput.value)
            .then((profile) => {
                profileImage.src = profile.avatar;
                Modal.closePopup(elements.editImagePopup);
            })
            .catch((error) => {
                console.log(`Ошибка при обновлении аватара ${error}`)
            })
            .finally(() => {
                editProfileImageSubmitButton.textContent = "Сохранить";

            })

        event.preventDefault();
    })
    return {
        showProfile: showProfile,
    }

}());
