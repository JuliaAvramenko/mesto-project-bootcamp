export const MyInformation = (function () {
    let myProfile = {

    }

    return {
        myProfile: myProfile,
    }
}());

export const config = {
    baseUrl: "https://nomoreparties.co/v1/wbf-cohort-5",
    headers: {
        authorization: '68a0d7e3-249b-4c9f-8ef2-b362819ec551',
        'Content-Type': 'application/json',
    },
}

export const Api = (function (config) {

    const CARDS_ENDPOINT = `cards`
    const PROFILE_ENDPOINT = `users`

    function checkResponse(response) {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`Что-то пошло не так: ${response.status}`)
    }

    // Загрузка информации о пользователе с сервера
    async function getProfile() {
        // TODO: save answer to MyInformation.myProfile = profile;
        const response = await fetch(`${config.baseUrl}/users/me`, { headers: config.headers });
        return checkResponse(response);
    }

    //  Загрузка карточек с сервера
    async function getCards() {
        const response = await fetch(`${config.baseUrl}/cards`, { headers: config.headers });
        return checkResponse(response);
    }
    // Редактирование профиля

    async function patchProfile(name, about) {
        const response = await fetch(`${config.baseUrl}/users/me`, {
            method: "PATCH",
            headers: config.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
        return checkResponse(response);
    }

    // Добавление новой карточки
    async function postCards(name, link) {
        const response = await fetch(`${config.baseUrl}/cards`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                link: link
            }),
            headers: config.headers
        });
        return checkResponse(response);
    }
    // Удаление карточки
    async function deleteCard(id) {
        const response = await fetch(`${config.baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: config.headers
        });
        return checkResponse(response);
    }

    // Постановка лайка
    async function putLike(id) {
        const response = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: "PUT",
            headers: config.headers
        });
        return checkResponse(response);
    }

    //Удаление лайка
    async function deleteLike(id) {
        const response = await fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: "DELETE",
            headers: config.headers
        });
        return checkResponse(response);
    }

    // Обновление аватара пользователя
    async function patchProfileAvatar(link) {
        const response = await fetch(`${config.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: config.headers,
            body: JSON.stringify({
                avatar: link
            })
        });
        return checkResponse(response);
    }


    return {
        getProfile: getProfile,
        getCards: getCards,
        patchProfile: patchProfile,
        postCards: postCards,
        deleteCard: deleteCard,
        putLike: putLike,
        deleteLike: deleteLike,
        patchProfileAvatar: patchProfileAvatar,

    }

})(config)