import axios from "axios";

export const sendSubCommand = async (url, data, token) => {
    let body;
    switch (data.command) {
        case "addPackage":
            body = {
                "USER_CMD": "ADDITIONAL PACKAGE",
                "USER_ARG": {
                    "Type": data.type
                }
            }
            break;
        case "clearAll" :
            body = {
                "USER_CMD": "CLEAR ALL ",
            }
            break;

        case "setChos" :
            body = {
                "USER_CMD": "SET CHOS IMG VALID",
                "USER_ARG": {
                    "Img": data.img
                }

            }

            break;
        case "reset" :
            body = {
                "USER_CMD": "RESET",
                "USER_ARG": {
                    "Key": 0xBEAFDEAD
                }
            }

            break;
        case "ble" :
            body = {
                "USER_CMD": "SET BLE ADV TIME",
                "USER_ARG": {
                    "Time": data.bleTime//"1-10"
                }
            }

            break;
        case "gain" :
            body = {
                "USER_CMD": "SET GAIN",
                "USER_ARG": {
                    "M": data.m, //1-254,
                    "Y": data.y, //1-254,
                    "Z": data.z, //1-254
                    "X": data.x //1-254,
                }

            }

            break;
        case "battery" :
            body = {
                "USER_CMD": "SET BATTERY PARAM",
                "USER_ARG": {
                    "Capaсity": data.capacity,
                    "Threshold voltage":data.thresholdVoltage,
                    "Threshold percent":data.thresholdPrecent
                }

            }

            break;
        case "rf" :
            body = {
                "USER_CMD": "SET SUB RF PARAM",
                "USER_ARG": {
                    "Chanal": data.chanal,
                    "Power": data.power,
                    "Word": data.word,
                    "Speed": data.speed
                }

            }

            break;
        case "sub" :
            body = {
                "USER_CMD": "SET SUB PARAM",
                "USER_ARG": {
                    "Gw id": data.gwId,
                    "Dev id": data.devId,
                    "Win": data.win
                }

            }

            break;
        case "shedule" :
            body = {
                "USER_CMD": "SET SUB SHEDULE",
                "USER_ARG": {
                    "Quantity": data.quantity,
                    "Shedul": data.shedul,
                    "Reserv": data.reserv,
                }

            }
            break;
        case "mode" :
            body = {
                "USER_CMD": "SET MODE",
                "USER_ARG":{
                    "Mode":   data.mainMode,// Режим работы (0 – обычный; 1 – счетчик)
                }

            }
            break;
        case "vibro" :
            body = {
                "USER_CMD": "VIBRO ACCEL SCALE",
                "USER_ARG":{
                    "Scale":   data.scale,
                }

            }
            break;
        case "launch" :
            body = {
                "USER_CMD": "SET TRAC LAUNCH",
                "USER_ARG":{
                    "Threshold ": data.threshold,
                    "Settings": data.launchSettings ,
                    "Time": data.time
                }

            }
            break;
        case "sleep" :
            body = {
                "USER_CMD": "SET SLEEP MODE",
                "USER_ARG":{
                    "Mode":   data.sleepMode	 // Режим работы (0 – обычный; 1 –пониженного потребления)
                }

            }
            break;
        case "settingsSleep" :
            body = {
                "USER_CMD": "SET SETTINGS SLEEP MODE ",
                "USER_ARG":{
                    "Settings": data.sleepSettings
                }

            }
            break;
        default :
            body = {
                "USER_CMD": "SET IMIT SETTINGS",
                "USER_ARG":{
                    "Mode ":   data.imitMode,
                    "Phase":  data.phase,
                    "Ampli":  data.ampli,
                }

            }
    }
    return await axios.post(url, body, {
        headers: {"Authorization": token}
    })
}