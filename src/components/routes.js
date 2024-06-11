import {AdvancedSettings} from "../pages/advancedSettings";
import { Home } from "../pages/home";
import { Settings } from "../pages/settings";
import { DevCommands } from "../pages/sourcePages/devCommands";
import { DevInfo } from "../pages/sourcePages/devInfo";
import { DevSettings } from "../pages/sourcePages/devSettings";
import { Sources } from "../pages/sources";
import {
    ADVANCED_SETTINGS_ROUTE,
    DEVCOMMANDS_ROUTE,
    DEVINFO_ROUTE,
    DEVSETTINGS_ROUTE,
    SETTINGS_ROUTE,
    SOURCES_ROUTE,
    UISETTINGS_ROUTE
} from "../utils/consts";
import {UISettings} from "./UISettings";

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
export const adminRoutes = [
     {
        path: ADVANCED_SETTINGS_ROUTE,
        Element: AdvancedSettings
    }
]