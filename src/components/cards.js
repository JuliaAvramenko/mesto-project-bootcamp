import { selectors, elements } from "./config";
import { Modal } from "./modal";
import { Validation } from "./validation";


const Cards = (function () {


    const cardElementFragmentTemplate = document.querySelector(selectors.elementTemplateSelector).content;
    const cardElementTemplate = cardElementFragmentTemplate.querySelector('.element');
    const cardsNode = document.querySelector(selectors.elementsSelector);

    // popup image
    const popupContainerImage = document.querySelector(selectors.popupContainerImageSelector);
    const popupImage = popupContainerImage.closest(selectors.popupSelector);
    const popupContainerText = popupImage.querySelector(selectors.popupContainerTextSelector);

    // Add card form
    const addCardForm = document.forms["form-card-add"];
    const addCardFormNameInput = addCardForm.elements["form-add-name"];
    const addCardFormLinkInput = addCardForm.elements["form-add-link"];

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

        cardsNode.appendChild(event.target);
    }

    function createCard(name, link, addCardCallback) {
        // клонируем шаблон
        const newCard = cardElementTemplate.cloneNode(true);
        // меняем имя на переменную
        const newCardTitle = newCard.querySelector(selectors.elementTitleSelector);
        newCardTitle.textContent = name
        //меняем ссылку и alt 
        const newCardImage = newCard.querySelector(selectors.elementImageSelector);

        newCardImage.alt = name;
        newCardImage.src = link;


        // all listeners      
        const trashButton = newCard.querySelector(".element__trash-button");
        const cardImage = newCard.querySelector(".element__image");
        const likeButton = newCard.querySelector(".element__group-button");
        trashButton.addEventListener("click", handleTrashButton);
        cardImage.addEventListener("click", handleClickImage);
        likeButton.addEventListener("click", handleLikeButton);

        return newCard;
    }

    function handleLikeButton(event) {
        event.target.classList.toggle(selectors.elementGroupButtonActiveClass)
        console.log("hi")
    }

    function handleTrashButton(event) {
        const card = event.target.closest(selectors.elementSelector);
        cardsNode.removeChild(card);
    }

    function handleClickImage(event) {
        // get place name
        const cardPicture = event.target;
        const src = cardPicture.src;
        const alt = cardPicture.alt;
        const name = cardPicture.closest(selectors.elementSelector).querySelector(selectors.elementTitleSelector).textContent;

        Modal.openPopup(popupImage);

        popupContainerText.textContent = name;
        popupContainerImage.src = src;
        popupContainerImage.alt = alt;


    }

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
        Validation.resetFormValidation(addCardForm, selectors);
        Modal.openPopup(elements.addPopup);
    })
    return {

    }

}());







