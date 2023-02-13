console.log("I am in index.js!");

import '../pages/index.css'; // добавьте импорт главного файла стилей

import { Profile } from "./profile";
import { Cards } from "./cards";
import { Validation } from "./validation";
import { Modal } from "./modal";
import { selectors } from './config';
import { Api, MyInformation } from "./api";






Validation.enableValidation(selectors);







