import { selectors } from "./config";
import { Modal } from "./modal";
import { Validation } from "./validation";


const Cards = (function () {


    console.log("hello from cards");


    const cardElementTemplate = document.querySelector(selectors.elementTemplateSelector).content;
    const cardsNode = document.querySelector(selectors.elementsSelector);

    // popup image
    const popupContainerImage = document.querySelector(selectors.popupContainerImageSelector);
    const popupImage = popupContainerImage.closest(selectors.popupSelector);
    const popupContainerText = popupImage.querySelector(selectors.popupContainerTextSelector);

    // Add card form
    const addCardForm = document.forms["form-card-add"];
    const addCardFormNameInput = addCardForm.querySelector(selectors.formFieldNameSelector);
    const addCardFormLinkInput = addCardForm.querySelector(selectors.formFieldOccupationSelector);

    const initialCards = [
        {
            name: 'Красная Поляна',
            link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/src/images/1.jpeg'
        },
        {
            name: 'Церковное озеро',
            link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/src/images/2.jpeg'
        },
        {
            name: 'Геленджик',
            link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/src/images/3.jpeg'
        },
        {
            name: 'Сафари Парк',
            link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/src/images/4.jpeg'
        },
        {
            name: 'Сочи',
            link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/src/images/5.jpg'
        },
        {
            name: 'Адлер',
            link: 'https://github.com/JuliaAvramenko/mesto-project-bootcamp/raw/main/src/images/6.jpg'
        }
    ];


    function addCardCallback(event) {
        console.log("fdgdfgdf");
        cardsNode.appendChild(event.target);
    }

    function createCard(name, link, addCardCallback) {
        console.log("ggg" + name);
        // клонируем шаблон
        const newCard = cardElementTemplate.cloneNode(true);
        // меняем имя на переменную
        const newCardTitle = newCard.querySelector(selectors.elementTitleSelector);
        newCardTitle.textContent = name
        //меняем ссылку и alt 
        const newCardImage = newCard.querySelector(selectors.elementImageSelector);
        //newCardImage = document.createElement("img");
        newCardImage.alt = name;
        newCardImage.src = link;
        //newCardImage.onload = addCardCallback;

        // newCard.appendChild(newCardImage);

        //return newCardImage

        return newCard;
    }

    function likeButtonHandler(event) {
        event.target.classList.toggle(selectors.elementGroupButtonActiveClass)
        console.log("hi")
    }

    function trashButtonHandler(event) {
        const card = event.target.closest(selectors.elementSelector);
        cardsNode.removeChild(card);
    }

    function clickImageHandler(event) {
        // get place name
        const cardPicture = event.target;
        const src = cardPicture.src;
        const alt = cardPicture.alt;
        const name = cardPicture.closest(selectors.elementSelector).querySelector(selectors.elementTitleSelector).textContent;

        popupImage.classList.toggle(selectors.popupOpenedClass);

        popupContainerText.textContent = name;
        popupContainerImage.src = src;
        popupContainerImage.alt = alt;

        popupImage.querySelector(selectors.popupContainerCloseButtonSelector).addEventListener("click", (event) => {
            popupContainerImage.src = ''
        })
    }

    document.addEventListener("DOMSubtreeModified", (event) => {
        const likeButtonList = document.querySelectorAll(selectors.elementGroupButtonSelector);
        likeButtonList.forEach(
            likeButton => likeButton.addEventListener("click", likeButtonHandler)
        )

        const trashButtonList = document.querySelectorAll(selectors.elementTrashButtonSelector);
        trashButtonList.forEach(
            trashButton => trashButton.addEventListener("click", trashButtonHandler)
        )

        const openImageList = document.querySelectorAll(selectors.elementImageSelector);
        openImageList.forEach(
            openImage => openImage.addEventListener("click", clickImageHandler)
        )
    })



    // delete all element
    const oldElementList = document.querySelectorAll(selectors.elementSelector)
    oldElementList.forEach(item => item.remove())

    const cardList = initialCards.map(card => createCard(card.name, card.link, addCardCallback));

    // add initial cards to elements

    cardList.forEach(item => cardsNode.appendChild(item));


    // add new card
    addCardForm.addEventListener("submit", (event) => {

        const newCard = createCard(
            addCardFormNameInput.value,
            addCardFormLinkInput.value
        );
        cardsNode.prepend(newCard);

        //делаю кнопку неактивной после добавления карточки
        Validation.resetFormValidation(addCardForm, selectors);

        event.preventDefault();
    })

    const addButton = document.querySelector(selectors.profileAddButtonSelector);
    addButton.addEventListener("click", (event) => {
        const form = document.forms["form-card-add"]
        const popupElem = form.closest(selectors.popupSelector)
        Modal.openPopup(popupElem)
    })
    return {

    }

}());







