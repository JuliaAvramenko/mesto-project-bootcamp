
//function changePopupState(popupElem) {
// popupElem.classList.toggle("popup_opened");
//}
const nameProfile = document.querySelector(".profile__title");
const occupationProfile = document.querySelector(".profile__subtitle");


function closePopup(popupElem) {
    popupElem.classList.remove('popup_opened');
}
function openPopup(popupElem) {
    popupElem.classList.add('popup_opened');
}



const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener('click', (event) => {
    const form = document.forms["form-profile-edit"]
    const popupElem = form.closest(".popup")
    openPopup(popupElem);



    const nameForm = form.querySelector(".form__field-name");
    const occupationForm = form.querySelector(".form__field-occupation");

    nameForm.value = nameProfile.textContent;
    occupationForm.value = occupationProfile.textContent;

    let eventInput = new Event("input");

    nameForm.dispatchEvent(eventInput);
    occupationForm.dispatchEvent(eventInput);
})


const closeButtonList = document.querySelectorAll(".popup-container__close-button")
closeButtonList.forEach(closeButton =>
    closeButton.addEventListener("click", (event) => {
        const popupElem = event.target.closest(".popup");
        closePopup(popupElem);
    })
)


const popupList = document.querySelectorAll(".popup");
popupList.forEach(popupElement => {
    // Обрабатываем клик за пределами попапа: 
    // Source: https://misha.agency/javascript/klik-vne-elementa.html

    const popupContainer = popupElement.querySelector(".popup-container");

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
        const popupList = document.querySelectorAll(".popup");
        popupList.forEach(popupElement => {
            //console.log(popupElement);
            if ([...popupElement.classList].includes("popup_opened")) {
                closePopup(popupElement)

            };
            // classList.проверяет есьть элемент в массива true - выключить, в другиз - ничего
        })
    }
    //if (event.key === "s");
    //const popupElem = event.target.closest(".popup");
    //closePopup(popupElem);
});




const submitForm = document.querySelector(".form")
submitForm.addEventListener("submit", (event) => {
    // Находим форму
    const form = event.target

    // Получаем значения инпутов
    const nameInput = form.querySelector(".form__field-name");
    const occupationInput = form.querySelector(".form__field-occupation");

    // Делаем что нибудь с инпутами
    nameProfile.textContent = nameInput.value;
    occupationProfile.textContent = occupationInput.value;

    // Закрываем форму
    const popupElem = form.closest(".popup");
    closePopup(popupElem);

    // Не делаем HTTP запрос
    event.preventDefault();
})



