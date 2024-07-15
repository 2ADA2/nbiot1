import {Layout} from "./layout/layout";
import {Routes, Route, Navigate, useLocation} from 'react-router';
import {useEffect, useState} from "react";
import global from "./store/global";
import {adminRoutes, adminRoutesSub, routes, subRoutes} from "./components/routes";
import {ErrorPage} from "./components/errorPage";
import {observer} from "mobx-react-lite";
import {LoadingPage} from "./components/loadingPage";
import {AUTHORIZATION_ROUTE} from "./utils/consts";
import {Auth} from "./pages/Auth";
import settings from "./store/settings";

const App = observer(() => {

    if (global.err) return <ErrorPage toBack={false} err={global.err}/>

    if (!global.isAuth) {
        return (
            <Routes>
                <Route path={AUTHORIZATION_ROUTE} element={<Auth/>}/>
                <Route
                    path="*"
                    element={<Navigate to={AUTHORIZATION_ROUTE} replace/>}
                />
            </Routes>
        )
    }


    if (global.isLoading) return <LoadingPage toBack={false}/>

    return (
        <div className={"App " + settings.theme}>
            <Routes>
                <Route path='/' element={<Layout/>}>

                    {global.progType === "mqtt" ? routes.map(({path, Element}) => {
                        return <Route key={path} path={path} element={<Element/>}/>
                    }) : subRoutes.map(({path, Element}) => {
                        return <Route key={path} path={path} element={<Element/>}/>
                    })}

                    {global.isAdmin ?
                        (global.progType === "mqtt") ?
                            adminRoutes.map(({path, Element}) => {
                                return <Route key={path} path={path} element={<Element/>}/>
                            }) : adminRoutesSub.map(({path, Element}) => {
                                return <Route key={path} path={path} element={<Element/>}/>
                            }) : <></>}

                    <Route
                        path="*"
                        element={<Navigate to="/" replace/>}
                    />
                </Route>
            </Routes>
        </div>
    );
})

export default App;
