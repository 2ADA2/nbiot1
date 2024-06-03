const errorFlags = {
  0: "ERR_UNKNOWN_SYS_FLAG - неизвестно",
  1: "ERR_XTAL_LF_INIT_FLAG - ошибка кварца LFCLK",
  2: "ERR_XTAL_HFCLK_UP_FLAG - ошибка кварца HFCLK",
  3: "ERR_FDS_INIT_FLAG - ошибка инициализации модуля хранения настроек",
  4: "ERR_NFC_INIT_FLAG - ошибка инициализации модуля NFC",
  5: "ERR_ADS_INIT_FLAG - ошибка иниц-ции модуля преобразования сигнала сенсора",
  6: "ERR_PWR_CTRL_INIT_FLAG - ошибка иниц-ции модуля подсчета потребления(заряда батареи)",
  7: "ERR_SENS_PWR_ON_FLAG - ошибка включения питания сенсора",
  8: "ERR_MODEM_INIT_FLAG - ошибка иниц-ции модуля модема устройства",
  9: "ERR_MODEM_LINK_FLAG - ошибка линии связи с модемом устройства",
  10: "ERR_MODEM_SIM_ERR_FLAG - ошибка доступа SIM-карты ",
  11: "ERR_MODEM_REG_CELL_FLAG - ошибка регистрации в сети оператора",
  12: "ERR_MODEM_CERT_FLAG - ошибка наличия/доступа к файлу сертификату",
  13: "SERVER_HOST_ACCESS_FLAG - подключено устройства к удаленному серверу(MQTT)",
  14: "SERVER_FTP_ACCESS_FLAG - подключено к удаленному серверу (FTP)",
  15: "SERVER_REGISTERED_FLAG - устройство зарегистрировано на сервере с присвоением REG_UID"
};

// Функция для получения установленных ошибок
export const getErrors = (bitVector) => {
  const errors = [];
  // Проходим по всем возможным битам (0-15)
  for (let i = 0; i < 16; i++) {
    // Проверяем, установлен ли бит на позиции i
    if (bitVector & (1 << i)) {
      errors.push(errorFlags[i]);
    }
  }
  return errors;
}