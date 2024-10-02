import axios from "axios";

export const sendSubCommand = async (url, data, token) => {
    let body;
    switch (data.command) {
        case "addPackage":
            body = {
                "USER_CMD": "ADDITIONAL PACKAGE",
                "USER_ARG": {
                    "Type": 7
                }
            }
            break;
        case "clearAll" :
            body = {
                "USER_CMD": "CLEAR ALL ",
            }
            break;

        case "chos" :
            body = {
                "USER_CMD": "SET CHOS IMG VALID",
                "USER_ARG": {
                    "Img": 7
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
                    "Time": 5//"1-10"
                }
            }

            break;
        case "gain" :
            body = {
                "USER_CMD": "SET GAIN",
                "USER_ARG": {
                    "M": 1, //1-254,
                    "Y": 1, //1-254,
                    "Z": 1, //1-254
                    "X": 1 //1-254,
                }

            }

            break;
        case "battery" :
            body = {
                "USER_CMD": "SET BATTERY PARAM",
                "USER_ARG": {
                    "Capaсity": "uint64",
                    "Threshold voltage": "uint16",
                    "Threshold percent": "uint8"
                }

            }

            break;
        case "rf" :
            body = {
                "USER_CMD": "SET SUB RF PARAM",
                "USER_ARG": {
                    "Chanal": "uint32",
                    "Power": "uint32",
                    "Word": "uint32",
                    "Speed": "uint32"
                }

            }

            break;
        case "sub" :
            body = {
                "USER_CMD": "SET SUB PARAM",
                "USER_ARG": {
                    "Gw id": "uint32",
                    "Dev id": "uint32",
                    "Win": "uint32"
                }

            }

            break;
        case "shedule" :
            body = {
                "USER_CMD": "SET SUB SHEDULE",
                "USER_ARG": {
                    "Quantity": "uint32",
                    "Shedul": "[uint16, uint16, uint8]",
                    "Reserv": "[uint32, uint32]",
                }

            }
            break;
        case "mode" :
            body = {
                "USER_CMD": "SET MODE",
                "USER_ARG":{
                    "Mode":   "uint8",// Режим работы (0 – обычный; 1 – счетчик)
                }

            }
            break;
        case "vibro" :
            body = {
                "USER_CMD": "VIBRO ACCEL SCALE",
                "USER_ARG":{
                    "Scale":   "uint32",
                }

            }
            break;
        case "launch" :
            body = {
                "USER_CMD": "SET TRAC LAUNCH",
                "USER_ARG":{
                    "Threshold ":   "[uint32, uint8]",
                    "Settings":   "[uint16, uint16,uint8,uint8]",
                    "Time":  "[uint16, uint16]"
                }

            }
            break;
        case "sleep" :
            body = {
                "USER_CMD": "SET SLEEP MODE",
                "USER_ARG":{
                    "Mode":   "uint8",	 // Режим работы (0 – обычный; 1 –пониженного потребления)
                }

            }
            break;
        case "settingsSleep" :
            body = {
                "USER_CMD": "SET SETTINGS SLEEP MODE ",
                "USER_ARG":{
                    "Settings":   "[uint8, uint8]"
                }

            }
            break;
        default :
            body = {
                "USER_CMD": "SET IMIT SETTINGS",
                "USER_ARG":{
                    "Mode ":   "uint16",
                    "Phase":   "[uint16, uint16,uint16]",
                    "Ampli":  "[uint16, uint16, uint16, uint16]",
                }

            }
    }
    return await axios.post(url, body, {
        headers: {"Authorization": token}
    })
}