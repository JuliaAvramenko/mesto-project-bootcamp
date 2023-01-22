console.log("hello from cards");
const initialCards = [
    {
        name: 'Красная Поляна',
        link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/images/1.jpeg'
    },
    {
        name: 'Церковное озеро',
        link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/images/2.jpeg'
    },
    {
        name: 'Геленджик',
        link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/images/3.jpeg'
    },
    {
        name: 'Сафари Парк',
        link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/images/4.jpeg'
    },
    {
        name: 'Сочи',
        link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/images/5.jpg'
    },
    {
        name: 'Адлер',
        link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/images/6.jpg'
    }
];


function createTemplate() {
    const node = document.querySelector(".element");

    return node.cloneNode(true);

}

function createCard(template, name, link) {
    // клонируем шаблон
    const newCard = template.cloneNode(true);
    // меняем имя на переменную
    const newCardTitle = newCard.querySelector(".element__title");
    newCardTitle.textContent = name
    //меняем ссылку и alt 
    const newCardImage = newCard.querySelector(".element__image");
    newCardImage.alt = name;
    newCardImage.src = link;


    return newCard

}

function likeButtonHandler(event) {
    event.target.classList.toggle("element__group-button_active")
}

function trashButtonHandler(event) {
    const card = event.target.closest(".element");
    const cards = card.closest(".elements");
    cards.removeChild(card);
}

function clickImageHandler(event) {
    // get place name
    const src = event.target.src;
    const alt = event.target.alt;
    const name = event.target.closest(".element").querySelector(".element__title").textContent;
    const image = document.querySelector(".popup-container__image");

    const imagePopup = image.closest(".popup");
    imagePopup.classList.toggle("popup_opened");

    const newImage = imagePopup.querySelector(".popup-container__image");
    const newName = imagePopup.querySelector(".popup-container__text");
    newName.textContent = name;
    newImage.src = src;
    newImage.alt = alt;

    imagePopup.querySelector(".popup-container__close-button").addEventListener("click", (event) => {
        const image = event.target.closest('.popup').querySelector(".popup-container__image")

        image.src = ''
    })


}

document.addEventListener("DOMSubtreeModified", (event) => {
    const likeButtonList = document.querySelectorAll(".element__group-button");
    likeButtonList.forEach(
        likeButton => likeButton.addEventListener("click", likeButtonHandler)
    )

    const trashButtonList = document.querySelectorAll(".element__trash-button");
    trashButtonList.forEach(
        trashButton => trashButton.addEventListener("click", trashButtonHandler)
    )

    const openImageList = document.querySelectorAll(".element__image");
    openImageList.forEach(
        openImage => openImage.addEventListener("click", clickImageHandler)
    )
})

const cardTemplate = createTemplate();

// delete all element
const oldElementList = document.querySelectorAll(".element")
oldElementList.forEach(item => item.remove())

const cardList = initialCards.map(card => createCard(cardTemplate, card.name, card.link));

// add initial cards to elements
const elementsNode = document.querySelector(".elements");
cardList.forEach(item => elementsNode.appendChild(item));


// add new card

const submitCard = document.forms["form-card-add"];
submitCard.addEventListener("submit", (event) => {
    const addCardForm = event.target

    const name = addCardForm.querySelector(".form__field-name").value;
    const link = addCardForm.querySelector(".form__field-occupation").value;

    const newCard = createCard(cardTemplate, name, link);
    elementsNode.appendChild(newCard);


    const popupElem = addCardForm.closest(".popup");
    change_popup_state(popupElem);

    event.preventDefault();
})









