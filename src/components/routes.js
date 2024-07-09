import {AdvancedSettings} from "../pages/advancedSettings";
import { Home } from "../pages/home";
import { Settings } from "../pages/mqtt/settings";
import { DevCommands } from "../pages/mqtt/sourcePages/devCommands";
import { DevInfo } from "../pages/mqtt/sourcePages/devInfo";
import { DevSettings } from "../pages/mqtt/sourcePages/devSettings";
import { Sources } from "../pages/mqtt/sources";
import {
    ADVANCED_SETTINGS_ROUTE,
    DEVCOMMANDS_ROUTE,
    DEVINFO_ROUTE,
    DEVSETTINGS_ROUTE,
    SETTINGS_ROUTE,
    SOURCES_ROUTE,
} from "../utils/consts";
import {DevList} from "../pages/sub/devList";
import {DevInfoSub} from "../pages/sub/courcePages/devInfoSub";
import {DevCommandsSub} from "../pages/sub/courcePages/devCommandsSub";
import {DevSettingsSub} from "../pages/sub/courcePages/devSettings";
import {SettingsSub} from "../pages/sub/settings";

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

export const subRoutes = [
    {
        path:"/",
        Element: Home
    },
    {
        path: SOURCES_ROUTE,
        Element: DevList
    },
    {
        path: SETTINGS_ROUTE,
        Element: SettingsSub
    },
    {
        path: DEVINFO_ROUTE + "/:id",
        Element: DevInfoSub
    },
    {
        path: DEVSETTINGS_ROUTE + "/:id",
        Element: DevSettingsSub
    },
    {
        path: DEVCOMMANDS_ROUTE + "/:id",
        Element: DevCommandsSub
    }
]

export const adminRoutes = [
     {
        path: ADVANCED_SETTINGS_ROUTE,
        Element: AdvancedSettings
    }
]