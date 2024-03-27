import { Layout } from "./layout/layout";
import {Page} from "./components/page";
import { Routes, Route, Link, Navigate } from 'react-router';
import { Home } from "./pages/home";
import { Settings } from "./pages/settings";
import { Sources } from "./pages/sources";
import { DevInfo } from "./pages/sourcePages/devInfo";
import { DevCommands } from "./pages/sourcePages/devCommands";
import { DevSettings } from "./pages/sourcePages/devSettings";
import { useEffect, useState } from "react";
import global from "./store/global";
import { LoadingPage } from "./components/loadingPage";
import { ErrorPage } from "./components/errorPage";
import { connect } from "./functions/connect";
import { set } from "mobx";
import { routes } from "./components/routes";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    window.addEventListener("popstate", ()=>{
      global.setLocation()
      
    })
    global.setLocation()
    // connect("http://93.84.87.22:8002/mqtt/settings ",(data) => setData(data),(err) => setError(err))
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>

          {routes.map(({path, Element}) => {
            return <Route key = {path} path={path} element={<Element/>}/>
          })}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
