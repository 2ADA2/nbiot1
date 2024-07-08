import RU from "../localization/errors/ru.json"
import EN from "../localization/errors/en.json"
import settings from "../store/settings";
import {FormattedMessage} from "react-intl/lib";
import {IntlProvider} from "react-intl";
import {observer} from "mobx-react-lite";

const messages = {
    "ru": RU,
    "en": EN
}

export const MeasureStates = observer( ({num}) => {
    return [
    <IntlProvider locale={navigator.language} messages={messages[settings.lang]}>
        <span className="auth-error successfully">
            <FormattedMessage id={"measState1"}/>
        </span>
    </IntlProvider>,

    <IntlProvider locale={navigator.language} messages={messages[settings.lang]}>
        <span className="auth-error successfully">
            <FormattedMessage id={"measState2"}/>
        </span>
    </IntlProvider>,

    <IntlProvider locale={navigator.language} messages={messages[settings.lang]}>
        <span className="auth-error">
            <FormattedMessage id={"measState3"}/>
        </span>
    </IntlProvider>,
    ][num]
})