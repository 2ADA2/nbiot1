import RU from "../localization/errors/ru.json"
import EN from "../localization/errors/en.json"
import settings from "../store/settings";

const messages = {
  "ru":RU,
  "en":EN
}

// Функция для получения установленных ошибок
export const getErrors = (bitVector) => {
  const errors = [];
  // Проходим по всем возможным битам (0-15)
  for (let i = 0; i < 16; i++) {
    // Проверяем, установлен ли бит на позиции i
    if (bitVector & (1 << i)) {
      errors.push(messages[settings.lang][i]);
    }
  }
  return errors;
}