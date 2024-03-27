import { Home } from "../pages/home";
import { Settings } from "../pages/settings";
import { DevCommands } from "../pages/sourcePages/devCommands";
import { DevInfo } from "../pages/sourcePages/devInfo";
import { DevSettings } from "../pages/sourcePages/devSettings";
import { Sources } from "../pages/sources";
import { DEVCOMMANDS_ROUTE, DEVINFO_ROUTE, DEVSETTINGS_ROUTE, SETTINGS_ROUTE, SOURCES_ROUTE } from "../utils/consts";

export const routes = [
    {
        path: SOURCES_ROUTE,
        Element: Sources
    },
    {
        path: SETTINGS_ROUTE,
        Element: Settings
    },
    {
        path: DEVINFO_ROUTE + "/:id",
        Element: DevInfo
    },
    {
        path: DEVSETTINGS_ROUTE + "/:id",
        Element: DevSettings
    },
    {
        path: DEVCOMMANDS_ROUTE + "/:id",
        Element: DevCommands
    },{
        path:"/",
        Element: Home
    }
]