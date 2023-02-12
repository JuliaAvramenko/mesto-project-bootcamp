export const MyInformation = (function () {
    let myProfile = {

    }

    return {
        myProfile: myProfile,
    }
}());

export const Api = (function () {
    const HOST_API = 'https://nomoreparties.co';
    const COHORT_ID = 'wbf-cohort-5';

    const CARDS_ENDPOINT = `v1/${COHORT_ID}/cards`
    const PROFILE_ENDPOINT = `v1/${COHORT_ID}/users`
    const AUTHORIZATION = '68a0d7e3-249b-4c9f-8ef2-b362819ec551'

    // Загрузка информации о пользователе с сервера
    function getProfile(callback, error) {
        fetch(`${HOST_API}/${PROFILE_ENDPOINT}/me`, {
            headers: {
                authorization: AUTHORIZATION
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((profile) => {
                MyInformation.myProfile = profile;
                callback(profile);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                console.log("finally");
            })
    }

    //  Загрузка карточек с сервера
    function getCards(callback, error) {
        fetch(`${HOST_API}/${CARDS_ENDPOINT}`, {
            headers: {
                authorization: AUTHORIZATION
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((cards) => {
                callback(cards);
                //console.log(result);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                console.log("finally");
            })
    }
    // Редактирование профиля

    function patchProfile(name, about, callback, error) {
        fetch(`${HOST_API}/${PROFILE_ENDPOINT}/me`, {
            method: "PATCH",
            headers: {
                authorization: AUTHORIZATION,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((profile) => {
                callback(profile);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                console.log("finally patch");

            })
    }

    // Добавление новой карточки
    function postCards(name, link, callback, error) {
        fetch(`${HOST_API}/${CARDS_ENDPOINT}`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                link: link
            }),
            headers: {
                authorization: AUTHORIZATION,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    return res.json()
                }

                return Promise.reject(`Что-то пошло не так: ${res.status}`);
                // return Promise.reject(res.text());
            })
            .then((cards) => {
                callback(cards);
                //console.log(result);
            })
            .catch((err) => {
                error(err);
                /*
                err.then((data) => {
                    error(data);
                })
                */
            })
            .finally(() => {
                console.log("finally");
            })
    }
    // Удаление карточки
    function deleteCard(id, callback, error) {
        fetch(`${HOST_API}/${CARDS_ENDPOINT}/${id}`, {
            method: "DELETE",
            headers: {
                authorization: AUTHORIZATION
            }

        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((cards) => {
                callback(cards);
                //console.log(result);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                console.log("finally DELETE");
            })

    }

    // Постановка лайка
    function putLike(id, callback, error) {
        fetch(`${HOST_API}/${CARDS_ENDPOINT}/likes/${id}`, {
            method: "PUT",

            headers: {
                authorization: AUTHORIZATION
            }

        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((cards) => {
                callback(cards);
                //console.log(result);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                console.log("finally PUTlikes");
            })
    }

    //Удаление лайка
    function deleteLike(id, callback, error) {
        fetch(`${HOST_API}/${CARDS_ENDPOINT}/likes/${id}`, {
            method: "DELETE",

            headers: {
                authorization: AUTHORIZATION
            }

        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((cards) => {
                callback(cards);
                //console.log(result);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                console.log("finally DELETElikes");
            })
    }

    // Обновление аватара пользователя
    function patchProfileAvatar(link, callback, error) {
        fetch(`${HOST_API}/${PROFILE_ENDPOINT}/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: AUTHORIZATION,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: link
            })

        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((profile) => {
                callback(profile);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                console.log("finally patchAvatar");

            })
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

}())