
function change_popup_state(popupElem) {
    popupElem.classList.toggle("popup_opened");
}


const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', (event) => {
    const form = document.forms["form-profile-edit"]
    const popupElem = form.closest(".popup")
    change_popup_state(popupElem);

})

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", (event) => {
    const form = document.forms["form-card-add"]
    const popupElem = form.closest(".popup")
    change_popup_state(popupElem)
})


let closeButtonList = document.querySelectorAll(".popup-container__close-button")
closeButtonList.forEach(closeButton =>
    closeButton.addEventListener("click", (event) => {
        const popupElem = event.target.closest(".popup");
        change_popup_state(popupElem);
    })
)

let submitForm = document.querySelector(".form")
submitForm.addEventListener("submit", (event) => {
    // Находим форму
    let form = event.target

    // Получаем значения инпутов
    const nameInput = form.querySelector(".form__field-name");
    const occupationInput = form.querySelector(".form__field-occupation");

    // Делаем что нибудь с инпутами
    const oldName = document.querySelector(".profile__title");
    const oldOccupation = document.querySelector(".profile__subtitle");
    oldName.textContent = nameInput.value;
    oldOccupation.textContent = occupationInput.value;

    // Закрываем форму
    const popupElem = form.closest(".popup");
    change_popup_state(popupElem);

    // Не делаем HTTP запрос
    event.preventDefault();
})



