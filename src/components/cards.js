import { selectors, elements } from "./config";
import { Modal } from "./modal";
import { Validation } from "./validation";
import { Api, MyInformation } from "./api";
import { Profile } from "./profile";


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

    function createCard(card) {
        // клонируем шаблон
        const newCard = cardElementTemplate.cloneNode(true);

        newCard.id = card._id
        // меняем имя на переменную

        const newCardTitle = newCard.querySelector(selectors.elementTitleSelector);
        newCardTitle.textContent = card.name
        // меняем ссылку и alt 
        const newCardImage = newCard.querySelector(selectors.elementImageSelector);

        newCardImage.alt = card.name;
        newCardImage.src = card.link;

        // add image click listener             
        newCardImage.addEventListener("click", handleClickImage);


        // показать trashbutton или нет 
        if (card.owner._id === MyInformation.myProfile._id) {
            const trashButton = newCard.querySelector(".element__trash-button");
            trashButton.addEventListener("click", handleTrashButton);
            trashButton.classList.remove(selectors.elementTrashButtonInvalidClass);
        }

        // расставляем likes 
        const likeButton = newCard.querySelector(".element__group-button");
        likeButton.addEventListener("click", handleLikeButton);
        const elementCounter = newCard.querySelector(".element__counter");
        const likesNumber = card.likes.length;
        elementCounter.textContent = likesNumber;

        // end temp
        card.likes.forEach(someProfile => {

            if (someProfile._id === MyInformation.myProfile._id) {
                likeButton.classList.add(selectors.elementGroupButtonActiveClass);
            }
        })


        return newCard;
    }

    function handleLikeButton(event) {
        const cardNodeElement = event.target.closest(selectors.elementSelector);
        const nodeCounter = cardNodeElement.querySelector(selectors.elementCounterSelector);
        const likeButton = cardNodeElement.querySelector(selectors.elementGroupButtonSelector);
        const id = cardNodeElement.id;
        if (event.target.classList.contains(selectors.elementGroupButtonActiveClass)) {
            Api.deleteLike(id)
                .then((cardData) => {
                    removeLikesNumberAndUnpaintHeart(nodeCounter, likeButton, cardData)
                })
                .catch((error) => {
                    console.log(`Функция removeLikeButton ${error}`)
                })

        } else {

            Api.putLike(id)
                .then((cardData) => {
                    showLikesNumberAndPaintHeart(nodeCounter, likeButton, cardData)
                })
                .catch((error) => {
                    console.log(`Функция likeButton ${error}`)
                })
        }
    }

    function showLikesNumberAndPaintHeart(nodeCounter, likeButton, cardData) {
        likeButton.classList.add(selectors.elementGroupButtonActiveClass);
        const showLikesNumber = cardData.likes.length;
        nodeCounter.textContent = showLikesNumber;
    }

    function removeLikesNumberAndUnpaintHeart(nodeCounter, likeButton, cardData) {
        likeButton.classList.remove(selectors.elementGroupButtonActiveClass);
        const showLikesNumber = cardData.likes.length;
        nodeCounter.textContent = showLikesNumber;
    }

    //поставить колич-ао лайков, покрасить сердце
    function handleTrashButton(event) {
        const cardNodeElement = event.target.closest(selectors.elementSelector);
        Api.deleteCard(cardNodeElement.id)
            .then((card) => {
                cardsNode.removeChild(cardNodeElement);
            })
            .catch((error) => {
                console.log(`Ошибка при удалении карточки ${error}`)
            })
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

    function showCards(cards) {
        // delete all element
        const oldElementList = document.querySelectorAll(selectors.elementSelector);
        oldElementList.forEach(item => item.remove());
        //получаем подготовленные карточки для вставки  в DOM
        const cardList = cards.map(card => createCard(card));
        // add initial cards to elements

        cardList.forEach(item => cardsNode.appendChild(item));
    }

    Promise.all([Api.getProfile(), Api.getCards()])
        // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
        .then(([userData, cards]) => {
            // тут установка данных пользователя            
            MyInformation.myProfile = userData;
            Profile.showProfile(userData);
            // и тут отрисовка карточек
            showCards(cards);
        })
        .catch((error) => {
            console.log(`Функция showCards ${error}`)
        });



    // add new card
    addCardForm.addEventListener("submit", (event) => {
        const createCardSubmitButton = addCardForm.querySelector(selectors.formSubmitButtonSelector);
        createCardSubmitButton.textContent = "Создание...";

        Api.postCards(
            addCardFormNameInput.value,
            addCardFormLinkInput.value)
            .then((card) => {
                const newCardNodeElement = createCard(card);
                cardsNode.prepend(newCardNodeElement);
                Validation.resetFormValidation(addCardForm, selectors);
                Modal.closePopup(elements.addPopup);
            })
            .catch((error) => {

                console.log(`Ошибка добавления карточки ${error}`)
            })
            .finally(() => {
                createCardSubmitButton.textContent = "Создать";

            })


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







