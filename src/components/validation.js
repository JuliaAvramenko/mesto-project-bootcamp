
export const Validation = (function () {


    function resetFormValidation(formElement, settings) {
        // очищаем инпуты
        formElement.reset();
        // находим кнопку и инпуты      
        const submitButton = formElement.querySelector(settings.formSubmitButtonSelector);
        const inputElementList = formElement.querySelectorAll("input");

        //проходим по списку инпутов, для каждого инпута вызываем ф-ю hideError,которая скрывает ошибку
        [...inputElementList].forEach((inputElement) => {
            hideError(formElement, inputElement, settings);
        })
        // деактивируем кнопку
        toggleButtonState(submitButton, false, settings);


    }

    function toggleButtonState(buttonElement, toActive, settings) {

        if (toActive) {
            // Enable button
            buttonElement.disabled = false;
            buttonElement.classList.remove(settings.formSubmitButtonInvalidClass);
        } else {
            // Disable button
            buttonElement.disabled = "disabled";
            buttonElement.classList.add(settings.formSubmitButtonInvalidClass);
        }
    }

    function showError(formElement, inputElement, settings) {
        console.log(`I showError ${formElement.name} ${inputElement.name}`);

        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

        inputElement.classList.add(settings.formValidationInvalidClass);
        errorElement.textContent = inputElement.validationMessage;

    }

    function hideError(formElement, inputElement, settings) {
        console.log(`I hideError ${formElement.name} ${inputElement.name}`);

        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

        inputElement.classList.remove(settings.formValidationInvalidClass);
        errorElement.textContent = "";
    }


    // 5 step проверяет валидность отдельного инпута, возвращает true, если форма невалидна
    function checkInputValidity(formElement, inputElement, settings) {
        // проверяет на валидность и возвращает true or false
        const isValid = inputElement.validity.valid;

        if (isValid) {
            //если валидно , то скрываем сообщение об ошибке
            hideError(formElement, inputElement, settings);
        } else {
            // если невалидно, то показываем сообщение об ошибке
            showError(formElement, inputElement, settings);
        }
        // если форма валидна - возввращаем false , то есть ошибок мы не нашли
        return !isValid;
    }

    // 4 step  функция проверяет валидность формы и изменяет стили 
    function checkFormValidity(formElement, settings) {
        // находим инпуты в форме 
        const inputList = formElement.querySelectorAll(settings.formFieldInputSelector);

        // проходимся по всем инпутам
        // validationStateList покажет, есть ли ошибка в каждом отдельном инпуте
        const validationStateList = [...inputList].map(
            // проверяем валидность каждого инпута
            (inputElement) => checkInputValidity(formElement, inputElement, settings)
        );
        // 6 step была ли хоть одна ошибка - some вернет первый результат ошибки 
        const isNotValid = [...validationStateList].some(state => state);
        // ищем кнопку button
        const submitButtonElement = formElement.querySelector(settings.formSubmitButtonSelector);
        // по умолчанию кнопка активна, но если форма не валидна , то кнопка не активна
        let makeButtonActive = true;
        if (isNotValid) {
            makeButtonActive = false;
        }
        // вызываем кнопку
        toggleButtonState(submitButtonElement, makeButtonActive, settings);
    }

    function enableValidation(settings) {

        //1 step find forms
        const forms = document.forms;

        // 2 step  проходим по каждой форме  
        [...forms].forEach((formElement) => {
            //в formElement находим все инпуты
            const inputList = formElement.querySelectorAll(settings.formFieldInputSelector);

            const submitButtonElement = formElement.querySelector(settings.formSubmitButtonSelector);
            toggleButtonState(submitButtonElement, false, settings);

            // 3 step  проходим по всем инпутам в определенной форме
            [...inputList].forEach((inputElement) => {
                // повесили обработчик на инпуты, но проверяем валидность всей формы
                inputElement.addEventListener("input", (evt) => {
                    checkFormValidity(formElement, settings); // идем в функцию checkFormValidity
                });

            });
        });
    }

    return {
        enableValidation: enableValidation,
        resetFormValidation: resetFormValidation
    }

}());
