console.log("hello from cards");


const cardElementTemplate = document.querySelector(".element-template").content;
const cardsNode = document.querySelector(".elements");

// popup image
const popupContainerImage = document.querySelector(".popup-container__image");
const popupImage = popupContainerImage.closest(".popup");
const popupContainerText = popupImage.querySelector(".popup-container__text");

// Add card form
const addCardForm = document.forms["form-card-add"];
const addCardFormNameInput = addCardForm.querySelector(".form__field-name");
const addCardFormLinkInput = addCardForm.querySelector(".form__field-occupation");

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

function createCard(name, link) {
    // клонируем шаблон
    const newCard = cardElementTemplate.cloneNode(true);
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
    console.log("hi")
}

function trashButtonHandler(event) {
    const card = event.target.closest(".element");
    cardsNode.removeChild(card);
}

function clickImageHandler(event) {
    // get place name
    const cardPicture = event.target;
    const src = cardPicture.src;
    const alt = cardPicture.alt;
    const name = cardPicture.closest(".element").querySelector(".element__title").textContent;

    popupImage.classList.toggle("popup_opened");

    popupContainerText.textContent = name;
    popupContainerImage.src = src;
    popupContainerImage.alt = alt;

    popupImage.querySelector(".popup-container__close-button").addEventListener("click", (event) => {
        popupContainerImage.src = ''
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

//const cardTemplate = createTemplate();

// delete all element
const oldElementList = document.querySelectorAll(".element")
oldElementList.forEach(item => item.remove())

const cardList = initialCards.map(card => createCard(card.name, card.link));

// add initial cards to elements

cardList.forEach(item => cardsNode.appendChild(item));


// add new card

const submitCard = document.forms["form-card-add"];
submitCard.addEventListener("submit", (event) => {

    const newCard = createCard(
        addCardFormNameInput.value,
        addCardFormLinkInput.value
    );
    cardsNode.prepend(newCard);

    //очищение инпута 
    addCardForm.reset()
    event.preventDefault();
})

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", (event) => {
    const form = document.forms["form-card-add"]
    const popupElem = form.closest(".popup")
    openPopup(popupElem)
})







