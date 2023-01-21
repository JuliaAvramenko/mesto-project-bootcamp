console.log("hello from cards");
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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

document.addEventListener("DOMSubtreeModified", (event) => {
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









