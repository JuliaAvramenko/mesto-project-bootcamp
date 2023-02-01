console.log("I am in index.js!");

import '../pages/index.css'; // добавьте импорт главного файла стилей

import { Handlers } from "./handlers";
import { Cards } from "./cards";
import { Validation } from "./validation";
import { Modal } from "./modal";

Validation.enableValidation();

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
///import logo from '../images/mesto-logo.svg';
// import avatar from '../images/logo.jpeg';

//const avatarImage = new URL('../images/logo.jpeg', import.meta.url);

//const test = [
//  { name: "my avatar", image: avatarImage }
//];

//const picturesProjectMesto = [
// меняем исходные пути на переменные
//{ name: 'Logo', link: logo },
//{ name: 'Avatar Mesto', link: avatar },

//];

