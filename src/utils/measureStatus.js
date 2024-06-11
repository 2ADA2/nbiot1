import RU from "../localization/errors/ru.json"
import EN from "../localization/errors/en.json"
import settings from "../store/settings";
import {FormattedMessage} from "react-intl/lib";

const messages = {
    "ru": RU,
    "en": EN
}

export const measureStates = [
    <span className="auth-error successfully">
        <FormattedMessage id={"measState1"}/>
    </span>,

    <span className="auth-error successfully">
                <FormattedMessage id={"measState2"}/>
    </span>,

    <span className="auth-error">
                <FormattedMessage id={"measState3"}/>
    </span>,
]