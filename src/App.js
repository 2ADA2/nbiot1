import {Layout} from "./layout/layout";
import {Routes, Route, Link, Navigate, useLocation} from 'react-router';
import {useEffect, useState} from "react";
import global from "./store/global";
import {adminRoutes, routes} from "./components/routes";
import {ErrorPage} from "./components/errorPage";
import {observer} from "mobx-react-lite";
import {LoadingPage} from "./components/loadingPage";
import {AUTHORIZATION_ROUTE} from "./utils/consts";
import {Auth} from "./pages/Auth";

const App = observer(() => {

    useEffect(() => {
        window.addEventListener("popstate", () => {
            setTimeout(() => global.setLocation(),10)
        })
        global.setLocation()
    }, [])

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

    if (global.err) return <ErrorPage toBack={false} err={global.err}/>
    if (global.isLoading) return <LoadingPage toBack={false}/>

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Layout/>}>

                    {routes.map(({path, Element}) => {
                        return <Route key={path} path={path} element={<Element/>}/>
                    })}

                    {global.isAdmin ? adminRoutes.map(({path, Element}) => {
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
