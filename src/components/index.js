console.log("I am in index.js!");

import '../pages/index.css'; // добавьте импорт главного файла стилей

import { Handlers } from "./handlers";
import { Cards } from "./cards";
import { Validation } from "./validation";
import { Modal } from "./modal";
import { selectors } from './config';

Validation.enableValidation(selectors);




