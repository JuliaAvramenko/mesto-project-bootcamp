
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
    let persik = event.target

    // Получаем значения инпутов
    const name = persik.querySelector(".form__field-name").value
    const occupation = persik.querySelector(".form__field-occupation").value

    // Делаем что нибудь с инпутами
    console.log(`Name: ${name}, Occupation: ${occupation}`)

    // Закрываем форму
    const popupElem = persik.closest(".popup");
    change_popup_state(popupElem);

    // Не делаем HTTP запрос
    event.preventDefault();
})



