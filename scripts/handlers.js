
function change_popup_state(popupElem) {
    popupElem.classList.toggle("popup_opened");
}


let editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', (event) => {
    const popupElem = document.querySelector(".form").closest(".popup");
    change_popup_state(popupElem);

})

let closeButton = document.querySelector(".popup-container__close-button")
closeButton.addEventListener("click", (event) => {
    const popupElem = event.target.closest(".popup");
    change_popup_state(popupElem);
})

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


const likeButtonList = document.querySelectorAll(".element__group-button");
likeButtonList.forEach(
    likeButton => likeButton.addEventListener("click", (event) => {
        //console.log("hi");
        event.target.classList.toggle("element__group-button_active")
        //console.log(event.target);
    })
)

const trashButtonList = document.querySelectorAll(".element__trash-button");
trashButtonList.forEach(
    trashButton => trashButton.addEventListener("click", (event) => {
        //console.log("hi");

        const card = event.target.closest(".element");
        const cards = card.closest(".elements");
        cards.removeChild(card);
    })

)
