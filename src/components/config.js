export const selectors = {
    //для validation.js
    formFieldInputSelector: ".form__field-input",
    formSubmitButtonSelector: ".form__submit-button",
    formSubmitButtonInvalidClass: "form__submit-button_invalid",
    formValidationInvalidClass: "form_state_invalid",
    formSubmitButtonInvalidClass: "form__submit-button_invalid",

    //для сards.js
    elementTemplateSelector: ".element-template",
    elementsSelector: ".elements",
    popupContainerImageSelector: ".popup-container__image",
    popupSelector: ".popup",
    popupContainerTextSelector: ".popup-container__text",

    elementTitleSelector: ".element__title",
    elementImageSelector: ".element__image",

    elementGroupButtonActiveClass: "element__group-button_active",
    popupOpenedClass: "popup_opened",
    popupOpenedSelector: ".popup_opened",

    elementSelector: ".element",
    popupContainerCloseButtonSelector: ".popup-container__close-button",
    elementGroupButtonSelector: ".element__group-button",
    elementTrashButtonSelector: ".element__trash-button",
    elementTrashButtonInvalidClass: "element__trash-button_invalid",
    elementCounterSelector: ".element__counter",
    profileAddButtonSelector: ".profile__add-button",

    profileTitleSelector: ".profile__title",
    profileSubtitleSelector: ".profile__subtitle",
    profileEditButtonSelector: ".profile__edit-button",
    profileImageSelector: ".profile__image",
    popupContainerSelector: ".popup-container",
    formSelector: ".form",
    formProfileImageChangeSelector: ".form-profile-image-change",
    formProfileEditSelector: ".form-profile-edit",

    profileEditImageClass: "profile__edit-image_hidden",
}

export const elements = {
    profilePopup: document.querySelector(".profile-popup"),
    addPopup: document.querySelector(".add-popup"),
    imagePopup: document.querySelector(".image-popup"),
    editImagePopup: document.querySelector(".edit-image-popup"),

}
