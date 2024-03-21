import { Layout } from "./layout/layout";
import {Page} from "./components/page";
import { Routes, Route, Link, Navigate } from 'react-router';
import { Home } from "./pages/home";
import { Settings } from "./pages/settings";
import { Sources } from "./pages/sources";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/sources' element={<Sources />}></Route>
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
