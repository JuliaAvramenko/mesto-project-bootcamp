//1 step find forms
const forms = document.forms;


function toggleButtonState(buttonElement, toActive) {
    console.log("I change state Button");
    if (toActive) {
        // Enable button
        buttonElement.disabled = false;
        buttonElement.classList.remove("form__submit-button_invalid");
    } else {
        // Disable button
        buttonElement.disabled = "disabled";
        buttonElement.classList.add("form__submit-button_invalid");
    }
}

function showError(formElement, inputElement) {
    console.log(`I showError ${formElement.name} ${inputElement.name}`);

    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

    inputElement.classList.add("form_state_invalid");
    errorElement.textContent = inputElement.validationMessage;

}

function hideError(formElement, inputElement) {
    console.log(`I hideError ${formElement.name} ${inputElement.name}`);

    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

    inputElement.classList.remove("form_state_invalid");
    errorElement.textContent = "";
}


// 5 step проверяет валидность отдельного инпута, возвращает true, если форма невалидна
function checkInputValidity(formElement, inputElement) {
    // проверяет на валидность и возвращает true or false
    const isValid = inputElement.validity.valid;

    if (isValid) {
        //если валидно , то скрываем сообщение об ошибке
        hideError(formElement, inputElement);
    } else {
        // если невалидно, то показываем сообщение об ошибке
        showError(formElement, inputElement);
    }
    // если форма валидна - возввращаем false , то есть ошибок мы не нашли
    return !isValid;
}

// 4 step  функция проверяет валидность формы и изменяет стили 
function checkFormValidity(formElement) {
    // находим инпуты в форме 
    const inputNameList = formElement.querySelectorAll(".form__field-name");
    const inputOccupationList = formElement.querySelectorAll(".form__field-occupation");
    // проходимся по всем инпутам
    // validationStateList покажет, есть ли ошибка в каждом отдельном инпуте
    const ValidationStateList = [...inputNameList, ...inputOccupationList].map(
        // проверяем валидность каждого инпута
        (inputElement) => checkInputValidity(formElement, inputElement)
    );
    // 6 step была ли хоть одна ошибка - some вернет первый результат ошибки 
    const isNotValid = [...ValidationStateList].some(state => state);
    // ищем кнопку button
    const submitButtonElement = formElement.querySelector(".form__submit-button");
    // по умолчанию кнопка активна, но если форма не валидна , то кнопка не активна
    let makeButtonActive = true;
    if (isNotValid) {
        makeButtonActive = false;
    }
    // вызываем кнопку
    toggleButtonState(submitButtonElement, makeButtonActive);
}

// 2 step  проходим по каждой форме  
[...forms].forEach((formElement) => {
    //в formElement находим все инпуты
    const inputNameList = formElement.querySelectorAll(".form__field-name")
    const inputOccupationList = formElement.querySelectorAll(".form__field-occupation");

    // повесили обработчик события на форму
    formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("отправилась");

    });

    const submitButtonElement = formElement.querySelector(".form__submit-button");
    toggleButtonState(submitButtonElement, false);

    // 3 step  проходим по всем инпутам в определенной форме
    [...inputNameList, ...inputOccupationList].forEach((inputElement) => {
        // повесили обработчик на инпуты, но проверяем валидность всей формы
        inputElement.addEventListener("input", (evt) => {
            checkFormValidity(formElement); // идем в функцию checkFormValidity
        });

    });
});



